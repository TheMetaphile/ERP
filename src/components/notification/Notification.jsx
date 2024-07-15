import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";

export default function Notification() {
    const [selectedLink, setSelectedLink] = useState('/Student-Dashboard/notification/allnotification');

    const handleLinkSelect = (link) => {
        setSelectedLink(link);
    };


    return (
        <div className=" flex flex-col px-3  items-start mt-2">

            <div className=" flex  ml-3 mr-3 items-center justify-between">
                <h1 className='text-3xl'>Notice</h1>

                <div className=" flex  gap-2 ">
                    {/* <Link
                            to={'/Student-Dashboard/notification/allnotification'}
                            className={`text-xl font-medium px-2 rounded-lg py-1 shadow-md ${selectedLink === '/Student-Dashboard/notification/allnotification' ? 'bg-secondary ' : 'bg-gray-200'}`}
                            onClick={() => handleLinkSelect('/Student-Dashboard/notification/allnotification')}
                        >
                            All
                        </Link> */}
                    {/* <Link
                            to={'/Student-Dashboard/notification/inbox'}
                            className={`text-xl font-medium px-2 rounded-lg py-1 shadow-md ${selectedLink === '/Student-Dashboard/notification/inbox' ? 'bg-secondary ' : 'bg-gray-200'}`}
                            onClick={() => handleLinkSelect('/Student-Dashboard/notification/inbox')}
                        >
                            Indox
                        </Link>
                        <Link
                            to={'/Student-Dashboard/notification/archived'}
                            className={`text-xl font-medium px-2 rounded-lg py-1 shadow-md ${selectedLink === '/Student-Dashboard/notification/archived' ? 'bg-secondary ' : 'bg-gray-200'}`}
                            onClick={() => handleLinkSelect('/Student-Dashboard/notification/archived')}
                        >
                            Archived
                        </Link> */}
                </div>

            </div>
            <hr className='border-t-2 bg-slate-500 mt-2 mb-3 ml-3 mr-3' />
            <Outlet />
            <br></br>

        </div>

    )
}