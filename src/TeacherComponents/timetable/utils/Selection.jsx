import React, { useState } from 'react'


function Selection({ onSearch, onDayChange }) {
    const [day, setDay] = useState('');

    const handleDayChange = (event) => {
        const value = event.target.value;
        setDay(value);
        onDayChange(value);
    };

    return (
        <div className="w-1/4">
            <select
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Day"
                value={day}
                onChange={handleDayChange}
            >
                <option value="">Select Day</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>

            </select>
        </div>
    )
}

export default Selection