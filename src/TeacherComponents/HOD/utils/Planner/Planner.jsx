import Tabs from "./utils/Tabs";
import React, { useContext, useState } from "react";
import Selection from "./utils/Selection";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import AuthContext from "../../../../Context/AuthContext";

function PlannerHOD() {
    const { darkMode } = useContext(AuthContext);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedStream, setSelectedStream] = useState('');
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    console.log(selectedClass, selectedSection, selectedSubject)

    return (
        <div className={`overflow-y-auto w-full items-start px-2 no-scrollbar ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <ToastContainer />
            <div className={`w-full flex items-center justify-between px-4 mobile:max-tablet:p-1 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <motion.h1
                    className={`text-3xl font-medium mobile:max-tablet:text-lg whitespace-nowrap mb-2 ${darkMode ? 'text-white' : 'text-black'}`}
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Weekly Plan
                </motion.h1>

                <div className="block tablet:hidden w-full mobile:max-tablet:text-end">
                    <button
                        className={`p-2 border rounded ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black'}`}
                        onClick={() => setDropdownVisible(!isDropdownVisible)}
                    >
                        Filter
                    </button>
                    {isDropdownVisible && (
                        <div className={`flex fixed left-0 right-0 pt-1 p-4 gap-2 justify-between mobile:max-tablet:flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                            <Selection
                                setClass={setSelectedClass}
                                setSection={setSelectedSection}
                                setSubject={setSelectedSubject}
                                setStream={setSelectedStream}
                            />
                        </div>
                    )}
                </div>

                <div className="mobile:max-tablet:hidden">
                    <Selection
                        setClass={setSelectedClass}
                        setSection={setSelectedSection}
                        setSubject={setSelectedSubject}
                        setStream={setSelectedStream}
                    />
                </div>
            </div>
            <Tabs
                Class={selectedClass}
                section={selectedSection}
                subject={selectedSubject}
                stream={selectedStream}
            />
        </div>

    )
}

export default PlannerHOD