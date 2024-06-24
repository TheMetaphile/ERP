import React, { useState } from 'react';


function Selection({selectClass, selectedSection, onClassChange, onSectionChange,onStudentDayChange, onSearch}) {
    const [day, setDay] = useState('tuesday');
    const handleDayChange = (event) => {
        const value = event.target.value;
        setDay(value);
        onStudentDayChange(value);
    };

    
    return (
        <div className="border rounded-lg shadow-md w-full flex flex-col px-3 mobile:max-tablet:px-0  overflow-y-auto items-start mt-2  mb-3 no-scrollbar">
            <div className="container p-3  ">

                <div className="flex justify-between">
                    <div className="w-1/4">
                        <select className="w-full px-4 py-2 border rounded-md" value={selectClass} onChange={(e)=>onClassChange(e.target.value)}>
                            <option value="">Select Class</option>
                            <option value="Pre-Nursery">Pre-Nursery</option>
                            <option value="Nursery">Nursery</option>
                            <option value="L.K.J">L.K.J</option>
                            <option value="U.K.J">U.K.J</option>
                            <option value="1st">1st</option>
                            <option value="2nd">2nd</option>
                            <option value="3rd">3rd</option>
                            <option value="4th">4th</option>
                            <option value="5th">5th</option>
                            <option value="6th">6th</option>
                            <option value="7th">7th</option>
                            <option value="8th">8th</option>
                            <option value="9th">9th</option>
                            <option value="10th">10th</option>
                            <option value="11th">11th</option>
                            <option value="12th">12th</option>
                        </select>
                    </div>
                    <div className="w-1/4">
                        <select className="w-full px-4 py-2 border rounded-md" value={selectedSection} onChange={(e)=>onSectionChange(e.target.value)}>
                            <option value="">Select Section</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                            <option value="F">F</option>
                            <option value="G">G</option>
                            <option value="H">H</option>
                            <option value="I">I</option>
                        </select>
                    </div>
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

                    <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={onSearch}>
                        Search
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Selection