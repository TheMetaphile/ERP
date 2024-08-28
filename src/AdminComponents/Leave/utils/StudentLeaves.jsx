import React, { useState, useEffect, useContext } from "react";
import Loading from "../../../LoadingScreen/Loading.jsx";
import AuthContext from "../../../Context/AuthContext.jsx";
import axios from "axios";
import { BASE_URL_Student_Leave } from "../../../Config.js";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from 'framer-motion';

export default function StudentLeaves() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const { authState } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(4);
  const [allDataFetched, setAllDataFetched] = useState(false);
  const [status, setStatus] = useState('Pending');

  const handleClick = (index) => {
    setExpanded(expanded === index ? null : index);
  }

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {

    setStart(0);
    setData([]);
    setLoading(true);
    fetchUserData();

  }, [authState.accessToken, status]);

  const handleViewMore = () => {
    setStart(prevStart => prevStart + end);
  };

  useEffect(() => {
    if (start !== 0) {
      fetchUserData();
    }
  }, [start]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${BASE_URL_Student_Leave}/leave/fetch/admin?start=${start}&end=${end}&status=${status}`, {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`
        }
      }
      );

      const leave = response.data.StudentsLeaves.length;
      console.log("API response:", response.data.StudentsLeaves);
      if (leave < end) {
        toast.success('All data fetched');
        console.log('All data fetched')
        setAllDataFetched(true);
      }
      setData(prevData => [...prevData, ...response.data.StudentsLeaves]);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };


  return (
    <motion.div
      className="flex flex-col space-y-6 mb-6 bg-purple-50 p-2 rounded-xl shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <ToastContainer />
      <motion.div className="flex items-center justify-between w-full" variants={itemVariants}>
        <h1 className="text-2xl font-semibold text-purple-600">Old Leave</h1>
        <select
          value={status}
          onChange={handleStatusChange}
          className="border-2 border-purple-300 rounded-lg px-3 py-2 bg-white text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </motion.div>

      {loading ? (
        <Loading />
      ) : data.length === 0 ? (
        <motion.div variants={itemVariants} className="text-center text-purple-700">No data available</motion.div>
      ) : (
        <>
          {data.map((leave, index) => (
            <motion.div
              key={index}
              className="rounded-lg border border-purple-200 p-5 bg-white shadow-md hover:shadow-lg transition duration-300"
              variants={itemVariants}
            >
              <div className="flex justify-between cursor-pointer mobile:max-sm:flex-col" onClick={() => handleClick(`${index}`)}>
                <div className="flex items-center space-x-3">
                  <img src={leave.profileLink} alt="" className="h-10 w-10 rounded-full object-cover" />
                  <p className="font-medium text-purple-800">{leave.name}</p>
                </div>
                <div>
                  <h1 className="text-purple-700">
                    Class: {leave.class} {leave.section}
                  </h1>
                </div>
              </div>
              <AnimatePresence>
                {expanded === `${index}` && (
                  <motion.p
                    className="mt-3 text-purple-600"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    Reason for Leave: {leave.reason}
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="flex justify-between text-purple-600 mt-3 space-x-4 mobile:max-sm:flex-col mobile:max-sm:space-x-0">
                <span>Leave Taken on: {leave.startDate}</span>
                <span>Expected Arr: {leave.endDate}</span>
              </div>
            </motion.div>
          ))}
          {!allDataFetched && (
            <motion.button
              className='text-purple-500 hover:text-purple-700 mt-4 cursor-pointer text-center font-medium'
              onClick={handleViewMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View More
            </motion.button>
          )}
        </>
      )}
    </motion.div>
  );
}