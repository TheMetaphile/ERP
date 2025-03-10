import React, { useState, useContext } from "react";
import { userimg } from "./images/index.js";
import { BASE_URL } from "../../../Config.js";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext.jsx";
import { toast } from "react-toastify";
import { MdEmail, MdOutlineSecurity } from "react-icons/md";
import { Link } from "react-router-dom";


export default function SubAdminCard({ userData, setUserData }) {
    const { authState } = useContext(AuthContext);
    console.log(userData);
    const [permission, setPermission] = useState(false);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const availablePermissions = ["Exam", "Certificate", "Result", "Student Fees", "Student Registration", "Teacher Registration", "SubAdmin Registration", "Readmission", "New Admission", "New Section", "Assign Subject",
        "Time Table", "Assign Coordinator", "Substitute Coordinator", "ClassTeacher Substitute", "Lecture Substitute", "Access Control", "Custom Registration Builder", "Template","Subject Management", "Subject Allocate",
        "Terminate Students", "Student Details", "Student Details Edit"
    ];


    const handlePermission = async (userId) => {
        const user = userData.filter((user) => user._id === userId);
        setSelectedUserId(user[0]);

        setSelectedPermissions(user[0]?.permissions || []);
        setPermission(true);
    };

    const handlePermissionChange = (perm) => {
        setSelectedPermissions((prevPermissions) =>
            prevPermissions.includes(perm)
                ? prevPermissions.filter((p) => p !== perm)
                : [...prevPermissions, perm]
        );
    };

    const handleSave = async () => {
        try {
            const formattedPermissions = selectedPermissions.map(perm => perm);
            const response = await axios.post(`${BASE_URL}/permission/update/subAdmin/${selectedUserId._id}`,
                { permissions: formattedPermissions },
                {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`
                    }
                }
            );

            if (response.status === 200) {
                const updatedUserData = userData.map(user =>
                    user._id === selectedUserId._id ? { ...user, permissions: formattedPermissions } : user
                );

                setUserData(updatedUserData);
                toast.success('Permissions updated successfully!');
                setPermission(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.error || "Failed to update Permission")
            console.error("Error updating permissions:", error);
        }
    };

    const handleCancelPermission = () => {
        setPermission(false);
    };

    return (
        <div className="my-2">
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-blue-200">
                        <th className="border p-2">Profile</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Access</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user, index) => (
                        <tr key={user._id || index} className="hover:bg-blue-50 transition-colors duration-150">
                            <td className="border p-2 text-center">
                                <img src={user.profileLogo || userimg} alt={`${user.name}'s profile`} className="h-16 w-16 rounded-full mx-auto" />
                            </td>
                            <td className="p-4">
                                <Link
                                    to={`/Admin-Dashboard/SubAdmin/Profile/${user._id}`}
                                    className="font-medium text-blue-700 hover:text-blue-900 transition-colors duration-150 text-lg block"
                                >
                                    {user.name}
                                </Link>
                            </td>

                            <td className="p-4">
                                <div className="flex items-center">
                                    <MdEmail className="text-gray-400 mr-2" />
                                    <span className="text-gray-700">{user.email}</span>
                                </div>
                            </td>

                            <td className="p-4">
                                <div className="flex flex-wrap gap-2">
                                    {(user.permissions || []).map((permission, i) => (
                                        <span
                                            key={i}
                                            className="bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-full px-3 py-1 text-xs font-medium shadow-sm"
                                        >
                                            {permission}
                                        </span>
                                    ))}
                                </div>
                            </td>

                            <td className="p-4">
                                <button
                                    className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 group"
                                    onClick={() => handlePermission(user._id)}
                                >
                                    <MdOutlineSecurity className="mr-2 group-hover:animate-pulse" />
                                    <span>Permissions</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            {permission && (
                <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center p-4 z-50 transition-opacity duration-300 ease-in-out">
                    <div className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-4/5 max-w-5xl h-4/5 transform transition-all duration-300 scale-100 flex flex-col overflow-hidden">
                        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-4 md:p-6 lg:p-8 text-white">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold flex items-center">
                                <MdOutlineSecurity className="mr-2 group-hover:animate-pulse" />
                                Manage Permissions
                            </h2>
                            <p className="mt-1 md:mt-2 text-blue-100 text-sm md:text-base lg:text-lg">
                                Configuring access for <span className="font-bold underline decoration-2 decoration-blue-300">{selectedUserId.name}</span>
                            </p>

                            <div className="absolute -bottom-6 md:-bottom-8 lg:-bottom-10 left-0 right-0 h-6 md:h-8 lg:h-10 bg-white rounded-t-3xl"></div>
                        </div>

                        <div className="flex-grow p-4 md:p-6 lg:p-8 pt-2 md:pt-3 lg:pt-4 overflow-y-auto mt-4">


                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                                {availablePermissions.map((perm) => {
                                    const isSelected = selectedPermissions.includes(perm);
                                    return (
                                        <label
                                            key={perm}
                                            className={`flex items-center p-3 md:p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${isSelected
                                                ? "border-blue-500 bg-blue-50 shadow-sm"
                                                : "border-gray-200 hover:border-blue-300"
                                                }`}
                                        >
                                            <div className="relative flex items-center justify-center">
                                                <input
                                                    type="checkbox"
                                                    value={perm}
                                                    checked={isSelected}
                                                    onChange={() => handlePermissionChange(perm)}
                                                    className="appearance-none w-5 h-5 md:w-6 md:h-6 border-2 rounded-md border-gray-300 checked:border-blue-500 checked:bg-blue-500 transition-all duration-200"
                                                />
                                                <span className="absolute text-white font-bold pointer-events-none  transform  transition-all duration-200 checked:opacity-100 checked:scale-100">
                                                    ✓
                                                </span>
                                            </div>

                                            <div className="ml-3">
                                                <span className={`text-sm md:text-base font-medium ${isSelected ? "text-blue-700" : "text-gray-700"}`}>
                                                    {perm}
                                                </span>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="border-t p-3 md:p-4 lg:p-6 bg-gray-50 rounded-b-xl flex justify-end sm:flex-row items-center gap-3">

                            <div className="flex gap-3 w-full sm:w-auto">
                                <button
                                    onClick={handleCancelPermission}
                                    className="w-full sm:w-auto px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors font-medium flex items-center justify-center"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="flex-1 sm:flex-initial px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:shadow-lg transition-all duration-200 font-medium flex items-center justify-center group"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
