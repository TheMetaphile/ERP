
import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";

function StudentDoubts() {
    const [selectedLink, setSelectedLink] = useState('/Teacher-Dashboard/studentdoubts/new');

    const handleLinkSelect = (link) => {
        setSelectedLink(link);
    };


    return (
        <div className=" flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar">
            <h1 className='text-3xl'>Student Doubts</h1>
            <div className='  mt-4  w-full'>
                <div className=" flex   mt-4  mr-3 items-center justify-between">
                    <div className=" flex  gap-2 ">
                        <Link
                            to={'/Teacher-Dashboard/studentdoubts/new'}
                            className={`text-xl font-medium px-2 rounded-lg border border-gray-300 py-1 ${selectedLink === '/Teacher-Dashboard/studentdoubts/new' ? 'bg-secondary ' : 'bg-gray-200'}`}
                            onClick={() => handleLinkSelect('/Teacher-Dashboard/studentdoubts/new')}
                        >
                            New Doubts
                        </Link>
                        <Link
                            to={'/Teacher-Dashboard/studentdoubts/answered'}
                            className={`text-xl font-medium px-2 rounded-lg border border-gray-300 py-1 ${selectedLink === '/Teacher-Dashboard/studentdoubts/answered' ? 'bg-secondary ' : 'bg-gray-200'}`}
                            onClick={() => handleLinkSelect('/Teacher-Dashboard/studentdoubts/answered')}
                        >
                            Answered Doubts
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

export default StudentDoubts