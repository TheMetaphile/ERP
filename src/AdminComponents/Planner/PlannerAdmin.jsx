import Tabs from "./utils/Tabs";
import React, { useState, useEffect } from "react";
import Selection from "./utils/Selection";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

function PlannerAdmin() {
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
            className="overflow-y-auto w-full items-start px-2 no-scrollbar mobile:max-sm:mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <ToastContainer />
            <div className="w-full flex items-center justify-between px-4">
                <motion.h1
                    className="text-3xl mobile:max-tablet:text-lg whitespace-nowrap font-medium mb-2 text-black"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Weekly Plan
                </motion.h1>
                <div className="block tablet:hidden w-full mobile:max-tablet:text-end">
                    <motion.button
                        className="p-2 border rounded bg-purple-500 text-white hover:bg-purple-600"
                        onClick={() => setDropdownVisible(!isDropdownVisible)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Filter
                    </motion.button>
                    {isDropdownVisible && (
                        <motion.div
                            className="flex fixed left-0 right-0 bg-white pt-1 p-4 gap-2 justify-between mobile:max-tablet:flex-col"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
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
            <Tabs
                Class={selectedClass}
                section={selectedSection}
                subject={selectedSubject}
            />
        </motion.div>

    )
}

export default PlannerAdmin