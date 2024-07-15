import React from 'react';
import { Link } from "react-router-dom";




const Certificates = () => {
    const data = [
        { sNo: 1, tcNo: 20, tcDate: '16/04/2024', admissionNo: 2484, name: 'Abhishek', class: "Xth 'A'" },
        { sNo: 2, tcNo: 21, tcDate: '16/04/2024', admissionNo: 4020, name: 'Shailesh', class: "Xth 'A'" },
        { sNo: 3, tcNo: 23, tcDate: '16/04/2024', admissionNo: 3519, name: 'Abhishek', class: "Xth 'A'" },
        { sNo: 4, tcNo: 16, tcDate: '16/04/2024', admissionNo: 3518, name: 'Abhishek', class: "Xth 'A'" },
        { sNo: 5, tcNo: 17, tcDate: '16/04/2024', admissionNo: 4066, name: 'Abhishek', class: "Xth 'A'" },
        { sNo: 6, tcNo: 18, tcDate: '16/04/2024', admissionNo: 4067, name: 'Abhishek', class: "Xth 'A'" },
        { sNo: 7, tcNo: 12, tcDate: '16/04/2024', admissionNo: 4190, name: 'Ashutosh', class: "Xth 'A'" },
        { sNo: 8, tcNo: 10, tcDate: '16/04/2024', admissionNo: 3940, name: 'Abhishek', class: "Xth 'A'" },
        { sNo: 9, tcNo: 14, tcDate: '16/04/2024', admissionNo: 3959, name: 'Abhishek', class: "Xth 'A'" },
        { sNo: 10, tcNo: 13, tcDate: '16/04/2024', admissionNo: 3880, name: 'Shubham', class: "Xth 'A'" },
        { sNo: 11, tcNo: 11, tcDate: '16/04/2024', admissionNo: 3879, name: 'Abhishek', class: "Xth 'A'" },
        { sNo: 12, tcNo: 6, tcDate: '16/04/2024', admissionNo: 4200, name: 'Abhishek', class: "Xth 'A'" }
    ];

    return (
        <div className=" mx-auto p-4">
            <h1 className='text-3xl mobile:max-tablet:text-2xl py-2'>Certificates</h1>
            <div className="overflow-x-auto border-1 rounded-lg">
                <table className="table w-full border-2">
                    <thead className=" bg-purple-200">
                        <tr className="border border-gray-300 table-row whitespace-nowrap rounded-md ">
                            <th className=" font-normal mobile:max-laptop:text-base text-xl p-2">S.No.</th>
                            <th className=" font-normal mobile:max-laptop:text-base text-xl p-2">TC No</th>
                            <th className=" font-normal mobile:max-laptop:text-base text-xl p-2">TC Date</th>
                            <th className=" font-normal mobile:max-laptop:text-base text-xl p-2">Admission No</th>
                            <th className=" font-normal mobile:max-laptop:text-base text-xl p-2">Name</th>
                            <th className=" font-normal mobile:max-laptop:text-base text-xl p-2">Class</th>
                            <th className=" font-normal mobile:max-laptop:text-base text-xl p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody className=" table-row-group">
                        {data.map((item, index) => (
                            <tr key={index} className="border border-gray-300 text-center">
                                <td className=" p-2">{item.sNo}</td>
                                <td className=" p-2">{item.tcNo}</td>
                                <td className=" p-2">{item.tcDate}</td>
                                <td className=" p-2">{item.admissionNo}</td>
                                <td className=" p-2">{item.name}</td>
                                <td className=" p-2 whitespace-nowrap">{item.class}</td>
                                <td className=" p-2 whitespace-nowrap">
                                    <Link to={`/Admin-Dashboard/Certificates/${item.name}`} key={index}>
                                        <button className="bg-purple-100 text-purple-500 px-2 py-0.5 mr-2 rounded">CC</button>
                                    </Link>
                                    <Link to={`/Admin-Dashboard/Certificates/${item.tcNo}`} key={index}>
                                        <button className="bg-purple-100 text-purple-500 px-2 py-0.5 mr-2 rounded">TC</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Certificates;
