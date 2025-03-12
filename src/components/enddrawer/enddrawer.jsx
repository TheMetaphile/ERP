import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { FaBell, FaBook, FaChevronRight } from 'react-icons/fa';
import Notice from './notice';
import Classwork from "./classwork";
import { useContext } from 'react';
import AuthContext from '../../Context/AuthContext';

export default function Enddrawer() {
  const { darkMode } = useContext(AuthContext);

  // Dark mode classes
  const bgClass = darkMode ? 'bg-gray-900' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-gray-800';
  const iconClass = darkMode 
    ? { bell: 'text-blue-400', book: 'text-green-400' }
    : { bell: 'text-blue-500', book: 'text-green-500' };
  const linkClass = darkMode 
    ? 'text-blue-400 hover:text-blue-300' 
    : 'text-blue-600 hover:text-blue-800';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      className={`h-full overflow-auto px-2 py-8 ${bgClass}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className={`flex justify-between items-center text-xl font-bold mb-2 ${textClass}`}>
        <div className="flex items-center text-lg whitespace-nowrap">
          <FaBell className={`mr-2 ${iconClass.bell}`} />
          Daily Notice
        </div>
        <Link 
          to="/Student-Dashboard/notification/allnotification" 
          className={`${linkClass} text-sm flex items-center`}
        >
          See All
          <FaChevronRight className="ml-1" />
        </Link>
      </h2>
      <motion.section className="mb-6 h-1/2" variants={itemVariants}>
        <motion.div
          className={`
            ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} 
            rounded-lg shadow-md h-full overflow-y-auto 
            hover:shadow-xl transition-shadow duration-300
          `}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Notice darkMode={darkMode} />
        </motion.div>
      </motion.section>

      <motion.section variants={itemVariants}>
        <h2 className={`flex justify-between items-center text-xl font-bold mb-3 ${textClass}`}>
          <div className="flex items-center">
            <FaBook className={`mr-2 ${iconClass.book}`} />
            Classwork
          </div>
          <Link 
            to="/Student-Dashboard/classwork" 
            className={`${linkClass} text-sm flex items-center`}
          >
            See All
            <FaChevronRight className="ml-1" />
          </Link>
        </h2>
        <motion.div
          className={`
            ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} 
            rounded-lg shadow-md 
            hover:shadow-xl transition-shadow duration-300
          `}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Classwork darkMode={darkMode} />
        </motion.div>
      </motion.section>
    </motion.div>
  );
}