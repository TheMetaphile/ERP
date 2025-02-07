import React, { useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CompleteCreateDiscount({ onApplyDiscount }) {
    const [amount, setAmount] = useState('');
    const [discountType, setDiscountType] = useState('fixed');
    const [givenBy, setGivenBy] = useState('');
    const [permission, setPermission] = useState('');
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent the form from submitting by default

        const discountData = {
            amount,
            discountType,
            givenBy,
            permission,
            title,
            duration,
        };

        console.log(discountData);  // Debug log to check discount data

        onApplyDiscount(discountData);  // Call the passed in function
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4 w-full p-6 rounded-lg shadow-md border bg-white">

            <h2 className="text-2xl font-bold mb-6">Create Discount</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Discount Type</label>
                    <select
                        name="discountType"
                        value={discountType}
                        onChange={(e) => {
                            setDiscountType(e.target.value);
                            setAmount("");
                        }}
                        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="fixed">Fixed Amount</option>
                        <option value="percentage">Percentage</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Discount Amount</label>
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
                        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder={discountType === "percentage" ? "Enter percentage (0-100%)" : "Enter discount amount"}
                    />
                </div>


                <div>
                    <label className="block text-gray-700 font-medium mb-2">Discount Given By</label>
                    <input
                        type="text"
                        name="givenBy"
                        value={givenBy}
                        onChange={(e) => setGivenBy(e.target.value)}
                        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter who gave the discount"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Permission</label>
                    <input
                        type="text"
                        name="permission"
                        value={permission}
                        onChange={(e) => setPermission(e.target.value)}
                        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter permission details"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Title</label>
                    <select
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="staff">Staff Ward</option>
                        <option value="admin">Admin Discount</option>
                        <option value="superadmin">Superadmin Discount</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Duration (Months)</label>
                    <input
                        type="number"
                        name="duration"
                        value={duration}
                        max={12}
                        min={1}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter duration in months"
                    />
                </div>
            </div>
            <div className="flex justify-end">
                <button
                    className={`bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out `}
                    type="submit" 
                >
                    Create
                </button>
            </div>
        </form>
    );
}

export default CompleteCreateDiscount;