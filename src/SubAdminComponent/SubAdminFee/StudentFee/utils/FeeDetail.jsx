import StudentDetails from './StudentDetails';
import { ToastContainer, toast } from 'react-toastify';
import TransactionRow from './TransactionHistoryRow';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../../Context/AuthContext';
import axios from 'axios';
import { BASE_URL_Fee, BASE_URL_Login } from '../../../../Config';
import StudentCard from './ProfileCard';
import ApplicableDiscounts from './ApplicableDiscounts';

export default function FeeDetail() {

    const [selectedOption, setSelectedOption] = useState('monthlyfee');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedDiscount, setSelectedDiscount] = useState(null);


    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchString, setsearchString] = useState('');
    const { authState } = useContext(AuthContext);
    const [Fee, setFee] = useState([]);

    const handleDropdownChange = (e) => {
        setSelectedOption(e.target.value);
    };
    const handleSuggestionClick = (suggestion) => {
        console.log("here", suggestion)
        setSelectedStudent(suggestion);
        setShowSuggestions(false);
    };

    useEffect(() => {
        if (searchString) {
            const handler = setTimeout(() => {
                setShowSuggestions(true);
                const searchTeacher = async () => {
                    try {
                        const response = await axios.post(`${BASE_URL_Login}/search/student`, {
                            accessToken: authState.accessToken,
                            searchString: searchString,
                            start: 0,
                            end: 30
                        })
                        console.log(response.data)
                        const teacherEmails = response.data.Teachers.map(teacher => ({
                            _id: teacher._id,
                            "currentClass": teacher.currentClass,
                            "fatherName": teacher.fatherName,
                            "rollNumber": teacher.rollNumber,
                            "section": teacher.section,
                            email: teacher.email,
                            profileLink: teacher.profileLink,
                            name: teacher.name
                        }));
                        setSuggestions(teacherEmails);

                    }
                    catch (error) {
                        console.error("Error searching for teachers:", error);
                    }
                }
                searchTeacher();
            }, 500);

            return () => {
                clearTimeout(handler);
            }
        } else {
            setShowSuggestions(false);
        }
    }, [searchString, authState.accessToken]);

    useEffect(() => {
        console.log(selectedStudent);
        if (selectedStudent) {
            const fetchFees = async () => {

                try {
                    const response = await axios.get(`${BASE_URL_Fee}/fee/fetch/student/detailedFee/${selectedStudent._id}`, {
                        headers: {
                            'Authorization': `Bearer ${authState.accessToken}`
                        }
                    });

                    console.log("API response fees:", response.data);
                    setFee(response.data);


                }
                catch (error) {
                    const errorMessage = error.response?.data?.error || 'An error occurred';
                    console.log(error)
                    toast.error(errorMessage);
                }
            };

            fetchFees();
        }
    }, [selectedStudent]);

    return (
        <div className="flex flex-col w-full tablet:w-full mobile:max-tablet:w-screen overflow-y-auto no-scrollbar items-start mobile:max-tablet:mt-4 px-2 ">
            <ToastContainer />
            <div className='flex items-center justify-between w-full'>
                <h1 className="mb-2 text-2xl font-normal mobile:max-tablet:text-lg">Fees Structure of {name}</h1>
                <div className='flex gap-3'>
                    <div className='relative w-full'>
                        <input type="text" value={searchString} onChange={(e) => { setsearchString(e.target.value) }} className='w-full px-2 py-2 border rounded-lg' placeholder="Enter Email" required />
                        {showSuggestions && suggestions.length > 0 && (
                            <ul className="absolute z-10 w-72 bg-white border rounded-md mt-1 max-h-40 overflow-y-auto">
                                {suggestions.map((suggestion, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        <img src={suggestion.profileLink} alt="Profile" className='w-6 h-6 rounded-full mr-2' />
                                        {suggestion.email}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <select
                        value={selectedOption}
                        onChange={handleDropdownChange}
                        className="border border-gray-300 rounded-lg p-2"
                    >
                        <option value="admissionFee">Admission Fee</option>
                        <option value="monthlyfee">Monthly Fee</option>
                        <option value="quarterFee">Quarterly Fee</option>
                    </select>
                </div>
            </div>
            {
                selectedStudent && <><StudentCard
                    currentClass={selectedStudent.currentClass}
                    email={selectedStudent.email}
                    fatherName={selectedStudent.fatherName}
                    name={selectedStudent.name}
                    profileLink={selectedStudent.profileLink}
                    rollNumber={selectedStudent.rollNumber}
                    section={selectedStudent.section} />
                </>
            }
            {
                selectedStudent && <ApplicableDiscounts
                    selectedStudent={selectedStudent}
                    selectedDiscount={selectedDiscount}
                    setSelectedDiscount={setSelectedDiscount}
                />
            }

            <StudentDetails selectedOption={selectedOption} fees={Fee} setFees={setFee} selectedStudent={selectedStudent} />
            <h1 className="mb-2 text-2xl font-normal mobile:max-tablet:text-lg">Transaction History</h1>
            <TransactionRow selectedStudent={selectedStudent} />
        </div>
    );
}

