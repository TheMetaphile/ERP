import React, { useState, useContext, useEffect } from 'react';
import Logo from '../../../assets/Test Account.png'
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";



export default function AnsweredTile({ data }) {
    const [expanded, setExpanded] = useState(null);
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
            {
                data.filter(doubt => doubt.status === "Resolved").map((doubt, index) => (
                    <div key={index} className="border p-2 justify-between rounded-lg shadow-md mt-3 flex items-center">
                        <div className='w-full flex items-center'>

                            <div className='w-full'>
                                <div className='font-medium text-base ml-2 flex justify-between items-center' onClick={() => handleClick(index)}>
                                    <div className='flex items-center gap-2 mobile:max-tablet:flex-col mobile:max-tablet:items-start'>
                                        <div className=' flex items-center gap-1'>
                                            <img src={doubt.student[0].profileLink} alt="" className='w-10 h-10 rounded-full' />
                                            <span className='text-red-500 whitespace-nowrap '>{doubt.student[0].name}</span>
                                        </div>
                                        <div className=' flex'>
                                            <p>Roll number</p>- <span className='text-red-500 whitespace-nowrap'>{doubt.student[0].rollNumber}</span></div>
                                        <div className=' flex'> <p>Doubt</p> - <span className='text-red-500 whitespace-nowrap'>{doubt.subject}</span></div>
                                    </div>
                                    <div className='items-center px-3 cursor-pointer'>
                                        {expanded === index ? <FaChevronUp /> : <FaChevronDown />}
                                    </div>
                                </div>
                                {expanded === index && (
                                    <div className='font-medium text-base ml-2 mt-2'>
                                        <div className='mt-2'>
                                            <span className='text-gray-700'>Question: {doubt.question}</span>
                                            {doubt.imageUrl && <img src={doubt.imageUrl} alt="Doubt" className="mt-2 max-w-xs rounded-lg" />}
                                        </div>
                                    </div>
                                )}
                                <div className='flex gap-2 font-medium text-base ml-2 mt-2 text-justify'>
                                    {expanded === index && (
                                        <>
                                            Answer : <span className='font-normal text-justify'>{doubt.solution}</span></>
                                    )}

                                </div>
                            </div>
                        </div>

                    </div>
                ))
           }
        </div>

    )
}

