import React, { useState, useContext, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import AuthContext from '../../Context/AuthContext';
import SubjectSelection from '../classWork/utils/SubjectSelection';
import MyDoubtTile from "./utils/MyDoubtTile";
import { IoCameraOutline, IoAddCircleOutline, IoBookOutline, IoFilterOutline } from "react-icons/io5";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { BASE_URL } from '../../Config';
import Loading from '../../LoadingScreen/Loading';
import { Link } from 'react-router-dom';
import { refreshAccessToken } from '../../RefreshTokenHelper';

export default function MyDoubts() {
    const { authState, darkMode, updateAccessToken, logout } = useContext(AuthContext);
    const [selectedSubject, setSelectedSubject] = useState(authState?.subjects[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [doubtDescription, setDoubtDescription] = useState('');
    const [modalSubject, setModalSubject] = useState(null);
    const [start, setStart] = useState(0);
    const end = 2;
    const [allDataFetched, setAllDataFetched] = useState(false);
    const [status, setStatus] = useState('Pending');
    const sentinelRef = useRef(null);

    const bgClass = darkMode
        ? 'bg-gradient-to-br from-gray-900 to-gray-800'
        : 'bg-gradient-to-br from-blue-100 to-blue-100';
    const cardBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
    const textClass = darkMode ? 'text-white' : 'text-black';
    const subTextClass = darkMode ? 'text-gray-300' : 'text-gray-600';
    const borderClass = darkMode ? 'border-gray-600' : 'border-gray-300';
    const selectClass = darkMode
        ? 'bg-gray-700 text-white border-gray-600 focus:ring-indigo-600'
        : 'bg-white text-black border-gray-300 focus:ring-indigo-500';
    const buttonClass = darkMode
        ? 'bg-indigo-700 hover:bg-indigo-600 text-white'
        : 'bg-blue-500 hover:bg-blue-600 text-white';
    const modalBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
    const modalTextClass = darkMode ? 'text-gray-300' : 'text-gray-600';

    const handleSubjectSelect = (subject) => {
        setSelectedSubject(subject);
        console.log("Selected Subject:", subject);
    }

    const handleAskDoubt = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleModalSubject = (event) => {
        setModalSubject(event.target.value);
    };

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const handleSubmitDoubt = async () => {
        if (!modalSubject || !doubtDescription) {
            toast.error('Please fill all fields');
            return;
        }
        const datee = getCurrentDate();
        try {
            const response = await axios.post(`${BASE_URL}/doubts/create`, {
                question: doubtDescription,
                date: datee,
                subject: modalSubject
            },
                {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`,
                    }
                }
            );
            if (response.status === 200) {
                console.log(response.data);
                if ((modalSubject === selectedSubject || selectedSubject === 'Subject') && status === 'Pending') {
                    console.log('before', data);
                    setData(prevData => [response.data, ...prevData]);
                    console.log('after', data);
                }
                toast.success('Doubt sent successfully!');
                setDoubtDescription('');
                setIsModalOpen(false);
            }
        } catch (error) {
            toast.error(error.message);
            if (
                error.response &&
                error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await handleSubmitDoubt();
                } catch (refreshError) {
                }
            } else {
                toast.error(error.response?.data?.error || "An error occurred");
            }
        }
    };

    useEffect(() => {
        setStart(0);
        setData([]);
        setAllDataFetched(false);
        setLoading(false);

    }, [selectedSubject, status]);
    useEffect(() => {
        if (start === 0 && data.length === 0 && !allDataFetched) {
            fetchDoubt();
        }
    }, [start, data, allDataFetched]);

    useEffect(() => {
        if (start != 0) {
            fetchDoubt();
        }
        console.log('fetc')
    }, [start]);

    const fetchDoubt = async () => {
        console.log(loading, allDataFetched)
        if (loading || allDataFetched) return;
        setLoading(true);
        try {
            var params = `start=${start}&end=${end}&status=${status}`;
            if (selectedSubject != 'Subject') {
                console.log('pp')
                params += `&subject=${selectedSubject}`;
            }
            console.log('kkk', selectedSubject, params)
            const response = await axios.get(`${BASE_URL}/doubts/fetch/student?${params}`, {
                headers: {
                    Authorization: `Bearer ${authState?.accessToken}`
                }
            });
            const doubts = response.data.doubts;
            console.log("API response:", response.data);
            setData(prevData => [...prevData, ...response.data.doubts]);
            if (doubts.length < (end)) {
                toast.success('All data fetched');
                console.log('All data fetched')
                setAllDataFetched(true);
            }
            setLoading(false);
        } catch (err) {
            toast.error(err.message);
            setLoading(false);
            if (
                err.response &&
                err.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await fetchDoubt();
                } catch (refreshError) {
                }
            } else {
                toast.error(err.response?.data?.error || "An error occurred");
            }
        }
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleViewMore = () => {
        if (!allDataFetched && !loading) {
            setStart((prevStart) => prevStart + end);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !allDataFetched && !loading) {
                    console.log("Fetching more data...");
                    handleViewMore();
                }
            },
            { root: null, rootMargin: '0px', threshold: 1.0 }
        );

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => {
            if (sentinelRef.current) {
                observer.unobserve(sentinelRef.current);
            }
        };
    }, [allDataFetched, loading]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`flex flex-col w-full mobile:max-tablet:mt-4 p-2 rounded-lg shadow-lg ${bgClass}`}
        >
            <ToastContainer theme={darkMode ? 'dark' : 'light'} />
            <div className={`flex justify-between ${cardBgClass} p-4 rounded-lg shadow-md mobile:max-tablet:flex-col`}>
                <Link
                    className={`
                    text-2xl font-bold hover:text-blue-800 
                    transition-colors duration-300 
                    mobile:max-laptop:text-lg 
                    whitespace-nowrap 
                    flex items-center 
                    ${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-blue-600 hover:text-blue-800'}
                `}
                >
                    <IoBookOutline className="mr-2" />
                    My Doubts
                </Link>
                <div className='flex items-center mobile:max-tablet:flex-col mobile:max-tablet:items-start mt-4 tablet:mt-0'>
                    <div className="flex md:order-2 mobile:max-tablet:w-full md:w-full lg:w-fit md:ml-2 gap-2 mobile:max-tablet:flex-col">
                        <SubjectSelection
                            onSubjectSelect={handleSubjectSelect}
                            darkMode={darkMode}
                        />
                        <select
                            value={status}
                            onChange={handleStatusChange}
                            className={`
                            block p-2 text-base 
                            focus:outline-none focus:ring-2 
                            sm:text-sm rounded-md mx-2 
                            border
                            ${borderClass}
                            ${selectClass}
                        `}
                        >
                            <option
                                value="Pending"
                                className={darkMode ? 'bg-gray-800' : 'bg-white'}
                            >
                                Pending
                            </option>
                            <option
                                value="Resolved"
                                className={darkMode ? 'bg-gray-800' : 'bg-white'}
                            >
                                Resolved
                            </option>
                            {/* <option
                                value="Rejected"
                                className={darkMode ? 'bg-gray-800' : 'bg-white'}
                            >
                                Rejected
                            </option> */}
                        </select>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`
                            mobile:max-tablet:text-xs 
                            whitespace-nowrap rounded-lg 
                            shadow-md px-4 py-2 
                            flex items-center 
                            ${buttonClass}
                        `}
                            onClick={handleAskDoubt}
                        >
                            <IoAddCircleOutline className="mr-2" />
                            Ask A Doubt
                        </motion.button>
                    </div>
                </div>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col laptop:mr-3 mt-6 mb-3 no-scrollbar w-full"
            >
                {loading ? (
                    <Loading />
                ) : data.length === 0 ? (
                    <div className={`text-center w-full text-lg ${subTextClass}`}>
                        No doubts asked yet. Start by asking a doubt!
                    </div>
                ) : (
                    <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                        <MyDoubtTile data={data} darkMode={darkMode} />
                        <div ref={sentinelRef} className="h-10"></div>
                        {loading && start > 0 && (
                            <div className={`text-center w-full text-sm ${subTextClass}`}>
                                Loading more...
                            </div>
                        )}
                    </div>
                )}
            </motion.div>

            {isModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`
                    fixed inset-0 
                    ${darkMode ? 'bg-black bg-opacity-75' : 'bg-gray-500 bg-opacity-75'} 
                    flex justify-center items-center 
                    mobile:max-tablet:z-50
                `}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={`
                        ${modalBgClass} rounded-lg 
                        mobile:max-tablet:p-4 mobile:max-tablet:w-full 
                        mobile:max-tablet:mx-10 p-6 shadow-lg w-1/2
                    `}
                    >
                        <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-indigo-400' : 'text-blue-600'}`}>
                            Ask Your Doubt
                        </h2>
                        <p className={`text-base mb-4 ${modalTextClass}`}>
                            Select a subject and write your question. You can also attach photos for reference.
                        </p>

                        <div className="flex flex-col tablet:flex-row justify-between items-center gap-3 w-full">
                            <div className="flex-1 mobile:max-tablet:w-full">
                                <select
                                    className={`
                                    shadow-md border rounded-lg 
                                    p-2 w-full mr-2 mb-2 
                                    ${selectClass}
                                `}
                                    onChange={handleModalSubject}
                                >
                                    {authState?.subjects.map(
                                        (subject, index) => (
                                            <option
                                                key={index}
                                                value={subject}
                                                className={darkMode ? 'bg-gray-800' : 'bg-white'}
                                            >
                                                {subject}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                        </div>

                        <h1 className={`mb-2 mt-2 font-semibold ${textClass}`}>
                            Your Question
                        </h1>

                        <textarea
                            className={`
                            w-full px-3 py-2 mb-4 border rounded-lg 
                            focus:ring-2 focus:border-blue-300 
                            ${selectClass}
                        `}
                            placeholder="Write your question here..."
                            rows={4}
                            value={doubtDescription}
                            onChange={(e) => setDoubtDescription(e.target.value)}
                        ></textarea>

                        <div className="flex justify-between items-center">
                            <div className='flex items-center'>
                                <IoCameraOutline
                                    className={`
                                    w-6 h-6 mobile:max-tablet:w-5 
                                    mobile:max-tablet:h-5 cursor-pointer 
                                    ${darkMode ? 'text-indigo-400' : 'text-blue-500'}
                                `}
                                />
                            </div>
                            <div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`
                                    rounded-lg mobile:max-tablet:px-2 
                                    mobile:max-tablet:py-1 px-4 py-2 mr-2 
                                    transition-colors duration-300 
                                    ${darkMode
                                            ? 'bg-gray-700 text-white hover:bg-gray-600'
                                            : 'bg-gray-300 hover:bg-gray-400'}
                                `}
                                    onClick={handleCloseModal}
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`
                                    text-white rounded-lg 
                                    mobile:max-tablet:px-2 
                                    mobile:max-tablet:py-1 px-4 py-2 
                                    hover:bg-opacity-90 
                                    transition-colors duration-300 
                                    ${buttonClass}
                                `}
                                    onClick={handleSubmitDoubt}
                                >
                                    {loading ? <Loading /> : 'Submit'}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </motion.div>
    );
}