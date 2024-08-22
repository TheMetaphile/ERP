import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaDollarSign, FaUser, FaPercent, FaIdCard, FaCheckCircle, FaUserTie } from 'react-icons/fa';

const AppliedTile = (props) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full p-6 mobile:max-tablet:p-2  rounded-xl shadow-lg bg-gradient-to-br from-indigo-50 to-white border-l-4 border-indigo-500"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Header name={props.name} id={props.id} />
                <StatusBar status={props.status} checkedBy={props.by} />
                <InfoCard icon={<FaCalendarAlt />} label="Submission Date" value={props.submission} />
                <InfoCard icon={<FaDollarSign />} label="Current Salary" value={props.salary} />
                <InfoCard icon={<FaPercent />} label="Increment" value={props.increment} />
            </div>
        </motion.div>
    );
};

const Header = ({ name, id }) => (
    <div className="col-span-full mb-2">
        <h2 className="text-2xl font-bold text-indigo-700">{name}</h2>
        <p className="text-gray-600">Employee ID: {id}</p>
    </div>
);

const StatusBar = ({ status, checkedBy }) => (
    <div className="col-span-full mobile:max-tablet:flex-col mobile:max-tablet:items-start mb-4 flex justify-between items-center bg-indigo-100 rounded-lg p-3">
        <div className="flex items-center space-x-2">
            <FaCheckCircle className="text-indigo-600" />
            <span className="font-medium text-indigo-700">Status: {status}</span>
        </div>
        <div className="flex items-center space-x-2">
            <FaUserTie className="text-indigo-600" />
            <span className="text-gray-700">Checked By: {checkedBy}</span>
        </div>
    </div>
);

const InfoCard = ({ icon, label, value }) => (
    <motion.div
        className="bg-white rounded-lg p-4 shadow-md"
        whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
        <div className="flex items-center space-x-3 mb-2">
            <div className="text-indigo-500 text-xl">{icon}</div>
            <h3 className="font-medium text-gray-700">{label}</h3>
        </div>
        <p className="text-lg font-semibold text-indigo-600">{value}</p>
    </motion.div>
);

export default AppliedTile;