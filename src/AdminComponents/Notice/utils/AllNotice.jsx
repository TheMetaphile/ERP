import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import Loading from "../../../LoadingScreen/Loading";
import { BASE_URL_Notice } from "../../../Config";
import { MdEdit, MdCheck, MdCancel, MdDeleteForever } from 'react-icons/md';
import { toast } from "react-toastify";
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaUserCircle } from 'react-icons/fa';

const AllNotice = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { authState } = useContext(AuthContext);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [error, setError] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedNotice, setEditedNotice] = useState({});
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(4);
  const [allDataFetched, setAllDataFetched] = useState(false);

  useEffect(() => {
    if (authState.accessToken) {
      setLoading(true);
      fetchAllNotices();
    } else {
      setError('No access token available');
      setLoading(false);
    }
  }, [authState.accessToken]);

  const handleViewMore = () => {
    setStart(prevStart => prevStart + end);
  };

  useEffect(() => {
    if (start !== 0) {
      fetchAllNotices();
    }
  }, [start]);

  const handleClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  }

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

  const fetchAllNotices = async () => {
    const session = getCurrentSession();

    try {
      const response = await axios.get(`${BASE_URL_Notice}/notice/fetch/admin?start=${start}&limit=${end}&session=${session}&type=${'For All'}`, {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`
        }
      });

      const notice = response.data.notices.length;
      console.log("API response:", response.data.notices);
      if (notice < end) {
        toast.success('All data fetched');
        console.log('All data fetched')
        setAllDataFetched(true);
      }
      setData(prevData => [...prevData, ...response.data.notices]);
      setLoading(false);

    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedNotice({ ...data[index] });
  };

  const handleSave = async (index) => {
    console.log(data[index]._id, editedNotice, session)
    try {
      const response = await axios.put(`${BASE_URL_Notice}/notice/update?noticeId=${data[index]._id}&session=${session}`, editedNotice, {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`
        }
      });
      console.log("API response after update:", response.data);
      toast.success('Updated Successfully')
      setData(data.map((notice, i) => i === index ? editedNotice : notice));
      setEditingIndex(null);
    } catch (err) {
      setError(err);
    }
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`${BASE_URL_Notice}/notice/delete?id=${data[index]._id}&session=${session}`, {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`
        }
      });
      toast.success('Deleted Successfully');
      const newDetail = data.filter((_, i) => i !== index);
      setData(newDetail);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedNotice({ ...editedNotice, [name]: value });
  };

  const handleFieldClick = (e) => {
    e.stopPropagation();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 mx-auto bg-purple-50  border rounded-xl shadow-lg p-6 mobile:max-tablet:p-2"
    >
      <div className="space-y-6">
        {loading ? (
          <Loading />
        ) : data === null || data.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-purple-600 text-center text-xl font-semibold"
          >
            No notices available
          </motion.div>
        ) : (
          <>
            <AnimatePresence>
              {data.map((notice, index) => (
                notice.type === 'For All' && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white shadow-lg rounded-lg p-3 border-l-4 border-purple-500"
                  >
                    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between mb-4 cursor-pointer" onClick={() => handleClick(index)}>
                      <h3 className="text-purple-800 font-bold text-xl mb-2 sm:mb-0">
                        {editingIndex === index ? (
                          <input
                            type="text"
                            name="title"
                            value={editedNotice.title}
                            onChange={handleChange}
                            onClick={handleFieldClick}
                            className="border-2 border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
                          />
                        ) : (
                          notice.title
                        )}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-600 font-medium">
                          {editingIndex === index ? (
                            <select
                              name="type"
                              value={editedNotice.type}
                              onChange={handleChange}
                              onClick={handleFieldClick}
                              className="border-2 border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                              <option value="For All">For All</option>
                              <option value="For Student">For Student</option>
                              <option value="For Teacher">For Teacher</option>
                              <option value="For Sub Admin">For Sub Admin</option>
                            </select>
                          ) : (
                            notice.type
                          )}
                        </span>
                        {editingIndex === index ? (
                          <div className="flex space-x-2 mobile:max-tablet:space-x-0">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="bg-green-500 text-white p-2 rounded-full shadow-md"
                              onClick={() => handleSave(index)}
                            >
                              <MdCheck size={20} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="bg-red-500 text-white p-2 rounded-full shadow-md"
                              onClick={handleCancel}
                            >
                              <MdCancel size={20} />
                            </motion.button>
                          </div>
                        ) : (
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="bg-blue-500 text-white p-2 rounded-full shadow-md"
                              onClick={() => handleEdit(index)}
                            >
                              <MdEdit size={20} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="bg-red-500 text-white p-2 rounded-full shadow-md"
                              onClick={() => handleDelete(index)}
                            >
                              <MdDeleteForever size={20} />
                            </motion.button>
                          </div>
                        )}
                      </div>
                    </div>
                    <AnimatePresence>
                      {expandedIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-base mt-4"
                        >
                          <p className="text-purple-700">
                            {editingIndex === index ? (
                              <textarea
                                rows={6}
                                name="description"
                                value={editedNotice.description}
                                onChange={handleChange}
                                onClick={handleFieldClick}
                                className="border-2 border-purple-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                            ) : (
                              notice.description
                            )}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between mt-4 text-sm">
                      <p className="text-purple-600 mb-2 sm:mb-0">Date: {notice.date}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-600">By:</span>
                        <div className="flex items-center space-x-1 bg-purple-100 rounded-full px-3 py-1">
                          {notice.from.profileLink ? (
                            <img src={notice.from.profileLink} alt="" className="w-6 h-6 rounded-full hidden sm:block" />
                          ) : (
                            <FaUserCircle className="w-6 h-6 text-purple-500 hidden sm:block" />
                          )}
                          <p className="text-purple-700 font-medium">{notice.from.name}</p>
                        </div>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 flex justify-center"
                      onClick={() => handleClick(index)}
                    >
                      {expandedIndex === index ? (
                        <FaChevronUp className="text-purple-500 text-2xl" />
                      ) : (
                        <FaChevronDown className="text-purple-500 text-2xl" />
                      )}
                    </motion.div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
            {!allDataFetched && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-lg shadow-md transition-colors duration-300"
                onClick={handleViewMore}
              >
                View More
              </motion.button>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default AllNotice;
