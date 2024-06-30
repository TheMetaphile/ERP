import React, { useState } from "react";
import TeacherAttendanceDetails from "./utils/TeacherAttendanceDetails";
import SearchBar from "./utils/SearchBar";

export default function TeacherAttendance() {
    const userData = [
        { teacher: "Abhishek", designation: "Hindi Teacher", date: "12.03.24", status: "Absent", totalHour: "7.5 min" },
        { teacher: "Abhishek", designation: "Hindi Teacher", date: "12.03.24", status: "Present", totalHour: "7.5 min" },
        { teacher: "Abhishek", designation: "Hindi Teacher", date: "12.03.24", status: "Present", totalHour: "7.5 min" },
        { teacher: "Abhishek", designation: "Hindi Teacher", date: "12.03.24", status: "Absent", totalHour: "7.5 min" },
        { teacher: "Abhishek", designation: "Hindi Teacher", date: "12.03.24", status: "Present", totalHour: "7.5 min" },
        { teacher: "Abhishek", designation: "Hindi Teacher", date: "12.03.24", status: "Present", totalHour: "7.5 min" },
        { teacher: "ram", designation: "Hindi Teacher", date: "12.03.24", status: "Present", totalHour: "7.5 min" },
        { teacher: "Abhishek", designation: "Hindi Teacher", date: "12.03.24", status: "Present", totalHour: "7.5 min" },
        { teacher: "Abhishek", designation: "Hindi Teacher", date: "12.03.24", status: "Present", totalHour: "7.5 min" },
        { teacher: "Abhishek", designation: "Hindi Teacher", date: "12.03.24", status: "Present", totalHour: "7.5 min" },
        { teacher: "Abhishek", designation: "Hindi Teacher", date: "12.03.24", status: "Present", totalHour: "7.5 min" },
    ];
    const [teacher, setTeacher] = useState('');
    const handleNameChange = (event) => {
        setTeacher(event.target.value);
    };
    const filteredTeachers = userData.filter(user => {
        const nameMatch = user.teacher.toLowerCase().includes(teacher.toLowerCase());

        return nameMatch;
    });

    return (
        <div className="flex flex-col mx-2 my-2 mobile:max-tablet:mt-6 ">
            <div>
                <SearchBar handleNameChange={handleNameChange} name={teacher} />
            </div>
            <div>
                {
                    filteredTeachers.length === 0 ? (
                        <TeacherAttendanceDetails userData={userData} />
                    ) : (
                        <TeacherAttendanceDetails userData={filteredTeachers} />
                    )
                }
            </div>
        </div>

    )
}