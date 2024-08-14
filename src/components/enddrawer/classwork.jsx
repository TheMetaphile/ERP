import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import { BASE_URL_ClassWork } from "../../Config";
import { motion } from 'framer-motion';
import { FaBook, FaCalendarAlt, FaSpinner } from 'react-icons/fa';

export default function Classwork() {
  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(4);

  useEffect(() => {
    const fetchClassWork = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL_ClassWork}/classwork/fetch/student?class=${authState.userDetails.currentClass}&month=${new Date().getMonth() + 1}&year=${authState.userDetails.academicYear}&section=${authState.userDetails.section}&start=${start}&end=${end}`, {
          headers: {
            Authorization: `Bearer ${authState.accessToken}`,
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
  }, [authState.accessToken, authState.userDetails, start, end]);


  
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
      className="bg-gradient-to-br from-green-50 to-emerald-100  rounded-xl shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <FaSpinner className="animate-spin text-4xl text-emerald-600" />
        </div>
      ) : details.length === 0 ? (
        <div className="text-center text-emerald-600 py-10">
          <FaBook className="text-5xl mb-4 mx-auto" />
          <p className="text-xl font-semibold">No classwork available</p>
        </div>
      ) : (
        details.map((detail, index) => (
          <motion.div
            key={index}
            className=" rounded-lg shadow-md p-5 mb-6 last:mb-0 hover:shadow-xl transition-shadow duration-300"
            variants={itemVariants}
          >
            <div className="flex flex-col justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-emerald-800">
                {detail.chapter}
              </h3>
              <div className="flex items-center text-sm text-emerald-600">
                <FaCalendarAlt className="mr-2" />
                {detail.date}
              </div>
            </div>
            <p className="text-lg font-semibold text-emerald-700 mb-2">
              Topic: {detail.topic}
            </p>
            <p className="text-emerald-600 text-opacity-80 leading-relaxed">
              {detail.description}
            </p>
          </motion.div>
        ))
      )}
    </motion.div>
  );
}
