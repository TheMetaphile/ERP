import React, { useState } from 'react';
import FeeAdminRow from './FeeAdminRow';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FeeStructure() {
    const sessions = [
        '2020-21',
        '2021-22',
        '2022-23',
        '2023-24',
        '2024-25',
    ];

    // State to store the selected session
    const [selectedSession, setSelectedSession] = useState(sessions[3]);
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

export default FeeStructure;

