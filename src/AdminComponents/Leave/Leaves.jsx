import React from "react";
import Stats from "./utils/Cards";
import LeaveCard from "./utils/LeaveList";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Leaves() {
    return (
        <div className="flex flex-col mobile:max-tablet:mt-4">
            <ToastContainer />
            {/* <div className="px-20 mobile:max-laptop:px-0 w-full">
                <Stats />
            </div> */}
            <div className="  mb-4 mx-2">
                <LeaveCard />
            </div>
        </div>
    )
}