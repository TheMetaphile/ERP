import React, { useContext } from 'react';
import { MdDeleteForever, MdOutlineModeEdit } from "react-icons/md";
import AuthContext from '../../../Context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BASE_URL_AskDoubt } from '../../../Config';

export default function MyDoubtTile({ data }) {
    const { authState } = useContext(AuthContext);

    const handleDelete = async (index, id) => {
        console.log(id, authState.userDetails.currentClass)
        try {
            const response = await axios.delete(`${BASE_URL_AskDoubt}/doubts/delete?class=${authState.userDetails.currentClass}&doubtId=${id}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });

            if (response.status === 200) {
                toast.success('Doubt Deleted Successfully');
            }
        } catch (error) {
            console.error("Error deleting Doubt:", error);
            toast.error(error.response.data.error);
        }
    };

    const handleEdit = async (index, id) => {
        console.log(id)
        try {
            const response = await axios.put(`${BASE_URL_AskDoubt}/doubts/update/student?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });

            if (response.status === 200) {
                toast.success('Doubt Edited Successfully');
            }
        } catch (error) {
            console.error("Error editing Doubt:", error);
            toast.error(error.response.data.error);
        }
    };

    return (
        <div className=" w-full p-3  rounded-lg border border-gray-300 shadow-md mt-3">
            {data.map((item, index) => (
                <div key={index} className="border py-2 px-3">
                    <div className="flex justify-between items-center mobile:max-tablet:flex-col  ">
                        <div className='flex items-center gap-2'>
                            <h1 className=" px-3 py-1 bg-bg_blue rounded-lg border border-gray-300 w-fit"> {item.subject}</h1>
                            <div className="text-gray-400 px-3 ">Question No. {index + 1}</div>
                        </div>

                        <div className={`${item.status === "Pending" ? "text-orange-300" :
                            item.status === "Rejected" ? "text-red-400" :
                                "text-green-400"
                            } font-medium`}> {item.status}
                        </div>

                        <div className='flex items-center gap-2'>
                            {item.status === 'Pending' ?
                                <>
                                    <div className="text-green-500 hover:text-green-700 flex items-center" onClick={() => handleEdit(index, item._id)}>
                                        <span >Edit</span>
                                        <MdOutlineModeEdit />
                                    </div>
                                    <div className='flex items-center text-red-500 hover:text-red-700' onClick={() => handleDelete(index, item._id)}>
                                        <span>Delete</span>
                                        <MdDeleteForever />
                                    </div>
                                </>
                                :
                                <></>
                            }
                        </div>
                    </div>

                    <div className="flex justify-between items-center  mt-3  mobile:max-tablet:flex-col">
                        <div className=" font-medium px-3">{item.question}</div>
                        <div className="font-medium ">Date {item.date}</div>
                    </div>
                    <div className='mt-3 px-3'>
                        {item.status === 'Resolved' ?
                            <div>
                                <span className='text-lg font-medium'>Answer</span> : {item.solution}
                            </div>
                            :
                            <div></div>}
                    </div>
                </div>
            ))}


        </div>
    )
}

