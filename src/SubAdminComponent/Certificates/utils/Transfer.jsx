import React, { useState, useEffect, useRef, useContext } from 'react';
import logo from '../../../../src/assets/school logo.png'
import { useParams } from "react-router-dom";
import signature from './../../../assets/signature.jpg';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Print.css';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL_Login } from '../../../Config';

const PrintableComponent = React.forwardRef((props, ref) => {
    const { subject } = props;
    const formattedSubjects = subject.join(', ');
    console.log(formattedSubjects)
    return (
        <div ref={ref} className="print:your-component px-3 pb-4">

            <div className="w-full">
                <u><h1 className='tablet:text-xl mobile:max-tablet:text-xl font-medium text-text_blue text-center'>Transfer Certificate</h1></u>
            </div>
            {/* name={id} */}

            <div className=" justify-between flex px-4 mt-3 mobile:max-tablet:flex-col mobile:max-tablet:gap-1">
                <div className='font-medium'>
                    T.C No. :
                </div>
                <div className='font-medium'>
                    Affiliation No. :
                </div>
                <div className='font-medium'>
                    School code:
                </div>
            </div>

            <div className=" justify-between flex px-4 mt-3">
                <div className='font-medium'>
                    Registration No. :
                </div>
                <div className='font-medium'>
                    Adm. No. :
                </div>
            </div>
            <div className='font-medium px-4 text-sm'>
                (In case of IX to XII)
            </div>

            <div className=" w-full px-4 mt-2">
                {[
                    { label: 'Name of the Student', detail: props.data.name },
                    { label: 'Mother\'s Name', detail: props.data.motherName },
                    { label: 'Father\'s Name/ Guardian\'s Name', detail: props.data.fatherName },
                    { label: 'Date of Birth', detail: props.data.DOB },
                    { label: 'Nationality', },
                    { label: 'Whether the Candidate belongs to (SC, ST, OBC, GEN, EWS)', },
                    { label: 'Date of first Admission in school with class', detail: props.data.admissionDate, detail2: props.data.admissionClass },
                    { label: 'Class in which the Student last studied', detail: props.data.currentClass },
                    { label: 'School/ Board Annual Examination last taken with results', detail: props.result },
                    { label: 'Main Subject studied', detail: formattedSubjects },
                    { label: 'Whether qualified for promotion', detail: props.result === 'Pass' ? 'Yes' : 'No' },
                    { label: 'Month up to which the pupil has paid School dues' },
                    { label: 'Total number of Working days in the Academic Session', detail: props.attendence.total },
                    { label: 'Total number of Working days Pupil Present', detail: props.attendence.present },
                    { label: 'Extra Co-curricular activities in which the pupil participated' },
                    { label: 'General Conduct' },
                    { label: 'Date of application for certificate' },
                    { label: 'Date of certificate issued' },
                    { label: 'Reason for leaving the school' },
                    { label: 'Any other remarks' },

                ].map((field, idx) => (
                    <div key={idx} className="flex  border-b-2 py-3 text-base px-4">
                        <label className="block  font-medium text-gray-700">{idx + 1}.</label>
                        <label className="block  font-medium text-gray-700">&nbsp;&nbsp;{field.label}&nbsp; :    <span className="  font-normal text-gray-500">  {field.detail}&nbsp; {field.detail2}</span></label>

                    </div>
                ))}
            </div>
            <div className=" justify-between flex px-4 mt-3">
                <div className='flex items-center justify-center font-medium'>
                    <h1>
                        <img src={signature} alt="" />
                        Prepared By
                    </h1>
                </div>
                <div className='flex items-center justify-center font-medium'>
                    <h1>
                        <img src={signature} alt="" />
                        Checked By
                    </h1>
                </div>
                <div className='flex items-center justify-center font-medium'>
                    <h1>
                        <img src={signature} alt="" />
                        Principal
                    </h1>
                </div>
            </div>
        </div>
    )
})
const Transfer = () => {
    const { tc, class: className, section: secttions, session: sessions } = useParams();
    const ref1 = useRef();
    const [data, setData] = useState([]);
    const { authState } = useContext(AuthContext);
    const [subject, setSubject] = useState([]);
    const [result, setResult] = useState('');
    const [attendence, setAttendence] = useState('');
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        fetchUserTc();
        fetchSubjects();
        fetchResult();
        fetchAttendence();
    }, []);

    const handlePrint = async () => {
        const page1 = ref1.current;
        console.log(ref1)
        const pdf = new jsPDF('p', 'mm', 'a4', true,);
        const pageWidth = pdf.internal.pageSize.width;
        const pageHeight = pdf.internal.pageSize.height;
        const marginTop = pageHeight * 0.15;
        const marginLeft = 5;

        const addPageContent = async (element) => {
            try {
                await Promise.all(Array.from(element.getElementsByTagName('img')).map(img => {
                    if (img.complete) return Promise.resolve();
                    return new Promise(resolve => { img.onload = resolve; });
                }));

                const canvas = await html2canvas(element, {
                    scale: 2,
                    useCORS: true,
                    logging: true,
                    allowTaint: true,
                });

                const imgData = canvas.toDataURL('image/png');
                const imgWidth = pageWidth - 2 * marginLeft;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                let position = marginTop;

                // if (position + imgHeight + marginTop > pageHeight) {
                //     console.warn('Content does not fit on one page. Consider adjusting dimensions.');
                //     return;
                // }

                pdf.addImage(imgData, 'PNG', marginLeft, position, imgWidth, imgHeight);
            } catch (error) {
                console.error('Error capturing element with html2canvas:', error);
            }
        };

        try {
            await addPageContent(page1);


            const pdfBlob = pdf.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, '_blank');

        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    const fetchUserTc = async () => {
        console.log('hit', authState.accessToken, tc, className, secttions)
        try {
            const response = await axios.get(`${BASE_URL_Login}/terminate/terminatedSingle?session=${sessions}&id=${tc}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                console.log("API response:", response.data);
                setData(response.data);
            }
            console.log('hit')


        } catch (err) {
            console.log(err);

        }
    };

    const fetchSubjects = async () => {
        console.log('hit', authState.accessToken, tc, className, secttions)
        try {
            const response = await axios.get(`${BASE_URL_Login}/fetch/subjects?class=${className}&section=${secttions}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                console.log("API response subject:", response.data.subjects);
                setSubject(response.data.subjects);
            }


        } catch (err) {
            console.log(err);

        }

    };

    const fetchResult = async () => {
        console.log('hit', authState.accessToken, tc, className, secttions)
        try {
            const response = await axios.get(`${BASE_URL_Login}/result/fetch/status?id=${tc}&session=${sessions}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                console.log("API response result:", response.data);
                setResult(response.data.status);
            }


        } catch (err) {
            console.log(err);

        }

    };

    const fetchAttendence = async () => {
        console.log('hittt', authState.accessToken, tc, className)
        try {
            const response = await axios.get(`${BASE_URL_Login}/studentAttendance/fetch/completeStats?id=${tc}&class=${className}&year=2024`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                console.log("API response attendence:", response.data);
                setAttendence(response.data);
            }
        } catch (err) {
            console.log(err);

        }

    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleCancel = () => {
        setEditing(false);
    }

    const handleSave = async () => {


        setEditing(false);
    };

    return (
        <div className=" mobile:max-tablet:mt-4  rounded-lg shadow-md mb-2 mx-3 py-20 px-52">


            <div className=" w-full  justify-center">
                <div className='flex justify-between items-center'>

                    <div className="text-xl font-medium mb-4 justify-center w-fit rounded-lg shadow-md py-1 px-3 mt-3 bg-secondary text-black hover:bg-blue-400 cursor-pointer hover:text-white" onClick={handlePrint}>
                        Download
                    </div>
                    {editing ? (
                        <>
                            <div className="text-xl font-medium mb-4 justify-center w-fit rounded-lg shadow-md py-1 px-3 mt-3 bg-secondary text-black hover:bg-blue-400 cursor-pointer hover:text-white" onClick={handleSave}>
                                Save
                            </div>
                            <div className="text-xl font-medium mb-4 justify-center w-fit rounded-lg shadow-md py-1 px-3 mt-3 bg-secondary text-black hover:bg-blue-400 cursor-pointer hover:text-white" onClick={handleCancel}>
                                Cancel
                            </div>
                        </>
                    ) : (
                        <div className="text-xl font-medium mb-4 justify-center w-fit rounded-lg shadow-md py-1 px-3 mt-3 bg-secondary text-black hover:bg-blue-400 cursor-pointer hover:text-white" onClick={handleEdit}>
                            Edit
                        </div>
                    )}
                </div>
                <PrintableComponent ref={ref1} data={data} subject={subject} result={result} attendence={attendence} />

            </div>

        </div>
    );
};

export default Transfer;
