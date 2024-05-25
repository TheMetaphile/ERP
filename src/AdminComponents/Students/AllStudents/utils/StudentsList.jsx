import { useState, useContext, useEffect } from "react";
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

    const [bothEventsCalled, setBothEventsCalled] = useState(false);
    const handlebothEventsCalled = (event) => {
        setBothEventsCalled(true)
    }

    useEffect(() => {
        if (bothEventsCalled) {
            console.log(Class);
            console.log(Section)
            setBothEventsCalled(false)
        }
    }, [Class, Section, bothEventsCalled]);

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


    const filteredStudents = userData.filter(student => {
        return (
            student.name.toLowerCase().includes(name.toLowerCase()) &&
            student.currentClass.toLowerCase().includes(Class.toLowerCase()) &&
            student.section.toLowerCase().includes(Section.toLowerCase())
        );
    });
    return (
        <div className="overflow-y-auto w-full items-start mb-2 px-2 no-scrollbar">
            <h1 className="text-2xl font-medium mb-2">All Students Data</h1>
            <div className="no-scrollbar w-full overflow-x-auto">
                <SearchBar
                    rollNumber={rollNumber}
                    name={name}
                    Class={Class}
                    Section={Section}
                    handleRollNumberChange={handleRollNumberChange}
                    handleNameChange={handleNameChange}
                    handleClassChange={handleClassChange}
                    handleSectionChange={handleSectionChange}
                    handlebothEventsCalled={handlebothEventsCalled}
                />
            </div>
            <div className="rounded-lg shadow-md border-2 border-black w-full overflow-x-auto no-scrollable">
                <Header headings={['ID', 'Name', 'Class', 'Section', 'Phone No.', 'E-mail']} />
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : Array.isArray(filteredStudents) && filteredStudents.length === 0 ? (
                    <div>No students found</div>
                ) : Array.isArray(filteredStudents) ? (
                    <StudentDetailTile userData={filteredStudents} />
                ) : (
                    <div>Unexpected data format</div>
                )}
            </div>
        </div>
    )
}