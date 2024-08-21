import React, { useContext, useEffect, useState } from "react";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../../../../Context/AuthContext";
import axios from "axios";
import Switch from "./switch";
import {  ToastContainer } from "react-toastify";
import { BASE_URL_Login } from "../../../../../Config";
import { motion } from "framer-motion";
import { AiOutlineArrowLeft } from "react-icons/ai";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const RecordDetailsHOD = () => {
  const { id } = useParams();
  const query = useQuery();
  const { authState } = useContext(AuthContext);
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
      url: `${BASE_URL_Login}/notebook/fetch/teacher/particular?docId=${id}&session=${session}`,
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
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
      className=" items-center w-full  px-4 py-3 mb-2"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <motion.h1
          className="text-3xl font-bold text-blue-600 mobile:max-tablet:text-2xl whitespace-nowrap mb-2 "
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Pending Notebooks
        </motion.h1>
        <motion.Link
          to="/Teacher-Dashboard/HOD/notebook"
          className="flex items-center text-blue-500 hover:text-blue-700 hover:cursor-pointer transition-colors duration-300"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={goBack}
        >
          <AiOutlineArrowLeft className="mr-2" />
          Back
        </motion.Link>
      </div>
      <div className="w-full overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-blue-400 to-blue-200 text-lg leading-normal">
              <th className="py-2 px-6 text-center rounded-t-r whitespace-nowrap">
                Roll No.
              </th>
              <th className="py-2 px-6 text-center">Name</th>
              <th className="py-2 px-6 text-center">Date</th>
              <th className="py-2 px-6 text-center">Chapter</th>
              <th className="py-2 px-6 text-center ">Topic</th>
              <th className="py-2 px-6 text-center rounded-t-l whitespace-nowrap">
                Notebook Checked
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-md font-normal ">
            {notSubmittedBy.map((Student, index) => (
              <motion.tr
                key={index}
                className="border-b border-gray-200  last:border-none"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  {Student.rollNumber}
                </td>
                <td className="flex py-3 px-6 text-center items-center gap-2 whitespace-nowrap">
                  <img
                    src={Student.profileLink}
                    alt="img"
                    className="rounded-full h-10 w-10"
                  />
                  {Student.name}
                </td>
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  {new Date(date).toDateString()}
                </td>
                <td className="py-3 px-6 text-center">{chapter}</td>
                <td className="py-3 px-6 text-center whitespace-nowrap">{topic}</td>
                <td className="py-3 px-6 text-center">{chapter}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <motion.h1
        className="text-3xl font-bold text-blue-600 mobile:max-tablet:text-2xl whitespace-nowrap my-3"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Checked Notebooks
      </motion.h1>

      <div className="w-full overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-blue-400 to-blue-200 text-lg leading-normal">
              <th className="py-2 px-6 text-center rounded-t-r whitespace-nowrap">
                Roll No.
              </th>
              <th className="py-2 px-6 text-center">Name</th>
              <th className="py-2 px-6 text-center">Date</th>
              <th className="py-2 px-6 text-center">Chapter</th>
              <th className="py-2 px-6 text-center ">Topic</th>
              <th className="py-2 px-6 text-center rounded-t-l whitespace-nowrap">
                Notebook Checked
              </th>
              <th className="py-2 px-6 text-center rounded-t-l">Checked</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-md font-normal ">
            {submittedBy.map((Student, index) => (
              <motion.tr
                key={index}
                className="border-b border-gray-200  last:border-none"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  {Student.rollNumber}
                </td>
                <td className="flex py-3 px-6 text-center items-center gap-2 whitespace-nowrap">
                  <img
                    src={Student.profileLink}
                    alt="img"
                    className="rounded-full h-10 w-10"
                  />
                  {Student.name}
                </td>
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  {new Date(date).toDateString()}
                </td>
                <td className="py-3 px-6 text-center">{chapter}</td>
                <td className="py-3 px-6 text-center whitespace-nowrap">{topic}</td>
                <td className="py-3 px-6 text-center">{chapter}</td>
                <td className="flex py-3 px-6 justify-center">
                  <Switch checked={true}  />
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