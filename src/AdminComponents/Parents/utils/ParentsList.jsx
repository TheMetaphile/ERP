import React from "react";
import { Link } from "react-router-dom";

export default function ParentsList(){
    const details = [
        { child:'Alice', father: "Arjun", mother: "Sakshi", contact: "+91-989898989",email: "a123@gmail.com"},
        { child:'Alice', father: "Arjun", mother: "Sakshi", contact: "+91-989898989",email: "a123@gmail.com"},
        { child:'Alice', father: "Arjun", mother: "Sakshi", contact: "+91-989898989",email: "a123@gmail.com"},
        { child:'Alice', father: "Arjun", mother: "Sakshi", contact: "+91-989898989",email: "a123@gmail.com"},
        { child:'Alice', father: "Arjun", mother: "Sakshi", contact: "+91-989898989",email: "a123@gmail.com"},
        { child:'Alice', father: "Arjun", mother: "Sakshi", contact: "+91-989898989",email: "a123@gmail.com"},
        { child:'Alice', father: "Arjun", mother: "Sakshi", contact: "+91-989898989",email: "a123@gmail.com"},
        { child:'Alice', father: "Arjun", mother: "Sakshi", contact: "+91-989898989",email: "a123@gmail.com"},
        { child:'Alice', father: "Arjun", mother: "Sakshi", contact: "+91-989898989",email: "a123@gmail.com"},
        { child:'Alice', father: "Arjun", mother: "Sakshi", contact: "+91-989898989",email: "a123@gmail.com"},
        { child:'Alice', father: "Arjun", mother: "Sakshi", contact: "+91-989898989",email: "a123@gmail.com"},
        { child:'Alice', father: "Arjun", mother: "Sakshi", contact: "+91-989898989",email: "a123@gmail.com"},
    ];
    return(
    <div className="overflow-x-auto w-full mt-8 mb-4">
    <table className="min-w-full divide-y divide-gray-600">
        <thead>
            <tr>
                <th className="px-6 py-3 text-center text-2xl font-normal border-r">Child</th>
                <th className="px-6 py-3 text-center text-2xl font-normal border-r">Father</th>
                <th className="px-6 py-3 text-center text-2xl font-normal border-r">Mother</th>
                <th className="px-6 py-3 text-center text-2xl font-normal border-r">Contact No</th>
                <th className="px-6 py-3 text-center text-2xl font-normal border-r">Email</th>
            </tr>
        </thead>
        <tbody className="bg-white">
            {details.map((detail, index) => (
                <tr key={index}>
                    <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">
                        <Link to={``} className="block">{detail.child}</Link>
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">
                        <Link to={``} className="block">{detail.father}</Link>
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">
                        <Link to={``} className="block">{detail.mother}</Link>
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">
                        <Link to={``} className="block">{detail.contact}</Link>
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">
                        <Link to={``} className="block">{detail.email}</Link>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>


    )
}