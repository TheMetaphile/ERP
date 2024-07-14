import React from 'react';

const Access = ({ nextStep, prevStep, handleChange }) => {
  return (
    <div className="rounded-lg w-full px-3 mobile:max-tablet:px-0 items-start mt-2 mb-3">
      <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md space-y-4 border">
        <h2 className="text-2xl font-medium p-2 mobile:max-tablet:text-xl">Access Control Details</h2>
        
        <div className="space-y-4">
          <label className="block">
            <span>Select Department</span>
            <select
              className="w-full p-2 border rounded mt-1"
              onChange={handleChange('department')}
            >
              <option value="">Select Department</option>
              <option value="department1">Department 1</option>
              <option value="department2">Department 2</option>
            </select>
          </label>
          <label className="block">
            <span>Select Role</span>
            <select
              className="w-full p-2 border rounded mt-1"
              onChange={handleChange('role')}
            >
              <option value="">Select Role</option>
              <option value="role1">Role 1</option>
              <option value="role2">Role 2</option>
            </select>
          </label>
        </div>

        <div className="flex justify-between">
          <button onClick={prevStep} className="bg-gray-500 text-white p-2 rounded">
            Back
          </button>
          <button onClick={nextStep} className="bg-blue-500 text-white p-2 rounded">
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Access;
