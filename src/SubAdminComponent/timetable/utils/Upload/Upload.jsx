import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UploadTimetable from './UploadTimetable';
import { motion } from 'framer-motion';
import { FaCalendarAlt } from 'react-icons/fa';
import { useContext } from 'react';
import AuthContext from '../../../../Context/AuthContext';

const UploadSubAdmin = () => {
    const { darkMode } = useContext(AuthContext);
    const [ClassRange, setClassRange] = useState('1st-12th');
    const [uploadTimetableData, setUploadData] = useState({
        Class: '',
        section: '',
        day: '',
        schedule: [
            {
                subject: '',
                teacher: '',
                lectureNo: 1,
                optional: false,
                optionalSubjects: []
            }
        ]
    });

    const handleTimetableChange = (index = 0, e) => {
        const { name, value } = e.target;
        if (name === 'Class') {
            if (value === 'Pre-Nursery' || value === 'L.K.G' || value === 'U.K.G' || value === 'U.K.J') {
                setClassRange('Pre-Nursery - U.K.J');
            } else {
                setClassRange('1st-12th');
            }
            setUploadData(prevState => ({
                ...prevState,
                Class: value
            }));
        } else {
            if (name === 'schedule') {
                setUploadData(prevState => ({
                    ...prevState,
                    schedule: prevState.schedule.map((item, loopindex) => 
                        loopindex === index ? value : item
                    )
                }));
            } else {
                setUploadData(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { 
                duration: 0.5, 
                when: "beforeChildren", 
                staggerChildren: 0.1 
            } 
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
    };

    return (
        <motion.div
            className={`flex flex-col overflow-auto h-fit mobile:max-tablet:px-2 overflow-y-auto items-start mt-4 mb-6 no-scrollbar border p-3 rounded-lg shadow-lg ${
                darkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-purple-50 border-purple-100'
            }`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <ToastContainer 
                position="top-right" 
                autoClose={3000} 
                hideProgressBar={false} 
                newestOnTop 
                closeOnClick 
                rtl={false} 
                pauseOnFocusLoss 
                draggable 
                pauseOnHover 
                theme={darkMode ? 'dark' : 'light'}
            />
            
            <motion.div 
                className={`flex w-full flex-wrap text-3xl mobile:max-tablet:text-lg whitespace-nowrap font-bold justify-center items-center mb-3 px-4 mobile:max-tablet:px-2 gap-2 ${
                    darkMode ? 'text-purple-300' : 'text-purple-800'
                }`} 
                variants={itemVariants}
            >
                <FaCalendarAlt className="mr-2" />
                Schedule Time Table
            </motion.div>

            <motion.div className='w-full' variants={itemVariants}>
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className='w-full'
                >
                    <UploadTimetable
                        uploadTimetableData={uploadTimetableData}
                        handleChange={handleTimetableChange}
                        darkMode={darkMode}
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default UploadSubAdmin;