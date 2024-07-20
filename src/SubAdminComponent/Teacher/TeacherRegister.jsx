import React, { useState, useContext } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from 'axios';
import Papa from 'papaparse'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_Login } from "../../Config";
import AuthContext from '../../Context/AuthContext';

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
    return (
        <>
            <div className="mx-4 pt-20">
                <ToastContainer />
                <div className="mt-2"><h1 className="text-2xl font-semibold px-2 mt-4">Add New Teacher</h1></div>


                <div className="mt-3 w-full flex justify-center mb-4 items-center">

                    <form onSubmit={handleSubmit} className=" flex flex-col w-full px-2 mb-2 gap-4">
                        <div className="flex gap-12 mobile:max-tablet:flex-col mobile:max-tablet:gap-2">
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

                        </div>
                        <div className="flex gap-12 mobile:max-tablet:flex-col mobile:max-tablet:gap-2">
                            <div className="w-1/2 rounded-md mobile:max-tablet:w-full">
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
                            <div className="w-1/2 rounded-md mobile:max-tablet:w-full">
                                <label className="block text-lg mb-2" htmlFor="email">
                                    Email
                                    <input
                                        className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                        id="email"
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder=""
                                        required
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-12 mobile:max-tablet:flex-col mobile:max-tablet:gap-2">
                            <div className="w-1/2 rounded-md mobile:max-tablet:w-full">
                                <label className="block text-lg mb-2" htmlFor="admin">
                                    Admin
                                    <select
                                        className="border rounded-md w-full py-2 px-3 text-gray-500  focus:outline-none focus:shadow-outline mt-2"
                                        id="admin"
                                        name="admin"
                                        value={formData.admin}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select admin</option>
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </select>
                                </label>
                            </div>
                            <div className="w-1/2 rounded-md mobile:max-tablet:w-full">
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
                        </div>
                        <div className="flex gap-12 mobile:max-tablet:flex-col mobile:max-tablet:gap-2">
                            <div className="w-1/2 rounded-md mobile:max-tablet:w-full">
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
                            <div className="w-1/2 rounded-md mobile:max-tablet:w-full">
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
                                        <option value="Chrisitian">Christian</option>
                                        <option value="other">Other</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-12 mobile:max-tablet:flex-col mobile:max-tablet:gap-2">
                            <div className="w-1/2 rounded-md mobile:max-tablet:w-full">
                                <label className="block text-lg mb-2" htmlFor="subject">
                                    Subject
                                    <input
                                        className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                        id="subject"
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder=""
                                        required
                                    />
                                </label>
                            </div>
                            <div className="w-1/2 rounded-md mobile:max-tablet:w-full">
                                <label className="block text-lg mb-2" htmlFor="employeeId">
                                    ID Number
                                    <input
                                        className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                        id="employeeId"
                                        type="text"
                                        name="employeeId"
                                        value={formData.employeeId}
                                        onChange={handleChange}
                                        placeholder=""
                                        required
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-12 mobile:max-tablet:flex-col mobile:max-tablet:gap-2">
                            <div className="w-1/2 rounded-md mobile:max-tablet:w-full">
                                <label className="block text-lg mb-2" htmlFor="DOB">
                                    Date Of Birth
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
                            <div className="w-1/2 rounded-md mobile:max-tablet:w-full">
                                <label className="block text-lg mb-2" htmlFor="phoneNumber">
                                    Phone Number
                                    <input
                                        className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                        id="phoneNumber"
                                        type="text"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder=""
                                        required
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-12 mobile:max-tablet:flex-col mobile:max-tablet:gap-2">
                            <div className="w-1/2 rounded-md mobile:max-tablet:w-full">
                                <label className="block text-lg mb-2" htmlFor="experience">
                                    Experience
                                    <input
                                        className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                        id="experience"
                                        type="text"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        placeholder=""
                                        required
                                    />
                                </label>
                            </div>
                            <div className="w-1/2 rounded-md mobile:max-tablet:w-full">
                                <label className="block text-lg mb-2" htmlFor="education">
                                    Education
                                    <input
                                        className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                        id="education"
                                        type="text"
                                        name="education"
                                        value={formData.education}
                                        onChange={handleChange}
                                        placeholder=""
                                        required
                                    />
                                </label>
                            </div>

                        </div>
                        <div className="w-1/2 rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="salary">
                                Salary
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="salary"
                                    type="text"
                                    name="salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    placeholder="Per month in Rs."
                                    required
                                />
                            </label>
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
                            <div className=" w-1/2 rounded-md mobile:max-tablet:w-full">
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
                        <div className=" flex justify-center items-center">
                            <label className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded mt-2 w-1/4 mobile:max-tablet:w-1/2 tablet:w-1/2 flex justify-center items-center cursor-pointer whitespace-nowrap">
                                Upload CSV
                                <input type="file" accept=".csv" className="hidden" onChange={handleUpload} />
                                <FaCloudUploadAlt className="ml-2" />
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
