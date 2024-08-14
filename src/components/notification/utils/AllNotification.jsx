import React, { useState, useEffect, useContext } from "react";
import AllNotificationTile from './AllNotificationTile';
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import Loading from "../../../LoadingScreen/Loading";
import { BASE_URL_Notice } from "../../../Config";

function AllNotification() {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(5);


    useEffect(() => {
        const fetchNotice = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL_Notice}/notice/fetch/student?start=${start}&limit=${end}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    }
                });
                setDetails(response.data.notices);
                console.log('fetch', response.data);
            } catch (error) {
                console.error("Error fetching notice:", error);
            }
            finally {
                setLoading(false)
            }
        };
        fetchNotice();
    }, [authState.accessToken]);

    return (
        <div className='px-3 w-full'>
            {loading ? (
                <Loading />
            ) : details.length === 0 ? (
                <div className="w-full text-center">No data available</div>
            ) : (
                <AllNotificationTile details={details} />
            )}
            {/* <AllNotificationTile date='March 1,2024' description='Please confirm your email address by clicking on the link we just emailed you. If you cannnot find the email, you can request a new confirmation email or change your email adddress.' />
            <AllNotificationTile date='March 1,2024' description='Please confirm your email address by clicking on the link we just emailed you. If you cannnot find the email, you can request a new confirmation email or change your email adddress.' />
            <AllNotificationTile date='March 1,2024' description='Please confirm your email address by clicking on the link we just emailed you. If you cannnot find the email, you can request a new confirmation email or change your email adddress.' />
            <AllNotificationTile date='March 1,2024' description='Please confirm your email address by clicking on the link we just emailed you. If you cannnot find the email, you can request a new confirmation email or change your email adddress.' /> */}
        </div>
    )
}

export default AllNotification;