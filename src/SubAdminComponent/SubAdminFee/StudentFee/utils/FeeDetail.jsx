import StudentDetails from './StudentDetails';
import { ToastContainer, toast } from 'react-toastify';
import TransactionRow from './TransactionHistoryRow';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../../Context/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../../../../Config';
import StudentCard from './ProfileCard';
import ApplicableDiscounts from './ApplicableDiscounts';
import { refreshAccessToken } from '../../../../RefreshTokenHelper';

export default function FeeDetail() {

    const [selectedOption, setSelectedOption] = useState('monthlyfee');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedDiscount, setSelectedDiscount] = useState(null);
    const [removeDiscount, setRemoveDiscount] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchString, setsearchString] = useState('');
    const { authState, darkMode, updateAccessToken, logout } = useContext(AuthContext);
    const [Fee, setFee] = useState([]);
    const [appliedDis, setAppliedDis] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleDropdownChange = (e) => {
        setSelectedOption(e.target.value);
    };
    const handleSuggestionClick = (suggestion) => {
        console.log("here", suggestion)
        setSelectedStudent(suggestion);
        setShowSuggestions(false);
    };
    const fetchFees = async () => {

        try {
            const response = await axios.get(`${BASE_URL}/fee/fetch/student/detailedFee/${selectedStudent._id}`, {
                headers: {
                    'Authorization': `Bearer ${authState?.accessToken}`
                }
            });

            // console.log("API response fees:", response.data);
            setFee(response.data);


        }
        catch (error) {
            const errorMessage = error.response?.data?.error || 'An error occurred';
            // console.log(error)
            toast.error(errorMessage);
            if (
                error.response &&
                error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await fetchFees();
                } catch (refreshError) {
                }
            } else {
                toast.error(error.response?.data?.error || "An error occurred");
            }
        }
    };
    useEffect(() => {
        console.log("Currently selected discount:", selectedDiscount);
    }, [selectedDiscount]);

    useEffect(() => {
        if (searchString) {
            const handler = setTimeout(() => {
                setShowSuggestions(true);
                const searchTeacher = async () => {
                    try {
                        const response = await axios.post(`${BASE_URL}/search/student`, {
                            accessToken: authState?.accessToken,
                            searchString: searchString,
                            start: 0,
                            end: 30
                        })
                        // console.log(response.data)
                        const teacherEmails = response.data.Teachers.map(teacher => ({
                            _id: teacher._id,
                            "currentClass": teacher.currentClass,
                            "fatherName": teacher.fatherName,
                            "rollNumber": teacher.rollNumber,
                            "section": teacher.section,
                            fatherPhoneNumber: teacher.fatherPhoneNumber,
                            email: teacher.email,
                            profileLink: teacher.profileLink,
                            name: teacher.name
                        }));
                        setSuggestions(teacherEmails);

                    }
                    catch (error) {
                        console.error("Error searching for teachers:", error);
                        if (
                            error.response &&
                            error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
                        ) {
                            toast.warn('Access denied. Attempting to refresh token...');
                            try {
                                const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                                await searchTeacher();
                            } catch (refreshError) {
                            }
                        } else {
                            toast.error(error.response?.data?.error || "An error occurred");
                        }
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
    }, [searchString, authState?.accessToken]);

    useEffect(() => {
        // console.log(selectedStudent);
        if (selectedStudent) {


            fetchFees();
        }
    }, [selectedStudent]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            console.log(selectedDiscount);
            const date = new Date();
            if (!selectedStudent || (!selectedDiscount && !removeDiscount)) {
                return;
            }
            const response = await axios.post(`${BASE_URL}/fee/apply/discount`,
                {
                    studentId: selectedStudent._id,
                    discountId: selectedDiscount,
                    removeId: removeDiscount,
                    month: date.getMonth()
                },
                {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`
                    }
                }
            );

            if (response.status === 200) {
                setRemoveDiscount(null);
                setSelectedDiscount(null);
                setAppliedDis(selectedDiscount);
                toast.success(response.data.message);
                fetchFees();
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error creating discount');
            if (
                error.response &&
                error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await handleSubmit();
                } catch (refreshError) {
                }
            } else {
                toast.error(error.response?.data?.error || "An error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (authState?.accessToken && selectedStudent) {
            setLoading(true);
            fetchTransaction();
        }
    }, [authState?.accessToken, selectedStudent]);

    const fetchTransaction = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/fee/fetch/particularStudent/transactions?email=${selectedStudent.email}`, {
                headers: {
                    'Authorization': `Bearer ${authState?.accessToken}`
                }
            });
            console.log("API response transaction:", response.data);
            setData(response.data.transactions)
        }
        catch (error) {
            const errorMessage = error.response?.data?.error || 'An error occurred';
            toast.error(errorMessage);
            if (
                error.response &&
                error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await fetchTransaction();
                } catch (refreshError) {
                }
            } else {
                toast.error(error.response?.data?.error || "An error occurred");
            }
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className={`flex flex-col w-full tablet:w-full mobile:max-tablet:w-screen overflow-y-auto no-scrollbar items-start mobile:max-tablet:mt-4 p-2 ${darkMode ? 'bg-gray-900 text-gray-100' : ''
            }`}>
            <ToastContainer />
            <div className='flex items-center justify-between w-full'>
                <h1 className={`mb-2 text-2xl font-normal mobile:max-tablet:text-lg ${darkMode ? 'text-gray-200' : ''
                    }`}>
                    Fees Structure of {selectedStudent?.name || ""}
                </h1>
                <div className='flex gap-3'>
                    <div className='relative w-full'>
                        <input
                            type="text"
                            value={searchString}
                            onChange={(e) => { setsearchString(e.target.value) }}
                            className={`w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 ${darkMode
                                ? 'bg-gray-700 text-gray-200 border-gray-600 focus:ring-blue-600'
                                : 'border-gray-300 focus:ring-blue-500'
                                }`}
                            placeholder="Enter Email"
                            required
                        />
                        {showSuggestions && suggestions.length > 0 && (
                            <ul className={`absolute z-10 w-72 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg ${darkMode
                                ? 'bg-gray-700 border-gray-600 text-gray-200'
                                : 'bg-white border'
                                }`}>
                                {suggestions.map((suggestion, idx) => (
                                    <li
                                        key={idx}
                                        className={`flex items-center p-2 cursor-pointer transition duration-200 ${darkMode
                                            ? 'hover:bg-gray-600'
                                            : 'hover:bg-gray-200'
                                            }`}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        <img
                                            src={suggestion.profileLink}
                                            alt="Profile"
                                            className='w-6 h-6 rounded-full mr-2'
                                        />
                                        <span className={darkMode ? 'text-gray-300' : ''}>
                                            {suggestion.email}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {selectedStudent && <StudentCard
                currentClass={selectedStudent.currentClass}
                email={selectedStudent.email}
                fatherName={selectedStudent.fatherName}
                name={selectedStudent.name}
                profileLink={selectedStudent.profileLink}
                rollNumber={selectedStudent.rollNumber}
                section={selectedStudent.section}
                darkMode={darkMode}
            />}

            {selectedStudent && (
                <>
                    <ApplicableDiscounts
                        selectedStudent={selectedStudent}
                        selectedDiscount={selectedDiscount}
                        setSelectedDiscount={setSelectedDiscount}
                        appliedDis={appliedDis}
                        removedDiscount={removeDiscount}
                        setRemovedDiscount={setRemoveDiscount}
                    />

                    <div className="w-full flex justify-end gap-4 mt-3">
                        <button
                            className={`font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out ${isLoading
                                ? 'opacity-50 cursor-not-allowed'
                                : (darkMode
                                    ? 'bg-blue-700 hover:bg-blue-800 text-white'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white')
                                }`}
                            type="submit"
                            disabled={isLoading}
                            onClick={handleSubmit}
                        >
                            {isLoading ? 'Apply...' : 'Apply'}
                        </button>
                        <select
                            value={selectedOption}
                            onChange={handleDropdownChange}
                            className={`rounded-lg p-2 focus:outline-none focus:ring-2 ${darkMode
                                ? 'bg-gray-700 text-gray-200 border-gray-600 focus:ring-blue-600'
                                : 'border border-gray-300 focus:ring-blue-500'
                                }`}
                        >
                            <option
                                value="admissionFee"
                                className={darkMode ? 'bg-gray-800 text-gray-200' : ''}
                            >
                                Admission Fee
                            </option>
                            <option
                                value="monthlyfee"
                                className={darkMode ? 'bg-gray-800 text-gray-200' : ''}
                            >
                                Monthly Fee
                            </option>
                            <option
                                value="quarterFee"
                                className={darkMode ? 'bg-gray-800 text-gray-200' : ''}
                            >
                                Quarterly Fee
                            </option>
                        </select>
                    </div>
                </>
            )}

            <StudentDetails
                removeDiscount={removeDiscount}
                selectedOption={selectedOption}
                fetchFees={fetchFees}
                fetchTransaction={fetchTransaction}
                fees={Fee}
                setFees={setFee}
                selectedStudent={selectedStudent}
                selectedDiscount={selectedDiscount}
                darkMode={darkMode}
            />

            <h1 className={`mb-2 text-2xl font-normal mobile:max-tablet:text-lg ${darkMode ? 'text-gray-200' : ''
                }`}>
                Transaction History
            </h1>
            <TransactionRow
                selectedStudent={selectedStudent}
                data={data}
                setData={setData}
                darkMode={darkMode}
            />
        </div>
    );
}

