import React, { useState } from 'react';
import DiseaseTile from './DiseaseTile'
import AddNewDisease from './AddNewDisease';
export default function Disease() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };
    return (
        <div className='ml-3 mr-3  py-3 shadow-md rounded-lg'>
            <div className='grid grid-cols-2 gap-6 '>
                <DiseaseTile disease='Pulse Rate' value='90 Beats per minute' />
                <DiseaseTile disease='Height' value='5.6 (Foot)' />
                <DiseaseTile disease='Blood Pressure' value='120/80 mmHg' />
                <DiseaseTile disease='Weight' value='65 Kg' />
                <DiseaseTile disease='Body Temperature' value='Normal' />



            </div>
            <div className="flex justify-center">
                <button className="px-5 py-1 bg-secondary rounded-lg mb-3 shadow-md" onClick={togglePopup}>+ Add new Record</button>
            </div>
            {isPopupOpen && <AddNewDisease onClose={togglePopup} />}
        </div>
    )
}

