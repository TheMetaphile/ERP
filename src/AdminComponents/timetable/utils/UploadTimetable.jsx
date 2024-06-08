import React, { useState, useEffect } from 'react';
import TimetableHeader from './timetableHeader';
import TimetableRow from './Timetablerow';

export default function UploadTimetable({ fetchedTimeTableStructure, handleUpload,handleChange }) {
    const [lectureTimes, setLectureTimes] = useState([]);

    // useEffect(() => {
    //     console.log('UploadTimetable - fetchedTimeTableStructure:', fetchedTimeTableStructure);
    // }, []);

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
        //date.setMilliseconds(0);

        return date;
    };

    const calculateLectureTimes = () => {
        const { firstLectureTiming, durationOfEachLeacture, numberOfLeacturesBeforeLunch, durationOfLunch, numberOfLecture } = fetchedTimeTableStructure;

        const times = [];
        let currentTime = convertToDate(firstLectureTiming);
        const lectureDuration = parseInt(durationOfEachLeacture.split(' ')[0], 10);
        const lunchDuration = parseInt(durationOfLunch.split(' ')[0], 10);

        for (let i = 1; i <= numberOfLecture; i++) {
            const endTime = new Date(currentTime.getTime() + lectureDuration * 60000);
            times.push({ start: new Date(currentTime), end: new Date(endTime) });

            currentTime = endTime;

            if (i === numberOfLeacturesBeforeLunch) {
                currentTime = new Date(currentTime.getTime() + lunchDuration * 60000);
            }
        }

        setLectureTimes(times);
    };

    useEffect(() => {
        calculateLectureTimes();
    }, [fetchedTimeTableStructure]);

    const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const strMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${strMinutes} ${ampm}`;
    };
    const [selectedClass, setSelectedClass] = useState('');
    useEffect(() => {
        if (selectedClass != "") {
            const e = { target: { name: "Class", value: selectedClass } };
            handleChange(0, e);
        }
    }, [selectedClass]);


    const [selectedSection, setSection] = useState('');
    useEffect(() => {
        if (selectedSection != "") {
            const e = { target: { name: "section", value: selectedSection } };
            handleChange(0, e);
        }
    }, [selectedSection]);

    const [selectedDay, setDay] = useState('');
    useEffect(() => {
        if (selectedDay != "") {
            const e = { target: { name: "section", value: selectedDay } };
            handleChange(0, e);
        }
    }, [selectedDay]);


    return (
        <form onSubmit={handleUpload} className='bg-slate-400 mt-4 w-full p-3 rounded-lg shadow-md'>
            {/* {uploadTimetableData.map((value, index) => ( */}
            <div className=" mb-4 rounded-lg">
                <h1 className='text-xl'>Upload Time Table</h1>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className='text-black font-medium'>Class</label>
                        <select
                            className="w-full border p-2"
                            name="Class"
                            value={selectedClass}
                            onChange={(e) => {
                                setSelectedClass(e.target.value)

                            }}
                            required
                        >
                            <option value="" disabled>Select Class</option>
                            <option value="Pre-Nursery" >Pre-Nursery</option>
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
                            value={selectedSection}
                            onChange={(e) => {setSection(e.target.value)}}
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
                            value={selectedDay}
                            onChange={(e) => {setDay(e.target.value)}}
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
                <TimetableHeader />

                {lectureTimes.map((time, index) => (
                    <TimetableRow  index={index} Subject={"subject"} lectureNo={`${index + 1} `} Time={`${formatTime(time.start)}-${formatTime(time.end)}`} Teacher={"teacher"} />
                ))}

            </div>
            <div className="flex items-center justify-between mt-4">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Upload
                </button>
            </div>
        </form>
    )
}

//select subject

{/* <div>
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
</div> */}



//select teacher
{/* <div>
                                    <label className='text-black font-medium'>Teacher</label>
                                    <input
                                        type="text"
                                        name="teacher"
                                        value={schedule.teacher}
                                        onChange={(e) => handleScheduleChange(index, scheduleIndex, e)}
                                        required
                                        className="w-full border p-2"
                                    />
                                </div> */}