import React, { useState } from 'react'


function Selection({  onSearch, onDayChange }) {
    const [day, setDay] = useState('');

    const handleDayChange = (event) => {
        const value = event.target.value;
        setDay(value);
        onDayChange(value);
    };

    return (
        <div className="border rounded-lg shadow-md w-full flex flex-col px-3 mobile:max-tablet:px-0  overflow-y-auto items-start mt-2  mb-3 no-scrollbar">
            <div className="container p-3">
                <div className="flex justify-between">
                    
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
                            <option value="tuesday">Tuesady</option>
                            <option value="wednesday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                            <option value="saturday">Saturday</option>
                            <option value="sunday">Sunday</option>
  
                            </select>
                    </div>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={onSearch}>
                        Search
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Selection