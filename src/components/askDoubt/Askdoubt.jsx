import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";

export default function Askdoubt() {
    const [selectedLink, setSelectedLink] = useState('/Student-Dashboard/askdoubt/alldoubt');

    const handleLinkSelect = (link) => {
        setSelectedLink(link);
    };

    return (
        <div className="flex flex-col px-3 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar">
            <div className="flex space-x-5">
                <Link
                    to={'/Student-Dashboard/askdoubt/alldoubt'}
                    className={`text-xl font-medium px-2 rounded-lg ${selectedLink === '/Student-Dashboard/askdoubt/alldoubt' ? 'bg-secondary text-black' : 'text-gray-500'}`}
                    onClick={() => handleLinkSelect('/Student-Dashboard/askdoubt/alldoubt')}
                >
                    All Doubts
                </Link>
                <Link
                    to={'/Student-Dashboard/askdoubt/mydoubts'}
                    className={`text-xl font-medium px-2 rounded-lg ${selectedLink === '/Student-Dashboard/askdoubt/mydoubts' ? 'bg-secondary text-black' : 'text-gray-500'}`}
                    onClick={() => handleLinkSelect('/Student-Dashboard/askdoubt/mydoubts')}
                >
                    My Doubts
                </Link>
            </div>
            <Outlet />
        </div>
    );
}
