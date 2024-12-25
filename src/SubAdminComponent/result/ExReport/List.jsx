import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import AuthContext from "../../../Context/AuthContext";
import { BASE_URL_Login } from '../../../Config';
import Loading from "../../../LoadingScreen/Loading";
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';

const List = () => {
    const [data, setData] = useState([]);
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [Class, setClass] = useState('9th');
    const [start, setStart] = useState(0);
    const end = 5;
    const [allDataFetched, setAllDataFetched] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState('2024-25');
    const [clickedIndex, setClickedIndex] = useState(null);
    const sentinelRef = useRef(null);

    const handleClick = (index) => {
        setClickedIndex(index);
    };

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const newSessions = [];

        for (let i = 0; i < 5; i++) {
            const startYear = currentYear - i;
            const endYear = startYear + 1;
            newSessions.push(`${startYear}-${endYear.toString().slice(-2)}`);
        }

        setSessions(newSessions);
    }, []);

    const handleSessionChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedSession(selectedValue);
    };


    useEffect(() => {
        if (selectedSession) {
            setStart(0);
            setData([]);
            fetchUsers();
        }
    }, [selectedSession, Class]);



    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (start !== 0) {
            fetchUsers();
        }
    }, [start]);

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

    const fetchUsers = async () => {
        if (loading || allDataFetched) return;

        setLoading(true);
        console.log(selectedSession, Class)
        console.log(start, 'start', end, 'end')

        try {
            const response = await axios.get(`${BASE_URL_Login}/terminate/terminatedStudents?Class=${Class}&session=${selectedSession}&start=${start}&end=${end}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                console.log(response.data)
                const tc = response.data.list.length;
                if (tc < end) {
                    toast.success('All data fetched');
                    console.log('All data fetched')
                    setAllDataFetched(true);
                }
                setData(prevData => [...prevData, ...response.data.list]);

            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleClassChange = (event) => {
        setClass(event.target.value);
    };



    return (
        <div className="">
            <ToastContainer />
            <div className="flex items-center justify-between px-3 py-2">

                <h1 className='text-xl font-medium mb-2 '>Ex Student Result</h1>
                <div className="flex items-center gap-2">
                    <select id="class" value={Class} onChange={handleClassChange} className="rounded-lg shadow-md px-3 py-1 border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 text-lg mr-3 mobile:max-tablet:mr-0 flex-1">
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
                    </select>

                    <div>
                        <select id="school-sessions" value={selectedSession} onChange={handleSessionChange} className="rounded-lg shadow-md px-3 py-1 border-2  border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 text-lg mr-3 mobile:max-tablet:mr-0 flex-1">
                            <option value="">Select Session</option>
                            {sessions.map((session, index) => (
                                <option key={index} value={session}>
                                    {session}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto border-1 rounded-lg pt-2">
                <table className="table w-full border-2">
                    <thead className=" bg-purple-200">
                        <tr>
                            <th className="py-3 px-4 text-center ">Roll No.</th>
                            <th className="py-3 px-4 text-center">Name</th>
                            <th className="py-3 px-4 text-center">Class</th>
                            <th className="py-3 px-4 text-center">Section</th>
                            <th className="py-3 px-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="table-row-group">
                        {loading ? (
                            <Loading />
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center p-4">
                                    No Data available
                                </td>
                            </tr>
                        ) : (
                            <>
                                {data.map((item, index) => (
                                    <motion.tr
                                        key={index}
                                        className='border-b hover:bg-purple-100 transition-colors'
                                        onClick={() => handleClick(index)}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                    >
                                        <td className="py-3 px-4 text-center">{item.rollNumber}</td>
                                        <td className="py-3 px-4 text-center">
                                            <div className="flex items-center space-x-3">
                                                <img src={item.profileLink} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-purple-300" />
                                                <span>{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-center whitespace-nowrap">{item.currentClass}</td>
                                        <td className="py-3 px-4 text-center whitespace-nowrap">{item.section}</td>
                                        <td className="py-3 px-4 text-center whitespace-nowrap">
                                            <Link to={`/Sub-Admin/Result/exStudent/${item._id}?Class=${item.currentClass}&session=${selectedSession}`}>
                                                <motion.button
                                                    className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-600 transition-colors duration-200"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Result
                                                </motion.button>
                                            </Link>
                                        </td>
                                    </motion.tr>
                                ))}
                                <div ref={sentinelRef} className="h-10"></div>
                                {loading && start > 0 && (
                                    <div className="text-center w-full text-gray-600 text-sm">Loading more...</div>
                                )}
                            </>
                        )}
                    </tbody>

                </table>
            </div>
        </div >
    );
};

export default List;
