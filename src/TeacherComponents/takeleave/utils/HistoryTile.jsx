import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL } from '../../../Config';
import { motion } from 'framer-motion';
import { MdCheck, MdCancel, MdEdit, MdDeleteForever, MdExpandMore, MdExpandLess } from 'react-icons/md';


export default function HistoryTile({ details }) {
    const [data, setData] = useState([]);
    const [editRowIndex, setEditRowIndex] = useState(null);
    const { authState, darkMode } = useContext(AuthContext);
    const [editData, setEditData] = useState({});
    const [expanded, setExpanded] = useState(null);

    const handleClick = (index) => {
        setExpanded(expanded === index ? null : index);
    }

    useEffect(() => {
        if (details) {
            console.log('before', details)
            setData(details);
            console.log('after', details)
        }
    }, [details]);

    const handleDelete = async (index) => {
        const id = data[index]._id;
        const session = getCurrentSession();
        console.log(id, session, authState?.accessToken);
        if ((data[index].status) === "Pending") {
            try {
                const response = await axios.delete(
                    `${BASE_URL}/teacherleave/delete?leaveId=${id}&session=${session}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authState?.accessToken}`
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
                `${BASE_URL}/teacherleave/update?leaveId=${id}&session=${session}`,
                editData,
                {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`
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

    const handleCancelEdit = () => {
        setEditRowIndex(null);
        setEditData([]);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full pl-2 mt-3"
        >
            {data.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`mb-4 border ${darkMode ? 'border-blue-800 bg-gray-800' : 'border-blue-200 bg-white'} shadow-lg rounded-lg p-4`}
                >
                    <div
                        className={`flex justify-between items-center font-medium ${darkMode ? 'text-blue-400' : 'text-blue-700'} cursor-pointer`}
                        onClick={() => handleClick(index)}
                    >
                        <span>Type: {editRowIndex === index ? (
                            <input
                                type="text"
                                value={editData.type}
                                onChange={(e) => handleInputChange(e, 'type')}
                                className={`border ${darkMode ? 'border-blue-700 bg-gray-700 text-white' : 'border-blue-300'} rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                        ) : (
                            item.type
                        )}</span>
                        <motion.div
                            animate={{ rotate: expanded === index ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className={darkMode ? 'text-blue-400' : ''}
                        >
                            {expanded === index ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />}
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: expanded === index ? 'auto' : 0, opacity: expanded === index ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className='overflow-hidden'
                    >
                        <div className={`font-medium text-justify mt-2 ${darkMode ? 'text-gray-300' : ''}`}>
                            Reason: {editRowIndex === index ? (
                                <textarea
                                    rows={6}
                                    value={editData.reason}
                                    onChange={(e) => handleInputChange(e, 'reason')}
                                    className={`border ${darkMode ? 'border-blue-700 bg-gray-700 text-white' : 'border-blue-300'} rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                            ) : (
                                <span className={`font-normal ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>{item.reason}</span>
                            )}
                        </div>
                    </motion.div>

                    <div className="flex items-center mt-4 justify-between">
                        {item.by && item.status !== 'Pending' ? (
                            <>
                                <div className='flex items-center'>
                                    <img src={item.by[0].profileLink} alt="img" className={`w-10 h-10 rounded-full border-2 ${darkMode ? 'border-blue-600' : 'border-blue-500'}`} />
                                    <h5 className={`ml-2 font-medium ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>{item.by[0].name}</h5>
                                </div>
                                <div className={`ml-2 font-medium text-sm px-3 py-1 rounded-full ${item.status === 'Pending'
                                    ? darkMode ? 'bg-yellow-800 text-yellow-300' : 'bg-yellow-200 text-yellow-700'
                                    : item.status === 'Approved'
                                        ? darkMode ? 'bg-green-800 text-green-300' : 'bg-green-200 text-green-700'
                                        : darkMode ? 'bg-red-800 text-red-300' : 'bg-red-200 text-red-700'
                                    }`}>
                                    {item.status}
                                </div>
                            </>
                        ) : (
                            <div className="flex justify-between items-center w-full">
                                <div className='flex space-x-2'>
                                    {editRowIndex === index ? (
                                        <>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`${darkMode ? 'bg-green-700 hover:bg-green-600' : 'bg-green-500 hover:bg-green-600'} text-white px-3 py-1 rounded-lg shadow-md`}
                                                onClick={() => handleUpdate(index)}
                                            >
                                                <MdCheck size={20} />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-500 hover:bg-gray-600'} text-white px-3 py-1 rounded-lg shadow-md`}
                                                onClick={handleCancelEdit}
                                            >
                                                <MdCancel size={20} />
                                            </motion.button>
                                        </>
                                    ) : (
                                        <>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`${darkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'} text-white px-3 py-1 rounded-lg shadow-md flex items-center`}
                                                onClick={() => handleEditClick(index)}
                                            >
                                                <MdEdit size={20} />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`${darkMode ? 'bg-red-700 hover:bg-red-600' : 'bg-red-500 hover:bg-red-600'} text-white px-3 py-1 rounded-lg shadow-md flex items-center`}
                                                onClick={() => handleDelete(index)}
                                            >
                                                <MdDeleteForever size={20} />
                                            </motion.button>
                                        </>
                                    )}
                                </div>
                                <div className={`font-medium text-sm px-3 py-1 rounded-full ${item.status === 'Pending'
                                    ? darkMode ? 'bg-yellow-800 text-yellow-300' : 'bg-yellow-200 text-yellow-700'
                                    : item.status === 'Approved'
                                        ? darkMode ? 'bg-green-800 text-green-300' : 'bg-green-200 text-green-700'
                                        : darkMode ? 'bg-red-800 text-red-300' : 'bg-red-200 text-red-700'
                                    }`}>
                                    {item.status}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={`w-full mobile:max-tablet:text-xs flex items-center justify-between mt-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        <div>
                            From: {editRowIndex === index ? (
                                <input
                                    type="date"
                                    value={editData.startDate}
                                    onChange={(e) => handleInputChange(e, 'startDate')}
                                    className={`border ${darkMode ? 'border-blue-700 bg-gray-700 text-white' : 'border-blue-300'} rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                            ) : (
                                item.startDate
                            )}
                        </div>

                        <div>
                            To: {editRowIndex === index ? (
                                <input
                                    type="date"
                                    value={editData.endDate}
                                    onChange={(e) => handleInputChange(e, 'endDate')}
                                    className={`border ${darkMode ? 'border-blue-700 bg-gray-700 text-white' : 'border-blue-300'} rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                            ) : (
                                item.endDate
                            )}
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    )
}