import StudentDetails from './StudentDetails';
import { ToastContainer, toast } from 'react-toastify';
import TransactionRow from './TransactionHistoryRow';
import { useLocation } from 'react-router-dom';

export default function FeeDetail() {
    const location = useLocation();
    const useQuery = () => {
        return new URLSearchParams(location.search);
    }
    const query = useQuery();
    const name = query.get('name');

    return (
        <div className="flex flex-col tablet:w-full mobile:max-tablet:w-screen overflow-y-auto no-scrollbar items-start mobile:max-tablet:mt-4 px-2 ">
            <ToastContainer />
            <h1 className="mb-2 text-2xl font-medium mobile:max-tablet:text-lg">Fees Structure of {name}</h1>
            <StudentDetails />
            <h1 className="mb-2 text-2xl font-medium mobile:max-tablet:text-lg">Transaction History</h1>
            <TransactionRow />
        </div>
    );
}
