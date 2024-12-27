import React, { useContext, useEffect, useRef, useState } from 'react'
import Stats from './utils/Stats';
import Header from './utils/Header';
import StudentDetailTile from './utils/StudentDetailTile';
import Loading from '../../LoadingScreen/Loading';
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL_Login } from '../../Config';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';

function NewAdmission() {
    const [Class, setClass] = useState('9th');
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [statLoading, setStatLoading] = useState(true);
    const [distributionMethod, setDistributionMethod] = useState('By Percentage');
    const { authState } = useContext(AuthContext);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(1);
    const [allDataFetched, setAllDataFetched] = useState(false);
    const [stat, setStat] = useState({});
    const sentinelRef = useRef(null);

    const handleClassChange = (event) => {
        setClass(event.target.value);
    };

    const handleDistributionChange = (event) => {
        setDistributionMethod(event.target.value);
    };

    useEffect(() => {
        setStart(0);
        setUserData([]);
        setAllDataFetched(false);
        setLoading(false);
    }, [Class]);

    useEffect(() => {
        if (start === 0 && userData.length === 0 && !allDataFetched && !loading) {
            fetchUserStat();
            fetchUserData();
        }
    }, [start, userData, allDataFetched, loading]);

    const handleViewMore = () => {
        if (!allDataFetched && !loading) {
            setStart((prevStart) => prevStart + end);
        }
    };

    useEffect(() => {
        if (start !== 0) {
            fetchUserData();
        }
    }, [start]);



    const fetchUserData = async () => {
        if (loading || allDataFetched) return;

        setLoading(true);
        console.log(start)
        try {
            const response = await axios.get(`${BASE_URL_Login}/newStudents/students?class=${Class}&start=${start}&end=${end}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            console.log("API response:", response.data);

            const data = response.data.list.length;
            console.log("API response:", response.data.list);
            if (data < end) {
                toast.success('All data fetched');
                console.log('All data fetched')
                setAllDataFetched(true);
            }
            setLoading(false);
            setUserData(prevData => [...prevData, ...response.data.list]);


        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const fetchUserStat = async () => {
        setStatLoading(true);
        try {
            const response = await axios.get(`${BASE_URL_Login}/newStudents/stats?class=${Class}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            console.log("API response:", response.data);

            setStat(response.data);
            setStatLoading(false);
        } catch (err) {
            console.log(err);
            setStatLoading(false);
        }
    };

    const handleDistribute = async () => {
        alert(`You are distributing students based on ${distributionMethod} for class ${Class}`);
        try {
            const response = await axios.put(`${BASE_URL_Login}/newStudents/distribute?class=${Class}&type=${distributionMethod}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                }
            );

            console.log("API response:", response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
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
            className="w-full px-6 py-8 mobile:max-tablet:px-2 "
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <ToastContainer />
            <motion.div className="flex mobile:max-tablet:flex-col mobile:max-tablet:items-start  items-center justify-between mb-8" variants={itemVariants}>
                <motion.h1
                    className="text-4xl font-medium ml-1 text-black mb-4 md:mb-0 mobile:max-tablet:text-lg"
                    whileHover={{ scale: 1.05 }}
                >
                    New Admission
                </motion.h1>
                <div className="flex items-center mobile:max-tablet:flex-col mobile:max-tablet:items-start  gap-4">
                    <div className=' flex gap-2'>
                        <motion.select
                            id="class"
                            value={Class}
                            onChange={handleClassChange}
                            className="rounded-full shadow-lg w-1/2 px-4 py-2 border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 text-lg bg-white text-purple-700"
                            whileHover={{ scale: 1.05 }}
                        >
                            <option value="">Search by Class</option>
                            <option value="Pre-Nursery">Pre-Nursery</option>
                            <option value="Nursery">Nursery</option>
                            <option value="L.K.G">L.K.G</option>
                            <option value="U.K.G">U.K.G</option>
                            <option value="1st">1st</option>
                            <option value="2nd">2nd</option>
                            <option value="3rd">3rd</option>
                            <option value="4th">4th</option>
                            <option value="5th">5th</option>
                            <option value="6th">6th</option>
                            <option value="7th">7th</option>
                            <option value="8th">8th</option>
                            <option value="9th">9th</option>
                            <option value="10th">10th</option>
                            <option value="11th">11th</option>
                            <option value="12th">12th</option>
                        </motion.select>
                        <motion.select
                            id="distribution"
                            value={distributionMethod}
                            onChange={handleDistributionChange}
                            className="rounded-full shadow-lg px-4 w-1/2 py-2 border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 text-lg bg-white text-purple-700"
                            whileHover={{ scale: 1.05 }}
                        >
                            <option value="">Select Distribution Method</option>
                            <option value="By Name">By Name (Alphabetical)</option>
                            <option value="By Percentage">By Percentage</option>
                            <option value="New Section">New Section</option>
                        </motion.select>
                    </div>
                    <motion.button
                        className="px-6 py-2 bg-purple-400 text-white rounded-full shadow-lg text-lg font-semibold hover:bg-purple-600 transition duration-300 "
                        onClick={handleDistribute}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Distribute
                    </motion.button>
                </div>
            </motion.div>

            <motion.div
                className="mt-8"
                variants={itemVariants}
            >
                {statLoading ? (
                    <Loading />
                ) : (
                    <Stats stat={stat} method={distributionMethod} />
                )}
            </motion.div>

            <motion.div
                className="mt-12 overflow-hidden rounded-lg shadow-xl bg-white"
                variants={itemVariants}
            >
                <div className="overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead className="">
                            <Header headings={['Name', 'Class', 'Gender', 'Percentage', 'Phone No.', 'E-mail', 'Action']} />
                        </thead>
                        <tbody className="divide-y divide-purple-200">
                            {loading && userData.length < 1 ? (
                                <tr><td colSpan="7"><Loading /></td></tr>
                            ) : userData.length === 0 ? (
                                <tr><td colSpan="7" className="text-center py-4 text-purple-600">No students found</td></tr>
                            ) : (
                                <StudentDetailTile userData={userData} Class={Class} />
                            )}
                        </tbody>
                    </table>
                </div>
                <div ref={sentinelRef} className="h-10">
                    {loading && start > 0 && (
                        <div className="text-center w-full text-gray-600 text-sm">Loading more...</div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default NewAdmission
