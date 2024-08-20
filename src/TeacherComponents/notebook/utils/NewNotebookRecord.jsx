import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {  useLocation } from 'react-router-dom';
import AuthContext from "../../../Context/AuthContext";
import Switch from "./switch";
import { toast, ToastContainer } from "react-toastify";
import { FaSave, FaBookOpen } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { BASE_URL_Login } from '../../../Config'
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const NewNoteBookRecord = () => {
  const query = useQuery();
  const Class = query.get('Class');
  const Section = query.get('Section');
  const Subject = query.get('Subject');
  const [chapter, setChapter] = useState('');
  const [topic, setTopic] = useState('');
  const [checkedStudents, setCheckedStudents] = useState([]);
  const [Students, setStudents] = useState([]);

  const { authState } = useContext(AuthContext);
  const [start, setStart] = useState(0);
  const date = new Date();
  const end = 10;
  var session = date.getMonth() + 1 < 4 ? `${date.getFullYear() - 1}-` + `${date.getFullYear()}`.substring(2, 4) : `${date.getFullYear()}-` + `${date.getFullYear() + 1}`.substring(2, 4);

  const addEmail = (email) => {
    setCheckedStudents(prevChecked => [...prevChecked, email]);
    console.log(checkedStudents);
  }
  const removeEmail = (studentIdToRemove) => {

    setCheckedStudents(prevChecked => prevChecked.filter(studentId => studentId !== studentIdToRemove));
    console.log(checkedStudents);

  }
  const handleChapterChange = (e) => {
    setChapter(e.target.value);
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  useEffect(() => {
    setStart(0);
    setStudents([]);
    if (Class && Section) {
      fetchStudentList();
    }
  }, [Class, Section])

  useEffect(() => {
    if (Class && Section && start != 0) {
      fetchStudentList();
    }
  }, [start]);

  const handleViewMore = () => {
    if (Students.length >= start + end) {
      setStart(start + end);
    }
  }

  const fetchStudentList = async () => {

    let data = JSON.stringify({
      "accessToken": authState.accessToken,
      "currentClass": Class,
      "section": Section,
      "start": start,
      "end": end
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL_Login}/fetchMultiple/student`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        setStudents(prevState => [...prevState, ...response.data.Students])
      })
      .catch((error) => {
        console.log(error);
      });

  }

  const handleSave = () => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if (checkedStudents.length > 0 && chapter != "" && topic != "" && Subject && Class && Section && session) {
      let data = JSON.stringify({
        "class": Class,
        "section": Section,
        "date": `${year}-${month}-${day}`,
        "chapter": chapter,
        "topic": topic,
        "session": session,
        "subject": Subject,
        "submittedBy": checkedStudents
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BASE_URL_Login}/notebook/upload/`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authState.accessToken}`
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          setChapter("");
          setTopic('');
          setCheckedStudents([]);
          toast.success("Notebook record created successfully!");
        })
        .catch((error) => {
          toast.error(error.response.data.error);
        });

    } else {
      toast.error("Please fill all the field");
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-col mobile:max-tablet:flex-col-reverse justify-between tablet:items-center px-4 pb-0 mb-2 overflow-auto"
    >
      <ToastContainer />
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="flex items-center justify-between mb-4"
      >
        <div className="mobile:max-tablet:flex-row flex">
          <div className="w-2/5 mobile:max-tablet:w-1/3 mr-2">
            <label htmlFor="chapter" className="block text-sm font-medium text-gray-700">Chapter</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              id="chapter"
              name="chapter"
              value={chapter}
              onChange={handleChapterChange}
              className="mt-1 block w-full px-3 mobile:max-tablet:py-1 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
          <div className="w-2/5 ml-2 mobile:max-tablet:w-1/3">
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              id="topic"
              name="topic"
              value={topic}
              onChange={handleTopicChange}
              className="mt-1 block mobile:max-tablet:py-1 w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
        </div>
        <div className="w-1/5 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xl mt-8 text-green-500 border border-green-500 px-4 rounded-md shadow-md font-medium mb-2 hover:bg-green-600 hover:text-white hover:border-white flex items-center"
            onClick={handleSave}
          >
            <FaSave className="mr-2" />
            Save
          </motion.button>
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="overflow-x-auto rounded-lg"
      >
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-400  to-indigo-200 text-lg leading-normal">
              <th className="py-2 px-6 text-center rounded-t-r whitespace-nowrap">Roll No.</th>
              <th className="py-2 px-6 text-center">Name</th>
              <th className="py-2 px-6 text-center">Date</th>
              <th className="py-2 px-6 text-center">Chapter</th>
              <th className="py-2 px-6 text-center">Topic</th>
              <th className="py-2 px-6 text-center rounded-t-l whitespace-nowrap">Notebook Checked</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-md font-normal">
            {Students.map((Student, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-gray-200 last:border-none"
              >
                <td className="py-3 px-6 text-center whitespace-nowrap">{Student.rollNumber}</td>
                <td className="flex py-3 px-6 text-center items-center gap-2 whitespace-nowrap">
                  <img src={Student.profileLink} alt="img" className="rounded-full h-10 w-10" />
                  {Student.name}
                </td>
                <td className="py-3 px-6 text-center whitespace-nowrap">{date.toDateString()}</td>
                <td className="py-3 px-6 text-center">{chapter}</td>
                <td className="py-3 px-6 text-center">{topic}</td>
                <td className="py-3 px-6 text-center flex justify-center">
                  <Switch addEmail={addEmail} checked={checkedStudents.includes(Student.email)} email={Student.email} removeEmail={removeEmail} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
      {Students.length >= start + end && (
        <motion.h1
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-blue-400 text-center text-lg hover:text-blue-600 hover:cursor-pointer mt-4 flex items-center justify-center"
          onClick={handleViewMore}
        >
          <FaBookOpen className="mr-2" />
          View more
        </motion.h1>
      )}
    </motion.div>
  );
};

export default NewNoteBookRecord;
