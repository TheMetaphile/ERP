import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaLayerGroup } from 'react-icons/fa';
// import { useFilters } from '../Students/utils/Filters';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL } from '../../../Config';
import axios from 'axios';
import SemesterPendingFee from './utils/SemesterPendingFee';
import { toast, ToastContainer } from 'react-toastify';

const getSessions = () => {
    const currentYear = new Date().getFullYear();
    const newSessions = [];

    for (let i = 0; i < 5; i++) {
        const startYear = currentYear - i;
        const endYear = startYear + 1;
        newSessions.push(`${startYear}-${endYear.toString().slice(-2)}`);
    }

    return newSessions;
}

const PendingFee = () => {
    const { authState, logout, updateAccessToken } = useContext(AuthContext);
    const session = getSessions();
    const [selectedSession, setSelectedSession] = useState(session[0]);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [section, setSelectedSection] = useState('');
    const [sectionsDetails, setSectionsDetails] = useState([]);

    const handleClassChange = (e) => {
        const selectedClass = e.target.value;
        setSelectedClass(selectedClass);

        if (selectedClass) {
            fetchSections(selectedClass);
        } else {
            setSectionsDetails([]);
        }
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const handleSectionChange = (e) => {
        setSelectedSection(e.target.value);
    };

    const handleChange = (event) => {
        setSelectedSession(event.target.value);
    };

    const fetchSections = async (selectedClass) => {
        try {
            const response = await axios.post(`${BASE_URL}/classTeacher/fetch/sections`, {
                accessToken: authState?.accessToken,
                class: selectedClass,
            });
            console.log(response.data, 'section')
            const sectionsDetail = response.data.sections.map(sectionObj => sectionObj.section);
            setSectionsDetails(sectionsDetail);
        } catch (error) {
            console.error("Error while fetching section:", error);
        }
    };


    //console.log("Course options: ", courseOptions);


    const handleDownload = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/fee/export/Pending/${selectedClass}/${section}/${selectedSession}/${selectedMonth}`, {
                headers: {
                    'Authorization': `Bearer ${authState?.accessToken}`
                },
                responseType: 'blob'
            });

            const link = document.createElement('a');

            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            const url = window.URL.createObjectURL(blob);

            link.href = url;
            link.setAttribute('download', `Pending_Fee_${selectedClass}_${section}_${selectedMonth}_${selectedSession}.xlsx`);

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error fetching back fee status:', error);
            //console.error('Error fetching agents:', error.response.data.error);
        }
    };

    return (
        <div className="flex flex-col flex-grow">
            <ToastContainer />
            <div className="bg-white flex-grow rounded-lg shadow-lg p-2">
                <div className="flex justify-between items-center mb-4 mobile:max-tablet:flex-col">
                    <h1 className="text-2xl font-bold mb-3 mobile:max-tablet:text-sm mobile:max-tablet:font-semibold">
                        Session Pending Fee Dashboard
                    </h1>
                    <div className='flex justify-end gap-2 mobile:max-tablet:flex-col'>
                        <div className=' flex gap-2'>
                            <select id="sessionSelector" value={selectedSession} onChange={handleChange} className="bg-white border-2 border-blue-300 rounded-md py-2 px-4 text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
                                {session.map((session, index) => (
                                    <option key={index} value={session}>{session}</option>
                                ))}
                            </select>
                            <select id="Class" name="Class" value={selectedClass} onChange={handleClassChange} className="bg-white border-2 border-blue-300 rounded-md py-2 px-4 text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
                                <option value="">Select Class</option>
                                {["Pre-Nursery", "Nursery", "L.K.G", "U.K.G", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"].map(cls => (
                                    <option key={cls} value={cls}>{cls}</option>
                                ))}
                            </select>
                        </div>
                        <select id="section" value={section} onChange={handleSectionChange} className="bg-white border-2 border-blue-300 rounded-md py-2 px-4 text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
                            <option value="">Select Section</option>
                            {sectionsDetails.map((section, index) => (
                                <option key={index} value={section}>{section}</option>
                            ))}
                        </select>
                        <select id="Month" name="Month" value={selectedMonth} onChange={handleMonthChange} className="bg-white border-2 border-blue-300 rounded-md py-2 px-4 text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
                            <option value="">Select Month</option>
                            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",].map(mon => (
                                <option key={mon} value={mon}>{mon}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex justify-end items-center mb-3">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
                        onClick={handleDownload}
                    >
                        Download Report
                    </button>
                </div>

                <SemesterPendingFee selectedClass={selectedClass} selectedSection={section} selectedMonth={selectedMonth} selectedSession={selectedSession}/>
            </div>
        </div>
    );
};

export default PendingFee;
