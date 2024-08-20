import React, { useState, useContext } from 'react';
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';
import { MdCheck, MdCancel, MdOutlineModeEdit } from 'react-icons/md';
import { BASE_URL_Login } from '../../../Config';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function CurrentWeekRow({ details, index, mapId }) {
    const { authState } = useContext(AuthContext);
    const [editMode, setEditMode] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [localUserData, setLocalUserData] = useState(details);

    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const formattedYear = `${currentYear}-${nextYear.toString().slice(-2)}`;

    const handleEditToggle = (index, item) => {
        setEditMode(index);
        setEditedData(item);
    };

    const handleConfirmEdit = async ( id) => {
        try {
            const { description, status } = editedData;

            await axios.put(`${BASE_URL_Login}/lessonPlan/update/teacher/${formattedYear}/${mapId}/${id}`, { description, status }, {
                headers: {
                    'Authorization': `Bearer ${authState.accessToken}`,
                },
            });

            setLocalUserData(prevData => ({
                ...prevData,
                description,
                status
            }));
            
            toast.success('Status saved');
            setEditMode(null);
            setEditedData({});
        } catch (error) {
            console.error('Error updating student data:', error);
            toast.error('Error while saving status');
        }
    };

    const handleCancelEdit = () => {
        setEditMode(null);
        setEditedData({});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const rowVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    };

    return (
        <motion.tr
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            className={ 'bg-white'}
        >
            <td className='border-y p-4 border-indigo-200'>{details.date}</td>
            <td className='border-y p-4 border-indigo-200'>{details.chapter}</td>
            <td className='border-y p-4 border-indigo-200'>{details.topic}</td>
            <td className='border-y p-4 border-indigo-200'>{details.teachingAids}</td>
            <td className='border-y p-4 border-indigo-200'>{details.Activity}</td>
            <td className='border-y p-4 border-indigo-200'>
                {editMode === index ? (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col space-y-2"
                    >
                        <input
                            type="text"
                            name="description"
                            value={editedData.description || ''}
                            onChange={handleInputChange}
                            className="border border-indigo-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Description"
                        />
                        <select
                            name="status"
                            value={editedData.status || ''}
                            onChange={handleInputChange}
                            className="p-2 border border-indigo-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Select status</option>
                            <option value="On Time">On Time</option>
                            <option value="Lagging">Lagging</option>
                        </select>
                        <div className="flex justify-end space-x-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow-md"
                                onClick={() => handleConfirmEdit(index, details._id)}
                            >
                                <MdCheck />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-lg shadow-md"
                                onClick={handleCancelEdit}
                            >
                                <MdCancel />
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        className='flex items-center justify-between'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <span className="text-indigo-700">
                            {localUserData.description ? (
                                <>  {localUserData.description}, <span className={`font-semibold ${localUserData.status === 'On Time' ? 'text-green-600' : 'text-red-600'}`}>{localUserData.status}</span></>
                            ) : (
                                <>No data available</>
                            )}
                        </span>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-lg shadow-md flex items-center"
                            onClick={() => handleEditToggle(index, details)}
                        >
                            <MdOutlineModeEdit />
                        </motion.button>
                    </motion.div>
                )}
            </td>
        </motion.tr>
    );
}

export default CurrentWeekRow;