import React from "react";

const StudentCard = () => {


    const student = {
        rollNo: "101",
        class: "10th",
        dob: "28-05-2024",
        admissionDate: "28-05-2024",
        registrationNumber: "REG123456",
        address: "ABC Colony",
        academicYear: "2023-2024",
        aadharNumber: "123457132",
        personalEmail: "nisha.kapoor@gmail.com",
        emergencyContact: "123457132",
        parentDetails: {
            fatherName: "Mr. Father",
            motherName: "Mrs. Mother",
            fatherPhone: "9874561663",
            motherPhone: "9874561664",
            parentEmail: "father@gmail.com",
            fatherOccupation: "Engineer",
            motherOccupation: "Engineer",
        },
    };

    return (
        <div className="max-w-md mx-auto bg-purple-200 hover:bg-purple-300 transition-colors duration-300 rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
                <h2 className="text-xl font-bold text-purple-800">Student Details</h2>
                <p className="text-purple-600">Roll No: {student.rollNo}</p>
                <p className="text-purple-600">Class: {student.class}</p>
                <p className="text-purple-600">Date of Birth: {student.dob}</p>
                <p className="text-purple-600">Admission Date: {student.admissionDate}</p>
                <p className="text-purple-600">Registration Number: {student.registrationNumber}</p>
                <p className="text-purple-600">Permanent Address: {student.address}</p>
                <p className="text-purple-600">Academic Year: {student.academicYear}</p>
                <p className="text-purple-600">Aadhar Number: {student.aadharNumber}</p>
                <p className="text-purple-600">Personal Email: {student.personalEmail}</p>
                <p className="text-purple-600">Emergency Contact: {student.emergencyContact}</p>

                <button
                    className="mt-4 text-sm text-white bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? "Hide Parent Details" : "Show Parent Details"}
                </button>

                {isOpen && (
                    <div className="mt-4 text-purple-700">
                        <h3 className="text-lg font-bold">Parent Details</h3>
                        <p>Father Name: {student.parentDetails.fatherName}</p>
                        <p>Mother Name: {student.parentDetails.motherName}</p>
                        <p>Father Phone: {student.parentDetails.fatherPhone}</p>
                        <p>Mother Phone: {student.parentDetails.motherPhone}</p>
                        <p>Parent Email: {student.parentDetails.parentEmail}</p>
                        <p>Father's Occupation: {student.parentDetails.fatherOccupation}</p>
                        <p>Mother's Occupation: {student.parentDetails.motherOccupation}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentCard;
