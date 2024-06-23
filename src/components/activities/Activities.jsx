import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";

export default function Activities() {
    const [selectedLink, setSelectedLink] = useState('/Student-Dashboard/activities/recentactivity');

    const handleLinkSelect = (link) => {
        setSelectedLink(link);
    };
    return (
        <div className=" flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 py-3 no-scrollbar">
            <h1 className='text-2xl'>Activities</h1>
            <div className=' border border-gray-300 mt-4 rounded-lg w-full shadow-md'>
                <div className=" flex   mt-4 ml-3 mr-3 items-center justify-between">
                    <div className=" flex  gap-2 ">
                        <Link
                            to={'/Student-Dashboard/activities/recentactivity'}
                            className={`text-xl font-medium px-2 rounded-lg py-1 border border-gray-300 ${selectedLink === '/Student-Dashboard/activities/recentactivity' ? 'bg-secondary ' : 'bg-gray-200'}`}
                            onClick={() => handleLinkSelect('/Student-Dashboard/activities/recentactivity')}
                        >
                            Recent
                        </Link>
                        <Link
                            to={'/Student-Dashboard/activities/allactivity'}
                            className={`text-xl font-medium px-2 rounded-lg py-1 border border-gray-300 ${selectedLink === '/Student-Dashboard/activities/allactivity' ? 'bg-secondary ' : 'bg-gray-200'}`}
                            onClick={() => handleLinkSelect('/Student-Dashboard/activities/allactivity')}
                        >
                            All
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

