import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaChalkboardTeacher, FaBookOpen, FaSave } from 'react-icons/fa';
import Loading from '../../LoadingScreen/Loading';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL_Login } from '../../Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PromotionRow from './utils/PromotionRow';

function Promotion() {
    const [students, setStudents] = useState([]);
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [start, setStart] = useState(0);
    const end = 10;
    const [allDataFetched, setAllDataFetched] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState([]);

    const classes = [
        "Pre-Nursery", "Nursery", "L.K.G", "U.K.G",
        "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th",
        "9th", "10th", "11th", "12th"
    ];

    function getNextClass(currentClass) {
        const currentIndex = classes.indexOf(currentClass);
        if (currentIndex === -1 || currentIndex === classes.length - 1) {
            return currentClass;
        }
        return classes[currentIndex + 1];
    }

    useEffect(() => {
        fetchStudents();
    }, [authState.accessToken]);

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (start !== 0) {
            fetchStudents();
        }
    }, [start]);

    function getSession() {
        const currentYear = new Date().getFullYear();
        const prevYear = currentYear - 1;
        return `${prevYear}-${currentYear.toString().slice(-2)}`;
    }

    function getNextSession() {
        const currentYear = new Date().getFullYear();
        const nextYear = currentYear + 1;
        return `${currentYear}-${nextYear.toString().slice(-2)}`;
    }

    const session = getSession();
    const nextSession = getNextSession();

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL_Login}/fetchMultiple/student`, {
                accessToken: authState.accessToken,
                currentClass: authState.ClassDetails.class,
                section: authState.ClassDetails.section,
                start: start,
                end: end,
                session: session
            });
            if (response.status === 200) {
                const student = response.data.Students.length;
                if (student < end) {
                    toast.success('All data fetched');
                    setAllDataFetched(true);
                }
                setStudents(prevData => [...prevData, ...response.data.Students]);
            }
        } catch (error) {
            console.error("Error fetching student:", error);
            toast.error('Failed to fetch students');
        } finally {
            setLoading(false);
        }
    };

    const handleSwitchChange = (studentId, checked) => {
        if (checked) {
            setSelectedStudents(prev => ([...prev, studentId]));
        } else {
            setSelectedStudents(prev => prev.filter(item => item !== studentId));
        }
    };

    const handleSave = async () => {
        const currentClass = authState.ClassDetails.class;
        const nextClass = getNextClass(currentClass);

        const payload = {
            email: selectedStudents,
            nextClass: nextClass,
            nextSection: authState.ClassDetails.section,
            nextSession: nextSession
        };

        try {
            const response = await axios.put(`${BASE_URL_Login}/promote/student?session=${session}&class=${currentClass}&section=${authState.ClassDetails.section}`, payload, {
                headers: {
                    'Authorization': `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                setStudents(students.filter(student => !selectedStudents.includes(student.email)));
                toast.success('Students promoted successfully!');
            }
        } catch (error) {
            console.error("Error saving students:", error);
            toast.error('Failed to promote students.');
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    };

    const tableVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (

        <motion.div 
            className="w-full px-4 py-6"

            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <ToastContainer />
            <div className='flex items-center justify-between mb-6'>

                <h1 className="text-3xl mobile:max-tablet:text-lg font-medium text-black">Promotion</h1>

                <motion.button
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition-colors duration-300"
                    onClick={handleSave}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaSave className="mr-2" />
                    Save
                </motion.button>
            </div>
            {loading ? (
                <Loading />
            ) : students.length === 0 ? (
                <div className="text-center text-blue-600 text-xl">No students found</div>
            ) : (
                <motion.div
                    className="overflow-hidden rounded-lg shadow-lg bg-white"
                    variants={tableVariants}
                >
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-max">
                            <thead>
                                <tr className="bg-gradient-to-r from-blue-200 to-blue-100 text-black">
                                    <th className="py-3 px-4 text-left">Roll No.</th>
                                    <th className="py-3 px-4 text-left">Name</th>
                                    <th className="py-3 px-4 text-left">Class</th>
                                    <th className="py-3 px-4 text-left">Section</th>
                                    <th className="py-3 px-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((detail, index) => (
                                    <PromotionRow
                                        key={detail._id}
                                        detail={detail}
                                        index={index}
                                        authState={authState}
                                        selectedStudents={selectedStudents}
                                        handleSwitchChange={handleSwitchChange}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {!allDataFetched && (
                        <motion.div
                            className="text-center py-4"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >

                            <button 
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                                onClick={handleViewMore}
                            >
                                View More
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
}

export default Promotion;