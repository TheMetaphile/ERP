import React from "react";
import TeacherHeadersCard from "./TeachersHeadersCard.jsx"
import ProfileDetails from "./ProfileDetails.jsx";
import ClassesActivityChart from "./ClassesActivity.jsx";


export default function TeacherProfile() {
    const data = [
        {
            heading: "Rs.18000", description: "Monthly Salary"
        },
        {
            heading: "7.9/10", description: "Average Rating"
        },
        {
            heading: "4 Years", description: "Experience"
        }
    ];
    return (
        <div className="flex flex-col  px-3 my-3 mobile:max-laptop:mt-4">

            <TeacherHeadersCard data={data} />

            <h1 className="text-2xl font-semibold mt-4 mb-2">Basic Details</h1>
            <ProfileDetails />
            <h1 className="text-2xl font-semibold mt-4 mb-2">Classes Activity</h1>


            <div className="h-96 w-full shadow-lg rounded-lg">
                <ClassesActivityChart />
            </div>

        </div>
    )
}