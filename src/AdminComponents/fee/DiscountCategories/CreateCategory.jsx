import { MdAdd, MdRemove } from "react-icons/md";
import GlobalDiscount from "./GlobalDiscount";
import Header from "../FeeStructure/Header";
import DiscountRow from "../FeeStructure/DiscountRow";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL_Login } from "../../../Config";
import AuthContext from "../../../Context/AuthContext";

export default function () {
    const [discounts, setDiscounts] = useState([]);
    const { authState } = useContext(AuthContext);

    const [majorDiscountStructure, setShowMajorDiscountStructure] = useState(false);

    const handleToggleMajorDiscountStructure = () => {
        setShowMajorDiscountStructure(!majorDiscountStructure);
    };

    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const response = await axios.get(`${BASE_URL_Login}/fee/fetch/discountCategory`, {
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

    const handleDeleteDiscount = async (discountId) => {
        try {
            await axios.delete(`${BASE_URL_Login}/fee/delete/discountCategory/${discountId}`, {
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
        <div className='overflow-auto w-full rounded-md mt-2'>
            <div className='flex justify-between px-2'>
                <h1 className="text-2xl p-2 mobile:max-tablet:text-lg">Available Discounts</h1>
                <button
                    className={`flex items-center gap-2 py-2 px-4 rounded-md text-white transition duration-300 ${majorDiscountStructure ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-500 hover:bg-purple-600'}`}
                    onClick={handleToggleMajorDiscountStructure}
                >
                    {majorDiscountStructure ? <><MdRemove /> Cancel</> : <><MdAdd /> Bulk Discount Add</>}
                </button>

            </div>
            {majorDiscountStructure && (
                <GlobalDiscount />
            )}
            <table className="w-full mt-3 border rounded-lg shadow-lg border-gray-300">
                <Header headings={['Amount', 'Category', 'Type', 'Given By', 'Title', 'Duration', 'Permission', 'Action']} />
                <tbody className="bg-white divide-y divide-gray-200 last:rounded-b-lg last:border-b-gray-300">
                    {discounts.map((discount) => (
                        <DiscountRow key={discount._id} discount={discount} handleDeleteDiscount={handleDeleteDiscount} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}