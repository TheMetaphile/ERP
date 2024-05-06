import FeeStatusRow from './utils/feesStatusRow';
import FeeStructure from './utils/FeeStructure';
import TransactionRow from './utils/TransactionHistoryRow';

export default function Fees() {
    return (
        <div className="flex flex-col w-full h-screen overflow-y-auto no-scrollbar items-start mt-2 px-2 ">
            <h1 className="mb-2 text-2xl">Fee Status</h1>
            <FeeStatusRow />
            <h1 className="mb-2 text-2xl">Fees Structure</h1>
            <FeeStructure />
            <h1 className="mb-2 text-2xl">Transaction History</h1>
            <TransactionRow />
        </div>
    );
}
