import React, { useState, useEffect } from 'react';
import FeeAdminRow from './FeeAdminRow';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FeeStructureSubAdmin() {
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(sessions[1]);

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const newSessions = [];

        for (let i = 0; i < 5; i++) {
            const startYear = currentYear - i;
            const endYear = startYear + 1;
            newSessions.push(`${startYear}-${endYear.toString().slice(-2)}`);
        }

        setSessions(newSessions);
    }, []);

    const handleChange = (event) => {
        setSelectedSession(event.target.value);
    };
    const content = [
        { class: 'Pre-Nursery' },
        { class: 'L.K.J' },
        { class: 'U.K.J' },
        { class: '1st' },
        { class: '2nd' },
        { class: '3rd' },
        { class: '4th' },
        { class: '5th' },
        { class: '6th' },
        { class: '7th' },
        { class: '8th' },
        { class: '9th' },
        { class: '10th' },
        { class: '11th' },
        { class: '12th' },
    ];

    return (
        <div className=" flex flex-col px-3 mobile:max-tablet:px-0  overflow-auto items-start mt-2  mb-3 no-scrollbar">
            <ToastContainer />
            <div className='flex w-full justify-between'>
            <h1 className="text-2xl p-2">Fee Structure</h1>
            <div className='border border-gray-300 rounded-lg'>
                        <select
                            id="sessionSelector"
                            value={selectedSession}
                            onChange={handleChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            {sessions.map((session, index) => (
                                <option key={index} value={session}>
                                    {session}
                                </option>
                            ))}
                        </select>
                    </div>
            </div>
            <div className=" w-full flex flex-col px-3 mobile:max-tablet:px-0 overflow-auto items-start mt-2 mb-3 no-scrollbar">
                {content.map((con, index) => (
                    <FeeAdminRow Class={con.class} key={index} session={selectedSession}/>
                ))}
            </div>
        </div>
    );
}

export default FeeStructureSubAdmin;

