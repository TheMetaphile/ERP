import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";

function FeeSubAdmin() {
    const [selectedLink, setSelectedLink] = useState('/Sub-Admin/StudentsFee/details');

    const handleLinkSelect = (link) => {
        setSelectedLink(link);
    };

    return (
        <div className=" flex flex-col px-3 mobile:max-tablet:px-0  overflow-auto items-start mt-2  mb-3 no-scrollbar mobile:max-tablet:mx-2.5  mobile:max-tablet:mt-3 pt-20">

            <div className='  mt-4 mobile:max-tablet:mt-0 rounded-lg w-full'>
                <div className=" flex mt-4 ml-3 mr-3 items-center justify-between">
                    <div className=" flex  gap-2 w-full ">
                        <Link to={`/Sub-Admin/StudentsFee/structure`} onClick={() => handleLinkSelect('/Sub-Admin/StudentsFee/structure')}>
                            <h1 className={`p-2 mx-1 ${selectedLink === '/Sub-Admin/StudentsFee/structure' ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"}`}>
                                Fee Structure
                            </h1>
                        </Link>
                        <Link to={`/Sub-Admin/StudentsFee/details`} onClick={() => handleLinkSelect('/Sub-Admin/StudentsFee/details')}>
                            <h1 className={`p-2 mx-1 ${selectedLink === '/Sub-Admin/StudentsFee/details' ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"}`}>
                                Fee Status
                            </h1>
                        </Link>
                        <Link to={`/Sub-Admin/StudentsFee/feediscount`} onClick={() => handleLinkSelect('/Sub-Admin/StudentsFee/feediscount')}>
                            <h1 className={`p-2 mx-1 ${selectedLink === '/Sub-Admin/StudentsFee/feediscount' ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"}`}>
                                Fee Discount

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

export default FeeSubAdmin
