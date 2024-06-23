import React, { useEffect, useState, useContext } from "react";
import FeeStatus from "./feeStatus.jsx";
import axios from 'axios'
import Loading from "../../../LoadingScreen/Loading.jsx";
import AuthContext from "../../../Context/AuthContext.jsx";

export default function FeeStatusRow() {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);

    useEffect(() => {
        if (authState.accessToken) {
            setLoading(true);
            fetchStatus();
        } else {
            toast.error('No access token available');
        }
    }, [authState.accessToken]);

    const fetchStatus = async () => {
        console.log(authState.userDetails.currentClass, 'Class')
        try {
            const response = await axios.get(`https://feeapi.onrender.com/fee/fetch/stats?end=20&start=0&class=${authState.userDetails.currentClass}`, {
                headers: {
                    'Authorization': `Bearer ${authState.accessToken}`
                }
            });

            console.log("API response status:", response.data);
            setDetails(response.data);

        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex h-fit pb-4 mobile:max-tablet:grid mobile:max-tablet:grid-cols-1 mobile:max-tablet:w-full mobile:max-tablet:gap-4">
            {loading ? (
                <Loading />
            ) : details === null ? (
                <div>No data available</div>
            ) : (
                <>
                    <div className={`feeStatus tablet:last:w-48 h-fit p-4 shadow-md rounded-lg mr-3 flex flex-col items-center justify-center bg-yellow-300`}>
                        <h1 className="text-2xl font-semibold">Rs. {details.totalfee}</h1>
                        <p className="text-lg font-medium text-gray-500">Total Fees</p>
                    </div>
                    <div className={`feeStatus tablet:last:w-48 h-fit p-4 shadow-md rounded-lg mr-3 flex flex-col items-center justify-center bg-green-300`}>
                        <h1 className="text-2xl font-semibold">Rs. {details.discountAmount}</h1>
                        <p className="text-lg font-medium text-gray-500">Discount</p>
                    </div>
                    <div className={`feeStatus tablet:last:w-48 h-fit p-4 shadow-md rounded-lg mr-3 flex flex-col items-center justify-center bg-red-300`}>
                        <h1 className="text-2xl font-semibold">Rs. {details.fine}</h1>
                        <p className="text-lg font-medium text-gray-500">Fine</p>
                    </div>
                    <div className={`feeStatus tablet:last:w-48 h-fit p-4 shadow-md rounded-lg mr-3 flex flex-col items-center justify-center bg-red-300`}>
                        <h1 className="text-2xl font-semibold">Rs. {details.paid}</h1>
                        <p className="text-lg font-medium text-gray-500">Paid</p>
                    </div>
                    <div className={`feeStatus tablet:last:w-48 h-fit p-4 shadow-md rounded-lg mr-3 flex flex-col items-center justify-center bg-red-300`}>
                        <h1 className="text-2xl font-semibold">Rs. {details.payableFee}</h1>
                        <p className="text-lg font-medium text-gray-500">Payable</p>
                    </div>
                </>
            )}

        </div>
    );
}
