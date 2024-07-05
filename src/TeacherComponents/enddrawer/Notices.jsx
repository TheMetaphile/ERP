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

        if (currentMonth >= 3) {
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
        <div className="mt-3 mb-30 ">
            {loading ? (
                <Loading />
            ) : details.length === 0 ? (
                <div className="w-full text-center">No notices available</div>
            ) : (
                <>
                    {details.map((detail, index) => (
                        <div key={index} className=" w-full p-2  rounded-lg border border-gray-300 shadow-md mt-3 flex items-center">

                            <div className='px-2 w-11/12'>
                                <div className='flex justify-between'>
                                    <div className="font-medium text-base">Title : {detail.title}</div>
                                </div>

                                <div className="text-gray-500 text-left text-sm "><span className='font-normal'>{detail.description}</span></div>
                                <div className="pl-2 mt-1 text-sm text-right text-gray-500">{detail.date}</div>
                            </div>


                        </div>
                    ))
                    }
                </>
            )}
        </div>
    );
}
