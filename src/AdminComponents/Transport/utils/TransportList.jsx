import React, { useState } from "react";
import SearchBar from "./SearchBar";
import TransportDetails from "./TransportDetails";

export default function TransportList(){
    const [route,setRoute]=useState('');
    const [vehicleNumber,setVehicleNumber]=useState('');
    const handleRouteNumberChange=(e)=>{
        setRoute(e.target.value);
    }
    const handleVehicleNumberChange=(e)=>{
        setVehicleNumber(e.target.value);
    }
    const Lists = [
        { routeName: 'Sector 54', vehicleNumber: "UP14090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989"},
        { routeName: 'noida 54', vehicleNumber: "UP15090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989"},
        { routeName: 'meerut 54', vehicleNumber: "UP15090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989"},
        { routeName: 'Sector 54', vehicleNumber: "UP13090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989"},
        { routeName: 'Sector 54', vehicleNumber: "DL15090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989"},
        { routeName: 'Sector 54', vehicleNumber: "UP15090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989"},
        { routeName: 'Sector 54', vehicleNumber: "UP15090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989"},
        { routeName: 'Sector 54', vehicleNumber: "UP15090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989"},
        { routeName: 'Sector 54', vehicleNumber: "UP15090909", driverName: "Arun Kumar", driverLicense: "000347278", contact: "9989898989"},
    ];
   const filteredTransport=Lists.filter(list=>{
    const routeMatch=list.routeName.toLowerCase().includes(route.toLowerCase());
    const vehicleNumberMatch=list.vehicleNumber.toLowerCase().includes(vehicleNumber.toLowerCase());
    return routeMatch && vehicleNumberMatch;
   })

    return(
        <>
        <div className="flex flex-col">
           <div className="flex justify-between mt-2">
              <div><h1 className="text-3xl mx-8 mt-4 mobile:max-tablet:text-xl">All Transport List</h1></div>
              <div><button className="text-xl px-4 mx-8 mt-4 mobile:max-tablet:text-xl mobile:max-tablet:px-2 rounded-lg bg-blue-400 hover:bg-blue-200">Add New Transport</button></div>
           </div>
           <div className="mt-2 mx-2">
            <SearchBar handleRouteNumberChange={handleRouteNumberChange} handleVehicleNumberChange={handleVehicleNumberChange} routeNumber={route} vehicleNumber={vehicleNumber}/>
           </div>
           <div className="mx-2 mobile:max-tablet:mt-0">
            {
                filteredTransport.length===0?(
                    <TransportDetails Lists={Lists}/>
                ):(
                    <TransportDetails Lists={filteredTransport}/>
                )
            }
           
           </div>
        </div>
        </>
    )
}