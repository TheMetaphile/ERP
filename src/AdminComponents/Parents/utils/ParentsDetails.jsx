import React from "react";
import logo from "../../../assets/logo.png";

export default function ParentsDetails() {
  const parentDetails = [
    {
      title: "Father",
      name: "Arun Kumar",
      phone: "+91-9898989898",
      dob: "12-03-2020",
      occupation: "Business",
      email: "a123@gmail.com",
      address: "Sector 12 Noida",
      childName: "Aru(III-A)",
      religion: "Hindu"
    },
    {
      title: "Mother",
      name: "Sakshi",
      phone: "+91-9876543210",
      dob: "01-01-1990",
      occupation: "Homemaker",
      email: "a123@gmail.com",
      address: "Sector 12 Noida",
      childName: "Aru(III-A)",
      religion: "Hindu"
    }
  ];
  const guardianDetail = [
    {
      title: "Guardian",
      name: "Ram Kumar",
      phone: "+91-9898989898",
      dob: "12-03-2020",
      occupation: "Business",
      email: "a123@gmail.com",
      address: "Sector 12 Noida",
      childName: "Aru(III-A)",
      religion: "Hindu"
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center gap-20 mt-8 mobile:max-tablet:gap-0 mobile:max-tablet:flex-col">
        {parentDetails.map((parent, index) => (
          <div className="rounded-md shadow-lg p-4 w-1/2 mx-2 mobile:max-tablet:w-full bg-secondary" key={index}>
            <div className="flex justify-between">
              <h1 className="text-2xl">{parent.title} Details</h1>
              <button className="text-xl">Edit</button>
            </div>
            <div className="flex flex-col mt-4">
              <div className="flex items-center flex-col">
                <img src={logo} alt="" className="h-28 w-28" />
                <p className="ml-2 text-2xl">{parent.name}</p>
              </div>
              <div className="flex items-center mt-4 justify-between">
                <h1 className="text-xl">Phone Number</h1>
                <p className="text-xl text-gray-600">{parent.phone}</p>
              </div>
              <div className="flex items-center justify-between">
                <h1 className="text-xl">Date Of Birth</h1>
                <p className="text-xl text-gray-600">{parent.dob}</p>
              </div>
              <div className="flex items-center justify-between">
                <h1 className="text-xl">Occupation</h1>
                <p className="text-xl text-gray-600">{parent.occupation}</p>
              </div>
              <div className="flex items-center justify-between">
                <h1 className="text-xl">Email</h1>
                <p className="text-xl text-gray-600">{parent.email}</p>
              </div>
              <div className="flex items-center justify-between">
                <h1 className="text-xl">Address</h1>
                <p className="text-xl text-gray-600">{parent.address}</p>
              </div>
              <div className="flex items-center justify-between">
                <h1 className="text-xl">Child's Name</h1>
                <p className="text-xl text-gray-600">{parent.childName}</p>
              </div>
              <div className="flex items-center justify-between">
                <h1 className="text-xl">Religion</h1>
                <p className="text-xl text-gray-600">{parent.religion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-4 flex-col mx-2">
        {guardianDetail.map((guardian, index) => (
          <div className="flex flex-col rounded-md shadow-lg p-4 w-full mx-auto mobile:max-tablet:w-full bg-secondary" key={index}>
            <div className="flex justify-between">
              <h1 className="text-2xl">{guardian.title} Details</h1>
              <button className="text-xl">Edit</button>
            </div>
            <div className="flex gap-20 mt-4  mobile:max-tablet:flex-col mobile:max-tablet:gap-0">
              <div className="flex items-center flex-col">
                <img src={logo} alt="" className="h-28 w-28" />
                <p className="ml-2 text-2xl">{guardian.name}</p>
              </div>
              <div className="w-2/3  mobile:max-tablet:w-full">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl">Phone Number</h1>
                  <p className="text-xl text-gray-600">{guardian.phone}</p>
                </div>
                <div className="flex items-center justify-between">
                  <h1 className="text-xl">Date Of Birth</h1>
                  <p className="text-xl text-gray-600">{guardian.dob}</p>
                </div>
                <div className="flex items-center justify-between">
                  <h1 className="text-xl">Occupation</h1>
                  <p className="text-xl text-gray-600">{guardian.occupation}</p>
                </div>
                <div className="flex items-center justify-between">
                  <h1 className="text-xl">Email</h1>
                  <p className="text-xl text-gray-600">{guardian.email}</p>
                </div>
                <div className="flex items-center justify-between">
                  <h1 className="text-xl">Address</h1>
                  <p className="text-xl text-gray-600">{guardian.address}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex w-3/4 rounded-lg mb-8 justify-end mt-4 mx-auto">
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 mobile:max-tablet:w-1/2"
        type="submit"
      >
        Save
      </button>
      </div>
      </div>
    </div>
  );
}
