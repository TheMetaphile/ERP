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
  const {authState} = useContext(AuthContext)
  const { userDetails, subjects } = authState;


  return (
    <motion.div
      className="bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen tablet:p-8 mobile:max-tablet:p-2"
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
          <motion.p className="text-xl text-gray-600" variants={itemVariants}>
            Class {userDetails.currentClass} - Section {userDetails.section}
          </motion.p>
        </div>

        <div className="tablet:px-8 py-2 mobile:max-tablet:px-2">
          <motion.h2 className="text-2xl font-bold mb-4" variants={itemVariants}>Personal Information</motion.h2>
          <motion.div className="grid laptop:grid-cols-3 mobile:max-tablet:grid-cols-1 tablet:grid-cols-2 gap-4" variants={containerVariants}>
            <InfoItem icon={<FaEnvelope />} label="Email" value={userDetails.email} />
            <InfoItem icon={<FaBirthdayCake />} label="Date of Birth" value={userDetails.DOB} />
            <InfoItem icon={<FaIdCard />} label="Aadhaar Number" value={userDetails.aadhaarNumber} />
            <InfoItem icon={<IoMdSchool />} label="Admission Class" value={userDetails.admissionClass} />
            <InfoItem icon={<FaCalendarAlt />} label="Admission Date" value={userDetails.admissionDate} />
            <InfoItem icon={<FaGraduationCap />} label="Academic Year" value={userDetails.academicYear} />
            <InfoItem icon={<GiIndiaGate />} label="Nationality" value={userDetails.nationality} />
            <InfoItem icon={<FaTint />} label="Blood Group" value={userDetails.bloodGroup} />
            <InfoItem icon={<FaUser />} label="Category" value={userDetails.category} />
            <InfoItem icon={<FaPhone />} label="Emergency Contact" value={userDetails.emergencyContactNumber} />
            <InfoItem icon={<FaUser />} label="Gender" value={userDetails.gender} />
            <InfoItem icon={<FaIdCard />} label="Old Admission Number" value={userDetails.oldAdmissionNumber} />
            <InfoItem icon={<FaAddressCard />} label="Permanent Address" value={userDetails.permanentAddress} />
            <InfoItem icon={<FaPray />} label="Religion" value={userDetails.religion} />
            <InfoItem icon={<FaBookOpen />} label="Roll Number" value={userDetails.rollNumber} />
            <InfoItem icon={<FaCalendarAlt />} label="Session" value={userDetails.session} />
          </motion.div>
        </div>

        <div className="tablet:px-8 py-2 mobile:max-tablet:px-2">
          <motion.h2 className="text-2xl font-bold mb-4" variants={itemVariants}>Family Information</motion.h2>
          <motion.div className="grid laptop:grid-cols-3 mobile:max-tablet:grid-cols-1 tablet:grid-cols-2 gap-4" variants={containerVariants}>
            <InfoItem icon={<FaUser />} label="Father's Name" value={userDetails.fatherName} />
            <InfoItem icon={<FaEnvelope />} label="Father's Email" value={userDetails.fatherEmailId} />
            <InfoItem icon={<FaPhone />} label="Father's Phone" value={userDetails.fatherPhoneNumber} />
            <InfoItem icon={<FaBriefcase />} label="Father's Occupation" value={userDetails.fathersOccupation} />
            <InfoItem icon={<FaUser />} label="Mother's Name" value={userDetails.motherName} />
            <InfoItem icon={<FaEnvelope />} label="Mother's Email" value={userDetails.motherEmailId} />
            <InfoItem icon={<FaPhone />} label="Mother's Phone" value={userDetails.motherPhoneNumber} />
            <InfoItem icon={<FaBriefcase />} label="Mother's Occupation" value={userDetails.motherOccupation} />
            <InfoItem icon={<FaUser />} label="Guardian's Name" value={userDetails.guardiansName} />
            <InfoItem icon={<FaBriefcase />} label="Guardian's Occupation" value={userDetails.guardiansOccupation} />
            <InfoItem icon={<FaPhone />} label="Guardian's Phone" value={userDetails.guardiansPhoneNumber} />
          </motion.div>
        </div>

        <div className="px-8 py-6">
          <motion.h2 className="text-2xl font-bold mb-4" variants={itemVariants}>Subjects</motion.h2>
          <motion.div className="flex flex-wrap gap-2" variants={containerVariants}>
            {subjects.map((subject, index) => (
              <motion.span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold"
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

export default UserProfile;