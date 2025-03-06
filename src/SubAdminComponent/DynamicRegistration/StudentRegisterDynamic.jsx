import React, { useContext, useEffect, useState } from "react";
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
    FaRegTimesCircle
} from 'react-icons/fa';

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

export default function StudentRegisterDynamic() {
    const { authState } = useContext(AuthContext);
    const [fetchedFields, setFetchedFields] = useState([]);
    const [fields, setFields] = useState([]);
    const [DocId, setDocId] = useState(null);
    const [userType, setUserType] = useState("Student");
    const [isLoading, setIsLoading] = useState(false);
    const [showTypeOptions, setShowTypeOptions] = useState(false);

    const userTypeOptions = ["Student", "Teacher", "SubAdmin"];
    const userTypeIcons = {
        Student: <MdSchool className="text-blue-500" />,
        Teacher: <MdPerson className="text-green-500" />,
        SubAdmin: <MdSupervisorAccount className="text-blue-500" />
    };

    const addRow = () => {
        setFields([...fields, { label: "", type: "text", required: false, options: "" }]);
    };

    const handleChange = (index, key, value, isFetched = false) => {
        if (isFetched) {
            const updatedFetchedFields = [...fetchedFields];
            updatedFetchedFields[index][key] = value;
            setFetchedFields(updatedFetchedFields);
        } else {
            const updatedFields = [...fields];
            updatedFields[index][key] = value;
            setFields(updatedFields);
        }
    };

    const handleSave = async () => {
        if (fields.length === 0) {
            toast.warning("Add at least one field to save");
            return;
        }

        if (fields.some(field => !field.label)) {
            toast.warning("All fields must have a label");
            return;
        }

        setIsLoading(true);
        try {
            const formattedFields = fields.map(field => ({
                ...field,
                options: field.type === "select" ? field.options.split(",").map(opt => opt.trim()).filter(opt => opt) : []
            }));

            const response = await axios.post(
                `${BASE_URL}/registrationFields/create`,
                {
                    for: userType,
                    fields: formattedFields
                },
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                }
            );

            if (response.status === 200) {
                setFetchedFields(prev => [...prev, ...formattedFields]);
                setFields([]);
                toast.success("Form saved successfully!");
            }
        } catch (error) {
            toast.error("Error saving form: " + (error.response?.data?.message || "Unknown error"));
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (fieldId) => {
        setIsLoading(true);
        try {
            const response = await axios.delete(
                `${BASE_URL}/registrationFields/delete/${DocId}/${fieldId}`,
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                }
            );

            if (response.status === 200) {
                setFetchedFields(prev => prev.filter((field) => field._id !== fieldId));
                toast.success("Field deleted successfully!");
            }
        } catch (error) {
            toast.error("Error deleting field: " + (error.response?.data?.message || "Unknown error"));
        } finally {
            setIsLoading(false);
        }
    };

    const removeField = (index) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);
    };

    useEffect(() => {
        fetchFieldsForUserType(userType);
    }, [userType, authState.accessToken]);

    const fetchFieldsForUserType = async (type) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/registrationFields/fetch/${type}`, {
                headers: {
                    'Authorization': `Bearer ${authState.accessToken}`
                }
            });

            if (response.status === 200) {
                setFetchedFields(response.data?.fields?.fields || []);
                setDocId(response.data?.fields?._id || null);
                toast.success(`${type} form fields loaded successfully`);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'An error occurred';
            console.log(error);
            toast.error(errorMessage);
            setFetchedFields([]);
            setDocId(null);
        } finally {
            setIsLoading(false);
        }
    };

    const getFieldTypeIcon = (type) => {
        switch (type) {
            case 'text': return 'Aa';
            case 'number': return '123';
            case 'select': return '▼';
            case 'document': return '📄';
            default: return 'Aa';
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
                    Dynamic Registration Form Builder
                </h1>

                <div className="relative min-w-[200px]">
                    <div
                        className="flex items-center justify-between gap-2 p-3 bg-white rounded-lg shadow-md cursor-pointer border border-gray-200 hover:border-blue-300 transition-all"
                        onClick={() => setShowTypeOptions(!showTypeOptions)}
                    >
                        <div className="flex items-center gap-2">
                            {userTypeIcons[userType]}
                            <span className="font-medium">{userType} Form</span>
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
                                <th className="p-3 text-left font-semibold text-gray-600 border-b">Label</th>
                                <th className="p-3 text-left font-semibold text-gray-600 border-b">Type</th>
                                <th className="p-3 text-center font-semibold text-gray-600 border-b">Required</th>
                                <th className="p-3 text-center font-semibold text-gray-600 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {fetchedFields.length > 0 ? (
                                    fetchedFields.map((field, index) => (
                                        <motion.tr
                                            key={`fetched-${field._id || index}`}
                                            className="border-b hover:bg-blue-50 transition-colors"
                                            variants={itemVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="hidden"
                                        >
                                            <td className="p-3 font-medium text-gray-700">{field.label}</td>
                                            <td className="p-3">
                                                <div className="flex items-center gap-2">
                                                    <span className=" w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-mono text-sm">
                                                        {getFieldTypeIcon(field.type)}
                                                    </span>
                                                    <div>
                                                        <div className="font-medium capitalize">{field.type}</div>
                                                        {field.type === "select" && field.options.length > 0 && (
                                                            <div className="text-xs text-gray-500 mt-1">
                                                                Options: {field.options.join(", ")}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-3 text-center">
                                                {field.required ?
                                                    <FaRegCheckCircle className="inline-block text-green-500 text-xl" /> :
                                                    <FaRegTimesCircle className="inline-block text-red-400 text-xl" />
                                                }
                                            </td>
                                            <td className="p-3 text-center">
                                                <button
                                                    className="p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors"
                                                    onClick={() => handleDelete(field._id)}
                                                    disabled={isLoading}
                                                >
                                                    <MdDelete size={20} />
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
                        <FaPen /> Add New Fields
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="p-3 text-left font-semibold text-gray-600 border-b">Label</th>
                                <th className="p-3 text-left font-semibold text-gray-600 border-b">Type</th>
                                <th className="p-3 text-center font-semibold text-gray-600 border-b">Required</th>
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
                                                value={field.label}
                                                onChange={(e) => handleChange(index, "label", e.target.value)}
                                                placeholder="Enter field label"
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                                            />
                                        </td>
                                        <td className="p-3">
                                            <div className="space-y-2">
                                                <select
                                                    value={field.type}
                                                    onChange={(e) => handleChange(index, "type", e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent appearance-none bg-white transition-all"
                                                    style={{
                                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z' fill='%236b7280'/%3E%3C/svg%3E")`,
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundPosition: 'right 8px center',
                                                        paddingRight: '32px'
                                                    }}
                                                >
                                                    <option value="text">Text</option>
                                                    <option value="number">Number</option>
                                                    <option value="select">Dropdown</option>
                                                    <option value="document">Document</option>
                                                </select>

                                                {field.type === "select" && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                    >
                                                        <input
                                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                                                            placeholder="Comma separated options"
                                                            value={field.options}
                                                            onChange={(e) => handleChange(index, "options", e.target.value)}
                                                        />
                                                    </motion.div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-3 text-center">
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => handleChange(index, "required", !field.required)}
                                                    className="relative p-1 rounded-md transition-all"
                                                >
                                                    {field.required ?
                                                        <MdOutlineCheckBox className="text-3xl text-blue-500" /> :
                                                        <MdOutlineCheckBoxOutlineBlank className="text-3xl text-gray-400" />
                                                    }
                                                </button>
                                            </div>
                                        </td>
                                        <td className="p-3 text-center">
                                            <button
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