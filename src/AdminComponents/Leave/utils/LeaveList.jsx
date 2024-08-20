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
        <div className="bg-white p-4 r w-full flex flex-col">

            <div className="flex gap-10  mobile:max-tablet:gap-4 mobile:max-tablet:justify-between">
                <button className={`p-2 mx-1 ${selectedRole === 'student' ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"}`}
                    onClick={() => selectRole('student')}>Student</button>
                <button className={`p-2 mx-1 ${selectedRole === 'teacher' ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"}`}
                    onClick={() => selectRole('teacher')}>Teacher</button>
                <button className={`p-2 mx-1 ${selectedRole === 'employee' ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"}`}
                    onClick={() => selectRole('employee')}>Employee</button>
            </div>


            <div className="full h-1 border-b-2 border-gray-300 mt-1"></div>
            <div className="mt-2">
                {selectedRole === 'teacher' && (
                    <div className="">
                        <TeacherLeaves />
                    </div>
                )}

                {selectedRole === 'employee' && (
                    <div className="">
                        <EmployeeLeaves />
                    </div>
                )}

                {selectedRole === 'student' && (
                    <div className="">
                        <StudentLeaves />
                    </div>
                )}

            </div>
        </div>
    );
};

export default LeaveCard;
