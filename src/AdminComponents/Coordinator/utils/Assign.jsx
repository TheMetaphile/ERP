import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

function Assign() {
    const [content, setContent] = useState([
        { id: 1, classRange: 'Pre-Nursery - U.K.G', coordinator: '' },
        { id: 2, classRange: '1st-2nd', coordinator: '' },
        { id: 3, classRange: '3rd-5th', coordinator: '' },
        { id: 4, classRange: '6th-8th', coordinator: '' },
        { id: 5, classRange: '9th-12th', coordinator: '' },
    ]);

    const handleInputChange = (id, value) => {
        setContent(prevContent =>
            prevContent.map(item =>
                item.id === id ? { ...item, coordinator: value } : item
            )
        );
    };

    const handleSave = (id) => {
        const coordinator = content.find(item => item.id === id).coordinator;
        if (coordinator) {
            toast.success(`Coordinator assigned for class range ${id}`);
        } else {
            toast.error('Please enter a coordinator name');
        }
    };

    const handleDelete = (id) => {
        setContent(prevContent =>
            prevContent.map(item =>
                item.id === id ? { ...item, coordinator: '' } : item
            )
        );
        toast.success(`Coordinator removed for class range ${id}`);
    };

    return (
        <div className="flex mobile:max-tablet:flex-col w-full px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 mb-3 no-scrollbar">


            <div className="border py-4 mobile:max-tablet:px-2 rounded-lg gap-5 shadow-md w-full flex flex-col px-3  overflow-y-auto items-start mt-2 mb-3 no-scrollbar">
                {content.map((con) => (
                    <div key={con.id} className="w-full mobile:max-tablet:flex-col items-center p-2 border rounded-md flex mobile:max-tablet:items-start mobile:max-tablet:gap-2">
                        <div className="flex-grow">
                            <h2 className="text-lg">{con.classRange}</h2>
                        </div>
                        <div className="mobile:max-tablet:mx-0 mx-2">
                            <input
                                type="text"
                                value={con.coordinator}
                                onChange={(e) => handleInputChange(con.id, e.target.value)}
                                className="border rounded p-2 w-full"
                                placeholder="Enter coordinator name"
                            />
                        </div>
                        <div className="flex-shrink-0 flex space-x-2 mobile:max-tablet:mt-0">
                            <button
                                onClick={() => handleSave(con.id)}
                                className="bg-blue-500 text-white rounded px-4 py-2"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => handleDelete(con.id)}
                                className="bg-red-500 text-white rounded px-4 py-2"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Assign;
