import React, { useEffect, useState } from 'react';
import FeeAdminRow from './FeeAdminRow'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';

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

function FeeStructureSubAdmin() {

    const session = getSessions();
    const [selectedSession, setSelectedSession] = useState(session[0]);



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
                        {session.map((session, index) => (
                            <option key={index} value={session}>
                                {session}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <table className="w-full  mt-3">
                <Header headings={['Classes', 'Admission Fee', 'Monthly Fee', 'Quarter Fee',  'Action']} />
                <tbody>
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
    );
}



export default FeeStructureSubAdmin;
