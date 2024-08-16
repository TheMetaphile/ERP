import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import AuthContext from '../../../Context/AuthContext';
import Loading from '../../../LoadingScreen/Loading';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever, MdCheck, MdCancel, MdExpandMore, MdExpandLess } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_Student_Leave } from '../../../Config';

export default function AttendenceTable({ additionalData, status }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const { authState } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(4);
  const [allDataFetched, setAllDataFetched] = useState(false);

  useEffect(() => {
    setStart(0);
    setData([]);
    setLoading(true);
    fetchUserData();
  }, [authState.accessToken, status]);

  const handleViewMore = () => {
    setStart(prevStart => prevStart + end);
  };

  useEffect(() => {
    if (start !== 0) {
      fetchUserData();
    }
  }, [start]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${BASE_URL_Student_Leave}/leave/fetch/particularStudent?start=${start}&end=${end}&status=${status}`, {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`
        }
      });
      const leaves = response.data.Leaves;
      if (leaves.length < end) {
        toast.success('All data fetched');
        setAllDataFetched(true);
      }
      setData(prevData => [...prevData, ...leaves]);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const handleClick = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  useEffect(() => {
    if (additionalData && status === 'Pending') {
      setData(prevData => [...additionalData, ...prevData]);
    }
  }, [additionalData]);

  const handleEditClick = (index, event) => {
    event.stopPropagation();
    setEditRowIndex(index);
    setEditData(data[index]);
    setOriginalData(data[index]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleUpdate = async (index, event) => {
    event.stopPropagation();
    if (editData.status !== "Pending") {
      toast.error('Cannot update leave that is not pending');
      return;
    }
    const updatedFields = {};
    for (let key in editData) {
      if (editData[key] !== originalData[key]) {
        updatedFields[key] = editData[key];
      }
    }
    if (Object.keys(updatedFields).length === 0) {
      toast.info('No changes detected');
      return;
    }
    try {
      const response = await axios.put(`${BASE_URL_Student_Leave}/leave/update`, {
        ...updatedFields,
        leaveId: data[index]._id
      }, {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`,
        }
      });
      if (response.status === 200) {
        const updatedData = [...data];
        updatedData[index] = { ...updatedData[index], ...updatedFields };
        setData(updatedData);
        setEditRowIndex(null);
        toast.success('Leave Updated');
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const handleDelete = async (index, event) => {
    event.stopPropagation();
    const id = data[index]._id;
    if (data[index].status === "Pending") {
      try {
        const response = await axios.delete(
          `${BASE_URL_Student_Leave}/leave/delete?leaveId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${authState.accessToken}`
            }
          }
        );
        if (response.status === 200) {
          const updatedData = data.filter((_, i) => i !== index);
          setData(updatedData);
          toast.success('Leave Deleted');
        }
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      }
    } else {
      toast.error('Cannot delete leave that is not pending');
    }
  };

  const handleCancelEdit = () => {
    setEditRowIndex(null);
    setEditData({});
  };

  return (
    <div className=' mt-1 border-gray-300 w-full bg-white '>
      {/* <ToastContainer /> */}
      {loading ? (
        <Loading />
      ) : data.length === 0 ? (
        <div className='text-center w-full text-gray-500'>No data available</div>
      ) : (
        <div className='space-y-2'>
          {data.map((leave, index) => (
            <motion.div
              key={index}
              className='border border-gray-200 rounded-lg shadow-md overflow-hidden'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-6 py-4 flex items-center justify-between cursor-pointer" onClick={() => handleClick(index)}>
                <div className='flex items-center space-x-4'>
                  <img src={authState.userDetails.profileLink} alt="" className='w-12 h-12 rounded-full' />
                  <div>
                    <div className="font-medium text-gray-800">
                      {editRowIndex === index ? (
                        <>
                          <input
                            type="date"
                            name='startDate'
                            value={editData.startDate}
                            onChange={handleInputChange}
                            className='border rounded px-2 py-1 mr-2'
                          />
                          <input
                            type="date"
                            name='endDate'
                            value={editData.endDate}
                            onChange={handleInputChange}
                            className='border rounded px-2 py-1'
                          />
                        </>
                      ) : (
                        `${leave.startDate} to ${leave.endDate}`
                      )}
                    </div>
                    <div className={`${leave.status === "Pending" ? "text-yellow-500" :
                        leave.status === "Rejected" ? "text-red-500" :
                          "text-green-500"
                      } font-medium`}>
                      {leave.status}
                    </div>
                  </div>
                </div>
                <div>
                  {editRowIndex === index ? (
                    <div className='flex space-x-2'>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className='bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow-md'
                        onClick={(event) => handleUpdate(index, event)}
                      >
                        <MdCheck />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-md'
                        onClick={handleCancelEdit}
                      >
                        <MdCancel />
                      </motion.button>
                    </div>
                  ) : (
                    leave.status === 'Pending' && (
                      <div className='flex space-x-2'>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg shadow-md'
                          onClick={(event) => handleEditClick(index, event)}
                        >
                          <CiEdit />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-md'
                          onClick={(event) => handleDelete(index, event)}
                        >
                          <MdDeleteForever />
                        </motion.button>
                      </div>
                    )
                  )}
                </div>
              </div>
              <AnimatePresence>
                {expanded === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 py-4 bg-gray-50"
                  >
                    <span className='font-medium'>Reason:</span>
                    <div className="mt-2">
                      {editRowIndex === index ? (
                        <textarea
                          name="reason"
                          value={editData.reason}
                          onChange={handleInputChange}
                          className='w-full border rounded px-2 py-1'
                          rows="3"
                        />
                      ) : (
                        leave.reason
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          {!allDataFetched && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='w-full text-blue-500 hover:text-blue-700 py-2 mt-4 rounded-lg border border-blue-500 hover:border-blue-700 transition-colors duration-300'
              onClick={handleViewMore}
            >
              View More
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
}