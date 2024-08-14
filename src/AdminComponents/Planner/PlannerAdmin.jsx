import Tabs from "./utils/Tabs";
import React, { useState } from "react";
import Selection from "./utils/Selection";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PlannerAdmin() {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    console.log(selectedClass, selectedSection, selectedSubject)

    return (
        <div className="overflow-y-auto w-full items-start  px-2 no-scrollbar">
            <ToastContainer />
            <div className='w-full flex items-center justify-between px-4 '>
                <h1 className="text-2xl mobile:max-tablet:text-lg whitespace-nowrap font-medium mb-2">Weekly Plan</h1>
                <div className="block tablet:hidden w-full mobile:max-tablet:text-end">
                    <button
                        className="p-2 border rounded"
                        onClick={() => setDropdownVisible(!isDropdownVisible)}
                    >
                        Filter
                    </button>
                    {isDropdownVisible && (
                        <div className='flex fixed left-0 right-0 bg-white pt-1 p-4 gap-2 justify-between mobile:max-tablet:flex-col '>
                            <Selection
                                setClass={setSelectedClass}
                                setSection={setSelectedSection}
                                setSubject={setSelectedSubject} />
                        </div>
                    )}
                </div>



                <div className=" mobile:max-tablet:hidden">
                    <Selection
                        setClass={setSelectedClass}
                        setSection={setSelectedSection}
                        setSubject={setSelectedSubject} />
                </div>
            </div>
            <Tabs Class={selectedClass} section={selectedSection} subject={selectedSubject} />

        </div>

    )
}

export default PlannerAdmin