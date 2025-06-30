import React, { useEffect, useState, useContext } from 'react';
import { FaChevronUp, FaChevronDown, FaUserGraduate } from "react-icons/fa6";
import AuthContext from '../../../Context/AuthContext';
import Loading from './../../../LoadingScreen/Loading';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import SubjectDetails from './SubjectDetails';
import { BASE_URL } from '../../../Config';
import { motion, AnimatePresence } from 'framer-motion';
import { refreshAccessToken } from '../../../RefreshTokenHelper';
import { toast } from 'react-toastify';

export default function AssignSubjectRow({ Class, selectedStream }) {
    const [expanded, setExpanded] = useState(false);
    const [sectionsDetails, setSections] = useState([]);
    const [loading, setLoading] = useState(false);
    const { authState, darkMode, updateAccessToken, logout } = useContext(AuthContext);

    const handleClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        if (expanded) {
            setLoading(true);
            fetchSections();
        }
    }, [expanded]);

    const fetchSections = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/classTeacher/fetch/sections`, {
                accessToken: authState?.accessToken,
                class: Class,
            });
            const sectionsdetail = response.data.sections;
            console.log(Class);

            setSections(sectionsdetail.map(section => ({
                ...section,
                expanded: false,
            })));
        } catch (error) {
            console.error("Error searching for teachers:", error);
            if (
                error.response &&
                error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await fetchSections();
                } catch (refreshError) {
                }
            } else {
                toast.error(error.response?.data?.error || "An error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSectionClick = (index) => {
        setSections(sectionsDetails.map((section, i) =>
            i === index ? { ...section, expanded: !section.expanded } : section
        ));
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: {
            opacity: 1,
            height: 'auto',
            transition: { duration: 0.3 }
        },
        exit: {
            opacity: 0,
            height: 0,
            transition: { duration: 0.2 }
        }
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.2 }
        }
    };

    return (
        <motion.div
            key={Class}
            className={`w-full mt-3 mb-4 rounded-lg shadow-md overflow-hidden ${darkMode
                    ? 'bg-gray-800 border-gray-700 shadow-gray-900/50'
                    : 'bg-white border border-gray-200 shadow-gray-200/70'
                } transition-colors duration-300`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
        >
            <div
                className={`flex justify-between items-center p-3 cursor-pointer ${darkMode
                        ? 'hover:bg-gray-700'
                        : 'hover:bg-gray-50'
                    } transition-colors duration-200`}
                onClick={handleClick}
            >
                <div className="flex items-center py-2">
                    <FaUserGraduate className={`${darkMode ? 'text-blue-400' : 'text-secondary-600'} mr-2 text-lg`} />
                    <div className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-secondary-800'}`}>
                        {Class} {selectedStream && (Class === '11th' || Class === '12th') ? `- ${selectedStream}` : ''}
                    </div>
                </div>
                <motion.div
                    className={`self-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {expanded ? <FaChevronUp /> : <FaChevronDown />}
                </motion.div>
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        className={`px-5 py-3 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {!loading ? (
                            sectionsDetails.length > 0 ? (
                                <div className="space-y-3">
                                    {sectionsDetails.map((details, index) => (
                                        <motion.div
                                            key={index}
                                            className={`rounded-lg shadow-md overflow-hidden ${darkMode
                                                    ? 'bg-gray-700 border-gray-600'
                                                    : 'bg-white border border-gray-300'
                                                }`}
                                            variants={sectionVariants}
                                            initial="hidden"
                                            animate="visible"
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <div
                                                className={`px-2 flex justify-between py-3 pl-4 h-fit ${darkMode
                                                        ? 'border-gray-600 bg-gray-700 hover:bg-gray-600'
                                                        : 'border-gray-300 hover:bg-gray-50'
                                                    } cursor-pointer transition-colors duration-200`}
                                                onClick={() => handleSectionClick(index)}
                                            >
                                                <h1 className={`w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'
                                                    }`}>
                                                    {details.section}
                                                </h1>
                                                <h1 className={`w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap ${darkMode ? 'text-gray-200' : 'text-gray-700'
                                                    }`}>
                                                    {details.name}
                                                </h1>
                                                <motion.div
                                                    className={`self-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    {details.expanded ? <FaChevronUp /> : <FaChevronDown />}
                                                </motion.div>
                                            </div>

                                            <AnimatePresence>
                                                {details.expanded && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <SubjectDetails
                                                            key={index}
                                                            Class={Class}
                                                            section={details.section}
                                                            selectedStream={selectedStream}
                                                            darkMode={darkMode}
                                                        />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <motion.div
                                    className={`text-center p-4 rounded-lg ${darkMode
                                            ? 'bg-gray-700 text-gray-300'
                                            : 'bg-gray-50 text-gray-600'
                                        }`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    No section added. Please assign Class Teacher First then assign subjects of that class to other teachers
                                </motion.div>
                            )
                        ) : (
                            <div className="py-4">
                                <Loading darkMode={darkMode} />
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}