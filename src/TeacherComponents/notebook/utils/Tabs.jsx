import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBook, FaPlus } from "react-icons/fa";

const tabs = ["All", "New"];

const Tabs = ({ selectedTab, onTabChange, Class, Section, Subject }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex mobile:max-tablet:flex-col-reverse justify-between tablet:items-center px-4 pb-0 border-y mb-2 overflow-auto"
    >
      <div className="flex">
        {tabs.map((tab) => (
          <Link
            to={`/Teacher-Dashboard/notebook/${tab}?Class=${Class}&Section=${Section}&Subject=${Subject}`}
            key={tab}
            className={`p-2 mx-1 font-medium flex items-center ${
              selectedTab === tab
                ? "text-indigo-600 border-y-2 border-indigo-600"
                : "text-gray-600"
            }`}
            onClick={() => onTabChange(tab)}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              {tab === "All" ? <FaBook className="mr-2" /> : <FaPlus className="mr-2" />}
              {tab}
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default Tabs;