import React, { useEffect, useState, useContext } from 'react';
import { FaChevronUp, FaChevronDown, FaUserGraduate } from "react-icons/fa6";
import AuthContext from '../../../Context/AuthContext';
import Loading from './../../../LoadingScreen/Loading';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../Config';
import { MdEdit, MdDeleteForever, MdCheck, MdCancel, MdAdd } from "react-icons/md";
import { motion, AnimatePresence } from 'framer-motion';
import { refreshAccessToken } from '../../../RefreshTokenHelper';
export default function AssignTeacherRow({ Class }) {

    const [expanded, setExpanded] = useState(false);
    const [sectionsDetails, setSections] = useState([]);
    const [newSection, setNewSection] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [temp, setTemp] = useState();
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const { authState, updateAccessToken, logout } = useContext(AuthContext);
    const [showNewRow, setShowNewRow] = useState(false);
    const [editingRow, setEditingRow] = useState(null);
    const [additionalData, setAdditionalData] = useState([]);


    const handleClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        if (expanded) {
            setLoading(true);
            fetchSections();
        }
    }, [expanded]);

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setName(email);
        setEmail(email);
        setTemp(email);
    }

    const handleSuggestionClick = (suggestion) => {
        setEmail(suggestion.email);
        setName(suggestion.name);
        setShowSuggestions(false);
    }

    useEffect(() => {
        if (temp) {
            const handler = setTimeout(() => {
                setShowSuggestions(true);
                const searchTeacher = async (token = authState?.accessToken) => {
                    try {
                        const response = await axios.post(`${BASE_URL}/search/teacher`, {
                            accessToken: token,
                            searchString: temp,
                            start: 0,
                            end: 30
                        })
                        console.log(response.data)
                        const teacherEmails = response.data.Teachers.map(teacher => ({
                            email: teacher.email,
                            name: teacher.name,
                            profileLink: teacher.profileLink
                        }));
                        setSuggestions(teacherEmails);

                    }
                    catch (error) {
                        // console.error("Error searching for teachers:", error);
                        if (
                            error.response &&
                            error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
                        ) {
                            toast.warn('Access denied. Attempting to refresh token...');
                            try {
                                const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                                await searchTeacher(newToken);
                            } catch (refreshError) {
                            }
                        } else {
                            toast.error(error.response?.data?.error || "An error occurred");
                        }
                    }
                }
                searchTeacher();
            }, 500);

            return () => {
                clearTimeout(handler);
            }
        } else {
            setShowSuggestions(false);
        }
    }, [temp, authState?.accessToken])


    const addNewRow = () => {
        setShowNewRow(true);
    };

    const handleSectionChange = (e) => {
        const section = e.target.value;
        setNewSection(section);
    }

    const fetchSections = async (token = authState?.accessToken) => {
        try {
            if (sectionsDetails.length <= 0) {
                const response = await axios.post(`${BASE_URL}/classTeacher/fetch/sections`, {
                    accessToken: token,
                    class: Class,
                });
                const sectionsdetail = response.data.sections;
                console.log(Class);

                setSections(sectionsdetail);
            }
        } catch (error) {
            // console.error("Error searching for teachers:", error);
            if (
                error.response &&
                error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await fetchSections(newToken);
                } catch (refreshError) {
                }
            } else {
                toast.error(error.response?.data?.error || "An error occurred");
            }
        } finally {
            setLoading(false);
        }

    };
    const handleAddSection = async () => {
        console.log('class', Class)
        console.log('section', newSection)
        console.log('teacher', email)
        try {
            const newData = {
                section: newSection,
                name: name
            }
            console.log(newData)
            if (email) {
                const response = await axios.post(`${BASE_URL}/classTeacher/assign`, {
                    accessToken: authState?.accessToken,
                    class: Class,
                    section: newSection,
                    teacherEmail: email
                });
                if (response.status === 200) {
                    toast.success('Teacher Assigned successfully');
                    // fetchSections();
                    setSections(prevData => [...prevData, newData]);
                    setNewSection('');
                    setEmail('');
                    setShowNewRow(false);
                    setEditingRow(null);
                }
            } else {
                toast.error('Please specify teacher');
            }

        } catch (error) {
            toast.error('Error assigning teacher');
            if (
                error.response &&
                error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await handleAddSection();
                } catch (refreshError) {
                }
            } else {
                toast.error(error.response?.data?.error || "An error occurred");
            }
        }
    };

    const handleUpdateClick = (index) => {
        setEditingRow(index);
        setEmail(sectionsDetails[index].email);
        setName(sectionsDetails[index].name);
        setNewSection(sectionsDetails[index].section);
    };

    const handleCancelEdit = () => {
        setEmail('');
        setShowSuggestions(false);
        setEditingRow(null);
    };

    const handleConfirmClick = async (index) => {
        try {
            if (email) {
                const response = await axios.post(`${BASE_URL}/classTeacher/assign`, {
                    accessToken: authState?.accessToken,
                    class: Class,
                    section: newSection,
                    teacherEmail: email
                });
                if (response.status === 200) {
                    toast.success('Teacher Updated successfully');
                    const updatedSection = {
                        ...sectionsDetails[index],
                        name: name,
                        section: newSection
                    };

                    const updatedSections = [
                        ...sectionsDetails.slice(0, index),
                        updatedSection,
                        ...sectionsDetails.slice(index + 1)
                    ];

                    setSections(updatedSections);
                    // fetchSections();
                    setEmail('');
                    setEditingRow(null);
                }
            }
        } catch (error) {
            toast.error('Error updating teacher');
            if (
                error.response &&
                error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await handleConfirmClick(index);
                } catch (refreshError) {
                }
            } else {
                toast.error(error.response?.data?.error || "An error occurred");
            }
        }
        finally {
            setShowSuggestions(false);
        }
    };

    const handleDelete = async (index, section) => {
        console.log('Deleting ', Class, 'section:', section);

        try {
            const response = await axios.delete(`${BASE_URL}/classTeacher/delete?class=${Class}&section=${section}`, {
                headers: {
                    Authorization: `Bearer ${authState?.accessToken}`,
                }
            });

            if (response.status === 200) {
                const updatedSecion = sectionsDetails.filter((_, i) => i !== index);
                setSections(updatedSecion);
                toast.success('Section Deleted Successfully');
            }
        } catch (error) {
            console.error("Error deleting section:", error);
            toast.error('Error deleting section');
            if (
                error.response &&
                error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await handleDelete(index, section);
                } catch (refreshError) {
                }
            } else {
                toast.error(error.response?.data?.error || "An error occurred");
            }
        }
    };

    return (
        <motion.div
            key={Class}
            className="w-full mb-4 rounded-lg mt-2 shadow-md border border-secondary-200 overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="flex justify-between items-center p-3 bg-secondary-100 hover:bg-secondary-200 cursor-pointer"
                onClick={handleClick}

            >
                <div className="flex items-center">
                    <FaUserGraduate className="text-secondary-600 mr-2" />
                    <div className="text-lg font-semibold text-secondary-800">{Class}</div>
                </div>
                <motion.div
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {expanded ? <FaChevronUp className="text-secondary-600" /> : <FaChevronDown className="text-secondary-600" />}
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className='mx-3 border border-secondary-300 rounded-lg mb-2 mt-3 overflow-hidden'
                    >
                        <div className="flex justify-between w-full py-2 pl-2 bg-blue-300 text-black">
                            <h1 className="w-36 text-lg font-medium">Section</h1>
                            <h1 className="w-36 text-lg font-medium">Class Teacher</h1>
                            <h1 className="w-36 text-lg font-medium text-center">Action</h1>
                        </div>

                        {!loading ? (
                            sectionsDetails.length > 0 ? (
                                <div>
                                    {sectionsDetails.map((details, index) => (
                                        <motion.div
                                            key={index}
                                            className={`flex justify-between w-full py-2 px-2 h-fit border-b border-secondary-200 ${index % 2 === 0 ? 'bg-secondary-50' : 'bg-white'}`}
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <h1 className="w-36 text-lg font-medium text-secondary-800">
                                                {editingRow === index ? (
                                                    <input
                                                        type="text"
                                                        className="w-36 px-2 border border-secondary-300 rounded-lg text-lg font-medium"
                                                        placeholder="Section"
                                                        value={newSection}
                                                        onChange={handleSectionChange}
                                                        required
                                                    />
                                                ) : (
                                                    <h1 className="w-36 text-lg font-medium text-secondary-700">{details.section}</h1>
                                                )}
                                            </h1>
                                            <div className='relative'>
                                                {editingRow === index ? (
                                                    <input
                                                        type="text"
                                                        className="w-36 px-2 border border-secondary-300 rounded-lg text-lg font-medium"
                                                        placeholder="Teacher"
                                                        value={name}
                                                        onChange={handleEmailChange}
                                                        required
                                                    />
                                                ) : (
                                                    <h1 className="w-36 text-lg font-medium text-secondary-700">{details.name}</h1>
                                                )}
                                                {showSuggestions && suggestions.length > 0 && (
                                                    <ul className="absolute z-10 w-72 bg-white border border-secondary-300 rounded-md mt-1 max-h-40 overflow-y-auto">
                                                        {suggestions.map((suggest, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="flex items-center p-2 cursor-pointer hover:bg-secondary-100"
                                                                onClick={() => handleSuggestionClick(suggest)}
                                                            >
                                                                <img src={suggest.profileLink} alt="Profile" className='w-6 h-6 rounded-full mr-2' />
                                                                {suggest.name}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                            <div className='w-36 text-lg font-medium flex justify-center'>
                                                {editingRow === index ? (
                                                    <div className='flex items-center gap-2'>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            className='bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow-md flex items-center'
                                                            onClick={() => handleConfirmClick(index)}
                                                        >
                                                            <MdCheck />
                                                        </motion.button>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-md'
                                                            onClick={handleCancelEdit}
                                                        >
                                                            <MdCancel />
                                                        </motion.button>
                                                    </div>
                                                ) : (
                                                    <div className='flex items-center gap-2'>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            className='bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow-md flex items-center'
                                                            onClick={() => handleUpdateClick(index)}
                                                        >
                                                            <MdEdit />
                                                        </motion.button>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-md flex items-center'
                                                            onClick={() => handleDelete(index, details.section)}
                                                        >
                                                            <MdDeleteForever />
                                                        </motion.button>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className='text-center py-4 text-secondary-600'>No section added</div>
                            )
                        ) : (
                            <Loading />
                        )}

                        {showNewRow && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex justify-between w-full py-2 px-4 h-fit border border-secondary-300 ${sectionsDetails.length > 0 ? "rounded-b-lg" : "rounded-lg"} bg-secondary-50`}
                            >
                                <h1 className="w-36 text-lg font-medium text-secondary-800">
                                    <input
                                        type="text"
                                        className="w-36 px-2 border border-secondary-300 rounded-lg text-lg font-medium"
                                        placeholder="Section"
                                        value={newSection}
                                        onChange={handleSectionChange}
                                        required
                                    />
                                </h1>
                                <div className='relative'>
                                    <input
                                        type="text"
                                        className="w-36 px-2 border border-secondary-300 rounded-lg text-lg font-medium"
                                        placeholder="Teacher"
                                        value={name}
                                        onChange={handleEmailChange}
                                        required
                                    />
                                    {showSuggestions && suggestions.length > 0 && (
                                        <ul className="absolute z-10 w-72 bg-white border border-secondary-300 rounded-md mt-1 max-h-40 overflow-y-auto">
                                            {suggestions.map((suggest, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex items-center p-2 cursor-pointer hover:bg-secondary-100"
                                                    onClick={() => handleSuggestionClick(suggest)}
                                                >
                                                    <img src={suggest.profileLink} alt="Profile" className='w-6 h-6 rounded-full mr-2' />
                                                    {suggest.email}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className='flex items-center gap-2'>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className='bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow-md'
                                        onClick={handleAddSection}
                                    >
                                        Save
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-md'
                                        onClick={() => setShowNewRow(false)}
                                    >
                                        Cancel
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                        <motion.div
                            className="flex justify-center w-full px-3 py-3 h-fit "

                        >
                            <motion.button
                                className='px-4 py-2 rounded-lg flex items-center bg-blue-300 text-black'
                                onClick={() => addNewRow()}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <MdAdd className="mr-2" /> Add section
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
