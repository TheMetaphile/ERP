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
        setLoading(true);
        try {
            const response = await axios.post('https://studentleaveapi.onrender.com/leave/update', {
                accessToken: authState.accessToken,
                status: status,
                email: email,
                leaveId: leaveId
            });
            console.log(`Leave ${leaveId} status updated to ${status}:`, response.data);
        } catch (err) {
            console.error(`Error updating status for leave ${leaveId}:`, err);
            setError(`Error updating status: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            {data.map((student, studentIndex) => (
                student.leaves.filter(leave => !leave.status).map((leave, leaveIndex) => (
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
                                    <>
                                        <button
                                            className='p-1 rounded-lg text-green-500 bg-green-300'
                                            onClick={() => handleStatusUpdate(leave._id, 'Approved', student.email)}
                                            disabled={loading}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className='p-1 rounded-lg text-red-500 bg-red-300'
                                            onClick={() => handleStatusUpdate(leave._id, 'Rejected', student.email)}
                                            disabled={loading}
                                        >
                                            Reject
                                        </button>
                                    </>
                                </div>
                            </div>
                        </div>
                        <div className='items-center px-3 cursor-pointer' onClick={() => handleClick(`${studentIndex}-${leaveIndex}`)}>
                            {expanded === `${studentIndex}-${leaveIndex}` ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                    </div>
                ))
            ))}
            {error && <div className="text-red-500 mt-3">{error}</div>}
        </div>
    )
}

