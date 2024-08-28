import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaGraduationCap, FaSchool, FaPhone, FaEnvelope, FaBirthdayCake, FaTint, FaRegIdCard, FaLink } from 'react-icons/fa';

function Details({ nextStep, handleChange, formData }) {
  const handleProceed = () => {
    if (!formData.name || !formData.qualification || !formData.institute || !formData.phoneNumber || !formData.emergencyContactNumber || !formData.email || !formData.dob || !formData.bloodGroup || !formData.aadhaarNumber || !formData.profileLink) {
      alert('Please fill in all fields.');
    } else {
      nextStep();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div className="w-full px-4 py-6 bg-purple-50 rounded-lg shadow-lg" variants={containerVariants} initial="hidden" animate="visible">
      <h1 className="text-3xl font-semibold mb-6 text-purple-800 mobile:max-tablet:text-xl">Add Employee</h1>
      <motion.div className="space-y-4" variants={inputVariants}>
        <div className="flex items-center space-x-2">
          <FaUser className="text-purple-600" />
          <input type="text" placeholder="Enter name" className="w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" value={formData.name} onChange={handleChange('name')} />
        </div>
        <div className="flex items-center space-x-2">
          <FaGraduationCap className="text-purple-600" />
          <input type="text" placeholder="Highest qualification" className="w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" value={formData.qualification} onChange={handleChange('qualification')} />
        </div>
        <div className="flex items-center space-x-2">
          <FaSchool className="text-purple-600" />
          <input type="text" placeholder="Name of institute" className="w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" value={formData.institute} onChange={handleChange('institute')} />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-2 flex-1">
            <FaPhone className="text-purple-600" />
            <input type="text" placeholder="Phone number" className="w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" value={formData.phoneNumber} onChange={handleChange('phoneNumber')} />
          </div>
          <div className="flex items-center space-x-2 flex-1">
            <FaPhone className="text-purple-600" />
            <input type="text" placeholder="Emergency contact" className="w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" value={formData.emergencyContactNumber} onChange={handleChange('emergencyContactNumber')} />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <FaEnvelope className="text-purple-600" />
          <input type="email" placeholder="Email" className="w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" value={formData.email} onChange={handleChange('email')} />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-2 flex-1">
            <FaBirthdayCake className="text-purple-600" />
            <input type="date" className="w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" value={formData.dob} onChange={handleChange('dob')} />
          </div>
          <div className="flex items-center space-x-2 flex-1">
            <FaTint className="text-purple-600" />
            <input type="text" placeholder="Blood Group" className="w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" value={formData.bloodGroup} onChange={handleChange('bloodGroup')} />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <FaRegIdCard className="text-purple-600" />
          <input type="text" placeholder="Aadhar Number" className="w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" value={formData.aadhaarNumber} onChange={handleChange('aadhaarNumber')} />
        </div>
        <div className="flex items-center space-x-2">
          <FaLink className="text-purple-600" />
          <input type="text" placeholder="Profile Link" className="w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" value={formData.profileLink} onChange={handleChange('profileLink')} />
        </div>
        <motion.button onClick={handleProceed} className="w-full bg-purple-600 text-white p-3 rounded-md hover:bg-purple-700 transition duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Proceed
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default Details;