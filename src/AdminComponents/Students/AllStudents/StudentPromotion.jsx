import React, { useState } from "react";
import SearchBar from "./utils/SearchBar";
import PromotedStudentsDetails from "./utils/PromotedStudentsDetails";

export default function StudentPromotion() {
    const [rollNumber, setRollNumber] = useState('');
    const handleRollNumberChange = (event) => {
        setRollNumber(event.target.value);
    };

    const [name, setName] = useState('');
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const [Class, setClass] = useState('');
    const handleClassChange = (event) => {
        setClass(event.target.value);
    };
    const [Section, setSection] = useState('');
    const handleSectionChange = (event) => {
        setSection(event.target.value);
    };

    const students = [
        { id: '1007', name: "Avni", class: "12", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1006', name: "Alice", class: "12", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1004', name: "bob", class: "1", section: "A", marks: "900", gpa: "9", remark: 'Detained' },
        { id: '1002', name: "Abhishek", class: "12", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1055', name: "Avni", class: "12", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1032', name: "Avni", class: "12", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1006', name: "Avni", class: "12", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1007', name: "Avni", class: "12", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1007', name: "Avni", class: "12", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1007', name: "Avni", class: "12", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1007', name: "Avni", class: "12", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1007', name: "Avni", class: "12", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
    ];

    const filteredStudents = students.filter(student => {
        const idMatch = student.id.includes(rollNumber);
        const nameMatch = student.name.toLowerCase().includes(name.toLowerCase());
        const classMatch = student.class.toLowerCase().includes(Class.toLowerCase());
        const sectionMatch = student.section.toLowerCase().includes(Section.toLowerCase());

        return idMatch && nameMatch && classMatch && sectionMatch;
    });

    // State to control the dropdown visibility
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    return (
        <>
            {/* Container for heading and filter button */}
            <div className="flex mobile:max-tablet:my-2 justify-between items-center mobile:max-tablet:items-baseline mobile:max-tablet:pl-1 mobile:max-tablet:py-4 px-2  mobile:max-tablet:fixed top-34 left-0 right-0 bg-white mb-4">
                <h1 className="text-2xl font-medium px-2">All Students Data</h1>
                <div className="block desktop:hidden">
                    <button
                        className="p-2 border rounded"
                        onClick={() => setDropdownVisible(!isDropdownVisible)}
                    >
                        Filter
                    </button>
                    {isDropdownVisible && (
                        <div className="absolute bg-white shadow-lg py-2 rounded right-1 left-1 z-20 justify-center flex">
                            <SearchBar
                                rollNumber={rollNumber}
                                name={name}
                                Class={Class}
                                Section={Section}
                                handleRollNumberChange={handleRollNumberChange}
                                handleNameChange={handleNameChange}
                                handleClassChange={handleClassChange}
                                handleSectionChange={handleSectionChange}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="h-fit w-full items-start mb-3 px-2">


                {/* Original SearchBar for non-mobile screens */}
                <div className="w-full desktop:block hidden">
                    <SearchBar
                        rollNumber={rollNumber}
                        name={name}
                        Class={Class}
                        Section={Section}
                        handleRollNumberChange={handleRollNumberChange}
                        handleNameChange={handleNameChange}
                        handleClassChange={handleClassChange}
                        handleSectionChange={handleSectionChange}
                    />
                </div>

                <div className="mx-2 mt-20">
                    {filteredStudents.length === 0 ? (
                        <PromotedStudentsDetails students={students} />
                    ) : (
                        <PromotedStudentsDetails students={filteredStudents} />
                    )}
                </div>
            </div>
        </>
    );
}
