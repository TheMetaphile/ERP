import React, { useState } from 'react';

export default function SelectClass({ onSelect }) {
    const [selectedButton, setSelectedButton] = useState(null);

    const handleClassSelect = (selectedClass) => {
        onSelect(selectedClass);
        setSelectedButton(selectedClass);
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
            <h1 className="shadow-lg w-fit mt-4">Select Class</h1>
            <div className="grid grid-cols-4 gap-4 mt-2 py-2">
                {[...Array(12).keys()].map((index) => (
                    <div
                        key={index}
                        style={styles}
                        className={`hover:bg-purple-400 ${
                            selectedButton === `${index + 1}` ? 'bg-purple-400' : ''
                        }`}
                        onClick={() => handleClassSelect(`${index + 1}`)}
                    >
                        {`${index + 1}th`}
                    </div>
                ))}
            </div>
        </div>
    );
}
