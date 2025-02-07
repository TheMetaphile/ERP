import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL_Fee } from '../../../Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateDiscount from '../Discount/CreateDiscount';
import { MdAdd, MdRemove } from 'react-icons/md';
import CompleteCreateDiscount from './CompleteCreateDiscount';

function CompleteFee({ selectedSession }) {
    const { authState } = useContext(AuthContext);
    const [selectedSuggestion, setSelectedSuggestion] = useState({});
    const [amount, setAmount] = useState('');
    const [temp, setTemp] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);
    const [showDiscountStructure, setShowDiscountStructure] = useState(false);

    // New state variables for additional fields
    const [currentClass, setCurrentClass] = useState('');
    const [section, setSection] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [discounts, setDiscounts] = useState([]);
    const [feeStructure, setFeeStructure] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [view, setView] = useState('monthly'); // State for view selection

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleToggleDiscountStructure = () => {
        setShowDiscountStructure(!showDiscountStructure);
    };


    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            setShowSuggestions(false);
        }
    };

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setSelectedSuggestion({ ...selectedSuggestion, 'name': value });
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (suggestion) => {
        setSelectedSuggestion(suggestion);
        setCurrentClass(suggestion.currentClass);
        setSection(suggestion.section);
        setRollNumber(suggestion.rollNumber);
        setDiscounts(suggestion.discounts || []);
        setFeeStructure(suggestion.feeStructure || {});
        setTransactions(suggestion.transactions || []);
        setShowSuggestions(false);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setTemp(selectedSuggestion.name);
        }, 500);
        return () => {
            clearTimeout(handler);
        }
    }, [selectedSuggestion]);

    useEffect(() => {
        if (temp) {
            const searchStudent = async () => {
                try {
                    const response = await axios.get(`${BASE_URL_Fee}/fee/fetch/students/list?searchString=${temp}`, {
                        headers: {
                            Authorization: `Bearer ${authState.accessToken}`
                        }
                    });
                    const StudentEmails = response.data.students.map(Student => ({
                        name: Student.name,
                        profileLink: Student.profileLink,
                        email: Student.email,
                        currentClass: Student.currentClass,
                        section: Student.section,
                        rollNumber: Student.rollNumber,
                        discounts: Student.discounts,
                        feeStructure: Student.feeStructure,
                        transactions: Student.transactions,
                        session: Student.session
                    }));
                    setSuggestions(StudentEmails);
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
            const response = await axios.post(`${BASE_URL_Fee}/fee/apply/discount`,
                {
                    email: selectedSuggestion.email,
                    amount: Number(amount),
                    session: selectedSession,
                    date: new Date()
                    // email: selectedSuggestion.email,
                    // amount: Number(discountData.amount),
                    // session: selectedSuggestion.session,
                    // date: new Date(),
                    // discountType: discountData.discountType,
                    // givenBy: discountData.givenBy,
                    // permission: discountData.permission,
                    // title: discountData.title,
                    // duration: discountData.duration,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                }
            );

            if (response.status === 200) {
                toast.success('Discount created successfully');
                setSelectedSuggestion({});
                setAmount('');
                setCurrentClass('');
                setSection('');
                setRollNumber('');
                setDiscounts([]);
                setFeeStructure({});
                setTransactions([]);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error creating discount');
        } finally {
            setIsLoading(false);
        }
    };

    const handleApplyDiscount = async (discountData) => {
        try {
            const response = await axios.post(`${BASE_URL_Fee}/fee/apply/discount`,
                {
                    // email: selectedSuggestion.email,
                    // amount: Number(amount),
                    // session: selectedSession,
                    // date: new Date()
                    email: selectedSuggestion.email,
                    amount: Number(discountData.amount),
                    session: selectedSuggestion.session,
                    date: new Date(),
                    discountType: discountData.discountType,
                    givenBy: discountData.givenBy,
                    permission: discountData.permission,
                    title: discountData.title,
                    duration: discountData.duration,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                }
            );

            if (response.status === 200) {
                toast.success('Discount created successfully');
                setSelectedSuggestion({});
                setAmount('');
                setCurrentClass('');
                setSection('');
                setRollNumber('');
                setDiscounts([]);
                setFeeStructure({});
                setTransactions([]);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error creating discount');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="mt-4 w-full p-6 rounded-lg shadow-md border bg-white">
            <ToastContainer />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div ref={inputRef} className="relative">
                    <label className="block text-gray-700 font-medium mb-2">Student Email</label>
                    <input
                        type="text"
                        name="email"
                        value={selectedSuggestion.name || ''}
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

            </div>
            {selectedSuggestion.name && (
                <div className="mb-6">
                    <h3 className="text-xl font-bold mb-4">Student Details</h3>
                    <p><strong>Class:</strong> {currentClass}</p>
                    <p><strong>Section:</strong> {section}</p>
                    <p><strong>Roll Number:</strong> {rollNumber}</p>
                </div>
            )}

            {discounts.length > 0 || !showDiscountStructure ? (
                <div className="mb-6">
                    <h3 className="text-xl font-bold mb-4">Discounts</h3>

                    {selectedSuggestion && Object.keys(selectedSuggestion).length > 0 && (
                        <button
                            className={`flex items-center gap-2 py-2 px-4 rounded-md text-white transition duration-300 ${showDiscountStructure ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-500 hover:bg-purple-600'}`}
                            onClick={handleToggleDiscountStructure}
                        >
                            {showDiscountStructure ? <><MdRemove /> Cancel</> : <><MdAdd /> Add</>}
                        </button>
                    )}

                    {showDiscountStructure && (
                        <CompleteCreateDiscount onApplyDiscount={handleApplyDiscount} />
                    )}

                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2">Class</th>
                                <th className="py-2">Session</th>
                                <th className="py-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {discounts.map((discount, idx) => (
                                <tr key={idx} className="text-center">
                                    <td className="py-2">{discount.class}</td>
                                    <td className="py-2">{discount.session}</td>
                                    <td className="py-2">{discount.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="mb-6">
                    <h3 className="text-xl font-bold mb-4">Discounts</h3>

                    {selectedSuggestion && Object.keys(selectedSuggestion).length > 0 && (
                        <button
                            className={`flex items-center gap-2 py-2 px-4 rounded-md text-white transition duration-300 ${showDiscountStructure ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-500 hover:bg-purple-600'}`}
                            onClick={handleToggleDiscountStructure}
                        >
                            {showDiscountStructure ? <><MdRemove /> Cancel</> : <><MdAdd /> Add</>}
                        </button>
                    )}

                    {showDiscountStructure && (
                        <CompleteCreateDiscount onApplyDiscount={handleApplyDiscount} />
                    )}
                </div>
            )}

            {selectedSuggestion.name && (
                <div className="mb-6">
                    <h3 className="text-xl font-bold mb-4">Fee Structure</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">View</label>
                        <select
                            value={view}
                            onChange={(e) => setView(e.target.value)}
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                        </select>
                    </div>
                    {view === 'monthly' && feeStructure.monthlyStatus && (
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2">Month</th>
                                    <th className="py-2">Amount</th>
                                    <th className="py-2">Status</th>
                                    <th className="py-2">Discount Applied</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feeStructure.monthlyStatus.map((month, idx) => (
                                    <tr key={idx} className="text-center">
                                        <td className="py-2">{month.month}</td>
                                        <td className="py-2">{month.amount}</td>
                                        <td className="py-2">{month.status}</td>
                                        <td className="py-2">{month.discountApplied}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {view === 'quarterly' && feeStructure.quarterlyStatus && (
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2">Quarter</th>
                                    <th className="py-2">Months</th>
                                    <th className="py-2">Amount</th>
                                    <th className="py-2">Status</th>
                                    <th className="py-2">Pending Fee</th>
                                    <th className="py-2">Discount Applied</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feeStructure.quarterlyStatus.map((quarter, idx) => (
                                    <tr key={idx} className="text-center">
                                        <td className="py-2">{quarter.quarter}</td>
                                        <td className="py-2">{quarter.months.join(', ')}</td>
                                        <td className="py-2">{quarter.amount}</td>
                                        <td className="py-2">{quarter.status}</td>
                                        <td className="py-2">{quarter.pendingFee}</td>
                                        <td className="py-2">{quarter.discountApplied}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
            {transactions.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-xl font-bold mb-4">Transactions</h3>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2">Date</th>
                                <th className="py-2">Amount</th>
                                <th className="py-2">Payment Status</th>
                                <th className="py-2">Order ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, idx) => (
                                <tr key={idx} className="text-center">
                                    <td className="py-2">{new Date(transaction.date).toLocaleDateString()}</td>
                                    <td className="py-2">{transaction.amount}</td>
                                    <td className="py-2">{transaction.payment_status}</td>
                                    <td className="py-2">{transaction.order_id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
}

export default CompleteFee;