import React, { useState } from 'react';
import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa';

function NewRecord({ onClose }) {
    const [name, setName] = useState('');
    const [classs, setClasss] = useState('Medical');
    const [subject, setSubject] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const handlenameChange = (event) => {
        setName(event.target.value);
    };

    const handleclasssChange = (event) => {
        setClasss(event.target.value);
    };

    const handlesubjectChange = (event) => {
        setSubject(event.target.value);
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log({ name, classs, subject });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4">Fill the Student Records</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700  mb-2" htmlFor="name">
                            Student Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={handlenameChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter student name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor='classs'>Class</label>
                        <select
                            value={classs}
                            onChange={handleclasssChange}
                            className="w-full px-3 py-2 border rounded-md"
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

                        <label className="block text-gray-700 mb-2" htmlFor='subject'>Subject</label>
                        <select
                            value={subject}
                            onChange={handlesubjectChange}
                            className="w-full px-3 py-2 border rounded-md"
                        >
                            <option value="">Select Subject</option>
                            <option value="Hindi">Hindi</option>
                            <option value="English">English</option>
                            <option value="Math">Math</option>
                            <option value="Science">Science</option>

                        </select>
                    </div>

                    <div className='flex justify-between px-3'>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checked">
                                Checked
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="checked"
                                    className="hidden"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                />
                                <span onClick={handleCheckboxChange} className="cursor-pointer">
                                    {isChecked ? (
                                        <FaRegCheckCircle className="text-green-500 text-2xl" />
                                    ) : (
                                        <FaRegCircle className="text-gray-500 text-2xl" />
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unchecked">
                                Unchecked
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="unchecked"
                                    className="hidden"
                                    checked={!isChecked}
                                    onChange={handleCheckboxChange}
                                />
                                <span onClick={handleCheckboxChange} className="cursor-pointer">
                                    {!isChecked ? (
                                        <FaRegCheckCircle className="text-red-500 text-2xl" />
                                    ) : (
                                        <FaRegCircle className="text-gray-500 text-2xl" />
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-500"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewRecord;
