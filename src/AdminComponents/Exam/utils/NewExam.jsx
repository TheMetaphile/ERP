import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';

const NewExam = ({ onClose, addExam }) => {
  const { authState } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [examData, setExamData] = useState({
    Class: '',
    subject: '',
    time: '',
    date: '',
    duration: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamData({ ...examData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    console.log(examData)
    try {
      const response = await axios.post('https://examapi-jep8.onrender.com/ScheduleExams', {
        accessToken: authState.accessToken,
        ...examData
      });

      if (response.status === 200) {
        addExam(response.data);
        setExamData({
          Class: '',
          subject: '',
          time: '',
          date: '',
          duration: '',
        });
        onClose();
      } else {
        setError("Failed to add Exam. Try again after some time.");
        setTimeout(() => {
          setError('');
      }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error adding exam. Please try again.');
      setTimeout(() => {
        setError('');
    }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-lg">
        <button
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-2xl mb-4">Schedule New Exam</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-xl mb-2" htmlFor="examClass">
              Class
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="examClass"
              name="Class"
              value={examData.Class}
              onChange={handleChange}
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
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-xl mb-2" htmlFor="subject">
              Subject Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="subject"
              type="text"
              name="subject"
              value={examData.subject}
              onChange={handleChange}
              placeholder="Enter Subject Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-xl mb-2" htmlFor="date">
              Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              type="date"
              name="date"
              value={examData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-xl mb-2" htmlFor="time">
              Time
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="time"
              type="time"
              name="time"
              value={examData.time}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-xl mb-2" htmlFor="duration">
              Duration (in hrs)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="duration"
              type="text"
              name="duration"
              value={examData.duration}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewExam;
