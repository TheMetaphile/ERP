import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { StructureProvider } from './utils/TimetableContext';

function TimeTable() {
    const navigate = useNavigate();
    const [role, setRole] = useState('Student');

    const handleRoleChange = (event) => {
        const selectedRole = event.target.value;
        setRole(selectedRole);

        const routes = {
            Teacher: '/Admin-Dashboard/timetable/teacher',
            Student: '/Admin-Dashboard/timetable/student'
        };
        
        navigate(routes[selectedRole]);
    };

    return (
        <StructureProvider>
            <div className="flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar mobile:max-tablet:mt-4">
                <div className='flex justify-between items-center w-full mobile:max-tablet:flex-col mobile:max-tablet:items-baseline'>
                    <h1 className='text-2xl whitespace-nowrap'>Time Table</h1>
                    <div className="flex gap-4 px-3 py-2 mt-2 text-lg justify-between mobile:max-tablet:pl-0">
                        <label className="text-lg font-medium text-center">
                            <input
                                type="radio"
                                name="role"
                                value="Teacher"
                                checked={role === "Teacher"}
                                onChange={handleRoleChange}
                                className="mr-3 w-4 h-4"
                            />
                            Teacher
                        </label>
                        <label className="text-lg font-medium text-center">
                            <input
                                type="radio"
                                name="role"
                                value="Student"
                                checked={role === "Student"}
                                onChange={handleRoleChange}
                                className="mr-3 w-4 h-4"
                            />
                            Student
                        </label>
                    </div>
                </div>
                <Outlet />
            </div>
        </StructureProvider>
    );
}

export default TimeTable;
