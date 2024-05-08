
import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";

export default function Notification() {

    
    return (
        <div className=" flex flex-col px-3 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar">
            <h1 className='text-3xl'>Notifications</h1>
            <div className='border border-black mt-4 rounded-lg '>
            <div className=" flex  space-x-5 mt-4 ml-5 mr-3 items-center justify-between">
                <div className="flex  space-x-5 ">
                <Link to={'/Student-Dashboard/notification/allnotification'}className="text-xl font-medium hover:bg-blue-300 cursor-pointer  px-3 rounded-lg">All </Link>
                <Link to={'/Student-Dashboard/notification/inbox'} className="text-xl font-medium hover:bg-blue-300 cursor-pointer px-3 rounded-lg">Indox</Link>
                <Link to={'/Student-Dashboard/notification/archived'} className="text-xl font-medium hover:bg-blue-300 cursor-pointer px-3 rounded-lg">Archived</Link>
                </div>
                <h1 className=' border border-grey-300 items-center px-4 py-2'>Mark all as read</h1>
            </div>
            <hr className='border-t-2 bg-slate-500 mt-2 mb-3 ml-3 mr-3' />
            <Outlet/>
            <br></br>
            </div>
        </div>

    )
}