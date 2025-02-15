import FeeStructureField from './feeStructureField.jsx';
import 'react-toastify/dist/ReactToastify.css';

function StudentDetails({ selectedOption, fees, setFees, selectedStudent, selectedDiscount }) {

  return (
    <div className="w-full h-fit mb-4 mt-3 rounded-lg shadow-md overflow-auto border border-gray-300">
      <table className=" w-full">
        {fees.length === 0 ? (
          <div className='text-center'>No data available</div>
        ) : (
          <div className="w-full">
            <FeeStructureField fees={fees} selectedOption={selectedOption} setFees={setFees} Student={selectedStudent} selectedDiscount={selectedDiscount}/>
          </div>
        )}
      </table>
    </div>
  )
}

export default StudentDetails