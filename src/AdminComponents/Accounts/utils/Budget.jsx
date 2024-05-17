import React, { useState } from 'react';
import { bus, electricity, paper } from '../images';

const Budget = () => {
    const [totalBudget, setTotalBudget] = useState(null);
    const [totalSpent, setTotalSpent] = useState(0);

    const handleSetBudget = () => {
        // Handle setting the budget logic here
    };

    return (
        <div className="flex flex-col p-4 shadow-lg rounded-lg">
            <div className="flex items-center">
                <div className="mx-2 w-40 h-40 flex items-center justify-center mr-4 rounded-full border border-gray-600  text-lg font-bold">
                    No Budget
                </div>
                <div>
                    <div className="flex mb-2 gap-2">
                        <img src={bus} alt="" className='h-14 w-14' />
                        <div className="mt-4 flex-grow mx-2 h-2 bg-gray-400 w-80 rounded-full"></div>
                        <div className="mt-2 whitespace-nowrap text-right">₹ 0.00</div>
                    </div>
                    <div className="flex mb-2">
                        <img src={paper} alt="" className='h-14 w-14' />
                        <div className="mt-4 flex-grow mx-2 h-2 bg-gray-400 w-80 rounded-full"></div>
                        <div className="mt-2 whitespace-nowrap text-right">₹ 0.00</div>
                    </div>
                    <div className="flex mb-2">
                        <img src={electricity} alt="" className='h-14 w-14' />
                        <div className="mt-4 flex-grow mx-2 h-2 bg-gray-400 w-80 rounded-full"></div>
                        <div className="mt-2 whitespace-nowrap text-right">₹ 0.00</div>
                    </div>
                </div>
            </div>
            <div className='flex justify-between'>
            <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md mx-2"
                    onClick={handleSetBudget}
                >
                    Set Budget
                </button>
                <div className="flex mb-2">
                    <div className="text-lg">Total Budget:&nbsp;</div>
                    <div className="text-lg">
                        {totalBudget ? `₹ ${totalBudget}` : 'Not set'}
                    </div>
                </div>
                <div className="flex mb-4">
                <div className="text-lg">Total Spent:&nbsp;</div>
                    <div className="text-lg">₹ {totalSpent}</div>
                </div>
            </div>
        </div>
    );
};

export default Budget;