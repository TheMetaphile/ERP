import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import Loading from "../../LoadingScreen/Loading";
import { BASE_URL_TeacherLeave } from "../../Config";
import { FaCircle } from "react-icons/fa";

export default function Leave() {

    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);

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
        const fetchStats = async () => {
            console.log(getCurrentSession());
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL_TeacherLeave}/teacherleave/fetch/stats?session=${getCurrentSession()}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    }
                });
                setDetails(response.data);
                console.log('fetch', response.data)
            } catch (error) {
                console.error("Error fetching teacher stats:", error);
            }
            finally {
                setLoading(false)
            }
        };
        fetchStats();
    }, [authState.accessToken]);

    return (
        <div className="mt-3">
            {loading ? (
                <Loading />
            ) : details.length === 0 ? (
                <div className="w-full text-center">No notices available</div>
            ) : (
                <>
                    <div className="mt-3 mb-3 ">
                        <h4 className="font-medium text-sm overflow-hidden text-green-500 flex items-center gap-2"><FaCircle /> Accepted Leaves : {details.accepted}</h4>
                        <h4 className="font-medium text-sm overflow-hidden text-red-500 flex items-center gap-2 mt-1"><FaCircle />Rejected Leaves : {details.rejected}</h4>
                        <h4 className="font-medium text-sm overflow-hidden text-yellow-500 flex items-center gap-2 mt-1"><FaCircle />Pending Leaves : {details.pending}</h4>
                    </div>


                </>
            )}
        </div>
    );
}
