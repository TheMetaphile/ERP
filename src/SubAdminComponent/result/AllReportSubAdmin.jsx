import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AllReportSubAdmin() {
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
            className='pt-4 px-6 bg-gradient-to-br from-purple-50 to-white min-h-screen'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="bg-white rounded-lg shadow-lg p-6 mb-6"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >

                <div className="flex space-x-4 ">
                    {tabs.map((tab) => (
                        <Link key={tab.name} to={tab.path} onClick={() => handleTabChange(tab.name)}>
                            <motion.div
                                className={`pb-2 px-4 relative ${selectedTab === tab.name
                                        ? "text-purple-600 font-semibold"
                                        : "text-gray-600 hover:text-purple-500"
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {tab.name}
                                {selectedTab === tab.name && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
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
            >
                <Outlet />
            </motion.div>
        </motion.div>
    )
}

