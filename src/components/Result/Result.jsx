import React, { useState, useEffect, useContext } from 'react'
import InfoCard from "./utils/InfoCard";
import profile from './../../assets/Test Account.png'
import Attendance from "./utils/Attendance";
import Performance from "./utils/Performance";
import AuthContext from '../../Context/AuthContext';

export default function Result() {
    const { authState } = useContext(AuthContext);

    const handlePrint = () => {
        window.print();
    };
    return (
        <div className="flex flex-col w-full h-screen overflow-y-auto items-start mt-2 px-2 no-scrollbar">
            <h3 className="text-xl font-medium">Result</h3>
            <InfoCard
                class={authState.userDetails.currentClass}
                name={authState.userDetails.name}
                profileImg={authState.userDetails.profileLink}
                rollnumber={authState.userDetails.rollNumber}
                dob={authState.userDetails.DOB}
                bloodgroup={authState.userDetails.bloodGroup}
                contactno={authState.userDetails.fatherPhoneNumber}
                father={authState.userDetails.fatherName}
                mother={authState.userDetails.motherName}
                section={authState.userDetails.section}
            />
            <Attendance term={[{ total: "249", attendance: "235" }, { total: "100", attendance: "72" }]} />
            <Performance />
            <div className="text-xl font-medium my-3 bg-gradient-to-r from-blue-200 to-blue-100 text-black self-center rounded-lg shadow-md py-1 px-3 mt-3 hover:bg-blue-400 cursor-pointer hover:text-white" onClick={handlePrint}>
                Download
            </div>
        </div>
    )
}