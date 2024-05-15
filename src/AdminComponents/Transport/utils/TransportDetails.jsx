import React from "react";

export default function TransportDetails(){
    const Lists = [
        { routeName: 'Sector 54', vehicleNumber: "UP15090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989"},
        { routeName: 'Sector 54', vehicleNumber: "UP15090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989"},
        { routeName: 'Sector 54', vehicleNumber: "UP15090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989"},
        { routeName: 'Sector 54', vehicleNumber: "UP15090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989"},
        { routeName: 'Sector 54', vehicleNumber: "UP15090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989"},
        { routeName: 'Sector 54', vehicleNumber: "UP15090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989"},
        { routeName: 'Sector 54', vehicleNumber: "UP15090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989"},
        { routeName: 'Sector 54', vehicleNumber: "UP15090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989"},
        { routeName: 'Sector 54', vehicleNumber: "UP15090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989"},
    ];
    return(
        <div className="overflow-x-auto w-full mt-8 rounded-lg shadow-lg mb-4 mobile:max-tablet:mt-2">
            <table className="min-w-full divide-y divide-gray-600 rounded-md">
                <thead className="">
                    <tr>
                        <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Route Name</th>
                        <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Vehicle Number</th>
                        <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Driver Name</th>
                        <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Driver License</th>
                        <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Contact</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {Lists.map((list, index) => (
                        <tr key={index}>
                            <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{list.routeName}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{list.vehicleNumber}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{list.driverName}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{list.driverLicense}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{list.contact}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}