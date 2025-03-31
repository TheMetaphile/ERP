import React, { useState, useEffect, useContext, useRef } from "react";
import Loading from "../../LoadingScreen/Loading";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import { BASE_URL } from "../../Config";
import SubjectClassWorkTile from "./utils/SubjectClassworkTile";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SubjectSelection from "./utils/SubjectSelection";
import { motion } from "framer-motion";
import { FaBook, FaChevronDown } from "react-icons/fa";

export default function TodayClassWork() {
  const [selectedSubject, setSelectedSubject] = useState('Maths');
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const { authState, darkMode } = useContext(AuthContext);
  const [start, setStart] = useState(0);
  const end = 5;
  const [allDataFetched, setAllDataFetched] = useState(false);
  const sentinelRef = useRef(null);

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textClass = darkMode ? 'text-white' : 'text-gray-800';
  const subTextClass = darkMode ? 'text-gray-300' : 'text-gray-600';

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    console.log("Selected Subject:", subject);
  }

  useEffect(() => {
    setStart(0);
    setDetails([]);
    setAllDataFetched(false);
    setLoading(false);
  }, [selectedSubject]);

  useEffect(() => {
    if (start === 0 && details.length === 0 && !allDataFetched && !loading) {
      fetchClassWork();
    }
  }, [start, details, allDataFetched, loading]);

  const handleViewMore = () => {
    if (!allDataFetched && !loading) {
      setStart((prevStart) => prevStart + end);
    }
  };

  useEffect(() => {
    if (start !== 0) {
      fetchClassWork();
    }
  }, [start]);

  const fetchClassWork = async () => {
    if (loading || allDataFetched) return;

    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/classwork/fetch/student?class=${authState?.userDetails?.currentClass}&month=${new Date().getMonth() + 1}&year=${new Date().getFullYear()}&section=${authState?.userDetails?.section}&subject=${selectedSubject}&start=${start}&end=${end}`, {
        headers: {
          Authorization: `Bearer ${authState?.accessToken}`,
        }
      });
      const work = response.data.classwork.length;
      if (work < end) {
        toast.success('All data fetched');
        setAllDataFetched(true);
      }
      setDetails(prevData => [...prevData, ...response.data.classwork]);
    } catch (error) {
      console.error("Error fetching student classwork:", error);
    }
    finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !allDataFetched && !loading) {
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
      className={`flex flex-col mobile:max-tablet:mt-4 p-4 ${bgClass}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer />
      <motion.div
        className="flex justify-between items-center mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 className={`text-2xl mobile:max-tablet:text-lg mr-1 font-semibold ${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-blue-600 hover:text-blue-800'} flex items-center`}>
          <FaBook className={`mr-2 ${darkMode ? 'text-indigo-400' : 'text-blue-600'}`} />
          Classwork
        </h1>
        <SubjectSelection onSubjectSelect={handleSubjectSelect} />
      </motion.div>

      {loading ? (
        <Loading />
      ) : details.length === 0 ? (
        <motion.div
          className={`text-center w-full mt-8 ${subTextClass} text-lg`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          No classwork found
        </motion.div>
      ) : (
        <>
          <SubjectClassWorkTile
            subject={selectedSubject}
            details={details}
            darkMode={darkMode}
          />
          <div ref={sentinelRef} className="h-10">
            {loading && start > 0 && (
              <div className={`text-center w-full ${subTextClass} text-sm`}>
                Loading more...
              </div>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}