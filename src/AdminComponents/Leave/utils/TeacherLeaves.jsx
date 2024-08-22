import React, { useState, useEffect, useContext } from "react";
import { userimg } from "../../Teachers/utils/images/index.js";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext.jsx";
import Loading from "../../../LoadingScreen/Loading.jsx";
import { BASE_URL_TeacherLeave } from "../../../Config.js";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TeacherLeavesTile from "./TeacherLeavesTile.jsx";
import { motion } from "framer-motion";

export default function TeacherLeaves() {
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { authState } = useContext(AuthContext);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(4);
  const [allDataFetched, setAllDataFetched] = useState(false);

  useEffect(() => {
    if (authState.accessToken) {
      setLoading(true);
      fetchTeacherData();
    } else {
      setError('No access token available');
      setLoading(false);
    }
  }, [authState.accessToken]);

  const handleViewMore = () => {
    setStart(prevStart => prevStart + end);
  };

  useEffect(() => {
    if (start !== 0) {
      fetchTeacherData();
    }
  }, [start]);

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

  const fetchTeacherData = async () => {
    const session = getCurrentSession();

    try {
      const response = await axios.get(`${BASE_URL_TeacherLeave}/teacherleave/fetch/admin?start=${start}&end=${end}&session=${session}`, {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`
        }
      }
      );

      const leave = response.data.Leaves.length;
      console.log("API response:", response.data.Leaves);
      if (leave < end) {
        toast.success('All data fetched');
        console.log('All data fetched')
        setAllDataFetched(true);
      }
      setData(prevData => [...prevData, ...response.data.Leaves]);
      setLoading(false);

    } catch (err) {
      setError(err.message);
    }
  };

  const handleAction = async (actionType) => {
    const id = selectedLeave._id;
    const session = getCurrentSession();
    try {
      const response = await axios.put(
        `${BASE_URL_TeacherLeave}/leave/update?leaveId=${id}&session=${session}`,
        { status: actionType },
        {
          headers: {
            Authorization: `Bearer ${authState.accessToken}`
          }
        }
      );

      if (response.status === 200) {
        const updatedLeaves = data.map((leave) =>
          leave._id === id ? { ...leave, status: actionType } : leave
        );
        setData(updatedLeaves);
        setSelectedLeave(null);
        toast.success(`Leave ${actionType === 'Approved' ? 'approved' : 'rejected'}`);
        console.log(`Leave ${actionType === 'Approved' ? 'approved' : 'rejected'}`);
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (err) {
      console.error('Error updating leave:', err.message);
    }
  };




  return (
    <motion.div
      className="flex flex-col space-y-4 mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : data === null ? (
        <div className="text-purple-500 font-bold text-2xl">No data available</div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TeacherLeavesTile data={data} />
          </motion.div>
          {!allDataFetched && (
            <motion.h1
              className="text-purple-500 hover:text-purple-800 mt-3 cursor-pointer text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              onClick={handleViewMore}
            >
              View More
            </motion.h1>
          )}
        </>
      )}
    </motion.div>
  );
}