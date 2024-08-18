import React, { useState, useEffect, useContext } from "react";
import AllNotificationTile from './AllNotificationTile';
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import Loading from "../../../LoadingScreen/Loading";
import { BASE_URL_Notice } from "../../../Config";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaEye } from "react-icons/fa";

function NoticeSubAdmin() {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(5);
    const sessions = getLast5Sessions();
    const [selectedSession, setSelectedSession] = useState(sessions[1]);
    const [allDataFetched, setAllDataFetched] = useState(false);

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        fetchNotice();
    }, [authState.accessToken, selectedSession]);

    useEffect(() => {
        if (start !== 0) {
            fetchNotice();
        }
    }, [start, selectedSession]);

    const fetchNotice = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL_Notice}/notice/fetch/subAdmin?start=${start}&limit=${end}&session=${selectedSession}&type=for`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`,
                }
            });

            const notice = response.data.notices.length;
            console.log("API response:", response.data.notices);
            if (notice < end) {
                toast.success('All data fetched');
                console.log('All data fetched')
                setAllDataFetched(true);
            }
            setDetails(prevData => [...prevData, ...response.data.notices]);
            console.log('fetch', response.data);

        } catch (error) {
            console.error("Error fetching notice:", error);
            toast.error("Failed to fetch notices");
        }
        finally {
            setLoading(false)
        }
    };

    const handleChange = (event) => {
        setStart(0);
        setAllDataFetched(false);
        setSelectedSession(event.target.value);
        setDetails([]);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='px-3 w-full pt-4 max-w-7xl mx-auto'
        >
            <ToastContainer />
            <div className="flex mx-3 items-center justify-between bg-white ">
                <h1 className='text-2xl mobile:max-tablet:text-xl font-bold text-purple-600 whitespace-nowrap'>Notice Board</h1>
                <div className="flex items-center">
                    <FaCalendarAlt className="text-purple-600 mr-2" />
                    <select
                        id="sessionSelector"
                        value={selectedSession}
                        onChange={handleChange}
                        className="mobile:max-tablet:mx-4  rounded-md py-2 px-4  leading-tight bg-white border-2 border-purple-300 text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                    >
                        {sessions.map((session, index) => (
                            <option key={index} value={session}>
                                {session}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <Loading />
            ) : details.length === 0 ? (
                <div className="w-full text-center mt-10 text-gray-600 text-lg">No notices available for this session</div>
            ) : (
                <>
                    <AllNotificationTile details={details} />
                    {!allDataFetched && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='flex items-center justify-center mx-auto mt-6 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300'
                            onClick={handleViewMore}
                        >
                            <FaEye className="mr-2" />
                            View More
                        </motion.button>
                    )}
                </>
            )}
        </motion.div>
    )
}

const getLast5Sessions = () => {
    const currentYear = new Date().getFullYear();
    const sessions = [];

    for (let i = 0; i < 5; i++) {
        const startYear = currentYear - i;
        const endYear = (currentYear - i + 1).toString().slice(2);
        sessions.push(`${startYear}-${endYear}`);
    }

    return sessions;
}

export default NoticeSubAdmin;