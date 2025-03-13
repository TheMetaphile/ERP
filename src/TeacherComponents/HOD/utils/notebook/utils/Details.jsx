import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../../../../Context/AuthContext";
import axios from "axios";
import Switch from "./switch";
import { ToastContainer } from "react-toastify";
import { BASE_URL } from "../../../../../Config";
import { motion } from "framer-motion";
import { AiOutlineArrowLeft } from "react-icons/ai";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const RecordDetailsHOD = () => {
  const { id } = useParams();
  const query = useQuery();
  const { authState, darkMode } = useContext(AuthContext);
  const session = query.get("session");
  const date = query.get("date");
  const chapter = query.get("chapter");
  const topic = query.get("topic");
  const [submittedBy, setSubmittedBy] = useState([]);
  const [notSubmittedBy, setNotSubmittedBy] = useState([]);


  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // This will navigate back to the previous page
  };

  const fetchStudentList = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/notebook/fetch/teacher/particular?docId=${id}&session=${session}`,
      headers: {
        Authorization: `Bearer ${authState?.accessToken}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setSubmittedBy(response.data.submittedBy);
        setNotSubmittedBy(response.data.notSubmittedby);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchStudentList();
  }, [id]);

  return (
    <motion.div
      className={`items-center w-full px-4 py-3 mb-2 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <motion.h1
          className={`text-3xl font-medium mobile:max-tablet:text-lg whitespace-nowrap mb-2 ${darkMode ? 'text-white' : 'text-black'}`}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Pending Notebooks
        </motion.h1>
        <motion.div
          className={`flex items-center hover:cursor-pointer transition-colors duration-300 ${darkMode ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-600'}`}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={goBack}
        >
          <AiOutlineArrowLeft className="mr-2" />
          Back
        </motion.div>
      </div>
      <div className="w-full overflow-x-auto rounded-lg">
        <table className={`min-w-full border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
          <thead>
            <tr className={`${darkMode
              ? 'bg-gradient-to-r from-blue-900 to-blue-700'
              : 'bg-gradient-to-r from-blue-400 to-blue-200'} text-lg leading-normal`}>
              <th className={`py-2 px-6 text-center rounded-t-r whitespace-nowrap ${darkMode ? 'text-white' : 'text-black'}`}>
                Roll No.
              </th>
              <th className={`py-2 px-6 text-center ${darkMode ? 'text-white' : 'text-black'}`}>Name</th>
              <th className={`py-2 px-6 text-center ${darkMode ? 'text-white' : 'text-black'}`}>Date</th>
              <th className={`py-2 px-6 text-center ${darkMode ? 'text-white' : 'text-black'}`}>Chapter</th>
              <th className={`py-2 px-6 text-center ${darkMode ? 'text-white' : 'text-black'}`}>Topic</th>
              <th className={`py-2 px-6 text-center rounded-t-l whitespace-nowrap ${darkMode ? 'text-white' : 'text-black'}`}>
                Notebook Checked
              </th>
            </tr>
          </thead>
          <tbody className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-md font-normal`}>
            {notSubmittedBy.map((Student, index) => (
              <motion.tr
                key={index}
                className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-100'}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className={`py-3 px-6 text-center whitespace-nowrap ${darkMode ? 'text-white' : ''}`}>
                  {Student.rollNumber}
                </td>
                <td className={`py-3 px-6 flex text-center whitespace-nowrap ${darkMode ? 'text-white' : ''}`}>
                  <img src={Student.profileLink} alt="img" className="rounded-full h-10 w-10" />
                  {Student.name}
                </td>
                <td className={`py-3 px-6 text-center whitespace-nowrap ${darkMode ? 'text-white' : ''}`}>
                  {new Date(date).toDateString()}
                </td>
                <td className={`py-3 px-6 text-center whitespace-nowrap ${darkMode ? 'text-white' : ''}`}>
                  {chapter}
                </td>
                <td className={`py-3 px-6 text-center whitespace-nowrap ${darkMode ? 'text-white' : ''}`}>
                  {topic}
                </td>
                <td className={`py-3 px-6 text-center whitespace-nowrap ${darkMode ? 'text-white' : ''}`}>
                  {chapter}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <motion.h1
        className={`text-3xl font-medium mobile:max-tablet:text-lg whitespace-nowrap mb-2 ${darkMode ? 'text-white' : 'text-black'}`}

        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Checked Notebooks
      </motion.h1>

      <div className="w-full overflow-x-auto rounded-lg">
        <table className={`min-w-full border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>

          <thead>
            <tr className={`${darkMode
              ? 'bg-gradient-to-r from-blue-900 to-blue-700'
              : 'bg-gradient-to-r from-blue-400 to-blue-200'} text-lg leading-normal`}>
              <th className={`py-2 px-6 text-center rounded-t-r whitespace-nowrap ${darkMode ? 'text-white' : 'text-black'}`}>
                Roll No.
              </th>
              <th className={`py-2 px-6 text-center ${darkMode ? 'text-white' : 'text-black'}`}>Name</th>
              <th className={`py-2 px-6 text-center ${darkMode ? 'text-white' : 'text-black'}`}>Date</th>
              <th className={`py-2 px-6 text-center ${darkMode ? 'text-white' : 'text-black'}`}>Chapter</th>
              <th className={`py-2 px-6 text-center ${darkMode ? 'text-white' : 'text-black'}`}>Topic</th>
              <th className={`py-2 px-6 text-center rounded-t-l whitespace-nowrap ${darkMode ? 'text-white' : 'text-black'}`}>
                Notebook Checked
              </th>
              <th className={`rounded-t-l py-2 px-6 text-center ${darkMode ? 'text-white' : 'text-black'}`}>Checked</th>
            </tr>
          </thead>
          <tbody className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-md font-normal`}>
            {submittedBy.map((Student, index) => (
              <motion.tr
                key={index}
                className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-100'}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  {Student.rollNumber}
                </td>
                <td className={`py-3 px-6 flex text-center whitespace-nowrap ${darkMode ? 'text-white' : ''}`}>
                  <img
                    src={Student.profileLink}
                    alt="img"
                    className="rounded-full h-10 w-10"
                  />
                  {Student.name}
                </td>
                <td className={`py-3 px-6 text-center whitespace-nowrap ${darkMode ? 'text-white' : ''}`}>
                  {new Date(date).toDateString()}
                </td>
                <td className={`py-3 px-6 text-center whitespace-nowrap ${darkMode ? 'text-white' : ''}`}>{chapter}</td>
                <td className={`py-3 px-6 text-center whitespace-nowrap ${darkMode ? 'text-white' : ''}`}>{topic}</td>
                <td className={`py-3 px-6 text-center whitespace-nowrap ${darkMode ? 'text-white' : ''}`}>{chapter}</td>
                <td className={`py-3 px-6 text-center whitespace-nowrap ${darkMode ? 'text-white' : ''}`}>
                  <Switch checked={true} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default RecordDetailsHOD;