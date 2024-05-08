
import AllDoubtTile from './AllDoubtTile';
import SelectClass from './SelectClass'
import SelectSubject from './SelectSubject'
import SelectTeacher from './SelectTeacher'
import React, { useState } from 'react';


function AllDoubts() {
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
        <>
            <div className="flex flex-col tablet:flex-row items-center gap-3 w-full py-2 ">
                <div className="flex-1 mobile:max-tablet:w-full">
                    <SelectClass onSelect={handleClassSelect} />
                </div>
                <div className="flex-1">
                    <SelectSubject onSelect={handleSubjectSelect} />
                </div>
                <div className="flex-1">
                    <SelectTeacher onSelect={handleSubjectTeacher} />
                </div>
            </div>


            <AllDoubtTile question='Question: 01' description='Which is the form of Energy that can move from hot place to a cold place, or the transfer of energy from one body to another body ?' selectedClass={selectedClass} selectedSubject={selectedSubject} selectedTeacher={selectedTeacher} />
            <AllDoubtTile question='Question: 02' description='Which is the form of Energy that can move from hot place to a cold place, or the transfer of energy from one body to another body ?' selectedClass={selectedClass} selectedSubject={selectedSubject} selectedTeacher={selectedTeacher} />
            <AllDoubtTile question='Question: 03' description='Which is the form of Energy that can move from hot place to a cold place, or the transfer of energy from one body to another body ?' selectedClass={selectedClass} selectedSubject={selectedSubject} selectedTeacher={selectedTeacher} />
            <AllDoubtTile question='Question: 04' description='Which is the form of Energy that can move from hot place to a cold place, or the transfer of energy from one body to another body ?' selectedClass={selectedClass} selectedSubject={selectedSubject} selectedTeacher={selectedTeacher} />
        </>
    )
}

export default AllDoubts