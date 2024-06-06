import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Upload = ({ onClose }) => {
    const { authState } = useContext(AuthContext);

    const [data, setData] = useState([
        {
            Class: '',
            start: '',
            end: '',
            break: '',
            lecture: '',
            day: '',

        },
    ]);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const Uploads = [...data];
        Uploads[index][name] = value;
        setData(Uploads);
    };







    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitted Data:', data);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-y-auto no-scrollbar">
            <ToastContainer />
            <div className="relative bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-3xl">
                <button
                    className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    ✖
                </button>
                <h2 className="text-2xl mb-4">Schedule Time Table</h2>
                <form onSubmit={handleSubmit}>

                    {data.map((value, index) => (
                        <div key={index} className="grid grid-cols-1 gap-4 mb-4">
                            <div className="grid grid-cols-3 gap-4 ">
                                <div>
                                    <label className='text-black font-medium'>Class</label>
                                    <select
                                        className="w-full border p-2"
                                        name="Class"
                                        value={value.Class}
                                        onChange={(e) => handleChange(index, e)}
                                        required
                                    >
                                        <option value="" disabled>Select Class</option>
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
                                    <label className='text-black font-medium'>Start</label>
                                    <input
                                        className="w-full border p-2"
                                        type="time"
                                        name="start"
                                        value={value.start}
                                        onChange={(e) => handleChange(index, e)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='text-black font-medium'>End</label>
                                    <input
                                        className="w-full border p-2"
                                        type="time"
                                        name="end"
                                        value={value.end}
                                        onChange={(e) => handleChange(index, e)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                <div>
                                    <label className='text-black font-medium'>Break</label>
                                    <select
                                        className="w-full border p-2"
                                        name="break"
                                        value={value.break}
                                        onChange={(e) => handleChange(index, e)}
                                        required
                                    >
                                        <option value="" disabled>Select Duration</option>
                                        <option value="30">30 min</option>
                                        <option value="35">35 min</option>
                                        <option value="40">40 min</option>
                                        <option value="45">45 min</option>
                                        <option value="50">50 min</option>
                                    </select>
                                </div>
                                <div>
                                    <label className='text-black font-medium'>Duration</label>
                                    <select
                                        className="w-full border p-2"
                                        name="duration"
                                        value={value.duration}
                                        onChange={(e) => handleChange(index, e)}
                                        required
                                    >
                                        <option value="" disabled>Select Duration</option>
                                        <option value="30">30 min</option>
                                        <option value="35">35 min</option>
                                        <option value="40">40 min</option>
                                        <option value="45">45 min</option>
                                        <option value="50">50 min</option>
                                    </select>
                                </div>
                                <div>
                                    <label className='text-black font-medium'>Day</label>
                                    <select
                                        className="w-full border p-2"
                                        name="day"
                                        value={value.day}
                                        onChange={(e) => handleChange(index, e)}
                                        required
                                    >
                                        <option value="" disabled>Select Day</option>
                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">Wednesday</option>
                                        <option value="Thursday">Thursday</option>
                                        <option value="Friday">Friday</option>
                                        <option value="Saturday">Saturday</option>
                                        <option value="Sunday">Sunday</option>
                                    </select>
                                </div>
                                <div>
                                    <label className='text-black font-medium'>Lecture</label>
                                    <select
                                        className="w-full border p-2"
                                        name="lecture"
                                        value={value.lecture}
                                        onChange={(e) => handleChange(index, e)}
                                        required
                                    >
                                        <option value="" disabled>Select Lecture</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex items-center justify-between mt-4">

                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Done
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Upload;

