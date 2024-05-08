import React from 'react'
import { Link, Outlet } from "react-router-dom";
import ProgressCards from "../assignment_report/utils/progressBarRow";
import Calendar from '../Attendance/utils/CalendarTile';
import AttendenceTable from './utils/AttendenceTable';
import ApplyLeave from './utils/ApplyLeave'

export default function leave() {
    return (
        <div className=" flex flex-col px-3  overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar">
            <h1 className='text-xl'>Your Leave</h1>
            <br></br>
            <h1 className=" text-base">Total Leave</h1>
            <ProgressCards />
            <h1 className=" text-xl">Total New Leave</h1>
            <div className="flex w-full tablet:justify-evenly my-4 mobile:max-tablet:flex-col items-center">
                <div className="tablet:w-2/3 tablet:pr-6 mobile:max-tablet:w-full mobile:max-tablet:pr-7 mobile:max-tablet:mb-5 py-2">
                    <Calendar />
                </div>
                <div className=" tablet:w-1/3 px-2 mobile:max-tablet:w-full h-full rounded-lg shadow-md">
                    <ApplyLeave/>
                </div>
            </div>
            <h1 className=" text-xl">Old Leave</h1>
            <AttendenceTable />
        </div>
    )
}

