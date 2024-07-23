import React, { useState, useContext, useEffect } from 'react';
import { MdEdit, MdDeleteForever, MdCheck } from "react-icons/md";
import AuthContext from '../../Context/AuthContext';
import axios from 'axios';
import { BASE_URL_Homework } from '../../Config';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';

export default function HomeWorkTile({ details, Class, additionalData, selectedSubject }) {
    const { authState } = useContext(AuthContext);
    const [editingRow, setEditingRow] = useState(null);
    const [editedDetails, setEditedDetails] = useState(details);
    const [expanded, setExpanded] = useState(null);

    const handleClick = (index) => {
        setExpanded(expanded === index ? null : index);
    }

    const handleUpdateClick = (index) => {
        setEditingRow(index);
    };

    useEffect(() => {
        // const subject=additionalData[0].subject;
        if (additionalData.length !== 0 && additionalData[0].subject === selectedSubject) {
            console.log('adddito', additionalData, additionalData[0].subject)
            console.log('bef', editedDetails)
            setEditedDetails(prevData => [...additionalData, ...prevData]);
            console.log('afte', editedDetails)

        }
    }, [additionalData, selectedSubject]);

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
                        date: detail.date,
                        deadline: detail.deadline
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
        const currentYear = new Date().getFullYear();
        console.log(Class, currentYear)
        const detail = editedDetails[index];
        try {
            const response = await axios.delete(`${BASE_URL_Homework}/homework/delete?class=${Class}&month=${new Date().getMonth() + 1}&year=${currentYear}&id=${detail._id}`,
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
        <div className="mb-4 mt-3 items-center justify-between">
            {editedDetails.map((detail, index) => (
                <div key={index} className='w-full  flex-col border border-gray-200 p-2 rounded-lg shadow-md mt-3'>
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => handleClick(index)}>
                        {editingRow === index ? (
                            <>
                                <div className="pl-2 font-medium">Chapter: </div>
                                <input
                                    className="font-normal border border-gray-300 shadow-md rounded-lg px-2 py-1 text-justify"
                                    value={detail.chapter}
                                    onChange={(e) => handleInputChange(index, 'chapter', e.target.value)}
                                />

                                <div className='flex gap-2 justify-end'>
                                    <button
                                        className='bg-green-400 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center'
                                        onClick={() => handleConfirmClick(index)}
                                    >
                                        <MdCheck />
                                    </button>
                                    <button
                                        className='bg-red-400 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center'
                                        onClick={() => handleUpdateClick(-1)}
                                    >
                                        <FaTimes />
                                    </button>
                                    <input
                                        className="font-normal  border border-gray-300 shadow-md rounded-lg px-2 py-1 text-justify"
                                        value={detail.subject}
                                        onChange={(e) => handleInputChange(index, 'subject', e.target.value)}
                                    />
                                </div>


                            </>
                        ) : (
                            <>

                                <div className="pl-2 font-medium whitespace-nowrap mobile:max-tablet:text-sm">Chapter: <span className='font-normal'>{detail.chapter}</span></div>
                                <div className='flex items-center gap-1 mobile:max-tablet:flex-col'>
                                    <div className="flex">
                                        <button
                                            className='bg-blue-400 hover:bg-blue-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center'
                                            onClick={() => handleUpdateClick(index)}
                                        >
                                            <MdEdit />
                                        </button>

                                        <button
                                            className='bg-red-400 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center'
                                            onClick={() => handleDelete(index)}
                                        >
                                            <MdDeleteForever />
                                        </button>
                                    </div>
                                    <div className="px-3 py-1 bg-bg_blue rounded-full w-fit">

                                        {detail.subject}

                                    </div>
                                </div>



                            </>
                        )}

                    </div>
                    <div>
                        {editingRow === index ? (
                            <div className="flex flex-col">
                                <div className="pl-2 font-medium">Topic: </div>

                                <input
                                    className="font-normal my-2 border border-gray-300 shadow-md rounded-lg px-2 py-1 text-justify"
                                    value={detail.topic}
                                    onChange={(e) => handleInputChange(index, 'topic', e.target.value)}
                                />
                                <div className="pl-2 font-medium">Task: </div>

                                <textarea
                                    rows={6}
                                    className="font-normal border border-gray-300 shadow-md rounded-lg px-2 py-1 text-justify"
                                    value={detail.description}
                                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                                />
                            </div>
                        ) : (
                            <div>
                                <div className="pl-2 font-medium text-justify">Topic: <span className='font-normal'>{detail.topic}</span></div>
                                {expanded === index && (
                                    <h1 className="pl-2 font-medium text-justify">Task: <span className='font-normal'>{detail.description}</span></h1>
                                )}
                            </div>
                        )}

                    </div>
                    <div className='flex justify-between mobile:max-tablet:justify-start px-2 mobile:max-tablet:flex-col'>
                        <div className='text-right mobile:max-tablet:text-left'>
                            <h1 className="font-medium mobile:max-tablet:text-sm">Date: {detail.date}</h1>
                        </div>
                        <div className='text-left mobile:max-tablet:text-sm'>
                            {editingRow === index ? (
                                <>
                                    <div className="pl-2 mobile:max-tablet:p-0 font-medium mobile:max-tablet:text-sm">Deadline: </div>

                                    <input
                                        className="font-normal mt-2 border border-gray-300 shadow-md rounded-lg px-2 py-1 text-justify"
                                        value={detail.deadline}
                                        onChange={(e) => handleInputChange(index, 'deadline', e.target.value)}
                                    />
                                </>
                            ) : (
                                <h1 className="font-medium">Deadline: {detail.deadline}</h1>
                            )}
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

