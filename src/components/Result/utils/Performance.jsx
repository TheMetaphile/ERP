import React, { useState, useEffect, useContext } from "react";
import PerformanceBottonTile from "./PerformanceBottomTile";
import PerformanceMiddleTile from "./PerformanceMiddleTile";
import PerformanceTopTile from "./PerformanceTopTile";
import { BASE_URL } from "../../../Config";
import AuthContext from "../../../Context/AuthContext";
import Loading from "../../../LoadingScreen/Loading";
import axios from "axios";
import { toast } from "react-toastify";


export default function Performance(props) {
    const [loading, setLoading] = useState(false);
    const [termOne, setTermOne] = useState([]);
    const [termTwo, setTermTwo] = useState([]);
    const [termFinal, setFinal] = useState([]);
    const { authState, updateAccessToken, logout } = useContext(AuthContext);

    useEffect(() => {
        const fetchResult = async () => {
            console.log(authState?.userDetails?.email, authState?.userDetails?.currentClass, authState?.userDetails?.session)
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/result/fetch/student?email=${authState?.userDetails?.email}&class=${authState?.userDetails?.currentClass}&session=${authState?.userDetails?.session}`, {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`,
                    }
                });

                if (response.status === 200) {
                    console.log(response.data);
                    setTermOne(response.data.term1 || []);
                    setTermTwo(response.data.term2 || []);
                    setFinal(response.data.termFinal || []);
                }
            } catch (error) {
                console.error("Error fetching student result:", error);
                if (
                    error.response &&
                    error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
                ) {
                    toast.warn('Access denied. Attempting to refresh token...');
                    try {
                        const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                        await fetchResult();
                    } catch (refreshError) {
                    }
                } else {
                    toast.error(error.response?.data?.error || "An error occurred");
                }
            }
            finally {
                setLoading(false)
            }
        };

        fetchResult();
    }, [authState?.accessToken]);

    return (
        <div className="w-full shadow-lg rounded-lg tablet:p-4 mobile:max-tablet:px-2 mt-4 ">
            <div className="border-t-2 border-text_blue my-3 tablet:mx-2 rounded-full "></div>
            <h1 className='tablet:text-3xl mobile:max-tablet:text-xl font-medium text-text_blue text-center'>Academic Performance</h1>
            <div className="border-t-2 border-text_blue my-3 tablet:mx-2 rounded-full "></div>
            <div className='flex flex-col w-full justify-between tablet:mx-2'>


                {loading ? (
                    <Loading />
                ) : termOne.length === 0 && termTwo.length === 0 ? (
                    <>No result found</>
                ) : (
                    <div className="w-full">
                        <div className="">
                            <h1 className="text-xl font-medium mb-3">
                                Term I
                            </h1>
                            <div className="w-full rounded-lg shadow-md border-2 border-gray-400 overflow-auto">
                                <PerformanceTopTile heading={["Subject", 'Obtained Practical Marks', 'Total Practical Marks', 'Obtained Marks', "Total Marks"]} />
                                <PerformanceMiddleTile details={termOne} />
                                <PerformanceBottonTile value={["", 'GPA', "8.2"]} />
                            </div>
                        </div>

                        {termTwo.length > 0 ? (
                            <div className="w-full tablet:mx-2">
                                <h1 className="text-xl font-medium mb-3">
                                    Term II
                                </h1>
                                <div className="w-full rounded-lg shadow-md border-2 border-gray-400 overflow-auto">
                                    <PerformanceTopTile heading={["Subject", 'Obtained Practical Marks', 'Total Practical Marks', 'Obtained Marks', "Total Marks"]} />
                                    <PerformanceMiddleTile details={termTwo} />
                                    <PerformanceBottonTile value={["", 'GPA', "8.2"]} />
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}

                        {termFinal.length > 0 ? (
                            <div className="w-full tablet:mx-2">
                                <h1 className="text-xl font-medium mb-3">
                                    Final
                                </h1>
                                <div className="w-full rounded-lg shadow-md border-2 border-gray-400 overflow-auto">
                                    <PerformanceTopTile heading={["Subject", 'Obtained Practical Marks', 'Total Practical Marks', 'Obtained Marks', "Total Marks"]} />
                                    <PerformanceMiddleTile details={termFinal} />
                                    <PerformanceBottonTile value={["", 'GPA', "8.2"]} />
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                )
                }

            </div>
        </div>
    )
}