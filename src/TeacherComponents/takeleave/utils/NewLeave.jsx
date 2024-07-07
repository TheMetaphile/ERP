import React, { useState, useContext } from 'react';
import { BASE_URL_TeacherLeave } from './../../../Config';
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';
import Loading from '../../../LoadingScreen/Loading'
import { toast } from 'react-toastify';

function NewLeave({ onClose, onNewLeave }) {
  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
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
    const session=getCurrentSession();
    const datee=getCurrentDate();
    console.log({ fromDate, toDate, leaveType, reason, session , datee});
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL_TeacherLeave}/leave/apply`,
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Apply for Leave</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={handleFromDateChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={handleToDateChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Choose Leave Type</label>
            <select
              value={leaveType}
              onChange={handleLeaveTypeChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="">Select Type</option>
              <option value="Medical Leave">Medical Leave (ML)</option>
              <option value="Casual Leave">Casual Leave (CL)</option>
              <option value="Complementry Off">Complementry Off(CO)</option>
              <option value="Duty Leave">Duty Leave (DL)</option>
              <option value="Restricted">Restricted (RH)</option>
              <option value="Maternity">Maternity (MTR)</option>

            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Reason</label>
            <textarea
              value={reason}
              onChange={handleReasonChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-500"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {loading ? <Loading /> : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewLeave;
