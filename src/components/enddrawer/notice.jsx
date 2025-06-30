import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import Loading from "../../LoadingScreen/Loading";
import { BASE_URL } from "../../Config";
import { motion } from 'framer-motion';
import { FaBell, FaCalendarAlt, FaSpinner } from 'react-icons/fa';
import { refreshAccessToken } from "../../RefreshTokenHelper";
import { toast } from "react-toastify";

export default function Notice({ darkMode }) {
  const { authState, updateAccessToken, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);

  // Dark mode classes
  const bgClass = darkMode
    ? 'bg-gradient-to-r from-gray-800 to-gray-900'
    : 'bg-gradient-to-r from-blue-100 to-indigo-50';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-200';
  const textClass = {
    title: darkMode ? 'text-indigo-300' : 'text-indigo-800',
    description: darkMode ? 'text-indigo-400' : 'text-indigo-600',
    date: darkMode ? 'text-indigo-500' : 'text-indigo-600'
  };

  useEffect(() => {
    const fetchNotice = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/notice/fetch/student?start=${start}&limit=${end}`, {
          headers: {
            Authorization: `Bearer ${authState?.accessToken}`,
          }
        });
        setDetails(response.data.notices);
      } catch (error) {
        console.error("Error fetching notice:", error);
        if (
          error.response &&
          error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
        ) {
          toast.warn('Access denied. Attempting to refresh token...');
          try {
            const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
            await fetchNotice();
          } catch (refreshError) {
          }
        } else {
          toast.error(error.response?.data?.error || "An error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotice();
  }, [authState?.accessToken, start, end]);

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
      className={`p-3 border rounded-xl shadow-lg ${bgClass} ${borderClass}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <FaSpinner
            className={`
              animate-spin text-4xl 
              ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}
            `}
          />
        </div>
      ) : details.length === 0 ? (
        <div className="text-center py-10">
          <FaBell
            className={`
              text-5xl mb-4 mx-auto 
              ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}
            `}
          />
          <p
            className={`
              text-xl font-semibold 
              ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}
            `}
          >
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
            <h3 className={`text-xl font-bold mb-2 ${textClass.title}`}>
              {detail.title}
            </h3>
            <p
              className={`
                ${textClass.description} 
                text-opacity-80 leading-relaxed 
                line-clamp-4
              `}
            >
              {detail.description}
            </p>
            <div
              className={`
                flex justify-end items-center 
                border-t ${darkMode ? 'border-gray-700' : 'border-gray-400'} 
                text-xs mt-2 
                ${textClass.date}
              `}
            >
              <FaCalendarAlt className="mr-1" />
              Date: {detail.date}
            </div>
          </motion.div>
        ))
      )}
    </motion.div>
  );
}