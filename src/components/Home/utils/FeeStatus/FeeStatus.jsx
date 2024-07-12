import FeeCard from './utils/CustomCard.jsx';
import Payable from './../../../../assets/coins.png';
import Paid from './../../../../assets/paid.png';
import Pending from './../../../../assets/pending.png';
import axios from 'axios'
import Loading from "../../../../LoadingScreen/Loading.jsx";
import AuthContext from "../../../../Context/AuthContext.jsx";
import React, { useEffect, useState, useContext } from "react";
import { BASE_URL_Fee } from '../../../../Config.js';

export default function FeeStatus() {

    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState();

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
            setLoading(false);

        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        details ?
            <div className='flex w-full justify-between border border-gray-300 shadow-md rounded-lg bg-teal-100 tablet:p-4 mobile:max-tablet:py-3  mobile:max-tablet:px-2  mobile:max-tablet:gap-1 '>
                <FeeCard img={Payable} amount={details.payableFee} title='Total Payable' />
                <FeeCard img={Paid} amount={details.paid} title='Total Paid' />
                <FeeCard img={Pending} amount={details.payableFee - details.paid} title='Pending' />
            </div>
            :
            <Loading />
    );
}
