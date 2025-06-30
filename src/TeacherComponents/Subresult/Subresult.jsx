import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
import Loading from './../../LoadingScreen/Loading';
import axios from 'axios';
import { BASE_URL } from '../../Config';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { refreshAccessToken } from '../../RefreshTokenHelper';
import { toast } from 'react-toastify';

const Result = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const { authState, darkMode, updateAccessToken, logout } = useContext(AuthContext);
    const [details, setDetails] = useState({});
    const [profile, setProfile] = useState({});
    const [profileLoading, setProfileLoading] = useState(true);
    const [attendance, SetAttendance] = useState({});
    const [printing, setPrinting] = useState(false);

    const ref = useRef();

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
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                if (
                    error.response &&
                    error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
                ) {
                    toast.warn('Access denied. Attempting to refresh token...');
                    try {
                        const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                        await fetchProfile();
                    } catch (refreshError) {
                    }
                } else {
                    toast.error(error.response?.data?.error || "An error occurred");
                }
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
                }
            } catch (error) {
                console.error("Error fetching student result:", error);
                if (
                    error.response &&
                    error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
                ) {
                    toast.warn('Access denied. Attempting to refresh token...');
                    try {
                        const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                        await fetchResult();
                    } catch (refreshError) {
                    }
                } else {
                    toast.error(error.response?.data?.error || "An error occurred");
                }
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
        const pdf = new jsPDF('p', 'mm', 'a4', true);

        const addPageContent = async (element) => {
            try {
                const originalDarkMode = document.documentElement.classList.contains('dark');
                if (originalDarkMode) {
                    document.documentElement.classList.remove('dark');
                }

                await Promise.all(Array.from(element.getElementsByTagName('img')).map(img => {
                    if (img.complete) return Promise.resolve();
                    return new Promise(resolve => { img.onload = resolve; });
                }));

                const canvas = await html2canvas(element, {
                    scale: 2,
                    useCORS: true,
                    logging: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff',
                });

                if (originalDarkMode) {
                    document.documentElement.classList.add('dark');
                }

                const imgData = canvas.toDataURL('image/png');
                const imgWidth = pdf.internal.pageSize.width;
                const pageHeight = pdf.internal.pageSize.height;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                if (imgHeight > pageHeight) {
                    console.warn('Content does not fit on one page. Consider adjusting dimensions.');
                    return;
                }

                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            } catch (error) {
                console.error('Error capturing element with html2canvas:', error);
            }
        };

        try {
            await addPageContent(ref.current);

            const pdfBlob = pdf.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, '_blank');

        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setPrinting(false);
        }
    };

    const combineData = () => {
        if (!details || !details.term1 || !details.halfYearly || !details.term2 || !details.final) {
            return [];
        }

        const subjects = Array.from(new Set([
            ...details.term1.map(item => item.subject),
            ...details.halfYearly.map(item => item.subject),
            ...details.term2.map(item => item.subject),
            ...details.final.map(item => item.subject),
        ]));

        return subjects.map(subject => {
            const term1 = details.term1.find(item => item.subject === subject) || {};
            const halfYearly = details.halfYearly.find(item => item.subject === subject) || {};
            const term2 = details.term2.find(item => item.subject === subject) || {};
            const final = details.final.find(item => item.subject === subject) || {};

            return {
                subject,
                term1,
                halfYearly,
                term2,
                final
            };
        });
    };

    const combineCoScholasticData = () => {
        if (!details || !details.halfYearly_Co_scholastic || !details.final_Co_scholastic) {
            return [];
        }

        const subjects = Array.from(new Set([
            ...details.halfYearly_Co_scholastic.map(item => item.subject),
            ...details.final_Co_scholastic.map(item => item.subject),
        ]));

        return subjects.map(subject => {
            const halfYearly = details.halfYearly_Co_scholastic.find(item => item.subject === subject) || {};
            const final = details.final_Co_scholastic.find(item => item.subject === subject) || {};

            return {
                subject,
                halfYearly,
                final
            };
        });
    };
    const tableData = combineData();
    const coScholasticData = combineCoScholasticData();

    return (
        <div className={`p-2 w-full ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
            <div className="flex justify-between items-center mb-4 mobile:max-tablet:flex-col mobile:max-tablet:items-start">
                <h1 className={`text-2xl mobile:max-tablet:text-lg font-bold ${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-blue-600 hover:text-blue-800'}`}>
                    {profile.name} Progress Report
                </h1>
                <button
                    className={`text-lg font-semibold border rounded-md px-2 py-1 transition-colors ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'}`}
                    onClick={handlePrint}
                    disabled={printing}
                >
                    {printing ? 'Processing...' : 'Print'}
                </button>
            </div>
            <div className={`report-card border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`} ref={ref}>
                <div className='border-b border-black py-3 items-center bg-gradient-to-r from-blue-200 to-blue-100 text-center'>
                    <h1 className={`text-3xl mobile:max-tablet:text-xl font-semibold mb-2`}>Report Card : {profile.session || "2024-25"}</h1>
                </div>
                <div className="mb-4 flex justify-between m-3 text-xl">
                    <div className='leading-loose'>
                        <p><strong className='font-medium'>Student's Name:</strong> {profile.name}</p>
                        <p><strong className='font-medium'>Father's Name:</strong> {profile.fatherName}</p>
                        <p><strong className='font-medium'>Mother's Name:</strong> {profile.motherName}</p></div>
                    <div className='leading-loose'>
                        <p><strong className='font-medium'>Admission No.:</strong> {profile.admissionNumber || 123456}</p>
                        <p><strong className='font-medium'>Class & Section:</strong> {profile.currentClass} {profile.section}</p>
                        <p><strong className='font-medium'>Date of Birth:</strong> {profile.DOB}</p>
                    </div>
                </div>
                <div className='overflow-auto'>
                    <table className="min-w-full border border-gray-200">
                        <thead className='bg-gradient-to-r from-blue-200 to-blue-100 text-xl font-medium'>
                            <tr className='text-center'>
                                <th className="px-4 py-2 border mobile:max-tablet:text-sm">SUBJECT</th>
                                <th className="px-4 py-2 border mobile:max-tablet:text-sm">Term 1</th>
                                <th className="px-4 py-2 border mobile:max-tablet:text-sm">Half Yearly NB</th>
                                <th className="px-4 py-2 border mobile:max-tablet:text-sm">Half Yearly SE</th>
                                <th className="px-4 py-2 border mobile:max-tablet:text-sm">Half Yearly</th>
                                <th className="px-4 py-2 border mobile:max-tablet:text-sm">Grade</th>
                                <th className="px-4 py-2 border mobile:max-tablet:text-sm">Term 2</th>
                                <th className="px-4 py-2 border mobile:max-tablet:text-sm">Final NB</th>
                                <th className="px-4 py-2 border mobile:max-tablet:text-sm">Final SE</th>
                                <th className="px-4 py-2 border mobile:max-tablet:text-sm">Final</th>
                                <th className="px-4 py-2 border mobile:max-tablet:text-sm">Grade</th>
                            </tr>
                        </thead>
                        <tbody className='tablet:pb-6 mobile:max-tablet:text-xs'>
                            {tableData.map((item, index) => (
                                <tr key={index} className="text-center">
                                    <td className="px-4 py-2 border">{item.subject}</td>
                                    <td className="px-4 py-2 border">{item.term1.marksObtained || '-'}</td>
                                    <td className="px-4 py-2 border">{item.halfYearly.obtainedNoteBookMarks || '-'}</td>
                                    <td className="px-4 py-2 border">{item.halfYearly.obtainedSubjectEnrichmentMarks || '-'}</td>
                                    <td className="px-4 py-2 border">{item.halfYearly.marksObtained || '-'}</td>
                                    <td className="px-4 py-2 border">{/* Add grade logic here */}</td>
                                    <td className="px-4 py-2 border">{item.term2.marksObtained || '-'}</td>
                                    <td className="px-4 py-2 border">{item.final.obtainedNoteBookMarks || '-'}</td>
                                    <td className="px-4 py-2 border">{item.final.obtainedSubjectEnrichmentMarks || '-'}</td>
                                    <td className="px-4 py-2 border">{item.final.marksObtained || '-'}</td>
                                    <td className="px-4 py-2 border">{/* Add grade logic here */}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="overflow-auto mb-6">
                    <h2 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Co-Scholastic Areas</h2>
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className='bg-gradient-to-r from-blue-200 to-blue-100 text-xl font-medium'>
                            <tr>
                                <th className="px-4 py-4 mobile:max-tablet:py-2 border text-start mobile:max-tablet:text-lg">SUBJECT</th>
                                <th className="px-4 py-4 mobile:max-tablet:py-2 border text-end mobile:max-tablet:text-lg">Half Yearly</th>
                                <th className="px-4 py-4 mobile:max-tablet:py-2 border text-end mobile:max-tablet:text-lg">Final</th>
                            </tr>
                        </thead>
                        <tbody className='text-lg font-normal'>
                            {coScholasticData.map((item, index) => (
                                <tr key={index} className="text-center">
                                    <td className="px-4 pb-4 border">{item.subject}</td>
                                    <td className="px-4 pb-4 border">{item.halfYearly.grade || '-'}</td>
                                    <td className="px-4 pb-4 border">{item.final.grade || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='border-b border-black'>
                    <div className="flex bg-gradient-to-r from-blue-200 to-blue-100 text-xl items-center justify-between px-4 py-4 mobile:max-tablet:py-2 mobile:max-tablet:flex-col mobile:max-tablet:items-start">
                        <h2 className='font-semibold mobile:max-tablet:text-lg'>Attendance:</h2>
                        <p><strong className='font-medium mobile:max-tablet:text-sm'>Total:</strong> {attendance.total}</p>
                        <p><strong className='font-medium mobile:max-tablet:text-sm'>Present:</strong> {attendance.present}</p>
                        <p><strong className='font-medium mobile:max-tablet:text-sm'>Percentage:</strong> {attendance.total !== 0 ? ((attendance.present / attendance.total) * 100).toFixed(1) : 0}%</p>
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
                <div className='flex gap-2 mobile:max-tablet:flex-col'>
                    <div className="flex-1">
                        <h1 className='text-center text-xl my-2'>SCHOLASTIC GRADING</h1>
                        <table className="w-full bg-white border border-gray-200">
                            <thead className='bg-gradient-to-r from-blue-200 to-blue-100'>
                                <tr>
                                    <th className="px-4 py-4 mobile:max-tablet:py-2 border">MARKS RANGE</th>
                                    <th className="px-4 py-4 mobile:max-tablet:py-2 border">GRADE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scholastic.map((item, index) => (
                                    <tr className='text-center text-lg' key={index}>
                                        <td className="px-2 pb-4 border w-1/2">{item.range}</td>
                                        <td className="px-4 pb-4 border w-1/2">{item.grade}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex-1 h-full">
                        <h1 className='text-center text-xl my-2 whitespace-nowrap mobile:max-tablet:text-lg'>CO-SCHOLASTIC GRADING</h1>
                        <table className="w-full bg-white border border-gray-200">
                            <thead className='bg-gradient-to-r from-blue-200 to-blue-100'>
                                <tr>
                                    <th className="px-4 py-4 mobile:max-tablet:py-2 border">PERFORMANCE INDICATORS</th>
                                    <th className="px-4 py-4 mobile:max-tablet:py-2 border">GRADE</th>
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
        </div>
    );
};

export default Result;