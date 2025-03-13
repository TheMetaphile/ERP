import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FaFilter } from "react-icons/fa";
import Tabs from "./utils/Tabs";
import Selection from "./utils/Selection";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "../../Context/AuthContext";

function Planner() {
    const { darkMode } = useContext(AuthContext);
    const [selectedClass, setSelectedClass] = useState(localStorage.getItem('selectedClass') || '');
    const [selectedSection, setSelectedSection] = useState(localStorage.getItem('selectedSection') || '');
    const [selectedSubject, setSelectedSubject] = useState(localStorage.getItem('selectedSubject') || '');
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        localStorage.setItem('selectedClass', selectedClass);
        localStorage.setItem('selectedSection', selectedSection);
        localStorage.setItem('selectedSubject', selectedSubject);
    }, [selectedClass, selectedSection, selectedSubject]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`overflow-y-auto w-full items-start px-2 no-scrollbar ${darkMode ? 'bg-gray-900 text-white' : 'bg-blue-50 text-black'
                }`}
        >
            <ToastContainer />
            <div className='w-full flex items-center justify-between px-4 mobile:max-tablet:pl-1 py-4'>
                <motion.h1
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className={`text-3xl mobile:max-tablet:text-lg whitespace-nowrap font-medium mb-2 ${darkMode ? 'text-white' : 'text-black'
                        }`}
                >
                    Weekly Plan
                </motion.h1>
                <div className="flex justify-end tablet:hidden w-full mobile:max-tablet:text-end pt-10">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-2 border rounded flex items-center ${darkMode
                            ? 'bg-blue-700 text-white border-gray-600'
                            : 'bg-blue-600 text-white'
                            }`}
                        onClick={() => setDropdownVisible(!isDropdownVisible)}
                    >
                        <FaFilter className="mr-2" /> Filter
                    </motion.button>
                    {isDropdownVisible && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex fixed mt-12 left-0 right-0 pt-1 p-4 gap-2 justify-between mobile:max-tablet:flex-col shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'
                                }`}
                        >
                            <Selection
                                setClass={setSelectedClass}
                                setSection={setSelectedSection}
                                setSubject={setSelectedSubject}
                                darkMode={darkMode}
                            />
                        </motion.div>
                    )}
                </div>

                <div className="mobile:max-tablet:hidden">
                    <Selection
                        setClass={setSelectedClass}
                        setSection={setSelectedSection}
                        setSubject={setSelectedSubject}
                        darkMode={darkMode}
                    />
                </div>
            </div>
            <Tabs
                Class={selectedClass}
                section={selectedSection}
                subject={selectedSubject}
                darkMode={darkMode}
            />
        </motion.div>
    )
}

export default Planner;