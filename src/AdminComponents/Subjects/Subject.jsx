import React, { useState } from "react";
import SubjectList from "./utils/SubjectList";


export default function Subject() {
    const [subjects, setSubjects] = useState([
        { name: "Subject 1", topics: "12" },
        { name: "Subject 2", topics: "12" },
        { name: "Subject 3", topics: "12" },
        { name: "Subject 4", topics: "12" },
        { name: "Subject 5", topics: "12" },
        { name: "Subject 6", topics: "12" },
        { name: "Subject 7", topics: "12" },
        { name: "Subject 8", topics: "12" },
        { name: "Subject 9", topics: "12" },
        { name: "Subject 10", topics: "12" },
        { name: "Subject 1", topics: "12" },
        { name: "Subject 2", topics: "12" },
        { name: "Subject 3", topics: "12" },
        { name: "Subject 4", topics: "12" },
        { name: "Subject 5", topics: "12" },
        { name: "Subject 6", topics: "12" },
        { name: "Subject 7", topics: "12" },
        { name: "Subject 8", topics: "12" },
        { name: "Subject 9", topics: "12" },
        { name: "Subject 10", topics: "12" },
    ]);
    const [popUp, setPopUp] = useState(false);
    const handleClick = () => {
        setPopUp(!popUp);
    }
    const handleClosePopup = () => {
        setPopUp(false);
    }
    const [subjectName, setSubjectName] = useState('');
    const [topics, setTopics] = useState(['']);

    const handleTopicChange = (index, value) => {
        const newTopics = [...topics];
        newTopics[index] = value;
        setTopics(newTopics);
    };

    const handleAddTopic = () => {
        setTopics([...topics, '']);
    };


    // Handle form submission, e.g., send data to backend
    const handleSubmit = (e) => {
        e.preventDefault();
        const newSubject = { name: subjectName, topics: topics.length };
        const updatedSubjects = [...subjects, newSubject];
        setSubjects(updatedSubjects);
        setSubjectName('');
        setTopics(['']);
        setPopUp(false);
    };



    return (
        <div className="flex flex-col mx-2">
            <div className="flex mt-4 mb-4 mx-2 justify-between">
                <div className="flex flex-col">
                    <h1 className="text-2xl">All Subjects</h1>
                    <span className="text-lg">Total Number of Subjects:36</span>
                </div>
                <div className="flex justify-between gap-2">
                    <button className="text-xl rounded-lg">
                        <select
                            className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                            id="addSubject"
                            name="addSubject"
                            required
                        >
                            <option value="">Select Class</option>
                            <option value="Math">1st</option>
                            <option value="Science">2nd</option>
                            <option value="History">3rd</option>

                        </select>
                    </button>
                    <button className="text-xl px-2 rounded-lg border" onClick={handleClick}>Add Subject +</button>
                </div>
            </div>
            <div className="rounded-lg shadow-lg mx-2 mb-2 border">
                <SubjectList subjects={subjects} />
            </div>

            {popUp && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white rounded-lg p-6 w-1/2">
                        <h1 className="text-xl mb-4">Add Subject</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="subjectName" className="block text-sm font-medium text-gray-700">Subject Name:</label>
                                <input
                                    id="subjectName"
                                    name="subjectName"
                                    type="text"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={subjectName}
                                    onChange={(e) => setSubjectName(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="topics" className="block text-sm font-medium text-gray-700">Topics:</label>
                                <button type="button" className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleAddTopic}>Add Topic</button>
                                {topics.map((topic, index) => (
                                    <div key={index} className="mt-1">
                                        <input
                                            id={`topic-${index}`}
                                            name={`topic-${index}`}
                                            type="text"
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={topic}
                                            onChange={(e) => handleTopicChange(index, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-4">
                                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleSubmit}>Submit</button>
                                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleClosePopup}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>


            )
            }
        </div>
    )
}