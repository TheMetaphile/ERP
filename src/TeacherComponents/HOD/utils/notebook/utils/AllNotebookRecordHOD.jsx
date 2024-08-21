import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../../../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL_Login } from "../../../../../Config";
import AllNoteBookRecordRow from "./AllNoteBookRecordRow";
import { motion } from "framer-motion";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

const AllNoteBookRecordHOD = ({ Class, Section, Subject }) => {
  const { authState } = useContext(AuthContext);
  const [records, SetRecord] = useState([]);
  const [start, SetStart] = useState(0);
  const date = new Date();
  var session =
    date.getMonth() + 1 < 4
      ? `${date.getFullYear() - 1}-` + `${date.getFullYear()}`.substring(2, 4)
      : `${date.getFullYear()}-` + `${date.getFullYear() + 1}`.substring(2, 4);
  const end = 10;

  useEffect(() => {
    SetRecord([]);
    SetStart(0);
    console.log(Class, Subject, Section);
    if (Class && Subject && Section) {
      fetchRecord();
    }
  }, [Class, Subject, Section]);

  useEffect(() => {
    if (Class && Subject && Section && start != 0) {
      fetchRecord();
    }
  }, [start]);

  const fetchRecord = async () => {
    console.log("esesaes", session);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL_Login}/notebook/fetch/coordinator/all?class=${Class}&section=${Section}&subject=${Subject}&session=${session}&start=${start}&count=${end}`,
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        SetRecord((prevState) => [...prevState, ...response.data.notebookRecord]);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.error);
      });
  };

  const handleViewMore = () => {
    if (records.length >= start + end) {
      SetStart(start + end);
    }
  };

  return (
    <motion.div
      className="flex-col mobile:max-tablet:flex-col-reverse justify-between tablet:items-center px-4 pb-0  mb-2 overflow-auto mobile:max-tablet:px-0"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer />
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-blue-400 to-blue-200 text-lg leading-normal">
              <th className="py-2 px-6 text-center rounded-t-r">Date</th>
              <th className="py-2 px-6 text-center">Chapter</th>
              <th className="py-2 px-6 text-center ">Topic</th>
              <th className="py-2 px-6 text-center rounded-t-l whitespace-nowrap">
                Notebook Checked
              </th>
              <th className="py-2 px-6 text-center rounded-t-l">Details</th>
              <th className="py-2 px-6 text-center rounded-t-l">Remark</th>
              <th className="py-2 px-6 text-center rounded-t-l">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-md font-normal ">
            {records.map((record, index) => (
              <AllNoteBookRecordRow record={record} index={index} />
            ))}
          </tbody>
        </table>
      </div>
      <h1
        className={`text-blue-400 text-center text-lg hover:text-blue-600 hover:cursor-pointer ${
          records.length < start + end ? "hidden" : ""
        }`}
        onClick={handleViewMore}

      >
        View more{" "}
        {records.length >= start + end ? (
          <AiOutlineArrowDown className="inline-block" />
        ) : (
          <AiOutlineArrowUp className="inline-block" />
        )}
      </h1>
    </motion.div>
  );
};

export default AllNoteBookRecordHOD;