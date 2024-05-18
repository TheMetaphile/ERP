import React,{useState} from "react";
import SearchBar from "./utils/SearchBar";
import ResultList from "./utils/ResultList";



export default function StudentResult() {
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
        { id: '1007', name: "Avni", class: "12th", section: "A", marks: "900", totalMarks: "1000", percentage: '90%' },
        { id: '1006', name: "Alice", class: "12th", section: "A", marks: "900", totalMarks: "1000", percentage: '90%' },
        { id: '1004', name: "bob", class: "12th", section: "A", marks: "900", totalMarks: "1000", percentage: '90%' },
        { id: '1002', name: "Abhishek", class: "12th", section: "A", marks: "900", totalMarks: "1000", percentage: '90%' },
        { id: '1055', name: "Avni", class: "12th", section: "A", marks: "900", totalMarks: "1000", percentage: '90%' },
        { id: '1032', name: "Avni", class: "12th", section: "A", marks: "900", totalMarks: "1000", percentage: '90%' },
        { id: '1006', name: "Avni", class: "10th", section: "A", marks: "900", totalMarks: "1000", percentage: '90%' },
        { id: '1007', name: "Avni", class: "12th", section: "A", marks: "900", totalMarks: "1000", percentage: '90%' },
        { id: '1007', name: "Avni", class: "9th", section: "A", marks: "900", totalMarks: "1000", percentage: '90%' },
        { id: '1007', name: "Avni", class: "12th", section: "A", marks: "900", totalMarks: "1000", percentage: '90%' },
        { id: '1007', name: "Avni", class: "12th", section: "A", marks: "900", totalMarks: "1000", percentage: '90%' },
        { id: '1007', name: "Avni", class: "12th", section: "A", marks: "900", totalMarks: "1000", percentage: '90%' },
    ];
    const filteredStudents = students.filter(student => {
        const idMatch = student.id.includes(rollNumber);
        const nameMatch = student.name.toLowerCase().includes(name.toLowerCase());
        const classMatch = student.class.toLowerCase().includes(Class.toLowerCase());
        const sectionMatch = student.section.toLowerCase().includes(Section.toLowerCase());

        return idMatch && nameMatch && classMatch && sectionMatch;
    });

    return (
        <>
            <div className="flex flex-col w-full mt-4">
                <div><h1 className="text-xl mx-4">All Students Results</h1></div>
                <div className="mt-2">
                    <SearchBar
                        name={name} Class={Class} section={Section} rollNumber={rollNumber}
                        handleRollNumberChange={handleRollNumberChange}
                        handleNameChange={handleNameChange}
                        handleClassChange={handleClassChange}
                        handleSectionChange={handleSectionChange} />
                </div>
                <div className="mx-2">
                    {filteredStudents.length === 0 ? (

                        <ResultList students={students} />
                    ) :
                        (
                            <ResultList students={filteredStudents} />
                        )}
                </div>

            </div>
        </>
    )
}