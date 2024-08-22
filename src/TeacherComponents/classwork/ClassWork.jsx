import React, { useState, useEffect, useContext } from "react";
import ClassWorkTile from './ClassWorkTile';
import NewUpload from './NewUpload';
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import Loading from "../../LoadingScreen/Loading";
import { BASE_URL_ClassWork } from "../../Config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiUpload, FiBook, FiUsers, FiLayers } from 'react-icons/fi';

function ClassWork() {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [additionalData, setAdditionalData] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(4);
    const [allDataFetched, setAllDataFetched] = useState(false);
    const [uniqueSections, setUniqueSections] = useState([]);
    const [uniqueSubjects, setUniqueSubjects] = useState([]);

    const uniqueClasses = Array.from(new Set(authState.subject ? authState.subject.map(subj => subj.class) : []));


    useEffect(() => {
        setUniqueSections(Array.from(new Set(
            authState.subject ? authState.subject
                .filter(subj => subj.class === selectedClass)
                .map(subj => subj.section) : []
        )));
    }, [selectedClass]);


    useEffect(() => {
        setUniqueSubjects(Array.from(new Set(
            authState.subject ? authState.subject
                .filter(subj => subj.section === selectedSection && subj.class === selectedClass)
                .map(subj => subj.subject) : []
        )));
    }, [selectedSection, selectedClass]);

    const handleOpen = () => {
        if (!authState.subject) { toast.error("No subject is assigned. Please contact Admin"); return; }
        setIsDialogOpen(true);

    }
    const handleClose = () => {
        setIsDialogOpen(false);
    }

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
    }
    const handleSectionChange = (event) => {
        setSelectedSection(event.target.value);
    }
    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
    }

    const handleNewWork = (newWork) => {
        console.log('class.jsx')
        setAdditionalData([newWork]);
    };

    useEffect(() => {
        if (selectedSubject) {
            setStart(0);
            setDetails([]);
            setAllDataFetched(false);
            fetchClassWork();
        }
    }, [authState.accessToken, selectedSubject, selectedSection, selectedClass]);

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (start !== 0) {
            fetchClassWork();
        }
    }, [start, selectedSubject, selectedSection, selectedClass]);


    const fetchClassWork = async () => {
        if (!selectedClass || !selectedSection || !selectedSubject) return;

        console.log(authState.ClassDetails.class, new Date().getMonth() + 1, authState.ClassDetails.section, selectedSubject);
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL_ClassWork}/classwork/fetch/teacher?class=${selectedClass}&month=${new Date().getMonth() + 1}&year=2024&section=${selectedSection}&subject=${selectedSubject}&start=${start}&end=${end}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`,
                }
            });
            const work = response.data.classwork.length;
            console.log("API response:", response.data.classwork);
            if (work < end) {
                toast.success('All data fetched');
                console.log('All data fetched')
                setAllDataFetched(true);
            }
            setDetails(prevData => [...prevData, ...response.data.classwork]);
            console.log('fetch', response.data)
        } catch (error) {
            console.error("Error fetching student classwork:", error);
        }
        finally {
            setLoading(false)
        }
    };

    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
    };


    return (
        <motion.div
            className="w-full flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 mb-3 no-scrollbar mobile:max-laptop:"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <ToastContainer />
            <motion.div
                className='w-full flex  items-center justify-between tablet:max-laptop:flex-col tablet:max-laptop:items-start mobile:max-tablet:px-3'
                variants={itemVariants}
            >
                <h1 className='text-3xl font-bold text-indigo-700 mobile:max-tablet:text-lg whitespace-nowrap'>All ClassWork</h1>

                <div className="block tablet:hidden w-full mobile:max-tablet:text-end">
                    <motion.button
                        className="p-2 border rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors duration-300"
                        onClick={() => setDropdownVisible(!isDropdownVisible)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FiFilter className="inline-block mr-2" />
                        Filter
                    </motion.button>
                    <AnimatePresence>
                        {isDropdownVisible && (
                            <motion.div
                                className='flex absolute left-0 right-0 bg-white p-4 items-center gap-3 flex-col shadow-lg rounded-md'
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <select id="class" className="w-full px-4 py-2 border rounded-md" onChange={handleClassChange}>
                                    <option value="">Class</option>
                                    {uniqueClasses.map((classOption, index) => (
                                        <option key={index} value={classOption}>{classOption}</option>
                                    ))}
                                </select>
                                <select id="section" className="w-full px-4 py-2 border rounded-md" onChange={handleSectionChange}>
                                    <option value="">Section</option>
                                    {uniqueSections.map((sectionOption, index) => (
                                        <option key={index} value={sectionOption}>{sectionOption}</option>
                                    ))}
                                </select>
                                <select id="subject" className="w-full px-4 py-2 border rounded-md" onChange={handleSubjectChange}>
                                    <option value="">Subject</option>
                                    {uniqueSubjects.map((subjectOption, index) => (
                                        <option key={index} value={subjectOption}>{subjectOption}</option>
                                    ))}
                                </select>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>


            </motion.div>
            <div className="flex items-center space-x-4 mt-3">
                <div className='flex mobile:max-tablet:hidden items-center gap-3'>
                    <div className="relative">
                        <FiBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500" />
                        <select id="class" className="w-full pl-10 pr-4 py-2 border-2 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-md" onChange={handleClassChange}>
                            <option value="">Class</option>
                            {uniqueClasses.map((classOption, index) => (
                                <option key={index} value={classOption}>{classOption}</option>
                            ))}
                        </select>
                    </div>
                    <div className="relative">
                        <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500" />
                        <select id="section" className="w-full pl-10 pr-4 py-2 border-2 border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" onChange={handleSectionChange}>
                            <option value="">Section</option>
                            {uniqueSections.map((sectionOption, index) => (
                                <option key={index} value={sectionOption}>{sectionOption}</option>
                            ))}
                        </select>
                    </div>
                    <div className="relative">
                        <FiLayers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500" />
                        <select id="subject" className="w-full pl-10 pr-4 py-2 border-2 border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" onChange={handleSubjectChange}>
                            <option value="">Subject</option>
                            {uniqueSubjects.map((subjectOption, index) => (
                                <option key={index} value={subjectOption}>{subjectOption}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <motion.button
                    className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors duration-300 flex items-center"
                    onClick={handleOpen}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FiUpload className="mr-2" />
                    Upload
                </motion.button>
            </div>
            {loading ? (
                <Loading />
            ) : details.length === 0 ? (
                <motion.div
                    className="text-center w-full mt-6 text-indigo-600"
                    variants={itemVariants}
                >
                    No Classwork found
                </motion.div>
            ) : (
                <motion.div
                    className='w-full mt-2 rounded-lg  px-2'
                    variants={containerVariants}
                >
                    <ClassWorkTile details={details} Class={selectedClass} additionalData={additionalData} selectedSubject={selectedSubject} />
                    {!allDataFetched && (
                        <motion.button
                            className='text-indigo-500 hover:text-indigo-800 mt-3 cursor-pointer text-center w-full'
                            onClick={handleViewMore}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View More
                        </motion.button>
                    )}
                </motion.div>
            )}

            {isDialogOpen && <NewUpload onClose={handleClose} onNewWork={handleNewWork} />}
        </motion.div>

    )
}

export default ClassWork