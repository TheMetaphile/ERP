import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL } from '../../../Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegTimesCircle } from 'react-icons/fa';
import { refreshAccessToken } from '../../../RefreshTokenHelper';

function GlobalDiscount() {
    const { authState, darkMode, updateAccessToken, logout } = useContext(AuthContext);
    const [amount, setAmount] = useState('');
    const [discountType, setDiscountType] = useState('fixed');

    const [duration, setDuration] = useState('');

    const [title, setTitle] = useState('staff ward');
    const [isLoading, setIsLoading] = useState(false);
    const [discountTargetType, setDiscountTargetType] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [classes, setClasses] = useState([]);
    const [selectedWing, setSelectedWing] = useState('');
    const [sectionOptions, setSectionOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const [classOptions] = useState(['Pre-Nursery', 'Nursery', 'L.K.G', 'U.K.G', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']);
    const wingOptions = ['Pre-Nursery-U.K.G', '1st-5th', '6th-8th', '9th-10th', '11th-12th Com./Huma', '11th-12th Science'];

    const fetchSections = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${BASE_URL}/classTeacher/fetch/sections`, {
                accessToken: authState?.accessToken,
                class: selectedClass,
            });
            if (response.status === 200) {
                console.log('Sections fetched');
                const sectionsDetail = response.data.sections.map(section => section.section);
                setSectionOptions(sectionsDetail);
            }
        } catch (error) {
            console.error("Error fetching sections:", error);
            if (
                error.response &&
                error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await fetchSections();
                } catch (refreshError) {
                }
            } else {
                toast.error(error.response?.data?.error || "An error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedClass) {
            fetchSections();
        }
    }, [selectedClass]);

    const handleAddClass = () => {
        const existingClass = classes.find(cls => cls.Class === selectedClass);
        if (existingClass) {
            existingClass.sections.push(selectedSection);
        } else {
            setClasses([...classes, { Class: selectedClass, sections: [selectedSection] }]);
        }
        setSelectedClass('');
        setSelectedSection('');
    };

    const handleRemoveClass = (className) => {
        setClasses(classes.filter(cls => cls.Class !== className));
    };

    const handleRemoveSection = (className, section) => {
        setClasses(classes.map(cls => {
            if (cls.Class === className) {
                return { ...cls, sections: cls.sections.filter(sec => sec !== section) };
            }
            return cls;
        }));
    };

    const getSession = (date) => {
        const currentYear = date.getFullYear();
        const nextYear = currentYear + 1;
        return date.getMonth() + 1 <= 3
            ? `${currentYear - 1}-${currentYear.toString().slice(2)}`
            : `${currentYear}-${nextYear.toString().slice(2)}`;

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const date = new Date();
        const session = getSession(date);
        try {
            const response = await axios.post(`${BASE_URL}/fee/apply/discountCategory`, {
                amount,
                discountType,
                title,
                discountTargetType,
                classes,
                selectedWing,
                duration,
                session
            }, {
                headers: {
                    Authorization: `Bearer ${authState?.accessToken}`,
                },
            });
            if (response.status === 200) {
                toast.success('Discount created successfully!');
                setAmount('');
                setDiscountType('fixed');
                setDuration('');
                setTitle('staff ward');
                setDiscountTargetType('');
                setClasses([]);
                setSelectedWing('');
            }

        } catch (error) {
            toast.error('Failed to create discount.');
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

    return (
        <form
            onSubmit={handleSubmit}
            className={`mt-4 w-full p-6 rounded-lg shadow-md border 
        ${darkMode
                    ? 'bg-gray-800 border-gray-700 text-gray-200'
                    : 'bg-white border-gray-300'
                }`}
        >
            <ToastContainer />
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                Create Discount
            </h2>
            <div className="grid grid-cols-1 tablet:max-laptop::grid-cols-3 laptop:grid-cols-4 gap-6 mb-6">
                <div>
                    <label className={`block font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Discount Type
                    </label>
                    <select
                        name="discountType"
                        value={discountType}
                        onChange={(e) => {
                            setDiscountType(e.target.value);
                            setAmount("");
                        }}
                        className={`w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 p-3
                    ${darkMode
                                ? 'bg-gray-700 border-gray-600 text-gray-200'
                                : 'border-gray-300 bg-white'
                            }`}
                    >
                        <option value="fixed">Fixed Amount</option>
                        <option value="percentage">Percentage</option>
                    </select>
                </div>
                <div>
                    <label className={`block font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Discount Amount
                    </label>
                    <input
                        type="number"
                        name="amount"
                        value={amount}
                        onChange={(e) => {
                            let value = e.target.value;
                            if (discountType === "percentage") {
                                if (value < 0) value = 0;
                                if (value > 100) value = 100;
                            }
                            setAmount(value);
                        }}
                        required
                        className={`w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 p-3
                    ${darkMode
                                ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
                                : 'border-gray-300 bg-white'
                            }`}
                        placeholder={discountType === "percentage" ? "Enter percentage (0-100%)" : "Enter discount amount"}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Duration (Months)</label>
                    <select
                        name="duration"
                        value={duration}
                        required
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Enter duration</option>
                        <option value={-1}>Remainig Session</option>
                        {
                            Array.from({ length: 12 }, (_, i) => (
                                <option key={i} value={i}>{i + 1} month</option>
                            ))
                        }
                    </select>

                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Discount Target Type</label>
                    <select
                        name="discountTargetType"
                        value={discountTargetType}
                        onChange={(e) => setDiscountTargetType(e.target.value)}
                        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Target Type</option>
                        <option value="all">All</option>
                        <option value="wing">Wing</option>
                        <option value="particular class">Particular Class</option>


                    </select>
                </div>
                {/* Similar modifications for other form elements */}
                <div>
                    <label className={`block font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Title
                    </label>
                    <select
                        name="title"
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        className={`w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 p-3
                    ${darkMode
                                ? 'bg-gray-700 border-gray-600 text-gray-200'
                                : 'border-gray-300 bg-white'
                            }`}
                    >
                        <option value="">Select Title</option>
                        <option value="staff ward">Staff Ward</option>
                        <option value="admin discount">Admin Discount</option>
                        <option value="superadmin discount">Superadmin Discount</option>
                    </select>
                </div>


                {discountTargetType === 'wing' && (
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Select Wing</label>
                        <select
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            value={selectedWing}
                            onChange={(e) => setSelectedWing(e.target.value)}




                        >
                            <option value="">Select Wing</option>
                            {wingOptions.map(wing => (
                                <option key={wing} value={wing}>{wing}</option>
                            ))}
                        </select>
                    </div>
                )}
                {/* For particular class section */}
                {discountTargetType === 'particular class' && (
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Select Class</label>
                        <div className="flex mb-4 space-x-4">
                            <select
                                className={`w-full border rounded-lg px-3 py-2
                            ${darkMode
                                        ? 'bg-gray-700 border-gray-600 text-gray-200'
                                        : 'border-gray-300 bg-white'
                                    }`}
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                            >
                                <option value="">Select Class</option>
                                {classOptions.map(cls => (
                                    <option key={cls} value={cls}>{cls}</option>
                                ))}
                            </select>
                            {/* Similar dark mode styling for other selects */}
                            <select
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                value={selectedSection}
                                onChange={(e) => setSelectedSection(e.target.value)}
                                disabled={!selectedClass || loading}
                            >
                                <option value="">Select Section</option>
                                {sectionOptions.map(section => (
                                    <option key={section} value={section}>{section}</option>
                                ))}
                            </select>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleAddClass}
                                disabled={!selectedClass || !selectedSection}
                            >
                                Add
                            </button>
                        </div>

                        {/* Class and section list with dark mode */}
                        {classes.length > 0 && (
                            <ul className={`w-full mb-4 border rounded-lg px-3 py-2
                        ${darkMode
                                    ? 'bg-gray-700 border-gray-600 text-gray-200'
                                    : 'border-gray-300 bg-white'
                                }`}
                            >
                                {classes.map(cls => (
                                    <li key={cls.Class} className="mb-2">
                                        <div className={`flex justify-between mt-2 border shadow-md rounded-full px-2 items-center py-1
                                    ${darkMode
                                                ? 'bg-gray-800 border-gray-700'
                                                : 'border-gray-300 bg-white'
                                            }`}
                                        >
                                            <span>{cls.Class}: {cls.sections.join(', ')}</span>
                                            <FaRegTimesCircle
                                                className={`h-5 w-5 
                                            ${darkMode
                                                        ? 'text-red-400 hover:text-red-600'
                                                        : 'text-red-500'
                                                    }`}
                                                onClick={() => handleRemoveClass(cls.Class)}
                                            />
                                        </div>
                                        <ul>
                                            {cls.sections.map(section => (
                                                <li key={section} className="flex justify-between mt-2 border border-gray-300 shadow-md rounded-full px-2 items-center py-1">
                                                    <span>{section}</span>
                                                    <FaRegTimesCircle className="text-red-500 h-5 w-5" onClick={() => handleRemoveSection(cls.Class, section)} />
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {/* Submit button with dark mode */}
                <div className="flex justify-end mt-6">
                    <button
                        className={`font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out
                    ${darkMode
                                ? 'bg-blue-700 hover:bg-blue-800 text-white'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating...' : 'Create Discount'}
                    </button>
                </div>
            </div>
        </form>
    );
}

export default GlobalDiscount;