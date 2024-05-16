import React, { useState } from 'react';

const AnnouncementList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Student');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const announcements = [
    {
      date: '26 Feb 2023',
      time: '10:00 am',
      message: 'All The Teacher have to Come on Sunday Due to Some important Meeting.',
    },
    {
        date: '26 Feb 2023',
        time: '10:00 am',
        message: 'All The Teacher have to Come on Sunday Due to Some important Meeting.',
    },
    {
        date: '26 Feb 2023',
        time: '10:00 am',
        message: 'All The Teacher have to Come on Sunday Due to Some important Meeting.',
    },
    {
        date: '26 Feb 2023',
        time: '10:00 am',
        message: 'All The Teacher have to Come on Sunday Due to Some important Meeting.',
    },
    {
        date: '26 Feb 2023',
        time: '10:00 am',
        message: 'All The Teacher have to Come on Sunday Due to Some important Meeting.',
    },
    {
        date: '26 Feb 2023',
        time: '10:00 am',
        message: 'All The Teacher have to Come on Sunday Due to Some important Meeting.',
    },
    {
        date: '26 Feb 2023',
        time: '10:00 am',
        message: 'All The Teacher have to Come on Sunday Due to Some important Meeting.',
    },
   ];
   const colors = ['bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-purple-200'];

  return (
    <div className="mt-8 mx-2">
      <div className="flex justify-between mb-4 mobile:max-tablet:gap-2">
                <div className="flex gap-8">
                    <h1 className="text-xl">All</h1>
                    <h1 className="text-xl">Student</h1>
                    <h1 className="text-xl">Teachers</h1>
                </div>
                <div><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mobile:max-tablet:py-0 mobile:max-tablet:px-2" onClick={handleOpenModal}>Write Notice</button></div>
            </div>
      <div className="">
      <div className="flex flex-col space-y-4 mb-4">
        {announcements.map((announcement, index) => (
          <div
            key={index}
            className={`rounded-md border p-4 ${colors[index % colors.length]}`}
          >
            <p className="text-lg font-semibold mb-2">{announcement.message}</p>
            <div className="flex justify-between text-gray-600">
              <span>Date: {announcement.date}</span>
              <span>Time: {announcement.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 ">
            <h2 className="text-xl font-bold mobile:max-tablet:font-normal mobile:max-tablet:w-1/4 mb-4">Write Notice</h2>
            <div className="flex space-x-4 mb-4">
              <button
                className={`px-4 py-2 rounded-lg ${
                  selectedOption === 'Student'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
                onClick={() => handleOptionChange('Student')}
              >
                Student
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  selectedOption === 'Teacher'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
                onClick={() => handleOptionChange('Teacher')}
              >
                Teacher
              </button>
            </div>
            <select className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2">
              <option>Select Class</option>
            </select>
            <textarea
              className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Write a Notice up to 300 words..."
              rows={4}
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleCloseModal}
              >
                Send
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementList;