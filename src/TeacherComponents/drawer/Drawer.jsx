import ExpansionTile from "../utils/ExpansionTile.jsx";
import menuItems from "./helper.js";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../Context/AuthContext.jsx";
import { MdDashboard, MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function TeacherDrawer({ isOpen }) {
  const { logout, authState, darkMode, toggleDarkMode } = useContext(AuthContext);
  const navigate = useNavigate();
  const [active, setActive] = useState(null)

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ${authState?.userDetails?.co_ordinator_wing}", authState?.userDetails);
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
    ? authState?.userDetails?.name.charAt(0).toUpperCase()
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
                  {authState?.userDetails?.name || "Teacher User"}
                </span>
                <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Teacher
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

        </motion.div>

        <div className="flex-grow overflow-y-auto px-3 py-3 no-scrollbar">
          <AnimatePresence>
            {menuItems.length > 0 ? (
              menuItems.map((menuItem, index) => (
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
                      : "hover:bg-gray-200"
                    } transition-all duration-200`}
                >
                  <div
                    onClick={(e) => {
                      if (menuItem.title === "My Inbox") {
                        e.preventDefault(); 
                        e.stopPropagation();
                        window.open(menuItem.route, "_blank", "noopener,noreferrer");
                      } else {
                        handleClick(index);
                      }
                    }}
                  >
                    <ExpansionTile

                      image={menuItem.image}
                      alternateText={menuItem.alt}
                      title={menuItem.title}
                      childrens={menuItem.children}
                      route={menuItem.route}
                      darkMode={darkMode}
                      isActive={active === index}
                      openInNewTab={menuItem.title === "My Inbox"}
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
              <span className="font-medium text-sm">Teacher Portal</span>
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
