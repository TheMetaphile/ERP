import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
function ClassActivity() {

    const menuItems = [
        // {
        //     title: "Overview",
        //     route: ""
        // },
        {
            title: "Time Table",
            route: "/Teacher-Dashboard/class_activity/timetablestudent"
        },
        {
            title: "Show Result",
            route: "/Teacher-Dashboard/class_activity/reportcard"
        },
        {
            title: "Upload Result",
            route: "/Teacher-Dashboard/class_activity/uploadResult"
        },
        {
            title: "Fee Status",
            route: "/Teacher-Dashboard/class_activity/studentfee"
        },
        {
            title: "Student Attendance",
            route: "/Teacher-Dashboard/class_activity/studentAttendence"
        },
        {
            title: "Student Leave",
            route: "/Teacher-Dashboard/class_activity/studentleave"
        },

    ];
    const [idx,setidx]= useState(0)
    return (
        <div className=" flex flex-col px-3 border border-gray-300 items-center mobile:max-tablet:px-0 h-screen overflow-y-auto rounded-lg shadow-md py-2 ml-2 mr-3 no-scrollbar">
            <nav className='w-full'>
                <ul className="flex w-full bg-blue-100 overflow-x-auto rounded-lg py-2 px-5 border border-gray-400 items-center mobile:max-tablet:text-sm justify-center">
                    {
                        menuItems.map((item,index) => {
                            return (
                                <li className="mr-4 w-fit whitespace-nowrap" key={index}>
                                    <Link to={item.route} className={`text-black ${idx===index? "bg-secondary" : ""} font-medium hover:bg-blue-300 hover:text-white px-2 py-1 rounded-lg`} onClick={()=>{setidx(index)}}>{item.title}</Link>
                                </li>
                            )
                        })
                    }
                   
                </ul>
            </nav>
            <Outlet />
        </div>

    )
}

export default ClassActivity