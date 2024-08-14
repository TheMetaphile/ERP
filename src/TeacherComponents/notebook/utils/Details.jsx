import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from 'react-router-dom';
import AuthContext from "../../../Context/AuthContext";
import axios from "axios";
import Switch from "./switch";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL_Login } from '../../../Config'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const RecordDetails = () => {
  const { id } = useParams();
  const query = useQuery();
  const { authState } = useContext(AuthContext);
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
      url: `${BASE_URL_Login}/notebook/fetch/teacher/particular?docId=${id}&session=${session}`,
      headers: {
        'Authorization': `Bearer ${authState.accessToken}`
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
      url: `${BASE_URL_Login}/notebook/update/submission`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authState.accessToken}`
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
    <div className=" items-center  px-4 py-1 mb-2">
      <ToastContainer />
      <div className="flex justify-between">
        <h1 className="text-xl font-medium mb-2 mobile:max-tablet:text-lg">Pending Notebooks</h1>
        <button className="text-xl mobile:max-tablet:text-sm text-green-500 border border-green-500 px-4  rounded-md shadow-md font-medium mb-2 hover:bg-green-600 hover:text-white hover:border-white" onClick={handleSave}>
          Save
        </button>
      </div>
      <div className="w-full overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-secondary text-gray-600 text-lg leading-normal">

              <th className="py-2 px-6 text-center rounded-t-r whitespace-nowrap">Roll No.</th>
              <th className="py-2 px-6 text-center">Name</th>

              <th className="py-2 px-6 text-center">Date</th>

              <th className="py-2 px-6 text-center">Chapter</th>
              <th className="py-2 px-6 text-center ">Topic</th>
              <th className="py-2 px-6 text-center rounded-t-l whitespace-nowrap">Notebook Checked</th>
              <th className="py-2 px-6 text-center rounded-t-l">Checked</th>


            </tr>
          </thead>
          <tbody className="text-gray-600 text-md font-normal ">
            {notSubmittedBy.map((Student, index) => (

              <tr key={index} className="border-b border-gray-200  last:border-none">

                <td className="py-3 px-6 text-center whitespace-nowrap">{Student.rollNumber}</td>
                <td className="flex py-3 px-6 text-center items-center gap-2 whitespace-nowrap"><img src={Student.profileLink} alt="img" className="rounded-full h-10 w-10" />{Student.name}</td>
                <td className="py-3 px-6 text-center whitespace-nowrap">{new Date(date).toDateString()}</td>
                <td className="py-3 px-6 text-center">{chapter}</td>
                <td className="py-3 px-6 text-center whitespace-nowrap">{topic}</td>
                <td className="py-3 px-6 text-center">{chapter}</td>
                <td className="flex py-3 px-6 justify-center">
                  <Switch checked={checkedStudents.includes(Student.email)} addEmail={addEmail} removeEmail={removeEmail} email={Student.email} />
                </td>



              </tr>

            ))}
          </tbody>
        </table>
      </div>

      <h1 className="text-xl font-medium my-3">Checked Notebooks</h1>

      <div className="w-full overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-secondary text-gray-600 text-lg leading-normal">

              <th className="py-2 px-6 text-center rounded-t-r whitespace-nowrap">Roll No.</th>
              <th className="py-2 px-6 text-center">Name</th>

              <th className="py-2 px-6 text-center">Date</th>

              <th className="py-2 px-6 text-center">Chapter</th>
              <th className="py-2 px-6 text-center ">Topic</th>
              <th className="py-2 px-6 text-center rounded-t-l whitespace-nowrap">Notebook Checked</th>
              <th className="py-2 px-6 text-center rounded-t-l">Checked</th>


            </tr>
          </thead>
          <tbody className="text-gray-600 text-md font-normal ">
            {submittedBy.map((Student, index) => (

              <tr key={index} className="border-b border-gray-200  last:border-none">

                <td className="py-3 px-6 text-center whitespace-nowrap">{Student.rollNumber}</td>
                <td className="flex py-3 px-6 text-center items-center gap-2 whitespace-nowrap"><img src={Student.profileLink} alt="img" className="rounded-full h-10 w-10" />{Student.name}</td>
                <td className="py-3 px-6 text-center whitespace-nowrap">{new Date(date).toDateString()}</td>
                <td className="py-3 px-6 text-center">{chapter}</td>
                <td className="py-3 px-6 text-center whitespace-nowrap">{topic}</td>
                <td className="py-3 px-6 text-center">{chapter}</td>
                <td className="flex py-3 px-6 justify-center">
                  <Switch checked={true} addEmail={addEmail} />
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecordDetails;
