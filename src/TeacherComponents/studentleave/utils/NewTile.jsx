import React, { useState, useContext, useEffect } from 'react';
import Logo from '../../../assets/Test Account.png'
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import axios from 'axios'
import AuthContext from '../../../Context/AuthContext';

export default function NewTile({ data }) {
    const [expanded, setExpanded] = useState(null);
    const { authState } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        if (data && data.StudentsLeaves) {
            setLeaves(data.StudentsLeaves);
        }
    }, [data]);

    const handleClick = (index) => {
        setExpanded(expanded === index ? null : index);
    }

    const handleStatusUpdate = async (leaveId, status, email) => {
        console.log('id', leaveId, 'status', status, 'email', email)
        setLoading(true);
        try {
            const response = await axios.put('https://studentleaveapi.onrender.com/leave/update',{
                    status: status,
                    leaveId: leaveId
                },
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                }
            );
            console.log(`Leave ${leaveId} status updated to ${status}:`, response.data);
            setLeaves(prevLeaves => prevLeaves.filter(leave => leave._id !== leaveId));
        } catch (err) {
            console.error("Error updating status");
            setError(`Error updating status: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            {leaves.length > 0 ? (
                leaves.filter(student => student.status === "Pending").map((student, studentIndex) => (
                    <div key={studentIndex} className="border p-2 justify-between rounded-lg shadow-md mt-3 flex items-center">
                        <div className='flex items-center'>
                            <img src={student.profileLink} alt="" className='w-10 h-10 rounded-full' />
                            <div>
                                <div className='font-medium text-base ml-2'>
                                    <span className='text-red-500 whitespace-nowrap'>{student.name}</span> from class &nbsp;
                                    <span className='text-red-500 whitespace-nowrap'>{data.class} {data.section}</span> wants a Leave Request from &nbsp;
                                    <span className='text-red-500 whitespace-nowrap'>{student.startDate}</span> to &nbsp;
                                    <span className='text-red-500 whitespace-nowrap'>{student.endDate}</span>
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
                                            className='p-1 rounded-lg border border-gray-300 text-black px-2 bg-green-300'
                                            onClick={() => handleStatusUpdate(student._id, 'Approved', student.email)}
                                            disabled={loading}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className='p-1 rounded-lg text-black border border-gray-300 px-2 bg-red-300'
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
            ) : (
                <div>No new leave</div>
            )}

        </div>

    )
}

