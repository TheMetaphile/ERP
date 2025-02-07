import React, { useContext, useEffect, useState } from 'react';
import FeeAdminRows from './FeeAdminRows';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL_Login } from '../../../Config';
import axios from 'axios';
import DiscountRow from './DiscountRow';
import GlobalDiscount from '../CompleteFee/GlobalDiscount';
import { MdAdd, MdRemove } from 'react-icons/md';

const getSessions = () => {
    const currentYear = new Date().getFullYear();
    const newSessions = [];

    for (let i = 0; i < 5; i++) {
        const startYear = currentYear - i;
        const endYear = startYear + 1;
        newSessions.push(`${startYear}-${endYear.toString().slice(-2)}`);
    }

    return newSessions;
}

function FeeStructure() {
    const [discounts, setDiscounts] = useState([]);
    const { authState } = useContext(AuthContext);
    const session = getSessions();
    const [selectedSession, setSelectedSession] = useState(session[0] || "");
    const [majorDiscountStructure, setShowMajorDiscountStructure] = useState(false);

    const handleToggleMajorDiscountStructure = () => {
        setShowMajorDiscountStructure(!majorDiscountStructure);
    };

    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const response = await axios.get(`${BASE_URL_Login}/fee/apply/fetch/discountCategory`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    },
                });
                setDiscounts(response.data.discounts);
            } catch (error) {
                console.error("Failed to fetch discounts", error);
                setDiscounts([]);
            }
        };

        if (authState.accessToken) {
            fetchDiscounts();
        }
    }, [authState.accessToken]);

    const handleChange = (event) => {
        setSelectedSession(event.target.value);
    };

    const content = [
        { class: 'Pre-Nursery-U.K.G' },
        { class: '1st-5th' },
        { class: '6th-8th' },
        { class: '9th-10th' },
        { class: '11th-12th Com./Huma' },
        { class: '11th-12th Science' },
    ];


    const handleDeleteDiscount = async (discountId) => {
        try {
            const response = await axios.delete(`${BASE_URL_Login}/fee/apply/delete/discountCategory/${discountId}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`,
                },
            });

            toast.success('Deleted Successfully');
            setDiscounts(discounts.filter((discount) => discount._id !== discountId));
        } catch (error) {
            console.error("Failed to delete discount", error);
            toast.error("Failed to delete discount.");
        }
    };

    return (
        <div className="flex flex-col px-3 mobile:max-tablet:px-0 overflow-auto items-start mt-2 mb-3 no-scrollbar">
            <ToastContainer />
            <div className='flex w-full justify-between'>
                <h1 className="text-2xl p-2 mobile:max-tablet:text-lg">Fee Structure</h1>
                <div className='border border-gray-300 rounded-lg'>
                    <select
                        id="sessionSelector"
                        value={selectedSession}
                        onChange={handleChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        {session.map((sess, index) => (
                            <option key={index} value={sess}>
                                {sess}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className='overflow-auto w-full rounded-md'>
                <table className="w-full mt-3 border rounded-lg shadow-lg border-gray-300">
                    <Header headings={['Classes', 'Admission Fee', 'Monthly Fee', 'Quarter Fee', 'Action']} />
                    <tbody className="bg-white divide-y divide-gray-200 last:rounded-b-lg last:border-b-gray-300">
                        {content.map((con, index) => (
                            <FeeAdminRows
                                Class={con.class}
                                key={index}
                                session={selectedSession}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='overflow-auto w-full rounded-md mt-2'>
                <div className='flex justify-between px-2'>
                    <h1 className="text-2xl p-2 mobile:max-tablet:text-lg">Available Discounts</h1>
                    <button
                        className={`flex items-center gap-2 py-2 px-4 rounded-md text-white transition duration-300 ${majorDiscountStructure ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-500 hover:bg-purple-600'}`}
                        onClick={handleToggleMajorDiscountStructure}
                    >
                        {majorDiscountStructure ? <><MdRemove /> Cancel</> : <><MdAdd /> Bulk Discount Add</>}
                    </button>
                    {majorDiscountStructure && (
                        <GlobalDiscount />
                    )}
                </div>
                <table className="w-full mt-3 border rounded-lg shadow-lg border-gray-300">
                    <Header headings={['Amount', 'Category', 'Type', 'Given By', 'Title', 'Duration', 'Permission', 'Action']} />
                    <tbody className="bg-white divide-y divide-gray-200 last:rounded-b-lg last:border-b-gray-300">
                        {discounts.map((discount) => (
                            <DiscountRow key={discount._id} discount={discount} handleDeleteDiscount={handleDeleteDiscount} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default FeeStructure;

