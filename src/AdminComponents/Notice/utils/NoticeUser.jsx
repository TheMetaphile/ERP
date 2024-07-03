import React, { useState } from "react";
import AnnouncementList from "./NoticeList";
import NewNotice from "./NewNotice";


const NoticeUser = () => {
  const [selectedRole, setSelectedRole] = useState('teacher');
  const [showModal, setShowModal] = useState(false);

  const selectRole = (role) => {
    setSelectedRole(role);
  };
 

  const handleOpenModal = () => {
    setShowModal(true);
  };

  

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full flex flex-col">
      <div className="flex justify-between mobile:max-tablet:flex-col mobile:max-tablet:gap-2">
        <div className="flex gap-10  mobile:max-tablet:flex-col mobile:max-tablet:gap-2">
          <button className={`text-xl px-4 border border-gray-300 ${selectedRole === 'all' ? 'bg-blue-400' : 'bg-gray-300'} rounded-lg`}
            onClick={() => selectRole('all')}>All</button>
          <button className={`text-xl border border-gray-300 ${selectedRole === 'student' ? 'bg-blue-400' : 'bg-gray-300'} rounded-lg px-4`}
            onClick={() => selectRole('student')}>Student</button>
          <button className={`text-xl border border-gray-300 ${selectedRole === 'teacher' ? 'bg-blue-400' : 'bg-gray-300'} rounded-lg px-4`}
            onClick={() => selectRole('teacher')}>Teacher</button>
          {/* <button className={`text-xl border border-gray-300 ${selectedRole === 'employee' ? 'bg-blue-400' : 'bg-gray-300'} rounded-lg px-4`}
            onClick={() => selectRole('employee')}>Employee</button> */}
        </div>
        <div className="flex justify-between mobile:max-tablet:gap-2">
          <div><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mobile:max-tablet:py-0 mobile:max-tablet:px-2" onClick={handleOpenModal}>Write Notice</button></div>
        </div>
      </div>
      <div className="full h-1 border-b-2 border-gray-300 mt-1"></div>
      <div className="mt-2">
        {selectedRole === 'teacher' && (
          <div className="">
            <AnnouncementList />
          </div>
        )}

        {selectedRole === 'employee' && (
          <div className="">
            <AnnouncementList />
          </div>
        )}

        {selectedRole === 'student' && (
          <div className="">
            <AnnouncementList />
          </div>
        )}
        {selectedRole === 'all' && (
          <div className="">
            <AnnouncementList />
          </div>
        )}
      </div>
      {showModal ? <NewNotice setShowModal={setShowModal}/> : <></>}
    </div>
  );
};

export default NoticeUser;
