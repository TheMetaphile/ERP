import React from 'react';

export default function SelectSubject({ onSelect }) {
    const handleSubjectSelect = (event) => {
        const selectedSubject = event.target.value;
        onSelect(selectedSubject);
    };

    return (
        <div className="  w-30 ">

            <div className="flex justify-center  items-center text-sm font-medium mobile:max-tablet:text-xs" >
                <select
                    className=" shadow-md border border-grey-300 rounded-lg p-2 w-full mb-2"
                    onChange={handleSubjectSelect}
                >
                    {['Subject', 'Hindi', 'Maths', 'English', 'Computer', 'Science', 'Chemistry', 'Physics', 'Sanskrit'].map(
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
