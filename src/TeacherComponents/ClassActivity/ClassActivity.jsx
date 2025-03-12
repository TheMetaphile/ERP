import React, { useState, useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import AuthContext from '../../Context/AuthContext'

function ClassActivity() {
    const { darkMode } = useContext(AuthContext);

    const bgClass = darkMode ? 'bg-gray-900' : 'bg-white';
    const textClass = {
        default: darkMode ? 'text-gray-300' : 'text-black',
        active: darkMode ? 'text-indigo-400 border-indigo-400' : 'text-blue-600 border-blue-600'
    };
    const borderClass = darkMode ? 'border-gray-700' : 'border-gray-300';

    const menuItems = [
        {
            title: "Time Table",
            route: "/Teacher-Dashboard/class_activity/timetablestudent"
        },
        {
            title: "Show Result",
            route: "/Teacher-Dashboard/class_activity/reportcard"
        },
        {
            title: "Student Attendance",
            route: "/Teacher-Dashboard/class_activity/studentAttendence"
        },
        {
            title: "Student Leave",
            route: "/Teacher-Dashboard/class_activity/studentleave"
        },
        {
            title: "Student Promotion",
            route: "/Teacher-Dashboard/class_activity/studentPromotion"
        },
    ];

    const [idx, setidx] = useState(0)

    return (
        <div
            className={`
                flex flex-col px-3 items-center 
                mobile:max-tablet:px-0 h-screen 
                rounded-lg py-2 ml-2 mr-3 
                ${bgClass}
            `}
        >
            <nav className='w-full'>
                <ul
                    className={`
                        flex w-full overflow-x-auto 
                        py-2 px-5 border-b pb-0 
                        items-center mobile:max-tablet:text-sm 
                        mobile:max-tablet:justify-normal 
                        justify-center 
                        ${borderClass}
                    `}
                >
                    {menuItems.map((item, index) => (
                        <li
                            className="mr-4 w-fit whitespace-nowrap p-2"
                            key={index}
                        >
                            <Link
                                to={item.route}
                                className={`
                                    font-medium p-2 
                                    ${textClass.default} 
                                    ${idx === index ? textClass.active : ''} 
                                    hover:${darkMode ? 'text-indigo-300' : 'text-blue-500'}
                                `}
                                onClick={() => { setidx(index) }}
                            >
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <Outlet context={{ darkMode }} />
        </div>
    )
}

export default ClassActivity