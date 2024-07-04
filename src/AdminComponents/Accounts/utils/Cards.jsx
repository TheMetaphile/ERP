import React from 'react';

const Card = () => {
  return (
    <div className="bg-white p-6 rounded-lg  h-full">
      <div className="flex justify-between space-x-6 mobile:max-tablet:space-x-0  h-full mobile:max-tablet:flex-col mobile:max-tablet:w-full mobile:max-tablet:gap-4">
        <div className="shadow-lg rounded-lg p-4  w-1/3 h-full flex flex-col justify-between bg-yellow-200 mobile:max-tablet:flex-row mobile:max-tablet:w-full ">
          <div className="text-center font-semibold text-lg">Spend this week</div>
          <span className="text-xl  text-center">Rs.5400</span>
          <span className="text-lg text-red-500 text-center">&#9660; 2.5%</span>
        </div>
        <div className="shadow-lg rounded-lg p-4 w-1/3 h-full flex flex-col justify-between bg-yellow-200 mobile:max-tablet:flex-row mobile:max-tablet:w-full mobile:max-tablet:">
          <div className="text-center font-semibold text-lg ">Total Profit</div>
          <span className="text-xl  text-center">Rs.1,531</span>
          <span className="text-lg text-green-500 text-center">&#9650; 5.4%</span>
        </div>
        <div className="shadow-lg rounded-lg p-4 w-1/3 h-full flex flex-col justify-between bg-yellow-200 mobile:max-tablet:flex-row mobile:max-tablet:w-full">
          <div className="text-center font-semibold text-lg">Spending trend</div>
          <span className="text-xl  text-center">87%</span>
          <span className="text-lg text-green-500 text-center">&#9650; 4.5%</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
