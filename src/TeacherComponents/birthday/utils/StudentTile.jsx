import React from 'react';
import { motion } from 'framer-motion';
import { IoLogoWhatsapp } from "react-icons/io";
import { FaBirthdayCake, FaUserGraduate, FaCalendarAlt } from "react-icons/fa";

const BirthdayCard = ({ detail, isToday }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex items-center mb-4 p-4 bg-blue-50 rounded-lg shadow-lg justify-between"
    >
        <div className="flex items-center space-x-4">
            <motion.img
                whileHover={{ scale: 1.1 }}
                src={detail.profileLink}
                alt="Profile"
                className="h-12 w-12 rounded-full border-2 border-blue-300"
            />
            <div className="flex flex-col">
                <span className="font-semibold text-blue-800">{detail.name}</span>
                <div className="flex items-center text-sm text-blue-600">
                    <FaUserGraduate className="mr-1" />
                    <span>Class: {detail.currentClass}</span>
                </div>
                <div className="flex items-center text-sm text-blue-600">
                    <FaCalendarAlt className="mr-1" />
                    <span>DOB: {detail.DOB}</span>
                </div>
            </div>
        </div>
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-lg shadow-md cursor-pointer"
        >
            <IoLogoWhatsapp className="mr-2" />
            <span>Message</span>
        </motion.div>
    </motion.div>
);

const BirthdaySection = ({ title, birthdays, isToday }) => (
    <div className="mb-6">
        <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center font-bold text-xl text-blue-800 mb-4"
        >
            <FaBirthdayCake className="mr-2 text-blue-600" />
            {title}
        </motion.h2>
        {birthdays.length === 0 ? (
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-blue-500 italic"
            >
                {isToday ? "Today is no one's birthday" : "No upcoming birthdays"}
            </motion.p>
        ) : (
            birthdays.map((detail, index) => (
                <BirthdayCard key={index} detail={detail} isToday={isToday} />
            ))
        )}
    </div>
);

export default function StudentTile({ birthdays }) {
    const todayBirthday = birthdays?.todayBirthday || [];
    const upcomingBirthdays = birthdays?.upcomingBirthdays || [];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col p-6 bg-white rounded-xl shadow-xl"
        >
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
        </motion.div>
    );
}