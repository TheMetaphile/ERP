import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';
import TimetableHeader from './timetableHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_TimeTable } from '../../../Config';

function TableStudent({ data, selectClass, selectedSection, dayStudent, numberOfLeacturesBeforeLunch, Time }) {
    const timetableData = data || {};
    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState({});
    const { authState } = useContext(AuthContext);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleCancelClick = () => {
        setEditMode(false);
    };

    console.log('ttt', Time)
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
            const url = `${BASE_URL_TimeTable}/timetable/update`;
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
        } finally {
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

    const handleOptionalSubjectChange = (day, lectureId, value) => {
        const selectedSubject = lectures.find(lecture => lecture._id === lectureId)
            .optionalSubjects.find(opt => opt.optionalSubject === value);

        setEditedData(prevData => ({
            ...prevData,
            [day]: {
                ...(prevData[day] || {}),
                [lectureId]: {
                    ...(prevData[day]?.[lectureId] || {}),
                    selectedOptional: value,
                    subject: value,
                    teacher: selectedSubject?.teacher?.name || ''
                }
            }
        }));
    };

    const lectures = timetableData[dayStudent] || [];
    console.log(lectures, "isaut ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    return (
        <div className="w-full rounded-lg border shadow-md">
            {/* <ToastContainer /> */}
            <div className="flex p-3 mb-4 justify-between w-full mobile:max-tablet:mb-0">
                <Link
                    to="/Admin-Dashboard/timetable/upload"
                    className="px-4 py-2 rounded-md mr-2 bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
                >
                    Upload
                </Link>
                {editMode ? (
                    <>
                        <button
                            onClick={handleSaveClick}
                            className="px-4 py-2 rounded-md bg-green-200 text-gray-800 hover:bg-green-500 hover:text-white"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancelClick}
                            className="px-4 py-2 rounded-md bg-red-200 text-gray-800 hover:bg-red-500 hover:text-white"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={handleEditClick}
                        className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
                    >
                        Edit
                    </button>
                )}
            </div>
            <div className='overflow-auto w-full'>
                <TimetableHeader />
                {lectures.length === 0 ? (
                    <div className='text-center'>No data available</div>
                ) : (
                    <div className='shadow-md whitespace-nowrap'>
                        {lectures.map((lecture, idx) => (
                            <React.Fragment key={lecture._id}>
                                {numberOfLeacturesBeforeLunch === lecture.lectureNo - 1 ? (
                                    <div className="w-full mobile:max-tablet:w-fit h-8 border-t border-gray-400 bg-secondary text-xl text-center">
                                        LUNCH
                                    </div>
                                ) : null}
                                {
                                    lecture?.optionalSubjects?.length > 0 ? (

                                        lecture.optionalSubjects.map((optSub, index) => (
                                            <div className="flex mobile:max-tablet:w-fit justify-between border-t border-gray-400">
                                                <h1 className="w-full mobile:max-tablet:w-40 border-r border-gray-400 px-4 py-2 text-center">
                                                    {editMode ? (
                                                        <input
                                                            type="text"
                                                            value={editedData[dayStudent]?.[lecture._id]?.lectureNo || lecture.lectureNo}
                                                            onChange={(e) => handleInputChange(dayStudent, lecture._id, 'lectureNo', e.target.value)}
                                                            className='border border-gray-300'
                                                        />
                                                    ) : (
                                                        lecture.lectureNo
                                                    )}
                                                </h1>
                                                <h1 className="w-full mobile:max-tablet:w-40 border-r border-gray-400 px-4 py-2 text-center bg-green-200">
                                                    {`${formatTime(Time[lecture.lectureNo - 1].start)}-${formatTime(Time[lecture.lectureNo - 1].end)}`}
                                                </h1>
                                                <h1 className="w-full mobile:max-tablet:w-40 border-r border-gray-400 px-4 py-2 text-center bg-green-200">
                                                    {editMode ? (
                                                        <input
                                                            type="text"
                                                            value={editedData[dayStudent]?.[lecture._id]?.subject || lecture.subject}
                                                            onChange={(e) => handleInputChange(dayStudent, lecture._id, 'subject', e.target.value)}
                                                            className='border border-gray-300'
                                                        />
                                                    ) : (

                                                        <div>{optSub.optionalSubject}, {optSub.mergeWithSection} </div>


                                                    )}
                                                </h1>
                                                <div className='w-full mobile:max-tablet:w-40 border-r border-gray-400 flex items-center whitespace-nowrap px-4 py-2 bg-blue-200'>
                                                    {lecture.teacher?.profileLink && (
                                                        <img src={lecture.teacher.profileLink} alt={lecture.teacher.name} className="w-8 h-8 rounded-full" />
                                                    )}
                                                    {editMode ? (
                                                        <input
                                                            type="text"
                                                            value={editedData[dayStudent]?.[lecture._id]?.teacher || lecture.teacher?.name || ''}
                                                            onChange={(e) => handleInputChange(dayStudent, lecture._id, 'teacher', e.target.value)}
                                                            className='border border-gray-300'
                                                        />
                                                    ) : (

                                                        <div className=" flex items-center">
                                                            {optSub.teacher?.name && (
                                                                <img
                                                                    src={optSub.teacher.profileLink}
                                                                    alt={optSub.teacher.name}
                                                                    className="w-8 h-8 rounded-full"
                                                                />
                                                            )}
                                                            {optSub.teacher?.name}
                                                        </div>


                                                    )}
                                                </div>
                                                <div className='w-full mobile:max-tablet:w-40 border-r border-gray-400 px-4 py-2 text-center bg-blue-200'>

                                                </div>
                                            </div>
                                        ))

                                    ) : (
                                        <div className="flex mobile:max-tablet:w-fit justify-between border-t border-gray-400">
                                            <h1 className="w-full mobile:max-tablet:w-40 border-r border-gray-400 px-4 py-2 text-center">
                                                {editMode ? (
                                                    <input
                                                        type="text"
                                                        value={editedData[dayStudent]?.[lecture._id]?.lectureNo || lecture.lectureNo}
                                                        onChange={(e) => handleInputChange(dayStudent, lecture._id, 'lectureNo', e.target.value)}
                                                        className='border border-gray-300'
                                                    />
                                                ) : (
                                                    lecture.lectureNo
                                                )}
                                            </h1>
                                            <h1 className="w-full mobile:max-tablet:w-40 border-r border-gray-400 px-4 py-2 text-center bg-green-200">
                                                {`${formatTime(Time[lecture.lectureNo - 1].start)}-${formatTime(Time[lecture.lectureNo - 1].end)}`}
                                            </h1>
                                            <h1 className="w-full mobile:max-tablet:w-40 border-r border-gray-400 px-4 py-2 text-center bg-green-200">
                                                {editMode ? (
                                                    <input
                                                        type="text"
                                                        value={editedData[dayStudent]?.[lecture._id]?.subject || lecture.subject}
                                                        onChange={(e) => handleInputChange(dayStudent, lecture._id, 'subject', e.target.value)}
                                                        className='border border-gray-300'
                                                    />
                                                ) : (
                                                    lecture.subject
                                                )}
                                            </h1>
                                            <div className='w-full mobile:max-tablet:w-40 border-r border-gray-400 flex items-center whitespace-nowrap px-4 py-2 bg-blue-200'>
                                                {lecture.teacher?.profileLink && (
                                                    <img src={lecture.teacher.profileLink} alt={lecture.teacher.name} className="w-8 h-8 rounded-full" />
                                                )}
                                                {editMode ? (
                                                    <input
                                                        type="text"
                                                        value={editedData[dayStudent]?.[lecture._id]?.teacher || lecture.teacher?.name || ''}
                                                        onChange={(e) => handleInputChange(dayStudent, lecture._id, 'teacher', e.target.value)}
                                                        className='border border-gray-300'
                                                    />
                                                ) : (
                                                    lecture.teacher.name
                                                )}
                                            </div>
                                            <div className='w-full mobile:max-tablet:w-40 border-r border-gray-400 px-4 py-2 text-center bg-blue-200'>

                                            </div>
                                        </div>
                                    )
                                }

                            </React.Fragment>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TableStudent;
