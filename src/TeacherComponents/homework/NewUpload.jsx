import React, { useState } from 'react';
import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa';

function NewUpload({ onClose }) {
    const [file, setFile] = useState(null);
    const [subject, setSubject] = useState('');
    const [classLevel, setClassLevel] = useState('');
    const [topic, setTopic] = useState('');
    const [question, setQuestion] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSave = () => {
        // Implement save functionality here
        console.log({ file, subject, classLevel, topic, question });
    };



    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-4 shadow-lg ">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Upload File</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 border rounded-md mt-2"
                    />
                </div>

                <div className='flex justify-between'>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Select Class</label>
                        <select
                            value={classLevel}
                            onChange={(e) => setClassLevel(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md mt-2"
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
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Select Subject</label>
                        <select
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md mt-2"
                        >
                            <option value="">Select Subject</option>
                            <option value="Hindi">Hindi</option>
                            <option value="English">English</option>
                            <option value="Math">Math</option>
                            <option value="Science">Science</option>
                        </select>
                    </div>
                </div>

                <div className='mt-3'>
                    <label className="block text-sm font-medium text-gray-700">Topic</label>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="mt-2 w-full px-3 py-2 border rounded-md"
                    />
                </div>

                <div className='mt-3'>
                    <label className="block text-sm font-medium text-gray-700">Question</label>
                    <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="mt-2 w-full px-3 py-2 border rounded-md" 
                        rows="4"
                    ></textarea>
                </div>

                <div className="flex justify-end mt-2">
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
            </div>
        </div>

    );
}

export default NewUpload;
