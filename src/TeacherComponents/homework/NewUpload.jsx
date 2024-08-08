import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import Loading from '../../LoadingScreen/Loading';
import { BASE_URL_Homework } from '../../Config';
import { toast } from 'react-toastify';


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

    return (
        <div className="fixed inset-0  flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white mobile:max-tablet:mx-4 rounded-lg p-4 shadow-lg ">
                <div className='flex justify-between'>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Select Class</label>
                        {/* <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 border rounded-md mt-2"
                    /> */}
                        <select
                            value={classLevel}
                            onChange={(e) => setClassLevel(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md mt-2"
                        >
                            <option value="">Select Class</option>
                            {uniqueClasses.map((classOption, index) => (
                                <option key={index} value={classOption}>{classOption}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Select Section</label>
                        <select
                            value={section}
                            onChange={(e) => setSection(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md mt-2"
                        >
                            <option value="">Select Section</option>
                            {uniqueSections.map((sectionOption, index) => (
                                <option key={index} value={sectionOption}>{sectionOption}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Select Subject</label>
                        <select
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md mt-2"
                        >
                            <option value="">Select Subject</option>
                            {uniqueSubjects.map((subjectOption, index) => (
                                <option key={index} value={subjectOption}>{subjectOption}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Chapter</label>
                        <input
                            type="text"
                            value={chapter}
                            onChange={(e) => setChapter(e.target.value)}
                            className="mt-2 w-full px-3 py-2 border rounded-md"
                        />
                    </div>


                </div>
                <div className='flex justify-between gap-2'>
                    <div className='mt-3'>
                        <label className="block text-sm font-medium text-gray-700">Topic</label>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="mt-2 w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div className='mt-3'>
                        <label className="block text-sm font-medium text-gray-700">Deadline</label>
                        <input
                            type="date"
                            min={getTodayDate()}
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="mt-2 w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                </div>

                <div className='mt-3'>
                    <label className="block text-sm font-medium text-gray-700">Question</label>
                    <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="mt-2 w-full px-3 py-2 border rounded-md"
                        rows="4"
                    ></textarea>
                </div>

                <div className="flex justify-end mt-2">
                    <button
                        type="button"
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-500"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        onClick={handleSave}
                    >
                        {loading ? <Loading /> : 'Submit'}
                    </button>
                </div>
            </div>
        </div>

    );
}

export default NewUpload;
