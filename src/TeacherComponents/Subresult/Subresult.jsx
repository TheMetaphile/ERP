import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
import Loading from './../../LoadingScreen/Loading';
import axios from 'axios';
import { BASE_URL } from '../../Config';
import ScholasticRow from './utils/ScholasticRow';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Result = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const { authState, darkMode } = useContext(AuthContext);
    const [details, setDetails] = useState({ term1: [], term2: [] });
    const [profile, setProfile] = useState({});
    const [profileLoading, setProfileLoading] = useState(true);
    const [selectedTermValue, setSelectedTerm] = useState('term1');
    const [selectedTermlabel, setSelectedTermLabel] = useState('Term 1');
    const [attendance, SetAttendance] = useState({});
    const [Printing, setPrinting] = useState(false);

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
        const fetchProfile = async () => {
            setProfileLoading(true);
            try {
                const response = await axios.post(`${BASE_URL}/fetchSingle/student`, {
                    accessToken: authState?.accessToken,
                    email: id
                });
                if (response.status === 200) {
                    setProfile(response.data.StudentDetails[0]);
                    console.log(response.data.StudentDetails[0], "profile");
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
            setProfileLoading(false);
        };

        const fetchResult = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/result/fetch/teacher?email=${id}`, {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`,
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

        const fetchAttendance = async () => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: BASE_URL + '/studentAttendance/fetch/completeStats?class=9th&id=664c4da3a8cd53da5751bdba&year=2024',
                headers: {
                    'Authorization': `Bearer ${authState?.accessToken}`
                }
            };

            axios.request(config)
                .then((response) => {
                    SetAttendance(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        const processAll = async () => {
            await Promise.all([fetchAttendance(), fetchProfile(), fetchResult()]);
        }
        processAll();
    }, [id, authState?.accessToken]);

    if (loading || profileLoading) {
        return <Loading />;
    }

    const handlePrint = async () => {
        setPrinting(true);
        const page1 = ref.current;
        // const page2 = ref2.current;

        const pdf = new jsPDF('p', 'mm', 'a4', true,);
        const pageWidth = pdf.internal.pageSize.width;
        const pageHeight = pdf.internal.pageSize.height;
        const marginTop = pageHeight * 0.1;
        const marginLeft = 5;

        const addPageContent = async (element) => {
            try {
                // Force light mode for PDF printing
                const originalDarkMode = document.documentElement.classList.contains('dark');
                if (originalDarkMode) {
                    document.documentElement.classList.remove('dark');
                }
                
                // Make sure all images are loaded
                await Promise.all(Array.from(element.getElementsByTagName('img')).map(img => {
                    if (img.complete) return Promise.resolve();
                    return new Promise(resolve => { img.onload = resolve; });
                }));

                const canvas = await html2canvas(element, {
                    scale: 2,
                    useCORS: true,
                    logging: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff', // Force white background for PDF
                });

                // Restore dark mode if it was originally enabled
                if (originalDarkMode) {
                    document.documentElement.classList.add('dark');
                }

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
        } finally {
            setPrinting(false);
        }
    };


    return (
        <div className={`p-2 w-full ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
            <div className="flex justify-between items-center mb-4 mobile:max-tablet:flex-col mobile:max-tablet:items-start">
                <h1 className={`text-xl mobile:max-tablet:text-lg font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {profile.name} Progress Report
                </h1>
                <div className='flex gap-2 items-center'>
                    <div className="w-36 mr-3 self-center">
                        <select 
                            id="section" 
                            className={`w-full px-2 py-2 border rounded-md ${
                                darkMode 
                                ? 'bg-gray-800 text-gray-200 border-gray-700' 
                                : 'bg-white text-gray-800 border-gray-300'
                            }`} 
                            onChange={handleTermChange}
                        >
                            {terms.map((sectionOption, index) => (
                                <option key={index} value={sectionOption.value}>{sectionOption.label}</option>
                            ))}
                        </select>
                    </div>
                    <button 
                        className={`text-lg font-semibold border rounded-md px-2 py-1 ${
                            darkMode 
                            ? 'border-gray-600 hover:bg-gray-700' 
                            : 'border-gray-300 hover:bg-gray-100'
                        } transition-colors`} 
                        onClick={handlePrint}
                        disabled={Printing}
                    >
                        {Printing ? 'Processing...' : 'Print'}
                    </button>
                </div>
            </div>
            <div className={`report-card border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`} ref={ref}>
                <div className={`border-b ${darkMode ? 'border-gray-700 bg-gradient-to-r from-gray-800 to-gray-700' : 'border-gray-300 bg-gradient-to-r from-gray-100 to-gray-200'} py-3 items-center text-center`}>
                    <h1 className={`text-3xl mobile:max-tablet:text-xl font-semibold mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                        {selectedTermlabel} : {profile.session || "2024-25"}
                    </h1>
                    <h6 className="text-2xl mobile:max-tablet:text-lg mb-2">Report Card</h6>
                </div>

                <div className="mb-4 flex justify-between mobile:max-tablet:flex-col m-3 mobile:max-tablet:text-sm text-xl">
                    <div className='leading-loose'>
                        <p><strong className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Student's Name:</strong> {profile.name}</p>
                        <p><strong className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Father's Name:</strong> {profile.fatherName}</p>
                        <p><strong className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Mother's Name:</strong> {profile.motherName}</p>
                    </div>
                    <div className='leading-loose'>
                        <p><strong className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Admission No.:</strong> {profile.admissionNumber || 123456}</p>
                        <p><strong className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Class & Section:</strong> {profile.currentClass} {profile.section}</p>
                        <p><strong className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Date of Birth:</strong> {profile.DOB}</p>
                    </div>
                </div>

                {details === null ? (
                    <div className='font-medium text-center text-red-500'>No Result found</div>
                ) : (
                    <>
                        {details[selectedTermValue].length === 0 ? (
                            <div className='font-medium overflow-auto text-center text-red-500'>No Scholastic Data Available</div>
                        ) : (
                            <div className='overflow-auto'>
                                <table className={`min-w-full border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                                    <thead className={`${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-gray-100 to-gray-200'} text-xl font-medium whitespace-nowrap`}>
                                        <tr className='text-center mobile:max-tablet:text-lg mobile:max-tablet:font-normal'>
                                            <th className={`px-4 py-2 border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>Scholastic Areas</th>
                                            <th className={`px-4 py-2 border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                                                Note Book
                                                <p>
                                                    ({details[selectedTermValue][0] ? details[selectedTermValue][0].totalNoteBookMarks : ""})
                                                </p>
                                            </th>
                                            <th className={`px-4 py-2 border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                                                S.Enrichment
                                                <p>
                                                    ({details[selectedTermValue][0] ? details[selectedTermValue][0].totalSubjectEnrichmentMarks : ""})
                                                </p>
                                            </th>
                                            <th className={`px-4 py-2 border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                                                Marks Obt
                                                <p>
                                                    ({details[selectedTermValue][0] ? details[selectedTermValue][0].totalMarks : ""})
                                                </p>
                                            </th>
                                            <th className={`px-4 py-2 border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>Total</th>
                                            <th className={`px-4 py-2 border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>%</th>
                                            <th className={`px-4 py-2 border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>Grade</th>
                                        </tr>
                                    </thead>
                                    <tbody className='pb-6'>
                                        {details[selectedTermValue].map((area, index) => (
                                            <ScholasticRow key={index} index={index} area={area} darkMode={darkMode} />
                                        ))}
                                        <tr></tr>
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <div className="">
                            {details[`${selectedTermValue}_Co_scholastic`].length === 0 ? (
                                <div className='font-medium text-center text-red-500'>No Co-Scholastic Data Available</div>
                            ) : (
                                <table className={`min-w-full ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                                <thead className={`${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-gray-100 to-gray-200'} text-xl font-medium`}>
                                    <tr>
                                        <th className={`px-4 pb-4 mobile:max-tablet:font-normal border ${darkMode ? 'border-gray-700' : 'border-gray-300'} text-start`}>Co-Scholastic Areas:</th>
                                        <th className={`px-4 pb-4 mobile:max-tablet:font-normal border ${darkMode ? 'border-gray-700' : 'border-gray-300'} text-end`}>Grade</th>
                                    </tr>
                                </thead>
                                <tbody className='text-lg font-normal'>
                                    {details[`${selectedTermValue}_Co_scholastic`].map((area, index) => (
                                        <tr key={index}>
                                            <td className={`px-4 pb-4 border ${darkMode ? 'border-gray-700' : 'border-gray-300'} text-start`}>{area.subject}</td>
                                            <td className={`px-4 pb-4 border ${darkMode ? 'border-gray-700' : 'border-gray-300'} text-end`}>{area.grade}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </>
            )}

            <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                <div className={`flex mobile:max-tablet:flex-col mobile:max-tablet:text-sm mobile:max-tablet:items-start ${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-gray-100 to-gray-200'} text-xl items-center justify-between px-4 pb-4`}>
                    <h2 className={`mobile:max-tablet:text-lg font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Attendance:</h2>
                    <p><strong className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Total:</strong> {attendance.total}</p>
                    <p><strong className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Present:</strong> {attendance.present}</p>
                    <p><strong className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Percentage:</strong> {attendance.total !== 0 ? ((attendance.present / attendance.total) * 100).toFixed(1) : 0}%</p>
                </div>

                <div className="mb-12 flex items-center gap-2 px-4">
                    <h2 className={`text-xl mobile:max-tablet:text-lg font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Remarks:</h2>
                </div>
                <div className="sign mobile:max-tablet:text-sm flex items-baseline py-3 text-xl justify-evenly">
                    <p>Class Teacher</p>
                    <p>Coordinator</p>
                    <p>Principal</p>
                </div>
            </div>
            <div className='flex gap-2 mobile:max-tablet:flex-col'>
                <div className="flex-1">
                    <h1 className={`text-center text-xl mobile:max-tablet:text-lg my-2 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>SCHOLASTIC</h1>
                    <table className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                        <thead className={`${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-gray-100 to-gray-200'}`}>
                            <tr>
                                <th className={`px-4 mobile:max-tablet:pb-1 pb-4 whitespace-nowrap mobile:max-tablet:sm border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>MARKS RANGE</th>
                                <th className={`px-4 pb-4 mobile:max-tablet:pb-1 mobile:max-tablet:sm border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>GRADE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scholastic.map((item, index) => (
                                <tr className='text-center text-lg' key={index}>
                                    <td className={`px-2 pb-4 border ${darkMode ? 'border-gray-700' : 'border-gray-300'} w-1/2`}>{item.range}</td>
                                    <td className={`px-4 pb-4 border ${darkMode ? 'border-gray-700' : 'border-gray-300'} w-1/2`}>{item.grade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex-1 h-full">
                    <h1 className={`text-center text-xl my-2 mobile:max-tablet:text-lg whitespace-nowrap ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>CO-SCHOLASTIC AND DISCIPLINE</h1>
                    <table className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                        <thead className={`${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-gray-100 to-gray-200'}`}>
                            <tr>
                                <th className={`px-4 mobile:max-tablet:font-semibold mobile:max-tablet:pb-1 pb-4 border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>PERFOMANCE INDICATORS</th>
                                <th className={`px-4 mobile:max-tablet:font-semibold mobile:max-tablet:pb-1 pb-4 border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>GRADE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coscholastic.map((item, index) => (
                                <tr className='text-start text-lg' key={index}>
                                    <td className={`px-4 mobile:max-tablet:px-1 py-11 border ${darkMode ? 'border-gray-700' : 'border-gray-300'} w-1/2 text-center`}>{item.range}</td>
                                    <td className={`px-4 py-11 mobile:max-tablet:px-1 border ${darkMode ? 'border-gray-700' : 'border-gray-300'} w-1/2 text-center`}>{item.grade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
);
};

export default Result;