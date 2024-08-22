import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import Loading from '../../LoadingScreen/Loading';
import { toast } from 'react-toastify';
import { BASE_URL_ClassWork } from '../../Config';
import { motion } from 'framer-motion';
import { FiBook, FiBookOpen, FiClipboard, FiFileText, FiMessageSquare } from 'react-icons/fi';

function NewUpload({ onClose, onNewWork }) {
    const { authState } = useContext(AuthContext);
    const [subject, setSubject] = useState('');
    const [classLevel, setClassLevel] = useState('');
    const [section, setSection] = useState('');
    const [topic, setTopic] = useState('');
    const [question, setQuestion] = useState('');
    const [chapter, setChapter] = useState('');
    const [loading, setLoading] = useState(false)


    const handleSave = async () => {
        if (!subject || !classLevel || !section || !topic || !chapter || !question) {
            alert('Fill all fields')
            return;
        }
        console.log(subject, classLevel, section, topic, question, chapter, new Date().toISOString().slice(0, 10), authState.userDetails.email);
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL_ClassWork}/classwork/upload`,
                {
                    email: authState.userDetails.email,
                    date: new Date().toISOString().slice(0, 10),
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
                console.log('Classwork Created')
                onNewWork(response.data)
                toast.success('Classwork Created')
                onClose();
            }
        } catch (error) {
            console.error("Error creating classwork:", error);
            toast.error(error.response.data.error);

        }
        finally {
            setLoading(false)
        }
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
                className="bg-white rounded-lg p-6 shadow-lg max-w-2xl w-full mobile:max-tablet:mx-2"
            >
                <h2 className="text-2xl font-bold text-indigo-700 mb-6">Create New Classwork</h2>

                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label className="flex items-center text-sm font-medium text-indigo-600 mb-1">
                            <FiBook className="mr-2" />
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
                        <label className="flex items-center text-sm font-medium text-indigo-600 mb-1">
                            <FiBookOpen className="mr-2" />
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
                        <label className="flex items-center text-sm font-medium text-indigo-600 mb-1">
                            <FiClipboard className="mr-2" />
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
                        <label className="flex items-center text-sm font-medium text-indigo-600 mb-1">
                            <FiFileText className="mr-2" />
                            Chapter
                        </label>
                        <motion.input
                            whileFocus="focus"
                            variants={inputVariants}
                            type="text"
                            value={chapter}
                            onChange={(e) => setChapter(e.target.value)}
                            className="w-full px-3 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="flex items-center text-sm font-medium text-indigo-600 mb-1">
                            <FiMessageSquare className="mr-2" />
                            Topic
                        </label>
                        <motion.input
                            whileFocus="focus"
                            variants={inputVariants}
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="w-full px-3 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                <div className='mt-4'>
                    <label className="flex items-center text-sm font-medium text-indigo-600 mb-1">
                        <FiMessageSquare className="mr-2" />
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
