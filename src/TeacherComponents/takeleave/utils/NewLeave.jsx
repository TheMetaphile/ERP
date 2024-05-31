import React, { useState } from 'react';

function NewLeave({ onClose }) {
  const [date, setDate] = useState('');
  const [leaveType, setLeaveType] = useState('Medical');
  const [reason, setReason] = useState('');

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleLeaveTypeChange = (event) => {
    setLeaveType(event.target.value);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({ date, leaveType, reason });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Apply for Leave</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Choose Date</label>
            <input 
              type="date" 
              value={date} 
              onChange={handleDateChange} 
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Choose Leave Type</label>
            <select 
              value={leaveType} 
              onChange={handleLeaveTypeChange} 
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="Medical">Medical</option>
              <option value="Casual">Casual</option>
              <option value="Annual">Annual</option>
              <option value="Unpaid">Unpaid</option>

            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Reason</label>
            <textarea 
              value={reason} 
              onChange={handleReasonChange} 
              className="w-full px-3 py-2 border rounded-md"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button 
              type="button" 
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewLeave;
