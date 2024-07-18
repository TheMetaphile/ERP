import FeeStatusRow from './utils/feesStatusRow';
import FeeStructure from './utils/FeeStructure';
import TransactionRow from './utils/TransactionHistoryRow';
import { ToastContainer, toast } from 'react-toastify';


export default function Fees() {
    return (
        <div className="flex flex-col tablet:w-full mobile:max-tablet:w-screen overflow-y-auto no-scrollbar items-start mt-2 px-2 ">
            <ToastContainer />
            <h1 className="mb-2 text-2xl font-medium mobile:max-tablet:text-lg">Fee Status</h1>
            <FeeStatusRow />
            <h1 className="mb-2 text-2xl font-medium mobile:max-tablet:text-lg">Fees Structure</h1>
            <FeeStructure />
            <h1 className="mb-2 text-2xl font-medium mobile:max-tablet:text-lg">Transaction History</h1>
            <TransactionRow />
        </div>
    );
}
