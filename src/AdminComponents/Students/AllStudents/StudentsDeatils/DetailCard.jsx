import { FaEdit } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import AuthContext from '../../../../Context/AuthContext';
import { CiEdit } from "react-icons/ci";

export default function StudentBasicDetails() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const { authState } = useContext(AuthContext);
    const { id } = useParams();
    const [editMode, setEditMode] = useState({});
    const [tempData, setTempData] = useState({});

    const fetchUserData = async () => {

        try {
            const response = await axios.post('https://loginapi-y0aa.onrender.com/fetchSingle/student', {
                accessToken: authState.accessToken,
                email: id
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
    }, [authState.accessToken, id]);

    const handleEdit = (field) => {
        setEditMode({ ...editMode, [field]: true });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTempData({ ...tempData, [name]: value });
    };

    const handleSave = async (field) => {
        try {
            const response = await axios.put('https://loginapi-y0aa.onrender.com/edit/student', {
                accessToken: authState.accessToken,
                email: userData.email,
                [field]: tempData[field]
            });
            console.log("API response updated:", response.data);
            fetchUserData();
            setUserData({ ...userData, [field]: tempData[field] });
            setEditMode({ ...editMode, [field]: false });
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    const studentDetails = {
        "Roll No.": userData.rollNumber,
        "Class": userData.currentClass,
        "Date of Birth": userData.DOB,
        "Admission Date": userData.admissionDate,
        "Registration Number": "Remaining",
        "Permanent Address": userData.permanentAddress,
        "Academic Year": "Remaining",
        "Aadhar Number": userData.aadhaarNumber,
        "Personal Email": userData.email,
        "Emergency Contact": userData.emergencyContactNumber
    };

    const parentsDetails = {
        "Father Name": userData.fatherName,
        "Mother Name": userData.motherName,
        "Father Phone Number": userData.fatherPhoneNumber,
        "Mother Phone Number": userData.motherPhoneNumber,
        "Parent Email": userData.fatherEmailId,
        "Father Occupation": userData.fathersOccupation,
        "Mothers Occupation": userData.motherOccupation
    };

    return (
        <div className="flex-1 w-full mt-3 mb-2 shadow-md rounded-lg bg-white p-2 h-fit">
            <div className="flex justify-between flex-grow items-center">
                <h1 className="text-xl font-medium">
                    All Details
                </h1>
            </div>
            <div className='border-gray-300 border-t-2 mt-2'></div>
            <div className='tablet:flex mt-2'>
                <div className='tablet:w-1/2'>
                    {
                        Object.entries(studentDetails).map(([key, value]) => (
                            <div className='flex w-full text-base mb-2' key={key}>
                                <h1 className='font-medium text-sky-500 tablet:w-2/5 mobile:max-tablet:w-1/2'>
                                    {key}
                                </h1>
                                {editMode[key] ? (
                                    <input
                                        type="text"
                                        name={key}
                                        value={tempData[key] || ''}
                                        onChange={handleChange}
                                        onBlur={() => handleSave(key)}
                                        className='border p-1'
                                    />
                                ) : (
                                    <h1 className='w-fit ml-2 font-normal text-gray-400'>
                                        {value}
                                    </h1>
                                )}
                                <div className="ml-4 cursor-pointer" onClick={() => handleEdit(key)}>
                                    <CiEdit />
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='tablet:w-1/2'>
                    {
                        Object.entries(parentsDetails).map(([key, value]) => (
                            <div className='flex w-full text-base mb-2' key={key}>
                                <h1 className='font-medium text-sky-500 tablet:w-3/5 mobile:max-tablet:w-1/2'>
                                    {key}
                                </h1>
                                {editMode[key] ? (
                                    <input
                                        type="text"
                                        name={key}
                                        value={tempData[key]}
                                        onChange={handleChange}
                                        onBlur={() => handleSave(key)}
                                        className='border p-1'
                                    />
                                ) : (
                                    <h1 className='w-fit ml-2 font-normal text-gray-400'>
                                        {value}
                                    </h1>
                                )}
                                <div className="ml-4 cursor-pointer" onClick={() => handleEdit(key)}>
                                    <CiEdit />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
