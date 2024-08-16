import { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/school logo.png';
import axios from 'axios';
import { FaRegCircleXmark } from "react-icons/fa6";
import { motion, AnimatePresence } from 'framer-motion';
import {  FaEye, FaEyeSlash, FaLock, FaEnvelope } from 'react-icons/fa';
import { BASE_URL_Login } from "../../Config";

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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (oldPassword === newPassword) {
      setError('Old and New Password must be different ');
      setTimeout(() => {
        setError('');
      }, 2000);
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL_Login}/password/change/student`, {
        email,
        oldPassword,
        newPassword
      });

      if (response.status === 200) {
        console.log(response.data);
        setSuccessMessage('Password changed successfully');
        setTimeout(() => {
          setSuccessMessage('');
          setIsDialogOpen(false);
        }, 4000);
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.error || 'An error occurred');
      setTimeout(() => {
        setError('');
      }, 2000);
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
    <div className="hover:bg-blue-100 rounded-full">
      {props.route ? (
        <Link to={props.route} className="flex px-4 py-2 items-center text-sm no-underline">
          <img src={props.image} alt={props.alternateText} className="w-1/6 " />
          <span className="ml-2">{props.text}</span>
        </Link>
      ) : (
        <button onClick={handleButtonClick} className="flex items-center px-4 py-2  text-sm no-underline">
          <img src={props.image} alt={props.alternateText} className="w-1/6 " />
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
            className="bg-white p-6 rounded-lg shadow-2xl z-50 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Change Your Password</h1>
              <FaRegCircleXmark 
                className="text-red-600 w-6 h-6 cursor-pointer transition-transform hover:scale-110" 
                onClick={handleCloseDialog} 
              />
            </div>

            {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-center mb-4">{error}</motion.div>}
            {successMessage && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-500 text-center mb-4">{successMessage}</motion.div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <motion.div variants={inputVariants} whileFocus="focus" className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                    disabled={isSubmitting}
                  />
                </motion.div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="oldPassword">
                  Old Password
                </label>
                <motion.div variants={inputVariants} whileFocus="focus" className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    id="oldPassword"
                    value={oldPassword}
                    onChange={handleOldPasswordChange}
                    placeholder="Enter your old password"
                    className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                    disabled={isSubmitting}
                  />
                </motion.div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                  New Password
                </label>
                <motion.div variants={inputVariants} whileFocus="focus" className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="newPassword"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    placeholder="Enter your new password"
                    className="w-full pl-10 pr-10 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isSubmitting}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </motion.div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
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
