import { useLocation } from "react-router-dom";
import {  FaCheck } from 'react-icons/fa';
import React, { useState, useEffect, useContext } from "react";
import { callIcon, location, userimg } from "./images";
import { MdEmail } from 'react-icons/md';
import axios from 'axios';
import AuthContext from "../../../Context/AuthContext";
import { CiEdit } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../../LoadingScreen/Loading";

export default function ProfileDetails() {
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);
    const query = new URLSearchParams(useLocation().search);
    const employeeId = query.get('employeeId');
    const name = query.get('name');
    const profile = query.get('profileLogo');
    const { authState } = useContext(AuthContext);
    const [editMode, setEditMode] = useState({});
    const [tempData, setTempData] = useState({});

    const fetchUserData = async () => {
        try {
            const response = await axios.post('https://loginapi-y0aa.onrender.com/fetchSingle/teacher', {
                accessToken: authState.accessToken,
                employeeId
            });
            console.log("API response Single teacher:", response.data);
            if (response.data.TeacherDetails && response.data.TeacherDetails.length > 0) {
                setUserData(response.data.TeacherDetails[0]);
                setTempData(response.data.TeacherDetails[0]);
                // console.log("Experience:", response.data.TeacherDetails[0].experience);
            } else {
                setError('No teacher details found');
            }
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    };
    useEffect(() => {

        if (authState.accessToken) {
            fetchUserData();
        } else {
            setError('No access token available');
            console.log('No access token available');
        }
    }, [authState.accessToken, employeeId]);

    const handleEdit = (field) => {
        setEditMode({ ...editMode, [field]: true });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTempData({ ...tempData, [name]: value });
    };

    const handleSave = async (field) => {
        try {
            const response = await axios.put('https://loginapi-y0aa.onrender.com/edit/teacher', {
                accessToken: authState.accessToken,
                email: userData.email,
                [field]: tempData[field]
            });
            console.log("API response updated:", response.data);
            toast.success('Field Updated');

            // fetchUserData();

            setUserData({ ...userData, [field]: tempData[field] });
            setEditMode({ ...editMode, [field]: false });

        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    };

    if (!userData) {
        return <Loading/>;
    }

    return (
        <div className="flex justify-center mobile:max-tablet:flex-col bg-white shadow-lg w-full rounded-xl p-4">
            <ToastContainer />
            
            <div className="flex flex-col items-center gap-4 mx-4">
                <div className="mx-4">
                    <img src={profile} alt="" className="h-16 w-16 rounded-full" />
                </div>

                <div className="flex flex-col justify-center items-center">
                    <h1 className="font-semibold text-2xl">{name}</h1>
                    <p className="text-gray-600">Maths & Science Teacher</p>
                </div>
                <div className="flex mt-4 tablet:gap-24 mobile:max-tablet:gap-2 mobile:max-tablet:flex-col">
                    <div className="flex items-center">
                        <div>
                            <img src={callIcon} alt="" className="w-5 h-5" />
                        </div>
                        <div className="ml-2 flex gap-2">
                            <h1 className="font-semibold text-gray-600">Phone&nbsp;:</h1>
                            {editMode.phoneNumber ? (
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={tempData.phoneNumber}
                                    onChange={handleChange}
                                    onBlur={() => handleSave('phoneNumber')}
                                    className="border p-1"
                                />
                            ) : (
                                <h1>(+91){userData.phoneNumber}</h1>

                            )}
                        </div>
                        <div className="ml-4 cursor-pointer" onClick={() => handleEdit('phoneNumber')}>
                            <CiEdit />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="ml-2 flex gap-2">
                            <h1 className="flex font-semibold text-gray-600"><MdEmail className="w-6 h-6" />&nbsp;Email&nbsp;:</h1>
                            {editMode.email ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={tempData.email}
                                    onChange={handleChange}
                                    onBlur={() => handleSave('email')}
                                    className="border p-1"
                                />
                            ) : (
                                <h1>
                                    {userData.email}
                                </h1>
                            )}
                        </div>
                        <div className="ml-4 cursor-pointer" onClick={() => handleEdit('email')}>
                            <CiEdit />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div>
                            <img src={location} alt="" className="w-5 h-5" />
                        </div>
                        <div className="ml-2 flex gap-2">
                            <h1 className="font-semibold text-gray-600">Address&nbsp;:</h1>
                            {editMode.permanentAddress ? (
                                <input
                                    type="text"
                                    name="permanentAddress"
                                    value={tempData.permanentAddress}
                                    onChange={handleChange}
                                    onBlur={() => handleSave('permanentAddress')}
                                    className="border p-1"
                                />
                            ) : (
                                <h1>
                                    {userData.permanentAddress}
                                </h1>
                            )}
                        </div>
                        <div className="ml-4 cursor-pointer" onClick={() => handleEdit('permanentAddress')}>
                            <CiEdit />
                        </div>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="ml-2 flex gap-2">
                        <h1 className="text-xl">Education&nbsp;:</h1>
                        <div className="text-lg text-gray-400">
                            {editMode.education ? (
                                <input
                                    type="text"
                                    name="education"
                                    value={tempData.education}
                                    onChange={handleChange}
                                    onBlur={() => handleSave('education')}
                                    className="border p-1"
                                />
                            ) : (
                                <h1>
                                    {userData.education}
                                </h1>
                            )}
                        </div>
                    </div>
                    <div className="ml-4 cursor-pointer" onClick={() => handleEdit('education')}>
                        <CiEdit />
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
