import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronUp, FaChevronDown, FaUserGraduate, FaQuestionCircle, FaPen } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import axios from 'axios';
import AuthContext from '../../../../../Context/AuthContext';
import { BASE_URL } from '../../../../../Config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDeleteForever } from "react-icons/md";

const DoubtCard = ({ doubt, index, expanded, handleClick, answers, handleAnswerChange, handleStatusUpdate, loading, handleDelete, darkMode }) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`border p-4 rounded-lg shadow-lg mt-4 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-blue-200'}`}
    >
      <div
        className="flex mobile:max-sm:flex-col mobile:max-sm:items-start items-center justify-between cursor-pointer"
        onClick={() => handleClick(index)}
      >
        <div className="flex items-center space-x-4">
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={doubt.student[0].profileLink}
            alt=""
            className={`w-12 h-12 rounded-full border-2 ${darkMode ? 'border-gray-500' : 'border-blue-300'}`}
          />
          <h3 className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
            {doubt.student[0].name}
          </h3>
          <div>
            <div className={`flex items-center text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'} whitespace-nowrap`}>
              <FaUserGraduate className="mr-1" />
              <span>Roll: {doubt.student[0].rollNumber}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
            {doubt.subject}
          </span>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-blue-100'}`}
          >
            {expanded === index ?
              <FaChevronUp className={`${darkMode ? 'text-white' : 'text-blue-600'}`} /> :
              <FaChevronDown className={`${darkMode ? 'text-white' : 'text-blue-600'}`} />
            }
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg shadow-md flex items-center"
            onClick={() => handleDelete(index, doubt._id)}
          >
            <MdDeleteForever />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {expanded === index && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-blue-50'}`}>
              <h4 className={`font-medium flex items-center mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                <FaQuestionCircle className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                Question:
              </h4>
              <p className={`${darkMode ? 'text-gray-200' : 'text-blue-700'} mb-4`}>
                {doubt.question}
              </p>
              {doubt.imageUrl && (
                <img src={doubt.imageUrl} alt="Doubt" className="mt-2 max-w-xs rounded-lg shadow-md" />
              )}
            </div>
            <div className="mt-4">
              <h4 className={`font-medium flex items-center mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                <FaPen className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                Your Answer:
              </h4>
              <textarea
                className={`w-full px-3 py-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 
                  ${darkMode
                    ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-700'
                    : 'border-blue-300 focus:ring-blue-500'}`}
                placeholder="Type your answer here..."
                rows={3}
                value={answers[index] || ''}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center justify-center w-full p-2 rounded-lg shadow-md
                  ${darkMode
                    ? 'bg-blue-800 text-white hover:bg-blue-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                onClick={() => handleStatusUpdate(doubt._id, index)}
                disabled={loading}
              >
                <IoMdSend className="mr-2" />
                {loading ? 'Sending...' : 'Confirm Answer'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function NewDoubtTile({ data, Class }) {
  const [expanded, setExpanded] = useState(null);
  const { authState, darkMode } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [pendingDoubts, setPendingDoubts] = useState([]);

  const handleDelete = async (index, id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/doubts/delete?class=${Class}&doubtId=${id}`, {
        headers: {
          Authorization: `Bearer ${authState?.accessToken}`
        }
      });

      if (response.status === 200) {
        toast.success('Doubt Deleted Successfully');
        setPendingDoubts((prevPendingDoubts) =>
          prevPendingDoubts.filter((_, i) => i !== index)
        );
      }
    } catch (error) {
      console.error("Error deleting Doubt:", error);
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    if (data) {
      setPendingDoubts(data.filter(doubt => doubt.status === "Pending"));
    }
  }, [data]);

  const handleAnswerChange = (index, value) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [index]: value
    }));
  };

  const handleClick = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const handleStatusUpdate = async (id, index) => {
    if (!answers[index]) {
      toast.error("Please provide an answer before sending.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(`${BASE_URL}/doubts/update/teacher?id=${id}`, {
        class: Class,
        solution: answers[index],
        replyDate: new Date().toISOString().split('T')[0]
      }, {
        headers: {
          Authorization: `Bearer ${authState?.accessToken}`
        }
      });
      if (response.status === 200) {
        toast.success('Answered Successfully');
        // Update the local state to remove the answered doubt
        setPendingDoubts(prevDoubts => prevDoubts.filter(doubt => doubt._id !== id));
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error(error.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full mx-auto"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between mb-6"
      >
        <h2 className={`text-2xl mobile:max-tablet:text-sm font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
          Pending Doubts
        </h2>
        <div className={`flex items-center mobile:max-tablet:p-2 mobile:max-tablet:text-xs text-white px-4 py-2 rounded-lg shadow-md ${darkMode ? 'bg-blue-800' : 'bg-blue-600'}`}>
          <FaQuestionCircle className="mr-2" />
          <span>{pendingDoubts.length} Pending</span>
        </div>
      </motion.div>

      {pendingDoubts.map((doubt, index) => (
        <DoubtCard
          key={doubt._id}
          doubt={doubt}
          index={index}
          expanded={expanded}
          handleClick={handleClick}
          answers={answers}
          handleAnswerChange={handleAnswerChange}
          handleStatusUpdate={handleStatusUpdate}
          loading={loading}
          handleDelete={handleDelete}
          darkMode={darkMode}
        />
      ))}
    </motion.div>
  );
}