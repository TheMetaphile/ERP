import React, { useState, useContext } from 'react';
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';
import { MdCheck, MdCancel, MdOutlineModeEdit } from 'react-icons/md';
import { BASE_URL_ClassTeacher } from '../../../Config';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

export default function StudentDetailTile({ userData, Class }) {
    const [editMode, setEditMode] = useState(null);
    const [selectedSection, setSelectedSection] = useState('');
    const { authState } = useContext(AuthContext);

    const handleEditToggle = (index, item) => {
        setEditMode(index);
        setSelectedSection(item.section);
    };

    const handleConfirmEdit = async (index, id) => {
        console.log(selectedSection.toUpperCase());

        try {
            const response = await axios.put(`${BASE_URL_ClassTeacher}/newStudents/section?id=${id}&section=${selectedSection.toUpperCase()}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                }
            );

            console.log("API response:", response.data);
            toast.success('Section Assigned Succesfully');
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.error);
        }

    };

    const handleCancelEdit = () => {
        setEditMode(null);
        setSelectedSection('');
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <>
            {userData.map((user, index) => (
                <motion.tr
                    key={index}
                    className="hover:bg-purple-50 transition duration-300"
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.05 }}
                >
                    <td className="px-4 py-3">
                        <div className="flex items-center space-x-3">
                            <img src={user.profileLink} alt="" className="h-8 w-8 rounded-full object-cover" />
                            <span className="font-medium text-purple-800">{user.name}</span>
                        </div>
                    </td>
                    <td className="px-4 py-3 text-purple-700">{Class}</td>
                    <td className="px-4 py-3 text-purple-700">{user.gender}</td>
                    <td className="px-4 py-3 text-purple-700">{user.percentage}%</td>
                    <td className="px-4 py-3 text-purple-700">{user.fatherPhoneNumber}</td>
                    <td className="px-4 py-3 text-purple-700 truncate max-w-xs">{user.email}</td>
                    <td className="px-4 py-3">
                        {editMode === index ? (
                            <motion.div className="flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <input
                                    className="p-2 border border-purple-300 rounded-md w-24 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    id="section"
                                    type="text"
                                    value={selectedSection}
                                    onChange={(e) => setSelectedSection(e.target.value)}
                                    placeholder="Section"
                                />
                                <motion.button
                                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-md ml-2"
                                    onClick={() => handleConfirmEdit(index, user._id)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <MdCheck />
                                </motion.button>
                                <motion.button
                                    className="bg-gray-400 hover:bg-gray-500 text-white p-2 rounded-full shadow-md ml-2"
                                    onClick={handleCancelEdit}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <MdCancel />
                                </motion.button>
                            </motion.div>
                        ) : (
                            <motion.button
                                className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full shadow-md flex items-center justify-center"
                                onClick={() => handleEditToggle(index, user)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <MdOutlineModeEdit />
                            </motion.button>
                        )}
                    </td>
                </motion.tr>
            ))}
        </>
    );
}
