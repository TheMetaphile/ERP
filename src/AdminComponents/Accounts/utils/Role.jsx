import React, { useState } from "react";
import StudentsFees from "./StudentsFees";
import TeacherSalary from "./TeacherSalary";


const RoleCard = () => {
    const [selectedRole, setSelectedRole] = useState('teacher');

    const selectRole = (role) => {
        setSelectedRole(role);
    };

    return (
        <div className="bg-white p-4 rounded-lg  w-full flex flex-col">
            <div className="flex justify-between">
            <div className="flex gap-10  mobile:max-tablet:gap-4">
                <button className={`text-xl  ${selectedRole === 'student' ? 'text-blue-400' : 'text-red-400'}`}
                    onClick={() => selectRole('student')}>Student</button>
                <button className={`text-xl  ${selectedRole === 'teacher' ? 'text-blue-400' : 'text-red-400'}`}
                    onClick={() => selectRole('teacher')}>Teacher</button>
            </div>
            <div><button className="rounded-lg text-xl border px-2">Edit</button></div>
            </div>
       
            <div className="full h-1 border-b-2 border-gray-300"></div>
            <div className="mt-2">
                {selectedRole === 'teacher' && (
                    <div className="">
                      <TeacherSalary/>
                   </div>
                )}
                {selectedRole === 'student' && (
                    <div className="">
                      <StudentsFees/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoleCard;
