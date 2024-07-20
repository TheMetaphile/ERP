import Tabs from "./utils/Tabs";
import React from "react";
// import { useState } from "react";
import Selection from "./utils/Selection";


function Planner() {



    return (
        <div className="overflow-y-auto w-full items-start  px-2 no-scrollbar">
            <div className='w-full flex items-center justify-between px-4 '>
                <h1 className="text-2xl font-medium mb-2">Weekly Plan</h1>
                <Selection />
            </div>
            <Tabs />
            {/* <Outlet /> */}
        </div>

    )
}

export default Planner