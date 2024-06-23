
import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";

function StudentLeave() {
    const [selectedLink, setSelectedLink] = useState('/Teacher-Dashboard/studentleave/new');

    const handleLinkSelect = (link) => {
        setSelectedLink(link);
    };


    return (
        <div className=" flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar">
            <h1 className='text-3xl'>Student Leave</h1>
            <div className='  mt-4  w-full'>
                <div className=" flex   mt-4  mr-3 items-center justify-between">
                    <div className=" flex  gap-2 ">
                        <Link
                            to={'/Teacher-Dashboard/studentleave/new'}
                            className={`text-xl font-medium px-2 rounded-lg border border-gray-300 py-1 ${selectedLink === '/Teacher-Dashboard/studentleave/new' ? 'bg-secondary ' : 'bg-gray-200'}`}
                            onClick={() => handleLinkSelect('/Teacher-Dashboard/studentleave/new')}
                        >
                            New Leave
                        </Link>
                        <Link
                            to={'/Teacher-Dashboard/studentleave/approved'}
                            className={`text-xl font-medium px-2 rounded-lg border border-gray-300 py-1 ${selectedLink === '/Teacher-Dashboard/studentleave/approved' ? 'bg-secondary ' : 'bg-gray-200'}`}
                            onClick={() => handleLinkSelect('/Teacher-Dashboard/studentleave/approved')}
                        >
                            Approved Leave
                        </Link>
                        <Link
                            to={'/Teacher-Dashboard/studentleave/rejected'}
                            className={`text-xl font-medium px-2 rounded-lg border border-gray-300 py-1 ${selectedLink === '/Teacher-Dashboard/studentleave/rejected' ? 'bg-secondary ' : 'bg-gray-200'}`}
                            onClick={() => handleLinkSelect('/Teacher-Dashboard/studentleave/rejected')}
                        >
                            Rejected Leave
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

export default StudentLeave