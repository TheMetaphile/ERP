import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaDollarSign, FaUser, FaPercent, FaIdCard, FaCheckCircle, FaUserTie } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';

const AppliedTile = (props) => {
    const { darkMode } = useOutletContext();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`w-full p-6 mobile:max-tablet:p-2 rounded-xl shadow-lg ${darkMode
                    ? 'bg-gray-800 border-l-4 border-blue-700 text-white'
                    : 'bg-gradient-to-br from-blue-50 to-white border-l-4 border-blue-500'
                }`}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Header name={props.name} id={props.id} darkMode={darkMode} />
                <StatusBar status={props.status} checkedBy={props.by} darkMode={darkMode} />
                <InfoCard icon={<FaCalendarAlt />} label="Submission Date" value={props.submission} darkMode={darkMode} />
                <InfoCard icon={<FaDollarSign />} label="Current Salary" value={props.salary} darkMode={darkMode} />
                <InfoCard icon={<FaPercent />} label="Increment" value={props.increment} darkMode={darkMode} />
            </div>
        </motion.div>
    );
};

const Header = ({ name, id, darkMode }) => (
    <div className="col-span-full mb-2">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>{name}</h2>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Employee ID: {id}</p>
    </div>
);

const StatusBar = ({ status, checkedBy, darkMode }) => (
    <div
        className={`col-span-full mobile:max-tablet:flex-col mobile:max-tablet:items-start mb-4 flex justify-between items-center rounded-lg p-3 ${darkMode ? 'bg-gray-700' : 'bg-blue-100'
            }`}
    >
        <div className="flex items-center space-x-2">
            <FaCheckCircle className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
            <span className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-700'
                }`}>
                Status: {status}
            </span>
        </div>
        <div className="flex items-center space-x-2">
            <FaUserTie className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                Checked By: {checkedBy}
            </span>
        </div>
    </div>
);

const InfoCard = ({ icon, label, value, darkMode }) => (
    <motion.div
        className={`rounded-lg p-4 shadow-md ${darkMode
                ? 'bg-gray-700 text-white'
                : 'bg-white'
            }`}
        whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
        <div className="flex items-center space-x-3 mb-2">
            <div className={`text-xl ${darkMode ? 'text-blue-400' : 'text-blue-500'
                }`}>{icon}</div>
            <h3 className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>{label}</h3>
        </div>
        <p className={`text-lg font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-600'
            }`}>{value}</p>
    </motion.div>
);

export default AppliedTile;