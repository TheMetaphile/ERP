import React from 'react';
import { motion } from 'framer-motion';
import { IoLogoWhatsapp } from "react-icons/io";
import { FaBirthdayCake, FaUserGraduate, FaCalendarAlt } from "react-icons/fa";

const BirthdayCard = ({ detail, darkMode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full flex items-center mb-4 p-4 rounded-lg shadow-lg justify-between mobile:max-tablet:flex-col mobile:max-tablet:gap-2 mobile:max-tablet:items-start ${darkMode
                ? 'bg-gray-800 text-white'
                : 'bg-blue-50 text-black'
            }`}
    >
        <div className="flex items-center space-x-4">
            <motion.img
                whileHover={{ scale: 1.1 }}
                src={detail.profileLink}
                alt="Profile"
                className={`h-12 w-12 rounded-full border-2 ${darkMode
                        ? 'border-gray-600'
                        : 'border-blue-300'
                    }`}
            />
            <div className="flex flex-col">
                <span className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-800'
                    }`}>
                    {detail.name}
                </span>
                <div className={`flex items-center text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                    <FaUserGraduate className="mr-1" />
                    <span>Class: {detail.currentClass}</span>
                </div>
                <div className={`flex items-center text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                    <FaCalendarAlt className="mr-1" />
                    <span>DOB: {detail.DOB}</span>
                </div>
            </div>
        </div>
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center px-3 py-2 rounded-lg shadow-md cursor-pointer ${darkMode
                    ? 'bg-blue-700 text-white hover:bg-blue-600'
                    : 'bg-blue-600 text-white hover:bg-blue-500'
                }`}
        >
            <IoLogoWhatsapp className="mr-2" />
            <span>Message</span>
        </motion.div>
    </motion.div>
);

const BirthdaySection = ({ title, birthdays, isToday, darkMode }) => (
    <div className="mb-6">
        <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-center font-bold text-xl mb-4 ${darkMode ? 'text-blue-300' : 'text-blue-800'
                }`}
        >
            <FaBirthdayCake className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'
                }`} />
            {title}
        </motion.h2>
        {birthdays.length === 0 ? (
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`italic ${darkMode ? 'text-blue-400' : 'text-blue-500'
                    }`}
            >
                {isToday ? "Today is no one's birthday" : "No upcoming birthdays"}
            </motion.p>
        ) : (
            birthdays.map((detail, index) => (
                <BirthdayCard
                    key={index}
                    detail={detail}
                    isToday={isToday}
                    darkMode={darkMode}
                />
            ))
        )}
    </div>
);

export default function StudentTile({ birthdays, darkMode }) {
    const todayBirthday = birthdays?.todayBirthday || [];
    const upcomingBirthdays = birthdays?.upcomingBirthdays || [];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`w-full flex flex-col p-6 rounded-xl shadow-xl ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
                }`}
        >
            <BirthdaySection
                title="Today's Birthdays"
                birthdays={todayBirthday}
                isToday={true}
                darkMode={darkMode}
            />
            <BirthdaySection
                title="Upcoming Birthdays"
                birthdays={upcomingBirthdays}
                isToday={false}
                darkMode={darkMode}
            />
        </motion.div>
    );
}