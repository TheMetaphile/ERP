
import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";

function NoticeBoard() {
    const [selectedLink, setSelectedLink] = useState('/Teacher-Dashboard/noticeboard/allnotice');

    const handleLinkSelect = (link) => {
        setSelectedLink(link);
    };


    return (
        <div className=" flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar">
            <h1 className='text-3xl'>Notice Board</h1>
            <div className=' border shadow-md mt-4 rounded-lg '>
                <div className=" flex   mt-4 ml-3 mr-3 items-center justify-between">
                    <div className=" flex   ">
                        <Link
                            to={'/Teacher-Dashboard/noticeboard/allnotice'}
                            className={`text-xl font-medium px-2 rounded-lg ${selectedLink === '/Teacher-Dashboard/noticeboard/allnotice' ? 'bg-secondary' : ''}`}
                            onClick={() => handleLinkSelect('/Teacher-Dashboard/noticeboard/allnotice')}
                        >
                            All
                        </Link>
                        <Link
                            to={'/Teacher-Dashboard/noticeboard/teacher'}
                            className={`text-xl font-medium px-2 rounded-lg ${selectedLink === '/Teacher-Dashboard/noticeboard/teacher' ? 'bg-secondary' : ''}`}
                            onClick={() => handleLinkSelect('/Teacher-Dashboard/noticeboard/teacher')}
                        >
                            Teacher
                        </Link>
                        <Link
                            to={'/Teacher-Dashboard/noticeboard/student'}
                            className={`text-xl font-medium px-2 rounded-lg ${selectedLink === '/Teacher-Dashboard/noticeboard/student' ? 'bg-secondary' : ''}`}
                            onClick={() => handleLinkSelect('/Teacher-Dashboard/noticeboard/student')}
                        >
                            Student
                        </Link>
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