import React from 'react';

export default function SelectTeacher({ onSelect }) {
    const handleTeacherSelect = (event) => {
        const selectedSubject = event.target.value;
        onSelect(selectedSubject);
    };

    return (
        <div className="rounded-lg shadow-md border border-gray-300 w-30">
            <h1 className="w-fit mt-4 px-2">Select Teacher</h1>
            <div className="flex justify-center items-center mt-3 text-sm font-medium">
            <select
                    className="mt-2 shadow-md border border-grey-400 rounded-lg p-2 w-full ml-2 mr-2  mb-2"
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