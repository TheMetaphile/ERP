import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL_Fee, BASE_URL_Login } from '../../../Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentCard from '../StudentFee/utils/ProfileCard';
import ApplicableDiscounts from '../StudentFee/utils/ApplicableDiscounts';

function CreateDiscount({ selectedSession }) {
    const { authState } = useContext(AuthContext);
    const [selectedSuggestion, setSelectedSuggestion] = useState();
    const [appliedDis, setAppliedDis] = useState(null);
    const [temp, setTemp] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);
    const [selectedDiscount, setSelectedDiscount] = useState(null);
    const [searchInput, setSearchInput] = useState();


    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            setShowSuggestions(false);
        }
    };

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setSearchInput( value );
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (suggestion) => {
        setSelectedSuggestion(suggestion);
        setShowSuggestions(false);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setTemp(searchInput);
        }, 500);
        return () => {
            clearTimeout(handler);
        }
    }, [searchInput]);


    useEffect(() => {
        if (temp) {
            const searchStudent = async () => {
                try {
                    const response = await axios.post(`${BASE_URL_Login}/search/student`, {
                        accessToken: authState.accessToken,
                        searchString: temp,
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
                } catch (error) {
                    console.error("Error searching for Students:", error);
                    toast.error("Error searching for students");
                }
            }
            searchStudent();
        }
    }, [temp, authState.accessToken]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            console.log(selectedDiscount);
            const date = new Date();
            const response = await axios.post(`${BASE_URL_Fee}/fee/apply/discount`,
                {
                    studentId: selectedSuggestion._id,
                    discountId: selectedDiscount,
                    month: date.getMonth()
                },
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                }
            );

            if (response.status === 200) {
                setAppliedDis(selectedDiscount)
                toast.success(response.data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error creating discount');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 w-full p-6 rounded-lg shadow-md border bg-white">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-6 ">Create Discount</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div ref={inputRef} className="relative">
                    <label className="block text-gray-700 font-medium mb-2">Student Email</label>
                    <input
                        type="text"
                        name="email"
                        value={searchInput}
                        onChange={handleEmailChange}
                        required
                        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Start typing student name..."
                    />
                    {showSuggestions && suggestions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
                            {suggestions.map((suggestion, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-center p-3 cursor-pointer hover:bg-purple-50 transition duration-150 ease-in-out"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    <img src={suggestion.profileLink} alt="Profile" className='w-8 h-8 rounded-full mr-3' />
                                    <div>
                                        <p className="font-medium">{suggestion.name}</p>
                                        <p className="text-sm text-gray-600">{suggestion.email}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {
                    selectedSuggestion &&
                    <>
                        <StudentCard currentClass={selectedSuggestion.currentClass} email={selectedSuggestion.email}
                            fatherName={selectedSuggestion.fatherName}
                            name={selectedSuggestion.name}
                            profileLink={selectedSuggestion.profileLink}
                            rollNumber={selectedSuggestion.rollNumber}
                            section={selectedSuggestion.section}
                        />
                        <ApplicableDiscounts
                            selectedStudent={selectedSuggestion}
                            selectedDiscount={selectedDiscount}
                            setSelectedDiscount={setSelectedDiscount}
                            appliedDis={appliedDis}
                        />
                    </>
                }

            </div>
            <div className="flex justify-end">
                <button
                    className={`bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating...' : 'Create Discount'}
                </button>
            </div>
        </form>
    );
}

export default CreateDiscount;