import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChalkboardTeacher, FaBookOpen, FaCalendarAlt } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import AuthContext from '../../../Context/AuthContext';

export default function SubjectClassWorkTile({ subject, details }) {
  const { darkMode } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(null);

  const bgClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-black';
  const subTextClass = darkMode ? 'text-gray-300' : 'text-gray-700';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-300';
  const iconClass = darkMode ? 'text-indigo-400' : 'text-indigo-600';
  const subjectBgClass = darkMode ? 'bg-indigo-700' : 'bg-indigo-600';

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
          className={`mt-4 p-4 w-full rounded-lg shadow-lg border ${bgClass} ${borderClass} overflow-hidden`}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            className={`flex items-center justify-between cursor-pointer ${textClass}`}
            onClick={() => handleClick(index)}
          >
            <div className="flex items-center space-x-3">
              <FaBookOpen className={`${iconClass} text-xl`} />
              <div className="font-medium text-lg">
                Chapter: <span className="font-normal">{detail.chapter}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <motion.div
                className={`px-3 py-1 ${subjectBgClass} text-white rounded-full`}
                whileHover={{ scale: 1.1 }}
              >
                {subject}
              </motion.div>
              {expanded === index ? (
                <IoMdArrowDropup className={`text-2xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              ) : (
                <IoMdArrowDropdown className={`text-2xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              )}
            </div>
          </motion.div>

          <div className={`mt-2 flex items-center space-x-2 ${subTextClass}`}>
            <FaChalkboardTeacher className={iconClass} />
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
                className={`mt-3 ${subTextClass}`}
              >
                <h1 className="font-medium">
                  Description:{" "}
                  <span className="font-normal">{detail.description}</span>
                </h1>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div className={`mt-4 flex justify-between items-center ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className={iconClass} />
              <span>
                Classwork on{" "}
                <span className={`font-medium ${textClass}`}>{detail.date}</span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <p>By</p>
              <img
                src={detail.by.profileLink}
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
              <div className={`font-medium ${textClass}`}>{detail.by.name}</div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}