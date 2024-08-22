import { motion } from 'framer-motion';
import { FaCheck, FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaBirthdayCake, FaIdCard, FaHome, FaCalendarAlt, FaAddressCard } from 'react-icons/fa';
import { useLocation, useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import AuthContext from '../../../../Context/AuthContext';
import { CiEdit } from "react-icons/ci";
import Loading from '../../../../LoadingScreen/Loading'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_Login } from '../../../../Config';
import { MdWork } from 'react-icons/md';

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

    const getIcon = (apiField) => {
        switch(apiField) {
            case 'rollNumber': return <FaIdCard />;
            case 'currentClass': return <FaGraduationCap />;
            case 'DOB': return <FaBirthdayCake />;
            case 'admissionDate': case 'academicYear': return <FaCalendarAlt />;
            case 'registrationNumber': return <FaAddressCard />;
            case 'permanentAddress': return <FaHome />;
            case 'aadhaarNumber': return <FaIdCard />;
            case 'email': case 'fatherEmailId': return <FaEnvelope />;
            case 'emergencyContactNumber': case 'fatherPhoneNumber': case 'motherPhoneNumber': return <FaPhone />;
            case 'fatherName': case 'motherName': return <FaUser />;
            case 'fathersOccupation': case 'motherOccupation': return <MdWork />;
            default: return <FaUser />;
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const renderField = (apiField, label, details) => (
        <motion.div 
            className='flex w-full text-base mb-4 items-center' 
            key={apiField}
            variants={itemVariants}
        >
            <div className="flex items-center w-2/5">
                <span className="text-purple-500 mr-2">{getIcon(apiField)}</span>
                <h1 className='font-medium text-purple-600'>{label}</h1>
            </div>
            {editMode[apiField] ? (
                <motion.input
                    type="text"
                    name={apiField}
                    value={tempData[apiField] || ''}
                    onChange={handleChange}
                    onBlur={() => handleSave(apiField)}
                    className='border-b border-purple-300 p-1 focus:outline-none focus:border-purple-500 transition-colors duration-300'
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                />
            ) : (
                <motion.h1 
                    className='w-fit ml-2 font-normal text-gray-600'
                    whileHover={{ scale: 1.05 }}
                >
                    {userData[apiField]}
                </motion.h1>
            )}
            <motion.div 
                className="ml-4 cursor-pointer" 
                onClick={() => handleEdit(apiField)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
            >
                {editMode[apiField] ? 
                    <FaCheck className='text-green-400' /> : 
                    <CiEdit className='text-purple-500' />
                }
            </motion.div>
        </motion.div>
    );

    return (
        <motion.div 
            className="flex-1 w-full mt-3 mb-2 shadow-lg rounded-lg bg-white p-6 h-fit"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <ToastContainer />
            <motion.div 
                className="flex justify-between flex-grow items-center mb-6"
                variants={itemVariants}
            >
                <h1 className="text-2xl font-bold text-purple-700">
                    <FaUser className="inline-block mr-2" /> All Details
                </h1>
            </motion.div>
            <motion.div className='border-purple-200 border-t-2 mb-6' variants={itemVariants} />
            <div className='tablet:flex mt-2'>
                <motion.div className='tablet:w-1/2 pr-4' variants={containerVariants}>
                    <h2 className="text-xl font-semibold text-purple-600 mb-4">Student Details</h2>
                    {Object.entries(studentDetails).map(([apiField, label]) => renderField(apiField, label, studentDetails))}
                </motion.div>
                <motion.div className='tablet:w-1/2 pl-4' variants={containerVariants}>
                    <h2 className="text-xl font-semibold text-purple-600 mb-4">Parent Details</h2>
                    {Object.entries(parentsDetails).map(([apiField, label]) => renderField(apiField, label, parentsDetails))}
                </motion.div>
            </div>
        </motion.div>
    );
}