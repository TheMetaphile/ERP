import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../../Context/AuthContext";
import axios from "axios";
import Loading from "../../../LoadingScreen/Loading";
import { BASE_URL } from "../../../Config";
import TeacherTile from './TeacherTile';
import { refreshAccessToken } from "../../../RefreshTokenHelper";
import { toast } from "react-toastify";

export default function Teacher() {
    const { authState, darkMode, updateAccessToken, logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [birthdays, setBirthDays] = useState([]);

    function getFormattedDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        const fetchBirthday = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/birthday/teacher?date=${getFormattedDate()}`, {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`,
                    }
                });

                setBirthDays(response.data);
            } catch (error) {
                console.error("Error fetching teacher birthday:", error);
                if (
                    error.response &&
                    error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
                ) {
                    toast.warn('Access denied. Attempting to refresh token...');
                    try {
                        const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                        await fetchBirthday();
                    } catch (refreshError) {
                    }
                } else {
                    toast.error(error.response?.data?.error || "An error occurred");
                }
            }
            finally {
                setLoading(false);
            }
        }
        fetchBirthday();
    }, [authState?.accessToken])

    return (
        <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            {loading ? (
                <Loading />
            ) : (
                <TeacherTile birthdays={birthdays} darkMode={darkMode} />
            )}
        </div>
    )
}