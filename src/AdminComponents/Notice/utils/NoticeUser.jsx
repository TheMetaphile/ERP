import React, { useState } from "react";
import AnnouncementList from "./NoticeList";


const NoticeUser = () => {
    const [selectedRole, setSelectedRole] = useState('teacher');

    const selectRole = (role) => {
        setSelectedRole(role);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full flex flex-col">
           
            <div className="flex gap-10  mobile:max-tablet:gap-4">
                <button className={`text-xl  ${selectedRole === 'all' ? 'text-blue-400' : 'text-red-400'}`}
                    onClick={() => selectRole('all')}>All</button>
                <button className={`text-xl  ${selectedRole === 'student' ? 'text-blue-400' : 'text-red-400'}`}
                    onClick={() => selectRole('student')}>Student</button>
                <button className={`text-xl  ${selectedRole === 'teacher' ? 'text-blue-400' : 'text-red-400'}`}
                    onClick={() => selectRole('teacher')}>Teacher</button>
                 <button className={`text-xl ${selectedRole === 'employee' ? 'text-blue-400' : 'text-red-400'}`}
                    onClick={() => selectRole('employee')}>Employee</button>
            </div>
            
       
            <div className="full h-1 border-b-2 border-gray-300"></div>
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
        </div>
    );
};

export default NoticeUser;
