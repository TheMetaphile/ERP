import { useState, useContext, useEffect } from "react";
import Header from './Header'
import SearchBar from "../../Students/AllStudents/utils/SearchBar";
import axios from 'axios'
import AuthContext from "../../../Context/AuthContext";
import Loading from "../../../LoadingScreen/Loading";
import TeacherDetailTile from "./TeacherDetailTile";
import { BASE_URL_ClassTeacher } from "../../../Config";

export default function ClassTeacher() {
    const [name, setName] = useState('');
    const [userData, setUserData] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authState } = useContext(AuthContext);

    

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
    }, [Class, Section,name, bothEventsCalled]);

        const fetchUserData = async () => {
            try {
                const response = await axios.post(`${BASE_URL_ClassTeacher}/classTeacher/fetch/multi`, {
                    accessToken: authState.accessToken
                });
                console.log("API response:", response.data);


                if (response.data.classTeachers) {
                    const users = response.data.classTeachers.map(user => ({
                        ...user,
                        profileLogo: user.profileLink ,

                    }));
                    setUserData(users);
                    setFilteredTeachers(users);
                } else {
                    setError('Unexpected response format');
                    setTimeout(() => {
                        setError('');
                    }, 2000);
                }


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
    }, [authState.accessToken]);


    const filterData = () => {
        const filtered = userData.filter((teacher) => 
            (Class ? teacher.class === Class : true) &&
            (Section ? teacher.section === Section : true) &&
            (name ? teacher.name.toLowerCase().includes(name.toLowerCase()) : true)
        );
        setFilteredTeachers(filtered);
    };
    

    
    return (
        <div className="overflow-y-auto w-full items-start mb-2 px-2 no-scrollbar">
            <h1 className="text-2xl font-medium mb-2">All Class Teacher</h1>
            <div className="no-scrollbar w-full overflow-x-auto">
                <SearchBar
                    
                    name={name}
                    Class={Class}
                    Section={Section}
                    
                    handleNameChange={handleNameChange}
                    handleClassChange={handleClassChange}
                    handleSectionChange={handleSectionChange}
                    handlebothEventsCalled={handlebothEventsCalled}
                />
            </div>
            <div className="rounded-lg shadow-md border-2 border-black w-full overflow-x-auto no-scrollable">
                <Header headings={['E-mail', 'Class','Section','Name', 'ID',]} />
                {loading ? (
                    <Loading/>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : Array.isArray(filteredTeachers) && filteredTeachers.length === 0 ? (
                    <div>No teachers found</div>
                ) : Array.isArray(filteredTeachers) ? (
                    <TeacherDetailTile userData={filteredTeachers} />
                ) : (
                    <div>Unexpected data format</div>
                )}
                
            </div>
        </div>
    )
}