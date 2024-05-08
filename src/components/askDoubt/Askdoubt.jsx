
import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";

export default function Askdoubt() {

    
    return (
        <div className=" flex flex-col px-3 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar">
            <div className="flex  space-x-5">
                <Link to={'/Student-Dashboard/askdoubt/alldoubt'}className="text-xl font-medium">All Doubts</Link>
                <Link to={'/Student-Dashboard/askdoubt/mydoubts'} className="text-xl font-medium hover:bg-blue-300 cursor-pointer">My Doubts</Link>
            </div>
            <Outlet/>
        </div>

    )
}