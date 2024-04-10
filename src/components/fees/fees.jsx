import FeeStatusRow from './utils/feesStatusRow';
import FeeStructure from './utils/FeeStructure';
import TransactionRow from './utils/TransactionHistoryRow';

export default function Fees() {
    return (
        <div className="flex-1 mt-2 h-full w-full text-left ml-2 overflow-auto no-srollbar">
            <h1 className="mb-2 text-2xl">Fee Status</h1>
            <FeeStatusRow />
            <h1 className="mb-2 text-2xl">Fees Structure</h1>
            <FeeStructure />
            <h1 className="mb-2 text-2xl">Transaction History</h1>
            <TransactionRow />
        </div>
    );
}
