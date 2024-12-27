import React, { useState, useEffect, useContext, useRef } from "react";
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
    const sentinelRef = useRef(null);


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
            setLoading(false);
        }
    }, [selectedSubject, selectedSection, selectedClass]);


    const handleViewMore = () => {
        if (!allDataFetched && !loading) {
            setStart((prevStart) => prevStart + end);
        }
    };

    useEffect(() => {
        if (start === 0 && details.length === 0 && !allDataFetched && !loading) {
            fetchClassWork();
        }
    }, [start, details, allDataFetched, loading]);

    useEffect(() => {
        if (start !== 0) {
            fetchClassWork();
        }
    }, [start]);


    const fetchClassWork = async () => {
        if (!selectedClass || !selectedSection || !selectedSubject) return;
        if (loading || allDataFetched) return;

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
            className="w-full flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 mb-3 no-scrollbar mobile:max-laptop:"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <ToastContainer />
            <div className=" flex justify-between w-full mobile:max-sm:flex-col">
                <motion.div
                    className='w-full flex  items-center justify-between tablet:max-laptop:flex-col tablet:max-laptop:items-start mobile:max-tablet:px-3'
                    variants={itemVariants}
                >

                    <h1 className='text-3xl font-medium text-black mobile:max-tablet:text-lg whitespace-nowrap'>All ClassWork</h1>


                    <div className="block tablet:hidden w-full mobile:max-tablet:text-end">
                        <motion.button
                            className="p-2 border rounded-full bg-blue-100 text-black hover:bg-blue-200 transition-colors duration-300"
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
                <motion.div variants={itemVariants} className='w-full flex items-center justify-end mb-4'>

                    <div className="flex items-center space-x-4 mt-3">
                        <div className='flex mobile:max-tablet:hidden items-center gap-3'>
                            <div className="relative">
                                <FiBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                                <select id="class" className="w-full px-8 py-2 border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md" onChange={handleClassChange}>
                                    <option value="">Class</option>
                                    {uniqueClasses.map((classOption, index) => (
                                        <option key={index} value={classOption}>{classOption}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="relative">
                                <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                                <select id="section" className="w-full pl-10 pr-4 py-2 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={handleSectionChange}>
                                    <option value="">Section</option>
                                    {uniqueSections.map((sectionOption, index) => (
                                        <option key={index} value={sectionOption}>{sectionOption}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="relative">
                                <FiLayers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                                <select id="subject" className="w-full pl-10 pr-4 py-2 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={handleSubjectChange}>
                                    <option value="">Subject</option>
                                    {uniqueSubjects.map((subjectOption, index) => (
                                        <option key={index} value={subjectOption}>{subjectOption}</option>
                                    ))}
                                </select>
                            </div>

                        </div>
                        <motion.button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center"
                            onClick={handleOpen}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FiUpload className="mr-2" />
                            Upload
                        </motion.button>
                    </div>
                </motion.div>

            </div>
            {loading ? (
                <Loading />
            ) : details.length === 0 ? (
                <motion.div
                    className="text-center w-full mt-6 text-black"
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
                    <div ref={sentinelRef} className="h-10">
                        {loading && start > 0 && (
                            <div className="text-center w-full text-gray-600 text-sm">Loading more...</div>
                        )}
                    </div>
                </motion.div>
            )}

            {isDialogOpen && <NewUpload onClose={handleClose} onNewWork={handleNewWork} />}
        </motion.div>

    )
}

export default ClassWork