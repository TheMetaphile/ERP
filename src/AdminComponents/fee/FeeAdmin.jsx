import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";

function FeeAdmin() {
    const [selectedLink, setSelectedLink] = useState('/Admin-Dashboard/StudentsFee/details');

    const handleLinkSelect = (link) => {
        setSelectedLink(link);
    };

    return (
        <div className=" flex flex-col px-3 mobile:max-tablet:px-0  overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar">
            
            <div className=' border shadow-md mt-4 rounded-lg w-full'>
                <div className=" flex   mt-4 ml-3 mr-3 items-center justify-between">
                    <div className=" flex  gap-2 ">
                        <Link
                            to={'/Admin-Dashboard/StudentsFee/structure'}
                            className={`text-xl font-medium px-2 rounded-lg py-1 ${selectedLink === '/Admin-Dashboard/StudentsFee/structure' ? 'bg-secondary ' : 'bg-gray-300'}`}
                            onClick={() => handleLinkSelect('/Admin-Dashboard/StudentsFee/structure')}
                        >
                            Structure
                        </Link>
                        <Link
                            to={'/Admin-Dashboard/StudentsFee/details'}
                            className={`text-xl font-medium px-2 rounded-lg  py-1 ${selectedLink === '/Admin-Dashboard/StudentsFee/details' ? 'bg-secondary ' : 'bg-gray-300'}`}
                            onClick={() => handleLinkSelect('/Admin-Dashboard/StudentsFee/details')}
                        >
                            Fee Status
                        </Link>
                        <Link
                            to={'/Admin-Dashboard/StudentsFee/feediscount'}
                            className={`text-xl font-medium px-2 rounded-lg  py-1 ${selectedLink === '/Admin-Dashboard/StudentsFee/feediscount' ? 'bg-secondary ' : 'bg-gray-300'}`}
                            onClick={() => handleLinkSelect('/Admin-Dashboard/StudentsFee/feediscount')}
                        >
                            Discount
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

export default FeeAdmin
