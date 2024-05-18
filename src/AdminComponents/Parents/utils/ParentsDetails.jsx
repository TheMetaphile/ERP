import React from "react";
import logo from "../../../assets/logo.png";

export default function ParentsDetails() {
  const parentDetails = [
    {
      childName: "Aru(III-A)",
      fatherName: "Arun Kumar",
      motherName: "Sakshi",
      phone: "+91-9898989898",
      dob: "12-03-2020",
      occupation: "Business",
      email: "a123@gmail.com",
      address: "Sector 12 Noida",
    },
  ];
  
  const guardianDetail = [
    {
      name: "Ram Kumar",
      phone: "+91-9898989898",
      dob: "12-03-2020",
      occupation: "Business",
      email: "a123@gmail.com",
      address: "Sector 12 Noida",
    },
  ];

  const colors = ['bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-purple-200'];

  return (
    <div className="flex flex-col w-full p-8">
      <div className="flex flex-wrap gap-8 w-full justify-center">
        {parentDetails.map((parent, index) => (
          <div
            className={`rounded-md shadow-lg p-6 w-full max-w-md ${colors[index % colors.length]}`}
            key={index}
          >
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl">Parents Details</h1>
              <button className="text-xl rounded-lg border px-4 py-2 bg-blue-400">Edit</button>
            </div>
            <div className="flex flex-col items-center">
              <img src={logo} alt="Logo" className="h-28 w-28 mb-4" />
              <p className="text-2xl mb-4">{parent.fatherName}</p>
              <div className="w-full">
                {Object.keys(parent).map((key) => (
                  key !== "fatherName" && (
                    <div className="flex items-center justify-between mb-2" key={key}>
                      <h1 className="text-xl capitalize">{key.split(/(?=[A-Z])/).join(' ')}</h1>
                      <p className="text-xl text-gray-600">{parent[key]}</p>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        ))}

        {guardianDetail.map((guardian, index) => (
          <div
            className={`rounded-md shadow-lg p-6 w-full max-w-md ${colors[index % colors.length]}`}
            key={index}
          >
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl">Guardian's Details</h1>
              <button className="text-xl rounded-lg border px-4 py-2 bg-blue-400">Edit</button>
            </div>
            <div className="flex flex-col items-center">
              <img src={logo} alt="Logo" className="h-28 w-28 mb-4" />
              <p className="text-2xl mb-4">{guardian.name}</p>
              <div className="w-full">
                {Object.keys(guardian).map((key) => (
                  key !== "name" && (
                    <div className="flex items-center justify-between mb-2" key={key}>
                      <h1 className="text-xl capitalize">{key.split(/(?=[A-Z])/).join(' ')}</h1>
                      <p className="text-xl text-gray-600">{guardian[key]}</p>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded w-80"
          type="submit"
        >
          Save
        </button>
      </div>
    </div>
  );
}
