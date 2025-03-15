import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import Loading from "../../LoadingScreen/Loading";
import { BASE_URL } from "../../Config";
import { motion } from 'framer-motion';
import { FaBell, FaCalendarAlt, FaSpinner } from 'react-icons/fa';

export default function Notice(props) {
  const { authState, darkMode } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);


  function getCurrentSession() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    if (currentMonth >= 3) {
      return `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
    } else {
      return `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
    }
  }
  const session = getCurrentSession();

  useEffect(() => {
    const fetchNotice = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/notice/fetch/admin?start=${start}&limit=${end}&session=${session}&type=${'For All'}`, {
          headers: {
            Authorization: `Bearer ${authState?.accessToken}`,
          }
        });
        setDetails(response.data.notices);
        console.log('fetch', response.data);
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
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <motion.div
      className={`p-3 border rounded-xl shadow-lg px-3 ${darkMode
        ? 'bg-gray-800 border-gray-700 text-gray-200'
        : 'bg-gradient-to-r from-blue-100 to-indigo-50 border-gray-200'
        }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <FaSpinner className={`animate-spin text-4xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        </div>
      ) : details.length === 0 ? (
        <div className={`text-center py-10 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
          <FaBell className="text-5xl mb-4 mx-auto" />
          <p className="text-xl font-semibold">No notices available</p>
        </div>
      ) : (
        details.map((detail, index) => (
          <motion.div
            key={index}
            className="mb-6 last:mb-0"
            variants={itemVariants}
          >
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
              {detail.title}
            </h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-blue-600 text-opacity-80'} leading-relaxed line-clamp-4`}>
              {detail.description}
            </p>
            <div className={`flex justify-end items-center border-t text-xs mt-2 ${darkMode
              ? 'border-gray-700 text-blue-400'
              : 'border-gray-400 text-blue-600'
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
