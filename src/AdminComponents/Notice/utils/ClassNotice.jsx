import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import Loading from "../../../LoadingScreen/Loading";
import { BASE_URL_Notice } from "../../../Config";
import { MdEdit, MdCheck, MdCancel, MdDeleteForever } from 'react-icons/md';
import { toast } from "react-toastify";
import { motion, AnimatePresence } from 'framer-motion';

const ClassNotice = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const { authState } = useContext(AuthContext);
    const [expanded, setExpanded] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedNotice, setEditedNotice] = useState({});
    const [error, setError] = useState('');
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(4);
    const [allDataFetched, setAllDataFetched] = useState(false);

    useEffect(() => {
        if (authState.accessToken) {
            setLoading(true);
            fetchClassNotices();
        } else {
            setError('No access token available');
            setLoading(false);
        }
    }, [authState.accessToken]);

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (start !== 0) {
            fetchClassNotices();
        }
    }, [start]);

    const handleClick = (index) => {
        if (editingIndex === null) {
            setExpanded(expanded === index ? null : index);
        }
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
    const session = getCurrentSession();


    const fetchClassNotices = async () => {
        const session = getCurrentSession();

        try {
            const response = await axios.get(`${BASE_URL_Notice}/notice/fetch/admin?start=${start}&limit=${end}&session=${session}&type=${'Particular Classes'}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            const notice = response.data.notices.length;
            console.log("API response:", response.data.notices);
            if (notice < end) {
                toast.success('All data fetched');
                console.log('All data fetched')
                setAllDataFetched(true);
            }
            setData(prevData => [...prevData, ...response.data.notices]);
            setLoading(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditedNotice({ ...data[index] });
    };

    const handleSave = async (index) => {
        console.log(data[index]._id, editedNotice, session)

        try {
            const response = await axios.put(`${BASE_URL_Notice}/notice/update?noticeId=${data[index]._id}&session=${session}`, editedNotice, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            console.log("API response after update:", response.data);
            setData(data.map((notice, i) => i === index ? editedNotice : notice));
            setEditingIndex(null);
            setExpanded(index);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (index) => {
        try {
            await axios.delete(`${BASE_URL_Notice}/notice/delete?id=${data[index]._id}&session=${session}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            toast.success('Deleted Successfully');
            const newDetail = data.filter((_, i) => i !== index);
            setData(newDetail);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCancel = () => {
        setEditingIndex(null);
        setExpanded(expanded);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedNotice({ ...editedNotice, [name]: value });
    };

    const handleFieldClick = (e) => {
        e.stopPropagation();
    };

    return (

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4 mx-2"
        >
            <div className="flex flex-col space-y-4 mb-4">
                {loading ? (
                    <Loading />
                ) : data === null || data.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-purple-600 text-center text-lg"
                    >
                        No notices available
                    </motion.div>
                ) : (
                    <>
                        <AnimatePresence>
                            {data.map((notice, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-purple-50 shadow-md rounded-lg p-4 border border-purple-200 mt-2 text-base"
                                >
                                    <div className="w-full flex items-center justify-between mb-2 cursor-pointer" onClick={() => handleClick(index)}>
                                        <h3 className="text-purple-800 font-medium">
                                            Title: {editingIndex === index ? (
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={editedNotice.title}
                                                    onChange={handleChange}
                                                    onClick={handleFieldClick}
                                                    className="border border-purple-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                />
                                            ) : (
                                                notice.title
                                            )}
                                        </h3>
                                        <div className="flex items-center">
                                            <p className="text-purple-600 mr-2">
                                                Type: {notice.type}
                                            </p>
                                            {editingIndex === index ? (
                                                <div className="flex">
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="bg-green-400 hover:bg-green-500 text-white px-3 py-1 rounded-lg shadow-md mr-2"
                                                        onClick={() => handleSave(index)}
                                                    >
                                                        <MdCheck />
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-lg shadow-md"
                                                        onClick={handleCancel}
                                                    >
                                                        <MdCancel />
                                                    </motion.button>
                                                </div>
                                            ) : (
                                                <div className="flex">
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded-lg shadow-md mr-2"
                                                        onClick={() => handleEdit(index)}
                                                    >
                                                        <MdEdit />
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-lg shadow-md"
                                                        onClick={() => handleDelete(index)}
                                                    >
                                                        <MdDeleteForever />
                                                    </motion.button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <AnimatePresence>
                                        {expanded === index && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className='text-base mt-2'
                                            >
                                                <p className="mb-2 text-purple-700">
                                                    Description: {editingIndex === index ? (
                                                        <textarea
                                                            name="description"
                                                            value={editedNotice.description}
                                                            onChange={handleChange}
                                                            onClick={handleFieldClick}
                                                            className="border border-purple-300 rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                        />
                                                    ) : (
                                                        notice.description
                                                    )}
                                                </p>
                                                {editingIndex === index && (
                                                    <div className="mt-2 space-y-2">
                                                        {editedNotice.forClasses.map((classInfo, idx) => (
                                                            <motion.div
                                                                key={idx}
                                                                className="flex flex-wrap items-center gap-2 bg-purple-100 p-2 rounded-md"
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: idx * 0.1 }}
                                                            >
                                                                <p className="font-medium text-purple-700">Class: {classInfo.Class}</p>
                                                                <div className="flex flex-wrap gap-1">
                                                                    {classInfo.sections.map((section, sIdx) => (
                                                                        <span key={sIdx} className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-sm">
                                                                            {section}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                )}
                                                {(notice.type === 'Particular Classes' && notice.forClasses.length > 0) && (
                                                    <div className="mt-2">
                                                        <p className="text-purple-700 font-medium">For Classes:</p>
                                                        <div className="space-y-2 mt-1">
                                                            {notice.forClasses.map((classInfo, index) => (
                                                                <motion.div
                                                                    key={index}
                                                                    className="flex flex-wrap items-center gap-2 bg-purple-100 p-2 rounded-md"
                                                                    initial={{ opacity: 0, x: -20 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: index * 0.1 }}
                                                                >
                                                                    <span className="font-medium text-purple-700">Class {classInfo.Class}:</span>
                                                                    <div className="flex flex-wrap gap-1">
                                                                        {classInfo.sections.map((section, sIdx) => (
                                                                            <span key={sIdx} className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-sm">
                                                                                {section}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </motion.div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    <div className="w-full flex items-center justify-between mt-2">
                                        <p className="text-purple-600">Date: {notice.date}</p>
                                        <div className="flex items-center">
                                            <span className="text-purple-600 mr-1">By:</span>
                                            <div className="flex items-center gap-1">
                                                <img src={notice.from.profileLink} alt="" className="w-8 h-8 rounded-full" />
                                                <p className="text-purple-700">{notice.from.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {!allDataFetched && (
                            <motion.h1
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className='text-purple-500 hover:text-purple-700 mt-3 cursor-pointer text-center'
                                onClick={handleViewMore}
                            >
                                View More
                            </motion.h1>
                        )}
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default ClassNotice;
