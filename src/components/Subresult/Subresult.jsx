import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
import Loading from './../../LoadingScreen/Loading';
import axios from 'axios';
import { BASE_URL_Result, BASE_URL_Login } from '../../Config';
import ScholasticRow from './utils/ScholasticRow';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Result = () => {

    const [loading, setLoading] = useState(true);
    const { authState } = useContext(AuthContext);
    const [details, setDetails] = useState({ term1: [], term2: [] });
    const profile = authState.userDetails;
    const [selectedTermValue, setSelectedTerm] = useState('term1');
    const [selectedTermlabel, setSelectedTermLabel] = useState('Term 1');
    const [attendance, SetAttendance] = useState({});

    const ref = useRef();
    // const ref2 = useRef();

    const scholastic = [
        { range: "91-100", grade: "A1" },
        { range: "81-90", grade: "A2" },
        { range: "71-80", grade: "B1" },
        { range: "61-70", grade: "B2" },
        { range: "51-60", grade: "C1" },
        { range: "41-50", grade: "C2" },
        { range: "33-40", grade: "D" },
        { range: "32 & below", grade: "E" },
    ];
    const coscholastic = [
        { range: "OUTSTANDING", grade: "A" },
        { range: "VERY GOOD", grade: "B" },
        { range: "FAIR", grade: "C" },
    ];
    const terms = [
        {
            label: 'Term 1',
            value: "term1"
        },
        {
            label: 'Half Yearly',
            value: "halfYearly"
        },
        {
            label: 'Term 2',
            value: "term2"
        },
        {
            label: 'Final',
            value: "final"
        }
    ];

    const handleTermChange = (event) => {
        console.log(event.target.value)
        setSelectedTerm(event.target.value);
        const selectedTerm = terms.find(term => term.value === event.target.value);
        console.log(selectedTerm);
        setSelectedTermLabel(selectedTerm.label);
    }


    useEffect(() => {


        const fetchResult = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL_Result}/result/fetch/student?email=${profile.email}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    }
                });
                if (response.status === 200) {
                    setDetails(response.data);
                    console.log(response.data);
                }
            } catch (error) {
                console.error("Error fetching student result:", error);
            } finally {
                setLoading(false);
            }
        };

        // const fetchAttendance = async () => {
        //     let config = {
        //         method: 'get',
        //         maxBodyLength: Infinity,
        //         url: 'http://13.201.247.28:8000/studentAttendance/fetch/completeStats?class=9th&id=664c4da3a8cd53da5751bdba&year=2024',
        //         headers: {
        //             'Authorization': `Bearer ${authState.accessToken}`
        //         }
        //     };

        //     axios.request(config)
        //         .then((response) => {
        //             SetAttendance(response.data);
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });

        // }

        const processAll = async () => {
            await Promise.all([fetchResult()]);
        }
        processAll();
    }, [authState.accessToken]);

    if (loading) {
        return <Loading />;
    }

    const handlePrint = async () => {
        const page1 = ref.current;
        // const page2 = ref2.current;

        const pdf = new jsPDF('p', 'mm', 'a4', true,);
        const pageWidth = pdf.internal.pageSize.width;
        const pageHeight = pdf.internal.pageSize.height;
        const marginTop = pageHeight * 0.1;
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

                if (position + imgHeight + marginTop > pageHeight) {
                    console.warn('Content does not fit on one page. Consider adjusting dimensions.');
                    return;
                }

                pdf.addImage(imgData, 'PNG', marginLeft, position, imgWidth, imgHeight);
            } catch (error) {
                console.error('Error capturing element with html2canvas:', error);
            }
        };

        try {
            await addPageContent(page1);
            // pdf.addPage(); // Add a new page for the second component
            // await addPageContent(page2);

            const pdfBlob = pdf.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, '_blank');

        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };



    return (
        <div className="p-2 w-full">
            <div className="flex justify-between items-center mb-4 mobile:max-tablet:flex-col mobile:max-tablet:items-start">
                <h1 className='text-xl mobile:max-tablet:text-lg font-medium'>{profile.name} Progress Report</h1>
                <div className='flex gap-2 items-center'>
                    <div className="w-36 mr-3 self-center">
                        <select id="section" className="w-full px-2 py-2 border rounded-md" onChange={handleTermChange}>
                            {terms.map((sectionOption, index) => (
                                <option key={index} value={sectionOption.value}>{sectionOption.label}</option>
                            ))}
                        </select>
                    </div>
                    <button className='text-lg font-semibold border rounded-md px-2 py-1 mobile:max-tablet:hidden' onClick={handlePrint}>Print</button>
                </div>
            </div>
            {details ? <div className="report-card border border-black " ref={ref} >

                <div className=' border-b border-black py-3 items-center bg-gradient-to-r from-blue-200 to-blue-100 text-center'>
                    <h1 className={`text-3xl mobile:max-tablet:text-xl font-semibold mb-2`}>{selectedTermlabel} : {profile.session || "2024-25"}</h1>
                    <h6 className="text-2xl mobile:max-tablet:text-lg mb-2">Report Card</h6>
                </div>

                <div className="mb-4 flex justify-between m-3 text-xl">
                    <div className=' leading-loose'>
                        <p><strong className='font-medium'>Student's Name:</strong> {profile.name}</p>
                        <p><strong className='font-medium'>Father's Name:</strong> {profile.fatherName}</p>
                        <p><strong className='font-medium'>Mother's Name:</strong> {profile.motherName}</p></div>
                    <div className=' leading-loose'>
                        <p><strong className='font-medium'>Admission No.:</strong> {profile.admissionNumber || 123456}</p>
                        <p><strong className='font-medium'>Class & Section:</strong> {profile.currentClass} {profile.section}</p>
                        <p><strong className='font-medium'>Date of Birth:</strong> {profile.DOB}</p>
                    </div>


                </div>
                <div className=' overflow-auto'>
                    <table className="min-w-full border border-gray-200">
                        <thead className=' bg-gradient-to-r from-blue-200 to-blue-100 text-xl font-medium '>
                            <tr className='text-center'>
                                <th className="px-4 py-2 border mobile:max-tablet:text-sm">Scholastic Areas</th>
                                <th className="px-4 py-2 border mobile:max-tablet:text-sm">
                                    Note Book
                                    <p>
                                        ({details[selectedTermValue][0] ? details[selectedTermValue][0].totalNoteBookMarks : ""})
                                    </p>
                                </th>
                                <th className="px-4 py-2 border mobile:max-tablet:text-sm">
                                    S.Enrichment
                                    <p>
                                        ({details[selectedTermValue][0] ? details[selectedTermValue][0].totalSubjectEnrichmentMarks : ""})
                                    </p>

                                </th>
                                <th className="px-4 py-2 border mobile:max-tablet:text-sm">
                                    Marks Obt
                                    <p>
                                        ({details[selectedTermValue][0] ? details[selectedTermValue][0].totalMarks : ""})
                                    </p>

                                </th>
                                <th className="px-4 py-2 border mobile:max-tablet:text-sm">Total</th>
                                <th className="px-4 py-2 border mobile:max-tablet:text-sm">%</th>
                                <th className="px-4 py-2 border mobile:max-tablet:text-sm">Grade</th>
                            </tr>
                        </thead>
                        <tbody className='tablet:pb-6 mobile:max-tablet:text-xs'>
                            {details[selectedTermValue].map((area, index) => (
                                <ScholasticRow index={index} area={area} />
                            ))}
                            <tr></tr>
                        </tbody>
                    </table>
                </div>

                <div className=" overflow-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className=' bg-gradient-to-r from-blue-200 to-blue-100 text-xl font-medium'>
                            <tr>
                                <th className="px-4 py-4 mobile:max-tablet:py-2 border text-start mobile:max-tablet:text-lg">Co-Scholastic Areas:</th>
                                <th className="px-4 py-4 mobile:max-tablet:py-2 border text-end mobile:max-tablet:text-lg">Grade</th>
                            </tr>
                        </thead>
                        <tbody className='text-lg font-normal '>
                            {details[`${selectedTermValue}_Co_scholastic`].map((area, index) => (
                                <tr key={index}>
                                    <td className="px-4 pb-4 border text-start">{area.subject}</td>
                                    <td className="px-4 pb-4 border text-end">{area.grade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                <div className=' border-b border-black'>
                    <div className="flex bg-gradient-to-r from-blue-200 to-blue-100 text-xl items-center justify-between px-4 py-4 mobile:max-tablet:py-2 mobile:max-tablet:flex-col mobile:max-tablet:items-start">
                        <h2 className='  font-semibold mobile:max-tablet:text-lg'>Attendance:</h2>
                        <p><strong className='  font-medium mobile:max-tablet:text-sm'>Total:</strong> {attendance.total}</p>
                        <p><strong className=' font-medium mobile:max-tablet:text-sm'>Present:</strong> {attendance.present}</p>
                        <p><strong className=' font-medium mobile:max-tablet:text-sm'>Percentage:</strong> {attendance.total !== 0 ? (attendance.present / attendance.total) * 100 : 0}%</p>
                    </div>

                    <div className="mb-12 flex items-center gap-2 px-4">
                        <h2 className="text-xl font-semibold mobile:max-tablet:text-lg">Remarks:</h2>
                    </div>
                    <div className="sign flex items-baseline py-3 text-xl justify-evenly mobile:max-tablet:text-sm">
                        <p>Class Teacher</p>
                        <p>Coordinator</p>
                        <p>Principal</p>
                    </div>
                </div>

                <div className=' flex gap-2 mobile:max-tablet:flex-col'>
                    <div className="flex-1">
                        <h1 className=' text-center text-xl my-2'>SCHOLASTIC</h1>
                        <table className="w-full bg-white border border-gray-200">
                            <thead className=' bg-gradient-to-r from-blue-200 to-blue-100'>
                                <tr>
                                    <th className="px-4 py-4 mobile:max-tablet:py-2 border">MARKS RANGE</th>
                                    <th className="px-4 py-4 mobile:max-tablet:py-2 border">GRADE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scholastic.map((item, index) => (
                                    <tr className=' text-center text-lg' key={index}>
                                        <td className="px-2 pb-4 border w-1/2">{item.range}</td>
                                        <td className="px-4 pb-4 border w-1/2">{item.grade}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex-1 h-full">
                        <h1 className=' text-center text-xl my-2 whitespace-nowrap mobile:max-tablet:text-lg'>CO-SCHOLASTIC AND DISCIPLINE</h1>
                        <table className="w-full bg-white border border-gray-200">
                            <thead className=' bg-gradient-to-r from-blue-200 to-blue-100'>
                                <tr>
                                    <th className="px-4 mobile:max-tablet:px-2 py-4 mobile:max-tablet:py-2 border">PERFOMANCE INDICATORS</th>
                                    <th className="px-4 mobile:max-tablet:px-2 py-4 mobile:max-tablet:py-2 border">GRADE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coscholastic.map((item, index) => (
                                    <tr className='text-start text-lg' key={index}>
                                        <td className="px-4 py-11 border w-1/2 text-center">{item.range}</td>
                                        <td className="px-4 py-11 border w-1/2 text-center">{item.grade}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
                :
                <div className='text-2xl text-center'>Not Result found</div>
            }

        </div>
    );
};

export default Result;
