import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import Loading from '../../LoadingScreen/Loading';
import { BASE_URL_Homework } from '../../Config';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FiCalendar, FiBook, FiBookOpen, FiClipboard, FiClock } from 'react-icons/fi';

function NewUpload({ onClose, onNewWork }) {
    const { authState } = useContext(AuthContext);
    const [subject, setSubject] = useState('');
    const [classLevel, setClassLevel] = useState('');
    const [section, setSection] = useState('');
    const [topic, setTopic] = useState('');
    const [question, setQuestion] = useState('');
    const [chapter, setChapter] = useState('');
    const [deadline, setDeadline] = useState('');
    const [loading, setLoading] = useState(false)



    const handleSave = async () => {
        if (!subject || !classLevel || !section || !topic || !chapter || !deadline || !question) {
            alert('Fill all fields')
            return;
        }

        console.log(subject, classLevel, section, topic, question, chapter, deadline, new Date().toISOString().slice(0, 10), authState.userDetails.email);
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL_Homework}/homework/upload`,
                {
                    email: authState.userDetails.email,
                    date: new Date().toISOString().slice(0, 10),
                    deadline: deadline,
                    class: classLevel,
                    section: section,
                    subject: subject,
                    chapter: chapter,
                    topic: topic,
                    description: question

                },
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    }
                }
            );
            if (response.status == 200) {
                console.log('Homework Created', response.data)
                onNewWork(response.data)
                toast.success('HomeWork Created')
                onClose();
            }
        } catch (error) {
            console.error("Error creating homework:", error);
            toast.error(error.response.data.error);

        }
        finally {
            setLoading(false)
        }
    };

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    const uniqueClasses = Array.from(new Set(authState.subject.map(subj => subj.class)));

    const uniqueSections = Array.from(new Set(authState.subject.map(subj => subj.section)));

    const uniqueSubjects = Array.from(new Set(authState.subject.map(subj => subj.subject)));

    const inputVariants = {
        focus: { scale: 1.02, boxShadow: "0px 0px 8px rgba(79, 70, 229, 0.6)" }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
        >
            <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white mobile:max-tablet:mx-4 rounded-lg p-6 shadow-lg max-w-2xl w-full"
            >
                <h2 className="text-2xl font-bold text-indigo-700 mb-6">Create New Homework</h2>

                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label className="block text-sm font-medium text-indigo-600 mb-1">
                            <FiBook className="inline mr-2" />
                            Select Class
                        </label>
                        <motion.select
                            whileFocus="focus"
                            variants={inputVariants}
                            value={classLevel}
                            onChange={(e) => setClassLevel(e.target.value)}
                            className="w-full px-3 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select Class</option>
                            {uniqueClasses.map((classOption, index) => (
                                <option key={index} value={classOption}>{classOption}</option>
                            ))}
                        </motion.select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-indigo-600 mb-1">
                            <FiBookOpen className="inline mr-2" />
                            Select Section
                        </label>
                        <motion.select
                            whileFocus="focus"
                            variants={inputVariants}
                            value={section}
                            onChange={(e) => setSection(e.target.value)}
                            className="w-full px-3 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select Section</option>
                            {uniqueSections.map((sectionOption, index) => (
                                <option key={index} value={sectionOption}>{sectionOption}</option>
                            ))}
                        </motion.select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-indigo-600 mb-1">
                            <FiClipboard className="inline mr-2" />
                            Select Subject
                        </label>
                        <motion.select
                            whileFocus="focus"
                            variants={inputVariants}
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full px-3 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select Subject</option>
                            {uniqueSubjects.map((subjectOption, index) => (
                                <option key={index} value={subjectOption}>{subjectOption}</option>
                            ))}
                        </motion.select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-indigo-600 mb-1">Chapter</label>
                        <motion.input
                            whileFocus="focus"
                            variants={inputVariants}
                            type="text"
                            value={chapter}
                            onChange={(e) => setChapter(e.target.value)}
                            className="w-full px-3 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-indigo-600 mb-1">Topic</label>
                        <motion.input
                            whileFocus="focus"
                            variants={inputVariants}
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="w-full px-3 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-indigo-600 mb-1">
                            <FiCalendar className="inline mr-2" />
                            Deadline
                        </label>
                        <motion.input
                            whileFocus="focus"
                            variants={inputVariants}
                            type="date"
                            min={getTodayDate()}
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="w-full px-3 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                <div className='mt-4'>
                    <label className="block text-sm font-medium text-indigo-600 mb-1">
                        <FiClock className="inline mr-2" />
                        Question
                    </label>
                    <motion.textarea
                        whileFocus="focus"
                        variants={inputVariants}
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full px-3 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        rows="4"
                    ></motion.textarea>
                </div>

                <div className="flex justify-end mt-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400 transition duration-300"
                        onClick={onClose}
                    >
                        Cancel
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                        onClick={handleSave}
                    >
                        {loading ? <Loading /> : 'Submit'}
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>

    );
}

export default NewUpload;
