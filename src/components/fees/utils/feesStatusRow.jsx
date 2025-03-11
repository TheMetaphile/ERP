import React, { useEffect, useState, useContext } from "react";
import axios from 'axios'
import Loading from "../../../LoadingScreen/Loading.jsx";
import AuthContext from "../../../Context/AuthContext.jsx";
import { BASE_URL } from "../../../Config.js";
import { motion } from "framer-motion";
import { toast } from 'react-toastify';

export default function FeeStatusRow({ darkMode }) {
  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);

  // Dark mode classes
  const bgClass = darkMode
    ? "from-gray-800 to-gray-900 border-gray-700"
    : "from-blue-100 to-blue-100 border-gray-300";
  const textClass = darkMode ? "text-white" : "text-gray-700";
  const subTextClass = darkMode ? "text-gray-400" : "text-gray-600";

  useEffect(() => {
    if (authState?.accessToken) {
      setLoading(true);
      fetchStatus();
    } else {
      toast.error('No access token available');
    }
  }, [authState?.accessToken]);

  const fetchStatus = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/fee/fetch/stats?end=20&start=0&class=${authState?.userDetails?.currentClass}`, {
        headers: {
          'Authorization': `Bearer ${authState?.accessToken}`
        }
      });

      setDetails(response.data);
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  if (loading) return <Loading />;
  if (details === null) return <div className={`text-center ${subTextClass} text-lg`}>No data available</div>;

  const feeData = [
    {
      title: "Total Fees",
      amount: details.total,
      color: darkMode ? "bg-yellow-900 bg-opacity-50" : "bg-yellow-200"
    },
    {
      title: "Discount",
      amount: details.discount,
      color: darkMode ? "bg-green-900 bg-opacity-50" : "bg-green-200"
    },
    {
      title: "Payable",
      amount: details.total - details.discount,
      color: darkMode ? "bg-orange-900 bg-opacity-50" : "bg-orange-200"
    },
    {
      title: "Paid",
      amount: details.paid,
      color: darkMode ? "bg-green-900 bg-opacity-50" : "bg-green-200"
    },
    {
      title: "Pending",
      amount: details.total - details.discount - details.paid,
      color: darkMode ? "bg-orange-900 bg-opacity-50" : "bg-orange-200"
    }
  ];

  return (
    <motion.div
      className={`grid grid-cols-5 mobile:max-tablet:grid-cols-1 tablet:max-laptop:grid-cols-3 gap-4 p-4 w-full border rounded-xl bg-gradient-to-br ${bgClass}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {feeData.map((data, index) => (
        <motion.div key={index} variants={cardVariants}>
          <FeeStatusCard
            {...data}
            darkMode={darkMode}
            textClass={textClass}
            subTextClass={subTextClass}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

const FeeStatusCard = ({ title, amount, color, darkMode, textClass, subTextClass }) => (
  <motion.div
    className={`fee-status h-fit p-6 shadow-lg rounded-xl border flex flex-col items-center justify-center ${color} flex-1 
      ${darkMode
        ? 'border-gray-700 backdrop-filter backdrop-blur-lg bg-opacity-30'
        : 'border-gray-300 backdrop-filter backdrop-blur-lg bg-opacity-80'
      }`}
    whileHover={{
      scale: 1.05,
      boxShadow: darkMode
        ? "0px 10px 20px rgba(255,255,255,0.1)"
        : "0px 10px 20px rgba(0,0,0,0.1)"
    }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <motion.h1
      className={`text-3xl mobile:max-tablet:text-lg font-bold mb-2 ${textClass}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      ₹{amount}
    </motion.h1>
    <motion.p
      className={`text-lg font-medium ${subTextClass}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {title}
    </motion.p>
  </motion.div>
);