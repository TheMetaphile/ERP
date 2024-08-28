import React, { useState } from "react";
import AllNotice from "./AllNotice";
import NewNotice from "./NewNotice";
import StudentNotice from "./StudentNotice";
import TeacherNotice from "./TeacherNotice";
import ClassNotice from "./ClassNotice";
import { ToastContainer } from "react-toastify";
import SubAdminNotice from "./SubAdminNotice";

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
        <div className="flex gap-10  mobile:max-tablet:whitespace-nowrap mobile:max-laptop:gap-2">
          <button className={`p-2 mx-1 ${selectedRole === 'all' ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"}`}
            onClick={() => selectRole('all')}>For All</button>
          <button className={`p-2 mx-1 ${selectedRole === 'student' ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"}`}
            onClick={() => selectRole('student')}>Student</button>
          <button className={`p-2 mx-1 ${selectedRole === 'teacher' ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"}`}
            onClick={() => selectRole('teacher')}>Teacher</button>
          <button className={`p-2 mx-1 ${selectedRole === 'class' ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"}`}
            onClick={() => selectRole('class')}>Class</button>
          <button className={`p-2 mx-1 ${selectedRole === 'subAdmin' ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"}`}
            onClick={() => selectRole('subAdmin')}>Sub Admin</button>
        </div>
        <div className="flex justify-between mobile:max-tablet:gap-2">
          <div><button className="bg-purple-200 hover:bg-purple-500 font-bold py-2 px-4 rounded mobile:max-tablet:py-0 mobile:max-tablet:px-2" onClick={handleOpenModal}>Write Notice</button></div>
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
        {selectedRole === 'subAdmin' && (
          <div className="">
            <SubAdminNotice />
          </div>
        )}
      </div>
      {showModal ? <NewNotice setShowModal={setShowModal} /> : <></>}
    </div>
  );
};

export default NoticeUser;
