import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import {
  FaUser, FaEnvelope, FaBirthdayCake, FaIdCard,
  FaTransgender, FaMapMarkerAlt, FaGraduationCap,
  FaTag, FaCalendarAlt, FaFlag, FaUserFriends, FaUniversity,
  FaPhone
} from 'react-icons/fa'; import { IoMdSchool } from 'react-icons/io';
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
  console.log(authState)
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

  const DetailCard = ({ icon: Icon, label, value }) => (
    <div className={`flex items-center p-4 rounded-lg shadow-md transition-all duration-300 
            ${darkMode
        ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
        : 'bg-white hover:bg-blue-50 text-gray-800'
      }`}>
      <div className={`mr-4 text-2xl ${darkMode ? 'text-blue-300' : 'text-blue-600'
        }`}>
        <Icon />
      </div>
      <div>
        <p className={`text-sm font-medium ${darkMode ? 'text-blue-300' : 'text-blue-700'
          }`}>{label}</p>
        <p className="font-semibold">{value || 'N/A'}</p>
      </div>
    </div>
  );

  const ExtraFieldsSection = () => {
    if (!userDetails?.extra || userDetails.extra.length === 0) return null;

    return (
      <div className="w-full">
        <div className="grid laptop:grid-cols-3 mobile:max-tablet:grid-cols-1 tablet:grid-cols-2 gap-4">
          {userDetails.extra.map((field, index) => (
            <DetailCard
              key={field._id || index}
              icon={FaTag}
              label={field.label}
              value={
                typeof field.value === 'object' && field.value !== null
                  ? JSON.stringify(field.value)
                  : field.value || 'N/A'
              }
            />
          ))}
        </div>
      </div>
    );
  };

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
            <DetailCard
              icon={FaEnvelope}
              label="Email"
              value={userDetails?.email}
            />
            <DetailCard
              icon={FaBirthdayCake}
              label="Date of Birth"
              value={userDetails?.DOB}
            />
            <DetailCard
              icon={FaIdCard}
              label="Aadhar Number"
              value={userDetails?.aadhaarNumber}
            />
            <DetailCard
              icon={FaPhone}
              label="Phone Number"
              value={userDetails?.phoneNumber}
            />
            <DetailCard
              icon={FaTransgender}
              label="Gender"
              value={userDetails?.gender}
            />
            <DetailCard
              icon={FaMapMarkerAlt}
              label="Branch"
              value={userDetails?.branch}
            />
            <DetailCard
              icon={FaGraduationCap}
              label="Current Class"
              value={`${userDetails?.currentClass} ${userDetails?.section}`}
            />
            <DetailCard
              icon={FaGraduationCap}
              label="Admission Class"
              value={userDetails?.admissionClass}
            />
            <DetailCard
              icon={FaUser}
              label="Father's Name"
              value={userDetails?.fatherName}
            />
            <DetailCard
              icon={FaCalendarAlt}
              label="Admission Date"
              value={userDetails?.admissionDate}
            />
            <DetailCard
              icon={FaUserFriends}
              label="Guardian's Name"
              value={userDetails?.guardiansName}
            />
            <DetailCard
              icon={FaFlag}
              label="Nationality"
              value={userDetails?.nationality}
            />
            <DetailCard
              icon={FaTag}
              label="Category"
              value={userDetails?.category}
            />
            <DetailCard
              icon={FaUniversity}
              label="Branch"
              value={userDetails?.branch}
            />
          </motion.div>
        </div>

        {/* <div className="tablet:px-8 py-2 mobile:max-tablet:px-2">
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
        </div> */}

        <div className="tablet:px-8 py-2 mobile:max-tablet:px-2">
          <motion.h2
            className={`text-2xl font-bold mb-4 ${textClass}`}
            variants={itemVariants}
          >
            Additional Information
          </motion.h2>
          <motion.div
            className=""
            variants={containerVariants}
          >
            <ExtraFieldsSection />
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