import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import AuthContext from '../../../Context/AuthContext';
import { useRef } from 'react';
import { BASE_URL_Fee } from '../../../Config';
import { toast } from 'react-toastify';

function CreateDiscount({ addDiscount }) {
    const { authState } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [percentage, setPercentage] = useState('');
    const [session, setSession] = useState('');
    const [field, setField] = useState('');
    const [rollnumber, setRollNumber] = useState('');
    const [profile, setProfile] = useState('');
    const [temp, setTemp] = useState();
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);

    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            console.log("Clicked outside the input field");
            setShowSuggestions(false);
            // Execute your function here
        }
    };
    const handleClickInside = () => {
        console.log("Clicked inside the input field");
        // Execute your function for inside click here
        setShowSuggestions(true);
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (suggestion) => {
        setEmail(suggestion.name);
        setProfile(suggestion.profileLink);
        setRollNumber(suggestion.rollNumber);
        setShowSuggestions(false);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setTemp(email);
        }, 500);
        return () => {
            clearTimeout(handler);
        }
    }, [email])

    useEffect(() => {
        if (temp) {
            const searchStudent = async () => {
                try {
                    const response = await axios.get(`${BASE_URL_Fee}/fee/fetch/students/list?searchString=${temp}`, {
                        headers: {
                            Authorization: `Bearer ${authState.accessToken}`
                        }
                    })
                    console.log(response.data)
                    const StudentEmails = response.data.Students.map(Student => ({
                        name: Student.name,
                        profileLink: Student.profileLink,
                        rollNumber : Student.rollNumber
                    }));
                    setSuggestions(StudentEmails);

                }
                catch (error) {
                    console.error("Error searching for Students:", error);
                }
            }
            searchStudent();
        }
    }, [temp, authState.accessToken])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Number(percentage) < 100) {
            try {
                const response = await axios.post(`${BASE_URL_Fee}/fee/apply/discount`,
                    {
                        email: email,
                        percentage: Number(percentage),
                        session: session,
                        field: field
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${authState.accessToken}`
                        }
                    }
                );

                if (response.status === 200) {
                    toast.success('Discount created successfully');
                    console.log('Discount created successfully');
                    addDiscount({
                        to: { name: email, profileLink: profile, rollNumber: rollnumber }, 
                        percentage: Number(percentage),
                        session: session,
                        field: field,
                        by: { name: authState.userDetails.name, employeeId: authState.userDetails.employeeId }, 
                    });
                    setEmail('');
                    setPercentage('');
                    setSession('');
                    setField('');
                }

            } catch (error) {
                toast.error(error);
                console.error('Error:', error);
            }
        }
        else {
            console.log('Percentage is above 100')
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 w-full p-3 rounded-lg shadow-md border">
            <div className="grid grid-cols-1 gap-4 mb-4 rounded-lg ">
                <h1 className="text-xl">Create Discount</h1>
                <div className="grid grid-cols-3 gap-4 ">
                    <div>
                        <label className="text-black font-medium">Student Email</label>
                        <input
                            type="text"
                            name="email"
                            ref={inputRef}
                            value={email}
                            onChange={handleEmailChange}
                            onClick={handleClickInside}
                            required
                            className="w-full border p-2"
                        />
                        {showSuggestions && suggestions.length > 0 && (
                            <ul className="absolute z-10 w-72 bg-white border rounded-md mt-1 max-h-40 overflow-y-auto">
                                {suggestions.map((suggestion, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        <img src={suggestion.profileLink} alt="Profile" className='w-6 h-6 rounded-full mr-2' />
                                        {suggestion.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div>
                        <label className="text-black font-medium">Percent</label>
                        <input
                            type="text"
                            name="percentage"
                            value={percentage}
                            onChange={(e) => setPercentage(e.target.value)}
                            required
                            className="w-full border p-2"
                        />
                    </div>

                    <div>
                        <label className="text-black font-medium">Session</label>
                        <input
                            type="text"
                            name="session"
                            value={session}
                            onChange={(e) => setSession(e.target.value)}
                            required
                            className="w-full border p-2"
                        />
                    </div>

                    <div>
                        <label className="text-black font-medium">Title</label>
                        <input
                            type="text"
                            name="field"
                            value={field}
                            onChange={(e) => setField(e.target.value)}
                            required
                            className="w-full border p-2"
                        />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between mt-4">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Done
                </button>
            </div>
        </form>
    );
}

export default CreateDiscount;
