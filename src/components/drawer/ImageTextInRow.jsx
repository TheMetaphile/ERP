import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { FaRegCircleXmark } from "react-icons/fa6";
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from 'react-icons/fa';
import { BASE_URL } from "../../Config";

export default function ImageTextInRow(props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const darkMode = props.darkMode;
  const bgClass = darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black';
  const textClass = darkMode ? 'text-white' : 'text-gray-800';
  const inputClass = darkMode
    ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-600'
    : 'bg-white text-black border-gray-300 focus:border-blue-500';
  const buttonClass = darkMode
    ? 'bg-blue-700 hover:bg-blue-600 text-white'
    : 'bg-blue-500 hover:bg-blue-600 text-white';
  const hoverClass = darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-100';

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (oldPassword === newPassword) {
      setError('Old and New Password must be different');
      setTimeout(() => setError(''), 2000);
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/password/change/student`, {
        email,
        oldPassword,
        newPassword
      });

      if (response.status === 200) {
        setSuccessMessage('Password changed successfully');
        setTimeout(() => {
          setSuccessMessage('');
          setIsDialogOpen(false);
        }, 4000);
      }
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
      setTimeout(() => setError(''), 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const dialogVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', damping: 25, stiffness: 500 }
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  const inputVariants = {
    focus: { scale: 1.02, boxShadow: "0px 0px 8px rgb(59,130,246)" }
  };

  return (
    <div className={`${hoverClass} rounded-full`}>
      {props.route ? (
        props.openInNewTab ? (
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(props.route, "_blank", "noopener,noreferrer");
            }}
            className={`flex px-4 py-2 items-center text-sm no-underline cursor-pointer ${textClass}`}
          >
            <img src={props.image} alt={props.alternateText} className={`w-1/6 ${textClass}`} />
            <span className="ml-2">{props.text}</span>
          </div>
        ) : (
          <Link
            to={props.route}
            className={`flex px-4 py-2 items-center text-sm no-underline ${textClass}`}
          >
            <img src={props.image} alt={props.alternateText} className={`w-1/6 ${textClass}`} />
            <span className="ml-2">{props.text}</span>
          </Link>
        )
      ) : (
        <button
          onClick={handleButtonClick}
          className={`flex items-center px-4 py-2 text-sm no-underline ${textClass}`}
        >
          <img src={props.image} alt={props.alternateText} className={`w-1/6 ${textClass}`} />
          <span className="ml-2">{props.text}</span>
        </button>
      )}


      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.div
              variants={dialogVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`p-6 rounded-lg shadow-2xl z-50 w-full max-w-md ${bgClass}`}
            >
              <div className="flex justify-between items-center mb-4">
                <h1 className={`text-2xl font-bold ${textClass}`}>
                  Change Your Password
                </h1>
                <FaRegCircleXmark
                  className={`w-6 h-6 cursor-pointer transition-transform hover:scale-110 ${darkMode ? 'text-red-400' : 'text-red-600'}`}
                  onClick={handleCloseDialog}
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-center mb-4"
                >
                  {error}
                </motion.div>
              )}
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-500 text-center mb-4"
                >
                  {successMessage}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email
                  </label>
                  <motion.div variants={inputVariants} whileFocus="focus" className="relative">
                    <FaEnvelope className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter your email"
                      className={`w-full pl-10 pr-3 py-2 rounded-lg border-2 focus:outline-none ${inputClass}`}
                      disabled={isSubmitting}
                    />
                  </motion.div>
                </div>

                <div>
                  <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Old Password
                  </label>
                  <motion.div variants={inputVariants} whileFocus="focus" className="relative">
                    <FaLock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={handleOldPasswordChange}
                      placeholder="Enter your old password"
                      className={`w-full pl-10 pr-3 py-2 rounded-lg border-2 focus:outline-none ${inputClass}`}
                      disabled={isSubmitting}
                    />
                  </motion.div>
                </div>

                <div>
                  <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    New Password
                  </label>
                  <motion.div variants={inputVariants} whileFocus="focus" className="relative">
                    <FaLock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      placeholder="Enter your new password"
                      className={`w-full pl-10 pr-10 py-2 rounded-lg border-2 focus:outline-none ${inputClass}`}
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
                      disabled={isSubmitting}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </motion.div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out ${buttonClass}`}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Changing...' : 'Change Password'}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}