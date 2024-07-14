import React from 'react';

const Preview = ({ prevStep, formData }) => {
    const {
        name,
        qualification,
        instituteName,
        phoneNumber,
        emergencyContact,
        email,
        dob,
        bloodGroup,
        department,
        role,
        inHandSalary,
        instruments,
    } = formData;

    return (
        <div className="rounded-lg w-full px-3 mobile:max-tablet:px-0 items-start mt-2 mb-3">
            <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md space-y-4 border">
                <h2 className="text-2xl font-medium p-2 mobile:max-tablet:text-xl">Preview</h2>

                <div className="space-y-4">
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Highest Qualification:</strong> {qualification}</p>
                    <p><strong>Name of Institute:</strong> {instituteName}</p>
                    <p><strong>Phone Number:</strong> {phoneNumber}</p>
                    <p><strong>Emergency Contact:</strong> {emergencyContact}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>DOB:</strong> {dob}</p>
                    <p><strong>Blood Group:</strong> {bloodGroup}</p>
                    <p><strong>Department:</strong> {department}</p>
                    <p><strong>Role:</strong> {role}</p>
                    <p><strong>In hand salary:</strong> {inHandSalary}</p>
                    <p><strong>Instruments:</strong></p>
                    <ul>
                        {instruments.map((instrument, index) => (
                            <li key={index}>
                                {instrument.title} - {instrument.amount}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex justify-between">
                    <button onClick={prevStep} className="bg-gray-500 text-white p-2 rounded">
                        Back
                    </button>
                    <button className="bg-blue-500 text-white p-2 rounded">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Preview;
