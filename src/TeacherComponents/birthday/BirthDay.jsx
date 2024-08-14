
import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";

function BirthDay() {
    const [selectedLink, setSelectedLink] = useState('/Teacher-Dashboard/birthday/student');

    const handleLinkSelect = (link) => {
        setSelectedLink(link);
    };


    return (
        <div className=" flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar mobile:max-laptop:">
            <h1 className='text-3xl font-semibold mobile:max-tablet:text-xl'>Birthday</h1>
            <div className='  mt-3  w-full'>
                <div className=" flex items-center justify-between border-b mb-3 ">
                    <div className=" flex  gap-2 -mb-0.5 ">
                        {/* <Link
                            to={'/Teacher-Dashboard/birthday/all'}
                            className={`text-xl font-medium px-2 border border-gray-300 rounded-lg py-1 ${selectedLink === '/Teacher-Dashboard/birthday/all' ? 'bg-secondary ' : 'bg-gray-200'}`}
                            onClick={() => handleLinkSelect('/Teacher-Dashboard/birthday/all')}
                        >
                            All
                        </Link> */}
                        <Link
                            to={'/Teacher-Dashboard/birthday/teacher'}
                            className={`text-xl mobile:max-tablet:text-lg font-medium px-2  py-1 ${selectedLink === '/Teacher-Dashboard/birthday/teacher' ? 'text-purple-600 border-b-2 border-purple-600 ' : ' '}`}
                            onClick={() => handleLinkSelect('/Teacher-Dashboard/birthday/teacher')}
                        >
                            Teacher
                        </Link>
                        <Link
                            to={'/Teacher-Dashboard/birthday/student'}
                            className={`text-xl mobile:max-tablet:text-lg font-medium px-2 py-1  ${selectedLink === '/Teacher-Dashboard/birthday/student' ? 'text-purple-600 border-b-2 border-purple-600 ' : ''}`}
                            onClick={() => handleLinkSelect('/Teacher-Dashboard/birthday/student')}
                        >
                            Student
                        </Link>
                    </div>


                </div>
                {/* <hr className='border-t-2 bg-slate-500 mt-2 mb-3 ml-3 mr-3' /> */}
                <Outlet />
                <br></br>
            </div>
        </div>
    )
}

export default BirthDay