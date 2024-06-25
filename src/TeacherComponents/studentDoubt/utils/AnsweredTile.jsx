import React, { useState, useContext, useEffect } from 'react';
import Logo from '../../../assets/Test Account.png'
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import axios from 'axios'
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL_Student_Leave } from '../../../Config';

export default function AnsweredTile({ data }) {
    const [expanded, setExpanded] = useState(null);
    const { authState } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        if (data && data.StudentsLeaves) {
            setLeaves(data.StudentsLeaves);
        }
    }, [data]);

    const handleAnswerChange = (index, value) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [index]: value
        }));
    };

    const handleClick = (index) => {
        setExpanded(expanded === index ? null : index);
    }

    const handleStatusUpdate = async (id, status, email, index) => {
        if (status === 'Approved' && !answers[index]) {
            alert("Please provide an answer before sending.");
            return;
        }
        console.log(answers[index])
    };

    return (
        <div className="w-full">
            {data.length > 0 ? (
                data.filter(doubt => doubt.status === "Resolved").map((doubt, index) => (
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
                                       Answer : {doubt.solution}</>
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

