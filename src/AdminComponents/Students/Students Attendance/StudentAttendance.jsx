import React from "react";
import AttendanceStatusGridTile from "./utils/AttendanceStatusGridTile";
import SearchBar from "./utils/SearchBar";

export default function StudentAttendance(){
    return(
        <div className="flex flex-col mx-2 mt-4">
            <div className="text-3xl mx-2 px-4">Student's Attendance Details</div>
            <div className="mx-2 mt-4">
                <SearchBar/>
            </div>
        <div className="flex flex-col shadow-lg rounded-lg border-gray-200 mb-4">
        <div className="mx-4 text-xl px-4 mt-4">
            Attendance Sheet Of Class 1st : Section A April,2024
        </div>
        <div className="px-3">
            <AttendanceStatusGridTile/>
        </div>
        </div>
        </div>
    )
}