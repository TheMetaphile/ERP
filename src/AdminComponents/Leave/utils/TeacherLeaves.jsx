import React, { useState } from "react";
import { userimg } from "../../Teachers/utils/images/index.js";

export default function TeacherLeaves() {
  const leaves = [
    {
      name: "Abhishek",
      class: "5th",
      LeaveTakenOn: "26 February 2023",
      duration: "7 Days",
      expectedArrival: "5 March 2023",
    },
    {
      name: "Abhishek",
      class: "5th",
      LeaveTakenOn: "26 February 2023",
      duration: "7 Days",
      expectedArrival: "5 March 2023",
    },
    {
      name: "Abhishek",
      class: "5th",
      LeaveTakenOn: "26 February 2023",
      duration: "7 Days",
      expectedArrival: "5 March 2023",
    },
    {
      name: "Abhishek",
      class: "5th",
      LeaveTakenOn: "26 February 2023",
      duration: "7 Days",
      expectedArrival: "5 March 2023",
    },
    {
      name: "Abhishek",
      class: "5th",
      LeaveTakenOn: "26 February 2023",
      duration: "7 Days",
      expectedArrival: "5 March 2023",
    },
    {
      name: "Abhishek",
      class: "5th",
      LeaveTakenOn: "26 February 2023",
      duration: "7 Days",
      expectedArrival: "5 March 2023",
    },
    {
      name: "Abhishek",
      class: "5th",
      LeaveTakenOn: "26 February 2023",
      duration: "7 Days",
      expectedArrival: "5 March 2023",
    },
    {
      name: "Abhishek",
      class: "5th",
      LeaveTakenOn: "26 February 2023",
      duration: "7 Days",
      expectedArrival: "5 March 2023",
    },
    {
      name: "Abhishek",
      class: "5th",
      LeaveTakenOn: "26 February 2023",
      duration: "7 Days",
      expectedArrival: "5 March 2023",
    },
    {
      name: "Abhishek",
      class: "5th",
      LeaveTakenOn: "26 February 2023",
      duration: "7 Days",
      expectedArrival: "5 March 2023",
    },
   
  ];

  const [selectedLeave, setSelectedLeave] = useState(null);

  const handleViewDetails = (leave) => {
    setSelectedLeave(leave);
  };

  const handleClosePopup = () => {
    setSelectedLeave(null);
  };

  return (
    <div className="flex flex-col space-y-4 mb-4 bg-teal-300">
      {leaves.map((leave, index) => (
        <div key={index} className={`rounded-md border p-4 flex flex-col w-full`}>
          <div className="flex justify-between">
            <div className="flex">
              <img src={userimg} alt="" className="h-12 w-12 mobile:max-tablet:hidden" />
              <p className="text-xl mb-2 mt-2 px-2  mobile:max-tablet:text-lg">{leave.name}</p>
            </div>
            <div>
              <h1 className="text-xl mt-2  mobile:max-tablet:text-lg mobile:max-tablet:px-2">Class: {leave.class}</h1>
            </div>
            <div className="mt-2">
              <button
                className="rounded-lg bg-blue-400 px-4  mobile:max-tablet:px-2"
                onClick={() => handleViewDetails(leave)}
              >
                View Details
              </button>
            </div>
          </div>
          <div className="flex justify-between text-gray-900  mobile:max-tablet:flex-col">
            <span className="text-lg">Leave Taken on: {leave.LeaveTakenOn}</span>
            <span className="text-lg">Duration: {leave.duration}</span>
            <span className="text-lg">Expected Arrival: {leave.expectedArrival}</span>
          </div>
        </div>
      ))}

      {selectedLeave && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white rounded-lg p-6 items-center">
            <h2 className="text-2xl mb-4 text-center">Confirm Leave</h2>
            <p className="text-xl">Name of Student: {selectedLeave.name}</p>
            <p className="text-xl">Duration: {selectedLeave.duration}</p>
            <p className="text-xl">Class: {selectedLeave.class}</p>
            <p className="text-xl">Reason for Leave: Illness due to lack of vitamin E in the body</p>
            <div className="mt-4 flex justify-center">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={handleClosePopup}
              >
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}