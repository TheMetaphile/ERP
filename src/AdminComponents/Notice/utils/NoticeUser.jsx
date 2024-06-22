import React, { useState } from "react";
import AnnouncementList from "./NoticeList";


const NoticeUser = () => {
    const [selectedRole, setSelectedRole] = useState('teacher');

    const selectRole = (role) => {
        setSelectedRole(role);
    };
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

    return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full flex flex-col">
           <div className="flex justify-between">
           <div className="flex gap-10  mobile:max-tablet:gap-4">
                <button className={`text-xl px-4 border border-gray-300 ${selectedRole === 'all' ? 'bg-blue-400' : 'bg-gray-300'} rounded-lg`}
                    onClick={() => selectRole('all')}>All</button>
                <button className={`text-xl border border-gray-300 ${selectedRole === 'student' ? 'bg-blue-400' : 'bg-gray-300'} rounded-lg px-4`}
                    onClick={() => selectRole('student')}>Student</button>
                <button className={`text-xl border border-gray-300 ${selectedRole === 'teacher' ? 'bg-blue-400' : 'bg-gray-300'} rounded-lg px-4`}
                    onClick={() => selectRole('teacher')}>Teacher</button>
                 <button className={`text-xl border border-gray-300 ${selectedRole === 'employee' ? 'bg-blue-400' : 'bg-gray-300'} rounded-lg px-4`}
                    onClick={() => selectRole('employee')}>Employee</button>
            </div>
            <div className="flex justify-between mobile:max-tablet:gap-2">
                <div><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mobile:max-tablet:py-0 mobile:max-tablet:px-2" onClick={handleOpenModal}>Write Notice</button></div>
            </div>
            </div>
            <div className="full h-1 border-b-2 border-gray-300 mt-1"></div>
            <div className="mt-2">
                {selectedRole === 'teacher' && (
                    <div className="">
                    <AnnouncementList/>
                   </div>
                )}

                {selectedRole === 'employee' && (
                    <div className="">
                    <AnnouncementList/>
                   </div>
                )}

                {selectedRole === 'student' && (
                    <div className="">
                    <AnnouncementList/>
                    </div>
                )}
                {selectedRole === 'all' && (
                    <div className="">
                     <AnnouncementList/>
                    </div>
                )}
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

export default NoticeUser;
