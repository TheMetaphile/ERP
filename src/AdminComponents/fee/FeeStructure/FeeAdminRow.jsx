import React, { useEffect, useState, useContext } from 'react';
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import AuthContext from '../../../Context/AuthContext';
import Loading from '../../../LoadingScreen/Loading';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL_Fee } from '../../../Config';

export default function FeeAdminRow({ Class,session }) {
    const [expanded, setExpanded] = useState(false);
    const [structure, setStructure] = useState([])
    const [loading, setLoading] = useState(false);
    const { authState } = useContext(AuthContext);
    const [showNewRow, setShowNewRow] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newAmount, setNewAmount] = useState('');
    const [newDeadline, setNewDeadline] = useState('');
  
    // Fetch data based on queryParams
    
    const handleClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        if (expanded) {
            setLoading(true);
            console.log(session);
            fetchStructure();
        }
    }, [expanded,session]);

    const fetchStructure = async () => {
        console.log(Class)
        try {
            const response = await axios.get(`${BASE_URL_Fee}/fee/fetch/structure?class=${Class}&session=${session}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                console.log("API response:", response.data);
                setStructure(response.data.feeStructure || []);
                setLoading(false);
            }

        } catch (err) {
            console.log(err);
            setLoading(false);
            setStructure([]);
        }
    };

    const handleAddStructure = async () => {
        const structure = [
            {
                title: newTitle,
                amount: newAmount,
                deadline: newDeadline
            }
        ];
        console.log(structure)

        try {
            const response = await axios.post(`${BASE_URL_Fee}/fee/create/structure`, {
                class: Class,
                session: '2023-24',
                structure: structure
            }, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });

            if (response.status === 200) {
                toast.success('Structure added successfully');
                fetchStructure();
                setShowNewRow(false);
                setNewTitle('');
                setNewAmount('');
                setNewDeadline('');
            }
        } catch (error) {
            toast.error('Error adding structure');
        }
    };


    const handleDelete = async (index, id) => {
        console.log(Class)
        console.log(id)
        try {
            const response = await axios.delete(`${BASE_URL_Fee}/fee/delete/structure`,
                {
                    class: Class,
                    session: session,
                    structureId: id
                },
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                }
            );

            if (response.status === 200) {
                const updatedStructure = structure.filter((_, i) => i !== index);
                setStructure(updatedStructure);
                toast.success('Structure Deleted Successfully');
            }
        } catch (error) {
            console.error("Error deleting Structure:", error);
            toast.error('Error deleting Structure');
        }
    };

    return (
        <div key={Class} className="w-full mb-4  border border-gray-300 px-4 pb-2 rounded-lg mt-2 shadow-md  overflow-auto">
            <div className="flex justify-between items-center p-2 hover:cursor-pointer" onClick={handleClick}>
                <div className="w-1/4">
                    <div className="px-4 py-2">
                        {Class}
                    </div>
                </div>
                <div className="self-center cursor-pointer">
                    {expanded ? <FaChevronUp /> : <FaChevronDown />}
                </div>
            </div>

            {expanded && (
                <div className=' mt-2 mobile:max-tablet:w-fit w-full overflow-x-auto no-scrollbar border border-black rounded-lg'>
                    <div className="flex justify-between px-2 py-2 text-center bg-bg_blue  rounded-t-lg border border-b-2  whitespace-nowrap">
                        <h1 className="w-40 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Title
                        </h1>
                        <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Deadline
                        </h1>
                        <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Amount
                        </h1>
                        <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Action
                        </h1>

                    </div>

                    {loading ? (
                        <Loading />
                    ) : (
                        structure.length > 0 ? (
                            <div>
                                {structure.map((details, index) => (
                                    <div key={index} className='flex text-center justify-between w-full py-2 pl-2 h-fit border '>
                                        <h1 className="w-40 text-lg  mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.title}
                                        </h1>
                                        <h1 className="w-36 text-lg  mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.deadline}
                                        </h1>
                                        <h1 className="w-36 text-lg  mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                            {details.amount}
                                        </h1>
                                        <div className='w-36 text-lg flex items-center justify-center hover:cursor-pointer text-red-500 font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap'>
                                            <span>Delete</span>
                                            <MdDeleteForever
                                                className="text-red-500 hover:text-red-700 ml-2"
                                                onClick={() => handleDelete(index, details._id)}
                                            />
                                        </div>

                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='text-center'>No structure added</div>
                        )
                    )}

                    {showNewRow && (
                        <div className="flex justify-between w-full py-2 pl-2 h-fit ">
                            <input
                                type="text"
                                className="w-36 px-2 border border-black rounded-lg text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm"
                                placeholder="Title"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                className="w-36 px-2 border border-black rounded-lg text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm"
                                placeholder="Deadline"
                                value={newDeadline}
                                onChange={(e) => setNewDeadline(e.target.value)}
                                required
                            />
                            <input
                                type="number"
                                className="w-36 px-2 border border-black rounded-lg text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm"
                                placeholder="Amount"
                                value={newAmount}
                                onChange={(e) => setNewAmount(e.target.value)}
                                required
                            />
                            <button
                                className="bg-green-400 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-md"
                                onClick={handleAddStructure}
                            >
                                Add
                            </button>
                        </div>
                    )}

                    <div className="flex justify-center w-full px-3 py-1 h-fit">
                        <button
                            className='mt-2 px-4 py-2 bg-green-400 hover:bg-green-500 text-white rounded-lg'
                            onClick={() => setShowNewRow(true)}
                        >
                            Add structure
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

