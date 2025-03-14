import { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthContext from '../../Context/AuthContext';

export default function AllReportSubAdmin() {
    const { darkMode } = useContext(AuthContext);
    const [selectedTab, setSelectedTab] = useState("Report Card");

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    const tabs = [
        { name: "Report Card", path: "/Sub-Admin/Result" },
        { name: "Ex Student", path: "/Sub-Admin/Result/exStudent" },
    ];

    return (
        <motion.div
            className={`pt-4 px-6 ${darkMode 
                ? 'bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-gray-200' 
                : 'bg-gradient-to-br from-blue-50 to-white min-h-screen'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className={`${darkMode 
                    ? 'bg-gray-800 rounded-lg shadow-lg p-6 mb-6 text-gray-200 border border-gray-700' 
                    : 'bg-white rounded-lg shadow-lg p-6 mb-6'}`}
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="flex space-x-4">
                    {tabs.map((tab) => (
                        <Link key={tab.name} to={tab.path} onClick={() => handleTabChange(tab.name)}>
                            <motion.div
                                className={`pb-2 px-4 relative ${
                                    selectedTab === tab.name
                                        ? darkMode 
                                            ? "text-blue-400 font-semibold" 
                                            : "text-blue-600 font-semibold"
                                        : darkMode 
                                            ? "text-gray-400 hover:text-blue-300" 
                                            : "text-gray-600 hover:text-blue-500"
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {tab.name}
                                {selectedTab === tab.name && (
                                    <motion.div
                                        className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                                            darkMode ? "bg-blue-400" : "bg-blue-600"
                                        }`}
                                        layoutId="underline"
                                    />
                                )}
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className={darkMode ? "text-gray-200" : ""}
            >
                <Outlet />
            </motion.div>
        </motion.div>
    );
}