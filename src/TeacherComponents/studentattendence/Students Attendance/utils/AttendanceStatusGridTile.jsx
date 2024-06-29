import React, { useState } from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';
import { FaCheck, FaTimes, FaExclamation } from "react-icons/fa";

export default function AttendanceStatusGridTile({ data }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const handleStudentClick = (index) => {
        setSelectedStudent(index);
    };

    const currentDate = new Date();
    const startDate = startOfMonth(currentDate);
    const endDate = endOfMonth(currentDate);
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

    const students = Object.values(data.output).filter(item => item.name);

    return (
        <div className="w-full flex mb-2">
            <div className="flex w-full h-full overflow-x-auto mt-3 items-start">
                {dateRange.map((date, index) => (
                    <div key={index} className="flex h-full items-start">
                        <div className="flex flex-col justify-center w-fit" key={index}>
                            {index === 0 &&
                                students.map((student, index2) => (
                                    <div className={`flex flex-col`} key={index2}>
                                        {index2 === 0 ? (
                                            <div>
                                                <h1 className="font-semibold h-12 text-xl border border-black px-2 pt-2 bg-secondary">Students</h1>
                                                <h1 className={`font-normal text-lg h-12 text-start whitespace-nowrap border border-black px-2 pt-2 hover:cursor-pointer ${selectedStudent === index2 ? 'bg-blue-200' : "bg-secondary"}`} onClick={() => handleStudentClick(index2)}>
                                                    {student.name}
                                                </h1>
                                            </div>
                                        ) : (
                                            <h1 className={`font-normal text-lg h-12 text-start whitespace-nowrap border border-black px-2 pt-2 hover:cursor-pointer ${selectedStudent === index2 ? 'bg-blue-200' : "bg-secondary"}`} onClick={() => handleStudentClick(index2)}>
                                                {student.name}
                                            </h1>
                                        )}
                                    </div>
                                ))
                            }
                        </div>
                        <div className={`flex flex-col justify-start items-center h-12 ${selectedDate === index ? "bg-blue-200" : "bg-secondary"}`}>
                            <div className="flex flex-col w-12 items-center h-12 border border-black hover:cursor-pointer" onClick={() => handleDateClick(index)}>
                                <span className="font-semibold text-lg">{format(date, 'd')}</span>
                                <span className={`text-sm text-gray-500`}>{format(date, 'EEE')}</span>
                            </div>
                            <div className={`flex flex-col justify-center`}>
                                {students.map((student, index2) => (
                                    <div key={index2} className={`flex justify-center font-normal text-lg w-12 h-12 whitespace-nowrap border px-2 pt-3 ${selectedDate === index ? "bg-blue-200" : ""} ${selectedStudent === index2 ? "bg-blue-200" : ""} ${selectedStudent === index2 && selectedDate === index ? "bg-blue-300" : ""}`}>
                                        {
                                            student[format(date, 'dd/MM/yyyy')] === 'Present' || student[format(date, 'yyyy-MM-dd')] === 'Present' ? (
                                                <FaCheck className={`${selectedDate !== index ? "text-green-400" : "text-green-600"} ${selectedStudent !== index2 ? "text-green-400" : "text-green-600"} ${selectedStudent === index2 && selectedDate === index ? "text-green-700" : ""}`} />
                                            ) :
                                                student[format(date, 'dd/MM/yyyy')] === 'Absent' || student[format(date, 'yyyy-MM-dd')] === 'Absent' ? (
                                                    <FaTimes className={`${selectedDate !== index ? "text-red-400" : "text-red-600"} ${selectedStudent !== index2 ? "text-red-400" : "text-red-600"} ${selectedStudent === index2 && selectedDate === index ? "text-red-700" : ""}`} />
                                                ) :
                                                    student[format(date, 'dd/MM/yyyy')] === 'Leave' || student[format(date, 'yyyy-MM-dd')] === 'Leave' ? (
                                                        <FaExclamation className={`${selectedDate !== index ? "text-yellow-400" : "text-yellow-600"} ${selectedStudent !== index2 ? "text-red-400" : "text-red-600"} ${selectedStudent === index2 && selectedDate === index ? "text-red-700" : ""}`} />
                                                    ) : (
                                                        <div>_ _</div>
                                                    )
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
