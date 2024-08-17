import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import Loading from "../../LoadingScreen/Loading";
import { BASE_URL_Notice } from "../../Config";
import { motion } from 'framer-motion';
import { FaBell, FaSpinner } from 'react-icons/fa';

export default function Notice(props) {
  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);


  const getCurrentSession = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextYear = (currentYear + 1).toString().slice(-2);
    return `${currentYear}-${nextYear}`;
  };

  const session = getCurrentSession();

  useEffect(() => {
    const fetchNotice = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL_Notice}/notice/fetch/subAdmin?start=${start}&limit=${end}&session=${session}&type=for`, {
          headers: {
            Authorization: `Bearer ${authState.accessToken}`,
          }
        });
        setDetails(response.data.notices);
        console.log('fetch', response.data);
      } catch (error) {
        console.error("Error fetching notice:", error);
      }
      finally {
        setLoading(false)
      }
    };
    fetchNotice();
  }, [authState.accessToken]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <motion.div
      className="bg-gradient-to-r from-purple-100 to-indigo-50 p-3 border border-gray-200 rounded-xl shadow-lg px-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <FaSpinner className="animate-spin text-4xl text-purple-600" />
        </div>
      ) : details.length === 0 ? (
        <div className="text-center text-purple-600 py-10">
          <FaBell className="text-5xl mb-4 mx-auto" />
          <p className="text-xl font-semibold">No notices available</p>
        </div>
      ) : (
        details.map((detail, index) => (
          <motion.div
            key={index}
            className="mb-6 last:mb-0"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold text-purple-600 mb-2">{detail.title}</h3>
            <p className="text-purple-600 text-opacity-80 leading-relaxed line-clamp-4">
              {detail.description}
            </p>
            <div className="mt-3 h-px bg-purple-200"></div>
          </motion.div>
        ))
      )}
    </motion.div>

  );
}
