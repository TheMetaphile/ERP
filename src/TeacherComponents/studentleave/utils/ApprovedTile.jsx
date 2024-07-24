import React, { useState, useContext } from 'react';
import Logo from '../../../assets/Test Account.png'
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";


export default function ApprovedTile({ data }) {
    const [expanded, setExpanded] = useState(null);


    const handleClick = (index) => {
        setExpanded(expanded === index ? null : index);
    }

    return (
        <div className="w-full ">
            {data.StudentsLeaves.filter(student => student.status === 'Approved').map((student, studentIndex) => (
                <div key={student._id} className="border border-gray-300 p-2 justify-between rounded-lg shadow-md mt-3  items-center" onClick={() => handleClick(studentIndex)}>

                    <div className='font-medium w-full text-base ml-2 flex text-center justify-between items-center'>
                        <div className='flex items-center'>
                            leave Request
                            <div className="flex">
                                <img src={student.profileLink} alt="" className='w-10 h-10 rounded-full mr-3' />
                            </div>
                            <span className='text-red-500 whitespace-nowrap'>{student.name}</span>Class &nbsp;
                            <span className='text-red-500 whitespace-nowrap'>{data.class} {data.section}</span>&nbsp;
                            <span className='text-red-500 whitespace-nowrap'>{student.startDate}</span> to &nbsp;
                            <span className='text-red-500 whitespace-nowrap'>{student.endDate}</span>
                        </div>
                        <div className='items-center px-3 cursor-pointer'>
                            {expanded === `${studentIndex}` ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
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
                        <span className='p-1 rounded-lg text-green-500 '>{student.status}</span>
                    </div>



                </div>
            ))}
            {data.StudentsLeaves.filter(student => student.status === 'Approved').length === 0 && (
                <div>No approved leaves</div>
            )}
        </div>
    )
}

