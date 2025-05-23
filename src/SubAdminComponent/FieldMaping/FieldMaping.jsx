import React, { useContext, useEffect, useRef, useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../../Config";
import AuthContext from "../../Context/AuthContext";
import { motion, AnimatePresence } from 'framer-motion';
import {
    MdDelete,
    MdAdd,
    MdSave,
    MdLabel,
    MdOutlineCheckBoxOutlineBlank,
    MdOutlineCheckBox,
    MdKeyboardArrowDown,
    MdPerson,
    MdSchool,
    MdSupervisorAccount
} from 'react-icons/md';
import {
    FaSort,
    FaTrash,
    FaPen,
    FaRegCheckCircle,
    FaRegTimesCircle,
    FaUpload
} from 'react-icons/fa';
import { AiOutlineDownload } from "react-icons/ai";
const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 50,
            staggerChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.3 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: 'spring', stiffness: 100 }
    }
};

const buttonVariants = {
    hover: {
        scale: 1.05,
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)"
    },
    tap: { scale: 0.95 }
};

export default function FieldMaping() {
    const { authState } = useContext(AuthContext);
    const [fetchedFields, setFetchedFields] = useState([]);
    const [fields, setFields] = useState([
        { referenceNo: "", file: null },
    ]);
    const [userType, setUserType] = useState("TC");
    const [isLoading, setIsLoading] = useState(false);
    const [showTypeOptions, setShowTypeOptions] = useState(false);
    const fileInputRefs = useRef([]);


    const getPresignedUrl = async (fileName) => {
        try {
            console.log(fileName);
            const response = await axios.get(`${BASE_URL}/fetch/url/${encodeURIComponent(fileName)}`, {
                headers: {
                    Authorization: `Bearer ${authState?.accessToken}`, // Pass the JWT token for authentication
                },
            });
            return response.data.signedUrl; // Return the pre-signed URL
        } catch (error) {
            console.error("Error fetching pre-signed URL:", error.response?.data || error.message);
            return null;
        }
    };

    const downloadFile = async (doc) => {
        try {
            console.log(authState?.userDetails);
            const fileName = "documents/" + authState?.userDetails?.branch + '/' + userType + "/" + doc.referenceNo + '.' + doc.documentType
            const signedUrl = await getPresignedUrl(fileName);
            if (!signedUrl) {
                alert("Failed to get download URL");
                return;
            }

            console.log(signedUrl);
            // Fetch the file and trigger download
            const fileResponse = await fetch(signedUrl);
            const blob = await fileResponse.blob();
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.setAttribute("download", fileName.split("/").pop()); // Use only the file name for download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };

    const openFile = async (doc) => {
        try {
            console.log(authState?.userDetails);
            const fileName = "documents/" + authState?.userDetails?.branch + '/' + userType + "/" + doc.referenceNo + '.' + doc.documentType
            const signedUrl = await getPresignedUrl(fileName);
            if (!signedUrl) {
                alert("Failed to get download URL");
                return;
            }

            window.open(signedUrl, "_blank");

        } catch (error) {
            console.error("Error downloading file:", error);
        }
    }

    const userTypeOptions = ["TC", "CC", "Result", "Bonafide", "Admit Card"];
    const userTypeIcons = {
        Student: <MdSchool className="text-blue-500" />,
        Teacher: <MdPerson className="text-green-500" />,
        SubAdmin: <MdSupervisorAccount className="text-blue-500" />
    };

    const addRow = () => {
        setFields([...fields, { referenceNo: "", file: null }]);
    };

    const handleChange = (index, key, value) => {
        const updatedFields = [...fields];
        updatedFields[index][key] = value;
        setFields(updatedFields);
    };

    // Handle file selection
    const handleFileChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const updatedFields = [...fields];
            updatedFields[index].file = file;
            setFields(updatedFields);
        }
    };

    // Handle removing a row
    const removeField = (index) => {
        setFields(fields.filter((_, i) => i !== index));
    };

    // Function to trigger file selection
    const triggerFileInput = (index) => {
        if (fileInputRefs.current[index]) {
            fileInputRefs.current[index].click();
        }
    };


    const handleSave = async () => {
        if (fields.length === 0) {
            toast.warning("Add at least one field to save");
            return;
        }
        const formData = new FormData();
        formData.append("documentName", userType);

        // Append all reference numbers and files
        fields.forEach((field, index) => {
            formData.append(`referenceNo[${index}]`, field.referenceNo);
            if (field.file) {
                formData.append(`file[${index}]`, field.file);
            }
        });
        // console.log(formData, fields);
        setIsLoading(true);
        try {

            const response = await axios.post(
                `${BASE_URL}/templates/create`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`
                    }
                }
            );

            if (response.status === 200) {

                console.log(typeof fields[0].file.name);
                setFetchedFields(prev => [...prev, ...fields.map((field) => { return { ...field, _id: response.data.ids[field.referenceNo], documentType: field.file.name.split('.').pop() } })]);
                console.log(fetchedFields);
                fetchFieldsForUserType(userType);
                setFields([]);
                toast.success("Form saved successfully!");
            }
        } catch (error) {
            toast.error("Error saving form: " + (error.response?.data?.message || error));
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (fieldId) => {
        setIsLoading(true);
        try {
            const response = await axios.delete(
                `${BASE_URL}/templates/delete/${fieldId}`,
                {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`
                    }
                }
            );

            if (response.status === 200) {
                setFetchedFields(prev => prev.filter((field) => field._id !== fieldId));
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error("Error deleting field: " + (error.response?.data?.message || "Unknown error"));
        } finally {
            setIsLoading(false);
        }
    };



    useEffect(() => {
        fetchFieldsForUserType(userType);
    }, [authState?.accessToken]);

    const fetchFieldsForUserType = async (type) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/templates/fetch`, {
                headers: {
                    'Authorization': `Bearer ${authState?.accessToken}`
                }
            });

            if (response.status === 200) {
                setFetchedFields(response.data || []);
                toast.success(`${type} form fields loaded successfully`);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'An error occurred';
            console.log(error);
            toast.error(errorMessage);
            setFetchedFields([]);
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <motion.div
            className="p-8 h-screen overflow-y-auto bg-gradient-to-br from-white to-blue-50"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Header with User Type Selector */}
            <motion.div
                className="mb-8 flex flex-col items-center"
                variants={itemVariants}
            >
                <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-600 mb-4">
                    Field Maping Management
                </h1>

                <div className="relative min-w-[200px]">
                    <div
                        className="flex items-center justify-between gap-2 p-3 bg-white rounded-lg shadow-md cursor-pointer border border-gray-200 hover:border-blue-300 transition-all"
                        onClick={() => setShowTypeOptions(!showTypeOptions)}
                    >
                        <div className="flex items-center gap-2">
                            {userTypeIcons[userType]}
                            <span className="font-medium">{userType}</span>
                        </div>
                        <MdKeyboardArrowDown className={`transition-transform ${showTypeOptions ? 'rotate-180' : ''}`} />
                    </div>

                    {showTypeOptions && (
                        <motion.div
                            className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10 overflow-hidden"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {userTypeOptions.map((type) => (
                                <div
                                    key={type}
                                    className={`flex items-center gap-2 p-3 cursor-pointer hover:bg-blue-50 transition-colors ${userType === type ? 'bg-blue-50' : ''}`}
                                    onClick={() => {
                                        setUserType(type);
                                        setShowTypeOptions(false);
                                    }}
                                >
                                    {userTypeIcons[type]}
                                    <span>{type}</span>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* Fields Table */}
            <motion.div
                className="bg-white rounded-xl shadow-lg overflow-hidden mb-6"
                variants={itemVariants}
            >
                <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <MdLabel /> Current Form Fields
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="p-3 text-left font-semibold text-gray-600 border-b">Refrence  No.</th>
                                <th className="p-3 text-left font-semibold text-gray-600 border-b">File</th>
                                <th className="p-3 text-center font-semibold text-gray-600 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {fetchedFields.filter(field => field.documentName == userType).length > 0 ? (
                                    fetchedFields.filter(field => field.documentName == userType).map((field, index) => (
                                        <motion.tr
                                            key={`fetched-${field._id || index}`}
                                            className="border-b hover:bg-blue-50 transition-colors"
                                            variants={itemVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="hidden"
                                        >
                                            <td className="p-3 font-medium text-gray-700">{field.referenceNo}</td>
                                            <td className="p-3 text-blue-600 hover:cursor-pointer" onClick={() => { openFile(field) }}>
                                                {userType}_{field.referenceNo}.{field.documentType}
                                            </td>
                                            <td className="p-3 text-center flex justify-center gap-3">
                                                <button
                                                    className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                                                    onClick={() => handleDelete(field._id)}
                                                    disabled={isLoading}
                                                >
                                                    <MdDelete size={20} />
                                                </button>
                                                <button
                                                    className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
                                                    onClick={() => downloadFile(field)}
                                                    disabled={isLoading}
                                                >
                                                    <AiOutlineDownload size={20} />
                                                </button>

                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="p-4 text-center text-gray-500">
                                            No fields found for {userType} form. Add some fields below.
                                        </td>
                                    </tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* New Fields Section */}
            <motion.div
                className="bg-white rounded-xl shadow-lg overflow-hidden mb-6"
                variants={itemVariants}
            >
                <div className="p-4 bg-gradient-to-r from-green-500 to-teal-600 text-white">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <FaPen /> Add New Template
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="p-3 text-left font-semibold text-gray-600 border-b">Reference No.</th>
                                <th className="p-3 text-left font-semibold text-gray-600 border-b">File</th>
                                <th className="p-3 text-center font-semibold text-gray-600 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {fields.map((field, index) => (
                                    <motion.tr
                                        key={index}
                                        className="border-b"
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit={{ opacity: 0, x: -100 }}
                                    >
                                        <td className="p-3">
                                            <input
                                                type="text"
                                                value={field.referenceNo}
                                                onChange={(e) => handleChange(index, "referenceNo", e.target.value)}
                                                placeholder="Enter Reference No."
                                                required
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                                            />
                                        </td>
                                        <td className="p-3 flex items-center space-x-2">
                                            <input
                                                type="file"
                                                accept=".docx"
                                                className="hidden"
                                                ref={(el) => (fileInputRefs.current[index] = el)}
                                                onChange={(e) => handleFileChange(index, e)}
                                            />
                                            <button
                                                type="button"
                                                className="p-2 bg-blue-50 text-blue-500 rounded-full hover:bg-blue-100 transition-colors"
                                                onClick={() => triggerFileInput(index)}
                                            >
                                                <FaUpload size={16} />
                                            </button>
                                            {field.file && (
                                                <span className="text-gray-600 text-sm">{field.file.name}</span>
                                            )}
                                        </td>
                                        <td className="p-3 text-center">
                                            <button
                                                type="button"
                                                onClick={() => removeField(index)}
                                                className="p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors"
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>

                            {fields.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="p-4 text-center text-gray-500">
                                        Click "Add Field" to start creating your form
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 bg-gray-50 flex flex-wrap gap-3 justify-end">
                    <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={addRow}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow flex items-center gap-2 transition-all hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                        disabled={isLoading}
                    >
                        <MdAdd size={20} />
                        Add Field
                    </motion.button>

                    <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={handleSave}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow flex items-center gap-2 transition-all hover:bg-green-600 disabled:opacity-50 disabled:pointer-events-none"
                        disabled={isLoading || fields.length === 0}
                    >
                        <MdSave size={20} />
                        Save Form
                    </motion.button>
                </div>
            </motion.div>

            {/* Loading Overlay */}
            {isLoading && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col items-center">
                        <div className="loader w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        <p className="mt-3 text-gray-700">Processing...</p>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}