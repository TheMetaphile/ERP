import React, { useRef, useEffect } from 'react';

export default function TeacherRowContent({ teacherEmail, isClassTeacherAssigned, suggestions, showSuggestions, handleEmailChange, handleAssign, handleSuggestionClick, section }) {
    const inputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                handleSuggestionClick();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleSuggestionClick]);

    return (
        <div className="relative flex" ref={inputRef}>
            <input
                type="email"
                placeholder="Teacher's Email"
                className="w-full px-4 py-2 border rounded-md"
                value={teacherEmail}
                onChange={(e) => handleEmailChange(e, section)}
                disabled={isClassTeacherAssigned === true}
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-40 overflow-y-auto">
                    {suggestions.map((suggestion, idx) => (
                        <li
                            key={idx}
                            className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            <img src={suggestion.profileLink} alt="Profile" className="w-6 h-6 rounded-full mr-2" />
                            {suggestion.email}
                        </li>
                    ))}
                </ul>
            )}
            <button
                className="px-4 py-2 mt-2 bg-green-500 text-white rounded-md"
                onClick={handleAssign}
                disabled={isClassTeacherAssigned === true}
            >
                {isClassTeacherAssigned === true ? 'Assigned' : 'Assign'}
            </button>
        </div>
    );
}
