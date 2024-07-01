import React, { useState, useContext } from 'react';
import { MdEdit, MdDeleteForever, MdCheck } from "react-icons/md";
import AuthContext from '../../Context/AuthContext';
import axios from 'axios';
import { BASE_URL_Homework } from '../../Config';
import { toast } from 'react-toastify';

export default function HomeWorkTile({ details, Class }) {
    const { authState } = useContext(AuthContext);
    const [editingRow, setEditingRow] = useState(null);
    const [editedDetails, setEditedDetails] = useState(details);

    const handleUpdateClick = (index) => {
        setEditingRow(index);
    };

    const handleConfirmClick = async (index) => {
        console.log(Class)
        const detail = editedDetails[index];
        try {
            const response = await axios.put(`${BASE_URL_Homework}/homework/update?class=${Class}&id=${detail._id}&date=${detail.date}`,
                {
                    update: {
                        subject: detail.subject,
                        chapter: detail.chapter,
                        topic: detail.topic,
                        description: detail.description,
                        date: detail.date
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    }
                }
            );
            if (response.status == 200) {
                console.log('Homework Updated')
                toast.success('HomeWork Updated')
                setEditingRow(null);

            }
        } catch (error) {
            console.error("Error updating homework:", error);
            toast.error(error.response.data.error);

        }
    };

    const handleDelete = async (index) => {
        console.log(Class)
        const detail = editedDetails[index];
        try {
            const response = await axios.delete(`${BASE_URL_Homework}/homework/delete?class=${Class}&month=${new Date().getMonth() + 1}&year=2024&id=${detail._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    }
                }
            );
            if (response.status == 200) {
                console.log(response.data)
                toast.success('Homework Deleted')
                setEditedDetails(editedDetails.filter((_, i) => i !== index));
            }
        } catch (error) {
            console.error("Error deleting homework:", error);
            toast.error(error.response.data.error);
        }
    };

    const handleInputChange = (index, field, value) => {
        const updatedDetails = editedDetails.map((detail, i) =>
            i === index ? { ...detail, [field]: value } : detail
        );
        setEditedDetails(updatedDetails);
    };

    return (
        <div className="  mb-4   rounded-lg shadow-md mt-3 items-center justify-between">
            {editedDetails.map((detail, index) => (
                <div key={index} className='w-full  flex-col border border-gray-200 p-2 rounded-lg shadow-md mt-3'>
                    <div className="flex items-center justify-between">
                        {editingRow === index ? (
                            <>
                                <input
                                    className="px-3 py-1 bg-bg_blue rounded-full w-fit"
                                    value={detail.subject}
                                    onChange={(e) => handleInputChange(index, 'subject', e.target.value)}
                                />
                                <input
                                    className="pl-2 font-medium"
                                    value={detail.chapter}
                                    onChange={(e) => handleInputChange(index, 'chapter', e.target.value)}
                                />
                                <input
                                    className="font-medium"
                                    value={detail.date}
                                    onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                                />

                            </>
                        ) : (
                            <>
                                <div className="px-3 py-1 bg-bg_blue rounded-full w-fit">{detail.subject}</div>
                                <div className="pl-2 font-medium">Chapter: {detail.chapter}</div>
                                <h1 className="font-medium">Date: {detail.date}</h1>

                            </>
                        )}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                        {editingRow === index ? (
                            <>
                                <input
                                    className="pl-2 font-medium"
                                    value={detail.topic}
                                    onChange={(e) => handleInputChange(index, 'topic', e.target.value)}
                                />
                                <input
                                    className="font-medium"
                                    value={detail.description}
                                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                                />
                            </>
                        ) : (
                            <>
                                <div className="pl-2 font-medium">Topic: {detail.topic}</div>
                                <h1 className="font-medium">Task: {detail.description}</h1>
                            </>
                        )}
                        <div className='flex items-center gap-1'>
                            {editingRow === index ? (
                                <button
                                    className='bg-green-400 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center'
                                    onClick={() => handleConfirmClick(index)}
                                >
                                    <MdCheck />
                                </button>
                            ) : (
                                <button
                                    className='bg-blue-400 hover:bg-blue-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center'
                                    onClick={() => handleUpdateClick(index)}
                                >
                                    <MdEdit />
                                </button>
                            )}
                            <button
                                className='bg-red-400 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center'
                                onClick={() => handleDelete(index)}
                            >
                                <MdDeleteForever />
                            </button>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

