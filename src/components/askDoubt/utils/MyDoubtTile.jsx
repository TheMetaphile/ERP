import React, { useContext, useEffect, useState } from 'react';
import { MdDeleteForever, MdOutlineModeEdit, MdCheck, MdCancel } from "react-icons/md";
import AuthContext from '../../../Context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BASE_URL_AskDoubt } from '../../../Config';

export default function MyDoubtTile({ data }) {
    const { authState } = useContext(AuthContext);
    const [editMode, setEditMode] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [doubts, setDoubts] = useState(data);

    useEffect(() => {
        setDoubts(data);
    }, [data]);

    const handleDelete = async (index, id) => {
        console.log(id, authState.userDetails.currentClass)
        try {
            const response = await axios.delete(`${BASE_URL_AskDoubt}/doubts/delete?class=${authState.userDetails.currentClass}&doubtId=${id}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });

            if (response.status === 200) {
                toast.success('Doubt Deleted Successfully');
                // Remove the deleted doubt from the state
                setDoubts(prevDoubts => prevDoubts.filter((_, i) => i !== index));
            }
        } catch (error) {
            console.error("Error deleting Doubt:", error);
            toast.error(error.response.data.error);
        }
    };

    const handleEditToggle = (index, item) => {
        if (editMode === index) {
            setEditMode(null);
        } else {
            setEditMode(index);
            setEditedData({ subject: item.subject, question: item.question });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleConfirmEdit = async (index, id) => {
        try {
            const response = await axios.put(`${BASE_URL_AskDoubt}/doubts/update/student?id=${id}`, {
                class: authState.userDetails.currentClass,
                question: editedData.question,
                subject: editedData.subject
            }, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });

            if (response.status === 200) {
                toast.success('Doubt Edited Successfully');
                setEditMode(null);
                setDoubts(prevDoubts => prevDoubts.map((item, i) => i === index ? { ...item, question: editedData.question, subject: editedData.subject } : item));
            }
        } catch (error) {
            console.error("Error editing Doubt:", error);
            toast.error(error.response.data.error);
        }
    };

    const handleCancelEdit = () => {
        setEditMode(null);
        setEditedData({});
    };

    return (
        <div>
            {doubts.map((item, index) => (
                <div key={index} className="border border-gray-300 py-2 px-3 mt-3 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mobile:max-tablet:flex-col">
                        <div className='flex items-center gap-2'>
                            {editMode === index ? (
                                <input
                                    type="text"
                                    name="subject"
                                    value={editedData.subject}
                                    onChange={handleInputChange}
                                    className="px-3 py-1 bg-bg_blue rounded-lg border border-gray-300 w-fit"
                                />
                            ) : (
                                <h1 className="px-3 py-1 bg-bg_blue rounded-lg border border-gray-300 w-fit"> {item.subject}</h1>
                            )}
                            <div className="text-gray-400 px-3">Question No. {index + 1}</div>

                        </div>

                        <div className={` flex ${item.status === "Pending" ? "text-orange-300" :
                            item.status === "Rejected" ? "text-red-400" :
                                "text-green-400"
                            } font-medium gap-2`}><div className='flex items-center gap-2'>
                                {item.status === 'Pending' ? (
                                    <>
                                        {editMode === index ? (
                                            <>
                                                <button className='bg-green-400 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-md' onClick={() => handleConfirmEdit(index, item._id)}><MdCheck /></button>
                                                <button className='bg-gray-400 hover:bg-gray-700 text-white px-3 py-1 rounded-lg shadow-md' onClick={handleCancelEdit}><MdCancel /></button>
                                            </>
                                        ) : (
                                            <>
                                                <button className='bg-blue-400 hover:bg-blue-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center' onClick={() => handleEditToggle(index, item)}> <MdOutlineModeEdit /></button>
                                                <button className='bg-red-400 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center' onClick={() => handleDelete(index, item._id)}><MdDeleteForever /></button>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div> {item.status}

                        </div>


                    </div>

                    <div className="flex justify-between items-center mt-3 mobile:max-tablet:flex-col">
                        <div className="font-normal px-2">
                            {editMode === index ? (
                                <input
                                    type="text"
                                    name="question"
                                    value={editedData.question}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-1"
                                />
                            ) : (
                                item.question
                            )}
                        </div>

                    </div>
                    <div className='mt-3 px-3 font-normal'>
                        {item.status === 'Resolved' && (
                            <div>
                                <span className='text-lg font-medium'>Answer</span> : {item.solution}
                            </div>
                        )}
                    </div>
                    <div className='px-3 flex items-center justify-between mt-2 '>
                        {(item.status === 'Resolved' || item.status === 'Rejected') && (
                            <div className='flex items-center gap-2'>
                                <img src={item.teacher[0].profileLink} alt="" className='w--8 h-8 rounded-full'></img>
                                <div>{item.teacher[0].name}</div>
                            </div>
                        )}
                        <div className="font-medium  text-gray-400">Date {item.date}</div>

                    </div>
                </div>
            ))}
        </div>
    )
}
