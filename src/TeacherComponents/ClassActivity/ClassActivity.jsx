import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
function ClassActivity() {

    const menuItems = [
        {
            title: "Overview",
            route: ""
        },
        {
            title: "Time Table",
            route: ""
        },
        {
            title: "Show Result",
            route: "/Teacher-Dashboard/class_activity/reportcard"
        },
        {
            title: "Upload Result",
            route: ""
        },

    ];
    const [idx,setidx]= useState(0)
    return (
        <div className=" flex flex-col px-3  items-center mobile:max-tablet:px-0 h-screen overflow-y-auto rounded-lg shadow-md mt-2 ml-2 mr-3 no-scrollbar">
            <nav>
                <ul className="flex w-full bg-blue-100 rounded-lg py-2 px-5 border border-gray-400 items-center mobile:max-tablet:text-sm">
                    {
                        menuItems.map((item,index) => {
                            return (
                                <li className="mr-4" key={index}>
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