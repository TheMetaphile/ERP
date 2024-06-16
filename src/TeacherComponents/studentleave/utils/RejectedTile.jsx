import React, { useState } from 'react';
import Logo from '../../../assets/Test Account.png'
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";



export default function RejectedTile({ data }) {
    const [expanded, setExpanded] = useState(null);


    const handleClick = (index) => {
        setExpanded(expanded === index ? null : index);
    }

    return (
        <div className="w-full">
            {
                data.StudentsLeaves.filter(student => student.status === 'Rejected').map((student, studentIndex) => (
                    <div key={student._id} className="border p-2 justify-between rounded-lg shadow-md mt-3 flex items-center">
                        <div className='flex'>
                            <img src={student.profileLink || Logo} alt="" className='w-10 h-10 rounded-full' />
                            <div>
                                <div className='font-medium text-base ml-2'>
                                    <span className='text-red-500'>{student.name}</span> from class &nbsp;
                                    <span className='text-red-500'>{data.class} {data.section}</span> wants a Leave Request to you from &nbsp;
                                    <span className='text-red-500'>{student.startDate}</span> to &nbsp;
                                    <span className='text-red-500'>{student.endDate}</span>
                                </div>
                                {expanded === studentIndex && (
                                    <div className='font-medium text-base ml-2 mt-2'>
                                        <span className='text-gray-400 text-xl'>Reason</span>
                                        <div className='border rounded-lg shadow-md p-3'>
                                            <span className='text-gray-700'>{student.reason}</span>
                                        </div>
                                    </div>
                                )}
                                <div className='flex gap-2 font-medium text-base ml-2 mt-2'>
                                    <span className='p-1 rounded-lg text-red-500 bg-red-300'>{student.status}</span>
                                </div>
                            </div>
                        </div>
                        <div className='items-center px-3 cursor-pointer' onClick={() => handleClick(studentIndex)}>
                            {expanded === studentIndex ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                    </div>
                ))
            }
            {data.StudentsLeaves.filter(student => student.status === 'Rejected').length === 0 && (
                <div>No rejected leaves</div>
            )}
        </div>
    )
}

