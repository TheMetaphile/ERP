import {  FaCheck } from 'react-icons/fa';
import { useLocation, useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import AuthContext from '../../../../Context/AuthContext';
import { CiEdit } from "react-icons/ci";
import Loading from '../../../../LoadingScreen/Loading'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_Login } from '../../../../Config';

export default function StudentBasicDetails() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const { authState } = useContext(AuthContext);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const [editMode, setEditMode] = useState({});
    const [tempData, setTempData] = useState({});

    const fetchUserData = async () => {
        console.log(email)
        try {
            const response = await axios.post(`${BASE_URL_Login}/fetchSingle/student`, {
                accessToken: authState.accessToken,
                email: email
            });
            console.log("API response Single Student:", response.data);
            if (response.data.StudentDetails && response.data.StudentDetails.length > 0) {
                setUserData(response.data.StudentDetails[0]);
                setTempData(response.data.StudentDetails[0]);
            } else {
                setError('No student details found');
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
    }, [authState.accessToken, email]);

    const handleEdit = (field) => {
        setEditMode({ ...editMode, [field]: true });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTempData({ ...tempData, [name]: value });
    };

    const handleSave = async (field) => {
        try {
            const response = await axios.put(`${BASE_URL_Login}/edit/student`, {
                accessToken: authState.accessToken,
                email: userData.email,
                [field]: tempData[field]
            });
            console.log("API response updated:", response.data);
            toast.success('Field Updated');
            // fetchUserData();
            setUserData({ ...userData, [field]: tempData[field] });
            setEditMode({ ...editMode, [field]: false });
        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data?.error || 'An error occured'
            setError(errorMessage);
            toast.error(errorMessage);
        }
    };

    if (!userData) {
        return <Loading />;
    }

    const studentDetails = {
        "rollNumber": "Roll No.",
        "currentClass": "Class",
        "DOB": "Date of Birth",
        "admissionDate": "Admission Date",
        "registrationNumber": "Registration Number",
        "permanentAddress": "Permanent Address",
        "academicYear": "Academic Year",
        "aadhaarNumber": "Aadhar Number",
        "email": "Personal Email",
        "emergencyContactNumber": "Emergency Contact"
    };

    const parentsDetails = {
        "fatherName": "Father Name",
        "motherName": "Mother Name",
        "fatherPhoneNumber": "Father Phone Number",
        "motherPhoneNumber": "Mother Phone Number",
        "fatherEmailId": "Parent Email",
        "fathersOccupation": "Father Occupation",
        "motherOccupation": "Mother's Occupation"
    };

    return (
        <div className="flex-1 w-full mt-3 mb-2 shadow-md rounded-lg bg-white p-2 h-fit">
            <ToastContainer />
            <div className="flex justify-between flex-grow items-center">
                <h1 className="text-xl font-medium">
                    All Details
                </h1>
            </div>
            <div className='border-gray-300 border-t-2 mt-2'></div>
            <div className='tablet:flex mt-2'>
                <div className='tablet:w-1/2'>
                    {
                        Object.entries(studentDetails).map(([apiField, label]) => (
                            <div className='flex w-full text-base mb-2 items-center' key={apiField}>
                                <h1 className='font-medium text-sky-500 tablet:w-2/5 mobile:max-tablet:w-1/2'>
                                    {label}
                                </h1>
                                {editMode[apiField] ? (
                                    <input
                                        type="text"
                                        name={apiField}
                                        value={tempData[apiField] || ''}
                                        onChange={handleChange}
                                        onBlur={() => handleSave(apiField)}
                                        className='border p-1'
                                    />
                                ) : (
                                    <h1 className='w-fit ml-2 font-normal text-gray-400'>
                                        {userData[apiField]}
                                    </h1>
                                )}
                                <div className="ml-4 cursor-pointer" onClick={() => handleEdit(apiField)}>
                                    {editMode[apiField] ? <FaCheck className='text-green-400' /> : <CiEdit />}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='tablet:w-1/2'>
                    {
                        Object.entries(parentsDetails).map(([apiField, label]) => (
                            <div className='flex w-full text-base mb-2 items-center' key={apiField}>
                                <h1 className='font-medium text-sky-500 tablet:w-3/5 mobile:max-tablet:w-1/2'>
                                    {label}
                                </h1>
                                {editMode[apiField] ? (
                                    <input
                                        type="text"
                                        name={apiField}
                                        value={tempData[apiField]}
                                        onChange={handleChange}
                                        onBlur={() => handleSave(apiField)}
                                        className='border p-1'
                                    />
                                ) : (
                                    <h1 className='w-fit ml-2 font-normal text-gray-400'>
                                        {userData[apiField]}

                                    </h1>
                                )}
                                <div className="ml-4 cursor-pointer" onClick={() => handleEdit(apiField)}>
                                    {editMode[apiField] ? <FaCheck className='text-green-400' /> : <CiEdit />}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
