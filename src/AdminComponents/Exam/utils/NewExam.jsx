import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewExam = ({ onClose, addExam }) => {
  const { authState } = useContext(AuthContext);
  const [selectedTerm, setSelectedTerm] = useState('');
  const [exams, setExams] = useState([
    {
      Class: '',
      subject: '',
      time: '',
      date: '',
      duration: '',
    },
  ]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newExams = [...exams];
    newExams[index][name] = value;
    setExams(newExams);
  };

  const addNewExam = () => {
    setExams([
      ...exams,
      {
        Class: '',
        subject: '',
        time: '',
        date: '',
        duration: '',
      },
    ]);
  };

  const handleTermChange = (e) => {
    const { value } = e.target;
    setSelectedTerm(value);
    const newExams = exams.map((exam) => ({
      ...exam,
      term: value,
    }));
    setExams(newExams);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onClose();
    console.log('Exams:', exams);
    // try {
    //   const response = await axios.post('https://examapi-jep8.onrender.com/ScheduleExams', {
    //     accessToken: authState.accessToken,
    //     ...examData
    //   });

    //   if (response.status === 200) {
    //     console.log('Success from toast')
    //     toast.success('Exam Added')

    //     addExam(response.data);
    //     setExamData({
    //       Class: '',
    //       subject: '',
    //       time: '',
    //       date: '',
    //       duration: '',
    //     });
    //     onClose();
    //   } else {
    //     toast.error('Failed to add Exam. Try again after some time.');

    //   }
    // } catch (error) {
    //   const errorMessage = error.response?.data?.error || 'An error occurred';
    //   toast.error(errorMessage);
    // }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-y-auto no-scrollbar">
      <ToastContainer />
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-3xl">
        <button
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-2xl mb-4">Schedule New Exams</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="term" className="block text-gray-700 font-bold mb-2">
              Select Term:
            </label>
            <select
              id="term"
              name="term"
              value={selectedTerm}
              onChange={handleTermChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>Select Term</option>
              <option value="1">Term 1</option>
              <option value="2">Term 2</option>
            </select>
          </div>
          <table className=" bg-white ">
            <thead>
              <tr>
                <th className="py-2">Class</th>
                <th className="py-2">Subject</th>
                <th className="py-2">Date</th>
                <th className="py-2">Time</th>
                <th className="py-2">Duration</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam, index) => (
                <tr key={index} className=' bg-red-300'>
                  <td className="border px-4 py-2">
                    <select
                      className="w-full"
                      name="Class"
                      value={exam.Class}
                      onChange={(e) => handleChange(index, e)}
                      required
                    >
                      <option value="" disabled>Select Class</option>
                      <option value="Pre-Nursery">Pre-Nursery</option>
                      <option value="Nursery">Nursery</option>
                      <option value="L.K.J">L.K.J</option>
                      <option value="U.K.J">U.K.J</option>
                      <option value="1st">1st</option>
                      <option value="2nd">2nd</option>
                      <option value="3rd">3rd</option>
                      <option value="4th">4th</option>
                      <option value="5th">5th</option>
                      <option value="6th">6th</option>
                      <option value="7th">7th</option>
                      <option value="8th">8th</option>
                      <option value="9th">9th</option>
                      <option value="10th">10th</option>
                      <option value="11th">11th</option>
                      <option value="12th">12th</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <select
                      className="w-full"
                      name="subject"
                      value={exam.subject}
                      onChange={(e) => handleChange(index, e)}
                      required
                    >
                      <option value="" disabled>Select Subject</option>
                      <option value="Hindi">Hindi</option>
                      <option value="English">English</option>
                      <option value="Maths">Maths</option>
                      <option value="Science">Science</option>
                      <option value="Social Science">Social Science</option>
                      <option value="Drawing">Drawing</option>
                      <option value="Computer">Computer</option>
                      <option value="Sanskrit">Sanskrit</option>
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Economics">Economics</option>
                      <option value="Business">Business</option>
                      <option value="Accounts">Accounts</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="w-full"
                      type="date"
                      name="date"
                      value={exam.date}
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="w-full"
                      type="time"
                      name="time"
                      value={exam.time}
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <select
                      className="w-full"
                      name="duration"
                      value={exam.duration}
                      onChange={(e) => handleChange(index, e)}
                      required
                    >
                      <option value="" disabled>Select Duration</option>
                      <option value="1:00 hr">1:00 hr</option>
                      <option value="1:30 hr">1:30 hr</option>
                      <option value="2:00 hr">2:00 hr</option>
                      <option value="2:30 hr">2:30 hr</option>
                      <option value="3:00 hr">3:00 hr</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={addNewExam}
            >
              Add New
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewExam;

