import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import Loading from '../../LoadingScreen/Loading';
import { toast } from 'react-toastify';
import { BASE_URL_ClassWork } from '../../Config';

function NewUpload({ onClose }) {
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



    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-4 shadow-lg ">
                <div className='flex justify-between'>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Select Class</label>
                        <select
                            value={classLevel}
                            onChange={(e) => setClassLevel(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md mt-2"
                        >
                            <option value="">Select Class</option>
                            <option value="Pre-Nursery">Pre-Nursery</option>
                            <option value="Nursery">Nursery</option>
                            <option value="L.K.J">L.K.J</option>
                            <option value="U.K.J">U.K.J</option>
                            <option value="1st">1st</option>
                            <option value="2nd">2nd</option>
                            <option value="3rd">3rd</option>
                            <option value="4th">4th</option>
                            <option value="5th">5th</option>
                            <option value="6th">6th</option>
                            <option value="7th">7th</option>
                            <option value="8th">8th</option>
                            <option value="9th">9th</option>
                            <option value="10th">10th</option>
                            <option value="11th">11th</option>
                            <option value="12th">12th</option>
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
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                            <option value="F">F</option>
                            <option value="G">G</option>
                            <option value="H">H</option>
                            <option value="I">I</option>
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
                            <option value="Hindi">Hindi</option>
                            <option value="English">English</option>
                            <option value="Maths">Math</option>
                            <option value="Science">Science</option>
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
                <div className='flex justify-between'>
                    <div className='mt-3'>
                        <label className="block text-sm font-medium text-gray-700">Topic</label>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
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
