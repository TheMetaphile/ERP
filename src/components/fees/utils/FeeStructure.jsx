import React from "react";
import FeeStructureField from './feeStructureField.jsx';
import 'react-toastify/dist/ReactToastify.css';
export default function FeeStructure({ selectedOption, fees, setFees, }) {

  return (
    <div className="w-full h-fit mb-4  rounded-lg shadow-md overflow-auto border border-gray-300">
      <table className=" w-full">
        {fees.length === 0 ? (
          <div>No data available</div>
        ) : (
          <div className="">
            <FeeStructureField fees={fees} selectedOption={selectedOption} setFees={setFees} />
          </div>
        )}
      </table>
    </div>
  );
}
