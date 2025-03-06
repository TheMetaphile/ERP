import { useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import { BASE_URL } from "../../../Config";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function StudentDetailTile({ userData }) {
    const { authState } = useContext(AuthContext);
    const [newData, setNewData] = useState(userData);
    const [loadingIndex, setLoadingIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [optionalSubjects, setOptionalSubjects] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setNewData(userData);
    }, [userData]);

    const fetchSubjects = async (user) => {
        setIsLoading(true);
        setSelectedUser(user);

        try {
            const response = await axios.post(
                `${BASE_URL}/subjects/fetch`,
                { Class: user.currentClass, stream: user.stream },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authState.accessToken}`,
                    },
                }
            );

            if (response.data.status) {
                const fetchedOptionalSubjects = response.data.optionalSubjects || [];
                setOptionalSubjects(fetchedOptionalSubjects);

                setSelectedSubjects(
                    fetchedOptionalSubjects.filter((subject) =>
                        user.optionalSubjects?.includes(subject)
                    )
                );
            }
        } catch (error) {
            toast.error("Error connecting to server");
        } finally {
            setIsLoading(false);
            setIsModalOpen(true);
        }
    };

    const handleCheckboxChange = (subject) => {
        setSelectedSubjects((prev) =>
            prev.includes(subject)
                ? prev.filter((s) => s !== subject)
                : [...prev, subject]
        );
    };

    const submitSubjects = async () => {
        try {
            const updatedSubjects = selectedSubjects;
            const response = await axios.post(
                `${BASE_URL}/allocateSubject/create`,
                { email: selectedUser.email, selectedSubjects: updatedSubjects  },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authState.accessToken}`,
                    },
                }
            );
            if (response.status === 200) {
                toast.success("Subjects updated successfully!");
                setSelectedSubjects(updatedSubjects);
                setOptionalSubjects(updatedSubjects);

            }
            setIsModalOpen(false);
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <div className="w-full">
            {newData.map((user, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border-b border-gray-200 hover:bg-blue-100 transition-colors mb-2"
                >
                    <div className="flex text-center items-center justify-evenly border rounded-lg py-2 pl-2">
                        <Link
                            to={`/Sub-Admin/Students/details/${user.email}`}
                            className="rounded-full text-center px-3 py-2 font-semibold bg-blue-100 text-blue-800"
                        >
                            <div className="w-40 flex justify-center items-center space-x-2">
                                <img
                                    src={user.profileLink}
                                    alt=""
                                    className="h-8 w-8 rounded-full object-cover"
                                />
                                <h1 className="text-base w-32 truncate">{user.name}</h1>
                            </div>
                        </Link>
                        <h1 className="text-base w-40 truncate">{user.currentClass}</h1>
                        <h1 className="text-base w-40 truncate">{user.section}</h1>
                        <h1 className="text-base w-40 truncate">{user.fatherPhoneNumber}</h1>
                        <h1 className="text-base w-52 truncate">{user.email}</h1>

                        {loadingIndex === index ? (
                            <div className="w-24 flex justify-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
                                />
                            </div>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => fetchSubjects(user)}
                                className="bg-blue-100 text-blue-500 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                            >
                                Optional Subject
                            </motion.button>
                        )}
                    </div>
                </motion.div>
            ))}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-4/5 max-w-5xl h-fit flex flex-col overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                            <h2 className="text-2xl font-bold">Select Optional Subjects for <span className="italic">{selectedUser?.name}</span></h2>
                        </div>

                        <div className="flex-grow p-6 overflow-y-auto">
                            {isLoading ? (
                                <p>Loading subjects...</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {optionalSubjects.map((subject) => (
                                        <label
                                            key={subject}
                                            className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${selectedSubjects.includes(subject) ? "border-blue-500 bg-blue-50 shadow-sm" : "border-gray-200 hover:border-blue-300"}`}
                                        >
                                            <input
                                                type="checkbox"
                                                value={subject}
                                                checked={selectedSubjects.includes(subject)}
                                                onChange={() => handleCheckboxChange(subject)}
                                                className="appearance-none w-6 h-6 border-2 rounded-md border-gray-300 checked:border-blue-500 checked:bg-blue-500 transition-all"
                                            />
                                            <span className="ml-3 text-base font-medium">
                                                {subject}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="border-t p-4 bg-gray-50 flex justify-end gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitSubjects}
                                className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:shadow-lg transition-all font-medium"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
