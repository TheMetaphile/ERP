import React, { useContext , useState} from 'react'
import AuthContext from '../../../Context/AuthContext'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AssignTeacher() {
    const { authState } = useContext(AuthContext);
    const [selectClass, setSelectClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [teacherEmail, setTeacherEmail] = useState('');

    const handleClassChange = (event) => {
        setSelectClass(event.target.value);
    };

    const handleSectionChange = (event) => {
        setSelectedSection(event.target.value);
    };

    const handleEmailChange = (event) => {
        setTeacherEmail(event.target.value);
    };

    const handleAssign = async () => {
        console.log(selectClass, selectedSection, teacherEmail)
        if (selectClass && selectedSection && teacherEmail) {
            try {
                const response = await axios.post('https://class-teacher.onrender.com/classTeacher/assign', {
                    accessToken: authState.accessToken,
                    class: selectClass,
                    section: selectedSection,
                    teacherEmail: teacherEmail
                });

                if (response.status === 200) {
                    toast.success('Teacher assigned successfully!');
                }
            } catch (error) {
                console.error('Error assigning teacher:', error);
                toast.error('Failed to assign teacher. Please try again.');
            }
        }
    };
    return (
        <div className=" flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar">
            <ToastContainer />

            <div className="border rounded-lg shadow-md w-full flex flex-col px-3 mobile:max-tablet:px-0  overflow-y-auto items-start mt-2  mb-3 no-scrollbar">
                <div className="container p-3  ">

                    <div className="flex justify-between">
                        <div className="w-1/4">
                            <select className="w-full px-4 py-2 border rounded-md" value={selectClass} onChange={handleClassChange}>
                                <option value="">Select Class</option>
                                <option value="Pre-Nursery">Pre-Nursery</option>
                                <option value="Nursery">Nursery</option>
                                <option value="L.K.J">L.K.J</option>
                                <option value="U.K.J">U.K.J</option>
                                <option value="1st">1st</option>
                                <option value="2nd">2nd</option>
                                <option value="3rd">3rd</option>
                                <option value="4th">4th</option>
                                <option value="5th">5th</option>
                                <option value="6th">6th</option>
                                <option value="7th">7th</option>
                                <option value="8th">8th</option>
                                <option value="9th">9th</option>
                                <option value="10th">10th</option>
                                <option value="11th">11th</option>
                                <option value="12th">12th</option>
                            </select>
                        </div>
                        <div className="w-1/4">
                            <select className="w-full px-4 py-2 border rounded-md" value={selectedSection} onChange={handleSectionChange}>
                                <option value="">Select Section</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                                <option value="F">F</option>
                                <option value="G">G</option>
                                <option value="H">H</option>
                                <option value="I">I</option>
                            </select>
                        </div>

                        <div className="w-1/4">
                            <input
                                type="email"
                                placeholder="Teacher's Email"
                                className="w-full px-4 py-2 border rounded-md"
                                value={teacherEmail}
                                onChange={handleEmailChange}
                            />
                        </div>

                        <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={handleAssign}>
                            Search
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AssignTeacher