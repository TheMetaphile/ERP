import React from "react";
import { userimg } from "./images";
export default function TeacherAttendanceDetails({ userData }) {
    return (
        <div className="flex flex-col overflow-auto border rounded-lg shadow-md border-gray-300">
            <div className="flex mobile:max-tablet:gap-4 items-center justify-between p-2 mb-2 mobile:max-laptop:w-fit w-full tablet:max-laptop:gap-8">
                <div className="flex w-40 ">
                    <h1 className="text-2xl mobile:max-tablet:text-sm  mobile:max-tablet:font-semibold mx-auto ">Teacher</h1>
                </div>
                <div className="text-2xl w-40 mobile:max-tablet:text-sm mobile:max-tablet:font-semibold">
                    Designation
                </div>
                <div className="text-2xl w-40 mobile:max-tablet:text-sm mobile:max-tablet:font-semibold">
                    Date
                </div>
                <div className={`text-2xl mobile:max-tablet:text-sm w-40 mobile:max-tablet:font-semibold`}>
                    Status
                </div>
                <div className="mx-4 text-2xl w-28 mobile:max-tablet:text-sm  mobile:max-tablet:mx-0 mobile:max-tablet:font-semibold whitespace-nowrap">
                    Total Hours
                </div>
            </div>

            {userData.map((user, index) => (
                <div key={index} className="flex mobile:max-tablet:w-fit w-full mobile:max-tablet:gap-4 items-center justify-between border border-gray-200 rounded-lg p-2  gap-8 shadow-md tablet:max-laptop:w-fit">

                    <div className="flex w-40 mobile:max-tablet:mb-2 items-center">
                        <img src={userimg} alt="" className="h-8 w-8 mr-3 rounded-full" />
                        <div className="">
                            <h1 className="text-xl mobile:max-tablet:text-sm whitespace-nowrap">{user.teacher}</h1>
                        </div>
                    </div>
                    <div className="text-lg w-40 mobile:max-tablet:text-sm whitespace-nowrap">
                        {user.designation}
                    </div>
                    <div className="text-lg w-40 mobile:max-tablet:text-sm">
                        <h1>{user.date}</h1>
                    </div>
                    <div className={`${user.status === 'Present' ? 'text-green-500' : 'text-red-500'} text-xl mobile:max-tablet:text-sm w-40`}>
                        {user.status}
                    </div>
                    <div className="mx-4 text-lg w-28 mobile:max-tablet:text-sm  mobile:max-tablet:mx-0">
                        {user.totalHour}
                    </div>
                </div>
            ))}
        </div>
    );








}

