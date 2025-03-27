import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { FaSave, FaTimes, FaEdit, FaIdCard, FaEnvelope, FaPhone, FaBirthdayCake } from 'react-icons/fa';
import axios from 'axios';
import AuthContext from "../../../Context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../../LoadingScreen/Loading";
import { BASE_URL } from "../../../Config";

export default function ProfileDetails() {
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [tempData, setTempData] = useState({});

    const query = new URLSearchParams(useLocation().search);
    const employeeId = query.get('employeeId');
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        if (authState?.accessToken) {
            fetchUserData();
        } else {
            setError('No access token available');
            console.log('No access token available');
        }
    }, [authState?.accessToken, employeeId]);

    const fetchUserData = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/fetchSingle/teacher`, {
                accessToken: authState?.accessToken,
                employeeId
            });

            if (response.data.TeacherDetails && response.data.TeacherDetails.length > 0) {
                setUserData(response.data.TeacherDetails[0]);
                setTempData(response.data.TeacherDetails[0]);
            } else {
                setError('No teacher details found');
            }
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        try {
            const payload = { email: userData.email, accessToken: authState?.accessToken };

            Object.keys(tempData).forEach((key) => {
                if (key !== "extra" && tempData[key] !== userData[key]) {
                    payload[key] = tempData[key];
                }
            });

            if (JSON.stringify(tempData.extra) !== JSON.stringify(userData.extra)) {
                payload.extra = tempData.extra;
            }

            const response = await axios.put(`${BASE_URL}/edit/teacher`, payload);
            toast.success('Field Updated');
            setUserData(tempData);
            setEditMode(false);
        } catch (error) {
            toast.error(error.response?.data?.error || 'An error occurred');
        }
    };

    const handleCancel = () => {
        setTempData(userData);
        setEditMode(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("extra_")) {
            const fieldId = name.replace("extra_", "");
            setTempData((prev) => ({
                ...prev,
                extra: prev.extra.map((field) =>
                    field._id === fieldId ? { ...field, value } : field
                ),
            }));
        } else {
            setTempData({ ...tempData, [name]: value });
        }
    };

    if (!userData) {
        return <Loading />;
    }

    const teacherDetails = {
        "DOB": "Date of Birth",
        "branch": "Branch",
        "gender": "Gender",
        "email": "Email ID",
    };

    const getIcon = (apiField) => {
        switch (apiField) {
            case 'DOB': return <FaBirthdayCake />;
            case 'branch': return <FaIdCard />;
            case 'gender': return <FaPhone />;
            case 'email': return <FaEnvelope />;
            default: return <FaUser />;
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 mt-3">
            <ToastContainer />
            <div className="bg-gradient-to-r from-blue-200 to-blue-400 p-3 flex justify-between items-center">
                <div className="flex items-center">
                    <div className="flex items-center">
                        <img src={userData.profileLink} alt="" className="h-16 w-16 borser border-2 border-blue-600 rounded-full object-cover mr-2" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold">{userData.name}</h2>
                        <p className="text-lg">Teacher Profile</p>
                    </div>
                </div>


                <div>
                    {editMode ? (
                        <>
                            <button
                                onClick={handleSave}
                                className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-100 transition duration-300 mr-2"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-white text-red-500 px-4 py-2 rounded-full hover:bg-red-100 transition duration-300"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleEdit}
                            className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-100 transition duration-300"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
            <div className="p-6 grid grid-cols-3 mobile:max-tablet:grid-cols-2 gap-6">
                {Object.entries(teacherDetails).map(([apiField, label]) => (
                    <ProfileItem
                        key={apiField}
                        icon={getIcon(apiField)}
                        label={label}
                        value={userData[apiField]}
                        editMode={editMode}
                        name={apiField}
                        onChange={handleChange}
                        editedValue={tempData[apiField]}
                    />
                ))}
                {userData.extra?.map((field) => (
                    <ProfileItem
                        key={field._id}
                        label={field.label}
                        value={field.value}
                        editMode={editMode}
                        name={`extra_${field._id}`}
                        onChange={handleChange}
                        editedValue={tempData.extra?.find((item) => item._id === field._id)?.value || ""}
                    />
                ))}
            </div>
        </div>
    );
}

const ProfileItem = ({ icon, label, value, editMode, name, onChange, editedValue }) => (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg transition duration-300 hover:bg-gray-100">
        <div className="text-blue-500 text-xl">{icon}</div>
        <div className="flex-grow">
            <p className="text-sm text-gray-500">{label}</p>
            {editMode ? (
                <input
                    type="text"
                    name={name}
                    value={editedValue}
                    onChange={onChange}
                    className="w-full p-1 border rounded"
                />
            ) : (
                <p className="font-semibold">{value}</p>
            )}
        </div>
    </div>
);