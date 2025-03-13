import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from 'react-router-dom';
import AuthContext from "../../../Context/AuthContext";
import axios from "axios";
import Switch from "./switch";
import { motion } from 'framer-motion';
import { FaSave, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from '../../../Config'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const RecordDetails = () => {
  const { id } = useParams();
  const query = useQuery();
  const { authState, darkMode } = useContext(AuthContext);
  const session = query.get('session');
  const date = query.get('date');
  const chapter = query.get('chapter');
  const topic = query.get('topic');
  const [submittedBy, setSubmittedBy] = useState([]);
  const [notSubmittedBy, setNotSubmittedBy] = useState([]);
  const [checkedStudents, setCheckedStudents] = useState([]);

  const addEmail = (email) => {
    setCheckedStudents(prevChecked => [...prevChecked, email]);
  }
  const removeEmail = (studentIdToRemove) => {

    setCheckedStudents(prevChecked => prevChecked.filter(studentId => studentId !== studentIdToRemove));

  }
  const fetchStudentList = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/notebook/fetch/teacher/particular?docId=${id}&session=${session}`,
      headers: {
        'Authorization': `Bearer ${authState?.accessToken}`
      }
    };

    axios.request(config)
      .then((response) => {
        setSubmittedBy(response.data.submittedBy);
        setNotSubmittedBy(response.data.notSubmittedby);

      })
      .catch((error) => {
        console.log(error);
      });

  }
  useEffect(() => {
    fetchStudentList()
  }, [id]);

  const handleSave = () => {
    let data = JSON.stringify({
      "docId": id,
      "session": session,
      "submittedBy": checkedStudents
    });

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/notebook/update/submission`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authState?.accessToken}`
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        toast.success('Notebook Record updated Successfully ');
        console.log(checkedStudents);
        fetchStudentList();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.error);
      });

  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`items-center px-4 py-1 mb-2 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
        }`}
    >
      <ToastContainer />
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="flex justify-between"
      >
        <h1 className={`text-xl font-medium mb-2 mobile:max-tablet:text-lg ${darkMode ? 'text-white' : 'text-black'
          }`}>
          Pending Notebooks
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`text-xl mobile:max-tablet:text-sm border px-4 rounded-md shadow-md font-medium mb-2 hover:opacity-90 flex items-center ${darkMode
            ? 'text-green-400 border-green-400 hover:bg-green-900'
            : 'text-green-500 border-green-500 hover:bg-green-600 hover:text-white hover:border-white'
            }`}
          onClick={handleSave}
        >
          <FaSave className="mr-2" />
          Save
        </motion.button>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full overflow-x-auto rounded-lg"
      >
        <table className={`min-w-full border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
          } rounded-lg`}>
          <thead>
            <tr className={`${darkMode
              ? 'bg-gradient-to-r from-blue-900 to-blue-700'
              : 'bg-gradient-to-r from-blue-400 to-blue-200'
              } text-lg leading-normal`}>
              {['Roll No.', 'Name', 'Date', 'Chapter', 'Topic', 'Notebook Checked', 'Checked'].map((header, index) => (
                <th
                  key={index}
                  className={`py-2 px-6 text-center  whitespace-nowrap ${darkMode ? 'text-white' : 'text-black'
                    }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`${darkMode ? 'text-gray-800' : 'text-gray-600'
            } text-md font-normal`}>
            {notSubmittedBy.map((Student, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`border-b ${darkMode
                  ? 'border-gray-700 hover:bg-gray-700'
                  : 'border-gray-200 hover:bg-gray-100'
                  }`}
              >
                <td className="py-3 px-6 text-center whitespace-nowrap">{Student.rollNumber}</td>
                <Link to={`/Teacher-Dashboard/notebook/studentdetails/${Student.email}`}>
                  <td className="flex py-3 px-6 text-center items-center gap-2 whitespace-nowrap">
                    <img src={Student.profileLink} alt="img" className={`rounded-full h-10 w-10 border ${darkMode ? 'border-gray-600' : 'border-blue-200'
                      }`} />
                    {Student.name}
                  </td>
                </Link>
                <td className="py-3 px-6 text-center whitespace-nowrap">{new Date(date).toDateString()}</td>
                <td className="py-3 px-6 text-center">{chapter}</td>
                <td className="py-3 px-6 text-center whitespace-nowrap">{topic}</td>
                <td className="py-3 px-6 text-center">{chapter}</td>
                <td className="flex py-3 px-6 justify-center">
                  <Switch checked={checkedStudents.includes(Student.email)} addEmail={addEmail} removeEmail={removeEmail} email={Student.email} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`text-xl font-medium my-3 ${darkMode ? 'text-white' : 'text-black'
          }`}
      >
        Checked Notebooks
      </motion.h1>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="w-full overflow-x-auto rounded-lg"
      >
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className={`${darkMode
              ? 'bg-gradient-to-r from-blue-900 to-blue-700'
              : 'bg-gradient-to-r from-blue-400 to-blue-200'
              } text-lg leading-normal`}>
              <th className="py-2 px-6 text-center rounded-t-r whitespace-nowrap">Roll No.</th>
              <th className="py-2 px-6 text-center">Name</th>
              <th className="py-2 px-6 text-center">Date</th>
              <th className="py-2 px-6 text-center">Chapter</th>
              <th className="py-2 px-6 text-center">Topic</th>
              <th className="py-2 px-6 text-center rounded-t-l whitespace-nowrap">Notebook Checked</th>
              <th className="py-2 px-6 text-center rounded-t-l">Checked</th>
            </tr>
          </thead>
          <tbody className={`${darkMode ? 'text-white bg-gray-800' : 'text-gray-600'
            } text-md font-normal`}>
            {submittedBy.map((Student, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`border-b ${darkMode
                  ? 'border-gray-700 hover:bg-gray-700'
                  : 'border-gray-200 hover:bg-gray-100'
                  }`}
              >
                <td className="py-3 px-6 text-center whitespace-nowrap">{Student.rollNumber}</td>

                <td className="flex py-3 px-6 text-center items-center gap-2 whitespace-nowrap">
                  <img src={Student.profileLink} alt="img" className={`rounded-full h-10 w-10 border ${darkMode ? 'border-gray-600' : 'border-blue-200'
                    }`} />
                  {Student.name}
                </td>

                <td className="py-3 px-6 text-center whitespace-nowrap">{new Date(date).toDateString()}</td>
                <td className="py-3 px-6 text-center">{chapter}</td>
                <td className="py-3 px-6 text-center whitespace-nowrap">{topic}</td>
                <td className="py-3 px-6 text-center">{chapter}</td>
                <td className="flex py-3 px-6 justify-center">
                  <FaCheckCircle className={`text-xl ${darkMode ? 'text-green-400' : 'text-green-500'
                    }`} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default RecordDetails;
