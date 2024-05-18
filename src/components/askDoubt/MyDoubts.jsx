import React, { useState } from 'react';
import SelectClass from './utils/SelectClass';
import SelectSubject from './utils/SelectSubject';
import SelectTeacher from "./utils/SelectTeacher";
import MyDoubtTile from "./utils/MyDoubtTile";
import { IoCameraOutline } from "react-icons/io5";

export default function MyDoubts() {

    // const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [doubtDescription, setDoubtDescription] = useState('');
    const [error, setError] = useState('');

    // const handleClassSelect = (selectedClass) => {
    //     setSelectedClass(selectedClass);
    // };
    const handleSubjectSelect = (selectedSubject) => {
        setSelectedSubject(selectedSubject);
    };
    const handleSubjectTeacher = (selectedTeacher) => {
        setSelectedTeacher(selectedTeacher);
    };

    const handleAskDoubt = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmitDoubt = () => {
        console.log('Doubt submitted:',  doubtDescription);
        setDoubtDescription('');
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-row mobile:max-laptop:flex-col-reverse w-full">
            <div className="flex flex-col laptop:mr-3 mt-2 mb-3 no-scrollbar w-full">
                <MyDoubtTile question='Question: 01' description='Which is the form of Energy that can move from hot place to a cold place, or the transfer of energy from one body to another body ?'  selectedSubject={selectedSubject} selectedTeacher={selectedTeacher} />
                <MyDoubtTile question='Question: 02' description='Which is the form of Energy that can move from hot place to a cold place, or the transfer of energy from one body to another body ?'  selectedSubject={selectedSubject} selectedTeacher={selectedTeacher} />
                <div className="mt-3 ml-auto md:hidden">
                    <button className='bg-purple-400 rounded-lg shadow-md px-3 py-1 text-white' onClick={handleAskDoubt}>+ Ask A Doubt</button>
                </div>
            </div>
            <div className="md:order-2 md:w-full lg:w-fit md:ml-2">
                {/* <SelectClass onSelect={handleClassSelect} /> */}
                <SelectSubject onSelect={handleSubjectSelect} />
                <SelectTeacher onSelect={handleSubjectTeacher} />
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-1/2">
                        <h2 className="text-base font-medium mb-4">To Ask a doubt please select class and subject and write tour Question? You can also attached photos for references.</h2>

                        <div className="flex flex-col tablet:flex-row items-center gap-3 w-full py-2 ">
                            <div className="flex-1 mobile:max-tablet:w-full">
                            <SelectTeacher onSelect={handleSubjectTeacher} />

                            </div>
                            <div className="flex-1 mobile:max-tablet:w-full">
                                <SelectSubject onSelect={handleSubjectSelect}/>
                            </div>
                        </div>

                        <h1 className=" mb-2 mt-2">Your Question</h1>

                        <textarea className="w-full px-3 py-2 mb-4 border rounded-lg" placeholder="Write here.." rows={2} value={doubtDescription}
                            onChange={(e) => setDoubtDescription(e.target.value)}></textarea>

                        <IoCameraOutline className='w-6 h-6 ' />
                       

                        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                        <div className="flex justify-end">
                            <button className="bg-gray-300 rounded-lg px-4 py-2 mr-2" onClick={handleCloseModal}>Cancel</button>
                            <button className="bg-blue-600 text-white rounded-lg px-4 py-2" onClick={handleSubmitDoubt}>Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
