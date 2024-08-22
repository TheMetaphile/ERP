import React from 'react';
import { motion } from 'framer-motion';
import { IoLogoWhatsapp } from 'react-icons/io';
import { FaBirthdayCake } from 'react-icons/fa';
import Logo from '../../../assets/Test Account.png';

const BirthdayCard = ({ name, currentClass, DOB, isToday }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-indigo-100 rounded-lg p-4 mb-4 shadow-md"
    >
        <div className="flex items-center justify-between">
            <div>
                <h3 className="text-lg font-semibold text-indigo-800">{name}</h3>
                <p className="text-sm text-indigo-600">Class: {currentClass}</p>
                <p className="text-sm text-indigo-600">DOB: {DOB}</p>
            </div>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-indigo-500 text-white p-2 rounded-full cursor-pointer"
            >
                <IoLogoWhatsapp size={24} />
            </motion.div>
        </div>
        {isToday && (
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 500 }}
                className="mt-2 text-center text-indigo-500 font-bold"
            >
                🎉 Happy Birthday! 🎉
            </motion.div>
        )}
    </motion.div>
);

const BirthdaySection = ({ title, birthdays, isToday }) => (
    <div className="mb-8">
        <h2 className="text-2xl mobile:max-tablet:text-lg font-bold text-indigo-700 mb-4 flex items-center">
            <FaBirthdayCake className="mr-2" />
            {title}
        </h2>
        {birthdays.length === 0 ? (
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-indigo-500 italic"
            >
                {isToday ? "Today is no one's birthday" : "No upcoming birthdays"}
            </motion.p>
        ) : (
            birthdays.map((detail, index) => (
                <BirthdayCard key={index} {...detail} isToday={isToday} />
            ))
        )}
    </div>
);

export default function TeacherTile({ birthdays }) {
    const todayBirthday = birthdays?.todayBirthday || [];
    const upcomingBirthdays = birthdays?.upcomingBirthdays || [];

    return (
        <div className=" mx-auto p-6 bg-indigo-50 rounded-xl shadow-lg">

            <BirthdaySection
                title="Today's Birthdays"
                birthdays={todayBirthday}
                isToday={true}
            />

            <BirthdaySection
                title="Upcoming Birthdays"
                birthdays={upcomingBirthdays}
                isToday={false}
            />
        </div>
    );
}