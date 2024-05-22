import React from "react";
import { userimg } from "./images/index.js"
import { Link } from "react-router-dom";

export default function TeacherCard({ userData }) {
    return (
        <div className="mx-3">
            {userData.map((user, index) => (
                <div key={user._id || index} className="flex mobile:max-tablet:flex-col mobile:max-tablet:gap-2 items-center justify-between border rounded-lg p-4 mb-2">

                    <div className="flex w-72">
                        <img src={user.profileLogo || userimg} alt="" className="h-16 w-16 mr-3" />

                        <div className="mt-2 flex flex-col items-center">
                            <h1 className="text-xl font-semibold">{user.name}</h1>
                            <p className="text-gray-400">{user.role || 'Teacher'}</p>
                        </div>
                    </div>
                    <div className="flex gap-4 mt-2">
                        {(user.subjects || []).map((subject, i) => (
                            <h1 key={i} className="bg-green-200 rounded-md px-2">{subject.subject}</h1>
                        ))}
                    </div>
                    <div className="flex mt-4 gap-2 mb-4">
                        <div className="flex gap-2 items-center bg-blue-300 mx-2 w-30 justify-evenly rounded-md px-4">
                            <img src={user.profileLogo || userimg} alt="" style={{ height: 16 }} />
                            <button className="text-white">
                                <Link to={{
                                    pathname: "/Admin-Dashboard/Teachers/profile",
                                    userData:{userData}
                                }}>Profile</Link></button>
                        </div>
                        <div className="flex gap-2 items-center bg-blue-300 mx-2 w-20 justify-evenly rounded-md px-2">
                            <img src={user.chatLogo} alt="" style={{ height: 16 }} />
                            <button className="text-white">Chat</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}