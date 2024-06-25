import React, { useState, useContext, useEffect } from 'react';
import Logo from '../../../assets/Test Account.png'
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import axios from 'axios'
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL_AskDoubt } from '../../../Config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NewDoubtTile({ data, Class }) {
    const [expanded, setExpanded] = useState(null);
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [answers, setAnswers] = useState({});

    const handleAnswerChange = (index, value) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [index]: value
        }));
    };

    const handleClick = (index) => {
        setExpanded(expanded === index ? null : index);
    }



    const handleStatusUpdate = async (id, index) => {
        if (!answers[index]) {
            alert("Please provide an answer before sending.");
            return;
        }

        console.log(id, Class, answers[index], new Date().toISOString().split('T')[0])
        setLoading(true);
        try {
            const response = await axios.put(`${BASE_URL_AskDoubt}/doubts/update/teacher?id=${id}`, {
                class: Class,
                solution: answers[index],
                replyDate: new Date().toISOString().split('T')[0]
            }, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                console.log(response.data)
                toast.success('Answered Successfully')
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error(error.response.error)
        } finally {
            setLoading(false);
        }

    };



    return (
        <div className="w-full">
            {data.length > 0 ? (
                data.filter(doubt => doubt.status === "Pending").map((doubt, index) => (
                    <div key={index} className="border p-2 justify-between rounded-lg shadow-md mt-3 flex items-center">
                        <div className='flex items-center'>
                            <img src={doubt.student[0].profileLink} alt="" className='w-10 h-10 rounded-full' />
                            <div>
                                <div className='font-medium text-base ml-2'>
                                    <span className='text-red-500 whitespace-nowrap'>{doubt.student[0].name}</span> with roll number &nbsp;
                                    <span className='text-red-500 whitespace-nowrap'>{doubt.student[0].rollNumber}</span> has a doubt in &nbsp;
                                    <span className='text-red-500 whitespace-nowrap'>{doubt.subject}</span>
                                </div>
                                {expanded === index && (
                                    <div className='font-medium text-base ml-2 mt-2'>
                                        <div className='mt-2'>
                                            <span className='text-gray-700'>Question: {doubt.question}</span>
                                            {doubt.imageUrl && <img src={doubt.imageUrl} alt="Doubt" className="mt-2 max-w-xs rounded-lg" />}
                                        </div>
                                    </div>
                                )}
                                <div className='flex flex-col gap-2 font-medium text-base ml-2 mt-2'>
                                    {expanded === index && (
                                        <>
                                            <textarea
                                                className="w-full px-3 py-2 mb-2 border rounded-lg"
                                                placeholder="Type your answer here..."
                                                rows={2}
                                                value={answers[index] || ''}
                                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                                            />

                                            <div className="flex gap-2">
                                                <button
                                                    className='p-1 rounded-lg border border-gray-300 text-black px-2 bg-green-300'
                                                    onClick={() => handleStatusUpdate(doubt._id, index)}
                                                    disabled={loading}
                                                >
                                                    Confirm
                                                </button>
                                            </div>
                                        </>
                                    )}

                                </div>
                            </div>
                        </div>
                        <div className='items-center px-3 cursor-pointer' onClick={() => handleClick(index)}>
                            {expanded === index ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                    </div>
                ))
            ) : (
                <div className='w-full text-center mt-3'>No new doubt</div>
            )}
        </div>

    )
}

