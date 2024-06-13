import React, { useState } from 'react';
import Logo from '../../../assets/Test Account.png'
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";



export default function RejectedTile({data}) {
    const [expanded, setExpanded] = useState(null);


    const handleClick = (index) => {
        setExpanded(expanded === index ? null : index);
    }
 
    return (
        <div className=" w-full">
            {data.map((student, studentIndex) => (
                student.leaves.filter(leave=>leave.status==='Rejected').map((leave, leaveIndex) => (
                    <div key={leave._id} className="border p-2 justify-between rounded-lg shadow-md mt-3 flex items-center">
                        <div className='flex'>
                            <img src={Logo} alt="" className='h-12' />
                            <div>
                                <div className='flex gap-2 font-medium text-base ml-2'>
                                    <span className='text-red-500'>{student.name}</span> from class
                                    <span className='text-red-500'>{student.class || 'N/A'}</span> wants a Leave Request to you
                                </div>
                                {expanded === `${studentIndex}-${leaveIndex}` && (
                                    <div className='font-medium text-base ml-2 mt-2'>
                                        <span className='text-gray-400 text-xl'>Reason</span>
                                        <div className='border rounded-lg shadow-md p-3'>
                                            <span className='text-gray-700'>{leave.reason}</span>
                                        </div>
                                    </div>
                                )}
                                <div className='flex gap-2 font-medium text-base ml-2 mt-2'>
                                    <span className='p-1 rounded-lg text-green-500 bg-green-300'>{leave.status}</span>  
                                </div>
                            </div>
                        </div>
                        <div className='items-center px-3 cursor-pointer' onClick={() => handleClick(`${studentIndex}-${leaveIndex}`)}>
                            {expanded === `${studentIndex}-${leaveIndex}` ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                    </div>
                ))
            ))}


        </div>
    )
}

