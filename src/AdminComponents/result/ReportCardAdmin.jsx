import React, { useState, useEffect, useContext, useRef } from 'react'
import Selection from './utils/Selection';
import Header from '../../AdminComponents/Home/utils/TeachersDetails/LeftCard/Header';
import { Link } from "react-router-dom";
import axios from 'axios';
import Loading from '../../LoadingScreen/Loading';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL_Login } from '../../Config';
import { ToastContainer, toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

function ReportCardAdmin() {
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

  useEffect(() => {
    localStorage.setItem('Class', Class);
    localStorage.setItem('Section', Section);
    localStorage.setItem('selectedSession', selectedSession);
  }, [Class, Section, selectedSession]);

  const handleClassChange = (event) => {
    setUserData([]);
    setAllDataFetched(false);
    setClass(event.target.value);
    setStart(0);
  };

  const handleSectionChange = (event) => {

    setUserData([]);
    setAllDataFetched(false);
    setSection(event.target.value);
    setStart(0);
  };

  const handleSessionChange = (session) => {
    setSelectedSession(session);
  };

  const handleViewMore = () => {
    setStart(prevStart => prevStart + end);
  };

  useEffect(() => {
    if (start !== 0) {
      fetchStudents();
    }
  }, [start]);

  console.log('ll', Class, Section, selectedSession)
  useEffect(() => {
    fetchStudents();
  }, [authState.accessToken, Class, Section]);

  const fetchStudents = async () => {
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

  return (
    <motion.div
      className=" min-h-screen p-4 mobile:max-tablet:px-2"
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
                className="divide-y divide-purple-200"
              >
                {userData.map((detail) => (
                  <motion.tr
                    key={detail.email}
                    variants={itemVariants}
                  // whileHover={{ scale: 1.01, backgroundColor: "#F3E8FF" }}
                  // transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <td className="py-4 px-6">
                      <Link to={`/Admin-Dashboard/Result/${detail.email}?session=${selectedSession}&Class=${Class}`}>
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
            {!allDataFetched && (
              <motion.div
                className="text-center py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  className="text-purple-600 hover:text-purple-800 font-semibold"
                  onClick={handleViewMore}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View More
                </motion.button>
              </motion.div>
            )}
          </motion.table>
        )}
      </motion.div>
    </motion.div>
  )
}

export default ReportCardAdmin























