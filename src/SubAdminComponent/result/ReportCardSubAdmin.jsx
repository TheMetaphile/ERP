import React, { useState, useEffect, useContext, useRef } from 'react'
import Selection from './utils/Selection';
import Header from '../../AdminComponents/Home/utils/TeachersDetails/LeftCard/Header';
import { Link } from "react-router-dom";
import axios from 'axios';
import Loading from '../../LoadingScreen/Loading';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL_Login } from '../../Config';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';

function ReportCardSubAdmin() {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    // State to control the dropdown visibility
    const [Class, setClass] = useState(localStorage.getItem('Class') || '');
    const [Section, setSection] = useState(localStorage.getItem('Section') || '');
    const [selectedSession, setSelectedSession] = useState(localStorage.getItem('selectedSession') || '');
    const [error, setError] = useState(null);
    const containerRef = useRef(null);
    const [userData, setUserData] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(20);
    const [allDataFetched, setAllDataFetched] = useState(false);

    useEffect(() => {
        localStorage.setItem('Class', Class);
        localStorage.setItem('Section', Section);
        localStorage.setItem('selectedSession', selectedSession);
    }, [Class, Section, selectedSession]);

    const handleClassChange = (event) => {
        setUserData([]);
        setAllDataFetched(false);
        setClass(event.target.value);
        setStart(0);
    };

    const handleSectionChange = (event) => {

        setUserData([]);
        setAllDataFetched(false);
        setSection(event.target.value);
        setStart(0);
    };

    const handleSessionChange = (session) => {
        setSelectedSession(session);
    };

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (start !== 0) {
            fetchStudents();
        }
    }, [start]);

    console.log('ll', Class, Section, selectedSession)
    useEffect(() => {
        fetchStudents();
    }, [authState.accessToken, Class, Section]);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            console.log(start, "-", end);
            const response = await axios.post(`${BASE_URL_Login}/fetchMultiple/student`, {
                accessToken: authState.accessToken,
                currentClass: Class,
                section: Section,
                end: end,
                start: start
            });
            console.log("API response:", response.data, response.data.Students.length);

            if (response.data.Students) {
                // const users = response.data.Students.map(user => ({
                //     ...user,
                //     profileLogo: user.profileLink || profilelogo,
                // }));

                const list = response.data.Students.length;
                if (list < end) {
                    toast.success('All data fetched');
                    console.log('All data fetched')
                    setAllDataFetched(true);
                }
                setUserData(prevUsers => [...prevUsers, ...response.data.Students]);


            } else {
                setError('Unexpected response format');
                setTimeout(() => {
                    setError('');
                }, 2000);
            }

            setLoading(false);
        } catch (err) {
            setError(err.message);
            console.log(err);
            setTimeout(() => {
                setError('');
            }, 2000);
            setLoading(false);
        }
    };



    return (
        <>
            <div className='   '>
                <ToastContainer />
                <div className="flex items-center justify-between px-3 py-2">

                    <h1 className="text-xl font-medium mb-2 ">Report Card</h1>
                    <span className='w-fit flex items-center gap-2 mobile:max-laptop:hidden'>
                        <Selection
                            Class={Class}
                            Section={Section}
                            Session={selectedSession}
                            handleClassChange={handleClassChange}
                            handleSectionChange={handleSectionChange}
                            handleSessionChange={handleSessionChange}
                        />

                    </span>
                </div>

            </div>
            <div className=" w-full items-start overflow-y-auto  px-2 no-scrollbar mobile:max-tablet:mt-2 ">
                {loading && start == 0 ? (
                    <Loading />
                ) : userData.length === 0 ? (
                    <>No student found</>
                ) : (
                    <motion.div
                        className='rounded-lg shadow-lg border border-purple-200 w-full mb-4 overflow-hidden bg-white'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        ref={containerRef}
                    >
                        <Header headings={['Name', 'Class', 'Section', 'Email']} />

                        {userData.map((detail, index) => (
                            <Link to={`/Sub-Admin/Result/${detail.email}?session=${selectedSession}&Class=${Class}`} key={index}>
                                <motion.div
                                    className='flex justify-between border-b border-purple-100 items-center py-3 px-4 hover:bg-purple-100 transition-colors duration-200'
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                >
                                    <motion.div className='flex-1 text-center whitespace-nowrap text-gray-800'>{detail.name}</motion.div>
                                    <motion.div className='flex-1 text-center whitespace-nowrap text-gray-800'>{detail.currentClass}</motion.div>
                                    <motion.div className='flex-1 text-center whitespace-nowrap text-gray-800'>{detail.section}</motion.div>
                                    <motion.div className='flex-1 flex items-center justify-center gap-3'>
                                        <img src={detail.profileLink} alt={detail.name} className='w-8 h-8 rounded-full object-cover border-2 border-purple-300 mobile:max-tablet:hidden' />
                                        <span className='text-purple-600 truncate max-w-[150px]'>{detail.email}</span>
                                    </motion.div>
                                </motion.div>
                            </Link>
                        ))}

                        {!allDataFetched && (
                            <motion.div
                                className="text-center py-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <motion.button
                                    className='text-purple-500 hover:text-purple-700 font-medium focus:outline-none'
                                    onClick={handleViewMore}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    View More
                                </motion.button>
                            </motion.div>
                        )}
                    </motion.div>
                )}

            </div>
        </>
    )
}

export default ReportCardSubAdmin











