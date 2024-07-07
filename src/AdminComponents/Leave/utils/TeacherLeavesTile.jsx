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


    useEffect(() => {
        if (data) {
            setLeaves(data);
        }
    }, [data]);

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
            {leaves.length > 0 ? (
                leaves.map((teacher, teacherIndex) => (
                    <div key={teacherIndex} className=" border p-2 justify-between rounded-lg shadow-md mt-3 flex items-center " onClick={() => handleClick(`${teacherIndex}`)}>
                        <div className='w-full'>
                            <div className='font-medium w-full text-base ml-2 flex text-center justify-between items-center'>
                                <div className='flex items-center'>
                                    <div className="flex items-center">
                                        {teacher.by && teacher.by[0] && (
                                            <>
                                                <img src={teacher.by[0].profileLink} alt="" className="h-12 w-12 mobile:max-tablet:hidden rounded-full" />
                                                <p className="  px-2 mobile:max-tablet:text-lg"> {teacher.by[0].name}</p>
                                            </>
                                        )}
                                    </div>
                                    wants a &nbsp;
                                    <span className='text-red-500 whitespace-nowrap'>{teacher.type}&nbsp;</span>from &nbsp;
                                    <span className='text-red-500 whitespace-nowrap'>{teacher.startDate}&nbsp;</span> to &nbsp;
                                    <span className='text-red-500 whitespace-nowrap'>{teacher.endDate}</span>
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
                            <div className='flex gap-2 font-medium text-base ml-2 mt-2'>
                                {teacher.status === 'Approved' ? (
                                    <button
                                        className='p-1 rounded-lg border border-gray-300 text-black px-2 bg-green-300'
                                        disabled={loading}
                                    >
                                        Approved
                                    </button>
                                ) : teacher.status === 'Rejected' ? (
                                    <button
                                        className='p-1 rounded-lg text-black border border-gray-300 px-2 bg-red-300'
                                        disabled={loading}
                                    >
                                        Rejected
                                    </button>
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


// (
//     data.map((leave, index) => (
//       <div key={index} className={`rounded-md border p-4 flex flex-col w-full`}>
//         <div className="flex justify-between">
//           <div className="flex">
//             {leave.by && leave.by[0] && (
//               <>
//                 <img src={leave.by[0].profileLink} alt="" className="h-12 w-12 mobile:max-tablet:hidden rounded-full" />
//                 <p className="text-xl mb-2 mt-2 px-2 mobile:max-tablet:text-lg"> {leave.by[0].name}</p>
//               </>
//             )}
//           </div>
//           <div>
//             <h1 className={` px-2 py-1 rounded-lg ${leave.status === 'Pending' ? 'bg-orange-200 text-orange-700' : leave.status === 'Approved' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
//               {leave.status}
//             </h1>
//           </div>
//           <div className="mt-2">
//             <button
//               className="rounded-lg bg-blue-400 px-4 mobile:max-tablet:px-2"
//               onClick={() => handleViewDetails(leave)}
//             >
//               View Details
//             </button>
//           </div>
//         </div>
//         <div className="flex justify-between text-gray-900 mobile:max-tablet:flex-col">
//           <span className="text-lg">Leave Taken on: {leave.startDate}</span>
//           <span className="text-lg">Expected Arrival: {leave.endDate}</span>
//         </div>
//       </div>
//     ))
//   )}

//   {selectedLeave && (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
//       <div className="bg-white rounded-lg p-6">
//         <h2 className="text-2xl mb-4 text-center">Leave Details</h2>
//         <p className="text-xl">Type: {selectedLeave.type}</p>
//         <p className="text-xl">Reason: {selectedLeave.reason}</p>
//         <div className="mt-4 flex justify-center">
//           <button className="bg-red-500 text-white px-4 py-2 rounded-md mr-2" onClick={handleClosePopup}>
//             Cancel
//           </button>
//           {selectedLeave.status === 'Pending' ? (
//             <>
//               <button
//                 className="bg-green-500 text-white px-4 py-2 rounded-md"
//                 onClick={() => handleAction("Approved")}
//               >
//                 Approve
//               </button>
//               <button
//                 className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
//                 onClick={() => handleAction("Rejected")}
//               >
//                 Reject
//               </button>
//             </>
//           ) : (
//             <></>
//           )}

//         </div>
//       </div>
//     </div>
//   )}
