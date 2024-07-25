import { useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import Loading from "../../../LoadingScreen/Loading";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL_Fee } from "../../../Config";


const Transactions = ({ transactions }) => {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [data, setData] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(5);
    const [allDataFetched, setAllDataFetched] = useState(false);
    const [clickedIndex, setClickedIndex] = useState(null);

    const handleClick = (index) => {
        setClickedIndex(index);
    };

    const handleStatusChange = (event) => {
        setAllDataFetched(false);
        setData([]);
        setStart(0);
        setStatus(event.target.value);
    };

    useEffect(() => {
        fetchTransaction();
    }, [authState.accessToken, status]);

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (start !== 0) {
            fetchTransaction();
        }
    }, [start]);

    const fetchTransaction = async () => {
        setLoading(true);
        console.log(start, 'start', end, 'end')

        try {
            const response = await axios.get(`${BASE_URL_Fee}/fee/fetch/allTransactions?start=${start}&end=${end}&status=${status}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                console.log(response.data)
                const list = response.data.transactions.length;
                if (list < end) {
                    toast.success('All data fetched');
                    console.log('All data fetched')
                    setAllDataFetched(true);
                }
                setData(prevData => [...prevData, ...response.data.transactions]);

            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex gap-2 items-center justify-end mb-4">
                <ToastContainer />
                <div className="flex items-center mobile:max-tablet:flex-col mobile:max-tablet:items-baseline">
                    <label className="mr-2">From</label>
                    <input type="date" className="mr-2 p-1 border rounded" />
                    <label className="mr-2">To</label>
                    <input type="date" className="p-1 border rounded" />
                </div>
                <select id="status" value={status} onChange={handleStatusChange} className="rounded-lg shadow-md px-3 py-1 border-2 border-gray-200  mr-3 ">
                    <option value="">Search Filter</option>
                    <option value="Success">Success</option>
                    <option value="Failed">Failed</option>
                </select>

            </div>
            <div className=" overflow-x-auto">
                <table className="w-full border-collapse whitespace-nowrap">
                    <thead>
                        <tr className="">
                            <th className=" border-y p-2 text-start">S.No.</th>
                            <th className=" border-y p-2 text-start">Name</th>
                            <th className=" border-y p-2">Date & Time</th>
                            <th className=" border-y p-2">Transaction ID</th>
                            <th className=" border-y p-2">Amount</th>
                            <th className=" border-y p-2">Phone Number</th>
                            <th className=" border-y p-2">Payment Method</th>
                            <th className=" border-y p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {data.map((transaction, index) => (
                            <tr key={transaction.id} className={`${clickedIndex === index ? 'bg-secondary' : ''}`} onClick={() => handleClick(index)}>
                                <td className=" border-y p-2 text-start">{index + 1}</td>
                                <td className=" border-y p-2 text-start">{transaction.student.name}</td>
                                <td className=" border-y p-2">{transaction.date}</td>
                                <td className=" border-y p-2">{transaction.payment_id}</td>
                                <td className="border-y p-2 text-red-500 ">{transaction.amount}</td>
                                <td className=" border-y p-2">{transaction.student.fatherPhoneNumber}</td>
                                <td className=" border-y p-2 ">{transaction.signature}</td>
                                <td className={`border-y p-2  ${transaction.payment_status === 'Success' ? 'text-green-500' : 'text-red-500'}`} >{transaction.payment_status}</td>
                            </tr>
                        ))}
                        {!allDataFetched && (
                            <tr>
                                <td colSpan="8" className="text-center">
                                    <h1 className='text-blue-500 hover:text-blue-800 mt-3 cursor-pointer' onClick={handleViewMore}>View More</h1>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Transactions;
