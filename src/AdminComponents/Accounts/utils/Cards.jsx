import React from 'react';

const Card = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between space-x-6 mobile:max-tablet:space-x-2">
        <div className="shadow-lg rounded-lg p-4  w-1/3 h-40 flex flex-col justify-between bg-yellow-200">
        <div className="text-center font-semibold text-lg">Spend this week</div>
            <span className="text-xl mr-2">Rs.5400</span>
            <span className="text-lg text-red-500">&#9660; 2.5%</span>
        </div>
        <div className="shadow-lg rounded-lg p-4 w-1/3 h-40 flex flex-col justify-between bg-yellow-200">
        <div className="text-center font-semibold text-lg">Total Profit</div>
            <span className="text-xl mr-2">Rs.1,531</span>
            <span className="text-lg text-green-500">&#9650; 5.4%</span>
        </div>
        <div className="shadow-lg rounded-lg p-4 w-1/3 h-40 flex flex-col justify-between bg-yellow-200">
        <div className="text-center font-semibold text-lg">Spending trend</div>
            <span className="text-xl mr-2">87%</span>
            <span className="text-lg text-green-500">&#9650; 4.5%</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
