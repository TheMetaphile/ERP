import React from "react";
import FeeStructureField from './feeStructureField.jsx';
import 'react-toastify/dist/ReactToastify.css';

export default function FeeStructure({ 
  selectedOption, 
  fees, 
  setFees, 
  darkMode 
}) {
  // Dark mode classes
  const bgClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-300';
  const textClass = darkMode ? 'text-gray-300' : 'text-gray-700';

  return (
    <div 
      className={`
        w-full h-fit mb-4 rounded-lg shadow-md overflow-auto border 
        ${bgClass} ${borderClass}
      `}
    >
      <table className="w-full">
        {fees.length === 0 ? (
          <tbody>
            <tr>
              <td 
                className={`
                  text-center p-4 
                  ${textClass}
                `}
              >
                No data available
              </td>
            </tr>
          </tbody>
        ) : (
          <FeeStructureField 
            fees={fees} 
            selectedOption={selectedOption} 
            setFees={setFees} 
            darkMode={darkMode} 
          />
        )}
      </table>
    </div>
  );
}