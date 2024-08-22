import React, { useContext, useState } from 'react';
import axios from 'axios';
import Loading from '../../../LoadingScreen/Loading';
import { toast } from 'react-toastify';
import { BASE_URL_Login } from '../../../Config';
import AuthContext from '../../../Context/AuthContext';
import { motion } from "framer-motion";
import { FaUser, FaGraduationCap, FaUniversity, FaPhone, FaEnvelope, FaBirthdayCake, FaTint, FaIdCard, FaMapMarkerAlt, FaBuilding, FaUserTie, FaLink } from "react-icons/fa";

const Preview = ({ prevStep, formData }) => {
    const [loading, setLoading] = useState(false);
    const { authState } = useContext(AuthContext);

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
            accessToken : authState.accessToken
        };
        setLoading(true);
        console.log(payload)
        try {
            const response = await axios.post(`${BASE_URL_Login}/signup/SubAdmin`, payload);
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
            <div className="p-6  mx-auto bg-purple-50 rounded-lg shadow-lg space-y-6 border border-purple-200">
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-semibold p-2 text-purple-700 text-center"
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
                            <div className="text-purple-600 text-xl">{item.icon}</div>
                            <div className='flex items-center font-semibold'>
                                <p className="text-base text-purple-800">{item.label}: </p>&nbsp;
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
                        onClick={prevStep}
                        className="bg-purple-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-purple-600 transition duration-300"
                    >
                        Back
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleConfirm}
                        className="bg-purple-700 text-white px-6 py-2 rounded-full shadow-md hover:bg-purple-800 transition duration-300"
                    >
                        {loading ? <Loading /> : 'Confirm'}
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Preview;
