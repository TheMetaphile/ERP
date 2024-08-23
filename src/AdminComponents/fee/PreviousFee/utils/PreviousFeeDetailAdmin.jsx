// import StudentDetails from './StudentDetails';
// import { ToastContainer} from 'react-toastify';
// import TransactionRow from './TransactionHistoryRow';
// import { useLocation } from 'react-router-dom';
// import { useState } from 'react';

// export default function PreviousFeeDetailAdmin() {
//     const location = useLocation();
//     const useQuery = () => {
//         return new URLSearchParams(location.search);
//     }
//     const query = useQuery();
//     const name = query.get('name');

//     const [selectedOption, setSelectedOption] = useState('monthlyfee');

//     const handleDropdownChange = (e) => {
//         setSelectedOption(e.target.value);
//     };

//     return (
//         <div className="flex flex-col tablet:w-full mobile:max-tablet:w-screen overflow-y-auto no-scrollbar items-start mobile:max-tablet:mt-4 px-2 ">
//             <ToastContainer />
//             <div className='flex items-center justify-between w-full'>
//                 <h1 className="mb-2 text-2xl font-normal mobile:max-tablet:text-lg">Fees Structure of {name}</h1>
//                 <select
//                     value={selectedOption}
//                     onChange={handleDropdownChange}
//                     className="border border-gray-300 rounded-lg p-2"
//                 >
//                     <option value="admissionFee">Admission Fee</option>
//                     <option value="monthlyfee">Monthly Fee</option>
//                     <option value="quarterFee">Quarterly Fee</option>
//                 </select>
//             </div>
//             <StudentDetails selectedOption={selectedOption} />
//             <h1 className="mb-2 text-2xl font-normal mobile:max-tablet:text-lg">Transaction History</h1>
//             <TransactionRow />
//         </div>
//     );
// }
