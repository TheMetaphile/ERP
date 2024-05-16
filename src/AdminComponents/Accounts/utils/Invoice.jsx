import React, { useState } from 'react';

const InvoiceSection = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">INVOICES</h2>
      <div className="flex items-center mb-4">
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className="border border-gray-300 rounded px-2 py-1 mr-2"
        />
        <span className="mx-2">TO</span>
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          className="border border-gray-300 rounded px-2 py-1 ml-2"
        />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Download
      </button>
    </div>
  );
};

export default InvoiceSection;