import { useState, useContext, useEffect, useRef } from "react";
import Header from './Header';
import SearchBar from "../utils/SearchBar";
import StudentDetailTile from "../utils/StudentDetailTile";
import axios from 'axios';
import AuthContext from "../../../../Context/AuthContext";
import Loading from '../../../../LoadingScreen/Loading';
import { BASE_URL_Login } from "../../../../Config";
import { ToastContainer, toast } from "react-toastify";
import { motion } from 'framer-motion';

export default function StudentsList() {
    const [name, setName] = useState('');
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { authState } = useContext(AuthContext);
    const [rollNumber, setRollNumber] = useState('');
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(10);
    const [Class, setClass] = useState(localStorage.getItem('Class') || '');
    const [Section, setSection] = useState(localStorage.getItem('Section') || '');
    const [bothEventsCalled, setBothEventsCalled] = useState(false);
    const [allDataFetched, setAllDataFetched] = useState(false);
    const [loadMore, setLoadMore] = useState(false);
    const sentinelRef = useRef(null);

    const handleRollNumberChange = (event) => {
        setStart(0);
        setRollNumber(event.target.value);
    };

    const handleNameChange = (event) => {
        setStart(0);
        setName(event.target.value);
    };

    const handleClassChange = (event) => {
        setStart(0);
        setUserData([]);
        setAllDataFetched(false);
        setClass(event.target.value);
    };

    const handleSectionChange = (event) => {
        setStart(0);
        setUserData([]);
        setAllDataFetched(false);
        setSection(event.target.value);
    };

    const handlebothEventsCalled = (event) => {
        setBothEventsCalled(true);
    };

    useEffect(() => {
        localStorage.setItem('Class', Class);
        localStorage.setItem('Section', Section);
    }, [Class, Section]);

    useEffect(() => {
        if (bothEventsCalled) {
            console.log(Class);
            console.log(Section);
            setBothEventsCalled(false);
        }
    }, [Class, Section, bothEventsCalled]);

    useEffect(() => {
        if (authState.accessToken) {
            fetchUserData();
        }
    }, [authState.accessToken, Class, rollNumber, Section, name]);

    useEffect(() => {
        if (start !== 0) {
            fetchUserData();
        }
    }, [start, Class, rollNumber, Section, name]);

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

    const fetchUserData = async () => {
        if (loading || allDataFetched) return;

        setLoading(true);
        try {
            console.log(start, "-", end);
            const response = await axios.post(`${BASE_URL_Login}/fetchMultiple/student`, {
                accessToken: authState.accessToken,
                currentClass: Class,
                section: Section,
                rollNumber: rollNumber,
                end: end,
                start: start
            });
            console.log("API response:", response.data);

            const list = response.data.Students.length;
            console.log("API response:", response.data.Students);
            if (list < end) {
                toast.success('All data fetched');
                console.log('All data fetched')
                setAllDataFetched(true);
            }
            setUserData(prevData => [...prevData, ...response.data.Students]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };



    const filteredStudents = userData.filter(student => {
        return (
            (rollNumber ? student.rollNumber === rollNumber : true) &&
            student.name.toLowerCase().includes(name.toLowerCase()) &&
            student.currentClass.toLowerCase().includes(Class.toLowerCase()) &&
            student.section.toLowerCase().includes(Section.toLowerCase())
        );
    });

    const showAddRollNumberButton = filteredStudents.some(student => !student.rollNumber);

    const handleRollNumber = async () => {
        if (!Class || !Section) {
            setError('Please select a class and section first');
            return;
        }
        try {
            setLoading(true);
            console.log("start");
            const response = await axios.post(`${BASE_URL_Login}/assignRollNumber`, {
                accessToken: authState.accessToken,
                currentClass: Class,
                section: Section
            });
            setStart(0);
            console.log("end");
            // console.log(response.data);
            fetchUserData();
        } catch (err) {
            setError(err.message);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.5, when: "beforeChildren", staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
    };

    // State to control the dropdown visibility
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const tableBodyVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className="min-h-screen p-4 mobile:max-tablet:px-2"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <ToastContainer />

            <motion.div
                className="flex justify-between items-center  mb-6 mobile:max-tablet:mb-3"
                variants={itemVariants}
            >
                <h1 className="text-3xl mobile:max-tablet:text-lg font-medium text-black">All Students Data</h1>
                <motion.button
                    className="p-2 block tablet:hidden bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 transition duration-300 ease-in-out"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setDropdownVisible(!isDropdownVisible)}
                >
                    Filter
                </motion.button>
            </motion.div>

            {isDropdownVisible && (
                <motion.div
                    className="bg-white rounded-lg shadow-lg p-4 mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <SearchBar
                        rollNumber={rollNumber}
                        name={name}
                        Class={Class}
                        Section={Section}
                        handleRollNumberChange={handleRollNumberChange}
                        handleNameChange={handleNameChange}
                        handleClassChange={handleClassChange}
                        handleSectionChange={handleSectionChange}
                        handlebothEventsCalled={handlebothEventsCalled}
                    />
                </motion.div>
            )}


            {/* Original SearchBar for non-mobile screens */}
            <div className="w-full tablet:block hidden my-2">
                <SearchBar
                    rollNumber={rollNumber}
                    name={name}
                    Class={Class}
                    Section={Section}
                    handleRollNumberChange={handleRollNumberChange}
                    handleNameChange={handleNameChange}
                    handleClassChange={handleClassChange}
                    handleSectionChange={handleSectionChange}
                    handlebothEventsCalled={handlebothEventsCalled}
                />
            </div>
            <motion.div
                className="text-center"
                variants={itemVariants}
            >
                {loading && userData.length > 0 && <Loading />}

                {showAddRollNumberButton && Class && Section && !loading && (
                    <motion.button
                        className="mb-4 px-4 py-2 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 transition duration-300 ease-in-out"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleRollNumber}
                    >
                        Add Roll Number
                    </motion.button>
                )}

                <div className="overflow-x-auto border rounded-lg">
                    <table className="w-full rounded-md border shadow-lg whitespace-nowrap">
                        <Header headings={['Roll Number', 'Name', 'Class', 'Section', 'Phone No.', 'E-mail', "Action"]} />
                        <motion.tbody
                            variants={tableBodyVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-gray-600 text-sm font-light"
                        >
                            {loading && userData.length < 1 ? (
                                <motion.tr variants={rowVariants}>
                                    <td colSpan="6" className="py-4 px-6 text-center">
                                        <Loading />
                                    </td>
                                </motion.tr>
                            ) : Array.isArray(filteredStudents) && filteredStudents.length === 0 ? (
                                <motion.tr variants={rowVariants}>
                                    <td colSpan="6" className="py-4 px-6 text-center font-medium text-gray-500">
                                        No students found
                                    </td>
                                </motion.tr>
                            ) : Array.isArray(filteredStudents) ? (
                                <StudentDetailTile userData={filteredStudents} />
                            ) : (
                                <motion.tr variants={rowVariants}>
                                    <td colSpan="6" className="py-4 px-6 text-center font-medium text-red-500">
                                        Unexpected data format
                                    </td>
                                </motion.tr>
                            )}
                        </motion.tbody>
                    </table>
                </div>

                <div ref={sentinelRef} className="h-10">
                    {loading && start > 0 && (
                        <div className="text-center w-full text-gray-600 text-sm">Loading more...</div>
                    )}
                </div>

                {loadMore && userData.length > 0 && <Loading />}
            </motion.div>
        </motion.div>
    );
}
