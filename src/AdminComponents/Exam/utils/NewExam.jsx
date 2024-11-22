import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_Exam } from '../../../Config';
import { motion } from 'framer-motion';
import { IoMdCloseCircleOutline } from "react-icons/io";

const NewExam = ({ onClose, addExam }) => {
  const { authState } = useContext(AuthContext);
  const [selectedTerm, setSelectedTerm] = useState('');
  const [classs, setClass] = useState('');
  const [stream, setStream] = useState('');
  const [exams, setExams] = useState([
    {
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

  const handleStreamChange = (e) => {
    setStream(e.target.value);
  };

  const handleClassChange = (e) => {
    setClass(e.target.value);
  };

  const addNewExam = () => {
    setExams([
      ...exams,
      {
        subject: '',
        time: '',
        date: '',
        duration: '',
      },
    ]);
  };

  const removeNewExam = () => {
    if (exams.length > 0) {
      setExams(exams.slice(0, -1));  // Remove the last exam entry
    }
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


    const schedules = exams.map(exam => ({
      subject: exam.subject,
      date: exam.date,
      time: exam.time,
      duration: exam.duration,
    }));

    const examData = {
      accessToken: authState.accessToken,
      stream: stream || "Not applicable",
      class: classs,
      term: selectedTerm,
      schedule: schedules,
    };

    console.log('examData', examData)
    try {
      const response = await axios.post(`${BASE_URL_Exam}/ScheduleExams`, examData);

      if (response.status === 200) {
        toast.success('Exam Added')
        addExam(examData);
      } else {
        toast.error('Failed to add Exam. Try again after some time.');

      }
    } catch (error) {
      const errorMessage = error.response?.data?.error;
      toast.error(errorMessage);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-y-auto no-scrollbar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl mobile:max-tablet:p-4 mobile:max-sm:w-11/12"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          className="absolute top-0 right-0 mt-4 mr-4 text-red-500 hover:text-red-700 text-xl"
          onClick={onClose}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <IoMdCloseCircleOutline />
        </motion.button>
        <motion.h2
          className="text-2xl mobile:max-tablet:text-lg mb-4 text-purple-600 font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Schedule New Exams
        </motion.h2>
        <form onSubmit={handleSubmit}>
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-4 w-full md:w-1/3">
              <label
                htmlFor="class"
                className="block font-bold mb-2 text-purple-600"
              >
                Select Class
              </label>
              <select
                className="w-full p-2 border border-purple-400 rounded-md"
                name="Class"
                value={classs}
                onChange={handleClassChange}
                required
              >
                <option value="" disabled>
                  Select Class
                </option>
                <option value="Pre-Nursery">Pre-Nursery</option>
                <option value="Nursery">Nursery</option>
                <option value="L.K.G">L.K.G</option>
                <option value="U.K.G">U.K.G</option>
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
            </div>

            <div className="mb-4 w-full md:w-1/3">
              <label
                htmlFor="term"
                className="block font-bold mb-2 text-purple-600"
              >
                Select Term
              </label>
              <select
                id="term"
                name="term"
                value={selectedTerm}
                onChange={handleTermChange}
                className="w-full p-2 border border-purple-400 rounded-md"
                required
              >
                <option value="" disabled>
                  Select Term
                </option>
                <option value="1">Term 1</option>
                <option value="2">Term 2</option>
              </select>
            </div>

            <div className="mb-4 w-full md:w-1/3">
              <label
                htmlFor="stream"
                className="block font-bold mb-2 text-purple-600"
              >
                Stream
              </label>
              <select
                id="stream"
                name="stream"
                value={stream}
                onChange={handleStreamChange}
                className="w-full p-2 border border-purple-400 rounded-md"
              >
                <option value="" disabled>
                  Select Stream (optional)
                </option>
                <option value="PCM">PCM</option>
                <option value="PCB">PCB</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
              </select>
            </div>
          </motion.div>

          <div className="overflow-x-auto">
            <motion.table
              className="bg-white w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <thead>
                <tr>
                  <th className="py-2 text-purple-600 font-medium">Subject</th>
                  <th className="py-2 text-purple-600 font-medium">Date</th>
                  <th className="py-2 text-purple-600 font-medium">Time</th>
                  <th className="py-2 text-purple-600 font-medium">Duration</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam, index) => (
                  <motion.tr
                    key={index}
                    className="border-b border-gray-200 last:border-none"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
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
                        <option value="" disabled>
                          Select Duration
                        </option>
                        <option value="1:00 hr">1:00 hr</option>
                        <option value="1:30 hr">1:30 hr</option>
                        <option value="2:00 hr">2:00 hr</option>
                        <option value="2:30 hr">2:30 hr</option>
                        <option value="3:00 hr">3:00 hr</option>
                      </select>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          </div>

          <motion.div
            className="flex flex-wrap items-center justify-between mt-4 gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={addNewExam}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add Row
            </motion.button>
            <motion.button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={removeNewExam}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Remove Row
            </motion.button>
            <motion.button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>

  );
};

export default NewExam;

