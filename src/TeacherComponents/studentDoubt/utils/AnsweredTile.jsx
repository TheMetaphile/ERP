import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronUp, FaChevronDown, FaUserGraduate, FaQuestionCircle, FaBookOpen } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const DoubtCard = ({ doubt, index, expanded, handleClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border border-blue-200 p-4 rounded-lg shadow-lg mt-4 bg-white"
        >
            <div className="flex items-center mobile:max-sm:flex-col mobile:max-sm:items-start justify-between cursor-pointer" onClick={() => handleClick(index)}>
                <div className="flex items-center space-x-4">
                    <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={doubt.student[0].profileLink}
                        alt=""
                        className="w-12 h-12 rounded-full border-2 border-blue-300"
                    />
                    <h3 className="font-semibold text-blue-800">{doubt.student[0].name}</h3>

                    <div>
                        <div className="flex items-center text-sm text-blue-600 whitespace-nowrap">

                            <FaUserGraduate className="mr-1" />
                            <span>Roll: {doubt.student[0].rollNumber}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-blue-600 font-medium">{doubt.subject}</span>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-blue-100 p-2 rounded-full"
                    >
                        {expanded === index ? <FaChevronUp className="text-blue-600" /> : <FaChevronDown className="text-blue-600" />}
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {expanded === index && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                    >
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-medium text-blue-800 flex items-center mb-2">
                                <FaQuestionCircle className="mr-2 text-blue-600" />
                                Question:
                            </h4>
                            <p className="text-blue-700 mb-4">{doubt.question}</p>
                            {doubt.imageUrl && (
                                <img src={doubt.imageUrl} alt="Doubt" className="mt-2 max-w-xs rounded-lg shadow-md" />
                            )}
                        </div>
                        <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-medium text-blue-800 flex items-center mb-2">
                                <FaBookOpen className="mr-2 text-blue-600" />
                                Answer:
                            </h4>
                            <p className="text-blue-700">{doubt.solution}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default function AnsweredTile({ data }) {
    const [expanded, setExpanded] = useState(null);
    const [resolvedDoubts, setResolvedDoubts] = useState([]);

    useEffect(() => {
        if (data) {
            setResolvedDoubts(data.filter(doubt => doubt.status === "Resolved"));
        }
    }, [data]);

    const handleClick = (index) => {
        setExpanded(expanded === index ? null : index);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full mx-auto"
        >
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center justify-between mb-6"
            >

                <h2 className="text-2xl mobile:max-sm:text-sm font-medium text-black">Resolved Doubts</h2>
                <div className="flex items-center mobile:max-sm:text-xs bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md">

                    <IoMdCheckmarkCircleOutline className="mr-2" />
                    <span>{resolvedDoubts.length} Resolved</span>
                </div>
            </motion.div>

            {resolvedDoubts.map((doubt, index) => (
                <DoubtCard
                    key={index}
                    doubt={doubt}
                    index={index}
                    expanded={expanded}
                    handleClick={handleClick}
                />
            ))}
        </motion.div>
    );
}