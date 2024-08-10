import React, { useEffect, useState, useContext } from "react";
import FeeStatus from "./feeStatus.jsx";
import axios from 'axios'
import Loading from "../../../LoadingScreen/Loading.jsx";
import AuthContext from "../../../Context/AuthContext.jsx";
import { BASE_URL_Fee } from "../../../Config.js";
import { usePaymentContext } from "./PaymentContext.jsx";

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
            const response = await axios.get(`${BASE_URL_Fee}/fee/fetch/stats?end=20&start=0&class=${authState.userDetails.currentClass}`, {
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
        <div className="flex h-fit pb-4 mobile:max-tablet:grid mobile:max-tablet:grid-cols-1 mobile:max-tablet:w-full w-full gap-2 whitespace-nowrap">
            {loading ? (
                <Loading />
            ) : details === null ? (
                <div>No data available</div>
            ) : (
                <>
                    <div className={`feeStatus tablet:last:w-48 h-fit p-4 mobile:max-laptop:p-2 shadow-md rounded-lg border border-gray-400  flex flex-col items-center justify-center bg-yellow-200 flex-1`}>
                        <h1 className="text-2xl mobile:max-laptop:text-lg font-semibold">Rs. {details.total}</h1>
                        <p className="text-lg font-medium text-gray-600">Total Fees</p>
                    </div>
                    <div className={`feeStatus laptop:last:w-48 h-fit p-4 mobile:max-laptop:p-2 shadow-md border border-gray-400 rounded-lg  flex flex-col items-center justify-center bg-green-200 flex-1`}>
                        <h1 className="text-2xl mobile:max-laptop:text-lg font-semibold">Rs. {details.discount}</h1>
                        <p className="text-lg font-medium text-gray-600">Discount</p>
                    </div>
                    <div className={`feeStatus laptop:last:w-48 h-fit p-4 mobile:max-laptop:p-2 shadow-md rounded-lg  flex flex-col items-center justify-center border border-gray-400 bg-orange-200 flex-1`}>
                        <h1 className="text-2xl mobile:max-laptop:text-lg font-semibold">Rs. {details.total - details.discount}</h1>
                        <p className="text-lg font-medium text-gray-500">Payable</p>
                    </div>
                    <div className={`feeStatus laptop:last:w-48 h-fit p-4 mobile:max-laptop:p-2 shadow-md rounded-lg  flex flex-col items-center justify-center border border-gray-400 bg-green-200 flex-1`}>
                        <h1 className="text-2xl mobile:max-laptop:text-lg font-semibold">Rs. {details.paid}</h1>
                        <p className="text-lg font-medium text-gray-500">Paid</p>
                    </div>
                    <div className={`feeStatus laptop:last:w-48 h-fit p-4 mobile:max-laptop:p-2 shadow-md rounded-lg  flex flex-col items-center justify-center border border-gray-400 bg-orange-200 flex-1`}>
                        <h1 className="text-2xl mobile:max-laptop:text-lg font-semibold">Rs. {details.total - details.discount - details.paid}</h1>
                        <p className="text-lg font-medium text-gray-500">Pending</p>
                    </div>
                </>
            )}

        </div>
    );
}
