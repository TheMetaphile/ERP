import React, { useState } from "react";
import SubjectList from "./utils/SubjectList";


export default function Subject() {
    const subjects = [
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
    ]
    const [popUp, setPopUp] = useState(false);
    const handleClick = () => {
        setPopUp(!popUp);
    }
    const handleClosePopup = () => {
        setPopUp(false);
    }
    const [subjectName,setSubjectName]=useState('');
   
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
                    <div className="bg-white rounded-lg p-6">
                        <h1 className="text-xl">Add Subject</h1>
                        <textarea
                            className="w-full mt-4 h-20 mb-4 border border-gray-300 rounded-lg px-6 py-2"
                            placeholder="Write Subject Name..."
                            rows={4}
                            onChange={(e) => setSubjectName(e.target.value)}
                        />
                        <div className="mt-4 flex justify-center">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                                onClick={handleClosePopup}
                            >
                                Cancel
                            </button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                Confirm
                            </button>
                            {console.log(subjectName)}
                        </div>
                    </div>
                   
                </div>
              
            )
            }
        </div>
    )
}