import React, { useState, useEffect, useContext } from "react";
import HomeWorkTile from './HomeWorkTile';
import NewUpload from './NewUpload';
import axios from 'axios';
import Loading from '../../LoadingScreen/Loading';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL_Homework } from "../../Config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiUpload, FiBook, FiUsers, FiLayers } from 'react-icons/fi';

function HomeWork() {
  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [additionalData, setAdditionalData] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(4);
  const [allDataFetched, setAllDataFetched] = useState(false);
  const [uniqueSections, setUniqueSections] = useState([]);
  const [uniqueSubjects, setUniqueSubjects] = useState([]);

  const uniqueClasses = Array.from(new Set(authState.subject ? authState.subject.map(subj => subj.class) : []));

  useEffect(() => {
    setUniqueSections(Array.from(new Set(
      authState.subject ? authState.subject
        .filter(subj => subj.class === selectedClass)
        .map(subj => subj.section) : []
    )));
  }, [selectedClass]);


  useEffect(() => {
    setUniqueSubjects(Array.from(new Set(
      authState.subject ? authState.subject
        .filter(subj => subj.section === selectedSection && subj.class === selectedClass)
        .map(subj => subj.subject) : []
    )));
  }, [selectedSection, selectedClass]);

  const handleOpen = () => {
    if (!authState.subject) { toast.error("No subject is assigned. Please contanct Admin"); return; }
    setIsDialogOpen(true);
  }
  const handleClose = () => {
    setIsDialogOpen(false);
  }

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  }
  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  }
  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  }

  const handleNewWork = (newWork) => {
    console.log('homework.jsx')
    setAdditionalData([newWork]);
  };

  useEffect(() => {
    if (selectedSubject) {
      setStart(0);
      setDetails([]);
      setAllDataFetched(false);
      fetchHomework();

    }
  }, [authState.accessToken, selectedSubject, selectedSection, selectedClass]);

  const handleViewMore = () => {
    setStart(prevStart => prevStart + end);
  };

  useEffect(() => {
    if (start !== 0) {
      fetchHomework();
    }
  }, [start, selectedSubject, selectedSection, selectedClass]);

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const fetchHomework = async () => {
    console.log(authState.ClassDetails.class, new Date().getMonth() + 1, authState.ClassDetails.section, selectedSubject);
    if (!selectedClass || !selectedSection || !selectedSubject) return;
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL_Homework}/homework/fetch/teacher?class=${selectedClass}&month=${new Date().getMonth() + 1}&year=${new Date().getFullYear()}&section=${selectedSection}&subject=${selectedSubject}&start=${start}&end=${end}`, {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`,
        }
      });
      const work = response.data.homework.length;
      console.log("API response:", response.data.homework);
      if (work < end) {
        toast.success('All data fetched');
        console.log('All data fetched')
        setAllDataFetched(true);
      }
      setDetails(prevData => [...prevData, ...response.data.homework]);
      console.log('fetch', response.data)
    } catch (error) {
      console.error("Error fetching student homework:", error);
    }
    finally {
      setLoading(false)
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full flex flex-col px-3 h-screen overflow-y-auto items-start mt-2 mb-3 no-scrollbar">
      <ToastContainer />
      <div className=" flex justify-between w-full mobile:max-sm:flex-col">
        <motion.div
          className='w-full flex  items-center justify-between tablet:max-laptop:flex-col tablet:max-laptop:items-start mobile:max-tablet:px-3'
          variants={itemVariants}
        >
          <div>
            <h1 className='text-3xl whitespace-nowrap mobile:max-tablet:text-lg font-medium text-black'>All Homework</h1>
          </div>
          <div className="block sm:hidden w-full mobile:max-tablet:text-end">
            <motion.button
              className="p-2 border rounded-full bg-blue-100 text-black hover:bg-blue-200 transition-colors duration-300"
              onClick={() => setDropdownVisible(!isDropdownVisible)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiFilter className="inline-block mr-2" />
              Filter
            </motion.button>
            <AnimatePresence>
              {isDropdownVisible && (
                <motion.div
                  className='flex absolute left-0 right-0 bg-white p-2 items-center gap-3 flex-col shadow-lg rounded-md'
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className=" w-full">
                    <FiBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                    <select id="class" className="w-full pl-10 pr-4 py-2 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={handleClassChange}>
                      <option value="">Class</option>
                      {uniqueClasses.map((classOption, index) => (
                        <option key={index} value={classOption}>{classOption}</option>
                      ))}
                    </select>
                  </div>
                  <div className="relative w-full">
                    <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                    <select id="section" className="w-full pl-10 pr-4 py-2 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={handleSectionChange}>
                      <option value="">Section</option>
                      {uniqueSections.map((sectionOption, index) => (
                        <option key={index} value={sectionOption}>{sectionOption}</option>
                      ))}
                    </select>
                  </div>
                  <div className="relative w-full">
                    <FiLayers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                    <select id="subject" className="w-full pl-10 pr-4 py-2 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={handleSubjectChange}>
                      <option value="">Subject</option>
                      {uniqueSubjects.map((subjectOption, index) => (
                        <option key={index} value={subjectOption}>{subjectOption}</option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
        <motion.div variants={itemVariants} className='w-full flex items-center justify-end mb-4'>
          <div className="flex items-center space-x-4 mt-3">
            <div className='flex mobile:max-sm:hidden items-center gap-3'>
              <div className="relative">
                <FiBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                <select id="class" className="w-full pl-10 pr-4 py-2 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={handleClassChange}>
                  <option value="">Class</option>
                  {uniqueClasses.map((classOption, index) => (
                    <option key={index} value={classOption}>{classOption}</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                <select id="section" className="w-full pl-10 pr-4 py-2 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={handleSectionChange}>
                  <option value="">Section</option>
                  {uniqueSections.map((sectionOption, index) => (
                    <option key={index} value={sectionOption}>{sectionOption}</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <FiLayers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                <select id="subject" className="w-full pl-10 pr-4 py-2 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={handleSubjectChange}>
                  <option value="">Subject</option>
                  {uniqueSubjects.map((subjectOption, index) => (
                    <option key={index} value={subjectOption}>{subjectOption}</option>
                  ))}
                </select>
              </div>
            </div>
            <motion.button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center"
              onClick={handleOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiUpload className="mr-2" />
              Upload
            </motion.button>
          </div>
        </motion.div>
      </div>
      {loading ? (
        <Loading />
      ) : details.length === 0 ? (
        <motion.div
          className="text-center w-full mt-6 text-black"
          variants={itemVariants}
        >
          No Homework found
        </motion.div>
      ) : (
        <motion.div variants={itemVariants} className='w-full mt-2 rounded-lg'>
          <HomeWorkTile details={details} Class={selectedClass} additionalData={additionalData} selectedSubject={selectedSubject} />
          {!allDataFetched && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='text-blue-600 hover:text-blue-800 mt-3 cursor-pointer text-center flex items-center justify-center w-full py-2 border border-blue-300 rounded-md'
              onClick={handleViewMore}
            >
              <IoMdArrowDropdown className="mr-1" /> View More
            </motion.button>
          )}
        </motion.div>
      )}
      {isDialogOpen && <NewUpload onClose={handleClose} onNewWork={handleNewWork} />}
    </motion.div>



  )
}

export default HomeWork