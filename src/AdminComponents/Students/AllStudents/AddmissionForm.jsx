import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from 'axios'
import Papa from 'papaparse'

export default function AddmissionForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState(
        {
            name: '',
            email: '',
            password: '',
            aadhaarNumber: '',
            academicYear: '2024',
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
            religion: ''
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
            aadhaarNumber: '',
            academicYear: '',
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
            religion: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);


        try {
            formData.password = formData.aadhaarNumber;
            const response = await axios.post('https://loginapi-y0aa.onrender.com/signup/student', formData);
            if (response.status === 200) {
                setSuccess('Student registered successfully!');
                console.log(formData)
                setTimeout(() => setSuccess(''), 4000);
                handleReset();
            }

        } catch (err) {
            console.error(error);
            setError(error.response?.data?.error || 'An error ocured');
            setTimeout(() => {
                setError('');
            }, 2000);
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

    const handleMultiSignUp = async (data) => {
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            for (let i = 0; i < data.length; i++) {
                const userData = data[i];
                userData.password = userData.aadhaarNumber;

                await axios.post('https://loginapi-y0aa.onrender.com/signup/student', userData);
            }
            setSuccess('All Students registered successfully');
            setTimeout(() => setSuccess(''), 4000);
        }
        catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'An error occurred');
            setTimeout(() => {
                setError('');
            }, 2000);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="rounded-lg shadow-lg mx-4 mb-4 border-gray-100 px-4">
            <div className="mt-2"><h1 className="text-2xl font-semibold px-4 mt-4">Add New Student</h1></div>
            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-8 px-2 mb-2">
                {error && <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>}
                {success && <div className="bg-green-100 text-green-700 p-2 rounded">{success}</div>}
                <div className="flex w-full gap-4 mobile:max-tablet:flex-col mobile:max-tablet:gap-2">
                    <div className="flex flex-col mt-8">
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="name">
                                Name
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                            </label>
                        </div>

                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="permanentAddress">
                                Permanent Address
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="permanentAddress"
                                    type="text"
                                    name="permanentAddress"
                                    value={formData.permanentAddress}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                            </label>
                        </div>
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="gender">
                                Gender
                                <select
                                    className="border rounded-md w-full py-2 px-3 text-gray-500  focus:outline-none focus:shadow-outline mt-2"
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </label>
                        </div>
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="currentClass">
                                Current Class
                                <select
                                    className="border rounded-md w-full py-2 px-3 text-gray-500  focus:outline-none focus:shadow-outline mt-2"
                                    id="currentClass"
                                    type="text"
                                    name="currentClass"
                                    value={formData.currentClass}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Class</option>
                                    <option value="Pre-Nursery">Pre-Nursery</option>
                                    <option value="Nursery">Nursery</option>
                                    <option value="L.K.J">L.K.J</option>
                                    <option value="U.K.J">U.K.J</option>
                                    <option value="1st">1st</option>
                                    <option value="2nd">2nd</option>
                                    <option value="3rd">3rd</option>
                                    <option value="4th">4th</option>
                                    <option value="5th">5th</option>
                                    <option value="6th">6th</option>
                                    <option value="7th">7th</option>
                                    <option value="8th">8th</option>
                                    <option value="9th">9th</option>
                                    <option value="10th">10th</option>
                                    <option value="11th">11th</option>
                                    <option value="12th">12th</option>
                                </select>
                            </label>
                        </div>

                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="oldAdmissionNumber">
                                Old Admission Number
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="oldAdmissionNumber"
                                    type="text"
                                    name="oldAdmissionNumber"
                                    value={formData.oldAdmissionNumber}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="fatherName">
                                Father Name
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="fatherName"
                                    type="text"
                                    name="fatherName"
                                    value={formData.fatherName}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                            </label>
                        </div>
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="fatherEmailId">
                                Father Email
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="fatherEmailId"
                                    type="text"
                                    name="fatherEmailId"
                                    value={formData.fatherEmailId}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                            </label>
                        </div>
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="fathersOccupation">
                                Father Occupation
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="fathersOccupation"
                                    type="text"
                                    name="fathersOccupation"
                                    value={formData.fathersOccupation}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                            </label>
                        </div>

                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="fatherPhoneNumber">
                                Father Phone Number
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="fatherPhoneNumber"
                                    type="text"
                                    name="fatherPhoneNumber"
                                    value={formData.fatherPhoneNumber}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                            </label>
                        </div>

                    </div>
                    <div className="flex flex-col mt-8">
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="email">
                                Email
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="aadhaarNumber">
                                Aadhaar Number
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="aadhaarNumber"
                                    type="text"
                                    name="aadhaarNumber"
                                    value={formData.aadhaarNumber}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                            </label>
                        </div>
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="religion">
                                Religion
                                <select
                                    className="border rounded-md w-full py-2 px-3 text-gray-500  focus:outline-none focus:shadow-outline mt-2"
                                    id="religion"
                                    name="religion"
                                    value={formData.religion}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select religion</option>
                                    <option value="Hindu">Hindu</option>
                                    <option value="Sikh">Sikh</option>
                                    <option value="Muslim">Muslim</option>
                                    <option value="Chrisitian">Christian</option>
                                    <option value="other">Other</option>
                                </select>
                            </label>
                        </div>

                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="admissionClass">
                                Admission Class
                                <select
                                    className="border rounded-md w-full py-2 px-3 text-gray-500  focus:outline-none focus:shadow-outline mt-2"
                                    id="admissionClass"
                                    type="text"
                                    name="admissionClass"
                                    value={formData.admissionClass}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Class</option>
                                    <option value="Pre-Nursery">Pre-Nursery</option>
                                    <option value="Nursery">Nursery</option>
                                    <option value="L.K.J">L.K.J</option>
                                    <option value="U.K.J">U.K.J</option>
                                    <option value="1st">1st</option>
                                    <option value="2nd">2nd</option>
                                    <option value="3rd">3rd</option>
                                    <option value="4th">4th</option>
                                    <option value="5th">5th</option>
                                    <option value="6th">6th</option>
                                    <option value="7th">7th</option>
                                    <option value="8th">8th</option>
                                    <option value="9th">9th</option>
                                    <option value="10th">10th</option>
                                    <option value="11th">11th</option>
                                    <option value="12th">12th</option>
                                </select>
                            </label>
                        </div>

                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="admissionDate">
                                Addmission Date
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="admissionDate"
                                    type="text"
                                    name="admissionDate"
                                    value={formData.admissionDate}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                            </label>
                        </div>
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="motherName">
                                Mother Name
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="motherName"
                                    type="text"
                                    name="motherName"
                                    value={formData.motherName}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                            </label>
                        </div>
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="motherEmailId">
                                Mother Email
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="motherEmailId"
                                    type="text"
                                    name="motherEmailId"
                                    value={formData.motherEmailId}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                            </label>
                        </div>
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="motherOccupation">
                                Mother Occupation
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="motherOccupation"
                                    type="text"
                                    name="motherOccupation"
                                    value={formData.motherOccupation}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                            </label>
                        </div>
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="motherPhoneNumber">
                                Mother Phone Number
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="motherPhoneNumber"
                                    type="text"
                                    name="motherPhoneNumber"
                                    value={formData.motherPhoneNumber}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                            </label>
                        </div>


                    </div>

                    <div className="flex flex-col mt-8">

                        <div className="w-full rounded-md mobile:max-tablet:w-full">


                            <label className="block text-lg mb-2" htmlFor="DOB">
                                Date Of Birth
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="DOB"
                                    type="text"
                                    name="DOB"
                                    value={formData.DOB}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                            </label>
                        </div>
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="bloodGroup">
                                Blood Group
                                <select
                                    className="border rounded-md w-full py-2 px-3 text-gray-500  focus:outline-none focus:shadow-outline mt-2"
                                    id="bloodGroup"
                                    name="bloodGroup"
                                    value={formData.bloodGroup}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                            </label>
                        </div>
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="section">
                                Section
                                <select
                                    className="border rounded-md w-full py-2 px-3 text-gray-500  focus:outline-none focus:shadow-outline mt-2"
                                    id="section"
                                    name="section"
                                    value={formData.section}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Section</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="E">E</option>
                                    <option value="F">F</option>
                                    <option value="G">G</option>
                                    <option value="H">H</option>
                                    <option value="I">I</option>
                                </select>
                            </label>
                        </div>

                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="guardiansName">
                                Guardian Name
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="guardiansName"
                                    type="text"
                                    name="guardiansName"
                                    value={formData.guardiansName}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                            </label>
                        </div>
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="guardiansOccupation">
                                Guardian Occupation
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="guardiansOccupation"
                                    type="text"
                                    name="guardiansOccupation"
                                    value={formData.guardiansOccupation}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                            </label>
                        </div>

                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="guardiansPhoneNumber">
                                Guardian Phone Number
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="guardiansPhoneNumber"
                                    type="text"
                                    name="guardiansPhoneNumber"
                                    value={formData.guardiansPhoneNumber}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                            </label>
                        </div>
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="emergencyContactNumber">
                                Emergency Contact Number
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="emergencyContactNumber"
                                    type="text"
                                    name="emergencyContactNumber"
                                    value={formData.emergencyContactNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>
                    </div>

                </div>
                <div className=" flex gap-4 mobile:max-tablet:flex-col mobile:max-tablet:gap-2 mb-4">
                    <div className="w-1/2 rounded-lg mobile:max-tablet:w-full text-lg whitespace-nowrap">
                        Add Google Drive Link for Photo
                        <label className="block text-lg mb-2">
                            {/* Add Google Drive Link for Photo */}
                            <input
                                className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-1"
                                id="profileLink"
                                type="text"
                                name="profileLink"
                                value={formData.profileLink}
                                onChange={handleChange}
                                capture="user"
                            />
                        </label>
                    </div>
                    <div className="w-1/2 rounded-md mobile:max-tablet:w-full">
                        <div className="flex justify-center tablet:mt-6 mt-1">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 mr-2 w-1/4 mobile:max-tablet:w-1/2 tablet:w-1/2"
                                type="reset"
                                onClick={handleReset}
                            >
                                Reset
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 w-1/4 mobile:max-tablet:w-1/2 tablet:w-1/2"
                                type="submit"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>

                <div className=" flex justify-center items-center mb-3">
                    <label className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded mt-2 w-1/4 mobile:max-tablet:w-1/2 tablet:w-1/2 flex justify-center items-center cursor-pointer whitespace-nowrap">
                        Upload CSV
                        <input type="file" accept=".csv" className="hidden" onChange={handleUpload}/>
                        <FaCloudUploadAlt className="ml-2" />
                    </label>
                </div>
            </form>
        </div>


    );
}