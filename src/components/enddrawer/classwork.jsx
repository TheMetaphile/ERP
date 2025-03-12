import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import { BASE_URL } from "../../Config";
import { motion } from 'framer-motion';
import { FaBook, FaCalendarAlt, FaSpinner } from 'react-icons/fa';

export default function Classwork({ darkMode }) {
  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [start, setStart] = useState(0);
  const end = 4;

  const bgClass = darkMode
    ? 'bg-gradient-to-br from-gray-800 to-gray-900'
    : 'bg-gradient-to-br from-green-50 to-emerald-100';
  const textClass = {
    title: darkMode ? 'text-emerald-300' : 'text-emerald-800',
    date: darkMode ? 'text-emerald-400' : 'text-emerald-600',
    topic: darkMode ? 'text-emerald-400' : 'text-emerald-700',
    description: darkMode ? 'text-emerald-500' : 'text-emerald-600'
  };
  const iconClass = darkMode
    ? { spinner: 'text-emerald-400', book: 'text-emerald-400' }
    : { spinner: 'text-emerald-600', book: 'text-emerald-600' };
  const cardClass = darkMode
    ? 'bg-gray-700 hover:bg-gray-600'
    : 'bg-white hover:bg-emerald-50';

  useEffect(() => {
    const fetchClassWork = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/classwork/fetch/student?class=${authState?.userDetails?.currentClass}&month=${new Date().getMonth() + 1}&year=${new Date().getFullYear()}&section=${authState?.userDetails?.section}&start=${start}&end=${end}`, {
          headers: {
            Authorization: `Bearer ${authState?.accessToken}`,
          }
        });
        setDetails(response.data.classwork);
      } catch (error) {
        console.error("Error fetching student classwork:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClassWork();
  }, [authState?.accessToken, authState?.userDetails, start, end]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      className={`${bgClass} rounded-xl shadow-lg`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <FaSpinner
            className={`animate-spin text-4xl ${iconClass.spinner}`}
          />
        </div>
      ) : details.length === 0 ? (
        <div className="text-center py-10">
          <FaBook
            className={`text-5xl mb-4 mx-auto ${iconClass.book}`}
          />
          <p
            className={`
              text-xl font-semibold 
              ${darkMode ? 'text-emerald-300' : 'text-emerald-600'}
            `}
          >
            No classwork available
          </p>
        </div>
      ) : (
        details.map((detail, index) => (
          <motion.div
            key={index}
            className={`
              rounded-lg shadow-md p-5 mb-6 last:mb-0 
              ${cardClass} transition-all duration-300
            `}
            variants={itemVariants}
          >
            <div className="flex flex-col justify-between items-start mb-3">
              <h3 className={`text-xl font-bold ${textClass.title}`}>
                {detail.chapter}
              </h3>
              <div
                className={`
                  flex items-center text-sm 
                  ${textClass.date}
                `}
              >
                <FaCalendarAlt className="mr-2" />
                {detail.date}
              </div>
            </div>
            <p className={`text-lg font-semibold mb-2 ${textClass.topic}`}>
              Topic: {detail.topic}
            </p>
            <p
              className={`
                ${textClass.description} 
                text-opacity-80 leading-relaxed
              `}
            >
              {detail.description}
            </p>
          </motion.div>
        ))
      )}
    </motion.div>
  );
}