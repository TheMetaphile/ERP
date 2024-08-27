import React from 'react';
import AssignTeacherRow from './AssignTeacherRow';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { FaChalkboardTeacher } from 'react-icons/fa';

function AssignTeacher() {
    const content = [
        { class: 'Pre-Nursery' },
        { class: 'L.K.G' },
        { class: 'U.K.G' },
        { class: '1st' },
        { class: '2nd' },
        { class: '3rd' },
        { class: '4th' },
        { class: '5th' },
        { class: '6th' },
        { class: '7th' },
        { class: '8th' },
        { class: '9th' },
        { class: '10th' },
        { class: '11th' },
        { class: '12th' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start  mb-3 no-scrollbar mobile:max-tablet:mx-2 bg-secondary-50"
        >
            <ToastContainer />
            <motion.h1
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="text-3xl p-2 mobile:max-tablet:text-2xl font-mediun text-black flex items-center"
            >
                <FaChalkboardTeacher className="mr-2" /> Assign Class Teacher
            </motion.h1>

            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="border rounded-lg shadow-lg w-full flex flex-col px-3 mobile:max-tablet:px-0 overflow-y-auto items-start mt-2 mb-3 no-scrollbar bg-white"
            >
                {content.map((con, index) => (
                    <motion.div
                        key={index}
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className='w-full'
                    >
                        <AssignTeacherRow Class={con.class} />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}

export default AssignTeacher;