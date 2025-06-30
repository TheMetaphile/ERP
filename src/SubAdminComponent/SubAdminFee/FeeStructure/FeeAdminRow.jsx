import React, { useEffect, useState, useContext } from 'react';
import { MdDeleteForever } from "react-icons/md";
import AuthContext from '../../../Context/AuthContext';
import Loading from '../../../LoadingScreen/Loading';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../Config';
import { MdCheck, MdCancel, MdOutlineModeEdit } from 'react-icons/md';
import { motion } from "framer-motion";
import { refreshAccessToken } from '../../../RefreshTokenHelper';

export default function FeeAdminRow({ Class, session, key }) {
    const [structure, setStructure] = useState([]);
    const [loading, setLoading] = useState(false);
    const { authState, darkMode, updateAccessToken, logout } = useContext(AuthContext);
    const [admissionFee, setAdmissionFee] = useState('');
    const [monthlyFee, setMonthlyFee] = useState('');
    const [quarterFee, setQuarterFee] = useState('');
    const [editMode, setEditMode] = useState(null);

    const handleEditToggle = (index) => {
        setEditMode(index);
    };

    useEffect(() => {
        setLoading(true);
        setAdmissionFee('');
        setMonthlyFee('');
        setQuarterFee('');
        fetchStructure();
    }, [session]);

    const fetchStructure = async () => {
        const classs = getClassNames(Class);
        const stream = getStream(Class);
        try {
            const response = await axios.get(`${BASE_URL}/fee/fetch/structure?class=${Class}&session=${session}`, {
                headers: {
                    Authorization: `Bearer ${authState?.accessToken}`
                }
            });

            if (response.status === 200) {
                const feeStructure = response.data.feeStructure || [];
                setStructure(feeStructure);
                console.log(response.data);
                const currentStructure = feeStructure.find(item => item.class.includes(classs[0]));
                if (currentStructure) {
                    setAdmissionFee(currentStructure.admissionFee);
                    setMonthlyFee(currentStructure.monthlyfee);
                    setQuarterFee(currentStructure.quarterFee);
                }
                setLoading(false);
            }
        } catch (err) {
            console.error(err);
            setLoading(false);
            setStructure([]);
            if (
                err.response &&
                err.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await fetchStructure();
                } catch (refreshError) {
                }
            } else {
                toast.error(err.response?.data?.error || "An error occurred");
            }
        }
    };

    const handleCancelEdit = () => {
        setEditMode(null);
    };

    const handleConfirmEdit = async () => {
        const classs = getClassNames(Class);
        const stream = getStream(Class);

        try {
            const response = await axios.post(`${BASE_URL}/fee/create/structure`, {
                class: classs,
                session: session,
                admissionFee: admissionFee,
                monthlyfee: monthlyFee,
                quarterFee: quarterFee,
                stream: stream
            }, {
                headers: {
                    Authorization: `Bearer ${authState?.accessToken}`
                }
            });

            if (response.status === 200) {
                const updatedStructure = response.data.feeStructure;
                setStructure(prevStructure =>
                    prevStructure.map(item =>
                        item.class.includes(classs[0]) ? { ...item, admissionFee, monthlyfee: monthlyFee, quarterFee } : item
                    )
                );
                toast.success('Structure updated successfully');
                setEditMode(null);
            }
        } catch (error) {
            toast.error('Error updating structure');
            console.error(error);
            if (
                err.response &&
                err.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await handleConfirmEdit();
                } catch (refreshError) {
                }
            } else {
                toast.error(err.response?.data?.error || "An error occurred");
            }
        }
    };

    const getClassNames = (className) => {
        switch (className) {
            case 'Pre-Nursery-U.K.G':
                return ['Pre-Nursery', 'L.K.G', 'U.K.G'];
            case '1st-5th':
                return ['1st', '2nd', '3rd', '4th', '5th'];
            case '6th-8th':
                return ['6th', '7th', '8th'];
            case '9th-10th':
                return ['9th', '10th'];
            case '11th-12th Com./Huma':
                return ['11th', '12th'];
            case '11th-12th Science':
                return ['11th', '12th'];
            default:
                return [];
        }
    };

    const getStream = (className) => {
        switch (className) {
            case '11th-12th Commerce':
                return 'Commerce';
            case '11th-12th Science':
                return 'Science';
            default:
                return 'General';
        }
    };

    return (
        <motion.tr
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: key * 0.1 }}
            className={`border-b transition-colors ${darkMode
                ? 'border-gray-700 hover:bg-gray-700'
                : 'border-gray-200 hover:bg-blue-100'
                }`}
        >
            <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                {Class}
            </td>
            <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                {editMode === key ? (
                    <input
                        className={`border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode
                            ? 'bg-gray-700 text-gray-200 border-gray-600'
                            : 'text-gray-700 border-black'
                            }`}
                        id="admissionFee"
                        type="number"
                        value={admissionFee}
                        onChange={(e) => setAdmissionFee(e.target.value)}
                        required
                    />
                ) : (
                    admissionFee || 'N/A'
                )}
            </td>
            <td className={`px-4 py-2 whitespace-nowrap ${darkMode ? 'text-gray-300' : ''
                }`}>
                {editMode === key ? (
                    <input
                        className={`border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode
                            ? 'bg-gray-700 text-gray-200 border-gray-600'
                            : 'text-gray-700 border-black'
                            }`}
                        id="monthlyFee"
                        type="number"
                        value={monthlyFee}
                        onChange={(e) => setMonthlyFee(e.target.value)}
                        required
                    />
                ) : (
                    monthlyFee || 'N/A'
                )}
            </td>
            <td className={`px-4 py-2 whitespace-nowrap ${darkMode ? 'text-gray-300' : ''
                }`}>
                {editMode === key ? (
                    <input
                        className={`border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode
                            ? 'bg-gray-700 text-gray-200 border-gray-600'
                            : 'text-gray-700 border-black'
                            }`}
                        id="quarterFee"
                        type="number"
                        value={quarterFee}
                        onChange={(e) => setQuarterFee(e.target.value)}
                        required
                    />
                ) : (
                    quarterFee || 'N/A'
                )}
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {editMode === key ? (
                    <>
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded shadow-md ml-2 transition duration-300"
                            onClick={handleConfirmEdit}
                        >
                            <MdCheck />
                        </button>
                        <button
                            className={`${darkMode
                                ? 'bg-gray-600 hover:bg-gray-700'
                                : 'bg-gray-500 hover:bg-gray-600'
                                } text-white px-3 py-1 rounded shadow-md ml-2 transition duration-300`}
                            onClick={handleCancelEdit}
                        >
                            <MdCancel />
                        </button>
                    </>
                ) : (
                    <button
                        className={`${darkMode
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-blue-500 hover:bg-blue-600'
                            } text-white px-3 py-1 rounded shadow-md transition duration-300`}
                        onClick={() => handleEditToggle(key)}
                    >
                        <MdOutlineModeEdit />
                    </button>
                )}
            </td>
        </motion.tr>

    );
}
