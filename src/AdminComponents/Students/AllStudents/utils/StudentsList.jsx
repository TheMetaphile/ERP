import { useState,useContext,useEffect } from "react";
import Header from "../../../Home/utils/TeachersDetails/LeftCard/Header";
import SearchBar from "../utils/SearchBar";
import StudentDetailTile from "../utils/StudentDetailTile";
import axios from 'axios'
import AuthContext from "../../../../Context/AuthContext";

export default function StudentsList() {
    const [name, setName] = useState('');
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authState } = useContext(AuthContext);

    const [rollNumber, setRollNumber] = useState('');
    const handleRollNumberChange = (event) => {
        setRollNumber(event.target.value);
    };

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
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.post('https://loginapi-y0aa.onrender.com/fetchMultiple/student', {
                    accessToken: authState.accessToken
                });
                console.log("API response:", response.data);


                if (response.data.Students) {
                    const users = response.data.Students.map(user => ({
                        ...user,
                        profileLogo: user.profileLink || profilelogo,
     
                    }));
                    setUserData(users);
                } else {
                    setError('Unexpected response format');
                }
                
                console.log(response.data.Students[4].name);
                
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (authState.accessToken) {
            fetchUserData();
        } else {
            setError('No access token available');
            setLoading(false);
        }
    }, [authState.accessToken]);

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
        <div className="overflow-y-auto w-full items-start mb-2 px-2 no-scrollbar">
            <h1 className="text-2xl font-medium  mb-2">All Students Data</h1>
            <div className="no-scrollbar w-full overflow-x-auto">
            <SearchBar rollNumber={rollNumber} name={name} Class={Class} Section={Section} handleRollNumberChange={handleRollNumberChange} handleNameChange={handleNameChange} handleClassChange={handleClassChange} handleSectionChange={handleSectionChange} />
            </div>
            <div className=" rounded-lg shadow-md border-2 border-black w-full overflow-x-auto no-scrollable">
                <Header headings={['ID', 'Name', 'Class', 'Section', 'Gender', 'Parent Name', 'Phone No.', 'Address', 'Date of Birth', 'E-mail']} />
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