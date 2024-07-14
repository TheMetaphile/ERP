import React from 'react';

function Address({ nextStep, prevStep, handleChange }) {
  return (
    <div className="rounded-lg w-full px-3 mobile:max-tablet:px-0 items-start mt-2 mb-3">
      <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md space-y-4 border">
        <h1 className="text-2xl font-medium p-2 mobile:max-tablet:text-xl">Address Details</h1>

        <h2 className="text-base p-2 mobile:max-tablet:text-xl">Residential Details</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Address"
            className="w-full p-2 border rounded"
            onChange={handleChange('residentialAddress')}
          />
          <div className="flex space-x-2">
            <select
              className="w-full p-2 border rounded"
              onChange={handleChange('residentialState')}
            >
              <option value="">Select State</option>
              {/* Add state options here */}
            </select>
            <input
              type="text"
              placeholder="District"
              className="w-full p-2 border rounded"
              onChange={handleChange('residentialDistrict')}
            />
          </div>
          <input
            type="text"
            placeholder="Pincode"
            className="w-full p-2 border rounded"
            onChange={handleChange('residentialPincode')}
          />
        </div>

        <h2 className="text-base p-2 mobile:max-tablet:text-xl">Permanent Address</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Address"
            className="w-full p-2 border rounded"
            onChange={handleChange('permanentAddress')}
          />
          <div className="flex space-x-2">
            <select
              className="w-full p-2 border rounded"
              onChange={handleChange('permanentState')}
            >
              <option value="">Select State</option>
              {/* Add state options here */}
            </select>
            <input
              type="text"
              placeholder="District"
              className="w-full p-2 border rounded"
              onChange={handleChange('permanentDistrict')}
            />
          </div>
          <input
            type="text"
            placeholder="Pincode"
            className="w-full p-2 border rounded"
            onChange={handleChange('permanentPincode')}
          />
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
}

export default Address;
