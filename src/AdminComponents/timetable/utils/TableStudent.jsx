import React, {useState, useContext} from 'react';
import { Link } from "react-router-dom";
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';

function TableStudent({ data, selectClass, selectedSection, dayStudent }) {
    const timetableData = data || {};
    const days = Object.keys(timetableData);
    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState({});
    const { authState } = useContext(AuthContext);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = async () => {

       

        try {
            const url = 'https://timetableapi-1wfp.onrender.com/update';
            const payload = {
                accessToken: authState.accessToken,
                class: selectClass,
                section: selectedSection,
                day: dayStudent,
                update: editedData
            };
            const response = await axios.post(url, payload);
            if (response.status === 200) {
                console.log('Update response:', response.data);
                setEditMode(false); 
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleInputChange = (day, periodId, field, value) => {
        setEditedData((prevData) => ({
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

    return (
        <div className="container">
        <div className="flex p-3 mb-4 justify-between">
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
        <div className="">
            {days.map((day) => (
                <React.Fragment key={day}>
                    <table className="w-full table-auto items-center">
                        <thead className='bg-secondary'>
                            <tr>
                                <th className="px-4 py-2">Lecture No</th>
                                <th className="px-4 py-2">Subject</th>
                                <th className="px-4 py-2">Teacher</th>
                                <th className="px-4 py-2">Employee_ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {timetableData[day].sort((a, b) => a.lectureNo - b.lectureNo).map((info) => (
                                <tr key={info._id} className='text-center'>
                                    <td className="px-4 py-2">
                                        {editMode ? (
                                            <input
                                                type="text"
                                                value={editedData[day]?.[info._id]?.lectureNo || info.lectureNo}
                                                onChange={(e) => handleInputChange(day, info._id, 'lectureNo', e.target.value)}
                                            />
                                        ) : (
                                            info.lectureNo
                                        )}
                                    </td>
                                    <td className="px-4 py-2 bg-blue-200">
                                        {editMode ? (
                                            <input
                                                type="text"
                                                value={editedData[day]?.[info._id]?.subject || info.subject}
                                                onChange={(e) => handleInputChange(day, info._id, 'subject', e.target.value)}
                                            />
                                        ) : (
                                            info.subject
                                        )}
                                    </td>
                                    <td className="px-4 py-2 flex items-center">
                                        {editMode ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={editedData[day]?.[info._id]?.teacher?.name || info.teacher?.name || ''}
                                                    onChange={(e) => handleInputChange(day, info._id, 'teacher', { ...info.teacher, name: e.target.value })}
                                                />
                                                {info.teacher?.profileLink && (
                                                    <img src={info.teacher.profileLink} alt="Teacher" className='w-8 h-8 rounded-full ml-2' />
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {info.teacher?.profileLink && (
                                                    <img src={info.teacher.profileLink} alt="Teacher" className='w-8 h-8 rounded-full' />
                                                )}
                                                <span className="px-4 py-2">{info.teacher?.name || 'Teacher information not available'}</span>
                                            </>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 bg-green-200">
                                        {editMode ? (
                                            <input
                                                type="text"
                                                value={editedData[day]?.[info._id]?.teacher?.employeeId || info.teacher?.employeeId || ''}
                                                onChange={(e) => handleInputChange(day, info._id, 'teacher', { ...info.teacher, employeeId: e.target.value })}
                                            />
                                        ) : (
                                            info.teacher?.employeeId || 'N/A'
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </React.Fragment>
            ))}
        </div>
        </div>
    );
}

export default TableStudent;
