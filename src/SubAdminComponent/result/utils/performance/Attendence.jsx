import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Loading from "../../../../LoadingScreen/Loading";
import AuthContext from "../../../../Context/AuthContext";
import { BASE_URL } from "../../../../Config";
import { refreshAccessToken } from '../../../../RefreshTokenHelper';
import { toast } from 'react-toastify';


export default function Attendance(props) {
    const { id } = useParams();
    const { authState, updateAccessToken, logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const location = useLocation();

    const useQuery = () => {
        return new URLSearchParams(location.search);
    }

    const query = useQuery();
    const session = query.get('session');
    const Class = query.get('Class');

    useEffect(() => {
        console.log(session, id, Class, 'attendance')
        fetchAttendence();
    }, []);

    const fetchAttendence = async () => {
        try {
            setLoading(true);

            const response = await axios.get(`${BASE_URL}/studentAttendance/fetch/completeStats?id=${id}&class=${Class}&year=2024`, {
                headers: {
                    Authorization: `Bearer ${authState?.accessToken}`
                }
            });
            if (response.status === 200) {
                console.log("API response attendence:", response.data);
                setData(response.data)


            }
        } catch (err) {
            console.log(err);
            if (
                err.response &&
                err.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await fetchAttendence();
                } catch (refreshError) {
                }
            } else {
                toast.error(err.response?.data?.error || "An error occurred");
            }
        }
        finally {
            setLoading(false);
        }

    };
    return (
        <div className="w-full border border-gray-300 shadow-md rounded-lg p-4 mt-4 ">
            <div className="border-t-2 border-text_blue my-3 tablet:mx-2 rounded-full "></div>
            <div className='w-full flex items-center justify-between px-3'>
                <h1 className='tablet:text-3xl mobile:max-tablet:text-xl font-medium text-text_blue text-center'>Attendance</h1>
            </div>

            <div className="border-t-2 border-text_blue my-3 tablet:mx-2 rounded-full "></div>
            <div className='flex w-full justify-between tablet:mx-2 mobile:max-tablet:flex-col'>
                <div className="w-full mx-2">
                    <h1 className="text-xl font-medium mb-3">
                        {/* Term I */}
                    </h1>
                    {
                        loading ? (
                            <Loading />
                        ) : data.total === 0 ? (
                            <>No Attendance data available</>
                        ) : (
                            <div className="rounded-lg shadow-md bg-secondary text-center py-2">
                                <h1 className="text-xl font-medium">
                                    {data.present}/{data.total} Days
                                </h1>
                                <h1 className="text-lg text-gray-500">
                                    Total attendance of the student
                                </h1>
                            </div>
                        )
                    }

                </div>

            </div>
        </div>
    )
}