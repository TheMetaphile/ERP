import React, { useState, useEffect, useContext, useRef } from "react";
import Loading from "../../../LoadingScreen/Loading.jsx";
import AuthContext from "../../../Context/AuthContext.jsx";
import axios from "axios";
import { BASE_URL_Student_Leave } from "../../../Config.js";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from 'framer-motion';

export default function StudentLeaves() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const { authState } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(null);
  const [start, setStart] = useState(0);
  const end = 4;
  const [allDataFetched, setAllDataFetched] = useState(false);
  const [status, setStatus] = useState('Pending');
  const sentinelRef = useRef(null);


  const handleClick = (index) => {
    setExpanded(expanded === index ? null : index);
  }

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    setStart(0);
    setData([]);
    setAllDataFetched(false);
    setLoading(false);
  }, [status]);

  useEffect(() => {
    if (start === 0 && data.length === 0 && !allDataFetched && !loading) {
      fetchUserData();
    }
  }, [start, data, allDataFetched, loading]);

  const handleViewMore = () => {
    if (!allDataFetched && !loading) {
      setStart((prevStart) => prevStart + end);
    }
  };

  useEffect(() => {
    if (start !== 0) {
      fetchUserData();
    }
  }, [start]);

  const fetchUserData = async () => {
    if (loading || allDataFetched) return;
    setLoading(true);
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
    } catch (err) {
      setError(err);
    } finally {
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !allDataFetched && !loading) {
          console.log("Fetching more data...");
          handleViewMore();
        }
      },
      { root: null, rootMargin: '0px', threshold: 1.0 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [allDataFetched, loading]);

  return (
    <motion.div
      className="flex flex-col space-y-6 mb-6 bg-purple-50 p-2 rounded-xl shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <ToastContainer />
      <motion.div className="flex items-center justify-between w-full" variants={itemVariants}>
        <h1 className="text-2xl mobile:max-sm:text-lg font-semibold text-purple-600">Old Leave</h1>
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
          <div ref={sentinelRef} className="h-10">
            {loading && start > 0 && (
              <div className="text-center w-full text-gray-600 text-sm">Loading more...</div>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}