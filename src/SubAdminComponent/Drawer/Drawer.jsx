import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import menuItems from "./helper.js";
import ExpansionTile from "../../AdminComponents/utils/ExpansionTile.jsx";
import AuthContext from "../../Context/AuthContext.jsx";
import { FaUserShield, FaSearch } from "react-icons/fa";
import { MdDashboard, MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export default function SubadminDrawer({ isOpen }) {
    const [active, setActive] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    // const [darkMode, setDarkMode] = useState(false);
    const { authState , darkMode, toggleDarkMode} = useContext(AuthContext);
    const [filteredMenuItems, setFilteredMenuItems] = useState([]);

    useEffect(() => {
        const filtered = menuItems.filter(
            (menuItem) =>
                menuItem.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (menuItem.title === "Dashboard" ||
                    menuItem.title === "Notice" ||
                    menuItem.title === "Take Leave" ||
                    authState?.userDetails?.permissions.includes(menuItem.title) ||
                    (menuItem.children &&
                        menuItem.children.some((child) =>
                            authState?.userDetails?.permissions.includes(child.text)
                        )))
        );
        setFilteredMenuItems(filtered);
    }, [searchQuery, authState?.userDetails?.permissions]);

    const handleClick = (index) => {
        setActive(index === active ? null : index);
    };

    const drawerVariants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100%" },
    };

    const menuItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.3,
                ease: "easeOut",
            },
        }),
    };

    const firstLetterOfName = authState?.userDetails?.name
        ? authState.userDetails.name.charAt(0).toUpperCase()
        : "A";

    return (
        <motion.div
            className={`${isOpen ? "h-full py-3 w-full lg:w-72" : "w-0"
                } overflow-y-auto rounded-xl shadow-lg text-center items-center border-r border-gray-200 ${darkMode
                    ? "bg-gray-900 text-white border-gray-700"
                    : "bg-white text-gray-800"
                } no-scrollbar transition-all duration-300`}
            variants={drawerVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <div className="flex flex-col h-full">
                {/* Header */}
                <motion.div
                    className={`px-4 pb-5 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl ${darkMode ? "bg-blue-800" : "bg-blue-600"} text-white`}>
                                {firstLetterOfName}
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="font-medium text-sm">
                                    {authState?.userDetails?.name || "Admin User"}
                                </span>
                                <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    Subadmin
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={toggleDarkMode}
                            className={`p-2 rounded-full ${darkMode
                                ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                } transition-colors`}
                        >
                            {darkMode ? (
                                <MdOutlineLightMode size={18} />
                            ) : (
                                <MdOutlineDarkMode size={18} />
                            )}
                        </button>
                    </div>

                    {/* Search */}
                    <div className={`relative rounded-lg overflow-hidden ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <FaSearch className={darkMode ? "text-gray-400" : "text-gray-500"} size={14} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search menu..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full py-2.5 pl-9 pr-4 outline-none ${darkMode
                                ? "bg-gray-800 text-white placeholder:text-gray-500"
                                : "bg-gray-100 text-gray-800 placeholder:text-gray-500"
                                }`}
                        />
                    </div>
                </motion.div>

                {/* Menu Items */}
                <div className="flex-grow overflow-y-auto px-3 py-3 no-scrollbar">
                    <AnimatePresence>
                        {filteredMenuItems.length > 0 ? (
                            filteredMenuItems.map((menuItem, index) => (
                                <motion.div
                                    key={index}
                                    custom={index}
                                    variants={menuItemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0, y: -10 }}
                                    className={`w-full mb-1.5 overflow-hidden rounded-lg ${active === index
                                        ? darkMode
                                            ? "bg-blue-900/40 ring-1 ring-blue-700"
                                            : "bg-blue-100"
                                        : darkMode
                                            ? "hover:bg-gray-800"
                                            : "hover:bg-gray-100"
                                        } transition-all duration-200`}
                                >
                                    <div onClick={() => handleClick(index)}>
                                        <ExpansionTile
                                            image={menuItem.image}
                                            alternateText={menuItem.alt}
                                            title={menuItem.title}
                                            childrens={menuItem.children.filter(child =>
                                                authState?.userDetails?.permissions.includes(child.text)
                                            )}
                                            route={menuItem.route}
                                            darkMode={darkMode}
                                            isActive={active === index}
                                        />
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className={`text-center py-8 rounded-lg ${darkMode ? "bg-gray-800 text-gray-400" : "bg-gray-50 text-gray-500"
                                    }`}
                            >
                                <MdDashboard size={40} className="mx-auto mb-2 opacity-30" />
                                <p>No menu items found</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer */}
                <motion.div
                    className={`mt-auto px-4 py-3 border-t ${darkMode ? "border-gray-800" : "border-gray-200"
                        }`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className={`flex items-center gap-3 rounded-lg p-3 cursor-pointer ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-blue-50 hover:bg-blue-100"
                        } transition-colors`}>
                        <FaUserShield className={darkMode ? "text-blue-400" : "text-blue-600"} size={18} />
                        <div className="flex flex-col items-start">
                            <span className="font-medium text-sm">Admin Portal</span>
                            <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                Version 2.0.4
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}