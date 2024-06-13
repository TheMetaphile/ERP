import React, { useState } from 'react';
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import TeacherRowContent from './TeacherRowContent';

export default function AssignTeacherRow({ classs, teacherEmail, isClassTeacherAssigned, suggestions, showSuggestions, handleEmailChange, handleAssign, handleSuggestionClick }) {
    const [expanded, setExpanded] = useState(false);
    const [sections, setSections] = useState([]);
    const [newSection, setNewSection] = useState('');

    const handleClick = () => {
        setExpanded(!expanded);
    };

    const handleAddSection = () => {
        if (newSection && !sections.includes(newSection)) {
            setSections([...sections, newSection]);
            setNewSection('');
        }
    };

    return (
        <div className="w-full mb-4">
            <div className="flex justify-between items-center bg-pink-400 p-2 rounded-md cursor-pointer" onClick={handleClick}>
                <div className="w-1/4">
                    <div className="px-4 py-2 border rounded-md">
                        {classs}
                    </div>
                </div>
                <div className="w-1/4">
                    <div className="w-full px-4 py-2 border rounded-md">
                        Sections: {sections.join(', ')}
                    </div>
                </div>
                <div className="w-1/3">
                    <TeacherRowContent
                        teacherEmail={teacherEmail}
                        isClassTeacherAssigned={isClassTeacherAssigned}
                        suggestions={suggestions}
                        showSuggestions={showSuggestions}
                        handleEmailChange={handleEmailChange}
                        handleAssign={handleAssign}
                        handleSuggestionClick={handleSuggestionClick}
                    />
                </div>
                <div className="self-center cursor-pointer" onClick={handleClick}>
                    {expanded ? <FaChevronUp /> : <FaChevronDown />}
                </div>
            </div>

            {expanded && (
                <div className="w-full justify-between">
                    {sections.map((section) => (
                        <div key={section} className="flex mt-2 bg-pink-400 justify-between">
                            <div className="w-1/4">
                                <div className="px-4 py-2 border rounded-md">
                                    {section}
                                </div>
                            </div>
                            <div className="w-1/3">
                                <TeacherRowContent
                                    teacherEmail={teacherEmail}
                                    isClassTeacherAssigned={isClassTeacherAssigned}
                                    suggestions={suggestions}
                                    showSuggestions={showSuggestions}
                                    handleEmailChange={handleEmailChange}
                                    handleAssign={handleAssign}
                                    handleSuggestionClick={handleSuggestionClick}
                                    section={section}
                                />
                            </div>
                        </div>
                    ))}
                    <div className='flex justify-between mt-2'>
                        <div className="w-1/4 bg-yellow-300"></div>
                        <div className="w-1/4 bg-green-400"></div>
                        <div className='w-1/3 justify-between'>
                            <div className='w-3/4 flex justify-between'>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-md"
                                    placeholder="Add section"
                                    value={newSection}
                                    onChange={(e) => setNewSection(e.target.value)}
                                />
                                <button
                                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                                    onClick={handleAddSection}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
