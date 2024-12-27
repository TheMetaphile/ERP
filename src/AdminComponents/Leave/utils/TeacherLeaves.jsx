import React, { useState, useEffect, useContext, useRef } from "react";
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
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { authState } = useContext(AuthContext);
  const [start, setStart] = useState(0);
  const end = 4;
  const [allDataFetched, setAllDataFetched] = useState(false);
  const sentinelRef = useRef(null);


  useEffect(() => {
    if (start === 0 && data.length === 0 && !allDataFetched && !loading) {
      fetchTeacherData();
    }
  }, [start, data, allDataFetched, loading]);

  const handleViewMore = () => {
    if (!allDataFetched && !loading) {
      setStart((prevStart) => prevStart + end);
    }
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
    if (loading || allDataFetched) return;
    setLoading(true);

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
    } catch (err) {
      setError(err.message);
    }
    finally {
      setLoading(false);
    }
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