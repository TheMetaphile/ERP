import React, { useContext, useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from 'axios'
import Papa from 'papaparse'
import Loading from '../../LoadingScreen/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_Login } from "../../Config";
import AuthContext from "../../Context/AuthContext";

export default function StudentRegister() {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    // const [success, setSuccess] = useState('');
    const currentYear = (new Date().getFullYear()).toString();

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
            accessToken : authState.accessToken
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
            religion: '',
            category: '',
            nationality: '',
            stream: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log(formData);
        try {
            formData.password = formData.aadhaarNumber;
            const response = await axios.post(`${BASE_URL_Login}/signup/student`, formData);
            if (response.status === 200) {
                toast.success('Student registered successfully!');
                console.log(formData)
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
        <div className="rounded-lg shadow-lg mx-4 mb-4 border-gray-100 px-4 pt-20">
            <ToastContainer />
            <div className="mt-2"><h1 className="text-2xl font-semibold px-2 mt-4">Add New Student</h1></div>
            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-8 px-2 mb-2">
                <div className="flex w-full gap-4 mobile:max-tablet:flex-col mobile:max-laptop:gap-2">
                    <div className="flex flex-col mt-8 tablet:max-laptop:w-4/12">
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="name">
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
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="permanentAddress">
                                <div className=" whitespace-nowrap">Permanent Address</div>

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
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="gender">
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
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="currentClass">
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
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="oldAdmissionNumber">
                                <div className="whitespace-nowrap">Old Admission Number
                                </div>
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
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="fatherName">
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
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="fatherEmailId">
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
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="fathersOccupation">
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
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="fatherPhoneNumber">
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

                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="stream">
                                Stream
                                <select
                                    className="border rounded-md w-full py-2 px-3 text-gray-500  focus:outline-none focus:shadow-outline mt-2"
                                    id="stream"
                                    type="text"
                                    name="stream"
                                    value={formData.stream}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Stream</option>
                                    <option value="General">General</option>
                                    <option value="PCM">PCM</option>
                                    <option value="PCB">PCM</option>
                                    <option value="PCMB">PCMB</option>
                                    <option value="Commerce">Commerce</option>
                                    <option value="Arts">Arts</option>

                                </select>
                            </label>
                        </div>

                    </div>
                    <div className="flex flex-col mt-8 tablet:max-laptop:w-4/12">
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="email">
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
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="aadhaarNumber">
                                <div className=" whitespace-nowrap">Aadhaar Number</div>

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
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="religion">
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
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="admissionClass">
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
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="admissionDate">
                                Admission Date
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="admissionDate"
                                    type="date"
                                    name="admissionDate"
                                    value={formData.admissionDate}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                            </label>
                        </div>
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="motherName">
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
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="motherEmailId">
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
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="motherOccupation">
                                <div className=" whitespace-nowrap">Mother Occupation</div>
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
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="motherPhoneNumber">
                                <div className=" whitespace-nowrap">Mother Phone Number</div>
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

                    <div className="flex flex-col mt-8 tablet:max-laptop:w-4/12">

                        <div className="w-full rounded-md mobile:max-tablet:w-full">


                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="DOB">
                                <div className=" whitespace-nowrap">Date Of Birth</div>

                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="DOB"
                                    type="date"
                                    name="DOB"
                                    value={formData.DOB}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                            </label>
                        </div>
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="bloodGroup">
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
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="section">
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
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="guardiansName">

                                <div className=" whitespace-nowrap">  Guardian Name</div>

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
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="guardiansOccupation">
                                <div className=" whitespace-nowrap"> Guardian Occupation</div>
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
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="guardiansPhoneNumber">
                                <div className="">Guardian Phone Number</div>
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
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="emergencyContactNumber">
                                <div className="">Emergency Contact Number</div>
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

                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="category">
                                Category
                                <select
                                    className="border rounded-md w-full py-2 px-3 text-gray-500  focus:outline-none focus:shadow-outline mt-2"
                                    id="category"
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="General">General</option>
                                    <option value="OBC">OBC</option>
                                    <option value="SC">SC</option>
                                    <option value="ST">ST</option>
                                    <option value="EWS">ST</option>

                                </select>
                            </label>
                        </div>

                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="nationality">
                                Nationality
                                <select
                                    className="border rounded-md w-full py-2 px-3 text-gray-500  focus:outline-none focus:shadow-outline mt-2"
                                    id="nationality"
                                    type="text"
                                    name="nationality"
                                    value={formData.nationality}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Nationality</option>
                                    <option value="Indian">Indian</option>
                                    <option value="Nepali">Nepali</option>
                                    <option value="Tibetian">Tibetian</option>

                                </select>
                            </label>
                        </div>
                    </div>

                </div>
                <div className=" flex gap-4 mobile:max-tablet:flex-col mobile:max-tablet:gap-2 mb-4 mobile:max-tablet:mb-0">
                    <div className="w-1/2 rounded-lg mobile:max-tablet:w-full text-lg whitespace-nowrap">
                        Add Google Drive Link for Photo
                        <label className="block text-lg mb-2 mobile:max-laptop:text-sm">
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
                    {
                        loading
                            ?
                            <Loading />
                            :
                            <label className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded mt-2 w-1/4 mobile:max-tablet:w-1/2 tablet:w-1/2 flex justify-center items-center cursor-pointer whitespace-nowrap">
                                Upload CSV
                                <input type="file" accept=".csv" className="hidden" onChange={handleUpload} />
                                <FaCloudUploadAlt className="ml-2" />
                            </label>
                    }

                </div>
            </form>
        </div>


    );
}