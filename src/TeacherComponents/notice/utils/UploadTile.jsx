import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL_Notice } from '../../../Config';
import Logo from '../../../assets/metaphile_logo.png';
import { MdEdit, MdCheck, MdCancel, MdDeleteForever } from 'react-icons/md';
import { toast } from "react-toastify";

export default function UploadTile({ details }) {
    const { authState } = useContext(AuthContext);
    const [newDetails, setDetails] = useState(details);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedNotice, setEditedNotice] = useState({});

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditedNotice({ ...newDetails[index] });
    };

    function getCurrentSession() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        if (currentMonth >= 3) {
            return `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
        } else {
            return `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
        }
    }
    const session = getCurrentSession();

    const handleSave = async (index) => {
        try {
            const response = await axios.put(`${BASE_URL_Notice}/notice/update?noticeId=${details[index]._id}&session=${session}`, editedNotice, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            console.log("API response after update:", response.data);
            toast.success('Updated Successfully');
            newDetails[index] = editedNotice;
            setEditingIndex(null);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCancel = () => {
        setEditingIndex(null);
    };

    const handleDelete = async (index) => {
        try {
            await axios.delete(`${BASE_URL_Notice}/notice/delete?id=${details[index]._id}&session=${session}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            toast.success('Deleted Successfully');
            const newDetail = details.filter((_, i) => i !== index);
            setDetails(newDetail);
        } catch (err) {
            console.log(err);
        }
    };

    const handleInputChange = (e, field) => {
        setEditedNotice({ ...editedNotice, [field]: e.target.value });
    };

    return (
        <div className="w-full">
            {newDetails.map((detail, index) => (
                <div key={index} className='p-2 border justify-between rounded-lg shadow-md mt-3 flex items-center'>
                    <div className='flex items-center w-full'>
                        <img src={Logo} alt="" className='h-12' />
                        <div className='px-2 w-full'>
                            <div className="flex items-center w-full justify-between">
                                <div className="pl-2 mt-1 font-normal text-sm">
                                    <span className='font-medium'>Title :</span>
                                    {editingIndex === index ? (
                                        <input
                                            type="text"
                                            value={editedNotice.title}
                                            onChange={(e) => handleInputChange(e, 'title')}
                                            className="border rounded p-1"
                                        />
                                    ) : (
                                        detail.title
                                    )}
                                </div>
                                <div className="flex">
                                    {editingIndex === index ? (
                                        <>
                                            <button
                                                className="bg-green-400 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-md"
                                                onClick={() => handleSave(index)}
                                            >
                                                <MdCheck />
                                            </button>
                                            <button
                                                className="bg-red-400 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-md ml-2"
                                                onClick={handleCancel}
                                            >
                                                <MdCancel />
                                            </button>

                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="bg-blue-400 hover:bg-blue-700 text-white px-3 py-1 rounded-lg shadow-md ml-2"
                                                onClick={() => handleEdit(index)}
                                            >
                                                <MdEdit />
                                            </button>

                                            <button
                                                className="bg-red-400 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-md ml-2"
                                                onClick={() => handleDelete(index)}
                                            >
                                                <MdDeleteForever />
                                            </button>

                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="pl-2 mt-1 font-normal text-sm w-full h-full">
                                <span className='font-medium'>Description :</span>
                                {editingIndex === index ? (
                                    <textarea
                                        type="text"
                                        value={editedNotice.description}
                                        onChange={(e) => handleInputChange(e, 'description')}
                                        className="border rounded p-1 w-full h-full"
                                    />
                                ) : (
                                    detail.description
                                )}
                            </div>

                            <div className='flex items-center justify-between w-full'>
                                <div className="pl-2 mt-1 font-light text-xs text-gray-600 flex gap-1 items-center">
                                    <span className='font-medium'>By:</span>
                                    <img src={detail.from.profileLink} alt="img" className='w-8 h-8 rounded-full' />{detail.from.name}
                                </div>
                                <div className="pl-2 mt-1 font-light text-xs text-gray-600">
                                    {detail.date}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    )
}


