import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import Loading from "../../../LoadingScreen/Loading";
import { BASE_URL_Notice } from "../../../Config";
import { MdEdit, MdCheck, MdCancel, MdDeleteForever } from 'react-icons/md';
import { toast } from "react-toastify";
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaUserCircle } from 'react-icons/fa';

const StudentNotice = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { authState } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedNotice, setEditedNotice] = useState({});
  const [error, setError] = useState('');
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(4);
  const [allDataFetched, setAllDataFetched] = useState(false);
  const [type, setType] = useState('For Students');

  useEffect(() => {
    if (authState.accessToken) {
      setLoading(true);
      fetchStudentNotices();
    } else {
      setError('No access token available');
      setLoading(false);
    }
  }, [authState.accessToken, type]);

  const handleViewMore = () => {
    setStart(prevStart => prevStart + end);
  };

  useEffect(() => {
    if (start !== 0) {
      fetchStudentNotices();
    }
  }, [start]);

  const handleClick = (index) => {
    if (editingIndex === null) {
      setExpanded(expanded === index ? null : index);
    }
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


  const fetchStudentNotices = async () => {
    const session = getCurrentSession();

    try {
      const response = await axios.get(`${BASE_URL_Notice}/notice/fetch/admin?start=${start}&limit=${end}&session=${session}&type=${type}`, {
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

  const handleTypeChange = (e) => {
    setStart(0);
    setAllDataFetched(false);
    setData([]);
    setType(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 mx-auto bg-purple-50  border rounded-xl shadow-lg p-6 mobile:max-tablet:p-2"

    >
      <motion.select
        whileHover={{ scale: 1.01 }}
        value={type}
        onChange={handleTypeChange}
        className="w-full border-2 border-purple-500 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-700 bg-white"
      >
        <option value="For Students">For Students</option>
        <option value="Particular Students">Particular Students</option>
      </motion.select>

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
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white shadow-lg rounded-lg p-3 border-l-4  border-purple-500"
                >
                  <div className="w-full flex items-center justify-between mb-4 cursor-pointer mobile:max-sm:items-start mobile:max-sm:flex-col" onClick={() => handleClick(index)}>
                    <h3 className="text-purple-800 font-bold text-xl">
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
                      <span className="text-purple-600 font-medium">{notice.type}</span>
                      {editingIndex === index ? (
                        <div className="flex space-x-2">
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
                            className="bg-purple-500 text-white p-2 rounded-full shadow-md"
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
                    {expanded === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-base mt-4"
                      >
                        <p className="mb-4 text-purple-700">
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
                        {editingIndex === index && type === 'Particular Students' ? (
                          <div className="text-purple-700">
                            For Students:
                            <ul className="list-disc list-inside mt-2">
                              {editedNotice.forId.map((student, idx) => (
                                <li key={idx}>
                                  {student.name} - Class: {student.currentClass}, Section: {student.section}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <>
                            {(type === 'Particular Students' && notice.forId.length > 0) && (
                              <div className="text-purple-700">
                                <h4 className="font-semibold mb-2">For Students:</h4>
                                <div className="space-y-4">
                                  {Object.entries(notice.forId.reduce((acc, stud) => {
                                    const { currentClass, section } = stud;
                                    const key = `${currentClass}-${section}`;
                                    if (!acc[key]) acc[key] = [];
                                    acc[key].push(stud);
                                    return acc;
                                  }, {})).map(([key, students]) => {
                                    const [currentClass, section] = key.split('-');
                                    return (
                                      <div key={key} className="bg-purple-100 rounded-lg p-3">
                                        <div className="font-medium mb-2">
                                          Class: {currentClass}, Section: {section}
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                          {students.map((stud, idx) => (
                                            <motion.div
                                              key={idx}
                                              whileHover={{ scale: 1.05 }}
                                              className="bg-purple-200 border border-purple-400 rounded-full px-3 py-1 text-sm"
                                            >
                                              {stud.name}
                                            </motion.div>
                                          ))}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="w-full flex items-center justify-between mt-4 text-sm mobile:max-sm:flex-col mobile:max-sm:items-start">
                    <p className="text-purple-600">Date: {notice.date}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-600">By:</span>
                      <div className="flex items-center space-x-1 bg-purple-100 rounded-full px-3 py-1">
                        {notice.from.profileLink ? (
                          <img src={notice.from.profileLink} alt="" className="w-6 h-6 rounded-full" />
                        ) : (
                          <FaUserCircle className="w-6 h-6 text-purple-500" />
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
                    {expanded === index ? (
                      <FaChevronUp className="text-purple-500 text-2xl" />
                    ) : (
                      <FaChevronDown className="text-purple-500 text-2xl" />
                    )}
                  </motion.div>
                </motion.div>
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

export default StudentNotice;
