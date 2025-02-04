import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import { BASE_URL_Login } from "../../../Config";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from "react-icons/fa";

export default function AllTeachers({ additionalDataAdmin, onNew }) {
    const { authState } = useContext(AuthContext);
    const [NonAdmins, SetNonAdmins] = useState([]);

    useEffect(() => {
        if (additionalDataAdmin) {
            SetNonAdmins((prevAdmins) => [...prevAdmins, ...additionalDataAdmin]);
        }
    }, [additionalDataAdmin]);

    const fetchNonAdmins = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BASE_URL_Login}/admins/NonAdmin?branch=${authState.userDetails.branch}`,
            headers: {
                'Authorization': `Bearer ${authState.accessToken}`
            }
        };

        await axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data), "reluk lkt kljdfgkjar");
                console.log(response.data.admins)
                SetNonAdmins(response.data.nonAdmins)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchNonAdmins();
    }, [authState.userDetails.branch])

    const handleUpdateClick = async (_id, teachers) => {
        const config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${BASE_URL_Login}/admins/add-admin`,
            headers: {
                'Authorization': `Bearer ${authState.accessToken}`,
                'Content-Type': 'application/json'
            },
            data: {
                id: _id
            }
        };

        const response = await axios(config);
        console.log('Admin status updated:', response.data);
        if (response.status === 200) {
            toast.success('Admin privileges added successfully!');
            onNew(teachers);

        } else {
            toast.error('Failed to update admin status.');
        }
        SetNonAdmins((prevAdmins) => prevAdmins.filter(admin => admin._id !== _id));
    }

    const tableVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12
            }
        }
    };

    return (
        <div className="w-full overflow-x-auto rounded-lg">
            <ToastContainer />
            <motion.table
                className="min-w-full bg-white border border-gray-300 rounded-lg"
                variants={tableVariants}
                initial="hidden"
                animate="visible"
            >
                <thead>
                    <tr className="bg-gradient-to-r from-purple-400 to-purple-200 text-lg">
                        <th className="py-2 px-6 text-center rounded-t-r whitespace-nowrap">Employee Id</th>
                        <th className="py-2 px-6">Name</th>
                        <th className="py-2 px-6 text-center">Email</th>
                        <th className="py-2 px-6 text-center">DOB</th>
                        <th className="py-2 px-6 text-center">Phone Number</th>
                        <th className="py-2 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <AnimatePresence>
                    <motion.tbody className="text-gray-600 text-md font-normal">
                        {NonAdmins.length === 0 ? (
                            <motion.tr variants={rowVariants}>
                                <td colSpan="6" className="py-4 text-center">
                                    NonAdmins Details not available
                                </td>
                            </motion.tr>
                        ) : (
                            NonAdmins.map((teachers, index) => (
                                <motion.tr
                                    key={index}
                                    className="border-b border-gray-200 last:border-none"
                                    variants={rowVariants}
                                >
                                    <td className="py-3 px-6 text-center whitespace-nowrap">{teachers.employeeId}</td>
                                    <td className="flex py-3 px-6 justify-start items-center gap-2 whitespace-nowrap">
                                        <img src={teachers.profileLink} alt="img" className="rounded-full h-12 w-12" />
                                        {teachers.name}
                                    </td>
                                    <td className="py-3 px-6 text-center whitespace-nowrap">{teachers.email}</td>
                                    <td className="py-3 px-6 text-center whitespace-nowrap">{teachers.DOB}</td>
                                    <td className="py-3 px-6 text-center whitespace-nowrap">{teachers.phoneNumber}</td>
                                    <td className="py-3 px-6">
                                        <div className="flex justify-center gap-1">
                                            <button
                                                className='bg-green-400 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center'
                                                onClick={() => handleUpdateClick(teachers._id, teachers)}
                                            >
                                                <FaArrowUp />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </motion.tbody>
                </AnimatePresence>
            </motion.table>

        </div>
    )
}
