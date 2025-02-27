import React from "react";
import TransactionField from "./TransactionField.jsx";

export default function TransactionRow({ selectedStudent, data, setData }) {

    return (
        <div className="w-full h-fit mb-4 shadow-md rounded-lg border border-gray-300   overflow-x-auto no-scrollbar">

            {data.length === 0 ? (
                <div className='text-center'>No data available</div>
            ) : (
                <div>
                    <TransactionField data={data} selectedStudent={selectedStudent} setData={setData} />
                </div>
            )}

        </div>
    );
}
