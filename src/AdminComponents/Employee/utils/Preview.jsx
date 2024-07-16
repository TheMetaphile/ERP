import React, { useState } from 'react';
import axios from 'axios';
import Loading from '../../../LoadingScreen/Loading';
import { toast } from 'react-toastify';
import { BASE_URL_Login } from '../../../Config';

const Preview = ({ prevStep, formData }) => {
    const [loading, setLoading] = useState(false);

    const {
        name,
        qualification,
        institute,
        phoneNumber,
        emergencyContactNumber,
        email,
        dob,
        bloodGroup,
        aadhaarNumber,
        permanentAddress,
        permanentState,
        permanentDistrict,
        permanentPincode,
        residentialAddress,
        residentialState,
        residentialDistrict,
        residentialPincode,
        department,
        role,
        // instruments,
    } = formData;

    const handleConfirm = async () => {
        if (
            !name || !qualification || !institute || !phoneNumber ||
            !emergencyContactNumber || !email || !dob || !bloodGroup ||
            !aadhaarNumber || !permanentAddress || !permanentState ||
            !permanentDistrict || !permanentPincode || !residentialAddress ||
            !residentialState || !residentialDistrict || !residentialPincode ||
            !department || !role
        ) {
            alert('Please fill all fields.');
            return;
        }

        const payload = {
            name,
            qualification,
            institute,
            phoneNumber,
            emergencyContactNumber,
            email,
            dob,
            bloodGroup,
            aadhaarNumber,
            permanentAddress,
            permanentState,
            permanentDistrict,
            permanentPincode,
            residentialAddress,
            residentialState,
            residentialDistrict,
            residentialPincode,
            department,
            role,
        };
        setLoading(true);
        console.log(payload)
        try {
            const response = await axios.post(`${BASE_URL_Login}/signup/SubAdmin`, payload);
            if (response.status === 200) {
                toast.success('Sub Admin registered successfully!');
                console.log(response.data)

            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.error || 'An error occurred';
            toast.error(errorMessage);
        }
        finally {
            setLoading(false);

        }
    };

    return (
        <div className="rounded-lg w-full px-3 mobile:max-tablet:px-0 items-start mt-2 mb-3">
            <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md space-y-4 border">
                <h2 className="text-2xl font-normal p-2 mobile:max-tablet:text-xl">Preview</h2>

                <div className="space-y-4">
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Highest Qualification:</strong> {qualification}</p>
                    <p><strong>Name of Institute:</strong> {institute}</p>
                    <p><strong>Phone Number:</strong> {phoneNumber}</p>
                    <p><strong>Emergency Contact:</strong> {emergencyContactNumber}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>DOB:</strong> {dob}</p>
                    <p><strong>Blood Group:</strong> {bloodGroup}</p>
                    <p><strong>Aadhar Number:</strong> {aadhaarNumber}</p>
                    <p><strong>Permanent Address:</strong> {permanentAddress}</p>
                    <p><strong>Permanent State:</strong> {permanentState}</p>
                    <p><strong>Permanent District:</strong> {permanentDistrict}</p>
                    <p><strong>Permanent Pincode:</strong> {permanentPincode}</p>
                    <p><strong>Residential Address:</strong> {residentialAddress}</p>
                    <p><strong>Residential State:</strong> {residentialState}</p>
                    <p><strong>Residential District:</strong> {residentialDistrict}</p>
                    <p><strong>Residential Pincode:</strong> {residentialPincode}</p>
                    <p><strong>Department:</strong> {department}</p>
                    <p><strong>Role:</strong> {role}</p>
                    {/* <p><strong>In hand salary:</strong> {inHandSalary}</p> */}
                    {/* <p><strong>Instruments:</strong></p>
                    <ul>
                        {instruments.map((instrument, index) => (
                            <li key={index}>
                                {instrument.title} - {instrument.amount}
                            </li>
                        ))}
                    </ul> */}
                </div>

                <div className="flex justify-between">
                    <button onClick={prevStep} className="bg-gray-500 text-white p-2 rounded">
                        Back
                    </button>
                    <button onClick={handleConfirm} className="bg-blue-500 text-white p-2 rounded">
                        {loading ? <Loading /> : 'Confirm'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Preview;
