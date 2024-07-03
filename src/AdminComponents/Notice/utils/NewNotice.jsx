import React, { useState, useContext } from "react";
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import Loading from './../../../LoadingScreen/Loading';
import { BASE_URL_Notice } from '../../../Config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewNotice({ setShowModal }) {
    const { authState } = useContext(AuthContext);
    const [selectedOption, setSelectedOption] = useState('For All');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [emailIds, setEmailIds] = useState('');
    const [classes, setClasses] = useState('');
    const [loading, setLoading] = useState(false);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    function getCurrentSession() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        if (currentMonth >= 3) {
            return `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
        } else {
            return `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
        }
    }
    const Session = getCurrentSession();

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const today = getCurrentDate();

    const handleSubmit = async () => {
        const payload = {
            title,
            type: selectedOption,
            description,
            session: Session,
            date: today,
        };

        if (selectedOption === 'Particular Students' || selectedOption === 'Particular Teacher') {
            payload.emailIds = emailIds.split(',').map(email => email.trim());
        } else if (selectedOption === 'Particular Class') {
            payload.classes = [{ Class: classes.split(',')[0].trim(), sections: classes.split(',').slice(1).map(section => section.trim()) }];
        }

        console.log('payload', payload);
        setLoading(true);

        try {
            const response = await axios.post(`${BASE_URL_Notice}/notice/upload/admin`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    }
                }
            );
            if (response.status === 200) {
                toast.success('Successully Posted');
                console.log('fetch', response.data);
            }
        } catch (error) {
            toast.error(error);
            console.error("Error in posting notice:", error);
        }
        finally {
            setLoading(false)
        }

    };

    const renderSpecificOptions = () => {
        switch (selectedOption) {
            case 'Particular Students':
            case 'Particular Teacher':
                return (
                    <div>
                        <textarea
                            className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2"
                            placeholder="Enter email IDs separated by commas"
                            value={emailIds}
                            onChange={(e) => setEmailIds(e.target.value)}
                        />
                    </div>
                );
            case 'Particular Class':
                return (
                    <div>
                        <textarea
                            className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2"
                            placeholder="Enter class and sections (e.g., 9th,A,B)"
                            value={classes}
                            onChange={(e) => setClasses(e.target.value)}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-bold mobile:max-tablet:font-normal mobile:max-tablet:w-1/4 mb-4">Write Notice</h2>
                <div className="flex space-x-4 mb-4">
                    <select
                        className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2"
                        value={selectedOption}
                        onChange={handleOptionChange}
                    >
                        <option value="For All">For All</option>
                        <option value="For Student">For Student</option>
                        <option value="For Teacher">For Teacher</option>
                        <option value="Particular Students">Particular Students</option>
                        <option value="Particular Class">Particular Class</option>
                        <option value="Particular Teacher">Particular Teacher</option>
                    </select>
                </div>

                <input
                    type="text"
                    className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {renderSpecificOptions()}

                <div className="flex justify-end">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={handleSubmit}
                    >
                        Send
                    </button>
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        onClick={handleCloseModal}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewNotice;
