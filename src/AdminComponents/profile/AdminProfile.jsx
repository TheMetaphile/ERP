import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaBirthdayCake, FaIdCard, FaGraduationCap, FaTint } from 'react-icons/fa';
import { IoMdSchool } from 'react-icons/io';
import { GiIndiaGate } from 'react-icons/gi';
import AuthContext from '../../Context/AuthContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const AdminProfile = () => {
  const { authState, darkMode } = useContext(AuthContext);
  const { userDetails } = authState;

  return (
    <motion.div
      className={`min-h-screen tablet:p-8 mobile:max-tablet:p-2 p-4 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className={`mx-auto ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border'} rounded-lg shadow-lg overflow-hidden`}
        variants={itemVariants}
      >
        <div className="relative">
          <div className={`h-32 ${darkMode ? 'bg-gradient-to-r from-blue-800 to-blue-900' : 'bg-gradient-to-r from-blue-300 to-blue-300'}`}></div>
          <img
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 h-32 w-32 rounded-full border-4 border-white object-cover"
            src={userDetails?.profileLink}
            alt={userDetails?.name}
          />
        </div>
        <div className="mt-16 p-8 text-center">
          <motion.h1
            className={`text-3xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}
            variants={itemVariants}
          >
            {userDetails?.name}
          </motion.h1>
        </div>

        <div className="tablet:px-8 py-2 mobile:max-tablet:px-2 mb-3">
          <motion.h2
            className={`text-2xl font-bold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
            variants={itemVariants}
          >
            Personal Information
          </motion.h2>
          <motion.div
            className="grid laptop:grid-cols-3 mobile:max-tablet:grid-cols-1 tablet:grid-cols-2 gap-4"
            variants={containerVariants}
          >
            <InfoItem
              icon={<FaEnvelope />}
              label="Email"
              value={userDetails?.email}
              darkMode={darkMode}
            />
            <InfoItem
              icon={<FaEnvelope />}
              label="Employee Id"
              value={userDetails?.employeeId}
              darkMode={darkMode}
            />
            <InfoItem
              icon={<FaEnvelope />}
              label="Education"
              value={userDetails?.education}
              darkMode={darkMode}
            />
            {userDetails?.co_ordinator && (
              <InfoItem
                icon={<FaEnvelope />}
                label="Co-Ordinator Wing"
                value={userDetails?.co_ordinator_wing}
                darkMode={darkMode}
              />
            )}
            <InfoItem
              icon={<FaBirthdayCake />}
              label="Date of Birth"
              value={userDetails?.DOB}
              darkMode={darkMode}
            />
            <InfoItem
              icon={<FaIdCard />}
              label="Gender"
              value={userDetails?.gender}
              darkMode={darkMode}
            />
            <InfoItem
              icon={<FaTint />}
              label="Aadhaar Number"
              value={userDetails?.aadhaarNumber}
              darkMode={darkMode}
            />
            <InfoItem
              icon={<IoMdSchool />}
              label="Religion"
              value={userDetails?.religion}
              darkMode={darkMode}
            />
            <InfoItem
              icon={<FaGraduationCap />}
              label="Experience"
              value={userDetails?.experience}
              darkMode={darkMode}
            />
            <InfoItem
              icon={<GiIndiaGate />}
              label="Permanent Address"
              value={userDetails?.permanentAddress}
              darkMode={darkMode}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const InfoItem = ({ icon, label, value, darkMode }) => (
  <motion.div
    className={`rounded-lg border shadow-md p-4 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300 ${darkMode
        ? 'bg-gray-700 border-gray-600 text-gray-100'
        : 'bg-white border-gray-200 text-gray-800'
      }`}
    variants={itemVariants}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className={`${darkMode
        ? 'bg-gradient-to-r from-blue-700 to-blue-800'
        : 'bg-gradient-to-r from-blue-400 to-blue-500'
      } p-3 rounded-full`}>
      <span className="text-white text-xl">{icon}</span>
    </div>
    <div className="flex-grow">
      <p className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {label}
      </p>
      <p className={`text-lg font-medium truncate overflow-hidden whitespace-nowrap ${darkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
        {value}
      </p>
    </div>
  </motion.div>
);

export default AdminProfile;