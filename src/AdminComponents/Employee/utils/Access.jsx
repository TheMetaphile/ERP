import React, { useState } from 'react';

const Access = ({ nextStep, prevStep, handleChange, formData }) => {

  const handleProceed = () => {
      if (!formData.department || !formData.role) {
          alert('Please select both department and role.');
      } else {
          nextStep();
      }
  };
  return (
    <div className="rounded-lg w-full px-3 mobile:max-tablet:px-0 items-start mt-2 mb-3">
      <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md space-y-4 border">
        <h2 className="text-2xl font-normal p-2 mobile:max-tablet:text-xl">Access Control Details</h2>
        
        <div className="space-y-4">
          <label className="block">
            <span>Select Department</span>
            <select
              className="w-full p-2 border rounded mt-1"
              value={formData.department}
              onChange={handleChange('department')}
            >
              <option value="">Select Department</option>
              <option value="Finance">Finance </option>
              <option value="Certificate">Certificate </option>
              <option value="Result">Result </option>

            </select>
          </label>
          <label className="block">
            <span>Select Role</span>
            <select
              className="w-full p-2 border rounded mt-1"
              value={formData.role}
              onChange={handleChange('role')}
            >
              <option value="">Select Role</option>
              <option value="Accountant">Accountant</option>
              <option value="Certificate">Certificate </option>
              <option value="Result">Result </option>
            </select>
          </label>
        </div>

        <div className="flex justify-between">
          <button onClick={prevStep} className="bg-gray-500 text-white p-2 rounded">
            Back
          </button>
          <button onClick={handleProceed} className="bg-blue-500 text-white p-2 rounded">
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Access;
