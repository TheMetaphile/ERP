import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL } from '../../../Config';
import axios from 'axios';
import { FaIdCard, FaEnvelope, FaPhone, FaEdit, FaSave, FaTimes, FaBirthdayCake } from 'react-icons/fa';
import { toast } from 'react-toastify';

const SubAdminProfile = () => {
    const { id } = useParams();
    const { authState } = useContext(AuthContext);
    const [subAdmin, setSubAdmin] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [editedSubAdmin, setEditedSubAdmin] = useState({});

    useEffect(() => {
        const fetchSubAdminDetails = async () => {
            try {
                const response = await axios.post(`${BASE_URL}/fetchSingle/subAdmin/${id}`, {
                    accessToken: authState?.accessToken,
                });

                setSubAdmin(response.data.SubAdminDetails[0]);
                setEditedSubAdmin(response.data.SubAdminDetails[0]);
            } catch (error) {
                console.error('Error fetching subAdmins:', error.response?.data?.error);
            }
        };

        fetchSubAdminDetails();
    }, [authState, id]);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        try {
            const payload = { _id: id, accessToken: authState?.accessToken };

            Object.keys(editedSubAdmin).forEach((key) => {
                if (key !== "extra" && editedSubAdmin[key] !== subAdmin[key]) {
                    payload[key === "dob" ? "DOB" : key] = editedSubAdmin[key];
                }
            });

            if (JSON.stringify(editedSubAdmin.extra) !== JSON.stringify(subAdmin.extra)) {
                payload.extra = editedSubAdmin.extra;
            }

            const config = {
                method: 'put',
                url: `${BASE_URL}/edit/subAdmin`,
                headers: {
                    'Authorization': `Bearer ${authState?.accessToken}`,
                    'Content-Type': 'application/json'
                },
                data: payload
            };

            await axios.request(config);
            setSubAdmin(prev => ({ ...prev, ...editedSubAdmin }));
            setEditMode(false);
            toast.success('Field Updated Successfully');
        } catch (error) {
            console.error('Error updating subAdmin:', error.response?.data?.error);
        }
    };

    const handleCancel = () => {
        setEditedSubAdmin(subAdmin);
        setEditMode(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("extra_")) {
            const fieldId = name.replace("extra_", "");
            setEditedSubAdmin((prev) => ({
                ...prev,
                extra: prev.extra.map((field) =>
                    field._id === fieldId ? { ...field, value } : field
                ),
            }));
        } else {
            setEditedSubAdmin({ ...editedSubAdmin, [name]: value });
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 mt-3">
            <div className="bg-gradient-to-r from-blue-200 to-blue-400 p-3 flex justify-between items-center">
                <div className="flex items-center">
                    <div className="flex items-center">
                        <img src={subAdmin.profileLink} alt="" className="h-16 w-16 borser border-2 border-blue-600 rounded-full object-cover mr-2" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold">{subAdmin.name}</h2>
                        <p className="text-lg">Staff Profile</p>
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
                <ProfileItem icon={<FaBirthdayCake />} label="Date of Birth" value={subAdmin.dob} editMode={editMode} name="dob" onChange={handleChange} editedValue={editedSubAdmin.dob} />
                <ProfileItem icon={<FaIdCard />} label="Branch" value={subAdmin.branch} editMode={editMode} name="branch" onChange={handleChange} editedValue={editedSubAdmin.branch} />
                <ProfileItem icon={<FaPhone />} label="Phone No" value={subAdmin.phoneNumber} editMode={editMode} name="phoneNumber" onChange={handleChange} editedValue={editedSubAdmin.phoneNumber} />
                <ProfileItem icon={<FaEnvelope />} label="Email ID" value={subAdmin.email} editMode={editMode} name="email" onChange={handleChange} editedValue={editedSubAdmin.email} />

                {subAdmin.extra?.map((field) => (
                    <ProfileItem
                        key={field._id}
                        label={field.label}
                        value={field.value}
                        editMode={editMode}
                        name={`extra_${field._id}`}
                        onChange={handleChange}
                        editedValue={editedSubAdmin.extra?.find((item) => item._id === field._id)?.value || ""}
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

export default SubAdminProfile;