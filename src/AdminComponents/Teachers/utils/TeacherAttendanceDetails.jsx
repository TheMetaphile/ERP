import React from "react";
import { userimg } from "./images";
export default function TeacherAttendanceDetails() {
    const userData = [
        { teacher: "Abhishek", designation: "Hindi Teacher", date: "12.03.24", status: "Absent", totalHour: "7.5 min" },
        { teacher: "Abhishek", designation: "Hindi Teacher", date: "12.03.24", status: "Present", totalHour: "7.5 min" },
        { teacher: "Abhishek", designation: "Hindi Teacher", date: "12.03.24", status: "Present", totalHour: "7.5 min" },
        { teacher: "Abhishek", designation: "Hindi Teacher", date: "12.03.24", status: "Absent", totalHour: "7.5 min" },
        { teacher: "Abhishek", designation: "Hindi Teacher", date: "12.03.24", status: "Present", totalHour: "7.5 min" },
        { teacher: "Abhishek", designation: "Hindi Teacher", date: "12.03.24", status: "Present", totalHour: "7.5 min" },
        { teacher: "Abhishek", designation: "Hindi Teacher", date: "12.03.24", status: "Present", totalHour: "7.5 min" },
    ];
    const heading=[
        {teacher:"Teacher",designation:"Designation", date: "Date", status: "Status", totalHour: "Total Hours" }
    ]
    return (
        <div className="mx-3 flex flex-col">
            {heading.map((heading, index) => (
                <div key={index} className="flex mobile:max-tablet:flex-col mobile:max-tablet:gap-2 items-center justify-between p-4 mb-2 gap-4">

                    <div className="mx-4">
                         <h1 className="text-2xl mt-2">{heading.teacher}</h1>
                        </div>
                   
                    <div className="text-2xl">
                        {heading.designation}
                    </div>
                    <div className="text-2xl mt-2">
                        <h1>{heading.date}</h1>
                    </div>
                    <div className="text-2xl mt-2">
                        <h1>{heading.status}</h1>
                    </div>
                    <div className="text-2xl">
                        {heading.totalHour}
                    </div>
                </div>

            ))}
            {userData.map((user, index) => (
                <div key={index} className="flex mobile:max-tablet:flex-col mobile:max-tablet:gap-2 items-center justify-between border rounded-lg p-4 mb-2 gap-4 shadow-md">

                    <div className="flex">
                        <img src={userimg} alt="" className="h-12 w-12 mr-3" />
                        <div className="">
                            <h1 className="text-xl mt-2">{user.teacher}</h1>
                        </div>
                    </div>
                    <div className="text-lg">
                        {user.designation}
                    </div>
                    <div className="text-lg mt-2">
                        <h1>{user.date}</h1>
                    </div>
                    <div className={`${user.status === 'Present' ? 'text-green-500' : 'text-red-500'}`}>
                        {user.status}
                    </div>
                    <div className="text-lg">
                        {user.totalHour}
                    </div>
                </div>

            ))}
        </div>
    );
}