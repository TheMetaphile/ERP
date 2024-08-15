import React from "react";
import { FiUpload } from "react-icons/fi";

const tabs = ["Transactions"];
// const tabs = ["Reports", "Transactions", "Credit", "Debit", "Upcoming", "Due"];


const Tabs = ({ selectedTab, onTabChange }) => {
  return (
    <div>
      <div className="flex mobile:max-tablet:flex-col-reverse justify-between tablet:items-center p-4 pb-0 border-b overflow-auto ">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`p-2 mx-1 ${selectedTab === tab ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600 "}`}
              onClick={() => onTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* <div className="">
          <button className="bg-purple-500 text-white p-2 rounded flex gap-2 items-center whitespace-nowrap">
            <FiUpload /> Export Data</button>
        </div> */}
      </div>
    </div>
  );
};

export default Tabs;
