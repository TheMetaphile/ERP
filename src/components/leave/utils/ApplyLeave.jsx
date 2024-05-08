import React from 'react';

export default function ApplyLeave() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-center">Apply Leave</h1>

            <div className="mt-4">
                <label className="block">Leave Type</label>
                <div className="flex items-center mt-2">
                    <input type="radio" id="leaveRadio" name="leavePermission" className="mr-2" />
                    <label htmlFor="leaveRadio" className="mr-4">Leave</label>
                    <input type="radio" id="permissionRadio" name="leavePermission" className="mr-2" />
                    <label htmlFor="permissionRadio">Permission</label>
                </div>

            </div>

            <div className="flex mt-4">
                <div className="mr-8">
                    <label className="block">From Date</label>
                    <input type="text" className="mt-2" />
                </div>
                <div>
                    <label className="block">To Date</label>
                    <input type="text" className="mt-2" />
                </div>
            </div>

            <div className="mt-4">
                <label className="block">Inform To</label>
                <select className="mt-2">
                    <option value="teacher1">Abhishek Sir</option>
                    <option value="teacher2">Preeti Mam</option>
                    <option value="teacher3">Suraj Sir</option>
                </select>
            </div>

            <div className="mt-4">
                <label className="block">Reason</label>
                <input type="text" className="mt-2" />

            </div>

            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Apply</button>
        </div>
    );
}
