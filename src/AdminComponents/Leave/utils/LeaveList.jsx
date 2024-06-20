import React, { useState } from "react";
import StudentLeaves from "./StudentLeaves";
import TeacherLeaves from "./TeacherLeaves"
import EmployeeLeaves from "./EmployeeLeaves"
const LeaveCard = () => {
    const [selectedRole, setSelectedRole] = useState('teacher');

    const selectRole = (role) => {
        setSelectedRole(role);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full flex flex-col">
           
            <div className="flex gap-10  mobile:max-tablet:gap-4">
                <button className={`text-xl border border-gray-300 ${selectedRole === 'student' ? 'bg-blue-400' : 'bg-white'} rounded-lg px-4`}
                    onClick={() => selectRole('student')}>Student</button>
                <button className={`text-xl border border-gray-300 ${selectedRole === 'teacher' ? 'bg-blue-400' : 'bg-white'} rounded-lg px-4`}
                    onClick={() => selectRole('teacher')}>Teacher</button>
                 <button className={`text-xl border border-gray-300 ${selectedRole === 'employee' ? 'bg-blue-400' : 'bg-white'} rounded-lg px-4`}
                    onClick={() => selectRole('employee')}>Employee</button>
            </div>
            
       
            <div className="full h-1 border-b-2 border-gray-300 mt-1"></div>
            <div className="mt-2">
                {selectedRole === 'teacher' && (
                    <div className="">
                    <TeacherLeaves/>
                   </div>
                )}

                {selectedRole === 'employee' && (
                    <div className="">
                    <EmployeeLeaves />
                   </div>
                )}

                {selectedRole === 'student' && (
                    <div className="">
                     <StudentLeaves/>
                    </div>
                )}

            </div>
        </div>
    );
};

export default LeaveCard;
