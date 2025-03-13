import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaBirthdayCake, FaIdCard, FaGraduationCap, FaCalendarAlt, FaTint } from 'react-icons/fa';
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

const TeacherDashboardProfile = () => {
  const { authState, darkMode } = useContext(AuthContext)
  const { userDetails, ClassDetails } = authState;

  return (
    <motion.div
      className={`min-h-screen tablet:p-8 mobile:max-tablet:p-2 p-4 ${darkMode
        ? 'bg-gradient-to-br from-gray-900 to-gray-800'
        : 'bg-gradient-to-br from-blue-100 to-blue-100'
        }`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className={`mx-auto rounded-lg shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        variants={itemVariants}
      >
        <div className="relative">
          <div className={`h-32 ${darkMode
            ? 'bg-gradient-to-r from-blue-900 to-blue-800'
            : 'bg-gradient-to-r from-blue-300 to-blue-300'
            }`}></div>
          <img
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 h-32 w-32 rounded-full border-4 object-cover"
            src={userDetails?.profileLink}
            alt={userDetails?.name}
            style={{
              borderColor: darkMode ? '#1E40AF' : 'white'
            }}
          />
        </div>
        <div className="mt-16 p-8 mobile:max-tablet:p-4 text-center">
          <motion.h1
            className={`text-3xl mobile:max-tablet:text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'
              }`}
            variants={itemVariants}
          >
            {userDetails?.name}
          </motion.h1>
        </div>

        <div className="tablet:px-8 py-2 mobile:max-tablet:px-2 mb-3">
          <motion.h2
            className={`text-2xl mobile:max-tablet:text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'
              }`}
            variants={itemVariants}
          >
            Personal Information
          </motion.h2>
          <motion.div
            className="grid laptop:grid-cols-3 mobile:max-tablet:grid-cols-1 tablet:grid-cols-2 gap-4"
            variants={containerVariants}
          >
            {[
              { icon: <FaEnvelope />, label: "Email", value: userDetails?.email },
              { icon: <FaEnvelope />, label: "Employee Id", value: userDetails?.employeeId },
              { icon: <FaEnvelope />, label: "Education", value: userDetails?.education },
              ClassDetails?.class && ClassDetails?.section
                ? {
                  icon: <FaEnvelope />,
                  label: "Class Teacher",
                  value: `${ClassDetails?.class} ${ClassDetails?.section}`
                }
                : null,
              userDetails?.co_ordinator
                ? {
                  icon: <FaEnvelope />,
                  label: "Co-Ordinator Wing",
                  value: userDetails?.co_ordinator_wing
                }
                : null,
              { icon: <FaBirthdayCake />, label: "Date of Birth", value: userDetails?.DOB },
              { icon: <FaIdCard />, label: "Gender", value: userDetails?.gender },
              { icon: <FaTint />, label: "Aadhaar Number", value: userDetails?.aadhaarNumber },
              { icon: <IoMdSchool />, label: "Religion", value: userDetails?.religion },
              { icon: <FaGraduationCap />, label: "Experience", value: userDetails?.experience },
              { icon: <GiIndiaGate />, label: "Permanent Address", value: userDetails?.permanentAddress },
            ].filter(Boolean).map((item, index) => (
              <InfoItem
                key={index}
                icon={item.icon}
                label={item.label}
                value={item.value}
                darkMode={darkMode}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const InfoItem = ({ icon, label, value, darkMode }) => (
  <motion.div
    className={`rounded-lg shadow-md p-4 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'
      }`}
    variants={itemVariants}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className={`p-3 rounded-full ${darkMode
      ? 'bg-gradient-to-r from-blue-800 to-blue-700'
      : 'bg-gradient-to-r from-blue-400 to-blue-500'
      }`}>
      <span className="text-white text-xl">{icon}</span>
    </div>
    <div className="flex-grow">
      <p className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-500'
        }`}>{label}</p>
      <p className={`text-lg font-medium truncate overflow-hidden whitespace-nowrap ${darkMode ? 'text-white' : 'text-gray-800'
        }`}>{value}</p>
    </div>
  </motion.div>
);

export default TeacherDashboardProfile;