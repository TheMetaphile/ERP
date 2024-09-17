import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";

function FeeAdmin() {
    const [selectedLink, setSelectedLink] = useState('/Admin-Dashboard/StudentsFee/details');

    const handleLinkSelect = (link) => {
        setSelectedLink(link);
    };

    return (
        <div className=" flex flex-col px-3 mobile:max-tablet:px-0  overflow-auto items-start mt-2  mb-3 no-scrollbar mobile:max-tablet:mx-2.5  mobile:max-tablet:mt-3">

            <div className='mt-4 mobile:max-tablet:mt-0 w-full '>
                <div className=" flex ml-3 mr-3 items-center justify-between overflow-auto">
                    <div className=" flex  gap-2 w-full ">
                        <Link to={`/Admin-Dashboard/StudentsFee/structure`} onClick={() => handleLinkSelect('/Admin-Dashboard/StudentsFee/structure')}>
                            <h1 className={`p-2 mx-1 ${selectedLink === '/Admin-Dashboard/StudentsFee/structure' ? "text-gray-600 border-b-2 border-purple-400" : "text-gray-600"}`}>
                                Fee Structure
                            </h1>
                        </Link>
                        <Link to={`/Admin-Dashboard/StudentsFee/details`} onClick={() => handleLinkSelect('/Admin-Dashboard/StudentsFee/details')}>
                            <h1 className={`p-2 mx-1 ${selectedLink === '/Admin-Dashboard/StudentsFee/details' ? "text-gray-600 border-b-2 border-purple-400" : "text-gray-600"}`}>
                                Fee Status
                            </h1>
                        </Link>
                        <Link to={`/Admin-Dashboard/StudentsFee/feediscount`} onClick={() => handleLinkSelect('/Admin-Dashboard/StudentsFee/feediscount')}>
                            <h1 className={`p-2 mx-1 ${selectedLink === '/Admin-Dashboard/StudentsFee/feediscount' ? "text-gray-600 border-b-2 border-purple-400" : "text-gray-600"}`}>
                                Fee Discount
                            </h1>
                        </Link>
                        <Link to={`/Admin-Dashboard/StudentsFee/PreviousFee`} onClick={() => handleLinkSelect('/Admin-Dashboard/StudentsFee/PreviousFee')}>
                            <h1 className={`p-2 mx-1 ${selectedLink === '/Admin-Dashboard/StudentsFee/PreviousFee' ? "text-gray-600 border-b-2 border-purple-400" : "text-gray-600"}`}>
                                Previous Fee
                            </h1>
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
