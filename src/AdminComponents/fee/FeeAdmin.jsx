import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";

function FeeAdmin() {
    const [selectedLink, setSelectedLink] = useState('/Admin-Dashboard/StudentsFee/details');

    const handleLinkSelect = (link) => {
        setSelectedLink(link);
    };

    return (
        <div className=" flex flex-col px-3 mobile:max-tablet:px-0  overflow-auto items-start mt-2  mb-3 no-scrollbar mobile:max-tablet:mx-2.5">

            <div className=' border shadow-md mt-4 rounded-lg w-full border-gray-300'>
                <div className=" flex   mt-4 ml-3 mr-3 items-center justify-between">
                    <div className=" flex  gap-2 ">
                        <Link
                            to={'/Admin-Dashboard/StudentsFee/structure'}
                            className={`text-xl font-medium px-2 rounded-lg py-1 ${selectedLink === '/Admin-Dashboard/StudentsFee/structure' ? 'bg-secondary ' : 'bg-gray-200'}`}
                            onClick={() => handleLinkSelect('/Admin-Dashboard/StudentsFee/structure')}
                        >
                            Fee Structure
                        </Link>
                        <Link
                            to={'/Admin-Dashboard/StudentsFee/details'}
                            className={`text-xl font-medium px-2 rounded-lg  py-1 ${selectedLink === '/Admin-Dashboard/StudentsFee/details' ? 'bg-secondary ' : 'bg-gray-200'}`}
                            onClick={() => handleLinkSelect('/Admin-Dashboard/StudentsFee/details')}
                        >
                            Student's Fee Status
                        </Link>
                        <Link
                            to={'/Admin-Dashboard/StudentsFee/feediscount'}
                            className={`text-xl font-medium px-2 rounded-lg  py-1 ${selectedLink === '/Admin-Dashboard/StudentsFee/feediscount' ? 'bg-secondary ' : 'bg-gray-200'}`}
                            onClick={() => handleLinkSelect('/Admin-Dashboard/StudentsFee/feediscount')}
                        >
                            Fee Discount Details
                        </Link>
                    </div>


                </div>
                <hr className='border-t-2 bg-slate-500 mt-2 mb-3  ' />
                <Outlet />
                <br></br>
            </div>
        </div>
    )
}

export default FeeAdmin
