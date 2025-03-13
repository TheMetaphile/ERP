import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import { BASE_URL } from "../../Config";
import { motion } from "framer-motion";
import { FaBell, FaCalendarAlt, FaSpinner } from 'react-icons/fa';

export default function Notices() {
  const { authState, darkMode } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(3);

  function getCurrentSession() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    if (currentMonth > 3) {
      return `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
    } else {
      return `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
    }
  }

  useEffect(() => {
    const fetchNotice = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/notice/fetch/teacher?start=${start}&limit=${end}&session=${getCurrentSession()}&type=${'for'}`, {
          headers: {
            Authorization: `Bearer ${authState?.accessToken}`,
          }
        });
        setDetails(response.data.notices);
      } catch (error) {
        console.error("Error fetching notice:", error);
      }
      finally {
        setLoading(false)
      }
    };
    fetchNotice();
  }, [authState?.accessToken]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      className={`p-3 border rounded-xl shadow-lg ${darkMode
        ? 'bg-gray-800 border-gray-700 text-white'
        : 'bg-gradient-to-r from-blue-100 to-indigo-50 border-gray-200'
        }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <FaSpinner className={`animate-spin text-4xl ${darkMode ? 'text-blue-400' : 'text-indigo-600'
            }`} />
        </div>
      ) : details.length === 0 ? (
        <div className="text-center py-10">
          <FaBell className={`text-5xl mb-4 mx-auto ${darkMode ? 'text-blue-400' : 'text-indigo-600'
            }`} />
          <p className={`text-xl font-semibold ${darkMode ? 'text-blue-300' : 'text-indigo-600'
            }`}>
            No notices available
          </p>
        </div>
      ) : (
        details.map((detail, index) => (
          <motion.div
            key={index}
            className="mb-6 last:mb-0"
            variants={itemVariants}
          >
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-blue-300' : 'text-indigo-800'
              }`}>
              {detail.title}
            </h3>
            <p className={`leading-relaxed line-clamp-4 ${darkMode ? 'text-gray-300' : 'text-indigo-600 text-opacity-80'
              }`}>
              {detail.description}
            </p>
            <div className={`flex justify-end items-center text-xs mt-2 border-t ${darkMode
              ? 'border-gray-700 text-gray-400'
              : 'border-gray-400 text-indigo-600'
              }`}>
              <FaCalendarAlt className="mr-1" />
              Date: {detail.date}
            </div>
          </motion.div>
        ))
      )}
    </motion.div>
  );
}