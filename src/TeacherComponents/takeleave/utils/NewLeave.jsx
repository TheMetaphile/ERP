import React, { useState, useContext } from 'react';
import { BASE_URL_TeacherLeave } from './../../../Config';
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';
import Loading from '../../../LoadingScreen/Loading'
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FiCalendar, FiType, FiMessageSquare } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

function NewLeave({ onClose, onNewLeave }) {
  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [leaveType, setLeaveType] = useState('');
  const [reason, setReason] = useState('');

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const handleLeaveTypeChange = (event) => {
    setLeaveType(event.target.value);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
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

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const session = getCurrentSession();
    const datee = getCurrentDate();
    console.log({ fromDate, toDate, leaveType, reason, session, datee });
    setLoading(true);


    try {
      const response = await axios.post(`${BASE_URL_TeacherLeave}/teacherleave/apply`,
        {
          startDate: fromDate,
          endDate: toDate,
          reason: reason,
          type: leaveType,
          session: session,
          applyOn: datee
        },
        {
          headers: {
            Authorization: `Bearer ${authState.accessToken}`
          }
        }
      )
      if (response.status === 200) {
        console.log(response.data);
        toast.success('Leave Applied Successfully!');
        onNewLeave(response.data);
        onClose();

      }

    }
    catch (error) {
      console.log(error);
      toast.error(error.response.data.error)
    }
    finally {
      setLoading(false)
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getFromDate = () => {
    const today = new Date(fromDate);
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed z-50 inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="bg-white rounded-lg p-6 shadow-2xl w-96 max-w-full mx-4"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-blue-700">Apply for Leave</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-blue-500 hover:text-blue-700"
          >
            <IoClose size={24} />
          </motion.button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-blue-700 mb-2 font-medium">From Date</label>
              <div className="relative">
                <FiCalendar className="absolute top-3 left-3 text-blue-500" />
                <input
                  type="date"
                  value={fromDate}
                  min={getTodayDate()}
                  onChange={handleFromDateChange}
                  className="w-full pl-10 pr-3 py-2 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-blue-700 mb-2 font-medium">To Date</label>
              <div className="relative">
                <FiCalendar className="absolute top-3 left-3 text-blue-500" />
                <input
                  type="date"
                  value={toDate}
                  min={getFromDate()}
                  onChange={handleToDateChange}
                  className="w-full pl-10 pr-3 py-2 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-blue-700 mb-2 font-medium">Choose Leave Type</label>
              <div className="relative">
                <FiType className="absolute top-3 left-3 text-blue-500" />
                <select
                  value={leaveType}
                  onChange={handleLeaveTypeChange}
                  className="w-full pl-10 pr-3 py-2 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Medical Leave">Medical Leave (ML)</option>
                  <option value="Casual Leave">Casual Leave (CL)</option>
                  <option value="Complementry Off">Complementry Off (CO)</option>
                  <option value="Duty Leave">Duty Leave (DL)</option>
                  <option value="Restricted">Restricted (RH)</option>
                  <option value="Maternity">Maternity (MTR)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-blue-700 mb-2 font-medium">Reason</label>
              <div className="relative">
                <FiMessageSquare className="absolute top-3 left-3 text-blue-500" />
                <textarea
                  value={reason}
                  onChange={handleReasonChange}
                  className="w-full pl-10 pr-3 py-2 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  required
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6 space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={onClose}
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {loading ? <Loading /> : 'Submit'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default NewLeave;
