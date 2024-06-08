import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Upload = () => {
    const { authState } = useContext(AuthContext);

    const [structureData, setStructureData] = useState([
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

    const [uploadData, setUploadData] = useState([
        {
            Class: '',
            section: '',
            day: '',
            schedule: [
                {
                    subject: '',
                    teacher: '',
                    startAt: '',
                    endAt: '',
                    lectureNo: 1
                }
            ]
        }
    ]);
    const [fetchedStructure, setFetchedStructure] = useState(null);

    const handleChange = (index, e, isUpload = false) => {
        const { name, value } = e.target;
        const updatedData = isUpload ? [...uploadData] : [...structureData];
        updatedData[index][name] = value;
        isUpload ? setUploadData(updatedData) : setStructureData(updatedData);
    };

    const handleScheduleChange = (index, scheduleIndex, e) => {
        const { name, value } = e.target;
        const updatedData = [...uploadData];
        updatedData[index].schedule[scheduleIndex][name] = value;
        setUploadData(updatedData);
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
            classRange: structureData[0].Class,
            numberOfLecture: structureData[0].lecture,
            durationOfEachLeacture: structureData[0].duration,
            firstLectureTiming: convertTo12HourFormat(structureData[0].start),
            numberOfLeacturesBeforeLunch: structureData[0].before,
            durationOfLunch: structureData[0].break
        };
        // console.log(createStructureData)
        try {
            const structureResponse = await axios.post('https://timetablestructureapi.onrender.com/timeTableStructure/create', createStructureData);
            toast.success('Time table structure created successfully!');

            if (structureResponse.status === 200) {
                console.log(structureResponse, 'OK')

            }
        }
        catch (error) {
            console.error('Error creating time table structure:', error);
            toast.error('Failed to create time table structure!');
        }
    };

    const handleFetch = async (e) => {
        e.preventDefault();
        console.log(authState.accessToken)
        console.log(structureData[0].Class)
        try {
            const response = await axios.post('https://timetablestructureapi.onrender.com/timeTableStructure/fetch', {
                accessToken: authState.accessToken,
                classRange: structureData[0].Class,
            });

            if (response.status === 200) {
                setFetchedStructure(response.data);
                console.log('response from fetch',response.data)
            }

        } catch (err) {
            console.error(err);

        }
    }

    const convertToDate = (timeString) => {
        const [time, modifier] = timeString.split(' ');
        let [hours, minutes] = time.split(':');
    
        if (hours === '12') {
          hours = '0';
        }
        if (modifier === 'pm') {
          hours = parseInt(hours, 10) + 12;
        }
    
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(0);
        date.setMilliseconds(0);
    
        return date;
      };

    const calculateLectureTimes = (start, duration, beforeLunch, breakDuration, totalLectures) => {
        const times = [];
        let currentTime = convertToDate(start);

        for (let i = 1; i <= totalLectures; i++) {
            const endTime = new Date(currentTime.getTime() + duration * 60000);
            console.log('func', {currentTime,endTime})
            times.push({ start: currentTime, end: endTime });

            currentTime = endTime;

            if (i === beforeLunch) {
                currentTime = new Date(currentTime.getTime() + breakDuration * 60000);
            }
        }

        return times;
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!fetchedStructure) {
            toast.error('Please fetch the structure first!');
            return;
        }
        try {
            const { firstLectureTiming, durationOfEachLeacture, numberOfLeacturesBeforeLunch, durationOfLunch, numberOfLecture } = fetchedStructure;

            const start = firstLectureTiming;
            const duration = durationOfEachLeacture;
            const beforeLunch = numberOfLeacturesBeforeLunch;
            const breakDuration = durationOfLunch;
            const totalLectures = numberOfLecture;

            
            console.log('check', { start, duration, beforeLunch, breakDuration, totalLectures });

            const lectureTimes = calculateLectureTimes(start, duration, beforeLunch, breakDuration, totalLectures);

            console.log('Lecture Times:', lectureTimes);

            const uploadPayload = {
                accessToken: authState.accessToken,
                class: uploadData[0].Class,
                section: uploadData[0].section,
                day: uploadData[0].day,
                schedule: uploadData[0].schedule.map((scheduleItem, index) => ({
                    ...scheduleItem,
                    startAt: convertTo12HourFormat(lectureTimes[index].start.toTimeString().slice(0, 5)),
                    endAt: convertTo12HourFormat(lectureTimes[index].end.toTimeString().slice(0, 5))
                }))
            };
            console.log(uploadPayload);

            // const uploadResponse = await axios.post('https://timetableapi-1wfp.onrender.com/timetable/upload', uploadPayload);

            // if (uploadResponse.status === 200) {
            //     toast.success('Time table uploaded successfully!');
            //     console.log(uploadResponse.data);
            // }
        } catch (error) {
            console.error('Error uploading time table:', error);
            toast.error('Failed to upload time table!');
        }
    };

    const addScheduleRow = (index) => {
        const newUploadData = [...uploadData];
        newUploadData[index].schedule.push({
            subject: '',
            teacher: '',
            startAt: '',
            endAt: '',
            lectureNo: newUploadData[index].schedule.length + 1
        });
        setUploadData(newUploadData);
    };
    return (

        <div className="flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar">
            <ToastContainer />

            <h1 className='text-2xl'>Schedule Time Table</h1>

            <form onSubmit={handleFetch} className='bg-slate-400 mt-4 w-full p-3 rounded-lg shadow-md '>
                {structureData.map((value, index) => (
                    <div key={index} className="grid grid-cols-1 gap-4 mb-4 rounded-lg ">
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

            <form onSubmit={handleSubmit} className='bg-slate-400 mt-4 w-full p-3 rounded-lg shadow-md'>
                {structureData.map((value, index) => (
                    <div key={index} className="grid grid-cols-1 gap-4 mb-4 rounded-lg ">
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
                                <label className='text-black font-medium'>Starting Time</label>
                                <input
                                    type="time"
                                    name="start"
                                    value={value.start}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                    className="w-full border p-2"
                                />
                            </div>


                            <div>
                                <label className='text-black font-medium'>Number Of Lecture</label>
                                <select
                                    type="number"
                                    name="lecture"
                                    value={value.lecture}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                    className="w-full border p-2"
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


                            <div>
                                <label className='text-black font-medium'>Lecture Duration</label>
                                <select
                                    type="number"
                                    name="duration"
                                    value={value.duration}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                    className="w-full border p-2"
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
                                <label className='text-black font-medium'>No. Of Lecture Before Lunch</label>
                                <input
                                    type="number"
                                    name="before"
                                    value={value.before}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                    className="w-full border p-2"
                                />
                            </div>


                            <div>
                                <label className='text-black font-medium'>Duration Of Lunch</label>
                                <select
                                    type="number"
                                    name="break"
                                    value={value.break}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                    className="w-full border p-2"
                                >
                                    <option value="" disabled>Select Duration</option>
                                    <option value="30 m">30 min</option>
                                    <option value="35 m">35 min</option>
                                    <option value="40 m">40 min</option>
                                    <option value="45 m">45 min</option>
                                    <option value="50 m">50 min</option>
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

            <form onSubmit={handleUpload} className='bg-slate-400 mt-4 w-full p-3 rounded-lg shadow-md'>
                {uploadData.map((value, index) => (
                    <div key={index} className="grid grid-cols-1 gap-4 mb-4 rounded-lg">
                        <h1 className='text-xl'>Upload Time Table</h1>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className='text-black font-medium'>Class</label>
                                <select
                                    className="w-full border p-2"
                                    name="Class"
                                    value={value.Class}
                                    onChange={(e) => handleChange(index, e, true)}
                                    required
                                >
                                    <option value="" disabled>Select Class</option>
                                    <option value="Pre-Nursery">Pre-Nursery</option>
                                    <option value="L.K.G">L.K.G</option>
                                    <option value="U.K.G">U.K.G</option>
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
                                <label className='text-black font-medium'>Section</label>
                                <select
                                    type="text"
                                    name="section"
                                    value={value.section}
                                    onChange={(e) => handleChange(index, e, true)}
                                    required
                                    className="w-full border p-2"
                                >
                                    <option value="">Select Section</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="E">E</option>
                                    <option value="F">F</option>
                                    <option value="G">G</option>
                                    <option value="H">H</option>
                                    <option value="I">I</option>
                                </select>
                            </div>
                            <div>
                                <label className='text-black font-medium'>Day</label>
                                <select
                                    type="text"
                                    name="day"
                                    value={value.day}
                                    onChange={(e) => handleChange(index, e, true)}
                                    required
                                    className="w-full border p-2"
                                >
                                    <option value="" disabled>Select Day</option>
                                    <option value="monday">Monday</option>
                                    <option value="tuesday">Tuesday</option>
                                    <option value="wednesday">Wednesday</option>
                                    <option value="thursday">Thursday</option>
                                    <option value="friday">Friday</option>
                                    <option value="saturday">Saturday</option>
                                </select>
                            </div>
                        </div>
                        {value.schedule.map((schedule, scheduleIndex) => (
                            <div key={scheduleIndex} className="grid grid-cols-3 gap-4 mt-4">
                                <div>
                                    <label className='text-black font-medium'>Subject</label>
                                    <select
                                        type="text"
                                        name="subject"
                                        value={schedule.subject}
                                        onChange={(e) => handleScheduleChange(index, scheduleIndex, e)}
                                        required
                                        className="w-full border p-2"
                                    >
                                        <option value="" disabled>Select Subject</option>
                                        <option value="Hindi">Hindi</option>
                                        <option value="English">English</option>
                                        <option value="Maths">Maths</option>
                                        <option value="Science">Science</option>
                                        <option value="Social Science">Social Science</option>
                                        <option value="Drawing">Drawing</option>
                                        <option value="Computer">Computer</option>
                                        <option value="Sanskrit">Sanskrit</option>
                                        <option value="Physics">Physics</option>
                                        <option value="Chemistry">Chemistry</option>
                                        <option value="Economics">Economics</option>
                                        <option value="Business">Business</option>
                                        <option value="Accounts">Accounts</option>
                                    </select>
                                </div>
                                <div>
                                    <label className='text-black font-medium'>Teacher</label>
                                    <input
                                        type="text"
                                        name="teacher"
                                        value={schedule.teacher}
                                        onChange={(e) => handleScheduleChange(index, scheduleIndex, e)}
                                        required
                                        className="w-full border p-2"
                                    />
                                </div>
                                <div>
                                    <label className='text-black font-medium'>Lecture No.</label>
                                    <input
                                        type="number"
                                        name="lectureNo"
                                        value={schedule.lectureNo}
                                        onChange={(e) => handleScheduleChange(index, scheduleIndex, e)}
                                        required
                                        className="w-full border p-2"
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => addScheduleRow(index)}
                        >
                            Add Lecture
                        </button>
                    </div>
                ))}
                <div className="flex items-center justify-between mt-4">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Upload
                    </button>
                </div>
            </form>
        </div>



    );
};

export default Upload;

