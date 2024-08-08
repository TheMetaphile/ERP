import React, { useState, useContext } from 'react';
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';
import { MdCheck, MdCancel, MdOutlineModeEdit } from 'react-icons/md';
import { BASE_URL_Login } from '../../../Config';
import { toast } from 'react-toastify';

function CurrentWeekRow({ details, index, mapId }) {
    const { authState } = useContext(AuthContext);
    const [editMode, setEditMode] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [localUserData, setLocalUserData] = useState(details);
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');

    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const formattedYear = `${currentYear}-${nextYear.toString().slice(-2)}`;

    const handleEditToggle = (index, item) => {
        setEditMode(index);
        setEditedData(item);
    };

    const handleConfirmEdit = async (index, id) => {
        try {
            const { description, status } = editedData;
    
            // Make the API call to update the data
            const response = await axios.put(`${BASE_URL_Login}/lessonPlan/update/teacher/${formattedYear}/${mapId}/${id}`, { description, status }, {
                headers: {
                    'Authorization': `Bearer ${authState.accessToken}`,
                },
            });
    
            // Update the local data immediately
            const updatedData = { ...localUserData, description, status };
            setLocalUserData(updatedData);
            setDescription(description);
            setStatus(status);
            toast.success('Status saved');
            setEditMode(null);
            setEditedData({});
        } catch (error) {
            console.error('Error updating student data:', error);
            toast.error('Error while saving status');
        }
    };

    const handleCancelEdit = () => {
        setEditMode(null);
        setEditedData({});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <tr key={index}>
            <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                {details.date}
            </td>

            <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                {details.chapter}
            </td>
            <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                {details.topic}
            </td>
            <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                {details.teachingAids}
            </td>
            <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                {details.Activity}
            </td>
            <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                {editMode === index ? (
                    <>
                        <input
                            type="text"
                            name="description"
                            value={editedData.description || ''}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-lg p-2"
                            placeholder="Description"
                        />
                        <select
                            name="status"
                            value={editedData.status || ''}
                            onChange={handleInputChange}
                            className="p-2 border border-gray-300 rounded-md ml-2"
                        >
                            <option value="">Select status</option>
                            <option value="On Time">On Time</option>
                            <option value="Lagging">Lagging</option>
                        </select>
                        <button
                            className="bg-green-400 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-md ml-2"
                            onClick={() => handleConfirmEdit(index, details._id)}
                        >
                            <MdCheck />
                        </button>
                        <button
                            className="bg-gray-400 hover:bg-gray-700 text-white px-3 py-1 rounded-lg shadow-md ml-2"
                            onClick={handleCancelEdit}
                        >
                            <MdCancel />
                        </button>
                    </>
                ) : (
                    <div className='flex items-center gap-2'>
                        {details.description ? (
                            <>  {details.description}, {details.status}</>
                        ) : (
                            <>{description}  {status}</>
                        )}
                        <button
                            className="bg-blue-400 hover:bg-blue-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center"
                            onClick={() => handleEditToggle(index, details)}
                        >
                            <MdOutlineModeEdit />
                        </button>
                   

                    </div>
                )}
            </td>
        </tr>
    );
}

export default CurrentWeekRow;
