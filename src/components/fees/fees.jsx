import React, { useState } from 'react';
import FeeStatusRow from './utils/feesStatusRow';
import FeeStructure from './utils/FeeStructure';
import TransactionRow from './utils/TransactionHistoryRow';
import { ToastContainer, toast } from 'react-toastify';

export default function Fees() {

    const [selectedOption, setSelectedOption] = useState('monthlyfee');

    const handleDropdownChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div className="flex flex-col tablet:w-full mobile:max-tablet:w-screen overflow-y-auto no-scrollbar items-start mobile:max-tablet:mt-4 px-2">
            <ToastContainer />
            <h1 className="mb-2 text-2xl font-medium mobile:max-tablet:text-lg">Fee Status</h1>
            <FeeStatusRow />
            <div className='flex items-center justify-between w-full'>
                <h1 className="mb-2 text-2xl font-medium mobile:max-tablet:text-lg">Fees Structure</h1>
                <select
                    value={selectedOption}
                    onChange={handleDropdownChange}
                    className="border border-gray-300 rounded-lg p-2"
                >
                    <option value="admissionFee">Admission Fee</option>
                    <option value="monthlyfee">Monthly Fee</option>
                    <option value="quarterFee">Quarterly Fee</option>
                </select>
            </div>
            <FeeStructure selectedOption={selectedOption} />
            <h1 className="mb-2 text-2xl font-medium mobile:max-tablet:text-lg">Transaction History</h1>
            <TransactionRow selectedOption={selectedOption} />
        </div>
    );
}
