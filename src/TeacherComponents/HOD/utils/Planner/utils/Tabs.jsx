import React, { useState } from "react";
import WeekTable from './WeekTable';
import CurrentWeekHOD from "./CurrentWeekHOD";
import NextWeekHOD from './NextWeekHOD';

const tabs = ["Current Week", "Next Week"];

const Tabs = ({ Class, section, subject }) => {
    const [selectedTab, setSelectedTab] = useState(tabs[0]);

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <div>
            <div className="flex mobile:max-tablet:flex-col-reverse justify-between tablet:items-center mobile:max-tablet:p-1 p-4 pb-0 border-b overflow-auto mobile:max-tablet:pl-0">
                <div className="flex">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`p-2 mobile:max-tablet:p-1 mx-1 ${selectedTab === tab ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"}`}
                            onClick={() => handleTabChange(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
            {selectedTab === 'Current Week' ? (
                <CurrentWeekHOD selectedTab={selectedTab} Class={Class} section={section} subject={subject} />
            ) : (
                <NextWeekHOD selectedTab={selectedTab} Class={Class} section={section} subject={subject} />
            )}

        </div>
    );
};

export default Tabs;
