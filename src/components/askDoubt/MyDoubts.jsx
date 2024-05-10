

import React, { useState } from 'react';
import SelectClass from './utils/SelectClass'
import SelectSubject from './utils/SelectSubject'
import SelectTeacher from "./utils/SelectTeacher";
import MyDoubtTile from "./utils/MyDoubtTile";

export default function MyDoubts() {

    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const handleClassSelect = (selectedClass) => {
        setSelectedClass(selectedClass);
    };
    const handleSubjectSelect = (selectedSubject) => {
        setSelectedSubject(selectedSubject);
    };
    const handleSubjectTeacher = (selectedTeacher) => {
        setSelectedTeacher(selectedTeacher);
    };


    return (

            <div className="flex flex-row mobile:max-laptop:flex-col-reverse w-full">
                <div className=" flex flex-col laptop:mr-3 mt-2  mb-3 no-scrollbar w-full ">
                    <MyDoubtTile question='Question: 01' description='Which is the form of Energy that can move from hot place to a cold place, or the transfer of energy from one body to another body ?' selectedClass={selectedClass} selectedSubject={selectedSubject} selectedTeacher={selectedTeacher} />
                    <MyDoubtTile question='Question: 02' description='Which is the form of Energy that can move from hot place to a cold place, or the transfer of energy from one body to another body ?' selectedClass={selectedClass} selectedSubject={selectedSubject} selectedTeacher={selectedTeacher} />
                    <div className="mt-3 ml-auto md:hidden">
                        <button className='bg-purple-400 rounded-lg shadow-md px-3 py-1 text-white'>+ Ask A Doubt</button>
                    </div>
                </div>
                <div className=" md:order-2 md:w-full lg:w-fit md:ml-2">
                    <SelectClass onSelect={handleClassSelect} />
                    <SelectSubject onSelect={handleSubjectSelect} />
                    <SelectTeacher onSelect={handleSubjectTeacher} />
                </div>
            </div>


    

    )
}