import React from 'react';

export default function SelectTeacher({ onSelect }) {
    const handleTeacherSelect = (event) => {
        const selectedSubject = event.target.value;
        onSelect(selectedSubject);
    };

    return (
        <div className="rounded-lg shadow-md w-30">
            <h1 className="shadow-lg w-fit mt-4">Select Teacher</h1>
            <div className="mt-3 text-sm font-medium">
            <select
                    className="mt-2 shadow-md border border-grey-400 rounded-lg p-2 w-full"
                    onChange={handleTeacherSelect}
                >
                    {['Anjali Mam', 'Sakshi Mam', 'Abhishek Sir', 'Yash Sir', 'Bhanu Sir', 'Preeti Mam', 'Shiva Sir', 'Ravi Sir'].map(
                        (teacher, index) => (
                            <option key={index} value={teacher}>
                                {teacher}
                            </option>
                        )
                    )}
                </select>
            </div>
        </div>
    );
}