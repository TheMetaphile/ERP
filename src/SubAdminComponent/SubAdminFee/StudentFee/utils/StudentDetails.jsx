import React from 'react';
import FeeStructureField from './feeStructureField.jsx';
import 'react-toastify/dist/ReactToastify.css';

function StudentDetails({
  selectedOption,
  fees,
  setFees,
  selectedStudent,
  selectedDiscount,
  removeDiscount,
  fetchFees,
  fetchTransaction,
  darkMode
}) {


  return (
    <div className={`w-full h-fit mb-4 mt-3 rounded-lg shadow-md overflow-auto ${darkMode
        ? 'bg-gray-800 border-gray-700'
        : 'border border-gray-300 bg-white'
      }`}>
      <table className="w-full">
        {fees.length === 0 ? (
          <div className={`text-center p-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
            No data available
          </div>
        ) : (
          <div className="w-full">
            <FeeStructureField
              fees={fees}
              fetchFees={fetchFees}
              fetchTransaction={fetchTransaction}
              selectedOption={selectedOption}
              setFees={setFees}
              Student={selectedStudent}
              selectedDiscount={selectedDiscount}
              removeDiscount={removeDiscount}
            />
          </div>
        )}
      </table>
    </div>
  )
}

export default StudentDetails;