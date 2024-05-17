import React,{useState} from "react";
import SearchBar from "./utils/SearchBar";
import PromotedStudentsDetails from "./utils/PromotedStudentsDetails";

export default function StudentPromotion(){
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
        { id: '1007', name: "Avni", class: "XII", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1006', name: "Alice", class: "XII", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1004', name: "bob", class: "XII", section: "A", marks: "900", gpa: "9", remark: 'Detained' },
        { id: '1002', name: "Abhishek", class: "XII", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1055', name: "Avni", class: "XII", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1032', name: "Avni", class: "XII", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1006', name: "Avni", class: "XII", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1007', name: "Avni", class: "XII", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1007', name: "Avni", class: "XII", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1007', name: "Avni", class: "XII", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1007', name: "Avni", class: "XII", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1007', name: "Avni", class: "XII", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
    ];
    const filteredStudents = students.filter(student => {
        const idMatch = student.id === rollNumber;
        const nameMatch = student.name.toLowerCase().includes(name.toLowerCase());
        const classMatch = student.class.toLowerCase().includes(Class.toLowerCase());
        const sectionMatch = student.section.toLowerCase().includes(Section.toLowerCase());
       
       return idMatch && nameMatch && classMatch && sectionMatch;
    });
    
    
    
    return(
        <div className="flex flex-col w-full mt-4">
           <div><h1 className="text-xl mx-4">All Students Data</h1></div>
           <div className="mt-2">
            <SearchBar 
                    name={name} Class={Class} section={Section} rollNumber={rollNumber}
                    handleRollNumberChange={handleRollNumberChange}
                    handleNameChange={handleNameChange}
                    handleClassChange={handleClassChange}
                    handleSectionChange={handleSectionChange}/>
           </div>
           <div className="mx-2">
           {filteredStudents.length === 0 ? (

                        <PromotedStudentsDetails students={students}/>
                    ) :
                    (
                        <PromotedStudentsDetails students={filteredStudents}/>
                    )}
           </div>
        </div>
    )
}