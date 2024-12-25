import React, { useState, useContext, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import AuthContext from '../../Context/AuthContext';
import SubjectSelection from '../classWork/utils/SubjectSelection';
import MyDoubtTile from "./utils/MyDoubtTile";
import { IoCameraOutline, IoAddCircleOutline, IoBookOutline, IoFilterOutline } from "react-icons/io5";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { BASE_URL_AskDoubt } from '../../Config';
import Loading from '../../LoadingScreen/Loading';
import { Link } from 'react-router-dom';

export default function MyDoubts() {
    const { authState } = useContext(AuthContext);
    const [selectedSubject, setSelectedSubject] = useState('Maths');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [doubtDescription, setDoubtDescription] = useState('');
    const [modalSubject, setModalSubject] = useState(null);
    const [start, setStart] = useState(0);
    const end = 2;
    const [allDataFetched, setAllDataFetched] = useState(false);
    const [status, setStatus] = useState('Pending');
    const sentinelRef = useRef(null);

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
        setLoading(true)
        const datee = getCurrentDate();
        try {
            const response = await axios.post(`${BASE_URL_AskDoubt}/doubts/create`, {
                question: doubtDescription,
                date: datee,
                subject: modalSubject
            },
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
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
        }
        setLoading(false)
    };

    useEffect(() => {
        setStart(0);
        setData([]);
        setAllDataFetched(false);
    }, [selectedSubject, status]);

    useEffect(() => {
        setIsLoading(true);
        fetchDoubt();
    }, [start, selectedSubject, status]);

    const fetchDoubt = async () => {
        try {
            var params = `start=${start}&end=${end}&status=${status}`;
            if (selectedSubject != 'Subject') {
                console.log('pp')
                params += `&subject=${selectedSubject}`;
            }
            console.log('kkk', selectedSubject, params)
            const response = await axios.get(`${BASE_URL_AskDoubt}/doubts/fetch/student?${params}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
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
            setIsLoading(false);
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !allDataFetched && !isLoading) {
                    console.log("Fetching more data...");
                    setStart((prevStart) => prevStart + end);
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
    }, [allDataFetched, isLoading, end]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col w-full mobile:max-tablet:mt-4 bg-gradient-to-br from-purple-100 to-blue-100 p-2 rounded-lg shadow-lg"
        >
            <ToastContainer />
            <div className='flex justify-between bg-white p-4 rounded-lg shadow-md mobile:max-tablet:flex-col'>
                <Link className="text-2xl font-bold text-purple-600 hover:text-purple-800 transition-colors duration-300 mobile:max-laptop:text-lg whitespace-nowrap flex items-center">
                    <IoBookOutline className="mr-2" />
                    My Doubts
                </Link>
                <div className='flex items-center mobile:max-tablet:flex-col mobile:max-tablet:items-start mt-4 tablet:mt-0'>
                    <div className="flex md:order-2 mobile:max-tablet:w-full md:w-full lg:w-fit md:ml-2 gap-2 mobile:max-tablet:flex-col">
                        <SubjectSelection onSubjectSelect={handleSubjectSelect} />
                        <select
                            value={status}
                            onChange={handleStatusChange}
                            className="mt-1 border block py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md mr-1 bg-white shadow-sm"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='bg-purple-500 hover:bg-purple-600 mobile:max-tablet:text-xs whitespace-nowrap rounded-lg shadow-md px-4 py-2 text-white flex items-center'
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
                {isLoading ? (
                    <Loading />
                ) : data.length === 0 ? (
                    <div className='text-center w-full text-gray-600 text-lg'>No doubts asked yet. Start by asking a doubt!</div>
                ) : (
                    <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                        <MyDoubtTile data={data} />
                        <div ref={sentinelRef} className="h-10"></div>
                        {isLoading && start > 0 && (
                            <div className="text-center w-full text-gray-600 text-sm">Loading more...</div>
                        )}
                    </div>
                )}
            </motion.div>

            {isModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center mobile:max-tablet:z-50"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="bg-white rounded-lg mobile:max-tablet:p-4 mobile:max-tablet:w-full mobile:max-tablet:mx-10 p-6 shadow-lg w-1/2"
                    >
                        <h2 className="text-xl font-bold mb-4 text-purple-600">Ask Your Doubt</h2>
                        <p className="text-base text-gray-600 mb-4">Select a subject and write your question. You can also attach photos for reference.</p>

                        <div className="flex flex-col tablet:flex-row justify-between items-center gap-3 w-full">
                            <div className="flex-1 mobile:max-tablet:w-full">
                                <select
                                    className="shadow-md border border-grey-300 rounded-lg p-2 w-full mr-2 mb-2"
                                    onChange={handleModalSubject}
                                >
                                    {authState.subjects.map(
                                        (subject, index) => (
                                            <option key={index} value={subject}>
                                                {subject}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                        </div>

                        <h1 className="mb-2 mt-2 font-semibold text-gray-700">Your Question</h1>

                        <textarea
                            className="w-full px-3 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
                            placeholder="Write your question here..."
                            rows={4}
                            value={doubtDescription}
                            onChange={(e) => setDoubtDescription(e.target.value)}
                        ></textarea>

                        <div className="flex justify-between items-center">
                            <div className='flex items-center'>
                                <IoCameraOutline className='w-6 h-6 mobile:max-tablet:w-5 mobile:max-tablet:h-5 text-purple-500 cursor-pointer' />
                            </div>
                            <div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gray-300 rounded-lg mobile:max-tablet:px-2 mobile:max-tablet:py-1 px-4 py-2 mr-2 hover:bg-gray-400 transition-colors duration-300"
                                    onClick={handleCloseModal}
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-purple-600 text-white rounded-lg mobile:max-tablet:px-2 mobile:max-tablet:py-1 px-4 py-2 hover:bg-purple-700 transition-colors duration-300"
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