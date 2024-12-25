import React, { useState, useEffect, useContext, useRef } from 'react'
import Selection from './utils/Selection';
import Header from './utils/Header';
import { Link } from "react-router-dom";
import axios from 'axios';
import Loading from '../../LoadingScreen/Loading';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL_Login, BASE_URL_Result } from '../../Config';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

function ScholasticRow(area, index) {
    console.log(area, 'in row func')
    const totalobtained = parseInt(area.obtainedNoteBookMarks) + parseInt(area.obtainedSubjectEnrichmentMarks) + parseInt(area.marksObtained);
    const total = parseInt(area.totalMarks) + parseInt(area.totalNoteBookMarks) + parseInt(area.totalSubjectEnrichmentMarks);
    const percentage = total !== 0 ? (totalobtained / total) * 100 : 0;

    const scholastic = [
        { lower: 91, grade: "A1", upper: 100 },
        { lower: 81, grade: "A2", upper: 90 },
        { lower: 71, grade: "B1", upper: 80 },
        { lower: 61, grade: "B2", upper: 70 },
        { lower: 51, grade: "C1", upper: 60 },
        { lower: 41, grade: "C2", upper: 50 },
        { lower: 33, grade: "D", upper: 40 },
        { lower: 0, grade: "E", upper: 32 }
    ];

    const grade = scholastic.find(range => percentage >= range.lower && percentage <= range.upper)?.grade || 'N/A';

    return `
        <tr class="text-center text-lg font-normal" key="${index}">
            <td class="px-4 pb-4 border-x border-gray-200">${area.subject}</td>
            <td class="px-4 pb-4 border-x border-gray-200">${area.obtainedNoteBookMarks}</td>
            <td class="px-4 pb-4 border-x border-gray-200">${area.obtainedSubjectEnrichmentMarks}</td>
            <td class="px-4 pb-4 border-x border-gray-200">${area.marksObtained}</td>
            <td class="px-4 pb-4 border-x border-gray-200">${totalobtained}</td>
            <td class="px-4 pb-4 border-x border-gray-200">${percentage.toFixed(2)}</td>
            <td class="px-4 pb-4 border-x border-gray-200">${grade}</td>
        </tr>
    `;
}


function ReportCardSubAdmin() {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    // State to control the dropdown visibility
    const [Class, setClass] = useState(localStorage.getItem('Class') || '');
    const [Section, setSection] = useState(localStorage.getItem('Section') || '');
    const [selectedSession, setSelectedSession] = useState(localStorage.getItem('selectedSession') || '');
    const [error, setError] = useState(null);
    const containerRef = useRef(null);
    const [userData, setUserData] = useState([]);
    const [start, setStart] = useState(0);
    const end = 10;
    const [allDataFetched, setAllDataFetched] = useState(false);
    const sentinelRef = useRef(null);
    const [selectedTermValue, setSelectedTermValue] = useState('');

    useEffect(() => {
        localStorage.setItem('Class', Class);
        localStorage.setItem('Section', Section);
        localStorage.setItem('selectedSession', selectedSession);
    }, [Class, Section, selectedSession]);

    const handleClassChange = (event) => {
        setUserData([]);
        setAllDataFetched(false);
        setClass(event.target.value);
        setStart(0);
    };

    const handleSectionChange = (event) => {

        setUserData([]);
        setAllDataFetched(false);
        setSection(event.target.value);
        setStart(0);
    };

    const handleSessionChange = (session) => {
        setSelectedSession(session);
    };

    const handleViewMore = () => {
        if (!allDataFetched && !loading) {
            setStart((prevStart) => prevStart + end);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !allDataFetched && !loading) {
                    console.log("Fetching more data...");
                    handleViewMore();
                }
            },
            { root: null, rootMargin: '0px', threshold: 1.0 }
        );

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => {
            if (sentinelRef.current) {
                observer.unobserve(sentinelRef.current);
            }
        };
    }, [allDataFetched, loading]);

    useEffect(() => {
        if (start !== 0) {
            fetchStudents();
        }
    }, [start]);

    console.log('ll', Class, Section, selectedSession)
    useEffect(() => {
        fetchStudents();
    }, [authState.accessToken, Class, Section]);

    const fetchStudents = async () => {
        if (loading || allDataFetched) return;
        setLoading(true);
        try {
            console.log(start, "-", end);
            const response = await axios.post(`${BASE_URL_Login}/fetchMultiple/student`, {
                accessToken: authState.accessToken,
                currentClass: Class,
                section: Section,
                end: end,
                start: start
            });
            console.log("API response:", response.data, response.data.Students.length);

            if (response.data.Students) {
                // const users = response.data.Students.map(user => ({
                //     ...user,
                //     profileLogo: user.profileLink || profilelogo,
                // }));

                const list = response.data.Students.length;
                if (list < end) {
                    toast.success('All data fetched');
                    console.log('All data fetched')
                    setAllDataFetched(true);
                }
                setUserData(prevUsers => [...prevUsers, ...response.data.Students]);


            } else {
                setError('Unexpected response format');
                setTimeout(() => {
                    setError('');
                }, 2000);
            }

            setLoading(false);
        } catch (err) {
            setError(err.message);
            console.log(err);
            setTimeout(() => {
                setError('');
            }, 2000);
            setLoading(false);
        }
    };


    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);

    const generateStudentResult = async (studentData, term) => {
        // Create temporary container
        const container = document.createElement('div');
        container.className = 'report-card border border-black';
        document.body.appendChild(container);

        try {
            // Fetch student's result and profile
            const [resultResponse, profileResponse, attendanceResponse] = await Promise.all([
                axios.get(`${BASE_URL_Result}/result/fetch/teacher?email=${studentData.email}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    }
                }),
                axios.post(`${BASE_URL_Login}/fetchSingle/student`, {
                    accessToken: authState.accessToken,
                    email: studentData.email
                }),
                // axios.get(`http://13.201.247.28:8000/studentAttendance/fetch/completeStats`, {
                //     params: {
                //         class: studentData.currentClass,
                //         id: studentData.id,
                //         year: '2024'
                //     },
                //     headers: {
                //         Authorization: `Bearer ${authState.accessToken}`
                //     }
                // })
            ]);

            const profile = profileResponse.data.StudentDetails[0];
            const details = resultResponse.data;
            console.log(details, 'nn', details[term])
            const attendance = attendanceResponse;

            // Populate container with result content
            container.innerHTML = `
              <div class="p-2 w-full">
                <div class="border border-black">
                  <div class="border-b border-black py-3 items-center bg-gradient-to-r from-blue-200 to-blue-100 text-center">
                    <h1 class="text-3xl font-semibold mb-2">Term 1: ${profile.session || "2024-25"}</h1>
                    <h6 class="text-2xl mb-2">Report Card</h6>
                  </div>
            
                  <div class="mb-4 flex justify-between m-3 text-xl">
                    <div class="leading-loose">
                      <p><strong class="font-medium">Student's Name:</strong> ${profile.name}</p>
                      <p><strong class="font-medium">Father's Name:</strong> ${profile.fatherName}</p>
                      <p><strong class="font-medium">Mother's Name:</strong> ${profile.motherName}</p>
                    </div>
                    <div class="leading-loose">
                      <p><strong class="font-medium">Admission No.:</strong> ${profile.admissionNumber || '123456'}</p>
                      <p><strong class="font-medium">Class & Section:</strong> ${profile.currentClass} ${profile.section}</p>
                      <p><strong class="font-medium">Date of Birth:</strong> ${profile.DOB}</p>
                    </div>
                  </div>
            
                  ${details ? `
                    ${details[term]?.length ? `
                      <div class="overflow-auto">
                        <table class="min-w-full border border-gray-200">
                          <thead class="bg-gradient-to-r from-blue-200 to-blue-100 text-xl font-medium whitespace-nowrap">
                            <tr class="text-center">
                              <th class="px-4 py-2 border">Scholastic Areas</th>
                              <th class="px-4 py-2 border">Note Book (${details[term][0]?.totalNoteBookMarks || ""})</th>
                              <th class="px-4 py-2 border">S.Enrichment (${details[term][0]?.totalSubjectEnrichmentMarks || ""})</th>
                              <th class="px-4 py-2 border">Marks Obt (${details[term][0]?.totalMarks || ""})</th>
                              <th class="px-4 py-2 border">Total</th>
                              <th class="px-4 py-2 border">%</th>
                              <th class="px-4 py-2 border">Grade</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${details[term].map((area, index) => ScholasticRow(area, index)).join("")}
                          </tbody>
                        </table>
                      </div>
                    ` : '<div class="font-medium text-center text-red-500">No Scholastic Data Available</div>'}
            
                    ${details[`${term}_Co_scholastic`]?.length ? `
                      <table class="min-w-full bg-white border border-gray-200">
                        <thead class="bg-gradient-to-r from-blue-200 to-blue-100 text-xl font-medium">
                          <tr>
                            <th class="px-4 pb-4 border text-start">Co-Scholastic Areas</th>
                            <th class="px-4 pb-4 border text-end">Grade</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${details[`${term}_Co_scholastic`].map((area, index) => `
                            <tr key=${index}>
                              <td class="px-4 pb-4 border text-start">${area.subject}</td>
                              <td class="px-4 pb-4 border text-end">${area.grade}</td>
                            </tr>
                          `).join("")}
                        </tbody>
                      </table>
                    ` : '<div class="font-medium text-center text-red-500">No Co-Scholastic Data Available</div>'}
                  ` : '<div class="font-medium text-center text-red-500">No Result Found</div>'}
            
                  <div class="border-b border-black">
                    <div class="flex items-center justify-between px-4 pb-4 bg-gradient-to-r from-blue-200 to-blue-100 text-xl">
                      <h2 class="font-semibold">Attendance:</h2>
                      <p><strong className='  font-medium'>Total:</strong>20</p>
                        <p><strong className=' font-medium'>Present:</strong> 20</p>
                        <p><strong className=' font-medium'>Percentage:</strong>20%</p>
                           </div>
                    <div class="mb-12 px-4">
                      <h2 class="text-xl font-semibold">Remarks:</h2>
                    </div>
            
                    <div class="sign flex items-baseline py-3 text-xl justify-evenly">
                      <p>Class Teacher</p>
                      <p>Coordinator</p>
                      <p>Principal</p>
                    </div>
                  </div>
         
                  <div class="flex gap-2">
                    <div class="flex-1">
                      <h1 class="text-center text-xl my-2">SCHOLASTIC</h1>
                      <table class="w-full bg-white border border-gray-200">
                        <thead class="bg-gradient-to-r from-blue-200 to-blue-100">
                          <tr>
                            <th class="px-4 pb-4 border">MARKS RANGE</th>
                            <th class="px-4 pb-4 border">GRADE</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${scholastic.map((item, index) => `
                            <tr class="text-center text-lg" key=${index}>
                              <td class="px-2 pb-4 border">${item.range}</td>
                              <td class="px-4 pb-4 border">${item.grade}</td>
                            </tr>
                          `).join("")}
                        </tbody>
                      </table>
                    </div>
                    <div class="flex-1">
                      <h1 class="text-center text-xl my-2">CO-SCHOLASTIC AND DISCIPLINE</h1>
                      <table class="w-full bg-white border border-gray-200">
                        <thead class="bg-gradient-to-r from-blue-200 to-blue-100">
                          <tr>
                            <th class="px-4 pb-4 border">PERFORMANCE INDICATORS</th>
                            <th class="px-4 pb-4 border">GRADE</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${coscholastic.map((item, index) => `
                            <tr class="text-center text-lg" key=${index}>
                              <td class="px-4 pb-4 border">${item.range}</td>
                              <td class="px-4 pb-4 border">${item.grade}</td>
                            </tr>
                          `).join("")}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            `;


            // Convert to canvas
            const canvas = await html2canvas(container, {
                scale: 2,
                useCORS: true,
                logging: true,
                allowTaint: true,
            });

            // Clean up
            document.body.removeChild(container);

            return canvas.toDataURL('image/png');
        } catch (error) {
            console.error(`Error generating result for ${studentData.name}:`, error);
            throw error;
        }
    };

    const handleBulkDownload = async () => {
        if (!selectedTermValue) {
            alert('Please select a term before downloading.');
            return;
        }
        setIsGenerating(true);
        setProgress(0);
        if (!Class) return;
        console.log(userData, 'in bulk')
        const pdf = new jsPDF('p', 'mm', 'a4', true);
        const pageWidth = pdf.internal.pageSize.width;
        const pageHeight = pdf.internal.pageSize.height;
        const margin = 10;

        try {
            let isFirstPage = true;
            for (let i = 0; i < userData.length; i++) {
                const student = userData[i];
                const imgData = await generateStudentResult(student, selectedTermValue);

                if (!isFirstPage) {
                    pdf.addPage();
                }

                // Add image to PDF
                const imgProps = pdf.getImageProperties(imgData);
                const imgWidth = pageWidth - (2 * margin);
                const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
                pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);

                isFirstPage = false;
                setProgress(((i + 1) / userData.length) * 100);
            }

            // Save the PDF
            pdf.save(`Class_${Class}_Results_${selectedSession}_Term_${selectedTermValue}.pdf`);
        } catch (error) {
            console.error('Error generating bulk PDF:', error);
            alert('Error generating PDF. Please try again.');
        } finally {
            setIsGenerating(false);
            setProgress(0);
        }
    };

    return (
        <>
            <div className='   '>
                <ToastContainer />
                <div className="flex items-center justify-between px-3 py-2">

                    <h1 className="text-xl font-medium mb-2 ">Report Card</h1>
                    <span className='w-fit flex items-center gap-2 mobile:max-laptop:hidden'>
                        <Selection
                            Class={Class}
                            Section={Section}
                            Session={selectedSession}
                            handleClassChange={handleClassChange}
                            handleSectionChange={handleSectionChange}
                            handleSessionChange={handleSessionChange}
                        />

                        <select
                            value={selectedTermValue}
                            onChange={(e) => setSelectedTermValue(e.target.value)}
                            className="border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 p-2 rounded"
                        >
                            <option value="" disabled>Select Term</option>
                            <option value="term1">Term 1</option>
                            <option value="halfYearly">Half Yearly</option>
                            <option value="term2">Term 2</option>
                            <option value="final">Final</option>

                        </select>
                        <div className="flex justify-between items-center">
                            <motion.button
                                className="bg-green-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition-colors duration-200 disabled:bg-gray-400"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleBulkDownload}
                                disabled={isGenerating}
                            >
                                {isGenerating ? `Generating... ${Math.round(progress)}%` : 'Download All Results'}
                            </motion.button>
                        </div>
                    </span>
                </div>

            </div>
            <div className=" w-full items-start overflow-y-auto  px-2 no-scrollbar mobile:max-tablet:mt-2 ">
                {loading && start == 0 ? (
                    <Loading />
                ) : userData.length === 0 ? (
                    <>No student found</>
                ) : (
                    <motion.div
                        className='rounded-lg shadow-lg border border-purple-200 w-full mb-4 overflow-hidden bg-white'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        ref={containerRef}
                    >
                        <table className="min-w-full border-collapse border border-gray-200">
                            <Header headings={['Name', 'Class', 'Section', 'Email', 'Action']} />
                            <tbody>
                                {userData.map((detail, index) => (
                                    <motion.tr
                                        className='hover:bg-purple-100 transition-colors duration-200 border-b border-gray-200'
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                    >
                                        <td className="py-3 px-6 text-center text-gray-800 whitespace-nowrap">{detail.name}</td>
                                        <td className='py-3 px-6 text-center text-gray-800 whitespace-nowrap'>{detail.currentClass}</td >
                                        <td className='py-3 px-6 text-center text-gray-800 whitespace-nowrap'>{detail.section}</td >
                                        <td className='py-3 px-6 text-center text-gray-800 whitespace-nowrap flex items-center gap-3'>
                                            <img src={detail.profileLink} alt={detail.name} className='w-8 h-8 rounded-full object-cover border-2 border-purple-300 mobile:max-tablet:hidden' />
                                            <span className='text-purple-600'>{detail.email}</span>
                                        </td >
                                        <td className="py-3 px-4 text-center whitespace-nowrap">
                                            <Link to={`/Sub-Admin/Result/${detail.email}?session=${selectedSession}&Class=${Class}`} key={index}>
                                                <motion.button
                                                    className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-600 transition-colors duration-200"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Result
                                                </motion.button>
                                            </Link>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                            <div ref={sentinelRef} className="h-10"></div>
                            {loading && start > 0 && (
                                <div className="text-center w-full text-gray-600 text-sm">Loading more...</div>
                            )}

                        </table>
                    </motion.div>
                )}

            </div>
        </>
    )
}

export default ReportCardSubAdmin











