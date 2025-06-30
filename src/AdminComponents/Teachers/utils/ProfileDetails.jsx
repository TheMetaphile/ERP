import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { FaSave, FaTimes, FaEdit, FaIdCard, FaEnvelope, FaPhone, FaBirthdayCake, FaUser, FaTag } from 'react-icons/fa';
import axios from 'axios';
import AuthContext from "../../../Context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../../LoadingScreen/Loading";
import { BASE_URL } from "../../../Config";
import FileUploadField from '../../../SubAdminComponent/Student/FileUploadField';
import { refreshAccessToken } from "../../../RefreshTokenHelper";

export default function ProfileDetails() {
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [tempData, setTempData] = useState({});
    const [customFields, setCustomFields] = useState([]);

    const query = new URLSearchParams(useLocation().search);
    const employeeId = query.get('employeeId');
    const { authState, updateAccessToken, logout } = useContext(AuthContext);

    useEffect(() => {
        if (authState?.accessToken) {
            fetchUserData();
            fetchFieldsForUserType();
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
                const teacherDetails = response.data.TeacherDetails[0];
                teacherDetails.extra = teacherDetails.extra || [];
                setUserData(teacherDetails);
                setTempData(teacherDetails);
            } else {
                setError('No teacher details found');
            }
        } catch (err) {
            setError(err.message);
            console.log(err);
            if (
                err.response &&
                err.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await fetchUserData();
                } catch (refreshError) {
                }
            } else {
                toast.error(err.response?.data?.error || "An error occurred");
            }
        }
    };

    const fetchFieldsForUserType = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/registrationFields/fetch/Teacher`, {
                headers: {
                    'Authorization': `Bearer ${authState?.accessToken}`
                }
            });
            if (response.status === 200) {
                setCustomFields(response.data?.fields?.fields || []);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'An error occurred';
            console.log(error);
            toast.error(errorMessage);
            if (
                error.response &&
                error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await fetchFieldsForUserType(index);
                } catch (refreshError) {
                }
            } else {
                toast.error(error.response?.data?.error || "An error occurred");
            }
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

            await axios.put(`${BASE_URL}/edit/teacher`, payload);
            toast.success('Field Updated');
            setUserData(tempData);
            setEditMode(false);
        } catch (error) {
            toast.error(error.response?.data?.error || 'An error occurred');
            if (
                error.response &&
                error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await handleSave();
                } catch (refreshError) {
                }
            } else {
                toast.error(error.response?.data?.error || "An error occurred");
            }
        }
    };

    const handleCancel = () => {
        setTempData(userData);
        setEditMode(false);
    };

    const handleCustomFieldValueChange = (e) => {
        if (!editMode) return;

        const { name, value, files } = e.target;
        setTempData((prev) => ({
            ...prev,
            extra: prev.extra.map((field) =>
                field.label === name ? { ...field, value: files ? files[0] : value } : field
            ),
        }));
    };

    useEffect(() => {
        if (userData) {
            const updatedExtraFields = [...(userData.extra || [])];
            customFields.forEach(field => {
                if (!updatedExtraFields.some(extraField => extraField.label === field.label)) {
                    updatedExtraFields.push({ label: field.label, value: '', _id: field._id });
                }
            });
            setTempData(prev => ({ ...prev, extra: updatedExtraFields }));
        }
    }, [customFields, userData]);

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
            default: return <FaTag />;
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 mt-3">
            <ToastContainer />
            <div className="bg-gradient-to-r from-blue-200 to-blue-400 p-3 flex justify-between items-center">
                <div className="flex items-center">
                    <div className="flex items-center">
                        <img src={userData.profileLink} alt="" className="h-16 w-16 border-2 border-blue-600 rounded-full object-cover mr-2" />
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
                                <FaSave className="inline mr-2" /> Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-white text-red-500 px-4 py-2 rounded-full hover:bg-red-100 transition duration-300"
                            >
                                <FaTimes className="inline mr-2" /> Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleEdit}
                            className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-100 transition duration-300"
                        >
                            <FaEdit className="inline mr-2" /> Edit
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
                        onChange={handleCustomFieldValueChange}
                        editedValue={tempData[apiField]}
                    />
                ))}
                {customFields.map((field, index) => {
                    const fieldValue = tempData.extra.find((fields) => fields.label === field.label)?.value || "";
                    switch (field.type) {
                        case "select":
                            return (
                                <SelectField
                                    key={index}
                                    icon={getIcon()}
                                    label={field.label}
                                    name={field.label}
                                    options={field.options}
                                    onChange={handleCustomFieldValueChange}
                                    value={fieldValue}
                                    required={field.required}
                                    editMode={editMode}
                                />
                            );
                        case "text":
                        case "number":
                            return (
                                <InputField
                                    key={index}
                                    icon={getIcon()}
                                    label={field.label}
                                    name={field.label}
                                    value={fieldValue}
                                    onChange={handleCustomFieldValueChange}
                                    type={field.type}
                                    required={field.required}
                                    editMode={editMode}
                                />
                            );
                        case "document":
                            return (
                                <FileUploadField
                                    key={index}
                                    icon={getIcon()}
                                    label={field.label}
                                    name={field.label}
                                    required={field.required}
                                    value={fieldValue}
                                    onChange={handleCustomFieldValueChange}
                                    editMode={editMode}
                                />
                            );
                        default:
                            return (
                                <InputField
                                    key={index}
                                    icon={getIcon()}
                                    label={field.label}
                                    name={field.label}
                                    type={field.type}
                                    value={fieldValue}
                                    onChange={handleCustomFieldValueChange}
                                    required={field.required}
                                    editMode={editMode}
                                />
                            );
                    }
                })}
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

const InputField = ({ icon, label, name, type = "text", value, onChange, required, editMode }) => (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg transition duration-300 hover:bg-gray-100">
        <div className="text-blue-500 text-xl">{icon}</div>
        <div className="flex-grow">
            <p className="text-sm text-gray-500">{label}</p>
            {editMode ? (
                <input
                    className="border-2 border-blue-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    id={name}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                />
            ) : (
                <p className="font-semibold">{value}</p>
            )}
        </div>
    </div>

);

const SelectField = ({ icon, label, name, value, onChange, options, required, editMode }) => (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg transition duration-300 hover:bg-gray-100">
        <div className="text-blue-500 text-xl">{icon}</div>
        <div className="flex-grow">
            <p className="text-sm text-gray-500">{label}</p>
            {editMode ? (
                <select
                    className="border-2 border-blue-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                >
                    <option value="">Select {label}</option>
                    {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            ) : (
                <p className="font-semibold">{value}</p>
            )}
        </div>
    </div>

);