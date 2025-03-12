import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaBirthdayCake, FaIdCard, FaGraduationCap, FaCalendarAlt, FaBookOpen, FaAddressCard, FaPhone, FaBriefcase, FaFlag, FaPray, FaTint } from 'react-icons/fa';
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

const UserProfile = () => {
  const { authState, darkMode } = useContext(AuthContext);
  const userDetails = authState?.userDetails || {}; // If authState is null, userDetails remains undefined
  const subjects = authState?.subjects || [];

  const bgClass = darkMode
    ? 'bg-gradient-to-br from-gray-900 to-gray-800'
    : 'bg-gradient-to-br from-blue-100 to-blue-100';
  const cardBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-gray-800';
  const subTextClass = darkMode ? 'text-gray-300' : 'text-gray-600';
  const headerBgClass = darkMode
    ? 'bg-gradient-to-r from-gray-800 to-gray-700'
    : 'bg-gradient-to-r from-blue-300 to-blue-300';
  const subjectBadgeClass = darkMode
    ? 'bg-indigo-900 text-indigo-300'
    : 'bg-blue-100 text-blue-800';

  return (
    <motion.div
      className={`min-h-screen tablet:p-8 mobile:max-tablet:p-2 ${bgClass}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className={`mx-auto rounded-lg shadow-lg overflow-hidden ${cardBgClass}`}
        variants={itemVariants}
      >
        <div className="relative">
          <div className={`h-32 ${headerBgClass}`}></div>
          <img
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 h-32 w-32 rounded-full border-4 border-white object-cover"
            src={userDetails?.profileLink}
            alt={userDetails?.name}
          />
        </div>
        <div className="mt-16 p-8 text-center">
          <motion.h1
            className={`text-3xl font-bold ${textClass}`}
            variants={itemVariants}
          >
            {userDetails?.name}
          </motion.h1>
          <motion.p
            className={`text-xl ${subTextClass}`}
            variants={itemVariants}
          >
            Class {userDetails?.currentClass} - Section {userDetails?.section}
          </motion.p>
        </div>

        <div className="tablet:px-8 py-2 mobile:max-tablet:px-2">
          <motion.h2
            className={`text-2xl font-bold mb-4 ${textClass}`}
            variants={itemVariants}
          >
            Personal Information
          </motion.h2>
          <motion.div
            className="grid laptop:grid-cols-3 mobile:max-tablet:grid-cols-1 tablet:grid-cols-2 gap-4"
            variants={containerVariants}
          >
            <InfoItem icon={<FaEnvelope />} label="Email" value={userDetails?.email} darkMode={darkMode} />
            <InfoItem icon={<FaBirthdayCake />} label="Date of Birth" value={userDetails?.DOB} darkMode={darkMode} />
            <InfoItem icon={<FaIdCard />} label="Aadhaar Number" value={userDetails?.aadhaarNumber} darkMode={darkMode} />
            <InfoItem icon={<IoMdSchool />} label="Admission Class" value={userDetails?.admissionClass} darkMode={darkMode} />
            <InfoItem icon={<FaCalendarAlt />} label="Admission Date" value={userDetails?.admissionDate} darkMode={darkMode} />
            <InfoItem icon={<FaGraduationCap />} label="Academic Year" value={userDetails?.academicYear} darkMode={darkMode} />
            <InfoItem icon={<GiIndiaGate />} label="Nationality" value={userDetails?.nationality} darkMode={darkMode} />
            <InfoItem icon={<FaTint />} label="Blood Group" value={userDetails?.bloodGroup} darkMode={darkMode} />
            <InfoItem icon={<FaUser />} label="Category" value={userDetails?.category} darkMode={darkMode} />
            <InfoItem icon={<FaPhone />} label="Emergency Contact" value={userDetails?.emergencyContactNumber} darkMode={darkMode} />
            <InfoItem icon={<FaUser />} label="Gender" value={userDetails?.gender} darkMode={darkMode} />
            <InfoItem icon={<FaIdCard />} label="Old Admission Number" value={userDetails?.oldAdmissionNumber} darkMode={darkMode} />
            <InfoItem icon={<FaAddressCard />} label="Permanent Address" value={userDetails?.permanentAddress} darkMode={darkMode} />
            <InfoItem icon={<FaPray />} label="Religion" value={userDetails?.religion} darkMode={darkMode} />
            <InfoItem icon={<FaBookOpen />} label="Roll Number" value={userDetails?.rollNumber} darkMode={darkMode} />
            <InfoItem icon={<FaCalendarAlt />} label="Session" value={userDetails?.session} darkMode={darkMode} />
          </motion.div>
        </div>

        <div className="tablet:px-8 py-2 mobile:max-tablet:px-2">
          <motion.h2
            className={`text-2xl font-bold mb-4 ${textClass}`}
            variants={itemVariants}
          >
            Family Information
          </motion.h2>
          <motion.div
            className="grid laptop:grid-cols-3 mobile:max-tablet:grid-cols-1 tablet:grid-cols-2 gap-4"
            variants={containerVariants}
          >
            <InfoItem icon={<FaUser />} label="Father's Name" value={userDetails?.fatherName} darkMode={darkMode} />
            <InfoItem icon={<FaEnvelope />} label="Father's Email" value={userDetails?.fatherEmailId} darkMode={darkMode} />
            <InfoItem icon={<FaPhone />} label="Father's Phone" value={userDetails?.fatherPhoneNumber} darkMode={darkMode} />
            <InfoItem icon={<FaBriefcase />} label="Father's Occupation" value={userDetails?.fathersOccupation} darkMode={darkMode} />
            <InfoItem icon={<FaUser />} label="Mother's Name" value={userDetails?.motherName} darkMode={darkMode} />
            <InfoItem icon={<FaEnvelope />} label="Mother's Email" value={userDetails?.motherEmailId} darkMode={darkMode} />
            <InfoItem icon={<FaPhone />} label="Mother's Phone" value={userDetails?.motherPhoneNumber} darkMode={darkMode} />
            <InfoItem icon={<FaBriefcase />} label="Mother's Occupation" value={userDetails?.motherOccupation} darkMode={darkMode} />
            <InfoItem icon={<FaUser />} label="Guardian's Name" value={userDetails?.guardiansName} darkMode={darkMode} />
            <InfoItem icon={<FaBriefcase />} label="Guardian's Occupation" value={userDetails?.guardiansOccupation} darkMode={darkMode} />
            <InfoItem icon={<FaPhone />} label="Guardian's Phone" value={userDetails?.guardiansPhoneNumber} darkMode={darkMode} />
          </motion.div>
        </div>

        <div className="px-8 py-6">
          <motion.h2
            className={`text-2xl font-bold mb-4 ${textClass}`}
            variants={itemVariants}
          >
            Subjects
          </motion.h2>
          <motion.div
            className="flex flex-wrap gap-2"
            variants={containerVariants}
          >
            {subjects.map((subject, index) => (
              <motion.span
                key={index}
                className={`${subjectBadgeClass} px-3 py-1 rounded-full text-sm font-semibold`}
                variants={itemVariants}
              >
                {subject}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const InfoItem = ({ icon, label, value, darkMode }) => {
  const bgClass = darkMode ? 'bg-gray-700' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-gray-800';
  const subTextClass = darkMode ? 'text-gray-300' : 'text-gray-500';
  const iconBgClass = darkMode
    ? 'bg-gradient-to-r from-indigo-700 to-indigo-600'
    : 'bg-gradient-to-r from-blue-400 to-blue-500';

  return (
    <motion.div
      className={`
        ${bgClass} rounded-lg shadow-md p-4 
        flex items-center space-x-4 
        hover:shadow-lg transition-shadow duration-300
      `}
      variants={itemVariants}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`${iconBgClass} p-3 rounded-full`}>
        <span className="text-white text-xl">{icon}</span>
      </div>
      <div className="flex-grow">
        <p className={`text-sm font-semibold ${subTextClass}`}>{label}</p>
        <p
          className={`
            text-lg font-medium ${textClass} 
             truncate overflow-hidden whitespace-nowrap
          `}
        >
          {value}
        </p>
      </div>
    </motion.div>
  );
};

export default UserProfile;