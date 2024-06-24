import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';
import TimetableHeader from './timetableHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TableStudent({ data, selectClass, selectedSection, dayStudent, numberOfLeacturesBeforeLunch, Time }) {
    const timetableData = data || {};
    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState({});
    const { authState } = useContext(AuthContext);

    const handleEditClick = () => {
        setEditMode(true);
    };
console.log('ttt',Time)
    const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const strMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${strMinutes} ${ampm}`;
    };

    const handleSaveClick = async () => {
        try {
            const url = 'https://timetableapi-1wfp.onrender.com/timetable/update';
            const updatedPeriodId = Object.keys(editedData[dayStudent])[0];
            const payload = {
                accessToken: authState.accessToken,
                class: selectClass,
                section: selectedSection,
                day: dayStudent,
                update: editedData[dayStudent][updatedPeriodId],
                periodId: updatedPeriodId
            };
            console.log(payload)
            const response = await axios.post(url, payload);
            if (response.status === 200) {
                toast.success('Updated Successfully')
                console.log('Update response:', response.data);
                setEditMode(false);
            }
        } catch (error) {
            toast.error(error)
            console.error('Error updating data:', error);
        }finally{
            setEditMode(false);
        }
    };

    const handleInputChange = (day, periodId, field, value) => {
        setEditedData(prevData => ({
            ...prevData,
            [day]: {
                ...prevData[day],
                [periodId]: {
                    ...prevData[day]?.[periodId],
                    [field]: value
                }
            }
        }));
    };

    const lectures = timetableData[dayStudent] || [];

    return (
        <div className="w-full rounded-lg border shadow-md">
            {/* <ToastContainer /> */}
            <div className="flex p-3 mb-4 justify-between w-full">
                <Link
                    to="/Admin-Dashboard/timetablestructure"
                    className="px-4 py-2 rounded-md mr-2 bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
                >
                    Upload
                </Link>
                {editMode ? (
                    <button
                        onClick={handleSaveClick}
                        className="px-4 py-2 rounded-md bg-green-200 text-gray-800 hover:bg-green-500 hover:text-white"
                    >
                        Save
                    </button>
                ) : (
                    <button
                        onClick={handleEditClick}
                        className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
                    >
                        Edit
                    </button>
                )}
            </div>
            <TimetableHeader />
            {lectures.length === 0 ? (
                <div className='text-center'>No data available</div>
            ) :
                (
                    <div>
                        {lectures.map((lecture, idx) => (
                            <React.Fragment key={lecture._id}>
                                {numberOfLeacturesBeforeLunch === lecture.lectureNo-1  ? (
                                    <div className="w-full h-8 bg-secondary text-xl text-center border">LUNCH</div>
                                ) : null}
                                <div className="flex w-full justify-between px-4 py-2 mb-2 mt-2">
                                    <div className="w-full flex items-center justify-between">
                                        <h1 className="w-1/4 ">
                                            {editMode ? (
                                                <input
                                                    type="text"
                                                    value={editedData[dayStudent]?.[lecture._id]?.lectureNo || lecture.lectureNo}
                                                    onChange={(e) => handleInputChange(dayStudent, lecture._id, 'lectureNo', e.target.value)}
                                                    className='border px-3 border-gray-300'
                                                />
                                            ) : (
                                                lecture.lectureNo
                                            )}
                                        </h1>
                                        <h1 className="w-1/4">{`${formatTime(Time[lecture.lectureNo-1].start)}-${formatTime(Time[lecture.lectureNo-1].end)}`}</h1>

                                        <h1 className="w-1/4 ">
                                            {editMode ? (
                                                <input
                                                    type="text"
                                                    value={editedData[dayStudent]?.[lecture._id]?.subject || lecture.subject}
                                                    onChange={(e) => handleInputChange(dayStudent, lecture._id, 'subject', e.target.value)}
                                                    className='border border-gray-300 px-3'
                                                />
                                            ) : (
                                                lecture.subject
                                            )}
                                        </h1>
                                        <div className="w-1/4 flex items-center whitespace-nowrap">
                                            {lecture.teacher?.profileLink && (
                                                <img src={lecture.teacher.profileLink} alt={lecture.teacher.name} className="w-8 h-8 rounded-full" />
                                            )}
                                            {editMode ? (
                                                <input
                                                    type="text"
                                                    value={editedData[dayStudent]?.[lecture._id]?.teacher || lecture.teacher?.name || ''}
                                                    onChange={(e) => handleInputChange(dayStudent, lecture._id, 'teacher', e.target.value)}
                                                    className='border border-gray-300 px-3'
                                                />
                                            ) : (
                                                <p className="text-sm px-2">{lecture.teacher?.name || 'Teacher information not available'}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                )}

        </div>
    );
}

export default TableStudent;
