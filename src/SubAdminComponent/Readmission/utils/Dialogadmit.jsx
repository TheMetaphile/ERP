import React, { useState } from 'react';
import AdmissionInputs from './AdmissionInputs';

const ReadmissionDialog = ({ isOpen, onClose, onSave, user }) => {
    if (!isOpen) return null;

    const [streams, setStreams] = useState(['']); // Initialize with one empty input field

    const handleAddStream = () => {
        setStreams([...streams, '']); // Add a new empty field
    };

    const handleStreamChange = (index, value) => {
        const updatedStreams = streams.map((stream, i) => (i === index ? value : stream));
        setStreams(updatedStreams);
    };

    const handleRemoveStream = (index) => {
        const updatedStreams = streams.filter((_, i) => i !== index);
        setStreams(updatedStreams);
    };

    const handleSave = () => {
        onSave(user.email, streams);
        onClose();
    };
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'photo' ? files[0] : value,
        }));
    };
    const [formData, setFormData] = useState(
        {
            stream: '',
            stream: '',
            physics: '',
            chemistry: '',
            maths: '',
            biology: '',
            accountancy: '',
            businessStudies: '',
            economics: '',
            history: '',
            politicalScience: '',
            geography: '',
            subject4: '',
            optionalSubject: '',
        }
    );
    const handleSubject = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-5 ">
            <div className="flex flex-col rounded bg-white tablet:w-fit tablet:px-5 mobile:w-full mobile:px- mobile:max-tablet:mt-10 justify-center mobile:max-tablet:mx-1">
                <div className=" p-4 rounded w-auto">
                    <h3 className="text-lg font-bold mb-2">Readmission</h3>
                    <div>
                        {user.name}
                    </div>
                    <div className="w-full rounded-md mobile:max-tablet:w-auto mb-2">
                        <label className="block text-start mx-2 text-lg mobile:max-laptop:text-sm" htmlFor="stream">
                            Select Stream
                        </label>
                        <select
                            className="border rounded-md w-full py-2 px-3 text-gray-500  focus:outline-none focus:shadow-outline mt-2"
                            id="stream"
                            type="text"
                            name="stream"
                            value={formData.stream}
                            onChange={handleSubject}
                            required
                        >
                            <option value="">Select Stream</option>
                            <option value="PCM">PCM</option>
                            <option value="PCB">PCB</option>
                            <option value="PCMB">PCMB</option>
                            <option value="Commerce">Commerce</option>
                            <option value="Arts">Arts</option>

                        </select>
                    </div>
                    <div className="">
                        <AdmissionInputs stream={formData.stream} formData={formData} handleChange={handleChange} />
                    </div>

                </div>

                <div className="flex justify-end p-2">
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                        Save
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-3 py-1 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReadmissionDialog;
