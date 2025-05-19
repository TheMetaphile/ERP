import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import Loading from '../../LoadingScreen/Loading';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL } from '../../Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Selection from './utils/Selection';
import CoScholasticTable from './utils/CoScholasticTable';
import ScholasticTable from './utils/ScholasticTable';
import { motion } from 'framer-motion';
import { FaFilter, FaChevronDown, FaChevronUp } from 'react-icons/fa';


function UploadResult() {
  const [students, setStudents] = useState([]);
  const { authState, darkMode } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const end = 100;
  const [Class, setClass] = useState(localStorage.getItem('Class') || '');
  const [Section, setSection] = useState(localStorage.getItem('Section') || '');
  const [Subject, setSubject] = useState(localStorage.getItem('Subject') || '');
  const [selectedTerm, setSelectedTerm] = useState(localStorage.getItem('selectedTerm') || '');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedStream, setSelectedStream] = useState('');

  useEffect(() => {
    localStorage.setItem('Class', Class);
    localStorage.setItem('Section', Section);
    localStorage.setItem('Subject', Subject);
    localStorage.setItem('selectedTerm', selectedTerm);
  }, [Class, Section, Subject, selectedTerm]);

  const terms = [
    { label: 'Term 1', value: "term1" },
    { label: 'Half Yearly', value: "halfYearly" },
    { label: 'Term 2', value: "term2" },
    { label: 'Final', value: "final" }
  ];
  const streams = ['PCM', 'PCMB', "PCB", 'Commerce', 'Arts', 'General'];

  const handleTermChange = (event) => {
    setSelectedTerm(event.target.value);
  }

  useEffect(() => {
    if (Class && Section && Subject && selectedStream) {
      setStudents([]);
      fetchStudents();
    }
  }, [Class, Section, Subject, selectedStream]);


  const fetchStudents = async () => {
    if (!Class || !Section || !Subject || !selectedStream) return;

    setLoading(true);
    try {
      const selectedSubj = [...authState.subject, ...authState.Co_scholastic].find(subj => subj.subject === Subject);

      const response = await axios.post(`${BASE_URL}/fetchMultiple/student/particularSubject`, {
        accessToken: authState?.accessToken,
        currentClass: Class,
        subject: Subject,
        section: Section,
        stream: selectedStream,
        end: end,
        optional: selectedSubj.optional
      });
      if (response.status === 200) {
        setStudents(prevData => [...prevData, ...response.data.Students]);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } }
  };


  return (
    <motion.div
      className={`overflow-y-auto w-full items-start px-2 py-1 no-scrollbar ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
        }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <ToastContainer />
      <div className='w-full flex items-center justify-between my-2'>
        <div className='flex-1'>
          <motion.h1
            className={`mb-2 text-3xl font-medium mobile:max-tablet:text-lg whitespace-nowrap ${darkMode ? 'text-white' : 'text-black'
              }`}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Upload Report Card
          </motion.h1>
        </div>
        <div className="flex flex-1 justify-end sm:hidden w-full items-end mobile:max-laptop:text-end">
          <motion.button
            className={`p-2 border rounded flex items-center ${darkMode
              ? 'bg-gray-700 text-white border-gray-600'
              : 'bg-white text-black border-gray-300'
              }`}
            onClick={() => setDropdownVisible(!isDropdownVisible)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaFilter className="mr-2" />
            Filter
            {isDropdownVisible ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
          </motion.button>
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate={isDropdownVisible ? "visible" : "hidden"}
          >
            {isDropdownVisible && (
              <div className={`flex absolute left-0 right-0 p-4 gap-2 justify-between mobile:max-tablet:flex-col ${darkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                <Selection
                  setClass={setClass}
                  setSection={setSection}
                  setSubject={setSubject}
                  darkMode={darkMode}
                />
                <div className="w-36 mobile:max-tablet:w-full mobile:max-tablet:mr-0 mr-3 self-center">
                  <select
                    value={selectedStream}
                    onChange={(e) => setSelectedStream(e.target.value)}
                    className={`w-full px-2 py-2 border-2 rounded-md ${darkMode
                      ? 'bg-gray-700 text-white border-gray-600'
                      : 'border-blue-300'
                      }`}
                  >
                    <option value="">Select Stream</option>
                    {streams.map((stream) => (
                      <option key={stream} value={stream}>
                        {stream}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-36 mobile:max-tablet:w-full mobile:max-tablet:mr-0 mr-3 self-center">
                  <select
                    id="section"
                    className={`w-full px-2 py-2 border-2 rounded-md ${darkMode
                      ? 'bg-gray-700 text-white border-gray-600'
                      : 'border-blue-300'
                      }`}
                    onChange={handleTermChange}
                  >
                    <option value="">Select Term</option>
                    {terms.map((sectionOption, index) => (
                      <option key={index} value={sectionOption.value}>
                        {sectionOption.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        <div className='flex items-end mobile:max-laptop:hidden'>
          <Selection
            setClass={setClass}
            setSection={setSection}
            setSubject={setSubject}
            darkMode={darkMode}
          />
          <div className="w-36 mr-3 self-center">
            <select
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
              c className={`w-full px-2 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${darkMode
                ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-600'
                : 'border-blue-300 focus:ring-blue-500'
                }`}
            >
              <option value="">Select Stream</option>
              {streams.map((stream) => (
                <option key={stream} value={stream}>
                  {stream}
                </option>
              ))}
            </select>
          </div>
          <div className="w-36 mr-3 self-center">
            <select
              id="section"
              className={`w-full px-2 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${darkMode
                ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-600'
                : 'border-blue-300 focus:ring-blue-500'
                }`}
              onChange={handleTermChange}
            >
              <option value="">Select Term</option>
              {terms.map((sectionOption, index) => (
                <option key={index} value={sectionOption.value}>
                  {sectionOption.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        authState.Co_scholastic.some(subj => subj.subject === Subject) ? (
          <CoScholasticTable
            students={students}
            subject={Subject}
            Class={Class}
            term={selectedTerm}
            section={Section}
            darkMode={darkMode}
          />
        ) : (
          <ScholasticTable
            students={students}
            subject={Subject}
            term={selectedTerm}
            Class={Class}
            section={Section}
            darkMode={darkMode}
          />
        )
      )}
    </motion.div>
  );
};

export default UploadResult;