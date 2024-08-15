import React, { useEffect, useState } from 'react';
import FeeAdminRow from './FeeAdminRow';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import { FaGraduationCap, FaChevronDown } from 'react-icons/fa';

const getSessions = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => {
        const startYear = currentYear - i;
        return `${startYear}-${(startYear + 1).toString().slice(-2)}`;
    });
};

function FeeStructureSubAdmin() {
    const sessions = getSessions();
    const [selectedSession, setSelectedSession] = useState(sessions[0]);
    const handleChange = (event) => {
        setSelectedSession(event.target.value);
    };
    const content = [
        { class: 'Pre-Nursery-U.K.G' },
        { class: '1st-5th' },
        { class: '6th-8th' },
        { class: '9th-10th' },
        { class: '11th-12th Com./Huma' },
        { class: '11th-12th Science' },
    ];

    return (
        <div className=" min-h-screen p-8">
            <ToastContainer />


            <div className='flex justify-between items-center'>
                <h1 className="text-3xl font-bold text-indigo-800 flex items-center ">
                    <FaGraduationCap className="mr-4 text-4xl" />
                    Fee Structure Management
                </h1>
                <div className='relative'>

                    <select id="sessionSelector" value={selectedSession} onChange={handleChange} className="bg-white border-2 border-indigo-300 rounded-md py-2 px-4 text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300">
                        {sessions.map((session, index) => (
                            <option key={index} value={session}>{session}</option>
                        ))}
                    </select>
                    <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" />
                </div>
            </div>

            <div className="overflow-x-auto mt-4 rounded-md ">
                <table className="w-full border ">
                    <Header headings={['Class Group', 'Admission Fee', 'Monthly Fee', 'Quarterly Fee', 'Actions']} />
                    <tbody className="divide-y divide-gray-200">
                        {content.map((con, index) => (
                            <FeeAdminRow
                                Class={con.class}
                                key={index}
                                session={selectedSession}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default FeeStructureSubAdmin;