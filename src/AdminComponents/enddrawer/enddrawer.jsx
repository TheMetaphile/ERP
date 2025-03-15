import React, { useContext } from 'react';
import Activities from './activity.jsx';
import Ballroom from "./../../assets/BallroomDance.png";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { FaBell, FaChevronRight } from 'react-icons/fa';
import Notice from './notice.jsx';
import AuthContext from '../../Context/AuthContext.jsx';

export default function AdminEnddrawer() {
  const { authState, darkMode } = useContext(AuthContext);

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
      className={`h-full overflow-auto px-2 py-1 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className={`flex justify-between items-center text-xl font-bold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        <div className="flex items-center text-lg whitespace-nowrap">
          <FaBell className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
          Daily Notice
        </div>
        <Link
          to="/Admin-Dashboard/Notice"
          className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} text-sm flex items-center`}
        >
          See All
          <FaChevronRight className="ml-1" />
        </Link>
      </h2>
      <motion.section className="mb-6 h-1/2" variants={itemVariants}>
        <motion.div
          className="h-full overflow-y-auto hover:shadow-xl transition-shadow duration-300"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Notice />
        </motion.div>
      </motion.section>
      <motion.section className="mb-6 h-1/2" variants={itemVariants}>
        {[1, 2, 3, 4].map((item, index) => (
          <Activities
            key={index}
            image={Ballroom}
            title="Rhyme Time: A Night of Poetry"
            time="24 Jan 21, 09:00 AM"
            description="April is also a National Poetry Month. Now there is a great theme for a fun family night!"
          />
        ))}
      </motion.section>
    </motion.div>
  );
}
