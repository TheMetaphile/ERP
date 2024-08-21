import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronUp, FaChevronDown, FaUserGraduate, FaQuestionCircle, FaPen } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL_AskDoubt } from '../../../Config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DoubtCard = ({ doubt, index, expanded, handleClick, answers, handleAnswerChange, handleStatusUpdate, loading }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border border-blue-200 p-4 rounded-lg shadow-lg mt-4 bg-white"
    >
      <div className="flex items-center justify-between cursor-pointer" onClick={() => handleClick(index)}>
        <div className="flex items-center space-x-4">
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={doubt.student[0].profileLink}
            alt=""
            className="w-12 h-12 rounded-full border-2 border-blue-300"
          />
          <div>
            <h3 className="font-semibold text-blue-800">{doubt.student[0].name}</h3>
            <div className="flex items-center text-sm text-blue-600">
              <FaUserGraduate className="mr-1" />
              <span>Roll: {doubt.student[0].rollNumber}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-blue-600 font-medium">{doubt.subject}</span>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-100 p-2 rounded-full"
          >
            {expanded === index ? <FaChevronUp className="text-blue-600" /> : <FaChevronDown className="text-blue-600" />}
          </motion.div>
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
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 flex items-center mb-2">
                <FaQuestionCircle className="mr-2 text-blue-600" />
                Question:
              </h4>
              <p className="text-blue-700 mb-4">{doubt.question}</p>
              {doubt.imageUrl && (
                <img src={doubt.imageUrl} alt="Doubt" className="mt-2 max-w-xs rounded-lg shadow-md" />
              )}
            </div>
            <div className="mt-4">
              <h4 className="font-medium text-blue-800 flex items-center mb-2">
                <FaPen className="mr-2 text-blue-600" />
                Your Answer:
              </h4>
              <textarea
                className="w-full px-3 py-2 mb-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your answer here..."
                rows={3}
                value={answers[index] || ''}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-full p-2 bg-blue-600 text-white rounded-lg shadow-md"
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
  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [pendingDoubts, setPendingDoubts] = useState([]);

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
      const response = await axios.put(`${BASE_URL_AskDoubt}/doubts/update/teacher?id=${id}`, {
        class: Class,
        solution: answers[index],
        replyDate: new Date().toISOString().split('T')[0]
      }, {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`
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
        <h2 className="text-2xl font-bold text-blue-600">Pending Doubts</h2>
        <div className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md">
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
        />
      ))}
    </motion.div>
  );
}