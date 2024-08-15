import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Fees from "./fees";
import PreviousFee from "./PreviousFee/PreviousFee";

const tabs = ["Current Session", "Previous Session"];

const TabsStudentFee = () => {
    const [selectedTab, setSelectedTab] = useState(tabs[0]);

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    const tabVariants = {
        inactive: { backgroundColor: "#E5E7EB", color: "#4B5563" },
        active: { backgroundColor: "#3B82F6", color: "#FFFFFF" }
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className=" min-h-screen p-3">
            <div className=" ">
                <motion.div 
                    className="flex justify-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex space-x-2 mb-4">
                        {tabs.map((tab) => (
                            <motion.button
                                key={tab}
                                className={`px-4 py-2 rounded-full text-sm font-medium focus:outline-none`}
                                variants={tabVariants}
                                animate={selectedTab === tab ? "active" : "inactive"}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleTabChange(tab)}
                            >
                                {tab}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedTab}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.1 }}
                    >
                        {selectedTab === 'Current Session' ? (
                            <Fees />
                        ) : (
                            <PreviousFee />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TabsStudentFee;