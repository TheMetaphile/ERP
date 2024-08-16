import { useState, useContext, useEffect } from "react";
import axios from 'axios';
import AuthContext from "../../../Context/AuthContext";
import Loading from "../../../LoadingScreen/Loading";
import { BASE_URL_Login } from "../../../Config";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function StudentDetailTile({ userData }) {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [newData, setNewData] = useState(userData);
    const [loadinfIndex, setLoadingIndex] = useState('');
    const [clickedIndex, setClickedIndex] = useState(null);

    console.log(userData)
    const handleClick = (index) => {
        setClickedIndex(index);
    };

    useEffect(() => {
        setNewData(userData);
    }, [userData]);

    const handleTerminate = async (email, index) => {
        console.log(authState.accessToken, email)
        setLoading(true);
        setLoadingIndex(index);
        try {
            const response = await axios.delete(`${BASE_URL_Login}/terminate/student`, {
                data: {
                    email: email,
                    accessToken: authState.accessToken
                }
            });
            console.log(response.data);
            toast.success("Student terminated successfully");
            setNewData((prevData) => prevData.filter(user => user.email !== email));
        } catch (error) {
            console.error("There was an error terminating the student!", error);
            toast.error("Failed to terminate the student");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            {newData.map((user, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border-b border-gray-200 hover:bg-purple-100 transition-colors mb-2"
                >
                    <div className="flex text-center mobile:max-tablet:gap-2 items-center justify-evenly border rounded-lg py-2 pl-2 tablet:max-laptop:w-fit">
                        <div className="w-40 flex justify-center items-center space-x-2">
                            <img src={user.profileLink} alt="" className="h-8 w-8 rounded-full object-cover" />
                            <h1 className="text-base w-32 truncate">{user.name}</h1>
                        </div>
                        <h1 className="text-base w-40 truncate">{user.currentClass}</h1>
                        <h1 className="text-base w-40 truncate">{user.section}</h1>
                        <h1 className="text-base w-40 truncate">{user.fatherPhoneNumber}</h1>
                        <h1 className="text-base w-52 truncate">{user.email}</h1>
                        {index === setLoadingIndex && loading ? (
                            <div className="w-24 flex justify-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full"
                                />
                            </div>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-purple-100 text-purple-500 px-3 py-1 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors duration-200"
                                onClick={() => handleTerminate(user.email, index)}
                            >
                                Terminate
                            </motion.button>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

