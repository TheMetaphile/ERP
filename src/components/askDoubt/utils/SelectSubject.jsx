import React, { useState } from 'react';

export default function SelectSubject({ onSelect }) {
    const [selectedSubject, setSelectedSubject] = useState(null);

    const handleSubjectSelect = (subject) => {
        onSelect(subject);
        setSelectedSubject(subject);
    };

    const styles = {
        paddingLeft: '0.75rem',
        paddingRight: '0.75rem',
        textAlign: 'center',
        borderRadius: '0.5rem',
        cursor: 'pointer',
    };

    return (
        <div className="rounded-lg shadow-md">
            <h1 className="shadow-lg w-fit mt-4">Select Subject</h1>
            <div className="grid grid-cols-2 gap-4 mt-2 py-2">
                {['Hindi', 'Math', 'English', 'Computer', 'Science', 'Chemistry', 'Physics', 'Sanskrit'].map(
                    (subject, index) => (
                        <div
                            key={index}
                            style={styles}
                            className={`hover:bg-purple-400 ${
                                selectedSubject === subject ? 'bg-purple-400' : ''
                            }`}
                            onClick={() => handleSubjectSelect(subject)}
                        >
                            {subject}
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
