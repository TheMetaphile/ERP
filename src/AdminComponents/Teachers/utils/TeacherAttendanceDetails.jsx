import React from "react";
import { userimg } from "./images";
export default function TeacherAttendanceDetails({ userData }) {
    return (
        <div className="flex flex-col">
            <div className="flex mobile:max-tablet:gap-4 items-center justify-between p-2 mb-2 gap-8 ">

                <div className="flex w-1/4">
                    <div className="w-12  mobile:max-tablet:hidden"></div>
                    <h1 className="text-xl mobile:max-tablet:text-sm  mobile:max-tablet:font-semibold">Teacher</h1>
                </div>
                <div className="text-xl w-1/4 mobile:max-tablet:text-sm mobile:max-tablet:font-semibold">
                    Designation
                </div>
                <div className="text-xl w-1/4 mobile:max-tablet:text-sm mobile:max-tablet:font-semibold">
                    Date
                </div>
                <div className={`text-xl mobile:max-tablet:text-sm w-1/4 mobile:max-tablet:font-semibold`}>
                    Status
                </div>
                <div className="mx-4 text-xl w-1/4 mobile:max-tablet:text-sm  mobile:max-tablet:mx-0 mobile:max-tablet:font-semibold">
                    Total Hours
                </div>
            </div>

            {userData.map((user, index) => (
                <div key={index} className="flex mobile:max-tablet:gap-4 items-center justify-between border rounded-lg p-2 mb-2 gap-8 shadow-md">

                    <div className="flex w-1/4 mobile:max-tablet:mb-2">
                        <img src={userimg} alt="" className="h-12 w-12 mr-3 mobile:max-tablet:hidden" />
                        <div className="">
                            <h1 className="text-xl mt-2 mobile:max-tablet:text-sm">{user.teacher}</h1>
                        </div>
                    </div>
                    <div className="text-lg w-1/4 mobile:max-tablet:text-sm whitespace-nowrap">
                        {user.designation}
                    </div>
                    <div className="text-lg w-1/4 mobile:max-tablet:text-sm">
                        <h1>{user.date}</h1>
                    </div>
                    <div className={`${user.status === 'Present' ? 'text-green-500' : 'text-red-500'} text-xl mobile:max-tablet:text-sm w-1/4`}>
                        {user.status}
                    </div>
                    <div className="mx-4 text-lg w-1/4 mobile:max-tablet:text-sm  mobile:max-tablet:mx-0">
                        {user.totalHour}
                    </div>
                </div>
            ))}
        </div>
    );








}

