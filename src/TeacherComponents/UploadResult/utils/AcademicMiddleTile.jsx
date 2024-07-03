import React, { useState, useContext } from 'react';
import { MdEdit, MdDeleteForever, MdCheck } from "react-icons/md";
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';
import Loading from '../../../LoadingScreen/Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_Result } from '../../../Config';

export default function AcademicMiddleTile({ details, email ,term}) {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(null);
    const [editableDetail, setEditableDetail] = useState({});

    const handleEditClick = (index, detail) => {
        setIsEditing(index);
        setEditableDetail({ ...detail });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableDetail({ ...editableDetail, [name]: value });
    };

    const handleConfirmClick = async (index) => {
        console.log(editableDetail, 'edit', email, editableDetail._id);
        setLoading(true);
        try {
            const response = await axios.put(
                `${BASE_URL_Result}/result/update/marks?id=${editableDetail._id}`,
                {
                    email: email,
                    update: {
                        marksObtained: editableDetail.marksObtained,
                        totalMarks: editableDetail.totalMarks,
                        obtainedPracticalMarks: editableDetail.obtainedPracticalMarks,
                        totalPracticalMarks: editableDetail.totalPracticalMarks
                    },
                    term: term
                },
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                }
            );
            if (response.status === 200) {
                details[index] = { ...editableDetail };
                toast.success("Updated successfully");
                setIsEditing(null);
            }
        } catch (error) {
            console.error("Error updating result:", error);
            toast.error(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full border-b-2 ">
            {details.map((detail, index) => (
                <div key={index} className='flex justify-between border border-gray-300 shadow-md items-center w-full'>
                    {isEditing === index ? (
                        <>
                            <input
                                className='w-1/3 text-lg text-center py-2 bg-white border border-black'
                                type="text"
                                name="subject"
                                value={editableDetail.subject}
                                onChange={handleInputChange}
                            />
                            <input
                                className='w-1/3 text-lg text-center py-2 bg-white border border-black'
                                type="number"
                                name="obtainedPracticalMarks"
                                value={editableDetail.obtainedPracticalMarks}
                                onChange={handleInputChange}
                            />
                            <input
                                className='w-1/3 text-lg text-center py-2 bg-white border border-black'
                                type="number"
                                name="totalPracticalMarks"
                                value={editableDetail.totalPracticalMarks}
                                onChange={handleInputChange}
                            />
                            <input
                                className='w-1/3 text-lg text-center py-2 bg-white border border-black'
                                type="number"
                                name="marksObtained"
                                value={editableDetail.marksObtained}
                                onChange={handleInputChange}
                            />
                            <input
                                className='w-1/3 text-lg text-center py-2 bg-white border border-black'
                                type="number"
                                name="totalMarks"
                                value={editableDetail.totalMarks}
                                onChange={handleInputChange}
                            />
                            <div className='w-1/3 text-lg text-center py-2 bg-green-200'>
                                {loading ? (
                                    <Loading />
                                ) : (
                                    <button
                                        className='bg-green-400 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center'
                                        onClick={() => handleConfirmClick(index)}
                                    >
                                        <MdCheck />
                                    </button>
                                )}

                            </div>
                        </>
                    ) : (
                        <>
                            <div className='w-1/3 text-lg text-center py-2'>{detail.subject}</div>
                            <div className='w-1/3 text-lg text-center py-2 bg-blue-200'>{detail.obtainedPracticalMarks}</div>
                            <div className='w-1/3 text-lg text-center py-2 bg-green-200'>{detail.totalPracticalMarks}</div>
                            <div className='w-1/3 text-lg text-center py-2 bg-blue-200'>{detail.marksObtained}</div>
                            <div className='w-1/3 text-lg text-center py-2 bg-green-200'>{detail.totalMarks}</div>
                            <div className='w-1/3 text-lg  py-2 bg-green-200 text-center'>
                                <button
                                    className='bg-red-400 hover:bg-red-700  text-white px-3 rounded-lg shadow-md '
                                    onClick={() => handleEditClick(index, detail)}
                                >
                                    <MdEdit />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}