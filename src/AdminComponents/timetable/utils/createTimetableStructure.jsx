import { useEffect, useState } from "react";

export default function CreateTimetableStrucutre({ handleSubmit, handleChange }) {
    const [selectedClass, setSelectedClass] = useState('');
    useEffect(() => {
        if (selectedClass != "") {
            const e = { target: { name: "Class", value: selectedClass } };
            handleChange( e);
        }
    }, [selectedClass]);

    const [selectLectureNumber, setSelectedLectureNumber] = useState('');
    useEffect(() => {
        if (selectLectureNumber != "") {
            const e = { target: { name: "lecture", value: selectLectureNumber } };
            handleChange( e);
        }
    }, [selectLectureNumber]);

    const [selectStart, setStart] = useState('');
    useEffect(() => {
        if (selectStart != "") {
            const e = { target: { name: "start", value: selectStart } };
            handleChange( e);
        }
    }, [selectStart]);

    const [selectbefore, setbefore] = useState('');
    useEffect(() => {
        if (selectbefore != "") {
            const e = { target: { name: "before", value: selectbefore } };
            handleChange( e);
        }
    }, [selectbefore]);

    const [selectDuration, setDuration] = useState('');
    useEffect(() => {
        if (selectDuration != "") {
            const e = { target: { name: "duration", value: selectDuration } };
            handleChange( e);
        }
    }, [selectDuration]);

    const [selectbreak, setBreak] = useState('');
    useEffect(() => {
        if (selectbreak != "") {
            const e = { target: { name: "break", value: selectbreak } };
            handleChange( e);
        }
    }, [selectbreak]);
    return (
        <form onSubmit={handleSubmit} className=' mt-4 w-full p-3 rounded-lg shadow-md'>

            <div className="grid grid-cols-1 gap-4 mb-4 rounded-lg ">
                <h1 className='text-xl'>Create Structure</h1>
                <div className="grid grid-cols-3 gap-4 ">
                    <div>
                        <label className='text-black font-medium'>Class Range</label>
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
                            <option value="Pre-Nursery - U.K.J">Pre-Nursery - U.K.J</option>
                            <option value="1st-12th">1st - 12th</option>
                        </select>
                    </div>

                    <div>
                        <label className='text-black font-medium'>Starting Time</label>
                        <input
                            type="time"
                            name="start"
                            value={selectStart}
                            onChange={(e) => { setStart(e.target.value) }}
                            
                            required
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>


                    <div>
                        <label className='text-black font-medium'>Number Of Lecture</label>
                        <select
                            type="number"
                            name="lecture"
                            value={selectLectureNumber}
                            onChange={(e) => { setSelectedLectureNumber(e.target.value) }}
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
                            <option value="7">8</option>
                            <option value="7">9</option>
                            <option value="7">10</option>

                        </select>
                    </div>


                    <div>
                        <label className='text-black font-medium'>Lecture Duration</label>
                        <select
                            type="number"
                            name="duration"
                            value={selectDuration}
                            onChange={(e) => { setDuration(e.target.value) }}
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
                            value={selectbefore}
                            onChange={(e) => { setbefore(e.target.value) }}
                            required
                            className="w-full border p-2"
                        />
                    </div>


                    <div>
                        <label className='text-black font-medium'>Duration Of Lunch</label>
                        <select
                            type="number"
                            name="break"
                            value={selectbreak}
                            onChange={(e) => { setBreak(e.target.value) }}
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
            <div className="flex items-center justify-between mt-4">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Done
                </button>
            </div>
        </form>
    )
}