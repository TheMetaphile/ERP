import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import AuthContext from '../../../../Context/AuthContext';
import { FaUser, FaEnvelope, FaGraduationCap, FaBirthdayCake, FaIdCard, FaCalendarAlt, FaMapMarkerAlt, FaFlag, FaListAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../../../Config';
import Loading from '../../../../LoadingScreen/Loading';

const StudentBasicDetails = () => {
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [tempData, setTempData] = useState({});
    const { authState } = useContext(AuthContext);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.post(`${BASE_URL}/fetchSingle/student`, {
                    accessToken: authState?.accessToken,
                    email: email
                });
                if (response.data.StudentDetails && response.data.StudentDetails.length > 0) {
                    setUserData(response.data.StudentDetails[0]);
                    setTempData(response.data.StudentDetails[0]);
                } else {
                    toast.error('No student details found');
                }
            } catch (err) {
                toast.error(err.message);
            }
        };

        if (authState?.accessToken) {
            fetchUserData();
        }
    }, [authState?.accessToken, email]);

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

            const response = await axios.put(`${BASE_URL}/edit/student`, payload);
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

    const studentDetails = {
        "rollNumber": "Roll No.",
        "currentClass": "Class",
        "admissionClass": "Admission Class",
        "section": "Section",
        "DOB": "Date of Birth",
        "admissionDate": "Admission Date",
        "academicYear": "Academic Year",
        "aadhaarNumber": "Aadhar Number",
        "email": "Personal Email",
        "gender": "Gender",
        "nationality": "Nationality",
        "category": "Category",
        "branch": "Branch",
    };

    const parentsDetails = {
        "fatherName": "Father Name",
        "guardiansName": "Guardian's Name"
    };

    const getIcon = (apiField) => {
        switch (apiField) {
            case 'rollNumber': return <FaIdCard />;
            case 'currentClass': case 'admissionClass': return <FaGraduationCap />;
            case 'DOB': return <FaBirthdayCake />;
            case 'admissionDate': case 'academicYear': return <FaCalendarAlt />;
            case 'aadhaarNumber': return <FaIdCard />;
            case 'email': return <FaEnvelope />;
            case 'gender': return <FaUser />;
            case 'nationality': return <FaFlag />;
            case 'category': return <FaListAlt />;
            case 'branch': return <FaMapMarkerAlt />;
            case 'fatherName': case 'guardiansName': return <FaUser />;
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
                        <p className="text-lg">Student Profile</p>
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
                {Object.entries(studentDetails).map(([apiField, label]) => (
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
                {Object.entries(parentsDetails).map(([apiField, label]) => (
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
};

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

export default StudentBasicDetails;