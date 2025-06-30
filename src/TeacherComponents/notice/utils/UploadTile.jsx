import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL } from '../../../Config';
import { toast } from "react-toastify";
import { motion } from 'framer-motion';
import { MdEdit, MdDeleteForever, MdCheck, MdCancel, MdExpandMore, MdExpandLess } from 'react-icons/md';
import { refreshAccessToken } from "../../../RefreshTokenHelper";

export default function UploadTile({ details }) {
  const { authState, darkMode, updateAccessToken, logout } = useContext(AuthContext);
  const [newDetails, setDetails] = useState(details);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedNotice, setEditedNotice] = useState({});
  const [expanded, setExpanded] = useState(null);

  const handleClick = (index) => {
    setExpanded(expanded === index ? null : index);
  }

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedNotice({ ...newDetails[index] });
  };

  function getCurrentSession() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    if (currentMonth >= 3) {
      return `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
    } else {
      return `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
    }
  }
  const session = getCurrentSession();

  const handleSave = async (index) => {
    try {
      const response = await axios.put(`${BASE_URL}/notice/update?noticeId=${details[index]._id}&session=${session}`, editedNotice, {
        headers: {
          Authorization: `Bearer ${authState?.accessToken}`
        }
      });
      toast.success('Updated Successfully');
      newDetails[index] = editedNotice;
      setEditingIndex(null);
    } catch (err) {
      console.log(err);
      toast.error('Update Failed');
      if (
        err.response &&
        err.response.data.error === 'You are not permitted to access this data. Please contact the admin'
      ) {
        toast.warn('Access denied. Attempting to refresh token...');
        try {
          const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
          await handleSave(index);
        } catch (refreshError) {
        }
      } else {
        toast.error(err.response?.data?.error || "An error occurred");
      }
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`${BASE_URL}/notice/delete?id=${details[index]._id}&session=${session}`, {
        headers: {
          Authorization: `Bearer ${authState?.accessToken}`
        }
      });
      toast.success('Deleted Successfully');
      const newDetail = details.filter((_, i) => i !== index);
      setDetails(newDetail);
    } catch (err) {
      console.log(err);
      toast.error('Delete Failed');
      if (
        err.response &&
        err.response.data.error === 'You are not permitted to access this data. Please contact the admin'
      ) {
        toast.warn('Access denied. Attempting to refresh token...');
        try {
          const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
          await handleDelete0index();
        } catch (refreshError) {
        }
      } else {
        toast.error(err.response?.data?.error || "An error occurred");
      }
    }
  };

  const handleInputChange = (e, field) => {
    setEditedNotice({ ...editedNotice, [field]: e.target.value });
  };

  return (
    <motion.div className={`w-full space-y-4 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {newDetails.map((detail, index) => (
        <motion.div
          key={index}
          className={`p-4 rounded-lg shadow-lg ${darkMode
            ? 'bg-gray-800 border border-gray-700'
            : 'bg-white border border-blue-200'
            }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className='flex items-center space-x-4'>
            <div className='flex-grow'>
              <div
                className={`flex items-center justify-between cursor-pointer ${darkMode ? 'text-white' : 'text-black'
                  }`}
                onClick={() => handleClick(index)}
              >
                <motion.div
                  className={`font-medium ${darkMode
                    ? 'text-blue-300 hover:text-blue-200'
                    : 'text-blue-700 hover:text-blue-600'
                    }`}
                >
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedNotice.title}
                      onChange={(e) => handleInputChange(e, 'title')}
                      className={`border-b focus:outline-none px-1 ${darkMode
                        ? 'bg-gray-800 text-white border-gray-600 focus:border-blue-500'
                        : 'border-blue-300 focus:border-blue-500'
                        }`}
                    />
                  ) : (
                    detail.title
                  )}
                </motion.div>
                <div className="flex space-x-2">
                  {editingIndex === index ? (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-green-500"
                        onClick={() => handleSave(index)}
                      >
                        <MdCheck size={20} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-500"
                        onClick={handleCancel}
                      >
                        <MdCancel size={20} />
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`${darkMode
                          ? 'text-blue-400 hover:text-blue-300'
                          : 'text-blue-500 hover:text-blue-600'
                          }`}
                        onClick={() => handleEdit(index)}
                      >
                        <MdEdit size={20} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`${darkMode
                          ? 'text-red-400 hover:text-red-300'
                          : 'text-red-500 hover:text-red-600'
                          }`}
                        onClick={() => handleDelete(index)}
                      >
                        <MdDeleteForever size={20} />
                      </motion.button>
                    </>
                  )}
                  {expanded === index ? (
                    <MdExpandLess
                      size={20}
                      className={`${darkMode ? 'text-blue-400' : 'text-blue-500'
                        }`}
                    />
                  ) : (
                    <MdExpandMore
                      size={20}
                      className={`${darkMode ? 'text-blue-400' : 'text-blue-500'
                        }`}
                    />
                  )}
                </div>
              </div>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: expanded === index ? 'auto' : 0, opacity: expanded === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {expanded === index && (
                  <div
                    className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                  >
                    {editingIndex === index ? (
                      <textarea
                        rows={4}
                        value={editedNotice.description}
                        onChange={(e) => handleInputChange(e, 'description')}
                        className={`w-full rounded p-2 focus:outline-none ${darkMode
                          ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500'
                          : 'border border-blue-300 focus:border-blue-500'
                          }`}
                      />
                    ) : (
                      detail.description
                    )}
                  </div>
                )}
              </motion.div>
              <div
                className={`flex items-center justify-between mt-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
              >
                <div className="flex items-center space-x-2">
                  <span>By:</span>
                  <img
                    src={detail.from.profileLink}
                    alt="profile"
                    className={`w-6 h-6 rounded-full border ${darkMode ? 'border-gray-600' : 'border-blue-200'
                      }`}
                  />
                  <span>{detail.from.name}</span>
                </div>
                <div>{detail.date}</div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}