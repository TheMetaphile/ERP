import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import Loading from "../../LoadingScreen/Loading";
import { BASE_URL_Notice } from "../../Config";

export default function Notices() {

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
                const response = await axios.get(`${BASE_URL_Notice}/notice/fetch/teacher?start=${start}&limit=${end}&session=${getCurrentSession()}&type=${'by'}`, {
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
        <div className="mt-3 mb-30 ">
            {loading ? (
                <Loading />
            ) : details.length === 0 ? (
                <div className="w-full text-center">No notices available</div>
            ) : (
                <>
                    {details.map((detail, index) => (
                        <div key={index} className="mt-3 mb-30 ">
                        <h4 className="font-normal text-sm">{detail.title}</h4>
                        <p className="text-gray-500 text-left text-xs">{detail.description}</p>
                      </div>
                    ))
                    }
                </>
            )}
        </div>
    );
}
