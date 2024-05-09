import React from 'react';

export default function ApplyLeave() {
    return (
        <div className=" flex flex-col items-center p-4 ml-2 mr-2 rounded-lg shadow-md">
            <h1 className="text-center text-lg md:text-xl font-medium">Apply Leave</h1>
            <div className='mt-3 w-full md:w-2/3 lg:w-1/2'>
                <div className="mt-3">
                    <label className="text-sm font-medium">Leave Type</label>
                    <div className="flex items-center mt-2">
                        <input type="radio" id="leaveRadio" name="leavePermission" className="mr-2" />
                        <label htmlFor="leaveRadio" className="text-sm font-medium ">Leave</label>
                        <input type="radio" id="permissionRadio" name="leavePermission" className="mr-2 ml-7" />
                        <label htmlFor="permissionRadio" className='text-sm font-medium'>Permission</label>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row mt-2 md:mt-4 gap-4">
                    <div>
                        <label className="text-sm font-medium">From Date</label>
                        <input type="date" className="mt-2 border border-black rounded-lg w-full md:w-auto" />
                    </div>
                    <div>
                        <label className="text-sm font-medium">To Date</label>
                        <input type="date" className="mt-2 border border-black rounded-lg w-full md:w-auto" />
                    </div>
                </div>

                <div className="mt-3 text-sm font-medium">
                    <label className="block">Inform To</label>
                    <select className="mt-2 shadow-md border border-grey-400 rounded-lg p-2 w-full">
                        <option value="teacher1">Abhishek Sir</option>
                        <option value="teacher2">Preeti Mam</option>
                        <option value="teacher3">Suraj Sir</option>
                    </select>
                </div>

                <div className="mt-2 text-sm font-medium">
                    <label className="block">Reason</label>
                    <input type="text" className="mt-2 border border-black rounded-lg w-full" />
                </div>
            </div>
            <button className="bg-green-400 text-white px-4 py-2 rounded-lg mt-4 mb-1 hover:bg-green-600">Apply</button>
        </div>
    );
}
