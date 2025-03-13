import React from 'react';
import { motion } from 'framer-motion';
import { IoLogoWhatsapp } from 'react-icons/io';
import { FaBirthdayCake } from 'react-icons/fa';

const BirthdayCard = ({ name, currentClass, DOB, isToday, darkMode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`rounded-lg p-4 mb-4 shadow-md ${darkMode
                ? 'bg-gray-800 text-white'
                : 'bg-blue-100 text-black'
            }`}
    >
        <div className="flex items-center justify-between">
            <div>
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-800'
                    }`}>
                    {name}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                    Class: {currentClass}
                </p>
                <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                    DOB: {DOB}
                </p>
            </div>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-full cursor-pointer ${darkMode
                        ? 'bg-blue-700 text-white'
                        : 'bg-blue-500 text-white'
                    }`}
            >
                <IoLogoWhatsapp size={24} />
            </motion.div>
        </div>
        {isToday && (
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 500 }}
                className={`mt-2 text-center font-bold ${darkMode ? 'text-blue-400' : 'text-blue-500'
                    }`}
            >
                🎉 Happy Birthday! 🎉
            </motion.div>
        )}
    </motion.div>
);

const BirthdaySection = ({ title, birthdays, isToday, darkMode }) => (
    <div className="mb-8">
        <h2 className={`text-2xl mobile:max-tablet:text-lg font-bold mb-4 flex items-center ${darkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>
            <FaBirthdayCake className={`mr-2 ${darkMode ? 'text-blue-400' : ''
                }`} />
            {title}
        </h2>
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
                    {...detail}
                    isToday={isToday}
                    darkMode={darkMode}
                />
            ))
        )}
    </div>
);

export default function TeacherTile({ birthdays, darkMode }) {
    const todayBirthday = birthdays?.todayBirthday || [];
    const upcomingBirthdays = birthdays?.upcomingBirthdays || [];

    return (
        <div
            className={`mx-auto p-6 rounded-xl shadow-lg ${darkMode
                    ? 'bg-gray-900 text-white'
                    : 'bg-blue-50 text-black'
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
        </div>
    );
}