import React from 'react';

export default function AddNewComponent({ onClose }) {
    const style = {
        fontSize: '1.25rem',
        fontWeight: 600,
        marginBottom: '1rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    };
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
             <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="" style={style}>Medical Problem</h2>
                <h2 className="" style={style}>Any Injury</h2>
                <h2 className="" style={style}>Any Disease</h2>
                <h2 className="" style={style}>Sugar</h2>
                <button onClick={onClose} className="px-4 py-2 bg-secondary  rounded-lg mt-4">Add</button>
                </div>
        </div>
    );
}
