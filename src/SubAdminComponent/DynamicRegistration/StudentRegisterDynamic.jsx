import React, { useContext, useEffect, useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'
import Loading from '../../LoadingScreen/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../../Config";
import AuthContext from "../../Context/AuthContext";
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 50 }
    }
};

export default function StudentRegisterDynamic() {
    const { authState } = useContext(AuthContext);
    const [fetchedFields, setFetchedFields] = useState([]);
    const [fields, setFields] = useState([]);

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
        console.log('erer')
        try {
            const formattedFields = fields.map(field => ({
                ...field,
                options: field.type === "select" ? field.options.split(",").map(opt => opt.trim()) : []
            }));
            const response = await axios.post(
                `${BASE_URL}/registrationFields/create`,
                {
                    for: "Student",
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
            toast.error("Error saving form!");
        }
    };


    useEffect(() => {
        const fetchFields = async () => {

            try {
                const response = await axios.get(`${BASE_URL}/registrationFields/fetch/Student`, {
                    headers: {
                        'Authorization': `Bearer ${authState.accessToken}`
                    }
                });
                if (response.status === 200) {
                    console.log("API response :", response.data?.fields?.fields);
                    setFetchedFields(response.data?.fields?.fields);
                    toast.success('Data Fetched Successully');
                }

            }
            catch (error) {
                const errorMessage = error.response?.data?.error || 'An error occurred';
                console.log(error)
                toast.error(errorMessage);
            }
        };

        fetchFields();
    }, [authState.accessToken]);





    return (
        <motion.div
            className=" p-6 rounded-lg shadow-lg h-screen overflow-y-auto "
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <ToastContainer />
            <h1
                className="text-3xl mobile:max-tablet:text-lg font-bold mb-6 text-center text-purple-700 "
            >
                Add New Form Fields
            </h1>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border p-2">Label</th>
                        <th className="border p-2">Type</th>
                        <th className="border p-2">Required</th>
                    </tr>
                </thead>
                <tbody>
                    {fetchedFields.map((field, index) => (
                        <tr key={`fetched-${index}`}>
                            <td className="border p-2">{field.label}</td>
                            <td className="border p-2">{field.type} ( {field.type === "select" ? field.options.join(", ") : ""} )</td>
                            <td className="border p-2 text-center">{field.required ? "✔" : "❌"}</td>
                        </tr>
                    ))}

                    {fields.map((field, index) => (
                        <tr key={index}>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={field.label}
                                    onChange={(e) => handleChange(index, "label", e.target.value)}
                                    className="w-full p-1 border"
                                />
                            </td>
                            <td className="border p-2">
                                <select
                                    value={field.type}
                                    onChange={(e) => handleChange(index, "type", e.target.value)}
                                    className="w-full p-1 border"
                                >
                                    <option value="text">Text</option>
                                    <option value="number">Number</option>
                                    <option value="select">Dropdown</option>
                                    <option value="text">Document</option>

                                </select>
                                {field.type === "select" && (
                                    <input
                                        className="w-full p-2 border rounded mb-2"
                                        placeholder="Comma separated options"
                                        value={field.options}
                                        onChange={(e) => handleChange(index, "options", e.target.value)}
                                    />
                                )}
                            </td>
                            <td className="border p-2 text-center">

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id={`required-${index}`}
                                        name="required"
                                        checked={field.required}
                                        onChange={(e) => handleChange(index, "required", e.target.checked)}
                                        className="peer hidden"
                                    />
                                    <div className="w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center cursor-pointer peer-checked:bg-green-500 peer-checked:border-green-500">
                                        {field.required && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" />
                                        </svg>}
                                    </div>
                                    <label htmlFor={`required-${index}`} className="text-gray-700 cursor-pointer">Required Field</label>
                                </div>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 flex gap-4">
                <button onClick={addRow} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Row
                </button>
                <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">
                    Save
                </button>
            </div>

        </motion.div>



    );
}



