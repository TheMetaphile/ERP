import React, { useState, useContext } from 'react';
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';
import { MdCheck, MdCancel, MdOutlineModeEdit } from 'react-icons/md';
import { BASE_URL } from '../../../Config';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { refreshAccessToken } from '../../../RefreshTokenHelper';

function CurrentWeekRow({
    details,
    index,
    mapId,
    darkMode
}) {
    const { authState, updateAccessToken, logout } = useContext(AuthContext);
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

    const handleConfirmEdit = async (id) => {
        try {
            const { description, status } = editedData;

            await axios.put(`${BASE_URL}/lessonPlan/update/teacher/${formattedYear}/${mapId}/${id}`, { description, status }, {
                headers: {
                    'Authorization': `Bearer ${authState?.accessToken}`,
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
            if (
                error.response &&
                error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await handleConfirmEdit(id);
                } catch (refreshError) {
                }
            } else {
                toast.error(error.response?.data?.error || "An error occurred");
            }
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
            className={`${darkMode
                ? 'bg-gray-900 hover:bg-gray-800'
                : 'bg-white hover:bg-gray-100'
                }`}
        >
            {['date', 'chapter', 'topic', 'teachingAids', 'Activity'].map((field, fieldIndex) => (
                <td
                    key={fieldIndex}
                    className={`border-y p-4 ${darkMode
                        ? 'border-gray-700 text-white'
                        : 'border-blue-200 text-black'
                        }`}
                >
                    {details[field]}
                </td>
            ))}
            <td className={`border-y p-4 ${darkMode
                ? 'border-gray-700 text-white'
                : 'border-blue-200 text-black'
                }`}>
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
                            className={`border rounded-lg p-2 focus:ring-2 focus:border-blue-500 ${darkMode
                                ? 'bg-gray-700 text-white border-gray-600'
                                : 'border-blue-300'
                                }`}
                            placeholder="Description"
                        />
                        <select
                            name="status"
                            value={editedData.status || ''}
                            onChange={handleInputChange}
                            className={`p-2 border rounded-md focus:ring-2 focus:border-blue-500 ${darkMode
                                ? 'bg-gray-700 text-white border-gray-600'
                                : 'border-blue-300'
                                }`}
                        >
                            <option value="">Select status</option>
                            <option value="On Time">On Time</option>
                            <option value="Lagging">Lagging</option>
                        </select>
                        <div className="flex justify-end space-x-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`hover:opacity-90 text-white px-3 py-1 rounded-lg shadow-md ${darkMode
                                    ? 'bg-green-700 hover:bg-green-600'
                                    : 'bg-green-500 hover:bg-green-600'
                                    }`}
                                onClick={() => handleConfirmEdit(index, details._id)}
                            >
                                <MdCheck />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`hover:opacity-90 text-white px-3 py-1 rounded-lg shadow-md ${darkMode
                                    ? 'bg-gray-600 hover:bg-gray-500'
                                    : 'bg-gray-400 hover:bg-gray-500'
                                    }`}
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
                        <span className={`${darkMode ? 'text-blue-400' : 'text-blue-700'
                            }`}>
                            {localUserData.description ? (
                                <>
                                    {localUserData.description},
                                    <span className={`font-semibold ${localUserData.status === 'On Time'
                                        ? (darkMode ? 'text-green-400' : 'text-green-600')
                                        : (darkMode ? 'text-red-400' : 'text-red-600')
                                        }`}>
                                        {localUserData.status}
                                    </span>
                                </>
                            ) : (
                                <>No data available</>
                            )}
                        </span>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`hover:opacity-90 text-white px-3 py-1 rounded-lg shadow-md flex items-center ${darkMode
                                ? 'bg-blue-700 hover:bg-blue-600'
                                : 'bg-blue-500 hover:bg-blue-600'
                                }`}
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