import React, { useState, useContext } from "react";
import { userimg } from "./images/index.js";
import { BASE_URL } from "../../../Config.js";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext.jsx";
import { toast } from "react-toastify";
import { MdOutlineSecurity } from "react-icons/md";

export default function SubAdminCard({ userData, setUserData }) {
    const { authState } = useContext(AuthContext);

    const [permission, setPermission] = useState(false);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const availablePermissions = ["Exam", "Certificate", "Result", "Fee", "Student Registration", "Teacher Registeration", "SubAdmin Registration", "Readmission", "New Admission", "New Section", "Assign Subject",
        "Time Table", "Assign Coordinator", "Substitute Coordinator", "ClassTeacher Substitute", "Lecture Substitute"
    ];


    const handlePermission = async (userId) => {
        setSelectedUserId(userId);

        try {
            const response = await axios.get(`${BASE_URL}/permission/fetch/subAdmin/${userId}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });

            if (response.status === 200) {
                const extractedPermissions = response.data.permissions.map(p => p.permission);
                setSelectedPermissions(response.data.permissions);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error while getting Permission")
            console.error("Error fetching permissions:", error);
        }
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
            const response = await axios.post(`${BASE_URL}/permission/update/subAdmin/${selectedUserId}`,
                { permissions: formattedPermissions },
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                }
            );

            if (response.status === 200) {
                const updatedUserData = userData.map(user =>
                    user._id === selectedUserId ? { ...user, permissions: formattedPermissions } : user
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
                    <tr className="bg-purple-200">
                        <th className="border p-2">Profile</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Access</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user, index) => (
                        <tr key={user._id || index} className="border">
                            <td className="border p-2 text-center">
                                <img src={user.profileLogo || userimg} alt="" className="h-16 w-16 rounded-full mx-auto" />
                            </td>
                            <td className="border p-2 text-center">{user.name}</td>
                            <td className="border p-2 text-center">{user.email}</td>
                            <td className="border p-2 text-center">
                                <div className="grid grid-cols-3 gap-2">
                                    {(user.permissions || []).map((permission, i) => (
                                        <span key={i} className="bg-blue-200 rounded-md px-2 py-1 text-sm text-center">
                                            {permission}
                                        </span>
                                    ))}
                                </div>
                            </td>
                            <td className="border p-2 text-center">
                                <div className="flex flex-wrap justify-center gap-2">
                                    <button
                                        className="flex items-center bg-blue-300 text-white px-2 py-1 rounded-md"
                                        onClick={() => handlePermission(user._id)}
                                    >
                                        <MdOutlineSecurity className="mr-1" /> Permissions
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            {permission && (
                <div className="mt-2 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-2xl w-4/5 transform transition-all">
                        <div className="border-b p-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-purple-600">Manage Permissions</h2>
                            </div>
                            <p className="mt-2">Select the permissions you want to enable</p>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-4 gap-4">
                                {availablePermissions.map((perm) => (
                                    <label
                                        key={perm}
                                        className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                                    >
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                value={perm}
                                                checked={selectedPermissions.includes(perm)}
                                                onChange={() => handlePermissionChange(perm)}
                                                className="appearance-none w-6 h-6 border-2 rounded-md border-gray-300 checked:border-purple-500 checked:bg-purple-500 transition-all duration-200"
                                            />
                                            <span className="absolute text-white font-bold pointer-events-none opacity-0 transform scale-0 transition-all duration-200 checked:opacity-100 checked:scale-100">
                                                ✓
                                            </span>
                                        </div>
                                        <span className="ml-3 text-gray-700 font-medium group-hover:text-gray-900">
                                            {perm}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="border-t p-6 bg-gray-50 rounded-b-xl">
                            <div className="flex gap-4 justify-end">
                                <button
                                    onClick={handleCancelPermission}
                                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors font-medium"
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
