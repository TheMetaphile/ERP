import { motion } from "framer-motion";
import menuItems from "./helper.js";
import { useContext, useState } from "react";
// import { Link } from 'react-router-dom';
import ExpansionTile from "../../AdminComponents/utils/ExpansionTile.jsx";
import AuthContext from "../../Context/AuthContext.jsx";

export default function SubadminDrawer({ isOpen }) {
    const [active, setActive] = useState(null);
    const { authState } = useContext(AuthContext);
    const handleClick = (index) => {
        setActive(index)
    }

    console.log(authState.userDetails.permissions)
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

            <div className="mt-4">
                {menuItems.map((menuItem, index) => (
                    (menuItem.title === 'Dashboard' || menuItem.title === 'Notice' || menuItem.title === 'Take Leave' || authState?.userDetails?.permissions.includes(menuItem.title) || (menuItem.children && menuItem.children.some((child => authState?.userDetails?.permissions.includes(child.text))))) &&
                    <div
                        key={index}
                        onClick={() => handleClick(index)}
                        className={`cursor-pointer rounded-lg ${active === index ? 'bg-purple-300' : ''}`}
                    >
                        <ExpansionTile

                            image={menuItem.image}
                            alternateText={menuItem.alt}
                            title={menuItem.title}
                            childrens={menuItem.children.filter(child => authState?.userDetails?.permissions.includes(child.text))}
                            route={menuItem.route}
                        />
                    </div>
                ))}
            </div>
        </motion.div>
    );
}