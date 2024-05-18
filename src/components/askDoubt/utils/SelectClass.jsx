import React from 'react';

export default function SelectClass({ onSelect }) {
    const handleClassSelect = (event) => {
        const selectedSubject = event.target.value;
        onSelect(selectedSubject);
    };


    return (
        <div className="rounded-lg shadow-md w-30 ">
            <h1 className=" w-fit mt-4 px-2">Select Class</h1>
            <div className="flex justify-center items-center mt-3 text-sm font-medium">
                <select
                    className="mt-2 shadow-md border border-grey-400 rounded-lg p-2 w-full ml-2 mr-2 mb-2"
                    onChange={handleClassSelect}
                >
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(
                        (classes, index) => (
                            <option key={index} value={classes}>
                                {classes}
                            </option>
                        )
                    )}
                </select>
            </div>

        </div>
    );
}

