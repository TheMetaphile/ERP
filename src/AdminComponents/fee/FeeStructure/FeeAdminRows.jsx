import React, { useEffect, useState, useContext } from 'react';
import { MdDeleteForever } from "react-icons/md";
import AuthContext from '../../../Context/AuthContext';
import Loading from '../../../LoadingScreen/Loading';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL_Fee } from '../../../Config';
import { MdCheck, MdCancel, MdOutlineModeEdit } from 'react-icons/md';

export default function FeeAdminRows({ Class, session, key }) {
    const [structure, setStructure] = useState([]);
    const [loading, setLoading] = useState(false);
    const { authState } = useContext(AuthContext);
    const [admissionFee, setAdmissionFee] = useState('');
    const [monthlyFee, setMonthlyFee] = useState('');
    const [quarterFee, setQuarterFee] = useState('');
    const [editMode, setEditMode] = useState(null);

    const handleEditToggle = (index) => {
        setEditMode(index);
    };

    useEffect(() => {
        setLoading(true);
        fetchStructure();
    }, [session]);

    const fetchStructure = async () => {
        const classs = getClassNames(Class);
        const stream = getStream(Class);
        try {
            const response = await axios.get(`${BASE_URL_Fee}/fee/fetch/structure?class=${Class}&session=${session}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
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
        }
    };

    const handleCancelEdit = () => {
        setEditMode(null);
    };

    const handleConfirmEdit = async () => {
        const classs = getClassNames(Class);
        const stream = getStream(Class);

        try {
            const response = await axios.post(`${BASE_URL_Fee}/fee/create/structure`, {
                class: classs,
                session: session,
                admissionFee: admissionFee,
                monthlyfee: monthlyFee,
                quarterFee: quarterFee,
                stream: stream
            }, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
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
            case '11th-12th Commerce':
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
        <tr key={key} className="border-b border-gray-300">
            <td className="px-4 py-2 whitespace-nowrap">{Class}</td>
            <td className="px-4 py-2 whitespace-nowrap">
                {editMode === key ? (
                    <input
                        className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black"
                        id="admissionFee"
                        type="text"
                        value={admissionFee}
                        onChange={(e) => setAdmissionFee(e.target.value)}
                        required
                    />
                ) : (
                    admissionFee || 'N/A'
                )}
            </td>
            <td className="px-4 py-2 whitespace-nowrap">
                {editMode === key ? (
                    <input
                        className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black"
                        id="monthlyFee"
                        type="text"
                        value={monthlyFee}
                        onChange={(e) => setMonthlyFee(e.target.value)}
                        required
                    />
                ) : (
                    monthlyFee || 'N/A'
                )}
            </td>
            <td className="px-4 py-2 whitespace-nowrap">
                {editMode === key ? (
                    <input
                        className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-black"
                        id="quarterFee"
                        type="text"
                        value={quarterFee}
                        onChange={(e) => setQuarterFee(e.target.value)}
                        required
                    />
                ) : (
                    quarterFee || 'N/A'
                )}
            </td>
            <td className="px-4 py-2 whitespace-nowrap">
                {editMode === key ? (
                    <>
                        <button
                            className="bg-green-400 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-md ml-2"
                            onClick={handleConfirmEdit}
                        >
                            <MdCheck />
                        </button>
                        <button
                            className="bg-gray-400 hover:bg-gray-700 text-white px-3 py-1 rounded-lg shadow-md ml-2"
                            onClick={handleCancelEdit}
                        >
                            <MdCancel />
                        </button>
                    </>
                ) : (
                    <button
                        className="bg-blue-400 hover:bg-blue-700 text-white px-3 py-1 rounded-lg shadow-md"
                        onClick={() => handleEditToggle(key)}
                    >
                        <MdOutlineModeEdit />
                    </button>
                )}
            </td>
        </tr>
    );
}
