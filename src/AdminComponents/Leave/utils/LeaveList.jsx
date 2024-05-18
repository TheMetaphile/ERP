import React, { useState } from "react";
import StudentLeaves from "./StudentLeaves";

const LeaveCard = () => {
    const [selectedRole, setSelectedRole] = useState('teacher');

    const selectRole = (role) => {
        setSelectedRole(role);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full flex flex-col">
           
            <div className="flex gap-10  mobile:max-tablet:gap-4">
                <button className={`text-xl px-4 ${selectedRole === 'all' ? 'text-red-600' : 'text-black'} rounded-lg bg-blue-300`}
                    onClick={() => selectRole('all')}>All</button>
                <button className={`text-xl  ${selectedRole === 'student' ? 'text-red-600' : 'text-black'} rounded-lg px-4 bg-blue-300`}
                    onClick={() => selectRole('student')}>Student</button>
                <button className={`text-xl  ${selectedRole === 'teacher' ? 'text-red-600' : 'text-black'} rounded-lg px-4 bg-blue-300`}
                    onClick={() => selectRole('teacher')}>Teacher</button>
                 <button className={`text-xl ${selectedRole === 'employee' ? 'text-red-600' : 'text-black'} rounded-lg px-4 bg-blue-300`}
                    onClick={() => selectRole('employee')}>Employee</button>
            </div>
            
       
            <div className="full h-1 border-b-2 border-gray-300"></div>
            <div className="mt-2">
                {selectedRole === 'teacher' && (
                    <div className="">
                    <StudentLeaves/>
                   </div>
                )}

                {selectedRole === 'employee' && (
                    <div className="">
                    <StudentLeaves/>
                   </div>
                )}

                {selectedRole === 'student' && (
                    <div className="">
                     <StudentLeaves/>
                    </div>
                )}
                {selectedRole === 'all' && (
                    <div className="">
                     <StudentLeaves/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeaveCard;
