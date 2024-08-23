import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { StructureProvider } from './utils/TimetableContext';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';

function TimeTable() {
    const navigate = useNavigate();
    const [role, setRole] = useState('Student');

    const handleRoleChange = (event) => {
        const selectedRole = event.target.value;
        setRole(selectedRole);

        const routes = {
            Teacher: '/Admin-Dashboard/timetable/teacher',
            Student: '/Admin-Dashboard/timetable/student'
        };
        
        navigate(routes[selectedRole]);
    };

    return (
        <StructureProvider>
            <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col px-6 h-screen overflow-y-auto items-start mt-4 mx-4 mb-6 no-scrollbar bg-purple-50 rounded-lg shadow-lg"
    >
      <motion.div 
        className='flex justify-between items-center w-full mobile:max-tablet:flex-col mobile:max-tablet:items-baseline'
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.h1 
          className='text-3xl font-bold text-purple-800 whitespace-nowrap'
          whileHover={{ scale: 1.05 }}
        >
          Time Table
        </motion.h1>
        <motion.div 
          className="flex gap-6 px-4 py-3 mt-4 text-lg justify-between bg-white rounded-full shadow-md"
          whileHover={{ boxShadow: "0px 0px 8px rgba(0,0,0,0.2)" }}
        >
          <motion.label className={`flex items-center cursor-pointer ${role === "Teacher" ? 'text-purple-700' : 'text-gray-600'}`}>
            <input
              type="radio"
              name="role"
              value="Teacher"
              checked={role === "Teacher"}
              onChange={handleRoleChange}
              className="hidden"
            />
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <FaChalkboardTeacher className="mr-2" />
              Teacher
            </motion.div>
          </motion.label>
          <motion.label className={`flex items-center cursor-pointer ${role === "Student" ? 'text-purple-700' : 'text-gray-600'}`}>
            <input
              type="radio"
              name="role"
              value="Student"
              checked={role === "Student"}
              onChange={handleRoleChange}
              className="hidden"
            />
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <FaUserGraduate className="mr-2" />
              Student
            </motion.div>
          </motion.label>
        </motion.div>
      </motion.div>
      <Outlet />
    </motion.div>
        </StructureProvider>
    );
}

export default TimeTable;
