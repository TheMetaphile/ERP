import React, { useContext, useState } from 'react';
import axios from 'axios';
import Loading from '../../../LoadingScreen/Loading';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../Config';
import AuthContext from '../../../Context/AuthContext';
import { motion } from "framer-motion";
import { FaUser,FaPlus, FaGraduationCap, FaUniversity, FaPhone, FaEnvelope, FaBirthdayCake, FaTint, FaIdCard, FaMapMarkerAlt, FaBuilding, FaUserTie, FaLink } from "react-icons/fa";

const Preview = ({ prevStep, formData }) => {
    const [loading, setLoading] = useState(false);
    const { authState } = useContext(AuthContext);
    const [additionalFields, setAdditionalFields] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newField, setNewField] = useState({
        name: "",
        required: false,
        type: "string",
    });

    const {
        name,
        qualification,
        institute,
        phoneNumber,
        emergencyContactNumber,
        email,
        dob,
        bloodGroup,
        aadhaarNumber,
        profileLink,
        permanentAddress,
        permanentState,
        permanentDistrict,
        permanentPincode,
        residentialAddress,
        residentialState,
        residentialDistrict,
        residentialPincode,
        department,
        role,
        // instruments,
    } = formData;

    const handleConfirm = async () => {
        if (
            !name || !qualification || !institute || !phoneNumber ||
            !emergencyContactNumber || !email || !dob || !bloodGroup ||
            !aadhaarNumber || !permanentAddress || !permanentState ||
            !permanentDistrict || !permanentPincode || !residentialAddress ||
            !residentialState || !residentialDistrict || !residentialPincode ||
            !department || !role || !profileLink
        ) {
            alert('Please fill all fields.');
            return;
        }

        const payload = {
            name,
            qualification,
            institute,
            phoneNumber,
            emergencyContactNumber,
            email,
            dob,
            bloodGroup,
            aadhaarNumber,
            profileLink,
            permanentAddress,
            permanentState,
            permanentDistrict,
            permanentPincode,
            residentialAddress,
            residentialState,
            residentialDistrict,
            residentialPincode,
            department,
            role,
            accessToken: authState.accessToken
        };
        setLoading(true);
        console.log(payload)
        try {
            const response = await axios.post(`${BASE_URL}/signup/SubAdmin`, payload);
            if (response.status === 200) {
                toast.success('Sub Admin registered successfully!');
                console.log(response.data)

            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.error || 'An error occurred';
            toast.error(errorMessage);
        }
        finally {
            setLoading(false);

        }
    };

    const toggleModal = () => setShowModal(!showModal);

    const handleFieldChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewField((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const addNewField = () => {
        if (newField.name.trim() === "") return;

        setAdditionalFields((prev) => [
            ...prev,
            {
                icon: <FaPlus />,
                label: newField.name,
                value: newField.required ? "Required Field" : "Optional Field",
            },
        ]);

        setShowModal(false);
        setNewField({ name: "", required: false, type: "string" });
    };

    const infoItems = [
        { icon: <FaUser />, label: "Name", value: name },
        { icon: <FaGraduationCap />, label: "Highest Qualification", value: qualification },
        { icon: <FaUniversity />, label: "Name of Institute", value: institute },
        { icon: <FaPhone />, label: "Phone Number", value: phoneNumber },
        { icon: <FaPhone />, label: "Emergency Contact", value: emergencyContactNumber },
        { icon: <FaEnvelope />, label: "Email", value: email },
        { icon: <FaBirthdayCake />, label: "DOB", value: dob },
        { icon: <FaTint />, label: "Blood Group", value: bloodGroup },
        { icon: <FaIdCard />, label: "Aadhar Number", value: aadhaarNumber },
        { icon: <FaMapMarkerAlt />, label: "Permanent Address", value: `${permanentAddress}, ${permanentDistrict}, ${permanentState}, ${permanentPincode}` },
        { icon: <FaMapMarkerAlt />, label: "Residential Address", value: `${residentialAddress}, ${residentialDistrict}, ${residentialState}, ${residentialPincode}` },
        { icon: <FaBuilding />, label: "Department", value: department },
        { icon: <FaUserTie />, label: "Role", value: role },
        { icon: <FaLink />, label: "Profile Link", value: "Available" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full px-3 mobile:max-tablet:px-0 items-start mt-2 mb-3"
        >
            <div className="p-6  mx-auto bg-blue-50 rounded-lg shadow-lg space-y-6 border border-blue-200">
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-semibold p-2 text-blue-700 text-center"
                >
                    Preview
                </motion.h2>

                <div className="grid grid-cols-2  gap-6">
                    {infoItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-3"
                        >
                            <div className="text-blue-600 text-xl">{item.icon}</div>
                            <div className='flex items-center font-semibold'>
                                <p className="text-base text-blue-800">{item.label}: </p>&nbsp;
                                <p className="text-base ">{item.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="flex justify-between mt-8"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleModal}
                        className="bg-green-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-600 transition duration-300"
                    >
                        Add Field
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={prevStep}
                        className="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600 transition duration-300"
                    >
                        Back
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleConfirm}
                        className="bg-blue-700 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-800 transition duration-300"
                    >
                        {loading ? <Loading /> : 'Confirm'}
                    </motion.button>
                </motion.div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
                        <h3 className="text-xl font-semibold">Add New Field</h3>

                        <input
                            type="text"
                            name="name"
                            placeholder="Field Name"
                            value={newField.name}
                            onChange={handleFieldChange}
                            className="w-full border p-2 rounded"
                        />
                        <input className="w-full p-2 border rounded mb-2" placeholder="Label" value={newField.label} onChange={handleFieldChange} />

                        <select
                            name="type"
                            value={newField.type}
                            onChange={handleFieldChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value="string">Text</option>
                            <option value="number">Number</option>
                            <option value="boolean">Boolean (Yes/No)</option>
                            <option value="dropdown">Dropdown (e.g., Gender)</option>
                        </select>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="required"
                                name="required"
                                checked={newField.required}
                                onChange={handleFieldChange}
                                className="peer hidden"
                            />
                            <div className="w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center cursor-pointer peer-checked:bg-green-500 peer-checked:border-green-500">
                                {newField.required && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" />
                                </svg>}
                            </div>
                            <label htmlFor="required" className="text-gray-700 cursor-pointer">Required Field</label>
                        </div>


                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={toggleModal}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addNewField}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </motion.div>
    );
};

export default Preview;
