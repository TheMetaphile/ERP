
import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";

function StudentLeave() {
    const [selectedLink, setSelectedLink] = useState('/Teacher-Dashboard/studentleave/new');

    const handleLinkSelect = (link) => {
        setSelectedLink(link);
    };


    return (
        <div className=" w-full flex flex-col px-2 mobile:max-tablet:px-0 h-screen  items-start  mb-3">
            <h1 className='container mx-auto py-3  font-medium text-2xl'>Student Leave</h1>
            <div className=" flex  mr-3 items-center justify-between">
                <div className=" flex  gap-2 ">
                    <Link
                        to={'/Teacher-Dashboard/class_activity/studentleave/new'}
                        className={`text-xl font-medium px-2 rounded-lg border border-gray-300 py-1 ${selectedLink === '/Teacher-Dashboard/studentleave/new' ? 'bg-secondary ' : 'bg-gray-200'}`}
                        onClick={() => handleLinkSelect('/Teacher-Dashboard/studentleave/new')}
                    >
                        New Leave
                    </Link>
                    <Link
                        to={'/Teacher-Dashboard/class_activity/studentleave/approved'}
                        className={`text-xl font-medium px-2 rounded-lg border border-gray-300 py-1 ${selectedLink === '/Teacher-Dashboard/studentleave/approved' ? 'bg-secondary ' : 'bg-gray-200'}`}
                        onClick={() => handleLinkSelect('/Teacher-Dashboard/studentleave/approved')}
                    >
                        Approved Leave
                    </Link>
                    <Link
                        to={'/Teacher-Dashboard/class_activity/studentleave/rejected'}
                        className={`text-xl font-medium px-2 rounded-lg border border-gray-300 py-1 ${selectedLink === '/Teacher-Dashboard/studentleave/rejected' ? 'bg-secondary ' : 'bg-gray-200'}`}
                        onClick={() => handleLinkSelect('/Teacher-Dashboard/studentleave/rejected')}
                    >
                        Rejected Leave
                    </Link>
                </div>


            </div>
            <hr className=' bg-gray-300 h-1 w-full rounded-full mt-2' />
            <Outlet />

        </div>
    )
}

export default StudentLeave