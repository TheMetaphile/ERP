import React, { useState, useEffect, useContext } from "react";
import TeacherTile from './TeacherTile';
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import Loading from "../../../LoadingScreen/Loading";
import { BASE_URL_Notice } from "../../../Config";

export default function Teacher() {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(5);

    function getCurrentSession() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        if (currentMonth > 3) {
            return `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
        } else {
            return `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
        }
    }

    useEffect(() => {
        const fetchNotice = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL_Notice}/notice/fetch/teacher?start=${start}&limit=${end}&session=${getCurrentSession()}`, {
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
        <div className='mx-3'>
            {loading ? (
                <Loading />
            ) : details.length === 0 ? (
                <div className="w-full text-center">No data available</div>
            ) : (
                <TeacherTile details={details} />
            )}
            {/* <TeacherTile date='March 1,2024' description='Please confirm your email address by clicking on the link we just emailed you. If you cannnot find the email, you can request a new confirmation email or change your email adddress.' by='Principal'/>
            <TeacherTile date='March 1,2024' description='Please confirm your email address by clicking on the link we just emailed you. If you cannnot find the email, you can request a new confirmation email or change your email adddress.' by='Principal'/>
            <TeacherTile date='March 1,2024' description='Please confirm your email address by clicking on the link we just emailed you. If you cannnot find the email, you can request a new confirmation email or change your email adddress.' by='Principal'/>
            <TeacherTile date='March 1,2024' description='Please confirm your email address by clicking on the link we just emailed you. If you cannnot find the email, you can request a new confirmation email or change your email adddress.' by='Principal'/> */}
        </div>
    )
}

