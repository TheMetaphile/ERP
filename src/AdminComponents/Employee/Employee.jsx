import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Details from './utils/Details';
import Address from './utils/Address';
import Access from './utils/Access';
import Ctc from './utils/Ctc';
import Preview from './utils/Preview';
import ProgressBar from './utils/ProgressBar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileUploadField from '../../SubAdminComponent/Student/FileUploadField';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL } from '../../Config';
import axios from 'axios';
import { FaUser, FaEnvelope, FaIdCard, FaMapMarkerAlt, FaPray, FaBook, FaBirthdayCake, FaPhone, FaBriefcase, FaGraduationCap, FaMoneyBillWave, FaCloudUploadAlt, FaGoogle, FaPlus, FaAddressCard, FaVenusMars, FaCalendarAlt } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import { refreshAccessToken } from '../../RefreshTokenHelper';

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 50 }
    }
};

function Employee() {
    // const [step, setStep] = useState(0);
    // const [formData, setFormData] = useState({
    //     name: '',
    //     qualification: '',
    //     institute: '',
    //     phoneNumber: '',
    //     emergencyContactNumber: '',
    //     email: '',
    //     dob: '',
    //     bloodGroup: '',
    //     aadhaarNumber: '',
    //     profileLink: '',
    //     permanentAddress: '',
    //     permanentState: '',
    //     permanentDistrict: '',
    //     permanentPincode: '',
    //     residentialAddress: '',
    //     residentialState: '',
    //     residentialDistrict: '',
    //     residentialPincode: '',
    //     department: '',
    //     role: '',
    //     instruments: [],
    // });

    // const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
    // const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

    // const handleChange = (input) => (e) => {
    //     setFormData({ ...formData, [input]: e.target.value });
    // };

    // const handleAddInstrument = (title, amount) => {
    //     const newInstrument = { title, amount };
    //     setFormData({ ...formData, instruments: [...formData.instruments, newInstrument] });
    // };

    // const renderStep = () => {
    //     switch (step) {
    //         case 0:
    //             return <Details nextStep={nextStep} handleChange={handleChange} formData={formData} />;
    //         case 1:
    //             return <Address nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />;
    //         case 2:
    //             return <Access nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />;
    //         case 3:
    //             return <Ctc nextStep={nextStep} prevStep={prevStep} handleAddInstrument={handleAddInstrument} formData={formData} />;
    //         case 4:
    //             return <Preview prevStep={prevStep} formData={formData} />;
    //         default:
    //             return null;
    //     }
    // };

    // const pageVariants = {
    //     initial: { opacity: 0, x: "-100%" },
    //     in: { opacity: 1, x: 0 },
    //     out: { opacity: 0, x: "100%" }
    // };

    // const pageTransition = {
    //     type: "tween",
    //     ease: "anticipate",
    //     duration: 0.5
    // };

    const { authState, updateAccessToken, logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [extraFormData, setExtraFormData] = useState([]);
    const [customFields, setCustomFields] = useState([]);
    const [formData, setFormData] = useState(
        {
            accessToken: authState?.accessToken,
        }
    );

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
            accessToken: authState?.accessToken,
        });
        setExtraFormData([]);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        for (const field of extraFormData) {
            if (field.required && !field.value) {
                toast.error(`${field.label} is required`);
                setLoading(false);
                return; // Stop form submission
            }
        }
        console.log(extraFormData);

        const [year, month, day] = formData.dob.split('-');
        const formattedDate = `${day}-${month}-${year}`;
        formData.DOB = formattedDate;
        formData.password = formData.aadhaarNumber;

        try {
            const payload = new FormData();
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
            console.log(payload)
            const response = await axios.post(`${BASE_URL}/signup/subAdmin`, payload,
            );
            if (response.status === 200) {
                toast.success('Teacher registered successfully!');
                console.log(formData)
                handleReset();
            }

        } catch (err) {
            console.log(err);
            const errorMessage = err.response?.data?.error || 'An error occurred';
            toast.error(errorMessage);
            if (
                err.response &&
                err.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await handleSubmit();
                } catch (refreshError) {
                }
            } else {
                toast.error(err.response?.data?.error || "An error occurred");
            }
        }
        finally {
            setLoading(false);

        }
    };

    const fetchFieldsForUserType = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/registrationFields/fetch/SubAdmin`, {
                headers: {
                    'Authorization': `Bearer ${authState?.accessToken}`
                }
            });
            if (response.status === 200) {
                console.log(response.data)
                setCustomFields(response.data?.fields?.fields || []);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'An error occurred';
            console.log(error);
            toast.error(errorMessage);
            setFetchedFields([]);
            setDocId(null);
            if (
                error.response &&
                error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await fetchFieldsForUserType();
                } catch (refreshError) {
                }
            } else {
                toast.error(error.response?.data?.error || "An error occurred");
            }
        }
    };


    useEffect(() => {
        fetchFieldsForUserType();
    }, [authState]);


    return (
        // <motion.div
        //     className="flex flex-col px-6 items-start py-2 mb-6 w-full  mx-auto mobile:max-tablet:px-2"
        //     initial={{ opacity: 0, y: 20 }}
        //     animate={{ opacity: 1, y: 0 }}
        //     transition={{ duration: 0.5 }}
        // >
        //     <ToastContainer />

        //     <motion.h1
        //         className="text-3xl font-medium items-start text-black mb-2 self-center mobile:max-tablet:text-lg"
        //         initial={{ opacity: 0 }}
        //         animate={{ opacity: 1 }}
        //         transition={{ delay: 0.2 }}
        //     >
        //         Employee Registration
        //     </motion.h1>

        //     <div className="flex flex-col items-center justify-center w-full bg-blue-50 rounded-xl shadow-lg p-8 mobile:max-tablet:px-2">
        //         <ProgressBar step={step} />
        //         <div className="relative w-full">
        //             <AnimatePresence mode='wait'>
        //                 <motion.div
        //                     key={step}
        //                     initial="initial"
        //                     animate="in"
        //                     exit="out"
        //                     variants={pageVariants}
        //                     transition={pageTransition}
        //                 >
        //                     {renderStep()}
        //                 </motion.div>
        //             </AnimatePresence>
        //         </div>
        //     </div>
        // </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-4 pt-4 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-xl p-8 mobile:max-tablet:p-2 mobile:max-tablet:mx-2 mobile:max-tablet:mt-2"
        >
            <ToastContainer />
            <h1 className="text-3xl mobile:max-tablet:text-lg font-bold text-blue-700 mb-8 text-center">Add New Employee</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 mobile:max-tablet:grid-cols-1 gap-6">
                    <InputField icon={<FaUser />} label="Name" name="name" value={formData.name} onChange={handleChange} required />
                    <InputField icon={<FaEnvelope />} label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                    <InputField icon={<FaPhone />} label="Phone Number" name="phoneNumber" type="text" value={formData.phoneNumber} onChange={handleChange} required />
                    <InputField icon={<FaAddressCard />} label="Aadhaar Number" name="aadhaarNumber" type="text" value={formData.aadhaarNumber} onChange={handleChange} required />
                    {/* <InputField icon={<FaCloudUploadAlt />} label="Profile Photo Link" name="profileLink" value={formData.profileLink} onChange={handleChange} /> */}
                    <InputField icon={<FaCalendarAlt />} label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} required />

                    <FileUploadField
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
                </div>
                <div className="flex justify-center mt-8 space-x-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300"
                        type="reset"
                        onClick={handleReset}
                    >
                        Reset
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300"
                        type="submit"
                    >
                        Save
                    </motion.button>
                </div>
            </form>


        </motion.div>
    );
}

export default Employee;

const InputField = ({ icon, label, name, type = "text", value, onChange, required }) => (
    <motion.div className="mb-4" variants={itemVariants}>
        <label className="flex items-center text-lg mb-2 text-blue-700 font-semibold">
            {icon} <span className="ml-2">{label}</span>
        </label>
        <motion.input
            className="border-2 border-blue-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
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
const SelectField = ({ icon, label, name, value, onChange, options, required }) => (
    <motion.div className="mb-4" variants={itemVariants}>
        <label className="flex items-center text-lg mb-2 text-blue-700 font-semibold">
            {icon} <span className="ml-2">{label}</span>
        </label>
        <motion.select
            className="border-2 border-blue-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
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