import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import {  FaEnvelope, FaBirthdayCake, FaIdCard, FaGraduationCap, FaCalendarAlt, FaTint } from 'react-icons/fa';
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

const ProfileSubAdmin = () => {
  const {authState} = useContext(AuthContext)
  const { userDetails } = authState;


  return (
    <motion.div
      className="bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen tablet:p-8 mobile:max-tablet:p-2 p-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className=" mx-auto bg-white rounded-lg shadow-lg overflow-hidden" variants={itemVariants}>
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-blue-300 to-purple-300"></div>
          <img 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 h-32 w-32 rounded-full border-4 border-white object-cover"
            src={userDetails.profileLink} 
            alt={userDetails.name}
          />
        </div>
        <div className="mt-16 p-8 text-center">
          <motion.h1 className="text-3xl font-bold text-gray-800" variants={itemVariants}>
            {userDetails.name}
          </motion.h1>
        </div>

        <div className="tablet:px-8 py-2 mobile:max-tablet:px-2 mb-3">
          <motion.h2 className="text-2xl font-bold mb-4" variants={itemVariants}>Personal Information</motion.h2>
          <motion.div className="grid laptop:grid-cols-3 mobile:max-tablet:grid-cols-1 tablet:grid-cols-2 gap-4" variants={containerVariants}>
            <InfoItem icon={<FaEnvelope />} label="Email" value={userDetails.email} />
            <InfoItem icon={<FaBirthdayCake />} label="Date of Birth" value={userDetails.dob} />
            <InfoItem icon={<FaIdCard />} label="Role" value={userDetails.role} />
            <InfoItem icon={<FaTint />} label="Blood Group" value={userDetails.bloodGroup} />
            <InfoItem icon={<IoMdSchool />} label="Department" value={userDetails.department} />
            <InfoItem icon={<FaGraduationCap />} label="Qualification" value={userDetails.qualification} />
            <InfoItem icon={<FaCalendarAlt />} label="Institute" value={userDetails.institute} />
            <InfoItem icon={<GiIndiaGate />} label="Permanent Address" value={userDetails.permanentAddress} />
           
          </motion.div>
        </div>


      </motion.div>
    </motion.div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <motion.div 
    className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300"
    variants={itemVariants}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-3 rounded-full">
      <span className="text-white text-xl">{icon}</span>
    </div>
    <div className="flex-grow">
      <p className="text-sm font-semibold text-gray-500">{label}</p>
      <p className="text-lg font-medium text-gray-800 w-32 truncate overflow-hidden whitespace-nowrap">{value}</p>
    </div>
  </motion.div>
);

export default ProfileSubAdmin;