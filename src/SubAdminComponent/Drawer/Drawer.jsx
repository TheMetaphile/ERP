import { motion } from "framer-motion";
import menuItems from "./helper.js";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function SubadminDrawer({ isOpen }) {
    const [active, setActive] = useState(null);

    const handleClick = (index) => {
        setActive(index === active ? null : index);
    };

    const drawerVariants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100%" },
    };

    return (
        <motion.div
            className={`${isOpen ? "h-screen py-6 px-4" : "w-0"
                } overflow-y-auto rounded-xl shadow-lg text-center items-center border border-gray-300 bg-white no-scrollbar`}
            variants={drawerVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <motion.div
                className="flex items-center justify-center mb-8"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <span className="text-purple-700 font-bold text-3xl">Accounts</span>
            </motion.div>

            <div className="space-y-2 ">
                {menuItems.map((menuItem, index) => (
                    <motion.div
                        key={index}
                        onClick={() => handleClick(index)}
                        className={`cursor-pointer rounded-lg  overflow-hidden ${active === index ? "bg-purple-100" : "hover:bg-purple-50"
                            }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link to={menuItem.route} className="flex items-center space-x-3 py-3 px-1">
                            <img
                                src={menuItem.image}
                                alt={menuItem.alt}
                                className="w-6 h-6"
                            />
                            <span className="text-lg font-medium text-gray-800">
                                {menuItem.title}
                            </span>
                        </Link>

                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}