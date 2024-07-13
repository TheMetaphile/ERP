import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import Loading from "../../../LoadingScreen/Loading";
import { BASE_URL_Notice } from "../../../Config";
import { MdEdit, MdCheck, MdCancel, MdDeleteForever } from 'react-icons/md';
import { toast } from "react-toastify";

const ClassNotice = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const { authState } = useContext(AuthContext);
    const [expanded, setExpanded] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedNotice, setEditedNotice] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        if (authState.accessToken) {
            setLoading(true);
            fetchClassNotices();
        } else {
            setError('No access token available');
            setLoading(false);
        }
    }, [authState.accessToken]);

    const handleClick = (index) => {
        if (editingIndex === null) {
            setExpanded(expanded === index ? null : index);
        }
    };

    function getCurrentSession() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        if (currentMonth >= 3) {
            return `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
        } else {
            return `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
        }
    }
    const session = getCurrentSession();


    const fetchClassNotices = async () => {
        const session = getCurrentSession();

        try {
            const response = await axios.get(`${BASE_URL_Notice}/notice/fetch/admin?start=${0}&limit=${10}&session=${session}&type=${'Particular Classes'}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            console.log("API response notice:", response.data.notices);
            setData(response.data.notices);
            setLoading(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditedNotice({ ...data[index] });
    };

    const handleSave = async (index) => {
        console.log(data[index]._id, editedNotice, session)

        try {
            const response = await axios.put(`${BASE_URL_Notice}/notice/update?noticeId=${data[index]._id}&session=${session}`, editedNotice, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            console.log("API response after update:", response.data);
            setData(data.map((notice, i) => i === index ? editedNotice : notice));
            setEditingIndex(null);
            setExpanded(index);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (index) => {
        try {
          await axios.delete(`${BASE_URL_Notice}/notice/delete?id=${data[index]._id}&session=${session}`, {
            headers: {
              Authorization: `Bearer ${authState.accessToken}`
            }
          });
          toast.success('Deleted Successfully');
          const newDetail = data.filter((_, i) => i !== index);
          setData(newDetail);
        } catch (err) {
          console.log(err);
        }
      };

    const handleCancel = () => {
        setEditingIndex(null);
        setExpanded(expanded);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedNotice({ ...editedNotice, [name]: value });
    };

    const handleFieldClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="mt-4 mx-2">
            <div className="flex flex-col space-y-4 mb-4">
                {loading ? (
                    <Loading />
                ) : data === null || data.length === 0 ? (
                    <div>No notices available</div>
                ) : (
                    data.map((notice, index) => (
                        (notice.type === 'Particular Classes') && (
                            <div key={index} className="bg-white shadow-md rounded-md p-4 border mt-2 text-base " >
                                <div className="w-full flex items-center justify-between mb-2 bg-slate-500 cursor-pointer" onClick={() => handleClick(index)}>
                                    <h3>
                                        Title: {editingIndex === index ? (
                                            <input
                                                type="text"
                                                name="title"
                                                value={editedNotice.title}
                                                onChange={handleChange}
                                                onClick={handleFieldClick}
                                                className="border border-gray-300 rounded-lg px-2 py-1"
                                            />
                                        ) : (
                                            notice.title
                                        )}
                                    </h3>
                                    <p>
                                        Type: &nbsp;
                                        {/* {editingIndex === index ? (
                                            <select
                                                name="type"
                                                value={editedNotice.type}
                                                onChange={handleChange}
                                                onClick={handleFieldClick}
                                                className="border border-gray-300 rounded-lg px-2 py-1"
                                            >
                                                <option value="For All">For All</option>
                                                <option value="For Student">For Student</option>
                                                <option value="For Teacher">For Teacher</option>
                                                <option value="Particular Students">Particular Students</option>
                                                <option value="Particular Teachers">Particular Teachers</option>
                                                <option value="Particular Classes">Particular Classes</option>
                                            </select>
                                        ) : ( */}
                                            {notice.type}
                                        {/* )} */}
                                        {editingIndex === index ? (
                                            <>
                                                <button
                                                    className="bg-green-400 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-md ml-2"
                                                    onClick={() => handleSave(index)}
                                                >
                                                    <MdCheck />
                                                </button>
                                                <button
                                                    className="bg-red-400 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-md ml-2"
                                                    onClick={handleCancel}
                                                >
                                                    <MdCancel />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                            <button
                                                className="bg-blue-400 hover:bg-blue-700 text-white px-3 py-1 rounded-lg shadow-md ml-2"
                                                onClick={() => handleEdit(index)}
                                            >
                                                <MdEdit />
                                            </button>
                                            <button
                                            className="bg-red-400 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-md ml-2"
                                            onClick={() => handleDelete(index)}
                                          >
                                            <MdDeleteForever />
                                          </button>
                                          </>
                                        )}
                                    </p>
                                </div>
                                {expanded === index && (
                                    <>
                                        <div className='text-base mt-2'>
                                            <p className="mb-2">
                                                Description: {editingIndex === index ? (
                                                    <textarea
                                                        name="description"
                                                        value={editedNotice.description}
                                                        onChange={handleChange}
                                                        onClick={handleFieldClick}
                                                        className="border border-gray-300 rounded-lg px-2 py-1 w-full"
                                                    />
                                                ) : (
                                                    notice.description
                                                )}
                                            </p>
                                            {editingIndex === index && (
                                                <div>
                                                    {editedNotice.forClasses.map((classInfo, idx) => (
                                                        <div key={idx} className="mt-2 flex gap-1">
                                                            <p>Class: {classInfo.Class}</p>
                                                            <ul className="flex gap-1">
                                                                {classInfo.sections.map((section, idx) => (
                                                                    <li key={idx}>{section}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                                <div className="w-full flex items-center justify-between mt-2">
                                    <p>Date: {notice.date}</p>
                                    <div className="flex items-center">
                                        By:
                                        <div className="flex items-center gap-1 px-1">
                                            <img src={notice.from.profileLink} alt="" className="w-8 h-8 rounded-full" />
                                            <p>{notice.from.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    ))
                )}
            </div>
        </div>
    );
};

export default ClassNotice;
