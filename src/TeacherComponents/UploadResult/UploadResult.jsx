import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import Loading from '../../LoadingScreen/Loading';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL_Login } from '../../Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Switch from './utils/switch';
import Selection from '../notebook/utils/Selection';
import CoScholasticTable from './utils/CoScholasticTable';
import ScholasticTable from './utils/ScholasticTable';
import { motion } from 'framer-motion';
import { FaFilter, FaChevronDown, FaChevronUp } from 'react-icons/fa';

function UploadResult() {
  const [students, setStudents] = useState([]);
  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const end = 100;
  const [Class, setClass] = useState(authState.subject ? authState.subject[0].class : '');
  const [Section, setSection] = useState(authState.subject ? authState.subject[0].section : "");
  const [Subject, setSubject] = useState(authState.subject ? authState.subject[0].subject : "");
  const [scholastic, setScholastic] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState('term1');

  const terms = [
    {
      label: 'Term 1',
      value: "term1"
    },
    {
      label: 'Half Yearly',
      value: "halfYearly"
    },
    {
      label: 'Term 2',
      value: "term2"
    },
    {
      label: 'Final',
      value: "final"
    }
  ];

  const handleTermChange = (event) => {
    setSelectedTerm(event.target.value);
  }
  const handleRoleChange = (event) => {
    setScholastic(event);
  };

  useEffect(() => {
    setStudents([]);
    fetchStudents();
  }, [Class, Section]);




  const fetchStudents = async () => {
    if (!Class || !Section) return;

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL_Login}/fetchMultiple/student`, {
        accessToken: authState.accessToken,
        currentClass: Class,
        section: Section,
        end: end
      });
      if (response.status == 200) {
        console.log("API response:", response.data.Students);
        setStudents(prevData => [...prevData, ...response.data.Students]);
        console.log("API responserrrrrr:", response.data.Students);

      }

    } catch (error) {
      console.error("Error fetching student:", error);
    }
    finally {
      setLoading(false)
    }
  };

  const [isDropdownVisible, setDropdownVisible] = useState(false);




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
      className="overflow-y-auto w-full items-start px-2 py-1 no-scrollbar"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <ToastContainer />
      <div className='w-full flex items-center justify-between my-2'>
        <div className='flex-1'>
          <motion.h1
            className="mb-2 text-3xl font-medium text-black mobile:max-tablet:text-lg whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Upload Report Card
          </motion.h1>
        </div>
        <div className="block flex-1 justify-end laptop:hidden w-full items-end mobile:max-laptop:text-end">
          <motion.button
            className="p-2 border rounded flex items-center"
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
              <div className='flex absolute left-0 right-0 bg-white p-4 gap-2 justify-between mobile:max-tablet:flex-col'>
                <Selection setClass={setClass} setSection={setSection} setSubject={setSubject} />
                <div className="w-36 mobile:max-tablet:w-full mobile:max-tablet:mr-0 mr-3 self-center">
                  <select id="section" className="w-full px-2 py-2 border rounded-md" onChange={handleTermChange}>
                    <option value="">Select Term</option>
                    {terms.map((sectionOption, index) => (
                      <option key={index} value={sectionOption.value}>{sectionOption.label}</option>
                    ))}
                  </select>
                </div>
                <Switch checked={scholastic} changeRole={handleRoleChange} />
              </div>
            )}
          </motion.div>
        </div>

        <div className='flex items-end mobile:max-laptop:hidden'>
          <Selection setClass={setClass} setSection={setSection} setSubject={setSubject} />
          <div className="w-36 mr-3 self-center">
            <select id="section" className="w-full px-2 py-2 border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md" onChange={handleTermChange}>
              <option value="">Select Term</option>
              {terms.map((sectionOption, index) => (
                <option key={index} value={sectionOption.value}>{sectionOption.label}</option>
              ))}
            </select>
          </div>
          <Switch checked={scholastic} changeRole={handleRoleChange} />
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : scholastic ? (
        <ScholasticTable students={students} subject={Subject} term={selectedTerm} Class={Class} />
      ) : (
        <CoScholasticTable students={students} Class={Class} term={selectedTerm} />
      )}
    </motion.div>
  );
};


export default UploadResult