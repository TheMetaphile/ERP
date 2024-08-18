import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";

function FeeSubAdmin() {
    const [selectedLink, setSelectedLink] = useState('/Sub-Admin/StudentsFee/details');

    const handleLinkSelect = (link) => {
        setSelectedLink(link);
    };

    const linkVariants = {
        hover: { scale: 1.05, transition: { duration: 0.2 } },
        tap: { scale: 0.95 }
    };

    const pageTransition = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    return (
        <motion.div 
            className="flex flex-col px-6 overflow-auto items-start  no-scrollbar pt-4  min-h-screen"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className=" rounded-lg w-full bg-white shadow-lg p-2"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex  items-center justify-between">
                    <div className="flex gap-4 w-full">
                        {[
                            { path: '/Sub-Admin/StudentsFee/structure', label: 'Fee Structure' },
                            { path: '/Sub-Admin/StudentsFee/details', label: 'Fee Status' },
                            { path: '/Sub-Admin/StudentsFee/feediscount', label: 'Fee Discount' },
                            { path: '/Sub-Admin/StudentsFee/PreviousFeeSubAdmin', label: 'Previous Session' }
                        ].map((item) => (
                            <motion.div
                                key={item.path}
                                variants={linkVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <Link to={item.path} onClick={() => handleLinkSelect(item.path)}>
                                    <motion.h1 
                                        className={`p-2 mx-1 font-semibold text-lg transition-colors duration-300 ${
                                            selectedLink === item.path 
                                                ? "text-purple-600 border-b-2 border-purple-600" 
                                                : "text-gray-600 hover:text-purple-400"
                                        }`}
                                    >
                                        {item.label}
                                    </motion.h1>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <motion.hr 
                    className='border-t-2 bg-purple-200 mt-2 mb-3'
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <Outlet />
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default FeeSubAdmin