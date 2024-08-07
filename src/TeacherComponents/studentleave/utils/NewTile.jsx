import React, { useState, useContext, useEffect } from 'react';
import Logo from '../../../assets/Test Account.png'
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import axios from 'axios'
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL_Student_Leave } from '../../../Config';

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
            const response = await axios.put(`${BASE_URL_Student_Leave}/leave/update`,
                {
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
            setError(`Error updating status: ${err}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            {data.length > 0 ? (
                data.filter(student => student.status === "Pending").map((student, studentIndex) => (
                    <div key={studentIndex} className=" border p-2 justify-between rounded-lg shadow-md mt-3 flex items-center " onClick={() => handleClick(`${studentIndex}`)}>
                        <div className='w-full'>
                            <div className='font-medium w-full text-base ml-2 flex text-center justify-between items-center'>
                                <div className='flex gap-2 items-center mobile:max-tablet:flex-col mobile:max-tablet:items-start'>
                                    <div className=' flex items-center'>
                                        <img src={student.profileLink} alt="" className='w-10 h-10 mobile:max-tablet:w-8 mobile:max-tablet:h-8 rounded-full mr-3' />
                                        <span className='text-red-500 whitespace-nowrap'>{student.name}&nbsp;</span>
                                    </div>
                                    <div>
                                        Class &nbsp;
                                        <span className='text-red-500 whitespace-nowrap'>{authState.ClassDetails.class} {authState.ClassDetails.section}&nbsp;</span>
                                    </div>
                                    Leave Request
                                    <div className=' flex gap-1'>
                                        <p>From: </p>
                                        <span className='text-red-500 whitespace-nowrap'>{student.startDate}&nbsp;</span>
                                        <p>To </p>
                                        <span className='text-red-500 whitespace-nowrap'>{student.endDate}</span>
                                    </div>
                                </div>
                                <div className='items-center px-3 mobile:max-tablet:pl-0 cursor-pointer'>
                                    {expanded === `${studentIndex}` ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                            </div>
                            {expanded === `${studentIndex}` && (
                                <div className='font-medium text-base ml-2 mt-2'>
                                    <span className='text-gray-400 text-xl'>Reason</span>
                                    <div className='mt-2 text-gray-700 font-normal text-justify'>
                                        {student.reason}
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
                ))
            ) : (
                <div>No new leave</div>
            )}
            {data.filter(student => student.status === 'Approved').map((student, studentIndex) => (
                <div key={student._id} className="border border-gray-300 p-2 justify-between rounded-lg shadow-md mt-3  items-center" onClick={() => handleClick(studentIndex)}>

                    <div className='font-medium w-full text-base ml-2 flex text-center justify-between items-center'>
                        <div className='font-medium w-full text-base ml-2 flex text-center justify-between items-center'>
                            <div className='flex gap-2 items-center mobile:max-tablet:flex-col mobile:max-tablet:items-start'>
                                <div className='flex items-center'>
                                    <img src={student.profileLink} alt="" className='w-10 h-10 rounded-full mobile:max-tablet:w-8 mobile:max-tablet:h-8 mr-3' />
                                    <span className='text-red-500 whitespace-nowrap'>{student.name}&nbsp;</span>
                                </div>
                                <div>
                                    Class:
                                    <span className='text-red-500 whitespace-nowrap'>{authState.ClassDetails.class}
                                        {authState.ClassDetails.section}</span> </div>
                                Leave Request
                                <div className=' flex gap-1'>
                                    <p>From :</p>
                                    <span className='text-red-500 whitespace-nowrap'>{student.startDate}&nbsp;</span>
                                    <p>To</p>
                                    <span className='text-red-500 whitespace-nowrap'>{student.endDate}</span>
                                </div>
                            </div>
                        </div>
                        <div className='items-center px-3  mobile:max-tablet:pl-0 cursor-pointer'>
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

            {data.filter(student => student.status === 'Rejected').map((student, studentIndex) => (
                <div key={student._id} className="border border-gray-300 p-2 justify-between rounded-lg shadow-md mt-3 items-center" onClick={() => handleClick(studentIndex)}>
                    <div className='font-medium w-full text-base ml-2 flex text-center justify-between items-center'>
                        <div className='flex gap-2 items-center mobile:max-tablet:flex-col mobile:max-tablet:items-start'>
                            <div className='flex items-center'>
                                <img src={student.profileLink} alt="" className='w-10 h-10 rounded-full mr-3' />
                                <span className='text-red-500 whitespace-nowrap'>{student.name}&nbsp;</span>
                            </div>
                            <div>
                                Class:
                                <span className='text-red-500 whitespace-nowrap'>{authState.ClassDetails.class} {authState.ClassDetails.section}&nbsp;</span>
                            </div>
                            Leave Request
                            <div className=' flex gap-1'>
                                <p> From</p>
                                <span className='text-red-500 whitespace-nowrap'>{student.startDate}&nbsp;</span>
                                <p>To</p>
                                <span className='text-red-500 whitespace-nowrap'>{student.endDate}</span>
                            </div>
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
                        <span className='p-1 rounded-lg text-red-500 '>{student.status}</span>
                    </div>
                </div>
            ))}
        </div>

    )
}

