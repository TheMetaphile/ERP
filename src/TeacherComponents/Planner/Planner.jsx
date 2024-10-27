import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFilter } from "react-icons/fa";
import Tabs from "./utils/Tabs";
import Selection from "./utils/Selection";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Planner() {
    const [selectedClass, setSelectedClass] = useState(localStorage.getItem('selectedClass') || '');
    const [selectedSection, setSelectedSection] = useState(localStorage.getItem('selectedSection') || '');
    const [selectedSubject, setSelectedSubject] = useState(localStorage.getItem('selectedSubject') || '');
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    console.log(selectedClass, selectedSection, selectedSubject)

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
            className="overflow-y-auto w-full items-start px-2 no-scrollbar bg-blue-50"
        >
            <ToastContainer />
            <div className='w-full flex items-center justify-between px-4 mobile:max-tablet:pl-1 py-4'>

                <motion.h1
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="text-3xl mobile:max-tablet:text-lg whitespace-nowrap font-medium mb-2 text-black"
                >
                    Weekly Plan
                </motion.h1>
                <div className="flex justify-end tablet:hidden w-full mobile:max-tablet:text-end pt-10">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 border rounded bg-blue-600 text-white flex items-center"
                        onClick={() => setDropdownVisible(!isDropdownVisible)}
                    >
                        <FaFilter className="mr-2" /> Filter
                    </motion.button>
                    {isDropdownVisible && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='flex fixed mt-12 left-0 right-0 bg-white pt-1 p-4 gap-2 justify-between mobile:max-tablet:flex-col shadow-lg'
                        >
                            <Selection
                                setClass={setSelectedClass}
                                setSection={setSelectedSection}
                                setSubject={setSelectedSubject}
                            />
                        </motion.div>
                    )}
                </div>

                <div className="mobile:max-tablet:hidden">
                    <Selection
                        setClass={setSelectedClass}
                        setSection={setSelectedSection}
                        setSubject={setSelectedSubject}
                    />
                </div>
            </div>
            <Tabs Class={selectedClass} section={selectedSection} subject={selectedSubject} />
        </motion.div>
    )
}

export default Planner;