import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL } from '../../../Config';
import axios from 'axios';
import { FaIdCard, FaEnvelope, FaPhone, FaEdit, FaSave, FaTimes, FaBirthdayCake, FaTag } from 'react-icons/fa';
import { toast } from 'react-toastify';
import FileUploadField from '../../../SubAdminComponent/Student/FileUploadField';

const SubAdminProfile = () => {
    const { id } = useParams();
    const { authState } = useContext(AuthContext);
    const [subAdmin, setSubAdmin] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [editedSubAdmin, setEditedSubAdmin] = useState({});
    const [customFields, setCustomFields] = useState([]);

    useEffect(() => {
        const fetchSubAdminDetails = async () => {
            try {
                const response = await axios.post(`${BASE_URL}/fetchSingle/subAdmin/${id}`, {
                    accessToken: authState?.accessToken,
                });

                const subAdminDetails = response.data.SubAdminDetails[0];
                subAdminDetails.extra = subAdminDetails.extra || [];
                setSubAdmin(subAdminDetails);
                setEditedSubAdmin(subAdminDetails);
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

            const updatedExtra = [...(editedSubAdmin.extra || [])];
            customFields.forEach(field => {
                const existingFieldIndex = updatedExtra.findIndex(extraField => extraField.label === field.label);
                if (existingFieldIndex === -1) {
                    updatedExtra.push({ label: field.label, value: '', _id: field._id });
                }
            });

            payload.extra = updatedExtra;

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

    const handleCustomFieldValueChange = (e) => {
        if (!editMode) return;

        const { name, value, files } = e.target;
        setEditedSubAdmin((prev) => ({
            ...prev,
            extra: prev.extra.map((field) =>
                field.label === name ? { ...field, value: files ? files[0] : value } : field
            ),
        }));
    };

    const fetchFieldsForUserType = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/registrationFields/fetch/SubAdmin`, {
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
        }
    };

    useEffect(() => {
        fetchFieldsForUserType();
    }, [authState]);

    useEffect(() => {
        const updatedExtraFields = [...(subAdmin.extra || [])];
        customFields.forEach(field => {
            if (!updatedExtraFields.some(extraField => extraField.label === field.label)) {
                updatedExtraFields.push({ label: field.label, value: '', _id: field._id });
            }
        });
        setEditedSubAdmin(prev => ({ ...prev, extra: updatedExtraFields }));
    }, [customFields, subAdmin]);

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 mt-3">
            <div className="bg-gradient-to-r from-blue-200 to-blue-400 p-3 flex justify-between items-center">
                <div className="flex items-center">
                    <div className="flex items-center">
                        <img src={subAdmin.profileLink} alt="" className="h-16 w-16 border-2 border-blue-600 rounded-full object-cover mr-2" />
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
                <ProfileItem icon={<FaBirthdayCake />} label="Date of Birth" value={subAdmin.dob} editMode={editMode} name="dob" onChange={handleCustomFieldValueChange} editedValue={editedSubAdmin.dob} />
                <ProfileItem icon={<FaIdCard />} label="Branch" value={subAdmin.branch} editMode={editMode} name="branch" onChange={handleCustomFieldValueChange} editedValue={editedSubAdmin.branch} />
                <ProfileItem icon={<FaPhone />} label="Phone No" value={subAdmin.phoneNumber} editMode={editMode} name="phoneNumber" onChange={handleCustomFieldValueChange} editedValue={editedSubAdmin.phoneNumber} />
                <ProfileItem icon={<FaEnvelope />} label="Email ID" value={subAdmin.email} editMode={editMode} name="email" onChange={handleCustomFieldValueChange} editedValue={editedSubAdmin.email} />

                {customFields.map((field, index) => {
                    const fieldValue = editedSubAdmin.extra.find((fields) => fields.label === field.label)?.value || "";
                    switch (field.type) {
                        case "select":
                            return (
                                <SelectField
                                    key={index}
                                    icon={<FaTag />}
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
                                    icon={<FaTag />}
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
                                    icon={<FaTag />}
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
                                    icon={<FaTag />}
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

export default SubAdminProfile;