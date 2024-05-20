import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCloudUploadAlt } from "react-icons/fa";


export default function AddmissionForm() {
    const [formData, setFormData] = useState(
        {
            firstName: '',
            lastName: '',
            gender: '',
            email: '',
            address: '',
            religion: '',
            dateOfBirth: '',
            phone: '',
            photo: '',
            fatherName: '',
            motherName: '',
            BloodGroup: '',
            class: '',
            section: '',
            addmissionId: '',
            fatherOccupation: '',
            fatherPhoneNumber: '',
            motherOccupation: '',
            motherPhoneNumber: '',
            guardianName: '',
            guardianOccupation: '',
            guardianPhoneNumber: '',
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
            firstName: '',
            lastName: '',
            gender: '',
            email: '',
            address: '',
            religion: '',
            dateOfBirth: '',
            phone: '',
            photo: null,
            fatherName: '',
            motherName: '',
            BloodGroup: '',
            class: '',
            section: '',
            addmissionId: '',
            fatherOccupation: '',
            fatherPhoneNumber: '',
            motherOccupation: '',
            motherPhoneNumber: '',
            guardianName: '',
            guardianOccupation: '',
            guardianPhoneNumber: '',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <div className="rounded-lg shadow-lg mx-4 mb-4 border-gray-100 px-4">
            <div className="mt-2"><h1 className="text-2xl font-semibold px-4 mt-4">Add New Student</h1></div>
            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-8 px-2 mb-2">
                <div className="flex w-full gap-4 mobile:max-tablet:flex-col mobile:max-tablet:gap-2">
                    <div className="flex flex-col mt-8">
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="firstName">
                                First Name
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="firstName"
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
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
                            <label className="block text-lg mb-2" htmlFor="gender">
                                Address
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="address"
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                            </label>
                        </div>
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="gender">
                                Class
                                <select
                                    className="border rounded-md w-full py-2 px-3 text-gray-500  focus:outline-none focus:shadow-outline mt-2"
                                    id="class"
                                    name="class"
                                    value={formData.class}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Class</option>
                                    <option value="male">Pre-Nursery</option>
                                    <option value="female">Nursery</option>
                                    <option value="other">L.K.J</option>
                                    <option value="other">U.K.J</option>
                                    <option value="other">1st</option>
                                    <option value="other">2nd</option>
                                    <option value="other">3rd</option>
                                    <option value="other">4th</option>
                                    <option value="other">5th</option>
                                </select>
                            </label>
                        </div>
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="gender">
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
                            <label className="block text-lg mb-2" htmlFor="gender">
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
                            <label className="block text-lg mb-2" htmlFor="gender">
                                Guardian Name
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="guardianName"
                                    type="text"
                                    name="guardianName"
                                    value={formData.guardianName}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                            </label>
                        </div>

                    </div>
                    <div className="flex flex-col mt-8">
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="firstName">
                                Last Name
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="lastName"
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                            </label>
                        </div>
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="gender">
                                Phone Number
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="phone"
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                            </label>
                        </div>
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="gender">
                                Blood Group
                                <select
                                    className="border rounded-md w-full py-2 px-3 text-gray-500  focus:outline-none focus:shadow-outline mt-2"
                                    id="BloodGroup"
                                    name="BloodGroup"
                                    value={formData.BloodGroup}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Blood Group</option>
                                    <option value="">A+</option>
                                    <option value="">A-</option>
                                    <option value="">B+</option>
                                    <option value="">B-</option>
                                    <option value="">O+</option>
                                    <option value="">O-</option>

                                </select>
                            </label>
                        </div>

                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="gender">
                                Section
                                <select
                                    className="border rounded-md w-full py-2 px-3 text-gray-500  focus:outline-none focus:shadow-outline mt-2"
                                    id="Section"
                                    name="section"
                                    value={formData.section}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Section</option>
                                    <option value="">A</option>
                                    <option value="">B</option>
                                    <option value="">C</option>
                                    <option value="">D</option>
                                </select>
                            </label>
                        </div>
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="gender">
                                Father Occupation
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="fatherOccupation"
                                    type="text"
                                    name="fatherOccupation"
                                    value={formData.fatherOccupation}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                            </label>
                        </div>
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="gender">
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
                            <label className="block text-lg mb-2" htmlFor="gender">
                                Guardian Occupation
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="guardianOccupation"
                                    type="text"
                                    name="guardianOccupation"
                                    value={formData.guardianOccupation}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                            </label>
                        </div>


                    </div>

                    <div className="flex flex-col mt-8">
                        <div className="w-full rounded-md mobile:max-tablet:w-full">


                            <label className="block text-lg mb-2" htmlFor="dob">
                                Date Of Birth
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="dateOfBirth"
                                    type="text"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                            </label>
                        </div>
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="gender">
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
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="email">
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
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="gender">
                                Addmission Id
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="admissionId"
                                    type="text"
                                    name="admissionId"
                                    value={formData.addmissionId}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                            </label>
                        </div>
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="gender">
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
                            <label className="block text-lg mb-2" htmlFor="gender">
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
                        <div className="w-full rounded-md mobile:max-tablet:w-full">
                            <label className="block text-lg mb-2" htmlFor="gender">
                                Guardian Phone Number
                                <input
                                    className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                    id="guardianPhoneNumber"
                                    type="text"
                                    name="guardianPhoneNumbe"
                                    value={formData.guardianPhoneNumber}
                                    onChange={handleChange}
                                    placeholder=""
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
                                id="photo"
                                type="text"
                                name="photo"
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
                    <label className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded mt-2 w-1/4 mobile:max-tablet:w-1/2 tablet:w-1/2 flex justify-center items-center cursor-pointer">
                        Upload CSV
                        <input type="file" accept=".csv" className="hidden" />
                        <FaCloudUploadAlt className="ml-2" />
                    </label>
                </div>
            </form>
        </div>


    );
}