import React from "react";
import TransactionField from "./TransactionField.jsx";

export default function TransactionRow({ selectedStudent, data, setData, darkMode }) {

    return (
        <div className={`w-full h-fit mb-4 rounded-lg overflow-x-auto no-scrollbar shadow-md ${darkMode
            ? 'bg-gray-800 border-gray-700'
            : 'border border-gray-300 bg-white'
            }`}>
            {data.length === 0 ? (
                <div className={`text-center p-4 ${darkMode
                    ? 'text-gray-400'
                    : 'text-gray-500'
                    }`}>
                    No data available
                </div>
            ) : (
                <div>
                    <TransactionField
                        data={data}
                        selectedStudent={selectedStudent}
                        setData={setData}
                    />
                </div>
            )}
        </div>
    );
}
