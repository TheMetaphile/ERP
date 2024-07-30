import React from 'react';
import { MdAssignmentInd } from "react-icons/md";
import photo from '../../../assets/Shailesh.jpg'

function SubstituteTable({ data }) {
    return (
        <div className="overflow-x-auto w-full">
            <table className="w-full bg-white border rounded-lg shadow-md whitespace-nowrap">
                <thead className="bg-teal-100">
                    <tr>
                        <th className="py-2 px-4 ">Employee Id</th>
                        <th className="py-2 px-4 ">Name</th>
                        <th className="py-2 px-4 ">Date</th>
                        <th className="py-2 px-4 ">Class</th>
                        <th className="py-2 px-4 ">Section</th>
                        <th className="py-2 px-4 ">Substitute</th>
                        <th className="py-2 px-4 ">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr className=' text-center border-b items-center py-2 ' key={item.id}>
                            <td className="py-2 px-4 ">{item.employeeId}</td>
                            <td className="text-center ">
                                {/* <img src={photo} alt={item.name} className="w-10 h-10 rounded-full mr-2" /> */}
                                <p>{item.name}</p>

                            </td>
                            <td className="py-2 px-4  ">{item.date}</td>
                            <td className="py-2 px-4 ">{item.class}</td>
                            <td className="py-2 px-4 ">{item.section}</td>
                            <td className="py-2 px-4  flex items-center justify-center">
                                {item.substitute ? (
                                    <>
                                        <img src={item.substitutePhoto} alt={item.substituteName} className="w-8 h-8 rounded-full mr-2" />
                                        {item.substituteName}
                                    </>
                                ) : (
                                    <input
                                        type="text"
                                        placeholder="Search Teacher"
                                        className="border rounded p-1"
                                    />
                                )}
                            </td>
                            <td className="py-2 px-4  text-center">
                                <button className="bg-blue-500 text-white rounded px-2 py-1">
                                    <MdAssignmentInd />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SubstituteTable;
