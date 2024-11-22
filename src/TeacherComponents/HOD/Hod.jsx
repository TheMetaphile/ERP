import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

function Hod() {
    const menuItems = [
        {
            title: "Weekly Plan",
            route: "/Teacher-Dashboard/HOD/planner"
        },
        {
            title: "NoteBook Record",
            route: "/Teacher-Dashboard/HOD/notebook"
        },
        {
            title: "Substitute Class Teacher",
            route: "/Teacher-Dashboard/HOD/classTeacherSubstitute"
        },
        {
            title: "Lecture Substitute",
            route: "/Teacher-Dashboard/HOD/lectureSubstitute"
        },
        {
            title: "Students Result",
            route: "/Teacher-Dashboard/HOD/studentResult"
        },
        {
            title: "Students Doubts",
            route: "/Teacher-Dashboard/HOD/studentDoubts"
        },

    ];
    const [idx, setidx] = useState(0)
    return (
        <div className=" flex flex-col px-3  items-center mobile:max-tablet:px-0 h-screen rounded-lg  py-2 ml-2 mr-3">
            <nav className='w-full'>
                <ul className="flex w-full overflow-x-auto   py-2 px-5 border-b pb-0 items-center mobile:max-tablet:text-sm mobile:max-tablet:justify-normal justify-center mobile:max-tablet:pl-0">
                    {
                        menuItems.map((item, index) => {
                            return (
                                <li className="mr-4 w-fit whitespace-nowrap p-2" key={index}>
                                    <Link to={item.route} className={`text-black  ${idx === index ? " text-blue-600 border-b-2 border-blue-600" : ""} font-medium  p-2`} onClick={() => { setidx(index) }}>{item.title}</Link>
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


export default Hod