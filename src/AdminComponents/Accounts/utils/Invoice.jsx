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
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-red-600 px-4 mt-4">INVOICES</h2>
      <div className="flex items-center mb-4 mx-auto gap-4 mobile:max-tablet:gap-2 mobile:max-tablet:flex-col">
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className="border border-gray-700 rounded-lg px-2 py-1 mr-2"
        />
        <span className="">To</span>
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          className="border border-gray-700 rounded-lg px-2 py-1 ml-2 mobile:max-tablet:ml-0"
        />
         <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Download
      </button>
      </div>
    </div>
  );
};

export default InvoiceSection;