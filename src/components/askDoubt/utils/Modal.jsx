import React from 'react';

function Modal({ isOpen, onClose, onSubmit }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Ask A Doubt</h2>
                <textarea
                    className="w-full p-2 border rounded-lg mb-4"
                    rows="4"
                    placeholder="Type your doubt here..."
                ></textarea>
                <div className="flex justify-end">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={onSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
