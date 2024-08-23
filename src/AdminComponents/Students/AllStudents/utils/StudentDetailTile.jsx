import React from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

export default function StudentDetailTile({ userData }) {
  const rowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const cellVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <>
      {userData.map((user, index) => (
        <motion.tr
          key={index}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          className="border-b border-gray-200 hover:bg-purple-50 transition-colors  text-left  duration-300"
        >
          <motion.td variants={cellVariants} className="py-3 px-6 whitespace-nowrap">
            <div className="flex items-center">
              <span className="font-medium">{user.rollNumber}</span>
            </div>
          </motion.td>
          <motion.td variants={cellVariants} className="py-3 px-6 ">
            <div className="flex items-center">
              <img src={user.profileLink} alt="" className="h-8 w-8 rounded-full object-cover mr-2" />
              <span>{user.name}</span>
            </div>
          </motion.td>
          <motion.td variants={cellVariants} className="py-3 px-6 ">
            <span>{user.currentClass}</span>
          </motion.td>
          <motion.td variants={cellVariants} className="py-3 px-6 text-center">
            <span>{user.section}</span>
          </motion.td>
          <motion.td variants={cellVariants} className="py-3  text-center">
            <span>{user.fatherPhoneNumber}</span>
          </motion.td>
          <motion.td variants={cellVariants} className="py-3 px-6 ">
            <span className="truncate">{user.email}</span>
          </motion.td>
          <motion.td variants={cellVariants} className="py-3 px-6 text-center">
            <Link
              to={{
                pathname: `/Admin-Dashboard/Students/studentdetails`,
                search: `?email=${user.email}&name=${user.name}&rollNumber=${user.rollNumber}&classs=${user.currentClass}`,
              }}
              className="text-purple-600 hover:text-purple-900"
            >
              View Details
            </Link>
          </motion.td>
        </motion.tr>
      ))}
    </>
  );
}