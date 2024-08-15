import React, { useContext, useEffect, useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'
import Papa from 'papaparse'
import Loading from '../../LoadingScreen/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_Login } from "../../Config";
import AuthContext from "../../Context/AuthContext";
import SubjectInputs from "./SubjectInputs";
import { FaUser, FaHome, FaVenusMars, FaGraduationCap, FaIdCard, FaEnvelope, FaAddressCard, FaBriefcase, FaPhone, FaStream, FaCalendarAlt, FaTint, FaUsers, FaGlobe, FaPercentage, FaCloudUploadAlt } from 'react-icons/fa';


export default function StudentRegister() {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    // const [success, setSuccess] = useState('');
    const currentYear = (new Date().getFullYear()).toString();

    const [subjects, setSubjects] = useState([Array(5).fill('')]);
    const [formData, setFormData] = useState(
        {
            name: '',
            email: '',
            password: '',
            aadhaarNumber: '',
            academicYear: currentYear,
            admissionClass: '',
            currentClass: '',
            section: '',
            subjects: [],
            admissionDate: '',
            oldAdmissionNumber: '',
            emergencyContactNumber: '',
            DOB: '',
            fatherEmailId: '',
            motherEmailId: '',
            motherName: '',
            fatherName: '',
            permanentAddress: '',
            fathersOccupation: '',
            motherOccupation: '',
            fatherPhoneNumber: '',
            motherPhoneNumber: '',
            profileLink: '',
            bloodGroup: '',
            guardiansName: '',
            guardiansOccupation: '',
            guardiansPhoneNumber: '',
            gender: '',
            religion: '',
            category: '',
            nationality: '',
            stream: '',
            accessToken: authState.accessToken,
            percentage: ''
        }
    );
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'photo' ? files[0] : value,
        }));
    };
    const handleSubject = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleReset = () => {
        setFormData({
            name: '',
            email: '',
            password: '',
            aadhaarNumber: '',
            academicYear: '',
            subjects: [],
            admissionClass: '',
            currentClass: '',
            section: '',
            admissionDate: '',
            oldAdmissionNumber: '',
            emergencyContactNumber: '',
            DOB: '',
            fatherEmailId: '',
            motherEmailId: '',
            motherName: '',
            fatherName: '',
            permanentAddress: '',
            fathersOccupation: '',
            motherOccupation: '',
            fatherPhoneNumber: '',
            motherPhoneNumber: '',
            profileLink: '',
            bloodGroup: '',
            guardiansName: '',
            guardiansOccupation: '',
            guardiansPhoneNumber: '',
            gender: '',
            religion: '',
            category: '',
            nationality: '',
            stream: '',
            percentage: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log(formData);
        try {
            const [year, month, day] = formData.DOB.split('-');
            const formattedDate = `${day}-${month}-${year}`;
            formData.DOB = formattedDate
            formData.subjects = subjects;

            formData.password = formData.aadhaarNumber;

            const response = await axios.post(`${BASE_URL_Login}/signup/student`, formData);
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

    useEffect(() => {
        console.log("here")
        switch (formData.stream) {
            case "PCM":
                setSubjects(['Physics', 'Chemistry', 'Mathematics', "English"]);
                break;
            case "PCB":
                setSubjects(['Physics', 'Chemistry', 'Biology', "English"]);
                break;
            case "PCMB":
                setSubjects(['Physics', 'Chemistry', 'Mathematics', "English", 'Biology']);
                break;
            case "Commerce":
                setSubjects(['Accountancy', 'Business Studies', 'Economics', "English"]);
                break;
            case "Arts":
                setSubjects(['History', 'Political Science', "English"]);
                break;
            default:
                setSubjects([]);
        }
    }, [formData]);

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
                return axios.post(`${BASE_URL_Login}/signup/student`, userData).catch((err) => {
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



    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg h-screen overflow-y-auto mt-6">
            <ToastContainer />
            <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700 mt-12">Add New Student</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-3  mobile:max-tablet:grid-cols-1 gap-6">
                <InputField icon={<FaUser />} label="Name" name="name" value={formData.name} onChange={handleChange} required />
                <InputField icon={<FaHome />} label="Permanent Address" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} required />
                <SelectField icon={<FaVenusMars />} label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['male', 'female', 'other']} required />
                <SelectField icon={<FaGraduationCap />} label="Current Class" name="currentClass" value={formData.currentClass} onChange={handleChange} options={['Pre-Nursery', 'Nursery', 'L.K.G', 'U.K.G', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']} required />
                <InputField icon={<FaIdCard />} label="Old Admission Number" name="oldAdmissionNumber" value={formData.oldAdmissionNumber} onChange={handleChange} />
                <InputField icon={<FaEnvelope />} label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                <InputField icon={<FaAddressCard />} label="Aadhaar Number" name="aadhaarNumber" type="number" value={formData.aadhaarNumber} onChange={handleChange} required />
                <SelectField icon={<FaUsers />} label="Religion" name="religion" value={formData.religion} onChange={handleChange} options={['Hindu', 'Sikh', 'Muslim', 'Christian', 'Other']} required />
                <SelectField icon={<FaGraduationCap />} label="Admission Class" name="admissionClass" value={formData.admissionClass} onChange={handleChange} options={['Pre-Nursery', 'Nursery', 'L.K.G', 'U.K.G', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']} required />
                <InputField icon={<FaCalendarAlt />} label="Admission Date" name="admissionDate" type="date" value={formData.admissionDate} onChange={handleChange} required />
                <InputField icon={<FaUser />} label="Father Name" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
                <InputField icon={<FaEnvelope />} label="Father Email" name="fatherEmailId" type="email" value={formData.fatherEmailId} onChange={handleChange} required />
                <InputField icon={<FaBriefcase />} label="Father Occupation" name="fathersOccupation" value={formData.fathersOccupation} onChange={handleChange} required />
                <InputField icon={<FaPhone />} label="Father Phone Number" name="fatherPhoneNumber" type="tel" value={formData.fatherPhoneNumber} onChange={handleChange} required />
                <InputField icon={<FaUser />} label="Mother Name" name="motherName" value={formData.motherName} onChange={handleChange} required />
                <InputField icon={<FaEnvelope />} label="Mother Email" name="motherEmailId" type="email" value={formData.motherEmailId} onChange={handleChange} required />
                <InputField icon={<FaBriefcase />} label="Mother Occupation" name="motherOccupation" value={formData.motherOccupation} onChange={handleChange} required />
                <InputField icon={<FaPhone />} label="Mother Phone Number" name="motherPhoneNumber" type="tel" value={formData.motherPhoneNumber} onChange={handleChange} required />
                <InputField icon={<FaCalendarAlt />} label="Date of Birth" name="DOB" type="date" value={formData.DOB} onChange={handleChange} required />
                <SelectField icon={<FaTint />} label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} options={['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']} required />
                <SelectField icon={<FaUsers />} label="Section" name="section" value={formData.section} onChange={handleChange} options={['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']} />
                <InputField icon={<FaUser />} label="Guardian Name" name="guardiansName" value={formData.guardiansName} onChange={handleChange} required />
                <InputField icon={<FaBriefcase />} label="Guardian Occupation" name="guardiansOccupation" value={formData.guardiansOccupation} onChange={handleChange} required />
                <InputField icon={<FaPhone />} label="Guardian Phone Number" name="guardiansPhoneNumber" type="tel" value={formData.guardiansPhoneNumber} onChange={handleChange} required />
                <InputField icon={<FaPhone />} label="Emergency Contact Number" name="emergencyContactNumber" type="tel" value={formData.emergencyContactNumber} onChange={handleChange} required />
                <SelectField icon={<FaUsers />} label="Category" name="category" value={formData.category} onChange={handleChange} options={['General', 'OBC', 'SC', 'ST', 'EWS']} required />
                <SelectField icon={<FaGlobe />} label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} options={['Indian', 'Nepali', 'Tibetan']} required />
                <InputField icon={<FaPercentage />} label="Percentage" name="percentage" type="number" value={formData.percentage} onChange={handleChange} required />
                <InputField icon={<FaCloudUploadAlt />} label="Profile Photo Link" name="profileLink" value={formData.profileLink} onChange={handleChange} />
                <SelectField icon={<FaStream />} label="Stream" name="stream" value={formData.stream} onChange={handleChange} options={['General', 'PCM', 'PCB', 'PCMB', 'Commerce', 'Arts']} required />

                <div className="col-span-full flex justify-center gap-4 mt-6">
                    <SubjectInputs stream={formData.stream} setSubject={setSubjects} subjects={subjects} />
                </div>

                <div className="col-span-full flex justify-center gap-4 mt-6">
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105" type="reset" onClick={handleReset}>Reset</button>
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105" type="submit">Save</button>
                </div>

                <div className="col-span-full flex justify-center mt-6">
                    <label className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 flex items-center">
                        Upload CSV <FaCloudUploadAlt className="ml-2" />
                        <input type="file" accept=".csv" className="hidden" onChange={handleUpload} />
                    </label>
                </div>
            </form>
        </div>


    );
}

const InputField = ({ icon, label, name, type = "text", value, onChange, required }) => (
    <div className="mb-4">
        <label className=" text-gray-700 text-sm font-bold mb-2 flex items-center">
            {icon} <span className="ml-2">{label}</span>
        </label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
        />
    </div>
);

const SelectField = ({ icon, label, name, value, onChange, options, required }) => (
    <div className="mb-4">
        <label className=" text-gray-700 text-sm font-bold mb-2 flex items-center">
            {icon} <span className="ml-2">{label}</span>
        </label>
        <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
        >
            <option value="">Select {label}</option>
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
);
