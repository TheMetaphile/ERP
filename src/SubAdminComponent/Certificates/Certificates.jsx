import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL_Login, BASE_URL_ClassTeacher } from '../../Config';
import Loading from "../../LoadingScreen/Loading";
import { ToastContainer, toast } from 'react-toastify';
import { motion } from "framer-motion";


const Certificates = () => {
    const [tcData, setTcData] = useState([]);
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [Class, setClass] = useState('9th');
    const [sectionsDetails, setSections] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(10);
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
            setTcData([]);
            setAllDataFetched(false);
            setLoading(false);
        }
    }, [selectedSession, Class]);

    useEffect(() => {
        if (start === 0 && tcData.length === 0 && !allDataFetched && !loading) {
            fetchUserTc();
        }
    }, [start, tcData, allDataFetched, loading]);

    const handleViewMore = () => {
        if (!allDataFetched && !loading) {
            setStart((prevStart) => prevStart + end);
        }
    };

    useEffect(() => {
        if (start !== 0) {
            fetchUserTc();
        }
    }, [start]);


    const fetchUserTc = async () => {
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
                setTcData(prevData => [...prevData, ...response.data.list]);

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

    const fetchSections = async () => {
        console.log()
        try {
            if (sectionsDetails.length <= 0 && Class) {
                const response = await axios.post(`${BASE_URL_Login}/classTeacher/fetch/sections`, {
                    accessToken: authState.accessToken,
                    class: Class,
                });
                console.log('section', response.data)
                const sectionsdetail = response.data.sections;
                setSections(sectionsdetail);
            }
        } catch (error) {
            console.error("Error while fetching section:", error);
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
        <div className="mx-auto p-4">
            <ToastContainer />
            <div className="flex items-center justify-between pt-4">

                <h1 className='text-3xl mobile:max-tablet:text-2xl '>Certificates</h1>
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
                        <select id="school-sessions" value={selectedSession} onChange={handleSessionChange} className="rounded-lg shadow-md px-3 py-1 border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 text-lg mr-3 mobile:max-tablet:mr-0 flex-1">
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
            <motion.div
                className="overflow-x-auto border rounded-lg shadow-lg bg-white p-6 mt-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <table className="w-full">
                    <thead>
                        <tr className="bg-purple-200">
                            <th className="font-semibold text-lg p-3 rounded-tl-lg">Roll No.</th>
                            <th className="font-semibold text-lg p-3">Admission No</th>
                            <th className="font-semibold text-lg p-3">Name</th>
                            <th className="font-semibold text-lg p-3">Class</th>
                            <th className="font-semibold text-lg p-3">Section</th>
                            <th className="font-semibold text-lg p-3 rounded-tr-lg">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="text-center p-4">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"
                                    />
                                </td>
                            </tr>
                        ) : tcData.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center p-4 text-gray-500">
                                    No Data available
                                </td>
                            </tr>
                        ) : (
                            <>
                                {tcData.map((item, index) => (
                                    <motion.tr
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className={`border-b hover:bg-purple-50 transition-colors duration-200 ${clickedIndex === index ? 'bg-purple-100' : ''}`}
                                        onClick={() => handleClick(index)}
                                    >
                                        <td className="p-3 text-center">{item.rollNumber}</td>
                                        <td className="p-3 text-center">15</td>
                                        <td className="p-3">
                                            <div className="flex items-center justify-center space-x-3">
                                                <img src={item.profileLink} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-purple-300" />
                                                <span className="font-medium">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-3 text-center">{item.currentClass}</td>
                                        <td className="p-3 text-center">{item.section}</td>
                                        <td className="p-3 text-center">
                                            <div className="flex justify-center space-x-2">
                                                <Link to={`/Sub-Admin/Certificates/character/${item._id}/${item.currentClass}/${item.section}/${selectedSession}`}>
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-purple-600 transition-colors duration-200"
                                                    >
                                                        CC
                                                    </motion.button>
                                                </Link>
                                                <Link to={`/Sub-Admin/Certificates/transfer/${item._id}/${item.currentClass}/${item.section}/${selectedSession}`}>
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-indigo-600 transition-colors duration-200"
                                                    >
                                                        TC
                                                    </motion.button>
                                                </Link>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                                <div ref={sentinelRef} className="h-10">
                                    {loading && start > 0 && (
                                        <div className="text-center w-full text-gray-600 text-sm">Loading more...</div>
                                    )}
                                </div>
                            </>
                        )}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
};

export default Certificates;
