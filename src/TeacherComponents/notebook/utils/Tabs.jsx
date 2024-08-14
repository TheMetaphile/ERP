import React from "react";
import { Link } from "react-router-dom";

const tabs = ["All", "New"];

const Tabs = ({ selectedTab, onTabChange ,Class,Section,Subject}) => {
  return (
    <div className="flex mobile:max-tablet:flex-col-reverse justify-between tablet:items-center px-4 pb-0 border-y mb-2 overflow-auto ">
      <div className="flex">
        {tabs.map((tab) => (
          <Link
          to={`/Teacher-Dashboard/notebook/${tab}?Class=${Class}&Section=${Section}&Subject=${Subject}`}
            key={tab}
            className={`p-2 mx-1 font-medium ${selectedTab === tab ? "text-purple-600 border-y-2 border-purple-600" : "text-gray-600 "}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </Link>
        ))}
      </div>

    </div>
  );
};

export default Tabs;
