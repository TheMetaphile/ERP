import { useState, useContext, useEffect } from "react";
import Header from "../../../Home/utils/TeachersDetails/LeftCard/Header";
import SearchBar from "../utils/SearchBar";
import StudentDetailTile from "../utils/StudentDetailTile";
import axios from 'axios'
import AuthContext from "../../../../Context/AuthContext";
import Loading from '../../../../LoadingScreen/Loading'
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

    const fetchUserData = async () => {
        try {
            const response = await axios.post('https://loginapi-y0aa.onrender.com/fetchMultiple/student', {
                accessToken: authState.accessToken,
                currentClass: Class,
                section: Section,
                rollNumber: rollNumber,
                end :5
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
                setTimeout(() => {
                    setError('');
                }, 2000);
            }

            console.log(response.data.Students[4].name);

            setLoading(false);
        } catch (err) {
            setError(err.message);
            setTimeout(() => {
                setError('');
            }, 2000);
            setLoading(false);
        }
    };
    useEffect(() => {
        if (authState.accessToken) {
            fetchUserData();
        } else {
            setError('No access token available');
            setLoading(false);
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    }, [authState.accessToken,Class,rollNumber,Section,name]);


    const filteredStudents = userData.filter(student => {

        return (
            rollNumber ?
                student.rollNumber === rollNumber : true &&
                student.name.toLowerCase().includes(name.toLowerCase()) &&
                student.currentClass.toLowerCase().includes(Class.toLowerCase()) &&
                student.section.toLowerCase().includes(Section.toLowerCase())
        );
    });

    const showAddRollNumberButton = filteredStudents.some(student => !student.rollNumber);

    const handleRollNumber = async () => {
        if (!Class || !Section) {
            setError('Please select a class and section first');
            return;
        }
        try {

            const response = await axios.post('https://loginapi-y0aa.onrender.com/assignRollNumber', {
                accessToken: authState.accessToken,
                currentClass: Class,
                section: Section,

            });

            console.log(response.data)
            fetchUserData();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="overflow-x-auto w-full items-start mb-2 px-2 ">
            <h1 className="text-2xl font-medium mb-2">All Students Data</h1>
            <div className="w-full">
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
            <div className="rounded-lg shadow-md border border-black w-full mobile:max-tablet:w-fit overflow-auto ">
                <Header headings={['ID', 'Name', 'Class', 'Section', 'Phone No.', 'E-mail']} />
                {loading ? (
                    <Loading />
                ) : Array.isArray(filteredStudents) && filteredStudents.length === 0 ? (
                    <div>No students found</div>
                ) : Array.isArray(filteredStudents) ? (
                    <StudentDetailTile userData={filteredStudents} />
                ) : (
                    <div>Unexpected data format</div>
                )}
                {showAddRollNumberButton && (
                    <button
                        className="rounded-lg shadow-md px-3 py-1 mr-2 border-2 border-r-gray-200 text-lg bg-secondary float-right mb-3"
                        onClick={handleRollNumber}
                    >
                        Add Roll Number
                    </button>
                )}
            </div>
        </div>
    )
}