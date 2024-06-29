import React, { useState, useContext } from 'react';
import axios from 'axios';
import { MdEdit, MdDeleteForever, MdCheck } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL_Student_Leave, BASE_URL_TeacherLeave } from '../../../Config';

export default function HistoryTile({ details }) {
    const [data, setData] = useState(details);
    const [editRowIndex, setEditRowIndex] = useState(null);
    const { authState } = useContext(AuthContext);
    const [editData, setEditData] = useState({});

    const handleDelete = async (index) => {
        const id = data[index]._id;
        const session = getCurrentSession();
        console.log(id, session, authState.accessToken);
        if ((data[index].status) === "Pending") {
            try {
                const response = await axios.delete(
                    `${BASE_URL_TeacherLeave}/leave/delete?leaveId=${id}&session=${session}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authState.accessToken}`
                        }
                    }
                );

                if (response.status === 200) {
                    const updatedData = data.filter((_, i) => i !== index);
                    setData(updatedData);
                    console.log('succeess')
                    toast.success('Leave Deleted');
                }
            } catch (err) {
                toast.error(err.response.data.error);
            }
        } else {
            toast.error('Cannot delete leave that is not pending');
        }
    };

    const handleEditClick = (index) => {
        setEditRowIndex(index);
        setEditData(data[index]);
    };

    const handleInputChange = (e, field) => {
        setEditData({ ...editData, [field]: e.target.value });
    };

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


    const handleUpdate = async (index) => {
        const id = data[index]._id;
        const session = getCurrentSession();
        console.log(id, session, editData);

        try {
            const response = await axios.put(
                `${BASE_URL_TeacherLeave}/leave/update?leaveId=${id}&session=${session}`,
                editData,
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                }
            );

            if (response.status === 200) {
                const updatedData = data.map((item, i) => (i === index ? editData : item));
                setData(updatedData);
                setEditRowIndex(null);
                toast.success('Leave Updated');
            }
        } catch (err) {
            toast.error(err.response.data.error);
        }
    };



    return (
        <div className="relative w-full p-2 border rounded-lg border-gray-300 shadow-md mt-3 items-center">
            <ToastContainer />
            {data.map((item, index) => (
                <div key={index} className="mb-2 border border-gray-200 shadow-md rounded-lg p-3">
                    <div className='w-full flex items-center justify-between'>
                        <div>
                            Start Date: {editRowIndex === index ? (
                                <input
                                    type="date"
                                    value={editData.startDate}
                                    onChange={(e) => handleInputChange(e, 'startDate')}
                                    className='border border-black'
                                />
                            ) : (
                                item.startDate
                            )}
                        </div>
                        <div>
                            End Date: {editRowIndex === index ? (
                                <input
                                    type="date"
                                    value={editData.endDate}
                                    onChange={(e) => handleInputChange(e, 'endDate')}
                                    className='border border-black'
                                />
                            ) : (
                                item.endDate
                            )}
                        </div>
                        <div className={`font-normal text-xs p-2 rounded-lg ${item.status === 'Pending' ? 'bg-orange-200 text-orange-700' : item.status === 'Approved' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>{item.status}</div>
                    </div>
                    <div className='w-full flex items-center justify-between'>
                        <div>
                            Type: {editRowIndex === index ? (
                                <input
                                    type="text"
                                    value={editData.type}
                                    onChange={(e) => handleInputChange(e, 'type')}
                                    className='border border-black'
                                />
                            ) : (
                                item.type
                            )}
                        </div>
                        <div>
                            Reason: {editRowIndex === index ? (
                                <input
                                    type="text"
                                    value={editData.reason}
                                    onChange={(e) => handleInputChange(e, 'reason')}
                                    className='border border-black'
                                />
                            ) : (
                                item.reason
                            )}
                        </div>
                        <div className="flex items-center mt-2">
                            {item.by.length > 0 && item.status !== 'Pending' ? (
                                <>
                                    <img src={item.by[0].profileLink} alt="img" className="w-8 h-8 rounded-full" />
                                    <h5 className="ml-2">{item.by[0].name}</h5>
                                </>
                            ) : (
                                <div className="flex justify-center items-center gap-1">
                                    {editRowIndex === index ? (
                                        <button className='bg-green-400 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-md' onClick={() => handleUpdate(index)}><MdCheck /></button>
                                    ) : (
                                        <button className='bg-blue-400 hover:bg-blue-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center' onClick={() => handleEditClick(index)}> <MdEdit /></button>
                                    )}
                                    <button className='bg-red-400 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center' onClick={() => handleDelete(index)}><MdDeleteForever /></button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

