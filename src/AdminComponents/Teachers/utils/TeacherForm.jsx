
import React, { useState } from "react";

export default function TeacherForm() {

    const [formData, setFormData] = useState(
        {
            firstName: '',
            lastName: '',
            gender: '',
            email: '',
            address: '',
            religion: '',
            subject: '',
            idNumber: '',
            dateOfBirth: '',
            phone: '',
            experience: '',
            education: '',
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
            subject: '',
            idNumber: '',
            dateOfBirth: '',
            phone: '',
            experience: '',
            education: '',
            photo: null,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <>
            <div className="mx-4">
                <div className="w-full flex justify-center mb-4">
                    <form onSubmit={handleSubmit} className="flex flex-col w-full px-2 mb-2 gap-4">
                        <div className="flex gap-12 mobile:max-tablet:flex-col mobile:max-tablet:gap-2">
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
                                <label className="block text-lg mb-2" htmlFor="lastName">
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
                            <div className="w-1/2 rounded-md mobile:max-tablet:w-full">
                                <label className="block text-lg mb-2" htmlFor="email">
                                    Religion
                                    <select
                                        className="border rounded-md w-full py-2 px-3 text-gray-500  focus:outline-none focus:shadow-outline mt-2"
                                        id="religion"
                                        name="gender"
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
                                <label className="block text-lg mb-2" htmlFor="firstName">
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
                                <label className="block text-lg mb-2" htmlFor="lastName">
                                    ID Number
                                    <input
                                        className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                        id="idNumber"
                                        type="text"
                                        name="idNumber"
                                        value={formData.idNumber}
                                        onChange={handleChange}
                                        placeholder=""
                                        required
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-12 mobile:max-tablet:flex-col mobile:max-tablet:gap-2">
                            <div className="w-1/2 rounded-md mobile:max-tablet:w-full">
                                <label className="block text-lg mb-2" htmlFor="firstName">
                                    Date Of Birth
                                    <input
                                        className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                        id="dob"
                                        type="text"
                                        name="dob"
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                        placeholder=""
                                        required
                                    />
                                </label>
                            </div>
                            <div className="w-1/2 rounded-md mobile:max-tablet:w-full">
                                <label className="block text-lg mb-2" htmlFor="lastName">
                                    Phone Number
                                    <input
                                        className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                        id="phoneNumber"
                                        type="text"
                                        name="phoneNumber"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder=""
                                        required
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-12 mobile:max-tablet:flex-col mobile:max-tablet:gap-2">
                            <div className="w-1/2 rounded-md mobile:max-tablet:w-full">
                                <label className="block text-lg mb-2" htmlFor="firstName">
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
                                <label className="block text-lg mb-2" htmlFor="lastName">
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
                        <div className="flex gap-4 mobile:max-tablet:flex-col mobile:max-tablet:gap-2 mb-4">
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

                    </form>
                </div>
            </div>
        </>
    )
}
