import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { MdCheck, MdEdit } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { BASE_URL } from "../../../../../Config";
import AuthContext from "../../../../../Context/AuthContext";
import { motion } from "framer-motion";
import { refreshAccessToken } from "../../../../../RefreshTokenHelper";

function AllNoteBookRecordRow({ record, index }) {
  const [remark, setRemark] = useState(record.remark || "");
  const [editingRow, setEditingRow] = useState(false);
  const { authState, darkMode, updateAccessToken, logout } = useContext(AuthContext);

  const date = new Date();
  var session =
    date.getMonth() + 1 < 4
      ? `${date.getFullYear() - 1}-` + `${date.getFullYear()}`.substring(2, 4)
      : `${date.getFullYear()}-` + `${date.getFullYear() + 1}`.substring(2, 4);

  const handleUpdateClick = () => {
    setEditingRow(true);
  };

  const handleConfirmClick = async () => {
    console.log(record._id, session, remark);
    try {
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/notebook/update/remark?docId=${record._id}&session=${session}`,
        headers: {
          Authorization: `Bearer ${authState?.accessToken}`,
        },
        data: { remark },
      };

      await axios.request(config);
      toast.success("Remark updated successfully");
      setEditingRow(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update remark");
      if (
        error.response &&
        error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
      ) {
        toast.warn('Access denied. Attempting to refresh token...');
        try {
          const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
          await handleConfirmClick();
        } catch (refreshError) {
        }
      } else {
        toast.error(error.response?.data?.error || "An error occurred");
      }
    }
  };

  const handleCancelClick = () => {
    setRemark(record.remark || "");
    setEditingRow(false);
  };

  return (
    <motion.tr
      key={index}
      className={`border-b 
      ${darkMode
          ? 'border-gray-700 hover:bg-gray-800'
          : 'border-gray-200 hover:bg-gray-100'}`}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <td className={`py-3 px-6 text-center whitespace-nowrap 
      ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {new Date(record.date).toDateString()}
      </td>

      <td className={`py-3 px-6 text-center 
      ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {record.chapter}
      </td>

      <td className={`py-3 px-6 text-center whitespace-nowrap 
      ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {record.topic}
      </td>

      <td className={`py-3 px-6 text-center 
      ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {record.checked}
      </td>

      <td className="py-3 px-6 text-center whitespace-nowrap">
        <Link
          to={`/Teacher-Dashboard/HOD/notebook/details/${record._id}?session=${session}&date=${record.date}&chapter=${record.chapter}&topic=${record.topic}`}
          className={`block w-full 
          ${darkMode
              ? 'text-blue-300 hover:text-blue-200'
              : 'text-blue-500 hover:text-blue-700'} 
          underline`}
        >
          Show Details
        </Link>
      </td>

      <td className={`py-3 px-6 text-center 
      ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {editingRow ? (
          <input
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Enter your remark"
            className={`w-full p-2 rounded-md 
            ${darkMode
                ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                : 'border border-black focus:ring-blue-300'}`}
          />
        ) : (
          <span>{remark}</span>
        )}
      </td>

      <td className="py-3 px-6 text-center">
        {editingRow ? (
          <div className="flex gap-1 justify-center">
            <motion.button
              className={`
              ${darkMode
                  ? 'bg-green-700 hover:bg-green-600 text-white'
                  : 'bg-green-400 hover:bg-green-700 text-white'} 
              px-3 py-1 rounded-lg shadow-md flex items-center`}
              onClick={handleConfirmClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MdCheck />
            </motion.button>

            <motion.button
              className={`
              ${darkMode
                  ? 'bg-red-700 hover:bg-red-600 text-white'
                  : 'bg-red-400 hover:bg-red-700 text-white'} 
              px-3 py-1 rounded-lg shadow-md flex items-center`}
              onClick={handleCancelClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes />
            </motion.button>
          </div>
        ) : (
          <div className="flex justify-center gap-1">
            <motion.button
              className={`
              ${darkMode
                  ? 'bg-blue-700 hover:bg-blue-600 text-white'
                  : 'bg-blue-400 hover:bg-blue-700 text-white'} 
              px-3 py-1 rounded-lg shadow-md flex items-center`}
              onClick={handleUpdateClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MdEdit />
            </motion.button>
          </div>
        )}
      </td>
    </motion.tr>
  );
}

export default React.memo(AllNoteBookRecordRow);