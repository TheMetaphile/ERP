import StudentDetails from './StudentDetails';
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';

export default function PreviousFeeDetail() {
    const location = useLocation();
    const useQuery = () => {
        return new URLSearchParams(location.search);
    }
    const query = useQuery();
    const name = query.get('name');


    return (
        <div className="flex flex-col w-full tablet:w-full mobile:max-tablet:w-screen overflow-y-auto no-scrollbar items-start mobile:max-tablet:mt-4 px-2 ">
            <ToastContainer />
            <div className='flex items-center justify-between w-full'>
                <h1 className="mb-2 text-2xl font-normal mobile:max-tablet:text-lg">Fees Structure of {name}</h1>
            </div>
            <StudentDetails />
        </div>
    );
}

