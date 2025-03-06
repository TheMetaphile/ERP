import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import Loading from "../../LoadingScreen/Loading";
import { BASE_URL } from "../../Config";
import { motion } from 'framer-motion';
import { FaBell, FaSpinner, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';

export default function Notice(props) {
  const { authState } = useContext(AuthContext);
  const darkMode = authState?.darkMode || false;
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [error, setError] = useState(null);
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
      setError(null);
      try {
        const response = await axios.get(`${BASE_URL}/notice/fetch/subAdmin?start=${start}&limit=${end}&session=${session}&type=for`, {
          headers: {
            Authorization: `Bearer ${authState.accessToken}`,
          }
        });
        setDetails(response.data.notices);
      } catch (error) {
        console.error("Error fetching notice:", error);
        setError("Failed to load notices. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotice();
  }, [authState.accessToken, start, end, session]);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const shimmerVariants = {
    animate: {
      backgroundPosition: ["100% 0%", "0% 0%"],
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 1.5
      }
    }
  };

  return (
    <motion.div
      className={`p-4 border rounded-xl transition-colors duration-300 ${
        darkMode 
          ? 'bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600 shadow-lg shadow-purple-900/10' 
          : 'bg-gradient-to-r from-purple-100 to-indigo-50 border-gray-200 shadow-lg shadow-purple-200/30'
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              className={`rounded-lg p-4 ${darkMode ? 'bg-gray-700' : 'bg-white/50'}`}
              variants={shimmerVariants}
              animate="animate"
              style={{
                backgroundSize: "200% 100%",
                backgroundImage: darkMode 
                  ? "linear-gradient(90deg, #374151 0%, #4B5563 50%, #374151 100%)"
                  : "linear-gradient(90deg, #F9FAFB 0%, #F3F4F6 50%, #F9FAFB 100%)"
              }}
            >
              <div className={`h-6 w-3/4 rounded mb-3 ${darkMode ? 'bg-gray-600' : 'bg-purple-200/50'}`}></div>
              <div className={`h-4 w-full rounded mb-2 ${darkMode ? 'bg-gray-600' : 'bg-purple-200/50'}`}></div>
              <div className={`h-4 w-full rounded mb-2 ${darkMode ? 'bg-gray-600' : 'bg-purple-200/50'}`}></div>
              <div className={`h-4 w-2/3 rounded ${darkMode ? 'bg-gray-600' : 'bg-purple-200/50'}`}></div>
            </motion.div>
          ))}
        </div>
      ) : error ? (
        <motion.div 
          className={`text-center py-8 px-4 rounded-lg ${
            darkMode ? 'bg-red-900/20 text-red-300' : 'bg-red-50 text-red-600'
          }`}
          variants={itemVariants}
        >
          <FaInfoCircle className="text-4xl mb-3 mx-auto" />
          <p className="text-lg font-medium mb-2">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className={`mt-3 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-white hover:bg-gray-100 text-gray-800'
            }`}
          >
            Refresh
          </button>
        </motion.div>
      ) : details.length === 0 ? (
        <motion.div 
          className={`text-center py-10 px-4 rounded-lg ${
            darkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-white/50 text-purple-600'
          }`}
          variants={itemVariants}
        >
          <FaBell className={`text-5xl mb-4 mx-auto ${
            darkMode ? 'text-purple-400' : 'text-purple-500'
          }`} />
          <p className="text-xl font-semibold">No notices available</p>
          <p className={`mt-2 text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Check back later for updates
          </p>
        </motion.div>
      ) : (
        details.map((detail, index) => (
          <motion.div
            key={index}
            className={`mb-6 last:mb-0 p-4 rounded-lg transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-700/70 hover:bg-gray-700' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className={`text-xl font-bold ${
                darkMode ? 'text-purple-300' : 'text-purple-600'
              }`}>
                {detail.title}
              </h3>
              
              {detail.createdAt && (
                <div className={`flex items-center gap-1 text-xs ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <FaCalendarAlt />
                  <span>{formatDate(detail.createdAt)}</span>
                </div>
              )}
            </div>
            
            <p className={`leading-relaxed line-clamp-4 mb-2 ${
              darkMode ? 'text-gray-300' : 'text-purple-600 text-opacity-80'
            }`}>
              {detail.description}
            </p>
            
            {detail.forClass && (
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                darkMode 
                  ? 'bg-gray-600 text-purple-300' 
                  : 'bg-purple-100 text-purple-700'
              }`}>
                For: {detail.forClass}
              </div>
            )}
            
            <div className={`mt-3 h-px ${
              darkMode ? 'bg-gray-600' : 'bg-purple-200'
            }`}></div>
          </motion.div>
        ))
      )}
    </motion.div>
  );
}