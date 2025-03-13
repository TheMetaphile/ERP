import React, { useContext, useState } from "react";
import WeekTable from './WeekTable';
import CurrentWeekHOD from "./CurrentWeekHOD";
import NextWeekHOD from './NextWeekHOD';
import AuthContext from "../../../../../Context/AuthContext";

const tabs = ["Current Week", "Next Week"];

const Tabs = ({ Class, section, subject, stream }) => {
    const { darkMode } = useContext(AuthContext);
    const [selectedTab, setSelectedTab] = useState(tabs[0]);

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <div className={darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}>
            <div className={`flex mobile:max-tablet:flex-col-reverse justify-between tablet:items-center mobile:max-tablet:p-1 p-4 pb-0 border-b overflow-auto mobile:max-tablet:pl-0 
            ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`p-2 mobile:max-tablet:p-1 mx-1 
                        ${selectedTab === tab
                                    ? (darkMode
                                        ? "text-blue-400 border-b-2 border-blue-400"
                                        : "text-blue-600 border-b-2 border-blue-600")
                                    : (darkMode
                                        ? "text-gray-400"
                                        : "text-gray-600")}`}
                            onClick={() => handleTabChange(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
            {selectedTab === 'Current Week' ? (
                <CurrentWeekHOD
                    selectedTab={selectedTab}
                    Class={Class}
                    section={section}
                    subject={subject}
                    stream={stream}
                />
            ) : (
                <NextWeekHOD
                    selectedTab={selectedTab}
                    Class={Class}
                    section={section}
                    subject={subject}
                    stream={stream}
                />
            )}
        </div>
    );
};

export default Tabs;
