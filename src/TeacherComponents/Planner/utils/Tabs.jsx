import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaCalendarPlus } from "react-icons/fa";
import CurrentWeek from './CurrentWeek';
import NextWeek from './NextWeek';

const tabs = [
    { name: "Current Week", icon: <FaCalendarAlt /> },
    { name: "Next Week", icon: <FaCalendarPlus /> }
];

const Tabs = ({ Class, section, subject, darkMode }) => {
    const [selectedTab, setSelectedTab] = useState(tabs[0].name);

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className={`flex mobile:max-tablet:flex-col-reverse mobile:max-tablet:pl-0 justify-between tablet:items-center mobile:max-tablet:p-1 p-4 pb-0 border-b overflow-auto rounded-t-lg shadow-md ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                <div className="flex mobile:max-tablet:pl-0">
                    {tabs.map((tab) => (
                        <motion.button
                            key={tab.name}
                            className={`p-2 mobile:max-tablet:pl-0 mobile:max-tablet:p-1 mx-1 flex items-center ${selectedTab === tab.name
                                ? (darkMode
                                    ? 'text-blue-400 border-b-2 border-blue-400'
                                    : 'text-blue-600 border-b-2 border-blue-600')
                                : (darkMode
                                    ? 'text-gray-400 hover:text-white'
                                    : 'text-gray-600')
                                }`}
                            onClick={() => handleTabChange(tab.name)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {tab.icon}
                            <span className="ml-2">{tab.name}</span>
                        </motion.button>
                    ))}
                </div>
            </div>
            <motion.div
                key={selectedTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {selectedTab === 'Current Week' ? (
                    <CurrentWeek
                        selectedTab={selectedTab}
                        Class={Class}
                        section={section}
                        subject={subject}
                        darkMode={darkMode}
                    />
                ) : (
                    <NextWeek
                        selectedTab={selectedTab}
                        Class={Class}
                        section={section}
                        subject={subject}
                        darkMode={darkMode}
                    />
                )}
            </motion.div>
        </motion.div>
    );
};

export default Tabs;