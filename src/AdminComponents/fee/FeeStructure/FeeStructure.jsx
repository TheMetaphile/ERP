import React, { useEffect, useState } from 'react';
import FeeAdminRows from './FeeAdminRows';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';

function FeeStructure() {

    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(sessions[0]);

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

    console.log(selectedSession)

    const content = [
        { class: 'Pre-Nursery-U.K.G' },
        { class: '1st-5th' },
        { class: '6th-8th' },
        { class: '9th-10th' },
        { class: '11th-12th Com./Huma' },
        { class: '11th-12th Science' },
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
            <table className="w-full border-collapse">
                <Header headings={['Classes', 'Admission Fee', 'Monthly Fee', 'Quarter Fee', 'Action']} />
                <tbody>
                    {content.map((con, index) => (
                        <FeeAdminRows
                            Class={con.class}
                            key={index}
                            session={selectedSession}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FeeStructure;

