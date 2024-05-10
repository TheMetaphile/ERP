import React from 'react';

export default function SelectSubject({ onSelect }) {
    const handleSubjectSelect = (event) => {
        const selectedSubject = event.target.value;
        onSelect(selectedSubject);
    };

    return (
        <div className="rounded-lg shadow-md w-30">
            <h1 className="shadow-lg w-fit mt-4">Select Subject</h1>     
            <div className="mt-3 text-sm font-medium">
                <select
                    className="mt-2 shadow-md border border-grey-400 rounded-lg p-2 w-full"
                    onChange={handleSubjectSelect}
                >
                    {['Hindi', 'Math', 'English', 'Computer', 'Science', 'Chemistry', 'Physics', 'Sanskrit'].map(
                        (subject, index) => (
                            <option key={index} value={subject}>
                                {subject}
                            </option>
                        )
                    )}
                </select>
            </div>
        </div>
    );
}
