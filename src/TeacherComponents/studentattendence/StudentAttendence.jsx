import React, { useState } from "react";
import Profile from '../../assets/Test Account.png'
function StudentAttendance() {
    const [students, setStudents] = useState([
        {
            name: "Abhishek",
            class: "A",
            present: true,
            absent: false,
            late: false,
        },

        {
            name: "Bhanu",
            class: "B",
            present: false,
            absent: true,
            late: false,
        },
        {
            name: "Chetan",
            class: "C",
            present: false,
            absent: false,
            late: true,
        },
        {
            name: "Dharmesh",
            class: "D",
            present: true,
            absent: false,
            late: false,
        }, 
    ]);

    const handleAttendance = (index, type) => {
        const updatedStudents = [...students];
        const student = updatedStudents[index];

        switch (type) {
            case "present":
                student.present = !student.present;
                student.absent = false;
                student.late = false;
                break;
            case "absent":
                student.absent = !student.absent;
                student.present = false;
                student.late = false;
                break;
            case "late":
                student.late = !student.late;
                student.present = false;
                student.absent = false;
                break;
            default:
                break;
        }

        setStudents(updatedStudents);
    };
    return (
        <div className="w-full flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2  mb-3 no-scrollbar">
            <div className="container mx-auto p-4">
                <h1 className="text-2xl  mb-4">Student Attendance</h1>
                <div className="flex justify-between mb-4">
                    <div className="w-1/3">
                        <select className="w-full px-4 py-2 border rounded-md">
                            <option value="">Select Class</option>
                            <option value="Pre-Nursery">Pre-Nursery</option>
                            <option value="Nursery">Nursery</option>
                            <option value="L.K.J">L.K.J</option>
                            <option value="U.K.J">U.K.J</option>
                            <option value="1st">1st</option>
                            <option value="2nd">2nd</option>
                            <option value="3rd">3rd</option>
                            <option value="4th">4th</option>
                            <option value="5th">5th</option>
                            <option value="6th">6th</option>
                            <option value="7th">7th</option>
                            <option value="8th">8th</option>
                            <option value="9th">9th</option>
                            <option value="10th">10th</option>
                            <option value="11th">11th</option>
                            <option value="12th">12th</option>
                        </select>
                    </div>
                    <div className="w-1/3">
                        <select className="w-full px-4 py-2 border rounded-md">
                            <option value="">Select Subject</option>
                            <option value="Maths">Maths</option>
                            <option value="Science">Science</option>
                            <option value="English">English</option>
                        </select>
                    </div>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-md">
                        Take Attendance
                    </button>
                </div>
                <div className=" border rounded-lg shadow-md mt-2">
                    {students.map((student, index) => (
                        <div
                            key={index}
                            className=" p-4  items-center "
                        >
                            <div className="flex w-full  items-center">
                                <span className="mr-2 ">{student.class}</span>
                                <div className="bg-gray-300 h-1 w-full"></div>
                            </div>
                            <div className="flex w-full  justify-between items-center border p-2 rounded-lg">
                                <div className="flex items-center  px-3">
                                    <img src={Profile} alt="User image" className="w-7 h-7"></img>
                                    <span className="ml-2 ">{student.name}</span>

                                </div>
                                <div className="flex items-center space-x-2 ">
                                    <button
                                        className={`px-2  rounded-full ${student.present ? "bg-green-500 text-white" : "bg-gray-300"
                                            }`}
                                        onClick={() => handleAttendance(index, "present")}
                                    >
                                        P
                                    </button>
                                    <button
                                        className={`px-2  rounded-full ${student.absent ? "bg-red-500 text-white" : "bg-gray-300"
                                            }`}
                                        onClick={() => handleAttendance(index, "absent")}
                                    >
                                        A
                                    </button>
                                    <button
                                        className={`px-2  rounded-full ${student.late ? "bg-yellow-500 text-white" : "bg-gray-300"
                                            }`}
                                        onClick={() => handleAttendance(index, "late")}
                                    >
                                        L
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default StudentAttendance