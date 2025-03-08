import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL } from '../../../Config';
import axios from 'axios';
import { FaIdCard, FaMapMarkerAlt, FaEnvelope, FaPhone, FaEdit, FaSave, FaTimes, FaBirthdayCake, FaTint } from 'react-icons/fa';
import { toast } from 'react-toastify';

const SubAdminProfile = () => {
    const { id } = useParams();
    const { authState } = useContext(AuthContext);
    const [subAdmin, setsubAdmin] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [editedsubAdmin, setEditedsubAdmin] = useState({});

    useEffect(() => {
        const fetchSubAdminDetails = async () => {
            try {
                const response = await axios.post(`${BASE_URL}/fetchSingle/subAdmin/${id}`, {
                    accessToken: authState?.accessToken,
                });

                setsubAdmin(response.data.SubAdminDetails[0]);
                setEditedsubAdmin(response.data.SubAdminDetails[0]);
            } catch (error) {
                console.error('Error fetching subAdmins:', error.response.data.error);

            }
        };

        fetchSubAdminDetails();
    }, [authState, id]);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        try {
            const payload = {
                _id: id,
                accessToken: authState?.accessToken,
                name: editedsubAdmin.name,
                phoneNumber: editedsubAdmin.phoneNumber,
                bloodGroup: editedsubAdmin.bloodGroup,
                permanentAddress: editedsubAdmin.permanentAddress,
                permanentPincode: editedsubAdmin.permanentPincode,
                DOB: editedsubAdmin.dob,
                newEmail: editedsubAdmin.email,
                branch: editedsubAdmin.branch,
            };

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
            setsubAdmin(editedsubAdmin);
            setEditMode(false);
            toast.success('Field Updated Successfully');
        } catch (error) {
            console.error('Error fetching subAdmins:', error.response.data.error);

        }
    };

    const handleCancel = () => {
        setEditedsubAdmin(subAdmin);
        setEditMode(false);
    };

    const handleChange = (e) => {
        setEditedsubAdmin({ ...editedsubAdmin, [e.target.name]: e.target.value });
    };


    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 mx-3">
            <div className="bg-gradient-to-r from-blue-200 to-blue-400 p-3 flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">{subAdmin.name}</h2>
                    <p className="text-lg">Staff Profile</p>
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
                <ProfileItem icon={<FaBirthdayCake />} label="Date of Birth" value={subAdmin.dob} editMode={editMode} name="dob" onChange={handleChange} editedValue={editedsubAdmin.dob} />
                <ProfileItem icon={<FaTint />} label="Blood Group" value={subAdmin.bloodGroup} editMode={editMode} name="bloodGroup" onChange={handleChange} editedValue={editedsubAdmin.bloodGroup} />
                <ProfileItem icon={<FaIdCard />} label="Branch" value={subAdmin.branch} editMode={editMode} name="branch" onChange={handleChange} editedValue={editedsubAdmin.branch} />
                <ProfileItem icon={<FaMapMarkerAlt />} label="Address" value={subAdmin.permanentAddress} editMode={editMode} name="permanentAddress" onChange={handleChange} editedValue={editedsubAdmin.permanentAddress} />
                <ProfileItem icon={<FaMapMarkerAlt />} label="PIN" value={subAdmin.permanentPincode} editMode={editMode} name="permanentPincode" onChange={handleChange} editedValue={editedsubAdmin.permanentPincode} />
                <ProfileItem icon={<FaPhone />} label="Phone No" value={subAdmin.phoneNumber} editMode={editMode} name="phoneNumber" onChange={handleChange} editedValue={editedsubAdmin.phoneNumber} />
                <ProfileItem icon={<FaEnvelope />} label="Email ID" value={subAdmin.email} editMode={editMode} name="email" onChange={handleChange} editedValue={editedsubAdmin.email} /> </div>
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