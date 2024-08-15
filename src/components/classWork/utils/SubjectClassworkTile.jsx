import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChalkboardTeacher, FaBookOpen, FaCalendarAlt } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

export default function SubjectClassWorkTile({ subject, details }) {
  const [expanded, setExpanded] = useState(null);

  const handleClick = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <motion.div
      className="w-full px-3 mobile:max-laptop:px-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {details.map((detail, index) => (
        <motion.div
          key={index}
          className="mt-4 p-4 w-full rounded-lg shadow-lg border border-gray-300 overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleClick(index)}
          >
            <div className="flex items-center space-x-3">
              <FaBookOpen className="text-indigo-600 text-xl" />
              <div className="font-medium text-lg">
                Chapter: <span className="font-normal">{detail.chapter}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <motion.div
                className="px-3 py-1 bg-indigo-600 text-white rounded-full"
                whileHover={{ scale: 1.1 }}
              >
                {subject}
              </motion.div>
              {expanded === index ? (
                <IoMdArrowDropup className="text-2xl text-gray-600" />
              ) : (
                <IoMdArrowDropdown className="text-2xl text-gray-600" />
              )}
            </div>
          </motion.div>

          <div className="mt-2 flex items-center space-x-2 text-gray-700">
            <FaChalkboardTeacher className="text-indigo-500" />
            <div className="font-medium">
              Topic: <span className="font-normal">{detail.topic}</span>
            </div>
          </div>

          <AnimatePresence>
            {expanded === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3 text-gray-700"
              >
                <h1 className="font-medium">
                  Description:{" "}
                  <span className="font-normal">{detail.description}</span>
                </h1>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div className="mt-4 flex justify-between items-center text-gray-600 text-sm">
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-indigo-500" />
              <span>
                Classwork on{" "}
                <span className="font-medium text-black">{detail.date}</span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <p>By</p>
              <img
                src={detail.by.profileLink}
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
              <div className="font-medium text-black">{detail.by.name}</div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}