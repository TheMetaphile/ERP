import React from "react";
import { Link } from "react-router-dom";
import Notices from './Notices.jsx';
import Leave from "./leave.jsx";
import { motion } from "framer-motion";
import { FaClipboardList, FaCalendarAlt, FaChevronRight } from "react-icons/fa";

export default function TeacherEnddrawer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="overflow-y-auto w-full h-full px-2 py-6 rounded-lg border mobile:max-tablet:border-t-0 border-gray-300 z-10 mobile:max-laptop:mt-0  shadow-lg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <h6 className="flex justify-between items-center text-lg font-semibold mb-4">
          <span className="flex items-center">
            <FaClipboardList className="mr-2 text-blue-500" />
            Notices
          </span>
          <Link to={'/Teacher-Dashboard/noticeboard/teacher'} className="text-blue-500 hover:text-blue-600 transition-colors duration-200 flex items-center">
            <span className="text-sm">See All</span>
            <FaChevronRight className="ml-1" />
          </Link>
        </h6>
      </motion.div>
      <motion.div 
        className=" w-full  rounded-xl  mb-6 overflow-auto h-1/2"
        variants={itemVariants}
      >
        <Notices />
      </motion.div>

      <motion.div variants={itemVariants}>
        <h6 className="flex justify-between items-center text-lg font-semibold mb-4">
          <span className="flex items-center">
            <FaCalendarAlt className="mr-2 text-green-500" />
            Your Leaves
          </span>
          <Link to={'/Teacher-Dashboard/takeleave'} className="text-blue-500 hover:text-blue-600 transition-colors duration-200 flex items-center">
            <span className="text-sm">See All</span>
            <FaChevronRight className="ml-1" />
          </Link>
        </h6>
      </motion.div>
      <motion.div 
        className="dialyNotices w-full  rounded-xl  overflow-auto "
        variants={itemVariants}
      >
        <Leave />
      </motion.div>
    </motion.div>
  );
}