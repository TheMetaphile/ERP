import React, { useState } from "react";
import AllNotice from "./AllNotice";
import NewNotice from "./NewNotice";
import StudentNotice from "./StudentNotice";
import TeacherNotice from "./TeacherNotice";
import ClassNotice from "./ClassNotice";
import { ToastContainer } from "react-toastify";

const NoticeUser = () => {
  const [selectedRole, setSelectedRole] = useState('all');
  const [showModal, setShowModal] = useState(false);

  const selectRole = (role) => {
    setSelectedRole(role);
  };


  const handleOpenModal = () => {
    setShowModal(true);
  };



  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full flex flex-col">
      <ToastContainer />
      <div className="flex justify-between mobile:max-tablet:flex-col mobile:max-laptop:gap-2">
        <div className="flex gap-10  mobile:max-tablet:flex-col mobile:max-laptop:gap-2">
          <button className={`text-xl mobile:max-laptop:text-xl mobile:max-laptop:py-0 mobile:max-laptop:px-2 px-4 border border-gray-300 ${selectedRole === 'all' ? 'bg-blue-400' : 'bg-gray-300'} rounded-lg`}
            onClick={() => selectRole('all')}>For All</button>
          <button className={`text-xl mobile:max-laptop:text-xl mobile:max-laptop:py-0 mobile:max-laptop:px-2 border border-gray-300 ${selectedRole === 'student' ? 'bg-blue-400' : 'bg-gray-300'} rounded-lg px-4`}
            onClick={() => selectRole('student')}>Student</button>
          <button className={`text-xl mobile:max-laptop:text-xl mobile:max-laptop:py-0 mobile:max-laptop:px-2 border border-gray-300 ${selectedRole === 'teacher' ? 'bg-blue-400' : 'bg-gray-300'} rounded-lg px-4`}
            onClick={() => selectRole('teacher')}>Teacher</button>
          <button className={`text-xl mobile:max-laptop:text-xl mobile:max-laptop:py-0 mobile:max-laptop:px-2 border border-gray-300 ${selectedRole === 'class' ? 'bg-blue-400' : 'bg-gray-300'} rounded-lg px-4`}
            onClick={() => selectRole('class')}>Class</button>
        </div>
        <div className="flex justify-between mobile:max-tablet:gap-2">
          <div><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mobile:max-tablet:py-0 mobile:max-tablet:px-2" onClick={handleOpenModal}>Write Notice</button></div>
        </div>
      </div>
      <div className="full h-1 border-b-2 border-gray-300 mt-1"></div>
      <div className="mt-2">
        {selectedRole === 'teacher' && (
          <div className="">
            <TeacherNotice />
          </div>
        )}

        {selectedRole === 'class' && (
          <div className="">
            <ClassNotice />
          </div>
        )}
        {selectedRole === 'student' && (
          <div className="">
            <StudentNotice />
          </div>
        )}
        {selectedRole === 'all' && (
          <div className="">
            <AllNotice />
          </div>
        )}
      </div>
      {showModal ? <NewNotice setShowModal={setShowModal} /> : <></>}
    </div>
  );
};

export default NoticeUser;
