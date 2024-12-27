import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import Loading from "../../../LoadingScreen/Loading";
import { BASE_URL_Notice } from "../../../Config";
import { MdEdit, MdCheck, MdCancel, MdDeleteForever, MdArrowDropDown } from 'react-icons/md';
import { toast } from "react-toastify";
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaUserCircle } from 'react-icons/fa';

const ClassNotice = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { authState } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedNotice, setEditedNotice] = useState({});
  const [error, setError] = useState('');
  const [start, setStart] = useState(0);
  const end = 4;
  const [allDataFetched, setAllDataFetched] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (start === 0 && data.length === 0 && !allDataFetched && !loading) {
      fetchClassNotices();
    }
  }, [start, data, allDataFetched, loading]);

  const handleViewMore = () => {
    if (!allDataFetched && !loading) {
      setStart((prevStart) => prevStart + end);
    }
  };

  useEffect(() => {
    if (start !== 0) {
      fetchClassNotices();
    }
  }, [start]);

  const handleClick = (index) => {
    if (editingIndex === null) {
      setExpanded(expanded === index ? null : index);
    }
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


  const fetchClassNotices = async () => {
    if (loading || allDataFetched) return;
    setLoading(true);

    try {
      const response = await axios.get(`${BASE_URL_Notice}/notice/fetch/admin?start=${start}&limit=${end}&session=${session}&type=${'Particular Classes'}`, {
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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
      setData(data.map((notice, i) => i === index ? editedNotice : notice));
      setEditingIndex(null);
      setExpanded(index);
    } catch (err) {
      setError(err.message);
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
    setExpanded(expanded);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedNotice({ ...editedNotice, [name]: value });
  };

  const handleFieldClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !allDataFetched && !loading) {
          console.log("Fetching more data...");
          handleViewMore();
        }
      },
      { root: null, rootMargin: '0px', threshold: 1.0 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [allDataFetched, loading]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-8 mx-auto bg-purple-50  border rounded-xl shadow-lg p-6 mobile:max-tablet:p-2"

    >


      <div className="space-y-6">
        {loading ? (
          <Loading />
        ) : data === null || data.length === 0 ? (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center text-purple-600 font-semibold"
          >
            No notices available
          </motion.div>
        ) : (
          <>
            <AnimatePresence>
              {data.map((notice, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white shadow-lg rounded-lg p-3 border-l-4 border-purple-500 "
                >
                  <div className="flex items-center justify-between mb-2 mobile:max-sm:flex-col mobile:max-sm:items-start">
                    <motion.h3
                      whileHover={{ scale: 1.05 }}
                      className="text-xl font-semibold text-purple-700 cursor-pointer"
                      onClick={() => handleClick(index)}
                    >
                      {editingIndex === index ? (
                        <input
                          type="text"
                          name="title"
                          value={editedNotice.title}
                          onChange={handleChange}
                          onClick={handleFieldClick}
                          className="border-2 border-purple-300 rounded-lg px-3 py-1 focus:outline-none focus:border-purple-500 "
                        />
                      ) : (
                        notice.title
                      )}
                    </motion.h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-600">{notice.type}</span>
                      {editingIndex === index ? (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-green-500 text-white p-2 rounded-full shadow-md"
                            onClick={() => handleSave(index)}
                          >
                            <MdCheck size={20} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-red-500 text-white p-2 rounded-full shadow-md"
                            onClick={handleCancel}
                          >
                            <MdCancel size={20} />
                          </motion.button>
                        </>
                      ) : (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-purple-500 text-white p-2 rounded-full shadow-md"
                            onClick={() => handleEdit(index)}
                          >
                            <MdEdit size={20} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-red-500 text-white p-2 rounded-full shadow-md"
                            onClick={() => handleDelete(index)}
                          >
                            <MdDeleteForever size={20} />
                          </motion.button>
                        </>
                      )}
                    </div>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ height: expanded === index ? 'auto' : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {expanded === index && (
                      <div className="text-gray-700 mt-2">
                        <p className="mb-4">
                          <strong>Description:</strong> {editingIndex === index ? (
                            <textarea
                              rows={6}
                              name="description"
                              value={editedNotice.description}
                              onChange={handleChange}
                              onClick={handleFieldClick}
                              className="w-full mt-2 border-2 border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                            />
                          ) : (
                            notice.description
                          )}
                        </p>
                        {editingIndex === index && (
                          <div className="mt-2 space-y-2">
                            {editedNotice.forClasses.map((classInfo, idx) => (
                              <motion.div
                                key={idx}
                                className="flex flex-wrap items-center gap-2 bg-purple-100 p-2 rounded-md"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                <p className="font-medium text-purple-700">Class: {classInfo.Class}</p>
                                <div className="flex flex-wrap gap-1">
                                  {classInfo.sections.map((section, sIdx) => (
                                    <span key={sIdx} className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-sm">
                                      {section}
                                    </span>
                                  ))}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                        {(notice.type === 'Particular Classes' && notice.forClasses.length > 0) && (
                          <div className="mt-2">
                            <p className="text-purple-700 font-medium">For Classes:</p>
                            <div className="space-y-2 mt-1">
                              {notice.forClasses.map((classInfo, index) => (
                                <motion.div
                                  key={index}
                                  className="flex flex-wrap items-center gap-2 bg-purple-100 p-2 rounded-md"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <span className="font-medium text-purple-700">Class {classInfo.Class}:</span>
                                  <div className="flex flex-wrap gap-1">
                                    {classInfo.sections.map((section, sIdx) => (
                                      <span key={sIdx} className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-sm">
                                        {section}
                                      </span>
                                    ))}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>

                  <div className="flex items-center justify-between mt-4 text-sm text-gray-600 mobile:max-sm:flex-col mobile:max-sm:items-start">
                    <p>Date: {notice.date}</p>
                    <div className="flex items-center space-x-2">
                      <span>By:</span>
                      <div className="flex items-center bg-purple-100 rounded-full px-3 py-1">
                        {notice.from.profileLink ? (
                          <img src={notice.from.profileLink} alt="" className="w-6 h-6 rounded-full mr-2" />
                        ) : (
                          <FaUserCircle className="w-6 h-6 text-purple-500 mr-2" />
                        )}
                        <span className="text-purple-700">{notice.from.name}</span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleClick(index)}
                    className="mt-4 w-full text-purple-600 hover:text-purple-800 focus:outline-none"
                  >
                    {expanded === index ? (
                      <FaChevronUp className="mx-auto" />
                    ) : (
                      <FaChevronDown className="mx-auto" />
                    )}
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={sentinelRef} className="h-10">
              {loading && start > 0 && (
                <div className="text-center w-full text-gray-600 text-sm">Loading more...</div>
              )}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ClassNotice;
