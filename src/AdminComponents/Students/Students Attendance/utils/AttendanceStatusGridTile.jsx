import React from "react";
import { useState } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay } from 'date-fns';
import { FaCheck, FaTimes } from "react-icons/fa";

export default function AttendanceStatusGridTile() {
    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateClick = (date) => {
        setSelectedDate(date);
    };
    const [selectedStudent, setSelectedStudent] = useState(null);
    const handleStudentClick = (index) => {
        setSelectedStudent(index);
    };
    const StudentsAttendanceList = [
        { name: 'Abhishake' },
        { name: 'Avni' },
        { name: 'Bhuvneshwar Tyagi' },
        { name: 'Shailesh' },
        { name: 'Ankit' },
        { name: 'Tushar' },
        { name: 'Umang' },
        { name: 'Mukul' },
    ]
    const currentDate = new Date();
    const startDate = startOfMonth(currentDate);
    const endDate = endOfMonth(currentDate);
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });
    return (
        <div className="flex">

            <div className="flex w-full h-full overflow-x-auto mt-3 items-start">
                {dateRange.map((date, index) => (
                    <div
                        key={index}
                        className="flex h-full items-start"
                    >
                        <div className="flex flex-col justify-center w-fit ">
                            {
                                index == 0
                                    ?
                                    StudentsAttendanceList.map((StudentAttendance, index2) => (
                                        <div className={`flex flex-col `} key={index2}>
                                            {index2 === 0 ? (
                                                <div>
                                                    <h1 className="font-semibold h-12 text-xl border border-black px-2 pt-2 bg-secondary">Students</h1>
                                                    <h1 className={`font-normal text-lg h-12 text-start whitespace-nowrap border border-black px-2 pt-2 hover:cursor-pointer ${selectedStudent==index2 ? 'bg-blue-200' : "bg-secondary"}`}  onClick={() => handleStudentClick(index2)}>
                                                        {StudentAttendance.name}
                                                    </h1>
                                                </div>
                                            ) : (
                                                <h1 className={`font-normal text-lg h-12 text-start whitespace-nowrap border border-black px-2 pt-2 hover:cursor-pointer ${selectedStudent==index2 ? 'bg-blue-200' : "bg-secondary"}`} onClick={() => handleStudentClick(index2)}>
                                                    {StudentAttendance.name}
                                                </h1>
                                            )}
                                        </div>
                                    ))
                                    :
                                    <div>
                                    </div>
                            }
                        </div>




                        <div className={`flex flex-col justify-start items-center h-12  ${selectedDate == index ? "bg-blue-200" : "bg-secondary"}`}>
                            <div className="flex flex-col w-12 items-center h-12 border border-black hover:cursor-pointer"  onClick={() => handleDateClick(index)}>
                                <span className="font-semibold text-lg">{format(date, 'd')}</span>
                                <span className={`text-sm  text-gray-500 `}>{format(date, 'EEE')}</span>
                            </div>
                            <div className={`flex flex-col justify-center `}>
                                {

                                    StudentsAttendanceList.map((StudentAttendance, index2) => (
                                        <div className={`flex justify-center font-normal text-lg w-12 h-12 whitespace-nowrap border px-2 pt-3 ${selectedDate == index ? "bg-blue-200" : ""} ${selectedStudent == index2 ? "bg-blue-200" : ""} ${selectedStudent == index2 && selectedDate == index ? "bg-blue-300" : ""}`}>
                                            {
                                                format(date, 'EEE') != 'Sun' && format(date, 'EEE') != 'Sat'
                                                ?
                                                format(date, 'EEE') != 'Thu'
                                                ?
                                                <FaCheck className={`${selectedDate != index ? "text-green-400" : "text-green-600"} ${selectedStudent != index2 ? "text-green-400" : "text-green-600"} ${selectedStudent == index2 && selectedDate == index ? "text-green-700" : ""}  `} />
                                                :
                                                <FaTimes className={`${selectedDate != index ? "text-red-400" : "text-red-600"} ${selectedStudent != index2 ? "text-red-400" : "text-red-600"} ${selectedStudent == index2 && selectedDate == index ? "text-red-700" : ""}`}/>
                                                :
                                                <div>
                                                    _ _
                                                </div>
                                            }
                                        </div>
                                    ))
                                }
                            </div>


                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}