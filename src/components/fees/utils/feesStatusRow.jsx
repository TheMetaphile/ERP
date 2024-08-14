import React, { useEffect, useState, useContext } from "react";
import axios from 'axios'
import Loading from "../../../LoadingScreen/Loading.jsx";
import AuthContext from "../../../Context/AuthContext.jsx";
import { BASE_URL_Fee } from "../../../Config.js";
import { motion } from "framer-motion";

export default function FeeStatusRow() {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);


    useEffect(() => {
        if (authState.accessToken) {
            setLoading(true);
            fetchStatus();
        } else {
            toast.error('No access token available');
        }
    }, [authState.accessToken]);

    const fetchStatus = async () => {
        console.log(authState.userDetails.currentClass, 'Class')
        try {
            const response = await axios.get(`${BASE_URL_Fee}/fee/fetch/stats?end=20&start=0&class=${authState.userDetails.currentClass}`, {
                headers: {
                    'Authorization': `Bearer ${authState.accessToken}`
                }
            });

            console.log("API response status:", response.data);
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
      if (details === null) return <div className="text-center text-gray-500 text-lg">No data available</div>;
    
      const feeData = [
        { title: "Total Fees", amount: details.total, color: "bg-yellow-200" },
        { title: "Discount", amount: details.discount, color: "bg-green-200" },
        { title: "Payable", amount: details.total - details.discount, color: "bg-orange-200" },
        { title: "Paid", amount: details.paid, color: "bg-green-200" },
        { title: "Pending", amount: details.total - details.discount - details.paid, color: "bg-orange-200" }
      ];


    return (
        <motion.div
        className="grid grid-cols-5 mobile:max-tablet:grid-cols-1 tablet:max-laptop:grid-cols-3 gap-4 p-4 w-full border border-gray-300 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {feeData.map((data, index) => (
          <motion.div key={index} variants={cardVariants}>
            <FeeStatusCard {...data} />
          </motion.div>
        ))}
      </motion.div>
      );
}

const FeeStatusCard = ({ title, amount, color }) => (
    <motion.div
      className={`fee-status h-fit p-6 shadow-lg rounded-xl border border-gray-300 flex flex-col items-center justify-center ${color} flex-1 backdrop-filter backdrop-blur-lg bg-opacity-80`}
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.h1
        className="text-3xl font-bold mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        ₹{amount}
      </motion.h1>
      <motion.p
        className="text-lg font-medium text-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {title}
      </motion.p>
    </motion.div>
  );