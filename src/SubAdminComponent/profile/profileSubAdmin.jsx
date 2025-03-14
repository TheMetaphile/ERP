import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaBirthdayCake, FaIdCard, FaCalendarAlt, FaPhone } from 'react-icons/fa';
import AuthContext from '../../Context/AuthContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const ProfileSubAdmin = () => {
  const { authState, darkMode } = useContext(AuthContext);
  const { userDetails } = authState;

  return (
    <motion.div
      className={`min-h-screen tablet:p-8 mobile:max-tablet:p-2 p-4 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
          : 'bg-gradient-to-br from-blue-100 to-blue-100'
      }`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className={`mx-auto rounded-lg shadow-lg overflow-hidden ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`} 
        variants={itemVariants}
      >
        <div className="relative">
          <div className={`h-32 ${
            darkMode 
              ? 'bg-gradient-to-r from-blue-800 to-blue-700' 
              : 'bg-gradient-to-r from-blue-300 to-blue-300'
          }`}></div>
          <img
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 h-32 w-32 rounded-full object-cover ${
              darkMode ? 'border-4 border-gray-800' : 'border-4 border-white'
            }`}
            src={userDetails?.profileLink}
            alt={userDetails?.name}
          />
        </div>
        <div className="mt-16 p-8 text-center">
          <motion.h1 
            className={`text-3xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`} 
            variants={itemVariants}
          >
            {userDetails?.name}
          </motion.h1>
        </div>

        <div className="tablet:px-8 py-2 mobile:max-tablet:px-2 mb-3">
          <motion.h2 
            className={`text-2xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`} 
            variants={itemVariants}
          >
            Personal Information
          </motion.h2>
          <motion.div 
            className="grid laptop:grid-cols-3 mobile:max-tablet:grid-cols-1 tablet:grid-cols-2 gap-4" 
            variants={containerVariants}
          >
            <InfoItem icon={<FaEnvelope />} label="Email" value={userDetails?.email} darkMode={darkMode} />
            <InfoItem icon={<FaBirthdayCake />} label="Date of Birth" value={userDetails?.dob} darkMode={darkMode} />
            <InfoItem icon={<FaIdCard />} label="Role" value={userDetails?.rolee} darkMode={darkMode} />
            <InfoItem icon={<FaCalendarAlt />} label="Branch" value={userDetails?.branch} darkMode={darkMode} />
            <InfoItem icon={<FaPhone />} label="Phone Number" value={userDetails?.phoneNumber} darkMode={darkMode} />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const InfoItem = ({ icon, label, value, darkMode }) => (
  <motion.div
    className={`rounded-lg shadow-md p-4 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300 ${
      darkMode ? 'bg-gray-700' : 'bg-white'
    }`}
    variants={itemVariants}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full">
      <span className="text-white text-xl">{icon}</span>
    </div>
    <div className="flex-grow">
      <p className={`text-sm font-semibold ${
        darkMode ? 'text-gray-300' : 'text-gray-500'
      }`}>{label}</p>
      <p className={`text-lg font-medium truncate overflow-hidden whitespace-nowrap ${
        darkMode ? 'text-white' : 'text-gray-800'
      }`}>{value}</p>
    </div>
  </motion.div>
);

export default ProfileSubAdmin;