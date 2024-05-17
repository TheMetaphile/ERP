
import React, { useState } from 'react';
import TimePicker from "react-time-picker";

const NewExam = ({ onClose, addExam }) => {
  const [examData, setExamData] = useState({
    name: '',
    subject: '',
    Time: '',
    date: '',
    duration: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamData({ ...examData, [name]: value });
  };
  const [time, setTime] = useState("12:00");

  const handleTimeChange = (newTime) => {
    setTime(newTime);
    setExamData({ ...examData, Time: newTime }); // Update the Time property in examData
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addExam(examData);
    setExamData({
      class: '',
      subject: '',
      Time: '',
      date: '',
      duration: '',
    });
    onClose();
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
        <h2 className="text-2xl font-bold mb-4">Schedule New Exam</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="examName">
              Class
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="examName"
              type="text"
              name="class"
              value={examData.class}
              onChange={handleChange}
              placeholder="Enter Class"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
              Subject Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="text"
              type="text"
              name='subject'
              value={examData.subject}
              onChange={handleChange}
              placeholder='Enter Subject Name'
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
              Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              type="date"
              name='date'
              value={examData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
              Time
            </label>
            <TimePicker
              className="border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleTimeChange}
              value={time}
              format={"hh:mm a"} // Update the format to 12-hour
              clearIcon={null} // To remove the clear icon
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duaration">
              Duration(in hrs)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="duaration"
              type="duaration"
              name='duration'
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
