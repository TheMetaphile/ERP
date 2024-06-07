import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Upload = () => {
    const { authState } = useContext(AuthContext);

    const [data, setData] = useState([
        {
            Class: '',
            start: '',
            end: '',
            before: '',
            lecture: '',
            break: '',
            duration: ''
        },
    ]);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const Uploads = [...data];
        Uploads[index][name] = value;
        setData(Uploads);
    };

    const convertTo12HourFormat = (time24) => {
        const [hour, minute] = time24.split(':');
        let period = 'am';
        let hour12 = parseInt(hour, 10);

        if (hour12 >= 12) {
            period = 'pm';
            if (hour12 > 12) hour12 -= 12;
        }
        if (hour12 === 0) hour12 = 12;

        return `${hour12}:${minute} ${period}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const createStructureData = {
            accessToken: authState.accessToken,
            classRange: data[0].Class,
            numberOfLecture: data[0].lecture,
            durationOfEachLeacture: data[0].duration,
            firstLectureTiming: convertTo12HourFormat(data[0].start),
            numberOfLeacturesBeforeLunch: data[0].before,
            durationOfLunch: data[0].break
        };
        console.log(createStructureData)
        try {
            const structureResponse = await axios.post('https://timetablestructureapi.onrender.com/timeTableStructure/create', { createStructureData });
            toast.success('Time table structure created successfully!');

            if (structureResponse.status === 200) {
                console.log(structureResponse, 'OK')

            }
            // Sample data for the second API
            // const uploadData = {
            //     accessToken: authState.accessToken,
            //     class: '7th', // You can replace this with dynamic values if needed
            //     section: 'A', // You can replace this with dynamic values if needed
            //     day: 'monday', // You can replace this with dynamic values if needed
            //     schedule: [
            //         {
            //             subject: 'Math', // You can replace this with dynamic values if needed
            //             teacher: 'Mr. Smith', // You can replace this with dynamic values if needed
            //             startAt: '10:30 am', // You can replace this with dynamic values if needed
            //             endAt: '11:10 am', // You can replace this with dynamic values if needed
            //             lectureNo: 1
            //         }
            //     ]
            // };

            // const uploadResponse = await axios.post('https://timetableapi-1wfp.onrender.com/timetable/upload', uploadData);
            // toast.success('Time table uploaded successfully!');

        } catch (error) {
            console.error('Error creating time table structure:', error);
            toast.error('Failed to create time table structure!');
        }

        // onClose();
    };

    const handleFetch = async (e) => {
        e.preventDefault();
        console.log(authState.accessToken)
        console.log(data[0].Class)
        try {
            const response = await axios.post('https://timetablestructureapi.onrender.com/timeTableStructure/fetch', {
                accessToken: authState.accessToken,
                classRange: data[0].Class,
            });

            if(response.status === 200){
                console.log(response)
            }

        } catch (err) {
            console.error(err);

        }
    }

    return (
        <div className=" flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar">
            <ToastContainer />

            <h1 className='text-2xl'>Schedule Time Table</h1>

            <form onSubmit={handleFetch} className='bg-slate-400 mt-4 w-full px-3 rounded-lg shadow-md'>

                {data.map((value, index) => (
                    <div key={index} className="grid grid-cols-1 gap-4 mb-4  rounded-lg ">
                        <h1 className='text-xl'>Check Structure</h1>


                        <div>
                            <label className='text-black font-medium'>Class Range</label>
                            <select
                                className="w-full border p-2"
                                name="Class"
                                value={value.Class}
                                onChange={(e) => handleChange(index, e)}
                                required
                            >
                                <option value="" disabled>Select Class</option>
                                <option value="Pre-Nursery - U.K.J">Pre-Nursery - U.K.J</option>
                                <option value="1st- 12th">1st - 12th</option>
                            </select>
                        </div>

                    </div>
                ))}

                <div className="flex items-center justify-between mt-4">

                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={handleFetch}
                    >
                        Done
                    </button>

                </div>
            </form>

            <form onSubmit={handleSubmit} className='bg-slate-400 mt-4 w-full px-3 rounded-lg shadow-md'>

                {data.map((value, index) => (
                    <div key={index} className="grid grid-cols-1 gap-4 mb-4  rounded-lg ">
                        <h1 className='text-xl'>Create Structure</h1>

                        <div className="grid grid-cols-3 gap-4 ">
                            <div>
                                <label className='text-black font-medium'>Class Range</label>
                                <select
                                    className="w-full border p-2"
                                    name="Class"
                                    value={value.Class}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                >
                                    <option value="" disabled>Select Class</option>
                                    <option value="Pre-Nursery - U.K.J">Pre-Nursery - U.K.J</option>
                                    <option value="1st- 12th">1st - 12th</option>
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
                                <label className='text-black font-medium'>Lecture Before Lunch</label>
                                <select
                                    className="w-full border p-2"
                                    name="before"
                                    value={value.before}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                >
                                    <option value="" disabled>Lecture </option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5 </option>
                                </select>

                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
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
                                    <option value="30 m">30 min</option>
                                    <option value="35 m">35 min</option>
                                    <option value="40 m">40 min</option>
                                    <option value="45 m">45 min</option>
                                    <option value="50 m">50 min</option>
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
                                    <option value="30 m">30 min</option>
                                    <option value="35 m">35 min</option>
                                    <option value="40 m">40 min</option>
                                    <option value="45 m">45 min</option>
                                    <option value="50 m">50 min</option>
                                </select>
                            </div>

                            <div>
                                <label className='text-black font-medium'>Total Lecture</label>
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

                </div>
            </form>

        </div>
    );
};

export default Upload;

