
import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";

function NoticeBoard() {
    const [selectedLink, setSelectedLink] = useState('/Teacher-Dashboard/noticeboard/teacher');

    const handleLinkSelect = (link) => {
        setSelectedLink(link);
    };


    return (
        <div className=" flex flex-col px-3 mobile:max-tablet:px-0  items-start mt-2 mb-3">
            <h1 className='text-3xl'>Notice Board</h1>
            <div className=' border shadow-md mt-4 rounded-lg w-full '>
                <div className=" flex   mt-4 ml-3 mr-3 items-center justify-between">
                    <div className=" flex  gap-2 ">
                        {/* <Link
                            to={'/Teacher-Dashboard/noticeboard/allnotice'}
                            className={`text-xl font-medium px-2 rounded-lg py-1 ${selectedLink === '/Teacher-Dashboard/noticeboard/allnotice' ? 'bg-secondary ' : 'bg-gray-300'}`}
                            onClick={() => handleLinkSelect('/Teacher-Dashboard/noticeboard/allnotice')}
                        >
                            All
                        </Link> */}
                        <Link
                            to={'/Teacher-Dashboard/noticeboard/teacher'}
                            className={`text-xl font-medium px-2 rounded-lg  py-1 ${selectedLink === '/Teacher-Dashboard/noticeboard/teacher' ? 'bg-secondary ' : 'bg-gray-300'}`}
                            onClick={() => handleLinkSelect('/Teacher-Dashboard/noticeboard/teacher')}
                        >
                            Teacher
                        </Link>
                        {/* <Link
                            to={'/Teacher-Dashboard/noticeboard/student'}
                            className={`text-xl font-medium px-2 rounded-lg py-1 ${selectedLink === '/Teacher-Dashboard/noticeboard/student' ? 'bg-secondary ' : 'bg-gray-300'}`}
                            onClick={() => handleLinkSelect('/Teacher-Dashboard/noticeboard/student')}
                        >
                            Student
                        </Link> */}
                    </div>

                   
                </div>
                <hr className='border-t-2 bg-slate-500 mt-2 mb-3 ml-3 mr-3' />
                <Outlet />
                <br></br>
            </div>
        </div>
    )
}

export default NoticeBoard