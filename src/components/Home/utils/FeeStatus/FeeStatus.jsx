import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import FeeCard from './utils/CustomCard';
import Loading from "../../../../LoadingScreen/Loading";
import AuthContext from "../../../../Context/AuthContext";
import { BASE_URL_Fee } from '../../../../Config';
import Payable from './../../../../assets/coins.png';
import Paid from './../../../../assets/paid.png';
import Pending from './../../../../assets/pending.png';


export default function FeeStatus() {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        if (authState.accessToken) {
            fetchStatus();
        } else {
            toast.error('No access token available');
        }
    }, [authState.accessToken]);

    const fetchStatus = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL_Fee}/fee/fetch/stats?end=20&start=0&class=${authState.userDetails.currentClass}`,
                {
                    headers: {
                        'Authorization': `Bearer ${authState.accessToken}`
                    }
                }
            );
            setDetails(response.data);
        } catch (error) {
            console.error("Error fetching fee status:", error);
            toast.error('Failed to fetch fee status');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    if (!details) return <div className="text-center text-red-600">Failed to load fee details</div>;

    return (
        <div className="bg-gradient-to-r from-bg_blue to-secondary border border-gray-300 rounded-xl w-full shadow-lg p-4 mobile:p-3 tablet:p-6">
            <h2 className="text-xl tablet:text-2xl font-bold text-text_blue mb-4 tablet:mb-6">Fee Status</h2>
            <div className="grid grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-3 tablet:gap-4">
                <FeeCard img={Payable} amount={details.total} title='Total Payable' color="bg-blue-100" />
                <FeeCard img={Paid} amount={details.paid} title='Total Paid' color="bg-green-100" />
                <FeeCard img={Pending} amount={details.discount} title='Total Discount' color="bg-purple-100" />
                <FeeCard img={Pending} amount={details.total - details.discount - details.paid} title='Pending' color="bg-yellow-100" />
            </div>
        </div>
    );
}