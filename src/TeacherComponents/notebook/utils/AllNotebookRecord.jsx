import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import AuthContext from "../../../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from '../../../Config'
import { motion } from "framer-motion";
import { FaEye, FaComment } from "react-icons/fa";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AllNoteBookRecord = () => {
  const query = useQuery();
  const Class = query.get('Class');
  const Section = query.get('Section');
  const Subject = query.get('Subject');
  const { authState, darkMode } = useContext(AuthContext);
  const [records, SetRecord] = useState([]);
  const [start, SetStart] = useState(0);
  const date = new Date();
  var session = date.getMonth() + 1 < 4
    ? `${date.getFullYear() - 1}-${date.getFullYear().toString().substring(2, 4)}`
    : `${date.getFullYear()}-${(date.getFullYear() + 1).toString().substring(2, 4)}`;
  const end = 10;

  useEffect(() => {
    SetRecord([]);
    SetStart(0);
    if (Class && Subject && Section) {
      fetchRecord();
    }
  }, [Class, Subject, Section])

  useEffect(() => {
    if (Class && Subject && Section && start !== 0) {
      fetchRecord();
    }
  }, [start]);

  const fetchRecord = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/notebook/fetch/teacher/all?class=${Class}&section=${Section}&subject=${Subject}&session=${session}&start=${start}&count=${end}`,
      headers: {
        'Authorization': `Bearer ${authState?.accessToken}`
      }
    };

    axios.request(config)
      .then((response) => {
        SetRecord(prevState => [...prevState, ...response.data.notebookRecord])
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.error);
      });
  }

  const handleViewMore = () => {
    if (records.length >= start + end) {
      SetStart(start + end);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex-col mobile:max-tablet:flex-col-reverse justify-between tablet:items-center px-4 pb-0 mb-2 overflow-auto mobile:max-tablet:px-1 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
        }`}
    >
      <ToastContainer />
      <div className="overflow-x-auto rounded-lg">
        <motion.table
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className={`min-w-full border rounded-lg ${darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-300'
            }`}
        >
          <thead>
            <tr className={`${darkMode
                ? 'bg-gradient-to-r from-blue-900 to-blue-700'
                : 'bg-gradient-to-r from-blue-400 to-blue-200'
              } text-lg leading-normal`}>
              {['Date', 'Chapter', 'Topic', 'Notebook Checked', 'Action', 'Remark'].map((header, index) => (
                <th
                  key={index}
                  className={`py-2 px-6 text-center ${index === 0 ? 'rounded-t-l' :
                      index === 5 ? 'rounded-t-r' : ''
                    } ${darkMode ? 'text-white' : 'text-black'}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`${darkMode ? 'text-gray-300' : 'text-gray-600'
            } text-md font-normal`}>
            {records.map((record, index) => (
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
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  {new Date(record.date).toDateString()}
                </td>
                <td className="py-3 px-6 text-center">{record.chapter}</td>
                <td className="py-3 px-6 text-center whitespace-nowrap">{record.topic}</td>
                <td className="py-3 px-6 text-center">{record.checked}</td>
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  <Link
                    to={`/Teacher-Dashboard/notebook/details/${record._id}?session=${session}&date=${record.date}&chapter=${record.chapter}&topic=${record.topic}`}
                    className={`w-full flex items-center justify-center ${darkMode
                        ? 'text-blue-400 hover:text-blue-300'
                        : 'text-blue-500 hover:text-blue-700'
                      }`}
                  >
                    <FaEye className="mr-2" />
                    Show Details
                  </Link>
                </td>
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  {record.remark ? (
                    <div className="flex items-center justify-center">
                      <FaComment className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                      {record.remark}
                    </div>
                  ) : (
                    'NA'
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
      {records.length >= start + end && (
        <motion.h1
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`text-center text-lg hover:cursor-pointer mt-4 ${darkMode
              ? 'text-blue-400 hover:text-blue-300'
              : 'text-blue-400 hover:text-blue-600'
            }`}
          onClick={handleViewMore}
        >
          View more
        </motion.h1>
      )}
    </motion.div>
  );
};

export default AllNoteBookRecord;