import React, { useState } from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSunday } from 'date-fns';
import { FaCheck, FaTimes, FaExclamation, FaUser, FaCalendarAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function AttendanceStatusGridTile({ data, month, darkMode }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleDateClick = (date) => {
        setSelectedDate(date === selectedDate ? null : date);
    };

    const handleStudentClick = (index) => {
        setSelectedStudent(index === selectedStudent ? null : index);
    };

    const currentDate = new Date();
    currentDate.setMonth(month - 1);
    const startDate = startOfMonth(currentDate);
    const endDate = endOfMonth(currentDate);
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

    const students = Object.values(data.output).filter(item => item.name);

    const bgClass = darkMode ? 'bg-gray-800' : 'bg-white';
    const textClass = darkMode ? 'text-white' : 'text-black';
    const subTextClass = darkMode ? 'text-gray-300' : 'text-gray-500';
    const borderClass = darkMode ? 'border-gray-700' : 'border-gray-200';
    const headerBgClass = darkMode ? 'bg-gray-700' : 'bg-blue-100';
    const selectedBgClass = darkMode ? 'bg-gray-600' : 'bg-blue-100';

    const getStatusColor = (status, date) => {
        if (darkMode) {
            switch (status) {
                case 'Present': return 'bg-green-700';
                case 'Absent': return 'bg-red-700';
                case 'Leave': return 'bg-yellow-700';
                default: return isSunday(date) ? 'bg-red-900' : 'bg-gray-700';
            }
        } else {
            switch (status) {
                case 'Present': return 'bg-green-500';
                case 'Absent': return 'bg-red-500';
                case 'Leave': return 'bg-yellow-500';
                default: return isSunday(date) ? 'bg-red-100' : 'bg-gray-200';
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full mb-2"
        >
            <div className="overflow-x-auto mt-3">
                <div
                    className={`
                        inline-block min-w-full 
                        ${bgClass} rounded-xl shadow-2xl
                    `}
                >
                    <div className="flex">
                        <div
                            className={`
                                sticky left-0 z-10 
                                ${bgClass}
                            `}
                        >
                            <div
                                className={`
                                    font-bold h-16 text-xl 
                                    border-b ${borderClass} 
                                    px-6 py-4 ${headerBgClass} 
                                    flex items-center ${textClass}
                                `}
                            >
                                <FaUser
                                    className={`
                                        mr-2 
                                        ${darkMode ? 'text-blue-400' : 'text-blue-600'}
                                    `}
                                />
                                Students
                            </div>
                            {students.map((student, index) => (
                                <motion.div
                                    key={index}
                                    className={`
                                        font-medium text-lg h-16 
                                        flex items-center border-b ${borderClass} 
                                        px-6 hover:cursor-pointer 
                                        ${selectedStudent === index ? selectedBgClass : bgClass}
                                        ${textClass}
                                    `}
                                    onClick={() => handleStudentClick(index)}
                                    whileHover={{ backgroundColor: darkMode ? "#4B5563" : "#E0E7FF" }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {student.name}
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex">
                            {dateRange.map((date, index) => (
                                <div key={index} className={`flex flex-col`}>
                                    <motion.div
                                        className={`
                                            flex flex-col w-16 items-center 
                                            h-16 border-b ${borderClass} 
                                            py-2 hover:cursor-pointer 
                                            ${selectedDate === index
                                                ? (darkMode ? 'bg-blue-900' : 'bg-blue-200')
                                                : (darkMode ? 'bg-gray-800' : 'bg-blue-100')
                                            }
                                        `}
                                        onClick={() => handleDateClick(index)}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <span className={`font-bold text-lg ${textClass}`}>
                                            {format(date, 'd')}
                                        </span>
                                        <span className={`text-sm ${subTextClass}`}>
                                            {format(date, 'EEE')}
                                        </span>
                                    </motion.div>
                                    {students.map((student, studentIndex) => (
                                        <AnimatePresence key={studentIndex}>
                                            <motion.div
                                                className={`
                                                    flex justify-center items-center 
                                                    h-16 w-16 border-b ${borderClass}
                                                    ${selectedDate === index ? (darkMode ? 'bg-gray-700' : 'bg-blue-50') : ''}
                                                    ${selectedStudent === studentIndex ? (darkMode ? 'bg-gray-700' : 'bg-blue-50') : ''}
                                                    ${selectedStudent === studentIndex && selectedDate === index
                                                        ? (darkMode ? 'bg-gray-600' : 'bg-blue-100')
                                                        : ''
                                                    }
                                                `}
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                {(() => {
                                                    const status = student[format(date, 'dd/MM/yyyy')] || student[format(date, 'yyyy-MM-dd')];
                                                    return (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            exit={{ scale: 0 }}
                                                            className={`
                                                                w-8 h-8 rounded-full 
                                                                flex items-center justify-center 
                                                                ${getStatusColor(status, date)}
                                                            `}
                                                        >
                                                            {status === 'Present' && <FaCheck className="text-white" />}
                                                            {status === 'Absent' && <FaTimes className="text-white" />}
                                                            {status === 'Leave' && <FaExclamation className="text-white" />}
                                                            {!status && (
                                                                <span
                                                                    className={`
                                                                        ${isSunday(date)
                                                                            ? (darkMode ? 'text-red-400' : 'text-red-600')
                                                                            : (darkMode ? 'text-gray-400' : "text-gray-500")
                                                                        }
                                                                    `}
                                                                >
                                                                    --
                                                                </span>
                                                            )}
                                                        </motion.div>
                                                    )
                                                })()}
                                            </motion.div>
                                        </AnimatePresence>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}