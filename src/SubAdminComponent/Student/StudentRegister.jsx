import React, { useContext, useEffect, useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'
import Papa from 'papaparse'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../../Config";
import AuthContext from "../../Context/AuthContext";
import SubjectInputs from "./SubjectInputs";
import { FaUser, FaVenusMars, FaGraduationCap, FaEnvelope, FaAddressCard, FaBriefcase, FaStream, FaCalendarAlt, FaUsers, FaCloudUploadAlt, FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import FileUploadField from "./FileUploadField";

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 50 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 50 }
    }
};

export default function StudentRegister() {
    const { authState, darkMode } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const currentYear = (new Date().getFullYear()).toString();
    const [subjects, setSubjects] = useState([]);
    const [optionalSubjects, setOptioanlSubjects] = useState([]);

    const [formData, setFormData] = useState(
        {
            academicYear: currentYear,
            accessToken: authState?.accessToken,
        }
    );

    const [extraFormData, setExtraFormData] = useState([]);

    const [customFields, setCustomFields] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sectionsDetails, setSectionsDetails] = useState([]);


    const [newField, setNewField] = useState({
        label: "",
        name: "",
        type: "text",
        required: false,
        options: "",
    });
    const handleFieldChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewField((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleAddField = () => {
        if (!newField.label || !newField.name) {
            toast.error("Field name and label are required!");
            return;
        }
        const fieldData = { ...newField };
        if (newField.type === "dropdown") {
            fieldData.options = newField.options.split(",").map((opt) => opt.trim());
        }
        setCustomFields([...customFields, fieldData]);
        setIsModalOpen(false);
        setNewField({ label: "", name: "", type: "text", required: false, options: "" });
    };

    const fetchSections = async (selectedClass) => {
        try {
            const response = await axios.post(`${BASE_URL}/classTeacher/fetch/sections`, {
                accessToken: authState?.accessToken,
                class: selectedClass,
            });

            console.log(response.data, "section");
            const sectionsDetail = response.data.sections.map(sectionObj => sectionObj.section);
            setSectionsDetails(sectionsDetail);
        } catch (error) {
            console.error("Error while fetching section:", error);
        }
    };

    const handleClassChangeWithFetch = (e) => {
        const selectedClass = e.target.value;
        handleChange(e);
        if (selectedClass) {
            fetchSections(selectedClass);
        } else {
            setSectionsDetails([]);
        }
    };

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;
        if (type === 'file') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0],
            }));
            return;
        }
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCustomFieldValueChange = (e) => {
        const { name, value, files, type } = e.target;

        setExtraFormData((prevData) => {
            // Clone existing custom fields or initialize an empty array
            const updatedCustomFields = [...(prevData || [])];

            // Find index of the field if it exists
            const fieldIndex = updatedCustomFields.findIndex(field => field.label === name);

            // Prepare new field object
            const newField = {
                label: name,
                value: type === "file" ? files[0] : value,
            };

            if (fieldIndex !== -1) {
                // Update existing field
                updatedCustomFields[fieldIndex] = newField;
            } else {
                // Add new field
                updatedCustomFields.push(newField);
            }
            console.log(updatedCustomFields);
            return updatedCustomFields;
        });
    };



    const handleReset = () => {
        setFormData({
            academicYear: currentYear,
            accessToken: authState?.accessToken,
        });
        setExtraFormData([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log(extraFormData);
        try {
            const [year, month, day] = formData.DOB.split('-');
            const formattedDate = `${day}-${month}-${year}`;
            formData.DOB = formattedDate
            formData.subjects = subjects;
            formData.password = formData.aadhaarNumber;
            const payload = new FormData();
            console.log(extraFormData)
            for (const key in formData) {

                payload.append(key, formData[key]); // Append files properly

            }
            extraFormData.forEach((item, index) => {
                if (item.value instanceof File) {
                    payload.append(`extra[${index}][label]`, item.label);
                    payload.append(`extra[${index}][value]`, item.value);
                }
            });

            payload.append("extraFields", JSON.stringify(extraFormData));
            console.log(payload);
            const response = await axios.post(`${BASE_URL}/signup/student`, payload);
            if (response.status === 200) {
                toast.success('Student registered successfully!');
                handleReset();
            }

        } catch (err) {
            console.error(err);
            const errorMessage = error.response?.data?.error || 'An error occurred';
            toast.error(errorMessage);
        }
        finally {
            setLoading(false);

        }
    }

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const csvData = event.target.result;
                Papa.parse(csvData, {
                    header: true,
                    complete: (results) => {
                        console.log(results.data);
                        handleMultiSignUp(results.data);
                    }
                })

            }
            reader.readAsText(file);
        }
    }

    const fetchFieldsForUserType = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/registrationFields/fetch/Student`, {
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
            setFetchedFields([]);
            setDocId(null);
        }
    };


    const handleMultiSignUp = async (data) => {
        setLoading(true);
        console.log("here");
        const date = new Date();
        const session = `${date.getFullYear()}-${(date.getFullYear() - 2000) + 1}`;

        try {
            const promises = data.map(userData => {
                userData.password = userData.aadhaarNumber;
                userData.session = session;
                console.log(userData);
                if (!userData.name) {
                    return;
                }
                return axios.post(`${BASE_URL}/signup/student`, userData).catch((err) => {
                    const error = JSON.parse(err.request.response);
                    toast.error(error.error + " " + userData.name);
                });
            });


            await Promise.all(promises);
            handleReset();
        } catch (err) {
            console.log("here", err,);
            const errorMessage = err.response?.data?.error || 'An error occurred';
            toast.error(errorMessage);
        } finally {
            toast.success("Students account created Successfully");
            setLoading(false);
        }
    }

    const fetchSubjects = async () => {

        try {
            // In a real application, you would add your API base URL
            const response = await axios.post(`${BASE_URL}/subjects/fetch`, {
                Class: formData.currentClass,
                stream: formData.stream
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authState?.accessToken}`
                }
            });

            const data = response.data;
            if (data.status) {
                // setSubjects(data.coreSubjects || []);
                setOptioanlSubjects(data.optionalSubjects || []);
            } else {
                // setMessage({ text: data.error || 'Failed to fetch subjects', type: 'error' });
            }
        } catch (error) {
            // setMessage({ text: 'Error connecting to server', type: 'error' });
        }
    };

    useEffect(() => {
        console.log("here fetch subejcts", formData.stream, formData.currentClass)
        if (formData.stream && formData.currentClass) {
            fetchSubjects();
        }
    }, [formData.stream, formData.currentClass]);


    useEffect(() => {
        fetchFieldsForUserType();
    }, [authState]);

    return (
        <motion.div
            className={`p-6 rounded-lg shadow-lg h-screen overflow-y-auto ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <ToastContainer theme={darkMode ? 'dark' : 'light'} />
            <h1
                className={`text-3xl mobile:max-tablet:text-lg font-bold mb-6 text-center ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}
            >
                Add New Student
            </h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-3 mobile:max-tablet:grid-cols-1 gap-6">
                <InputField darkMode={darkMode} icon={<FaUser />} label="Name" name="name" value={formData.name} onChange={handleChange} required />
                <SelectField darkMode={darkMode} icon={<FaVenusMars />} label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['male', 'female', 'other']} required />
                <InputField darkMode={darkMode} icon={<FaCalendarAlt />} label="Date of Birth" name="DOB" type="date" value={formData.DOB} onChange={handleChange} required />
                <InputField darkMode={darkMode} icon={<FaBriefcase />} label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} required />
                <SelectField darkMode={darkMode} icon={<FaUsers />} label="Category" name="category" value={formData.category} onChange={handleChange} options={["General", "EWS", "OBC", "SC", "ST"]} />

                <SelectField darkMode={darkMode} icon={<FaGraduationCap />} label="Admission Class" name="admissionClass" value={formData.admissionClass} onChange={handleChange} options={['Pre-Nursery', 'Nursery', 'L.K.G', 'U.K.G', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']} required />
                <SelectField darkMode={darkMode} icon={<FaGraduationCap />} label="Current Class" name="currentClass" value={formData.currentClass} onChange={handleClassChangeWithFetch} options={['Pre-Nursery', 'Nursery', 'L.K.G', 'U.K.G', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']} required />
                <SelectField darkMode={darkMode} icon={<FaStream />} label="Stream" name="stream" value={formData.stream} onChange={handleChange} options={['General', 'PCM', 'PCB', 'PCMB', 'Commerce', 'Arts']} required />
                <SelectField darkMode={darkMode} icon={<FaUsers />} label="Section" name="section" value={formData.section} onChange={handleChange} options={sectionsDetails.length > 0 ? sectionsDetails : ["No sections available"]}
                    disabled={sectionsDetails.length === 0} />
                <InputField darkMode={darkMode} icon={<FaCalendarAlt />} label="Date of Admission" name="admissionDate" type="date" value={formData.admissionDate} onChange={handleChange} required />

                <InputField darkMode={darkMode} icon={<FaEnvelope />} label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                <InputField darkMode={darkMode} icon={<FaAddressCard />} label="Aadhaar Number" name="aadhaarNumber" type="number" value={formData.aadhaarNumber} onChange={handleChange} required />

                <InputField darkMode={darkMode} icon={<FaBriefcase />} label="Father's Name" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
                <InputField darkMode={darkMode} icon={<FaBriefcase />} label="Mother's Name" name="motherName" value={formData.motherName} onChange={handleChange} required />
                <InputField darkMode={darkMode} icon={<FaBriefcase />} label="Guardian's Name" name="guardiansName" value={formData.guardiansName} onChange={handleChange} required />

                <FileUploadField
                    darkMode={darkMode}
                    label="Profile Photo"
                    name="profileLink"
                    value={formData?.profileLink || ""}
                    onChange={handleChange}
                    accept=".jpeg,.jpg,.png "
                />

                {customFields.map((field, index) => {
                    switch (field.type) {
                        case "select":
                            return (
                                <SelectField
                                    key={index}
                                    darkMode={darkMode}
                                    label={field.label}
                                    name={field.label}
                                    options={field.options}
                                    onChange={handleCustomFieldValueChange}
                                    value={extraFormData.find((fields) => fields.label === field.label)?.value || ""}
                                    required={field.required}
                                />
                            );
                        case "text":
                            return (
                                <InputField
                                    key={index}
                                    darkMode={darkMode}
                                    label={field.label}
                                    name={field.label}
                                    value={extraFormData.find((fields) => fields.label === field.label)?.value || ""}
                                    onChange={handleCustomFieldValueChange}
                                    type="text"
                                    required={field.required}
                                />
                            );
                        case "number":
                            return (
                                <InputField
                                    key={index}
                                    darkMode={darkMode}
                                    label={field.label}
                                    name={field.label}
                                    value={extraFormData.find((fields) => fields.label === field.label)?.value || ""}
                                    onChange={handleCustomFieldValueChange}
                                    type="number"
                                    required={field.required}
                                />
                            );
                        case "document":
                            return (
                                <FileUploadField
                                    key={index}
                                    darkMode={darkMode}
                                    label={field.label}
                                    name={field.label}
                                    required={field.required}
                                    value={extraFormData.find((fields) => fields.label === field.label)?.value || ""}
                                    onChange={handleCustomFieldValueChange}
                                />
                            );
                        default:
                            return (
                                <InputField
                                    key={index}
                                    darkMode={darkMode}
                                    label={field.label}
                                    name={field.label}
                                    type={field.type}
                                    value={extraFormData.find((fields) => fields.label === field.label)?.value || ""}
                                    onChange={handleCustomFieldValueChange}
                                    required={field.required}
                                />
                            );
                    }
                })}
                <motion.div className="col-span-full flex justify-center gap-4 mt-6" variants={itemVariants}>
                    <SubjectInputs
                        setSubject={setSubjects}
                        subjects={subjects}
                        subjectList={optionalSubjects} />
                </motion.div>


                <div className="col-span-full flex justify-center gap-4 mt-2">
                    <motion.button
                        className={`${darkMode ? 'bg-red-700 hover:bg-red-800' : 'bg-red-500 hover:bg-red-600'} text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105`}
                        type="reset"
                        onClick={handleReset}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Reset
                    </motion.button>
                    <motion.button
                        className={`${darkMode ? 'bg-green-700 hover:bg-green-800' : 'bg-green-500 hover:bg-green-600'} text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105`}
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Save
                    </motion.button>
                </div>

                <motion.div className="col-span-full flex gap-3 justify-center mt-6" variants={itemVariants}>
                    <motion.button
                        className={`${darkMode ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-500 hover:bg-blue-600'} text-white font-bold py-2 px-6 rounded flex items-center gap-2`}
                        onClick={() => setIsModalOpen(true)}
                    >
                        <FaPlus /> Add Field
                    </motion.button>
                    <motion.label
                        className={`${darkMode ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-500 hover:bg-blue-600'} text-white font-bold py-2 px-6 rounded cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 flex items-center`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Upload CSV <FaCloudUploadAlt className="ml-2" />
                        <input type="file" accept=".csv" className="hidden" onChange={handleUpload} />
                    </motion.label>
                </motion.div>
            </form>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} p-6 rounded-lg shadow-lg w-96`}>
                        <h2 className="text-xl font-bold mb-4">Add New Field</h2>
                        <div className="grid gap-4">
                            <InputField darkMode={darkMode} label="Field Label" name="label" value={newField.label} onChange={handleFieldChange} required />
                            <InputField darkMode={darkMode} label="Field Name (key)" name="name" value={newField.name} onChange={handleFieldChange} required />
                            <SelectField
                                darkMode={darkMode}
                                label="Field Type"
                                name="type"
                                value={newField.type}
                                onChange={handleFieldChange}
                                options={["text", "number", "email", "date", "boolean", "dropdown"]}
                            />
                            {newField.type === "dropdown" && (
                                <InputField darkMode={darkMode} label="Dropdown Options (comma-separated)" name="options" value={newField.options} onChange={handleFieldChange} />
                            )}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="required"
                                    name="required"
                                    checked={newField.required || false}
                                    onChange={(e) => handleFieldChange({ target: { name: "required", value: e.target.checked } })}
                                    className="peer hidden"
                                />
                                <div className={`w-5 h-5 border-2 ${darkMode ? 'border-gray-500' : 'border-gray-300'} rounded flex items-center justify-center cursor-pointer peer-checked:bg-green-500 peer-checked:border-green-500`}>
                                    {newField.required && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" />
                                    </svg>}
                                </div>
                                <label htmlFor="required" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} cursor-pointer`}>Required Field</label>
                            </div>

                            <div className="flex justify-end gap-2">
                                <button className={`${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-black'} py-2 px-4 rounded`} onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button className={`${darkMode ? 'bg-green-700' : 'bg-green-500'} text-white py-2 px-4 rounded`} onClick={handleAddField}>Add Field</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

const InputField = ({ icon, label, name, type = "text", value, onChange, required, darkMode }) => (
    <motion.div className="mb-4" variants={itemVariants}>
        <label className={`flex items-center text-lg mb-2 ${darkMode ? 'text-blue-400 font-semibold' : 'text-blue-700 font-semibold'}`}>
            {icon} <span className="ml-2">{label}</span>
        </label>
        <motion.input
            className={`border-2 ${darkMode ? 'border-blue-500 bg-gray-700 text-white' : 'border-blue-300 bg-white text-gray-700'} rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            whileFocus={{ scale: 1.02 }}
        />
    </motion.div>
);

const SelectField = ({ icon, label, name, value, onChange, options, required, darkMode }) => (
    <motion.div className="mb-4" variants={itemVariants}>
        <label className={`flex items-center text-lg mb-2 ${darkMode ? 'text-blue-400 font-semibold' : 'text-blue-700 font-semibold'}`}>
            {icon} <span className="ml-2">{label}</span>
        </label>
        <motion.select
            className={`border-2 ${darkMode ? 'border-blue-500 bg-gray-700 text-white' : 'border-blue-300 bg-white text-gray-700'} rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            whileFocus={{ scale: 1.02 }}
        >
            <option value="">Select {label}</option>
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </motion.select>
    </motion.div>
);