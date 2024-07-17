import React, { useState, useEffect, useRef, useContext } from 'react';
import logo from '../../../../src/assets/school logo.png'
import { useParams } from "react-router-dom";
import Loading from './../../../LoadingScreen/Loading';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Print.css';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL_Login } from '../../../Config';
import TCRow from './Tc_Row';

const PrintableComponent = React.forwardRef((props, ref) => {
    console.log(props.data , "print");
    return (
        <div ref={ref} className={`print:your-component px-3 pb-4 ${props.editing ? "rounded-lg border border-gray-300" : ""}`}>

            <div className="text-center mb-2">
                <div className="inline-block">
                    <h2 className={`font-medium text-center ${props.editing ? "text-lg" : "text-xl"}`}>Transfer Certificate</h2>
                    <hr className="border-t-2 border-black mt-4" />
                </div>
            </div>
            {/* name={id} */}

            <div className= {`justify-between flex px-4 mt-2 mobile:max-tablet:flex-col mobile:max-tablet:gap-1 ${props.editing ? "text-lg" : "text-xl"}`}>
                <div className='font-medium'>
                    T.C No. : 123456
                </div>
                <div className='font-medium'>
                    Affiliation No. : 123456
                </div>
                <div className='font-medium'>
                    School code: 123456
                </div>
            </div>

            <div className={` justify-between flex px-4 mt-3 ${props.editing ? "text-lg" : "text-xl"}`}>
                <div className='font-medium'>
                    Registration No. : 123456
                </div>
                <div className='font-medium'>
                    Adm. No. : 123456
                </div>
            </div>
            <div className='font-medium px-4 mt-2 text-sm'>
                (In case of IX to XII)
            </div>

            <div className=" w-full px-4 mt-2">
                <TCRow no={1} label='Name of the Student' detail={props.data.name} field1={"name"} handleChange={props.handleChange} editing={props.editing} />
                <TCRow no={2} label="Mother\'s Name" detail={props.data.motherName} field1={"motherName"} handleChange={props.handleChange} editing={props.editing} />
                <TCRow no={3} label="Father\'s Name/ Guardian\'s Name" detail={props.data.fatherName} field1={"fatherName"} handleChange={props.handleChange} editing={props.editing} />
                <TCRow no={4} label="Date of Birth" detail={props.data.dob} field1={"dob"} handleChange={props.handleChange} editing={props.editing} />
                <TCRow no={5} label='Nationality' detail={props.data.nationality} field1={"nationality"} handleChange={props.handleChange} editing={props.editing} />
                <TCRow no={6} label='Whether the Candidate belongs to (SC, ST, OBC, GEN, EWS)' detail={props.data.category} field1={"category"} handleChange={props.handleChange} editing={props.editing} />
                <TCRow no={7} label='Date of first Admission in school with class' detail={props.data.dateOfAdmission} detail2={props.data.AdmissionClass} field1={"dateOfAdmission"} field2={"AdmissionClass"} handleChange={props.handleChange} editing={props.editing} />
                <TCRow no={8} label='Class in which the Student last studied' detail={props.data.currentClass} field1={"currentClass"} handleChange={props.handleChange} editing={props.editing} />
                <TCRow no={9} label='School/ Board Annual Examination last taken with results' detail={props.data.resultStatus} field1={"resultStatus"} handleChange={props.handleChange} editing={props.editing} />
                <TCRow no={10} label='Main Subject studied' detail={props.data.subjects} field1={"subjects"} handleChange={props.handleChange} editing={props.editing} />
                <TCRow no={11} label='Whether qualified for promotion' detail={props.data.resultStatus === 'Pass' ? 'Yes' : 'No'} editing={props.editing}/>
                <TCRow no={12} label='Month up to which the pupil has paid School dues' detail={props.data.lastFeeSubmittedDate} field1={"lastFeeSubmittedDate"} handleChange={props.handleChange} editing={props.editing} />
                <TCRow no={13} label='Total number of Working days in the Academic Session' detail={props.data.totalLectures} field1={'totalLectures'} handleChange={props.handleChange} editing={props.editing} />
                <TCRow no={14} label='Total number of Working days Pupil Present' detail={props.data.totalLecturesAttended} field1={'totalLecturesAttended'} handleChange={props.handleChange} editing={props.editing} />
                <TCRow no={15} label='Extra Co-curricular activities in which the pupil participated' detail={props.data.extraCocurricular} field1={"extraCocurricular"} handleChange={props.handleChange} editing={props.editing} />
                <TCRow no={16} label='General Conduct' detail={props.data.generalConduct} field1={"generalConduct"} handleChange={props.handleChange} editing={props.editing} />
                <TCRow no={17} label='Date of application for certificate' detail={props.data.dateOfApplication} field1={"dateOfApplication"} handleChange={props.handleChange} editing={props.editing} />
                <TCRow no={18} label='Date of certificate issued' detail={props.data.issueDate} field1={"issueDate"} handleChange={props.handleChange} editing={props.editing} />
                <TCRow no={19} label='Reason for leaving the school' detail={props.data.reason} field1={"reason"} handleChange={props.handleChange} editing={props.editing} />
                <TCRow no={20} label='Any other remarks' detail={props.data.remark} field1={"remark"} handleChange={props.handleChange} editing={props.editing} />
            </div>
            <div className={`justify-between  flex px-4  ${props.editing ? "text-lg mt-20" : "text-xl mt-36"} font-medium`}>
                
                    <h1 className='mt-16'>
                        
                        Prepared By
                    </h1>
               
                    <h1 className='mt-16'>
                       
                        Checked By
                    </h1>
                
                    <h1 className='mt-16'>
                        
                        Principal
                    </h1>
                
            </div>
        </div>
    )
})
const Transfer = () => {
    const { tc, class: className, section: secttions, session: sessions } = useParams();
    const ref1 = useRef();
    const date = new Date();
    const [loading,setLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        motherName: "",
        fatherName: "",
        dob: "",
        nationality: "",
        category: "",
        dateOfAdmission: "",
        AdmissionClass: "",
        currentClass: "",
        resultStatus: "",
        subjects: "",
        lastFeeSubmittedDate: "",
        totalLectures: "",
        totalLecturesAttended: "",
        extraCocurricular: "",
        generalConduct: "",
        dateOfApplication: date.toLocaleDateString(),
        issueDate: date.toLocaleDateString(),
        reason: "",
        remark: "",
    });
    const handleFieldChange = (fieldName, value) => {
        setData(prevData => ({
            ...prevData,
            [fieldName]: value
        }));
    };
    const { authState } = useContext(AuthContext);
    const [reset, setReset] = useState(false);
    const [editing, setEditing] = useState(true);
    const [download, setdownload] = useState(false);



    const handleReset = () => {
        setReset(!reset);
    }
    useEffect(() => {
        fetchUserTc();
        fetchSubjects();
        fetchResult();
        fetchAttendence();
    }, [reset]);

    const handlePrint = async () => {
        const page1 = ref1.current;
        console.log(ref1)
        const pdf = new jsPDF('p', 'mm', 'a4', true,);
        const pageWidth = pdf.internal.pageSize.width;
        const pageHeight = pdf.internal.pageSize.height;
        const marginTop = pageHeight*0.1;
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
            setdownload(false);
            setEditing(true);
            setLoading(false);

        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };
    useEffect(() => {
        if (download) {
            handlePrint();
        }
    }, [editing]);
    const handleDownload = () => {
        setEditing(false);
        setLoading(true);
        setdownload(true);
        
    }
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
                setData(prevData => ({
                    ...prevData,
                    ['name']: response.data.name,
                    ['AdmissionClass']: response.data.admissionClass,
                    ['dateOfAdmission']: response.data.admissionDate,
                    ['category']: response.data.category,
                    ['nationality']: response.data.nationality,
                    ['currentClass']: response.data.currentClass,
                    ['motherName']: response.data.motherName,
                    ['fatherName']: response.data.fatherName,
                    ['dob']: response.data.DOB,

                }));
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
                var formattedSubjects = '';
                for(const subject in response.data.subjects){
                    formattedSubjects += `${parseInt(subject) + 1}. ` + response.data.subjects[subject] + ", ";
                    console.log(formattedSubjects);
                }
                setData(prevData => ({
                    ...prevData,
                    ['subjects']: formattedSubjects,
                }));
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
                setData(prevData => ({
                    ...prevData,
                    ['resultStatus']: response.data.status,

                }));
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
                setData(prevData => ({
                    ...prevData,
                    ['totalLectures']: response.data.total,
                    ['totalLecturesAttended']: response.data.present,
                }));
            }
        } catch (err) {
            console.log(err);

        }

    };


    return (
        <div className=" mobile:max-tablet:mt-4  rounded-lg shadow-md mb-2 mx-3 py-20 px-52">
            <div className=" w-full  justify-center">
                {!loading ? <div className='flex justify-between items-center'>

                    <div className="text-xl font-medium mb-4 justify-center w-fit rounded-lg shadow-md py-1 px-3 mt-3 bg-secondary text-black hover:bg-blue-400 cursor-pointer hover:text-white" onClick={handleDownload}>
                        Download
                    </div>

                    <div className="text-xl font-medium mb-4 justify-center w-fit rounded-lg shadow-md py-1 px-3 mt-3 bg-secondary text-black hover:bg-blue-400 cursor-pointer hover:text-white" onClick={handleReset}>
                        Reset
                    </div>

                </div> :
                <Loading />
}
                <PrintableComponent ref={ref1} data={data} editing={editing} handleChange={handleFieldChange} />

            </div>

        </div>
    );
};

export default Transfer;
