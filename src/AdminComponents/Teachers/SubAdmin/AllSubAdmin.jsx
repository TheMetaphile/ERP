import React, { useState, useEffect, useContext } from "react";
import SubAdminCard from "./SubAdminCard.jsx";
import axios from 'axios';
import AuthContext from "../../../Context/AuthContext.jsx";
import Loading from "../../../LoadingScreen/Loading.jsx";
import { BASE_URL } from "../../../Config.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AllSubAdmin() {
    const [userData, setUserData] = useState([]);
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const response = await axios.post(`${BASE_URL}/fetchMultiple/subAdmin`, {
                    accessToken: authState?.accessToken
                });
                console.log("API response:", response.data);
                setUserData(response.data.SubAdmins);
                toast.success('Data Fetched Successfully');
                setLoading(false);
            } catch (err) {
                toast.error(err);
                setLoading(false);
            }
        };

        if (authState?.accessToken) {
            fetchUserData();
        } else {
            setError('No access token available');
            setLoading(false);
        }
    }, [authState?.accessToken]);



    return (
        <div className="flex flex-col mx-2">
            <ToastContainer />
            <div className="flex items-center justify-between">
                <div className="mt-8 text-xl font-semibold">
                    All SubAdmin Data
                </div>
            </div>
            {loading ? (
                <Loading />
            ) : (
                <SubAdminCard userData={userData} setUserData={setUserData} />
            )}

        </div>
    );
}
