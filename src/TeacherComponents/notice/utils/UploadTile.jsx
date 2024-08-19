import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL_Notice } from '../../../Config';
import Logo from '../../../assets/metaphile_logo.png';
import { toast } from "react-toastify";
import { motion } from 'framer-motion';
import { MdEdit, MdDeleteForever, MdCheck, MdCancel, MdExpandMore, MdExpandLess } from 'react-icons/md';

export default function UploadTile({ details }) {
  const { authState } = useContext(AuthContext);
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
      const response = await axios.put(`${BASE_URL_Notice}/notice/update?noticeId=${details[index]._id}&session=${session}`, editedNotice, {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`
        }
      });
      console.log("API response after update:", response.data);
      toast.success('Updated Successfully');
      newDetails[index] = editedNotice;
      setEditingIndex(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`${BASE_URL_Notice}/notice/delete?id=${details[index]._id}&session=${session}`, {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`
        }
      });
      toast.success('Deleted Successfully');
      const newDetail = details.filter((_, i) => i !== index);
      setDetails(newDetail);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e, field) => {
    setEditedNotice({ ...editedNotice, [field]: e.target.value });
  };

  return (
    <motion.div className="w-full space-y-4">
      {newDetails.map((detail, index) => (
        <motion.div
          key={index}
          className='p-4 border border-indigo-200 rounded-lg shadow-lg bg-white'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className='flex items-center space-x-4'>
            <div className='flex-grow'>
              <div className="flex items-center justify-between cursor-pointer" onClick={() => handleClick(index)}>
                <motion.div className="font-medium text-indigo-700">
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedNotice.title}
                      onChange={(e) => handleInputChange(e, 'title')}
                      className="border-b border-indigo-300 focus:border-indigo-500 outline-none px-1"
                    />
                  ) : (
                    detail.title
                  )}
                </motion.div>
                <div className="flex space-x-2">
                  {editingIndex === index ? (
                    <>
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-green-500" onClick={() => handleSave(index)}><MdCheck size={20} /></motion.button>
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-red-500" onClick={handleCancel}><MdCancel size={20} /></motion.button>
                    </>
                  ) : (
                    <>
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-indigo-500" onClick={() => handleEdit(index)}><MdEdit size={20} /></motion.button>
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-red-500" onClick={() => handleDelete(index)}><MdDeleteForever size={20} /></motion.button>
                    </>
                  )}
                  {expanded === index ? <MdExpandLess size={20} className="text-indigo-500" /> : <MdExpandMore size={20} className="text-indigo-500" />}
                </div>
              </div>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: expanded === index ? 'auto' : 0, opacity: expanded === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {expanded === index && (
                  <div className="mt-2 text-sm text-gray-600">
                    {editingIndex === index ? (
                      <textarea
                        rows={4}
                        value={editedNotice.description}
                        onChange={(e) => handleInputChange(e, 'description')}
                        className="w-full border border-indigo-300 rounded p-2 focus:border-indigo-500 outline-none"
                      />
                    ) : (
                      detail.description
                    )}
                  </div>
                )}
              </motion.div>
              <div className='flex items-center justify-between mt-2 text-xs text-gray-500'>
                <div className="flex items-center space-x-2">
                  <span>By:</span>
                  <img src={detail.from.profileLink} alt="profile" className='w-6 h-6 rounded-full' />
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


