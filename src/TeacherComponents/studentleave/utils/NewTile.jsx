import React, { useState, useContext } from 'react';
import Logo from '../../../assets/Test Account.png'
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import axios from 'axios'
import AuthContext from '../../../Context/AuthContext';

export default function NewTile({ data }) {
    const [expanded, setExpanded] = useState(null);
    const { authState } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleClick = (index) => {
        setExpanded(expanded === index ? null : index);
    }
    const handleStatusUpdate = async (leaveId, status, email) => {
        console.log('id',leaveId, 'status', status, 'email', email)
        // setLoading(true);
        // try {
        //     const response = await axios.post('https://studentleaveapi.onrender.com/leave/update', {
        //         accessToken: authState.accessToken,
        //         status: status,
        //         email: email,
        //         leaveId: leaveId
        //     });
        //     console.log(`Leave ${leaveId} status updated to ${status}:`, response.data);
        // } catch (err) {
        //     console.error(`Error updating status for leave ${leaveId}:`, err);
        //     setError(`Error updating status: ${err.message}`);
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <div className="w-full">
            {data.StudentsLeaves.map((student, studentIndex) => (
                student.status === "Pending" && (
                    <div key={studentIndex} className="border p-2 justify-between rounded-lg shadow-md mt-3 flex items-center">
                        <div className='flex items-center'>
                            <img src={student.profileLink} alt="" className='w-10 h-10 rounded-full' />
                            <div>
                                <div className='flex gap-2 font-medium text-base ml-2'>
                                    <span className='text-red-500'>{student.name}</span> from class
                                    <span className='text-red-500'>{data.class } {data.section}</span> wants a Leave Request to you from 
                                    <span className='text-red-500'>{student.startDate}</span> to 
                                    <span className='text-red-500'>{student.endDate}</span>  
                                </div>
                                {expanded === `${studentIndex}` && (
                                    <div className='font-medium text-base ml-2 mt-2'>
                                        <span className='text-gray-400 text-xl'>Reason</span>
                                        <div className='mt-2'>
                                            <span className='text-gray-700'>{student.reason}</span>
                                        </div>
                                    </div>
                                )}
                                <div className='flex gap-2 font-medium text-base ml-2 mt-2'>
                                    <>
                                        <button
                                            className='p-1 rounded-lg text-green-500 bg-green-300'
                                            onClick={() => handleStatusUpdate(student._id, 'Approved', student.email)}
                                            disabled={loading}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className='p-1 rounded-lg text-red-500 bg-red-300'
                                            onClick={() => handleStatusUpdate(student._id, 'Rejected', student.email)}
                                            disabled={loading}
                                        >
                                            Reject
                                        </button>
                                    </>
                                </div>
                            </div>
                        </div>
                        <div className='items-center px-3 cursor-pointer' onClick={() => handleClick(`${studentIndex}`)}>
                            {expanded === `${studentIndex}` ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                    </div>
                ))
            )}
            {error && <div className="text-red-500 mt-3">{error}</div>}
        </div>
    )
}

