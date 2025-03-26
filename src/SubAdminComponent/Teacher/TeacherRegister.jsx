import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import Papa from 'papaparse'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../../Config";
import AuthContext from '../../Context/AuthContext';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaIdCard, FaMapMarkerAlt, FaPray, FaBook, FaBirthdayCake, FaPhone, FaBriefcase, FaGraduationCap, FaMoneyBillWave, FaCloudUploadAlt, FaGoogle, FaPlus, FaAddressCard, FaVenusMars, FaCalendarAlt } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import FileUploadField from "../Student/FileUploadField";

const initialFields = [
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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 50 }
  }
};

export default function TeacherRegister() {
  const { authState } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);


  const [formData, setFormData] = useState(
    {
      accessToken: authState?.accessToken,
    }
  );

  const [extraFormData, setExtraFormData] = useState([]);

  const [customFields, setCustomFields] = useState([]);

  const [newField, setNewField] = useState({
    label: "",
    name: "",
    type: "text",
    required: false,
    options: "",
  });

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
    setNewField({ label: "", name: "", type: "text", required: false, options: "" });
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
      accessToken: authState?.accessToken,
    });
    setExtraFormData([]);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(extraFormData);

    const [year, month, day] = formData.DOB.split('-');
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
      const response = await axios.post(`${BASE_URL}/signup/teacher`, payload,
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

  const fetchFieldsForUserType = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/registrationFields/fetch/Teacher`, {
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
    }
  };

  const handleMultiSignUp = async (data) => {


    try {
      for (let i = 0; i < data.length; i++) {
        const userData = data[i];
        userData.password = userData.aadhaarNumber;

        await axios.post(`${BASE_URL}/signup/teacher`, userData);
      }
      toast.success('All teachers registered successfully');

    }
    catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.error || 'An error occurred';
      toast.error(errorMessage);
    } finally {

    }
  }

  useEffect(() => {
    fetchFieldsForUserType();
  }, [authState]);



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-4 pt-4 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-xl p-8 mobile:max-tablet:p-2 mobile:max-tablet:mx-2 mobile:max-tablet:mt-2"
    >
      <ToastContainer />
      <h1 className="text-3xl mobile:max-tablet:text-lg font-bold text-blue-700 mb-8 text-center">Add New Teacher</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 mobile:max-tablet:grid-cols-1 gap-6">
          <InputField icon={<FaUser />} label="Name" name="name" value={formData.name} onChange={handleChange} required />
          <InputField icon={<FaEnvelope />} label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          <InputField icon={<FaAddressCard />} label="Aadhaar Number" name="aadhaarNumber" type="text" value={formData.aadhaarNumber} onChange={handleChange} required />
          <SelectField icon={<FaVenusMars />} label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['male', 'female', 'other']} required />
          <SelectField icon={<MdAdminPanelSettings />} label="Admin" name="admin" value={formData.admin} onChange={handleChange} options={["False", "True"]} required />
          {/* <InputField icon={<FaCloudUploadAlt />} label="Profile Photo Link" name="profileLink" value={formData.profileLink} onChange={handleChange} /> */}
          <InputField icon={<FaCalendarAlt />} label="Date of Birth" name="DOB" type="date" value={formData.DOB} onChange={handleChange} required />

          <FileUploadField

            label="Profile Photo"
            name="profileLink"
            value={formData?.profileLink || ""}
            onChange={handleChange}
            accept=".jpeg,.jpg,.png "
          />
          {/* {formFields.map((field, index) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <label className={labelClasses} htmlFor={field.name}>
              <div className="flex items-center mb-2">
                {field.icon}
                <span className="ml-1 whitespace-nowrap mobile:max-tablet:text-sm">{field.label}</span>
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
        ))} */}

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



      <div className="flex justify-center gap-2 mt-6">
        {/* <motion.label
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 flex items-center cursor-pointer"
        >
          Add Field
          <FaPlus className="ml-2" />
        </motion.label> */}

        <motion.label
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 flex items-center cursor-pointer"
        >
          Upload CSV
          <input type="file" accept=".csv" className="hidden" onChange={handleUpload} />
          <FaCloudUploadAlt className="ml-2" />
        </motion.label>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Field</h2>
            <input className="w-full p-2 border rounded mb-2" placeholder="Field Name" value={newField.name} onChange={(e) => setNewField({ ...newField, name: e.target.value })} />
            <input className="w-full p-2 border rounded mb-2" placeholder="Label" value={newField.label} onChange={(e) => setNewField({ ...newField, label: e.target.value })} />
            <select className="w-full p-2 border rounded mb-2" value={newField.type} onChange={(e) => setNewField({ ...newField, type: e.target.value })}>
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="email">Email</option>
              <option value="boolean">Boolean (Checkbox)</option>
              <option value="select">Dropdown</option>
            </select>
            {newField.type === "select" && (
              <input className="w-full p-2 border rounded mb-2" placeholder="Comma separated options" value={newField.options} onChange={(e) => setNewField({ ...newField, options: e.target.value })} />
            )}

            <div className="flex items-center gap-2">
              <label htmlFor="required" className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  id="required"
                  name="required"
                  checked={newField.required || false}
                  onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                  className="peer hidden"
                />
                <div className="w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center peer-checked:bg-green-500 peer-checked:border-green-500">
                  {newField.required && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-gray-700">Required Field</span>
              </label>
            </div>



            <div className="flex justify-between mt-2">
              <button onClick={() => setShowModal(false)} className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600">Cancel</button>
              <button onClick={handleAddField} className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600">Add Field</button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}


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