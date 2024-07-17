import React, { useState } from 'react';
import { reportData } from './Reportdata';

const Dashboard = () => {
    const [selectedTab, setSelectedTab] = useState('term1');
    const data = reportData[selectedTab];

    const calculateFinalResults = () => {
        const finalResults = [];

        reportData.term1.scholasticAreas.forEach((subjectTerm1, index) => {
            const subjectTerm2 = reportData.term2.scholasticAreas[index];

            const finalResult = {
                subject: subjectTerm1.subject,
                noteBook: subjectTerm1.noteBook + subjectTerm2.noteBook,
                sEnrichment: subjectTerm1.sEnrichment + subjectTerm2.sEnrichment,
                marksObt: subjectTerm1.marksObt + subjectTerm2.marksObt,
                total: subjectTerm1.total + subjectTerm2.total,
                percentage: ((subjectTerm1.percentage + subjectTerm2.percentage) / 2).toFixed(2),
                grade: (subjectTerm1.grade === subjectTerm2.grade) ? subjectTerm1.grade : `${subjectTerm1.grade}, ${subjectTerm2.grade}`,
            };

            finalResults.push(finalResult);
        });

        return finalResults;
    };

    const finalResults = selectedTab === 'academic' ? calculateFinalResults() : data.scholasticAreas;

    return (
        <div className="p-4">
            <div className="flex justify-between mb-4">
                <button onClick={() => setSelectedTab('term1')} className={`btn ${selectedTab === 'term1' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Term 1</button>
                <button onClick={() => setSelectedTab('term2')} className={`btn ${selectedTab === 'term2' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Term 2</button>
                <button onClick={() => setSelectedTab('academic')} className={`btn ${selectedTab === 'academic' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Academic Result</button>
            </div>
            <div className="report-card border border-black m-10">
                <div className=' border-b border-black py-3 bg-teal-200 text-center'>
                    <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
                    <h6 className="text-xl ">Report Card</h6>
                </div>

                <div className="mb-4 flex justify-between m-3">
                    <div className=' leading-loose'>
                        <p><strong>Student's Name:</strong> {data.studentName}</p>
                        <p><strong>Father's Name:</strong> {data.fatherName}</p>
                        <p><strong>Mother's Name:</strong> {data.motherName}</p></div>
                    <div className=' leading-loose'>
                        <p><strong>Admission No.:</strong> {data.admissionNo}</p>
                        <p><strong>Class & Section:</strong> {data.classSection}</p>
                        <p><strong>Date of Birth:</strong> {data.dob}</p>
                    </div>


                </div>
                <div className="">
                    <table className="min-w-full border border-gray-200">
                        <thead className=' bg-teal-200'>
                            <tr>
                                <th className="px-4 py-2 border">Scholastic Areas</th>
                                <th className="px-4 py-2 border">Note Book</th>
                                <th className="px-4 py-2 border">S.Enrichment</th>
                                <th className="px-4 py-2 border">Marks Obt</th>
                                <th className="px-4 py-2 border">Total</th>
                                <th className="px-4 py-2 border">%</th>
                                <th className="px-4 py-2 border">Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {finalResults.map((area, index) => (
                                <tr className=' text-center' key={index}>
                                    <td className="px-4 py-2 border-x border-gray-200">{area.subject}</td>
                                    <td className="px-4 py-2 border-x border-gray-200">{area.noteBook}</td>
                                    <td className="px-4 py-2 border-x border-gray-200">{area.sEnrichment}</td>
                                    <td className="px-4 py-2 border-x border-gray-200">{area.marksObt}</td>
                                    <td className="px-4 py-2 border-x border-gray-200">{area.total}</td>
                                    <td className="px-4 py-2 border-x border-gray-200">{area.percentage}</td>
                                    <td className="px-4 py-2 border-x border-gray-200">{area.grade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className=' bg-teal-200'>
                            <tr>
                                <th className="px-4 py-2 border">Co-Scholastic Areas:</th>
                                <th className="px-4 py-2 border">Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.coScholasticAreas.map((area, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border">{area.area}</td>
                                    <td className="px-4 py-2 border">{area.grade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className=' border-b border-black'>
                    <div className="mb-4 flex bg-teal-200 items-center justify-between p-2 ">
                        <h2 className="text-xl font-semibold">Attendance:</h2>
                        <p><strong>Total:</strong> {data.attendance.total}</p>
                        <p><strong>Present:</strong> {data.attendance.present}</p>
                        <p><strong>Percentage:</strong> {data.attendance.percentage}%</p>
                    </div>
                    <div className="mb-4 flex items-center gap-2 p-2">
                        <h2 className="text-xl font-semibold">Remarks:</h2>
                        <p>{data.remarks}</p>
                    </div>
                    <div className="sign flex items-baseline py-3 justify-evenly">
                        <p>Class Teacher</p>
                        <p>Coordinator</p>
                        <p>Principal</p>
                    </div>
                </div>

                <div className=' flex gap-2'>
                    <div className="flex-1">
                        <h1 className=' text-center text-xl'>SCHOLASTIC</h1>
                        <table className="w-full bg-white border border-gray-200">
                            <thead className=' bg-teal-200'>
                                <tr>
                                    <th className="px-4 py-2 border">MARKS RANGE</th>
                                    <th className="px-4 py-2 border">GRADE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.scholastic.map((item, index) => (
                                    <tr className=' text-center' key={index}>
                                        <td className="px-2 py-2 border w-1/2">{item.range}</td>
                                        <td className="px-4 py-2 border w-1/2">{item.grade}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex-1 h-full">
                        <h1 className=' text-center text-xl'>CO-SCHOLASTIC AND DISCIPLINE</h1>
                        <table className="w-full bg-white border border-gray-200">
                            <thead className=' bg-teal-200'>
                                <tr>
                                    <th className="px-4 py-2 border whitespace-nowrap">PERFOMANCE INDICATORS</th>
                                    <th className="px-4 py-2 border">GRADE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.coscholastic.map((item, index) => (
                                    <tr className='text-start' key={index}>
                                        <td className="px-4 py-10 border w-1/2">{item.range}</td>
                                        <td className="px-4 py-10 border w-1/2 text-center">{item.grade}</td>
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

export default Dashboard;
