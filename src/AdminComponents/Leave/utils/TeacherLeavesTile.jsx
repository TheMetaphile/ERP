import React, { useState, useContext, useEffect } from 'react';
import Logo from '../../../assets/Test Account.png'
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import axios from 'axios'
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL_TeacherLeave } from '../../../Config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TeacherLeavesTile({ data }) {
    const [expanded, setExpanded] = useState(null);
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [leaves, setLeaves] = useState([]);
    const [selectedLeave, setSelectedLeave] = useState(null);


   

    const handleClick = (index) => {
        setExpanded(expanded === index ? null : index);
    }

    function getCurrentSession() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        if (currentMonth >= 3) {
            return `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
        } else {
            return `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
        }
    }

    const handleAction = async (actionType, id) => {
        console.log(id);
        const session = getCurrentSession();
        try {
            const response = await axios.put(
                `${BASE_URL_TeacherLeave}/leave/update?leaveId=${id}&session=${session}`,
                { status: actionType },
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                }
            );

            if (response.status === 200) {
                const updatedLeaves = leaves.map((leave) =>
                    leave._id === id ? { ...leave, status: actionType } : leave
                );
                setLeaves(updatedLeaves);
                setSelectedLeave(null);
                toast.success(`Leave ${actionType === 'Approved' ? 'Approved' : 'Rejected'}`);
            } else {
                console.error('Unexpected response:', response);
                toast.error('Failed to update leave status');
            }
        } catch (err) {
            console.error('Error updating leave:', err.message);
            toast.error('Error updating leave');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            {data.length > 0 ? (
                data.map((teacher, teacherIndex) => (
                    <div key={teacherIndex} className=" border p-2 justify-between rounded-lg shadow-md mt-3 flex items-center " onClick={() => handleClick(`${teacherIndex}`)}>
                        <div className='w-full'>
                            <div className='font-medium w-full text-base ml-2 flex text-center justify-between items-center'>
                                <div className='flex mobile:max-tablet:flex-wrap items-center'>
                                    <div className="flex items-center">
                                        {teacher.AppliedBy && teacher.AppliedBy[0] && (
                                            <>
                                                <img src={teacher.AppliedBy[0].profileLink} alt="" className="h-10 w-10 mobile:max-tablet:hidden rounded-full" />
                                                <p className="  px-2 mobile:max-tablet:text-lg"> {teacher.AppliedBy[0].name}</p>
                                            </>
                                        )}
                                    </div>
                                    wants a &nbsp;
                                    <span className='text-red-500 whitespace-nowrap'>{teacher.type}&nbsp;</span>from &nbsp;
                                    <div className=' flex'>
                                        <span className='text-red-500 whitespace-nowrap'>{teacher.startDate}&nbsp;</span> to &nbsp;
                                        <span className='text-red-500 whitespace-nowrap'>{teacher.endDate}</span>
                                    </div>

                                </div>
                                <div className='items-center px-3 cursor-pointer'>
                                    {expanded === `${teacherIndex}` ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                            </div>
                            {expanded === `${teacherIndex}` && (
                                <div className='font-medium text-base ml-2 mt-2'>
                                    <span className='text-gray-400 text-xl'>Reason</span>
                                    <div className='mt-2 text-gray-700 font-normal text-justify'>
                                        {teacher.reason}
                                    </div>
                                </div>
                            )}
                            <div className='flex gap-2 font-medium text-base ml-2 mt-2 w-full'>
                                {teacher.status === 'Approved' ? (
                                    <div className='flex items-center justify-between w-full'>
                                        <button
                                            className='p-1 rounded-lg border border-gray-300 text-black px-2 bg-green-300'
                                            disabled={loading}
                                        >
                                            Approved
                                        </button>
                                        <div className="flex items-center">
                                            Approved By: &nbsp;{teacher.AppliedBy && teacher.AppliedBy[0] && (
                                                <>
                                                    <img src={teacher.AppliedBy[0].profileLink} alt="" className="h-8 w-8 mobile:max-tablet:hidden rounded-full" />
                                                    <p className="  px-2 mobile:max-tablet:text-lg"> {teacher.AppliedBy[0].name}</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ) : teacher.status === 'Rejected' ? (
                                    <div className='flex items-center justify-between w-full'>

                                    <button
                                        className='p-1 rounded-lg text-black border border-gray-300 px-2 bg-red-300'
                                        disabled={loading}
                                    >
                                        Rejected
                                    </button>
                                    <div className="flex items-center">
                                            Rejected By: &nbsp;{teacher.AppliedBy && teacher.AppliedBy[0] && (
                                                <>
                                                    <img src={teacher.AppliedBy[0].profileLink} alt="" className="h-8 w-8 mobile:max-tablet:hidden rounded-full" />
                                                    <p className="  px-2 mobile:max-tablet:text-lg"> {teacher.AppliedBy[0].name}</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <button
                                            className='p-1 rounded-lg border border-gray-300 text-black px-2 bg-green-300'
                                            onClick={() => handleAction("Approved", teacher._id)}
                                            disabled={loading}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className='p-1 rounded-lg text-black border border-gray-300 px-2 bg-red-300'
                                            onClick={() => handleAction("Rejected", teacher._id)}
                                            disabled={loading}
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}

                            </div>
                        </div>

                    </div>
                ))
            ) : (
                <div>No new leave</div>
            )}

        </div>

    )
}

