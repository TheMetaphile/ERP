import React from 'react';

export default function ApplyLeave() {
    return (
        <div className=" flex flex-col items-center p-4 ml-2 mr-2 rounded-lg shadow-md">
            <h1 className="text-center text-lg md:text-xl font-medium">Apply Leave</h1>
            <div className='mt-3 w-full md:w-2/3 lg:w-1/2'>


                <div className="flex flex-row mobile:max-laptop:flex-col  mt-2  gap-4">
                    <div>
                        <div>
                            <label className="text-sm font-medium">From Date</label>
                            <input type="date" className="mt-2 border border-black rounded-lg w-full md:w-auto" />
                        </div>
                        <div className='mt-3'>
                            <label className="text-sm font-medium">To Date</label>
                            <input type="date" className="mt-2 border border-black rounded-lg w-full md:w-auto" />
                        </div>
                        <div className="mt-3 text-sm font-medium">
                            <label className="block">Inform To</label>
                            <select className="mt-2 shadow-md border border-grey-400 rounded-lg p-2 w-full">
                                <option value="teacher1">Abhishek Sir</option>
                                <option value="teacher2">Preeti Mam</option>
                                <option value="teacher3">Suraj Sir</option>
                            </select>
                        </div>
                    </div>
                    <div className=" text-sm font-medium">
                        <label className="block">Reason</label>
                        <textarea className="mt-2 border border-black rounded-lg w-full" rows={9}></textarea>
                    </div>
                </div>




            </div>
            <button className="bg-green-400 text-white px-4 py-2 rounded-lg mt-4 mb-1 hover:bg-green-600">Apply</button>
        </div>
    );
}
