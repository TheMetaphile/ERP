import React from "react";
import AttendanceSearchBar from "./utils/AttendanceSearchBar";
import TeacherAttendanceDetails from "./utils/TeacherAttendanceDetails";

export default function TeacherAttendance(){
    return(
        <div className="flex flex-col mx-2 my-2">
        <div>
            <AttendanceSearchBar/>
        </div>
        <div>
           <TeacherAttendanceDetails/>
        </div>
        </div>

    )
}