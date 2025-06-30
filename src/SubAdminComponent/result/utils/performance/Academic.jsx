import { useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import AcademicBottonTile from "./AcademicBottomTile";
import AcademicMiddleTile from "./AcademicMiddleTile";
import AcademicTopTile from "./AcademicTopTile";
import { MdEdit } from "react-icons/md";
import { BASE_URL } from "../../../../Config";
import AuthContext from "../../../../Context/AuthContext";
import Loading from "../../../../LoadingScreen/Loading";
import axios from "axios";
import { refreshAccessToken } from "../../../../RefreshTokenHelper";
import { toast } from "react-toastify";

export default function Academic() {
    const { id } = useParams();
    const { authState, darkMode, updateAccessToken, logout } = useContext(AuthContext);
    const [details, setDetails] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchResult = async () => {
            console.log({ id })
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/result/fetch/teacher?email=${id}`, {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`,
                    }
                });

                setDetails(response.data.term1);
                console.log('fetch', response.data.term1)
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
        <div className={`w-full shadow-md rounded-lg tablet:p-4 mobile:max-tablet:px-2 mt-4 ${darkMode
                ? 'bg-gray-800 border border-gray-700 text-gray-200'
                : 'border border-gray-300'
            }`}>
            <div className={`border-t-2 my-3 tablet:mx-2 rounded-full ${darkMode ? 'border-blue-400' : 'border-text_blue'
                }`}></div>
            <div className='w-full flex items-center justify-between px-3'>
                <h1 className={`tablet:text-3xl mobile:max-tablet:text-xl font-medium text-center ${darkMode ? 'text-blue-400' : 'text-text_blue'
                    }`}>Academic Performance</h1>
                <h1 className={`flex items-center text-sm p-2 rounded-lg shadow-md self-end ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-secondary'
                    }`}>Edit <MdEdit className='ml-1' /></h1>
            </div>

            <div className={`border-t-2 my-3 tablet:mx-2 rounded-full ${darkMode ? 'border-blue-400' : 'border-text_blue'
                }`}></div>
            <div className='flex flex-col w-full justify-between tablet:mx-2 mobile:max-tablet:overflow-auto'>

                <div className="w-full mobile:max-tablet:w-fit tablet:mx-2">
                    <h1 className={`text-xl font-medium mb-3 ${darkMode ? 'text-gray-200' : ''
                        }`}>
                        Term I
                    </h1>
                    <div className={`rounded-lg shadow-md tablet:mr-5 border-2 ${darkMode ? 'border-gray-600' : 'border-gray-400'
                        }`}>
                        <AcademicTopTile heading={["Subject", 'Obtained Practical Marks', 'Total Practical Marks', 'Obtained Marks', "Total Marks"]} />
                        {loading ? (
                            <Loading />
                        ) : details.length === 0 ? (
                            <div className={darkMode ? 'text-gray-300 p-4 text-center' : 'p-4 text-center'}>No student found</div>
                        ) : (
                            <AcademicMiddleTile details={details} />
                        )
                        }
                        <AcademicBottonTile value={["", 'GPA', "8.2"]} />
                    </div>
                </div>

            </div>
        </div>
    )
}