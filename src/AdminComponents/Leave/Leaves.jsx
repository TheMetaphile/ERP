import React from "react";
import Stats from "./utils/Cards";
import LeaveCard from "./utils/LeaveList";

export default function Leaves(){
    return(
        <div className="flex flex-col">
        <div className="px-20 w-full">
            <Stats/>
        </div>
        <div className="mt-8 rounded-lg shadow-lg mb-4 mx-2">
            <LeaveCard/>
        </div>
        </div>
    )
}