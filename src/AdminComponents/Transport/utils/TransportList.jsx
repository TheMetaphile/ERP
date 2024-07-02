import React, { useState } from "react";
import SearchBar from "./SearchBar";
import TransportDetails from "./TransportDetails";

export default function TransportList() {
    const [route, setRoute] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const handleRouteNumberChange = (e) => {
        setRoute(e.target.value);
    }
    const handleVehicleNumberChange = (e) => {
        setVehicleNumber(e.target.value);
    }
    const [popUp, setPopUp] = useState(false);
    const handleClick = () => {
        setPopUp(!popUp);
    }
    const handleClosePopup = () => {
        setPopUp(false);
    }
    const [newRoute, setNewRouteName] = useState('');
    const [newVehicleNumber, setNewVehicleNumber] = useState(['']);
    const [newDriverName, setNewDriverName] = useState('');
    const [newDriverLicense, setNewDriverLicense] = useState('');
    const [newContact, setNewContact] = useState('');
    // Handle form submission, e.g., send data to backend
    const handleSubmit = (e) => {
        e.preventDefault();
        const newTransport = {
            routeName: newRoute,
            vehicleNumber: newVehicleNumber,
            driverName: newDriverName,
            driverLicense: newDriverLicense,
            contact: newContact,
        };
        const updatedTransportList = [...Lists, newTransport];
        setLists(updatedTransportList);
        setNewRouteName('');
        setNewVehicleNumber('');
        setNewDriverName('');
        setNewDriverLicense('');
        setNewContact('');
        setPopUp(false);
    };
    const [Lists, setLists] = useState([
        { routeName: 'Sector 54', vehicleNumber: "UP14090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989" },
        { routeName: 'noida 54', vehicleNumber: "UP15090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989" },
        { routeName: 'meerut 54', vehicleNumber: "UP15090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989" },
        { routeName: 'Sector 54', vehicleNumber: "UP13090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989" },
        { routeName: 'Sector 54', vehicleNumber: "DL15090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989" },
        { routeName: 'Sector 54', vehicleNumber: "UP15090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989" },
        { routeName: 'Sector 54', vehicleNumber: "UP15090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989" },
        { routeName: 'Sector 54', vehicleNumber: "UP15090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989" },
        { routeName: 'Sector 54', vehicleNumber: "UP15090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989" },
    ]);
    //    const filteredTransport=Lists.filter(list=>{
    //     const routeMatch=list.routeName.toLowerCase().includes(route.toLowerCase());
    //     const vehicleNumberMatch=list.vehicleNumber.toLowerCase().includes(vehicleNumber.toLowerCase());
    //     return routeMatch && vehicleNumberMatch;
    //    })
    const filteredTransport = Lists.filter(list => {
        const routeMatch = list.routeName && typeof list.routeName === 'string' && list.routeName.toLowerCase().includes(route.toLowerCase());
        const vehicleNumberMatch = list.vehicleNumber && typeof list.vehicleNumber === 'string' && list.vehicleNumber.toLowerCase().includes(vehicleNumber.toLowerCase());
        return routeMatch && vehicleNumberMatch;
    });


    return (
        <>
            <div className="flex flex-col">
                <div className="flex justify-between mt-2 mobile:max-tablet:flex-col">
                    <div><h1 className="text-3xl mobile:max-tablet:mx-4 mx-8 mt-4 mobile:max-tablet:text-xl whitespace-nowrap ">All Transport List</h1></div>
                    <div><button className="text-2xl px-4 mobile:max-tablet:mx-4 mx-8 mt-4 mobile:max-tablet:text-xl rounded-lg bg-blue-400 hover:bg-blue-200" onClick={handleClick}>Add New Transport</button></div>
                </div>
                <div className="mt-2 mx-2">
                    <SearchBar handleRouteNumberChange={handleRouteNumberChange} handleVehicleNumberChange={handleVehicleNumberChange} routeNumber={route} vehicleNumber={vehicleNumber} />
                </div>
                <div className="mx-2 mobile:max-tablet:mt-0">
                    {
                        filteredTransport.length === 0 ? (
                            <TransportDetails Lists={Lists} />
                        ) : (
                            <TransportDetails Lists={filteredTransport} />
                        )
                    }

                </div>
                {popUp && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                        <div className="bg-white rounded-lg p-6 w-1/4 mt-10">
                            <h1 className="text-xl mb-4">Add New Transport</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="routeName" className="block text-sm font-medium text-gray-700">Route Name:</label>
                                    <input
                                        id="routeName"
                                        name="routeName"
                                        type="text"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={newRoute}
                                        onChange={(e) => setNewRouteName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700">Vehicle Number:</label>
                                    <input
                                        id="vehicleNumber"
                                        name="vehicleNumber"
                                        type="text"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={newVehicleNumber}
                                        onChange={(e) => setNewVehicleNumber(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="driverName" className="block text-sm font-medium text-gray-700">Driver's Name:</label>
                                    <input
                                        id="driverName"
                                        name="driverName"
                                        type="text"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={newDriverName}
                                        onChange={(e) => setNewDriverName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="driverLicense" className="block text-sm font-medium text-gray-700">Driver's License:</label>
                                    <input
                                        id="driverLicense"
                                        name="driverLicense"
                                        type="text"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={newDriverLicense}
                                        onChange={(e) => setNewDriverLicense(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact:</label>
                                    <input
                                        id="contact"
                                        name="contact"
                                        type="text"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={newContact}
                                        onChange={(e) => setNewContact(e.target.value)}
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleSubmit}>Submit</button>
                                    <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleClosePopup}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>


                )
                }
            </div>
        </>
    )
}