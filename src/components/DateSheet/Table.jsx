import React, { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaBook, FaClock, FaSpinner, FaSignature } from 'react-icons/fa';
import AuthContext from "../../Context/AuthContext";
import signature from './../../assets/signature.jpg';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_Exam } from "../../Config";

export default function Table() {
  const { authState } = useContext(AuthContext);
  const [exams, setExams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDateSheet = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL_Exam}/fetchDateSheet`, {
        accessToken: authState.accessToken,
        class: authState.userDetails.currentClass
      });
      if (response.data && response.data.dateSheet) {
        const schedules = response.data.dateSheet.flatMap(sheet => sheet.schedule);
        setExams(schedules);
        console.log(schedules);
      } else {
        toast.error('Unexpected response format');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'An error occurred';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (authState.accessToken && authState.userDetails.currentClass) {
      fetchDateSheet();
    } else {
      toast.error('No access token available');
      setIsLoading(false);
    }
  }, [authState.accessToken, authState.userDetails.currentClass]);

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 1, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="mt-2 bg-white rounded-lg shadow-lg">
      <ToastContainer />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={tableVariants}
        className="overflow-x-auto m"
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-blue-500" />
          </div>
        ) : (
          <table className="w-full bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-blue-300 to-purple-200 text-black">
                <th className="py-3 px-6 text-left"><FaCalendarAlt className="inline mr-2" />Date</th>
                <th className="py-3 px-6 text-left"><FaBook className="inline mr-2" />Subject</th>
                <th className="py-3 px-6 text-left"><FaClock className="inline mr-2" />Time</th>
                <th className="py-3 px-6 text-left"><FaClock className="inline mr-2" />Duration</th>

              </tr>
            </thead>
            <AnimatePresence>
              <motion.tbody>
                {exams.map((exam, index) => (
                  <motion.tr
                    key={index}
                    variants={rowVariants}
                    className={`${'bg-gray-50' } text-black`}
                    whileHover={{ scale: 1.02, backgroundColor: "#f0f9ff" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <td className="py-4 px-6 border-b">{exam.date}</td>
                    <td className="py-4 px-6 border-b font-medium">{exam.subject}</td>
                    <td className="py-4 px-6 border-b">{exam.time}</td>
                    <td className="py-4 px-6 border-b">{exam.duration}</td>

                  </motion.tr>
                ))}
              </motion.tbody>
            </AnimatePresence>
          </table>
        )}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="py-3 flex justify-end items-center pr-4"
      >
        <img src={signature} alt="Principal's Signature" className="h-16 mr-4" />
        <div>
          <FaSignature className="text-blue-500 mb-1" />
          <span className="text-sm font-bold">Principal</span>
        </div>
      </motion.div>
    </div>
  )
}