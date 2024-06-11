import React, { useState, useContext, useEffect } from 'react'
import Selection from './utils/Selection'
import Table from './utils/Table'
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import TableStudent from './utils/TableStudent';
import SelectionTeacher from './utils/SelectionTeacher';
import Loading from '../../LoadingScreen/Loading'
function TimeTable() {

    const [selectClass, setClass] = useState('3rd')
    const [selectedSection, setSection] = useState('C');
    const [data, setData] = useState(null);
    const { authState } = useContext(AuthContext);
    const [role, setRole] = useState('Teacher');
    const [teacherEmail, setTeacherEmail] = useState('bhanu68tyagi@gmail.com');
    const [dayStudent, setDayStudent]=useState('tuesday');
    const [day, setDay] = useState('tuesday');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        handleSearch();
    }, [role]);

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleClass = (value) => {
        setClass(value);
    }
    const handleSection = (value) => {
        setSection(value);
    }

    const handleEmailChange = (value) => {
        setTeacherEmail(value);
    };

    const handleDayChange = (value) => {
        setDay(value);
    };
    
    const handleStudentDayChange = (value) => {
        setDayStudent(value);
    };
    const handleSearch = async () => {
        if ((selectClass && selectedSection) || (teacherEmail && day)) {
            console.log(selectClass, selectedSection);
            console.log(teacherEmail, day)
            setLoading(true);
            try {
                const url = role === 'Teacher' ? 'https://timetableapi-1wfp.onrender.com/timetable/fetch/teacher' : 'https://timetableapi-1wfp.onrender.com/timetable/fetch/student';
                const payload = {
                    accessToken: authState.accessToken,
                    class: selectClass,
                    section: selectedSection,
                    day: dayStudent
                };
                if (role === 'Teacher') {
                    payload.email = teacherEmail;
                    payload.day = day;
                }
                const response = await axios.post(url, payload);
                if (response.status === 200) {
                    console.log('response from fetchh', response.data);
                    setData(response.data); 
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            finally {
                setLoading(false); 
            }
        }
    };
    return (
        <div className=" flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar">
            <div className='flex justify-between items-center w-full'>
            <h1 className='text-2xl'>Time Table</h1>
            <div className="flex gap-4 px-3 py-2  mt-2 text-lg justify-between">
                <label className="text-lg font-medium text-center">
                    <input
                        type="radio"
                        name="role"
                        value="Teacher"
                        checked={role === "Teacher"}
                        onChange={handleRoleChange}
                        className="mr-3 w-4 h-4"
                        
                    />
                    Teacher
                </label>

                <label className="text-lg font-medium text-center">
                    <input
                        type="radio"
                        name="role"
                        value="Student"
                        checked={role === "Student"}
                        onChange={handleRoleChange}
                        className="mr-3 w-4 h-4"
                     
                    />
                    Student
                </label>
            </div>

            </div>
            <div className=' mt-4  w-full'>
            {role === 'Teacher' ? (
                    <SelectionTeacher
                        onSearch={handleSearch}
                        onEmailChange={handleEmailChange}
                        onDayChange={handleDayChange}
                    />
                ) : (
                    <Selection
                        selectClass={selectClass}
                        selectedSection={selectedSection}
                        dayStudent={dayStudent}
                        onClassChange={handleClass}
                        onSectionChange={handleSection}
                        onStudentDayChange={handleStudentDayChange}
                        onSearch={handleSearch}
                    />
                )}
            </div>

            <div className=' mt-4  w-full rounded-lg border shadow-md'>
            {loading ? (
                    <Loading />
                ) : (
                    role === 'Teacher' ? <Table data={data} /> : <TableStudent data={data}  selectClass={selectClass} selectedSection={selectedSection} dayStudent={dayStudent}/>
                )}
            </div>

        </div>

    )
}

export default TimeTable