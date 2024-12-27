import React, { useState, useEffect, useContext, useRef } from 'react'
import Selection from './utils/Selection';
import Header from './utils/performance/Header';
import { Link } from "react-router-dom";
import axios from 'axios';
import Loading from '../../../../LoadingScreen/Loading';
import AuthContext from '../../../../Context/AuthContext';
import { BASE_URL_Login } from '../../../../Config';
import { ToastContainer, toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

function ReportCardHOD() {
  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  // State to control the dropdown visibility
  const [Class, setClass] = useState(localStorage.getItem('Class') || '');
  const [Section, setSection] = useState(localStorage.getItem('Section') || '');
  const [selectedSession, setSelectedSession] = useState(localStorage.getItem('selectedSession') || '');
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(20);
  const [allDataFetched, setAllDataFetched] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('Class', Class);
    localStorage.setItem('Section', Section);
    localStorage.setItem('selectedSession', selectedSession);
  }, [Class, Section, selectedSession]);

  const handleClassChange = (event) => {
    setClass(event.target.value);
  };

  const handleSectionChange = (event) => {
    setSection(event.target.value);
  };

  const handleSessionChange = (session) => {
    setSelectedSession(session);
  };

      useEffect(() => {
          setStart(0);
          setUserData([]);
          setLoading(false);
          setAllDataFetched(false);
      }, [Class, Section]);
  
      const handleViewMore = () => {
          if (!allDataFetched && !loading) {
              setStart((prevStart) => prevStart + end);
          }
      };
  
      useEffect(() => {
          if (start !== 0) {
            fetchStudents();
          }
      }, [start]);
  
      useEffect(() => {
          if (start === 0 && userData.length === 0 && !allDataFetched && !loading) {
            fetchStudents();
          }
      }, [start, userData, allDataFetched, loading]);


  console.log('ll', Class, Section, selectedSession)


  const fetchStudents = async () => {
    if (loading || allDataFetched) return;
    
    setLoading(true);
    try {
      console.log(start, "-", end);
      const response = await axios.post(`${BASE_URL_Login}/fetchMultiple/student`, {
        accessToken: authState.accessToken,
        currentClass: Class,
        section: Section,
        end: end,
        start: start
      });
      console.log("API response:", response.data, response.data.Students.length);

      if (response.data.Students) {
        // const users = response.data.Students.map(user => ({
        //     ...user,
        //     profileLogo: user.profileLink || profilelogo,
        // }));

        const list = response.data.Students.length;
        if (list < end) {
          toast.success('All data fetched');
          console.log('All data fetched')
          setAllDataFetched(true);
        }
        setUserData(prevUsers => [...prevUsers, ...response.data.Students]);


      } else {
        setError('Unexpected response format');
        setTimeout(() => {
          setError('');
        }, 2000);
      }

      setLoading(false);
    } catch (err) {
      setError(err.message);
      console.log(err);
      setTimeout(() => {
        setError('');
      }, 2000);
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.4,
        ease: "easeOut"
      }
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
      className="w-full min-h-screen p-4 mobile:max-tablet:px-2"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <ToastContainer />

      <motion.div
        className="flex justify-between items-center  mb-6 mobile:max-tablet:mb-3"
        variants={itemVariants}
      >
        <h1 className="text-3xl font-medium text-black mobile:max-tablet:text-lg">Report Card</h1>
        <div className="hidden laptop:flex items-center space-x-4">
          <Selection
            Class={Class}
            Section={Section}
            Session={selectedSession}
            handleClassChange={handleClassChange}
            handleSectionChange={handleSectionChange}
            handleSessionChange={handleSessionChange}
          />
        </div>
      </motion.div>

      <motion.div
        className="bg-white rounded-lg shadow-lg  overflow-auto"
        variants={itemVariants}
      >
        {loading && userData.length === 0 ? (
          <Loading />
        ) : userData.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No student found</div>
        ) : (
          <motion.table
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className='w-full border text-center'
          >
            <Header headings={['Name', 'Class', 'Section', 'Email']} />
            <AnimatePresence>
              <motion.tbody
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="divide-y divide-blue-200"
              >
                {userData.map((detail) => (
                  <motion.tr
                    key={detail.email}
                    variants={itemVariants}
                  // whileHover={{ scale: 1.01, backgroundColor: "#F3E8FF" }}
                  // transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <td className="py-4 px-6 ">
                      <Link to={`/Teacher-Dashboard/HOD/studentResult/${detail.email}?session=${selectedSession}&Class=${Class}`}>
                        <motion.div
                          className="flex items-center justify-start space-x-2"
                          whileHover={{ x: 5 }}
                        >

                          <motion.img
                            src={detail.profileLink}
                            alt=""
                            className="w-8 h-8 rounded-full hidden tablet:block"
                            whileHover={{ scale: 1.2 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          />
                          <div className="truncate max-w-xs">{detail.name}</div>


                        </motion.div>
                      </Link>
                    </td>
                    <td className="py-4 px-6 ">{detail.currentClass}</td>
                    <td className="py-4 px-6 ">{detail.section}</td>
                    <td className="py-4 px-6">

                      {detail.email}

                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </AnimatePresence>
            <div ref={sentinelRef} className="h-10">
                        {loading && start > 0 && (
                            <div className="text-center w-full text-gray-600 text-sm">Loading more...</div>
                        )}
                    </div>
          </motion.table>
        )}
      </motion.div>
    </motion.div>
  )
}

export default ReportCardHOD























