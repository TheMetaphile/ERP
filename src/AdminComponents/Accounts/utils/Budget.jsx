import React, { useState } from 'react';
import { bus, electricity, paper } from '../images';

const Budget = () => {
    const [totalBudget, setTotalBudget] = useState(null);
    const [totalSpent, setTotalSpent] = useState(0);

    const handleSetBudget = () => {
        // Handle setting the budget logic here
    };

    return (
        <div className="flex flex-col p-4 rounded-lg bg-white shadow-md">
        <div className="flex flex-col lg:flex-row items-center ">
          <div className="mx-2 w-20 h-20 flex items-center justify-center mr-4 rounded-full border border-gray-600 text-lg font-bold text-center">
            No Budget
          </div>
          <div className="flex flex-col w-full lg:w-auto">
            <div className="flex   items-center">
              <img src={bus} alt="Bus" className="h-10 w-10" />
              <div className="flex-grow mx-2 h-2 bg-gray-400 rounded-full"></div>
              <div className=" whitespace-nowrap text-right text-sm lg:text-base">₹ 0.00</div>
            </div>
            <div className="flex  items-center">
              <img src={paper} alt="Paper" className="h-10 w-10" />
              <div className="flex-grow mx-2 h-2 bg-gray-400 rounded-full"></div>
              <div className=" whitespace-nowrap text-right text-sm lg:text-base">₹ 0.00</div>
            </div>
            <div className="flex  items-center">
              <img src={electricity} alt="Electricity" className="h-10 w-10" />
              <div className="flex-grow mx-2 h-2 bg-gray-400 rounded-full"></div>
              <div className=" whitespace-nowrap text-right text-sm lg:text-base">₹ 0.00</div>
            </div>
          </div>
        </div>
       
          <div className='flex items-center justify-between'>
          <div className="flex mb-2 items-center text-sm lg:text-base">
            <div className="text-lg">Total Budget:&nbsp;</div>
            <div className="text-lg">
              {totalBudget ? `₹ ${totalBudget}` : 'Not set'}
            </div>
          </div>
          <div className="flex mb-2 items-center text-sm lg:text-base">
            <div className="text-lg">Total Spent:&nbsp;</div>
            <div className="text-lg">₹ {totalSpent}</div>
          </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md mx-2 mb-2 lg:mb-0"
            onClick={handleSetBudget}
          >
            Set Budget
          </button>
          </div>
        
      </div>
    );
};

export default Budget;