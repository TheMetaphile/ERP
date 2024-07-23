import Tabs from "./utils/Tabs";
import React, { useState } from "react";
// import { useState } from "react";
import Selection from "./utils/Selection";


function Planner() {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');

    console.log(selectedClass, selectedSection, selectedSubject)

    return (
        <div className="overflow-y-auto w-full items-start  px-2 no-scrollbar">
            <div className='w-full flex items-center justify-between px-4 '>
                <h1 className="text-2xl font-medium mb-2">Weekly Plan</h1>
                <Selection
                    setClass={setSelectedClass}
                    setSection={setSelectedSection}
                    setSubject={setSelectedSubject} />
            </div>
            <Tabs Class={selectedClass} section={selectedSection} subject={selectedSubject}/>
            {/* <Outlet /> */}
        </div>

    )
}

export default Planner