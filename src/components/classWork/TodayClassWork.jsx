import React, { useState, useEffect, useContext, useRef } from "react";
import Loading from "../../LoadingScreen/Loading";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import { BASE_URL_ClassWork } from "../../Config";
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
  const { authState } = useContext(AuthContext);
  const [start, setStart] = useState(0);
  const end = 5;
  const [allDataFetched, setAllDataFetched] = useState(false);
  const sentinelRef = useRef(null);

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
    console.log(authState.userDetails.currentClass, new Date().getMonth() + 1, authState.userDetails.academicYear, authState.userDetails.section, selectedSubject)
    if (loading || allDataFetched) return;

    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL_ClassWork}/classwork/fetch/student?class=${authState.userDetails.currentClass}&month=${new Date().getMonth() + 1}&year=${authState.userDetails.academicYear}&section=${authState.userDetails.section}&subject=${selectedSubject}&start=${start}&end=${end}`, {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`,
        }
      });
      const work = response.data.classwork.length;
      console.log("API response:", response.data.classwork);
      if (work < end) {
        toast.success('All data fetched');
        console.log('All data fetched')
        setAllDataFetched(true);
      }
      setDetails(prevData => [...prevData, ...response.data.classwork]);
      console.log('fetch', response.data)
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
      className="flex flex-col mobile:max-tablet:mt-4 p-4 bg-gray-50"
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
        <h1 className="text-2xl mobile:max-tablet:text-lg mr-1 font-semibold text-gray-800 flex items-center">
          <FaBook className="mr-2 text-indigo-600" />
          Classwork
        </h1>
        <SubjectSelection onSubjectSelect={handleSubjectSelect} />
      </motion.div>

      {loading ? (
        <Loading />
      ) : details.length === 0 ? (
        <motion.div
          className="text-center w-full mt-8 text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          No classwork found
        </motion.div>
      ) : (
        <>
          <SubjectClassWorkTile subject={selectedSubject} details={details} />
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