import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../../Context/AuthContext";
import { BASE_URL_Login } from "../../../Config";
import { FaArrowDown } from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from 'framer-motion';


export default function AdminRow({ Teacher, index, onNewWork, setAdmins }) {
    const { authState } = useContext(AuthContext);

    const handleUpdateClick = async (_id) => {
        const config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${BASE_URL_Login}/admins/remove-admin`,
            headers: {
                'Authorization': `Bearer ${authState.accessToken}`,
                'Content-Type': 'application/json'
            },
            data: {
                id: _id
            }
        };

        try {
            const response = await axios(config);
            console.log('Admin status updated:', response.data);
            if (response.status === 200) {
                toast.success('Admin privileges removed successfully!');
                onNewWork(Teacher)
            } else {
                toast.error('Failed to update admin status.');
            }
            setAdmins((prevAdmins) => prevAdmins.filter(admin => admin._id !== _id));
        } catch (error) {
            console.error('Error updating admin status:', error);
        }
    }



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
        <motion.tr
            key={index}
            variants={rowVariants}
            className="border-b border-gray-200  last:border-none"
        >

            <td className="py-3 px-6 text-center whitespace-nowrap">{Teacher.employeeId}</td>
            <td className="flex py-3 px-6   items-center gap-2 whitespace-nowrap"><img src={Teacher.profileLink} alt="img" className="rounded-full h-12 w-12" />{Teacher.name}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">{Teacher.email}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">{Teacher.DOB}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">{Teacher.phoneNumber}</td>

            <td className="py-3 px-6 text-center whitespace-nowrap">
                <div className="flex justify-center gap-1">
                    <button
                        className='bg-red-400 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center'
                        onClick={() => handleUpdateClick(Teacher._id)}
                    >
                        <FaArrowDown />
                    </button>
                </div>
            </td>



        </motion.tr>

    )
}