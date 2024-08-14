import React, { useState } from 'react';
import { FaUser, FaGraduationCap, FaSchool, FaPhone, FaEnvelope, FaBirthdayCake, FaTint, FaRegIdCard } from 'react-icons/fa';

function Details({ nextStep, handleChange, formData }) {


    const handleProceed = () => {
        if (!formData.name || !formData.qualification || !formData.institute || !formData.phoneNumber || !formData.emergencyContactNumber || !formData.email || !formData.dob || !formData.bloodGroup || !formData.aadhaarNumber) {
            alert('Please fill in all fields.');
        } else {
            nextStep();
        }
    };

    return (
        <div className="rounded-lg w-full px-3 mobile:max-tablet:px-0 items-start mt-2 mb-3">
            <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md space-y-4 border">
                <h1 className="text-2xl font-normal p-2 mobile:max-tablet:text-xl">Add Employee</h1>

                <div className="flex items-center space-x-2">
                    <FaUser />
                    <input
                        type="text"
                        placeholder="Enter name"
                        className="w-full p-2 border rounded"
                        value={formData.name}
                        onChange={handleChange('name')}
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <FaGraduationCap />
                    <input
                        type="text"
                        placeholder="Highest qualification"
                        className="w-full p-2 border rounded"
                        value={formData.qualification}
                        onChange={handleChange('qualification')}
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <FaSchool />
                    <input
                        type="text"
                        placeholder="Name of institute"
                        className="w-full p-2 border rounded"
                        value={formData.institute}
                        onChange={handleChange('institute')}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center space-x-2">
                        <FaPhone />
                        <input
                            type="text"
                            placeholder="Phone number"
                            className="w-full p-2 border rounded"
                            value={formData.phoneNumber}
                            onChange={handleChange('phoneNumber')}
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaPhone />
                        <input
                            type="text"
                            placeholder="Emergency contact number"
                            className="w-full p-2 border rounded"
                            value={formData.emergencyContactNumber}
                            onChange={handleChange('emergencyContactNumber')}
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <FaEnvelope />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded"
                        value={formData.email}
                        onChange={handleChange('email')}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center space-x-2">
                        <FaBirthdayCake />
                        <input
                            type="date"
                            className="w-full p-2 border rounded"
                            value={formData.dob}
                            onChange={handleChange('dob')}
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaTint />
                        <input
                            type="text"
                            placeholder="Blood Group"
                            className="w-full p-2 border rounded"
                            value={formData.bloodGroup}
                            onChange={handleChange('bloodGroup')}
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <FaRegIdCard />
                    <input
                        type="text"
                        placeholder="Aadhar Number"
                        className="w-full p-2 border rounded"
                        value={formData.aadhaarNumber}
                        onChange={handleChange('aadhaarNumber')}
                    />
                </div>
                <button onClick={handleProceed} className="w-full bg-blue-500 text-white p-2 rounded">
                    Proceed
                </button>
            </div>
        </div>
    );
}

export default Details;
