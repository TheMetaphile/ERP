import React, { useState, useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
// import { useFilters } from '../Students/utils/Filters';
import AuthContext from '../../../Context/AuthContext';
import { IoAddCircleOutline } from "react-icons/io5";
import { FaUser, FaEnvelope, FaRupeeSign, FaGraduationCap, FaCalendarAlt, FaLayerGroup, FaBook } from 'react-icons/fa';
import { MdOutlinePayments } from "react-icons/md";
import { IoReceiptSharp } from "react-icons/io5";
import { BASE_URL } from '../../../Config';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRef } from 'react';

const getSessions = () => {
    const currentYear = new Date().getFullYear();
    const newSessions = [];

    for (let i = 0; i < 5; i++) {
        const startYear = currentYear - i;
        const endYear = startYear + 1;
        newSessions.push(`${startYear}-${endYear.toString().slice(-2)}`);
    }

    return newSessions;
}

const Transactions = () => {
    const { authState, logout, updateAccessToken } = useContext(AuthContext);

    const session = getSessions();
    const [selectedSession, setSelectedSession] = useState(session[0]);


    const ref = useRef();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState("");
    const [amount, setAmount] = useState("");
    const [mode, setMode] = useState("");
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [transactionData, setTransactionData] = useState(null);
    const [receiptNo, setReceiptNo] = useState("");
    const [subject, setSubject] = useState('');
    const [transactionType, setTransactionType] = useState('semester');

    const dropdownRef = useRef(null);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const oneMonthBefore = new Date();
    oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1);

    const formattedOneMonthBefore = oneMonthBefore.toISOString().split("T")[0];

    const [startDate, setStartDate] = useState(formattedOneMonthBefore);
    const [endDate, setEndDate] = useState(tomorrow.toISOString().split("T")[0]);
    const [searchMain, setSearchMain] = useState("");


    useEffect(() => {
        const handler = setTimeout(async () => {
            handleSearchChange();
        }, 500);
        return () => {
            clearTimeout(handler);
        };
    }, [searchMain]);

    const handleSearchChange = () => {
        // setFilters({ ...filters, searchMain });
    };

    const handleAddTransaction = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSearch('');
        setSelectedStudent('');
        setAmount('');
        setMode('');
        setReceiptNo('');
        setSubject('');
        setTransactionType('semester');
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const formatDateTime = () => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    };

    const handleSubmitTransaction = async () => {
        const datee = formatDateTime();


        const requestData =  {
            token: authState?.accessToken,
            studentID: selectedStudent._id,
            amount: amount,
            date: datee,
            status: "Success",
            installment_id: `${datee}-${selectedStudent.email}`,
            order_id: new Date().toLocaleString("en-US", { month: "long" }),
            payment_id: `${mode}-${Date.now()}`,
            signature: `${mode}`,
            discount: 0,
        } 
        setTransactionData(requestData);
        setIsModalOpen(false);
        //console.log(course, transactionData, selectedStudent)

        if (!amount) {
            toast.error('Please fill all fields');
            return;
        }
        try {
            const response = await axios.post(`${BASE_URL}/fee/payment`,
                requestData,
                {
                    headers: {
                        'Authorization': `Bearer ${authState?.accessToken}`
                    }
                });
            toast.success("Transaction added Successfully");
            handleCloseModal();
        } catch (error) {
            console.error('Error fetching back fee status:', error);
            //console.error('Error fetching agents:', error.response.data.error);
       
        }
    };

    const fetchSuggestions = async (value) => {
        if (value.trim() === "") {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        try {

            const response = await axios.post(`${BASE_URL}/search/student`, {
                accessToken: authState?.accessToken,
                searchString: value,
                start: 0,
                end: 30
            })

            //console.log(response.data.Students);
            setSuggestions(response.data.Teachers);
            setShowSuggestions(true);
        } catch (error) {
            setSuggestions([]);
            setShowSuggestions(false);
            console.error('Error fetching agents:', error.response.data.error);

        }
    };

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearch(value);
        fetchSuggestions(value);
    };

    const toggleWheel = () => {
        setTransactionType(
            transactionType === 'semester' ? 'backlog' : 'semester'
        );
    };



    const handleChange = (event) => {
        setSelectedSession(event.target.value);
    };

    const handleDownload = async () => {
        try {
            await axios.get(`${BASE_URL}/fee/export/Transaction?session=${selectedSession}&startDate=${startDate}&endDate=${endDate}`, {
                headers: {
                    'Authorization': `Bearer ${authState?.accessToken}`
                },
                responseType: 'blob'
            })
                .then((response) => {
                    const link = document.createElement('a');

                    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

                    const url = window.URL.createObjectURL(blob);

                    link.href = url;
                    link.setAttribute('download', `Transaction_${selectedSession}_${startDate}_${endDate}.xlsx`);

                    document.body.appendChild(link);

                    link.click();

                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                })

        } catch (error) {
            console.error('Error fetching back fee status:', error);
            //console.error('Error fetching agents:', error.response.data.error);

        }
    };

    return (
        <div className="flex flex-col flex-grow">
            <div className="bg-white flex-grow rounded-lg shadow-lg p-2">
                <div className="flex justify-between items-center mb-4 mobile:max-tablet:flex-col">
                    <h1 className="text-2xl font-bold mb-3 mobile:max-tablet:text-sm mobile:max-tablet:font-semibold">
                        Fee Transaction Dashboard
                    </h1>

                    <div className='flex justify-end gap-2 mobile:max-tablet:flex-col'>
                        <div className=' flex gap-2'>
                            <select id="sessionSelector" value={selectedSession} onChange={handleChange} className="bg-white border-2 border-blue-300 rounded-md py-2 px-4 text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
                                {session.map((session, index) => (
                                    <option key={index} value={session}>{session}</option>
                                ))}
                            </select>

                        </div>

                        {/* <div className="relative" ref={ref}>
                            <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 z-10" />
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md px-2"
                                placeholder="Enter student name"
                                value={searchMain}
                                onChange={(e) => setSearchMain(e.target.value)}
                            />
                        </div> */}
                        <button
                            className='bg-blue-500 hover:bg-blue-600 mobile:max-tablet:text-xs whitespace-nowrap rounded-lg shadow-md px-4 py-2 text-white flex items-center'
                            onClick={handleAddTransaction}
                        >
                            <IoAddCircleOutline className="mr-2" />
                            Add Transaction
                        </button>

                    </div>

                </div>
                <div className="flex justify-end items-center mb-3">

                    <div className='flex gap-2'>
                        <div className="flex items-center space-x-4">
                            <div>
                                <input
                                    type="date"
                                    id="startDate"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    max={endDate}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <input
                                    type="date"
                                    id="endDate"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    min={startDate}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>

                        <button
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
                            onClick={handleDownload}
                        >
                            Download Report
                        </button>
                    </div>

                </div>


                {isModalOpen && (
                    <div
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-10" ref={dropdownRef}
                    >
                        <div className="bg-white rounded-lg mobile:max-tablet:p-4 mobile:max-tablet:w-full mobile:max-tablet:mx-10 p-6 shadow-lg w-1/2">
                            <div className='flex justify-between'>
                                <h2 className="text-xl font-bold mb-4 text-blue-600">Add Transaction</h2>
                            </div>

                            <div className="grid md:grid-cols-1 grid-cols-2 gap-6">
                                <div className="relative">
                                    <label className="mb-2 text-sm font-medium text-blue-800 flex items-center">
                                        <FaUser className="mr-2 text-blue-600" size={20} />
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 bg-white"
                                        placeholder="Enter student name"
                                        value={search}
                                        onChange={handleSearch}
                                    />
                                    <FaUser className="absolute left-3 top-[2.6rem] text-blue-400" size={20} />

                                    {showSuggestions && search && (
                                        <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                                            {suggestions.map((suggestion) => (
                                                <li
                                                    key={suggestion._id}
                                                    className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                                                    onClick={() => {
                                                        setSearch(suggestion.name);
                                                        setSelectedStudent(suggestion);
                                                        setShowSuggestions(false);
                                                    }}
                                                >
                                                    <img src={suggestion.profileLink} alt="Profile" className='w-6 h-6 rounded-full mr-2' />
                                                    {suggestion.name}
                                                </li>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="relative">
                                    <label className="mb-2 text-sm font-medium text-blue-800 flex items-center">
                                        <FaEnvelope className="mr-2 text-blue-600" size={20} />
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 bg-white"
                                        placeholder="Enter email"
                                        value={selectedStudent.email}
                                    // readOnly
                                    />
                                    <FaEnvelope className="absolute left-3 top-[2.6rem] text-blue-400" size={20} />
                                </div>

                          
                                <div className="relative">
                                    <label className="mb-2 text-sm font-medium text-blue-800 flex items-center">
                                        <FaRupeeSign className="mr-2 text-blue-600" size={20} />
                                        Amount
                                    </label>
                                    <input
                                        id="amount"
                                        type="number"
                                        onKeyDown={(e) => {
                                            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                                                e.preventDefault();
                                            }
                                        }}
                                        onWheel={(e) => e.target.blur()}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 bg-white"
                                        placeholder="Enter the amount"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                    <FaRupeeSign className="absolute left-3 top-[2.6rem] text-blue-400" size={20} />
                                </div>

                                <div className="relative">
                                    <label className="mb-2 text-sm font-medium text-blue-800 flex items-center">
                                        <MdOutlinePayments className="mr-2 text-blue-600" size={20} />
                                        Mode
                                    </label>
                                    <select
                                        id="mode"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 bg-white appearance-none"
                                        value={mode}
                                        onChange={(e) => setMode(e.target.value)}
                                    >
                                        <option value="" disabled>Select Mode</option>
                                        <option value="Cash">Cash</option>
                                        <option value="UPI">UPI</option>
                                        <option value="Cheque">Cheque</option>
                                        <option value="Demard Draft">Demard Draft</option>
                                        <option value="Net Banking">Net Banking</option>
                                    </select>

                                </div>
                                {mode && mode !== "Cash" && (
                                    <div className="relative">
                                        <label className="mb-2 text-sm font-medium text-blue-800 flex items-center" htmlFor="receiptNo">
                                            <IoReceiptSharp className="mr-2 text-blue-600" size={20} />
                                            Receipt No.
                                        </label>
                                        <input
                                            type="text"
                                            id="receiptNo"
                                            className="w-full pl-4 pr-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 bg-white"
                                            placeholder="Enter Receipt Number"
                                            value={receiptNo}
                                            onChange={(e) => setReceiptNo(e.target.value)}
                                        />
                                    </div>
                                )}


                            </div>

                            <div className="flex justify-between space-x-4 mt-6">
                                <button
                                    className="flex-1 bg-gray-200 text-gray-700 rounded-xl py-3 hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center"
                                    onClick={handleCloseModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl py-3 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
                                    onClick={handleSubmitTransaction}
                                >
                                    Submit Transaction
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <Outlet context={{ transactionData, startDate, endDate, selectedStudent, searchMain, selectedSession }} />
            </div>
        </div >
    );
};

export default Transactions;
