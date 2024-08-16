import React, { useState, useContext } from "react";
import axios from 'axios';
import Papa from 'papaparse'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_Login } from "../../Config";
import AuthContext from '../../Context/AuthContext';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaIdCard, FaMapMarkerAlt, FaPray, FaBook, FaBirthdayCake, FaPhone, FaBriefcase, FaGraduationCap, FaMoneyBillWave, FaCloudUploadAlt, FaGoogle } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';

export default function TeacherRegister() {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const [formData, setFormData] = useState(
        {
            name: '',
            email: '',
            password: '',
            gender: '',
            profileLink: '',
            religion: '',
            subject: '',
            employeeId: '',
            phoneNumber: '',
            experience: '',
            education: '',
            token: '',
            aadhaarNumber: '',
            admin: false,
            DOB: '',
            permanentAddress: '',
            salary: '',
            accessToken: authState.accessToken
        }
    );
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'photo' ? files[0] : value,
        }));
    };
    const handleReset = () => {
        setFormData({
            name: '',
            email: '',
            password: '',
            gender: '',
            profileLink: '',
            religion: '',
            subject: '',
            employeeId: '',
            phoneNumber: '',
            experience: '',
            education: '',
            token: '',
            aadhaarNumber: '',
            admin: false,
            DOB: '',
            permanentAddress: '',
            salary: '',
        });

    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log(formData, authState.accessToken)
        const [year, month, day] = formData.DOB.split('-');
        const formattedDate = `${day}-${month}-${year}`;
        formData.DOB = formattedDate
        console.log(formData, authState.accessToken)

        try {
            formData.password = formData.aadhaarNumber;
            const response = await axios.post(`${BASE_URL_Login}/signup/teacher`, formData,
            );
            if (response.status === 200) {
                toast.success('Teacher registered successfully!');
                console.log(formData)
                handleReset();
            }

        } catch (err) {
            console.log(err);
            const errorMessage = error.response?.data?.error || 'An error occurred';
            toast.error(errorMessage);
        }
        finally {
            setLoading(false);

        }
    };


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

    const handleMultiSignUp = async (data) => {
        setLoading(true);

        try {
            for (let i = 0; i < data.length; i++) {
                const userData = data[i];
                userData.password = userData.aadhaarNumber;

                await axios.post(`${BASE_URL_Login}/signup/teacher`, userData);
            }
            toast.success('All teachers registered successfully');

        }
        catch (err) {
            console.error(err);
            const errorMessage = error.response?.data?.error || 'An error occurred';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    const inputClasses = "border-2 border-purple-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300";
    const labelClasses = "block text-lg mb-2 text-purple-700 font-semibold";
  
    const formFields = [
      { name: "name", label: "Name", icon: <FaUser />, type: "text" },
      { name: "gender", label: "Gender", icon: <FaUser />, type: "select", options: ["Select gender", "Male", "Female", "Other"] },
      { name: "email", label: "Email", icon: <FaEnvelope />, type: "email" },
      { name: "admin", label: "Admin", icon: <MdAdminPanelSettings />, type: "select", options: ["Select admin", "False", "True"] },
      { name: "aadhaarNumber", label: "Aadhaar Number", icon: <FaIdCard />, type: "text" },
      { name: "permanentAddress", label: "Permanent Address", icon: <FaMapMarkerAlt />, type: "text" },
      { name: "religion", label: "Religion", icon: <FaPray />, type: "select", options: ["Select religion", "Hindu", "Christian", "Other"] },
      { name: "subject", label: "Subject", icon: <FaBook />, type: "text" },
      { name: "employeeId", label: "ID Number", icon: <FaIdCard />, type: "text" },
      { name: "DOB", label: "Date of Birth", icon: <FaBirthdayCake />, type: "date" },
      { name: "phoneNumber", label: "Phone Number", icon: <FaPhone />, type: "text" },
      { name: "experience", label: "Experience", icon: <FaBriefcase />, type: "text" },
      { name: "education", label: "Education", icon: <FaGraduationCap />, type: "text" },
      { name: "salary", label: "Salary", icon: <FaMoneyBillWave />, type: "text" },
      { name: "profileLink", label: "Google Drive Link for Photo", icon: <FaGoogle />, type: "text" },
    ];

    return (
        <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-4 pt-20 bg-gradient-to-br from-purple-50 to-white rounded-lg shadow-xl p-8"
      >
        <ToastContainer />
        <h1 className="text-3xl font-bold text-purple-700 mb-8 text-center">Add New Teacher</h1>
  
        <form onSubmit={handleSubmit} className="grid grid-cols-3 md:grid-cols-2 gap-6">
          {formFields.map((field, index) => (
            <motion.div 
              key={field.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <label className={labelClasses} htmlFor={field.name}>
                <div className="flex items-center mb-2">
                  {field.icon}
                  <span className="ml-2">{field.label}</span>
                </div>
                {field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                  >
                    {field.options.map(option => (
                      <option key={option} value={option.toLowerCase()}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    className={inputClasses}
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.name === 'salary' ? "Per month in Rs." : ""}
                    required
                  />
                )}
              </label>
            </motion.div>
          ))}
        </form>
  
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
  
        <div className="flex justify-center mt-6">
          <motion.label
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 flex items-center cursor-pointer"
          >
            Upload CSV
            <input type="file" accept=".csv" className="hidden" onChange={handleUpload} />
            <FaCloudUploadAlt className="ml-2" />
          </motion.label>
        </div>
      </motion.div>
    )
}
