import React, { useState } from 'react';

export default function SelectTeacher({ onSelect }) {
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const handleTeacherSelect = (teacher) => {
        onSelect(teacher);
        setSelectedTeacher(teacher);
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
            <h1 className="shadow-lg w-fit mt-4">Select Teacher</h1>
            <div className="grid grid-cols-2 gap-4 mt-2 py-2">
                {['Anjali Mam', 'Sakshi Mam', 'Abhishek Sir', 'Yash Sir', 'Bhanu Sir', 'Preeti Mam', 'Shiva Sir', 'Ravi Sir'].map(
                    (teacher, index) => (
                        <div
                            key={index}
                            style={styles}
                            className={`hover:bg-purple-400 ${selectedTeacher === teacher ? 'bg-purple-400' : ''}`}
                            onClick={() => handleTeacherSelect(teacher)}
                        >
                            {teacher}
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
