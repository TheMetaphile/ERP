import React, { useState } from 'react';

function NewEvent({ onClose }) {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        instruction: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSave = () => {
        console.log('Saved Data:', formData);
    };




    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-4 shadow-lg ">

                <h2 className="text-lg font-semibold mb-3 mt-3 text-black ">Event Schedule</h2>
                <div className="grid grid-cols-2 gap-4 mb-2">
                    {[
                        { label: 'Title', name: 'title' },
                        { label: 'Date', name: 'gpa' },
                        
                    ].map((field, idx) => (
                        <div key={idx}>
                            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                            {field.type === 'select' ? (
                                <select
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:ring-opacity-50"
                                >
                                    <option>Select {field.label}</option>
                                    {field.options.map((option, i) => (
                                        <option key={i} value={option}>{option}</option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={field.type || 'text'}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:ring-opacity-50"
                                />
                            )}
                        </div>
                    ))}
                </div>
                <label htmlFor="">Instructions</label>
                <textarea
                    id="exampleTextArea"
                    value={formData['instruction']}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    rows="4"
                    placeholder="Enter your text here"
                ></textarea>
                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-500"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewEvent;
