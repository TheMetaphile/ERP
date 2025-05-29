import React, { useState, useEffect, useContext, useRef } from 'react'
import Selection from './utils/Selection';
import Header from '../../AdminComponents/Home/utils/TeachersDetails/LeftCard/Header';
import { Link } from "react-router-dom";
import axios from 'axios';
import Loading from '../../LoadingScreen/Loading';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL } from '../../Config';
import { ToastContainer, toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilter } from 'react-icons/fa';
import { FiCheck, FiDownload, FiRefreshCw } from "react-icons/fi";

function ReportCardSubAdmin() {
  const { authState, darkMode } = useContext(AuthContext);
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
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [fetchedFields, setFetchedFields] = useState([]);
  const [selectedResultReference, setSelectedResultReference] = useState('');

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

  useEffect(() => {
    setUserData([]);
    setStart(0);
    setAllDataFetched(false);
  }, [Class, Section, selectedSession]);

  console.log('ll', Class, Section, selectedSession)
  useEffect(() => {
    fetchStudents();
  }, [authState?.accessToken, Class, Section, selectedSession]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      console.log(start, "-", end);
      const response = await axios.post(`${BASE_URL}/fetchMultiple/student`, {
        accessToken: authState?.accessToken,
        currentClass: Class,
        section: Section,
        end: end,
        start: start,
        session: selectedSession
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

  const toggleRow = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    fetchFieldsForUserType();
  }, [Class, Section, selectedSession]);

  const fetchFieldsForUserType = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/templates/fetch`, {
        headers: {
          'Authorization': `Bearer ${authState?.accessToken}`
        }
      });

      if (response.status === 200) {
        const filteredFields = response.data || [];
        setFetchedFields(filteredFields);

        // Auto-select first template if available
        const resultTemplates = filteredFields.filter(doc => doc.documentName === "Result");

        if (resultTemplates.length > 0 && !selectedResultReference) {
          setSelectedResultReference(resultTemplates[0].referenceNo + "." + resultTemplates[0].documentType);
        }

      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to load templates';
      console.log(error);
      setFetchedFields([]);
    }
  };

  const themeClasses = {
    container: darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800",
    card: darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
    button: {
      primary: darkMode
        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
        : "bg-blue-600 hover:bg-blue-700 text-white",
      secondary: darkMode
        ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
        : "bg-gray-200 hover:bg-gray-300 text-gray-800",
      disabled: darkMode
        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    },
    input: darkMode
      ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
      : "bg-white border-blue-300 text-gray-800 focus:ring-blue-500 focus:border-blue-500",
    table: {
      header: darkMode ? "bg-gray-800 text-gray-200" : "bg-blue-100 text-gray-800",
      row: darkMode ? "border-gray-700 hover:bg-gray-700" : "border-gray-200 hover:bg-blue-50",
      altRow: darkMode ? "bg-gray-750" : "bg-blue-50"
    },
    dialog: {
      overlay: darkMode ? "bg-black bg-opacity-70" : "bg-black bg-opacity-50",
      container: darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
    },
    checkbox: darkMode
      ? "border-indigo-500 checked:bg-indigo-600"
      : "border-blue-500 checked:bg-blue-600",
    icon: darkMode ? "text-indigo-400" : "text-blue-500",
    loading: darkMode ? "text-indigo-400" : "text-blue-500",
    header: darkMode ? "border-gray-700" : "border-gray-300",
    error: darkMode ? "bg-red-900 border-red-700" : "bg-red-100 border-red-300"
  };

  const downloadCertificate = async (type, customStudent = null, customTemplate = null) => {
    setDownloadLoading(true);
    if (!selectedSession) {
      toast.warn('Select all filters');
      return;
    }

    try {
      const students = customStudent ? [customStudent] : selectedStudents;

      if (!students || students.length <= 0) {
        toast.warn("Please select students");
        setDownloadLoading(false);
        return;
      }

      let selectedTemplate;
      let endpoint;

      if (type === 'Result') {
        selectedTemplate = customTemplate || selectedResultReference;
        if (!selectedTemplate) {
          toast.warn("Please select Result Template");
          setDownloadLoading(false);
          return;
        }
        endpoint = 'result';
      }
      console.log(students, '11', selectedTemplate)
      const apiUrl = `${BASE_URL}/certificate/${endpoint}/${selectedSession}/${selectedTemplate}`;

      const response = await axios.post(apiUrl, {
        students: students,
        templateReference: selectedTemplate
      }, {
        headers: {
          Authorization: `Bearer ${authState?.accessToken}`
        },
        responseType: "blob"
      });

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `${type === 'Result' ? 'Result_Certificate' : ''}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(pdfUrl);

      toast.success(`${type} downloaded successfully!`);

    } catch (error) {
      console.error(`Error downloading ${type}:`, error);
      const errorMessage = error.response?.data?.error || `Failed to download ${type}`;
      toast.error(errorMessage);
    } finally {
      setDownloadLoading(false);
    }
  };


  return (
    <motion.div
      className=" flex flex-col mx-2  min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <ToastContainer />

      <motion.div
        className="flex justify-between items-center py-4  text-black mb-4 mobile:max-tablet:mb-0"
        variants={itemVariants}
      >
        <h1 className="text-3xl font-semibold mobile:max-tablet:text-lg">Report Card</h1>
        <motion.button
          className="p-2 bg-blue-500 rounded-full shadow-md hover:bg-blue-400 transition-colors duration-200 mobile:max-tablet:block hidden"
          onClick={() => setDropdownVisible(!isDropdownVisible)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaFilter />
        </motion.button>
        <motion.div className="mobile:max-tablet:hidden flex justify-center items-center gap-2" variants={itemVariants}>
          <Selection
            Class={Class}
            Section={Section}
            Session={selectedSession}
            handleClassChange={handleClassChange}
            handleSectionChange={handleSectionChange}
            handleSessionChange={handleSessionChange}
          />
          <select
            value={selectedResultReference}
            onChange={(e) => setSelectedResultReference(e.target.value)}
            className="px-4 py-2 border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 rounded-md mobile:max-tablet:text-xs mobile:max-tablet:px-1 mobile:max-tablet:py-2"
          >
            <option value="">Select Result Template</option>
            {fetchedFields
              .filter((doc) => doc.documentName === "Result")
              .map((reference, index) => (
                <option key={index} value={reference.referenceNo + "." + reference.documentType}>
                  {reference.referenceNo + "." + reference.documentType}
                </option>
              ))
            }
          </select>
        </motion.div>
      </motion.div>


      {isDropdownVisible && (
        <motion.div
          className="absolute bg-white py-2 rounded-lg shadow-xl right-4 left-4 z-20 mobile:max-tablet:mt-16 flex justify-center items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Selection
            Class={Class}
            Section={Section}
            Session={selectedSession}
            handleClassChange={handleClassChange}
            handleSectionChange={handleSectionChange}
            handleSessionChange={handleSessionChange}
          />
          <select
            value={selectedResultReference}
            onChange={(e) => setSelectedResultReference(e.target.value)}
            className="w-full px-4 py-2 border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 rounded-md mobile:max-tablet:text-xs mobile:max-tablet:px-1 mobile:max-tablet:py-2"
          >
            <option value="">Select Result Template</option>
            {fetchedFields
              .filter((doc) => doc.documentName === "Result")
              .map((reference, index) => (
                <option key={index} value={reference.referenceNo + "." + reference.documentType}>
                  {reference.referenceNo + "." + reference.documentType}
                </option>
              ))
            }
          </select>
        </motion.div>
      )}




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

            <thead className={`transition-colors duration-300 ${themeClasses.table.header}`}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Section</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        setSelectedStudents(e.target.checked ? userData.map((row) => row._id) : []);
                      }}
                      className={`appearance-none w-5 h-5 border rounded cursor-pointer transition-all duration-200 ${themeClasses.checkbox}`}
                    />
                    <span className="ml-2">Select All</span>
                  </div>
                </th>
              </tr>
            </thead>
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
                    initial="hidden"
                    animate="visible"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium flex justify-center">
                      <img src={detail.profileLink} alt="" className="h-8 w-8 rounded-full" />
                      <h1 className="text-base w-32">{detail.name}</h1>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{detail.currentClass}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{detail.section}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{detail.email}</td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(detail._id)}
                          onChange={() => toggleRow(detail._id)}
                          className={`appearance-none w-5 h-5 border rounded cursor-pointer transition-all duration-200 ${themeClasses.checkbox}`}
                        />
                        {selectedStudents.includes(detail._id) && (
                          <FiCheck className="absolute text-white pointer-events-none" />
                        )}
                      </div>
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
                  className="text-blue-600 hover:text-blue-800 font-semibold"
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
        <div className='p-3 flex justify-center'>
          <button
            onClick={() => downloadCertificate('Result')}
            disabled={selectedStudents.length === 0 || !selectedResultReference || downloadLoading}
            className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${selectedStudents.length === 0 || !selectedResultReference || downloadLoading
              ? themeClasses.button.disabled
              : themeClasses.button.primary
              }`}
          >
            {downloadLoading ? (
              <FiRefreshCw className="animate-spin mr-2" />
            ) : (
              <FiDownload className="mr-2" />
            )}
            Download Result
          </button>
        </div>

      </motion.div>
    </motion.div>
  )
}

export default ReportCardSubAdmin























