import React, { useState, useContext } from 'react';
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';
import { MdCheck, MdCancel, MdOutlineModeEdit } from 'react-icons/md';
import { BASE_URL_ClassTeacher } from '../../../Config';
import { toast } from 'react-toastify';

export default function StudentDetailTile({ userData, Class }) {
    const [editMode, setEditMode] = useState(null);
    const [selectedSection, setSelectedSection] = useState('');
    const { authState } = useContext(AuthContext);

    const handleEditToggle = (index, item) => {
        setEditMode(index);
        setSelectedSection(item.section);
    };

    const handleConfirmEdit = async (index, id) => {
        console.log(selectedSection.toUpperCase());

        try {
            const response = await axios.put(`${BASE_URL_ClassTeacher}/newStudents/section?id=${id}&section=${selectedSection.toUpperCase()}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                }
            );

            console.log("API response:", response.data);
            toast.success('Section Assigned Succesfully');
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.error);
        }

    };

    const handleCancelEdit = () => {
        setEditMode(null);
        setSelectedSection('');
    };

    return (
        <div className="w-full">
            {userData.map((user, index) => (
                <div key={index} className="flex text-center mobile:max-tablet:gap-2 items-center justify-evenly border rounded-lg py-2 pl-2 mb-2 tablet:max-laptop:w-fit">
                    <div className="w-40 flex justify-center">
                        <img src={user.profileLink} alt="" className="h-8 w-8 rounded-full" />
                        <h1 className="text-base w-32">{user.name}</h1>
                    </div>
                    <h1 className="text-base w-40">{Class}</h1>
                    <h1 className="text-base w-40">{user.gender}</h1>
                    <h1 className="text-base w-40">{user.percentage}</h1>
                    <h1 className="text-base w-40">{user.fatherPhoneNumber}</h1>
                    <h1 className="text-base w-52">{user.email}</h1>
                    <h1 className="text-base w-52 flex justify-center items-center">
                        {editMode === index ? (
                            <>
                                <input
                                    className="p-2 border border-gray-300 rounded-md ml-2"
                                    id="section"
                                    type="text"
                                    value={selectedSection}
                                    onChange={(e) => setSelectedSection(e.target.value)}
                                    placeholder="Enter Section"
                                />

                                <button
                                    className="bg-green-400 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-md ml-2"
                                    onClick={() => handleConfirmEdit(index, user._id)}
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
                            <div className='flex justify-center items-center'>
                                <button
                                    className="bg-blue-400 hover:bg-blue-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center"
                                    onClick={() => handleEditToggle(index, user)}
                                >
                                    <MdOutlineModeEdit />
                                </button>
                            </div>
                        )}
                    </h1>

                </div>
            ))}
        </div>
    );
}
