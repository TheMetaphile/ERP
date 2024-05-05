import { useState } from "react";
import Header from "../../../Home/utils/TeachersDetails/LeftCard/Header";
import SearchBar from "../utils/SearchBar";
import StudentDetailTile from "../utils/StudentDetailTile";

export default function StudentsList() {
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
    const Students = [
        ['12', 'Abhishek', '9', 'A', 'Male', 'abc', '1234567890', 'Kankar Khera', '11/12/2004', 'abcd@gmail.com'],
        ['25', 'Bhuvneshwar Tyagi', '10', 'B', 'Male', 'abc', '1234567890', 'Kankar Khera', '11/12/2004', 'abcd@gmail.com'],
        ['33', 'Chowmine', '10', 'C', 'Male', 'abc', '1234567890', 'Kankar Khera', '11/12/2004', 'abcd@gmail.com'],
        ['49', 'Deepak', '11', 'D', 'Male', 'abc', '1234567890', 'Kankar Khera', '11/12/2004', 'abcd@gmail.com'],
        ['55', 'Gyanesh', '11', 'A', 'Male', 'abc', '1234567890', 'Kankar Khera', '11/12/2004', 'abcd@gmail.com'],
        ['67', 'Harsh', '12', 'B', 'Male', 'abc', '1234567890', 'Kankar Khera', '11/12/2004', 'abcd@gmail.com'],
        ['12', 'Yash', '9', 'A', 'Male', 'abc', '1234567890', 'Kankar Khera', '11/12/2004', 'abcd@gmail.com'],
        ['25', 'aditya', '10', 'B', 'Male', 'abc', '1234567890', 'Kankar Khera', '11/12/2004', 'abcd@gmail.com'],
        ['33', 'Umang', '10', 'C', 'Male', 'abc', '1234567890', 'Kankar Khera', '11/12/2004', 'abcd@gmail.com'],
        ['49', 'Tushar', '11', 'D', 'Male', 'abc', '1234567890', 'Kankar Khera', '11/12/2004', 'abcd@gmail.com'],
        ['55', 'Mukul Morya', '11', 'A', 'Male', 'abc', '1234567890', 'Kankar Khera', '11/12/2004', 'abcd@gmail.com'],
        ['67', 'Avni', '12', 'B', 'Male', 'abc', '1234567890', 'Kankar Khera', '11/12/2004', 'abcd@gmail.com'],
    ];
    const filteredStudents = Students.filter(student => {
        const [studentRollNumber, studentName, studentClass, studentSection] = [student[0],student[1],student[2],student[3]];
        return (
            studentRollNumber.includes(rollNumber) &&
            studentName.toLowerCase().includes(name.toLowerCase()) &&
            studentClass.toLowerCase().includes(Class.toLowerCase()) &&
            studentSection.toLowerCase().includes(Section.toLowerCase())
        );
    });
    return (
        <div className="overflow-y-auto items-start mb-2 px-2  no-scrollbar">
            <h1 className="text-2xl font-medium  mb-2">All Students Data</h1>
            <SearchBar rollNumber={rollNumber} name={name} Class={Class} Section={Section} handleRollNumberChange={handleRollNumberChange} handleNameChange={handleNameChange} handleClassChange={handleClassChange} handleSectionChange={handleSectionChange} />
            <div className=" rounded-lg shadow-md border-2 border-black">
                <Header headings={['ID', 'Name', 'Class', 'Section', 'Gender', 'Parent Name', 'Phone No.', 'Adress', 'Date of Birth', 'E-mail']} />
                {filteredStudents.length === 0 ? (
                    Students.map((student,index) => (

                        <StudentDetailTile key={index} values={student} id={`${student[1]}`}/>
                    ))) :
                    (
                        filteredStudents.map((student, index) => (
                            <StudentDetailTile key={index} values={student} id={`${student[1]}?class=${student[2]}-${student[3]}&rollnumber=${student[0]}&session=2024-25`}/>
                        ))
                    )}
            </div>
        </div>
    )
}