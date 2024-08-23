import Tabs from "./utils/Tabs";
import React, { useState } from "react";
import Selection from "./utils/Selection";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

function PlannerHOD() {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    console.log(selectedClass, selectedSection, selectedSubject)

    return (
        <div className="overflow-y-auto w-full items-start  px-2 no-scrollbar">
            <ToastContainer />
            <div className='w-full flex items-center justify-between px-4 mobile:max-tablet:pl-0'>
                <motion.h1
<<<<<<< Updated upstream
                    className="text-3xl font-bold text-blue-600 mobile:max-tablet:text-2xl whitespace-nowrap mb-2"
=======
                    className="text-3xl font-medium text-black mobile:max-tablet:text-lg whitespace-nowrap mb-2"
>>>>>>> Stashed changes
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >Weekly Plan
                </motion.h1>

                <div className="block tablet:hidden w-full mobile:max-tablet:text-end">
                    <button
                        className="p-2 border rounded"
                        onClick={() => setDropdownVisible(!isDropdownVisible)}
                    >
                        Filter
                    </button>
                    {isDropdownVisible && (
                        <div className='flex fixed left-0 right-0 bg-white pt-1 p-4 gap-2 justify-between mobile:max-tablet:flex-col '>
                            <Selection
                                setClass={setSelectedClass}
                                setSection={setSelectedSection}
                                setSubject={setSelectedSubject} />
                        </div>
                    )}
                </div>



                <div className=" mobile:max-tablet:hidden">
                    <Selection
                        setClass={setSelectedClass}
                        setSection={setSelectedSection}
                        setSubject={setSelectedSubject} />
                </div>
            </div>
            <Tabs Class={selectedClass} section={selectedSection} subject={selectedSubject} />
            {/* <Outlet /> */}
        </div>

    )
}

export default PlannerHOD