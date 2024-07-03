import React, { useState, useEffect, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import Loading from '../../LoadingScreen/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NoticeBoard() {
    const { authState } = useContext(AuthContext);
    const [selectedLink, setSelectedLink] = useState('/Teacher-Dashboard/noticeboard/teacher');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLinkSelect = (link) => {
        setSelectedLink(link);
    };

    const handleModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async () => {
       console.log()
    };

    return (
        <div className=" flex flex-col px-3 mobile:max-tablet:px-0  items-start mt-2 mb-3">
            <h1 className='text-3xl'>Notice Board</h1>
            <div className=' border shadow-md mt-4 rounded-lg w-full '>
                <div className=" flex   mt-4 ml-3 mr-3 items-center justify-between">
                    <div className=" flex  gap-2 ">
                        {/* <Link
                            to={'/Teacher-Dashboard/noticeboard/allnotice'}
                            className={`text-xl font-medium px-2 rounded-lg py-1 ${selectedLink === '/Teacher-Dashboard/noticeboard/allnotice' ? 'bg-secondary ' : 'bg-gray-300'}`}
                            onClick={() => handleLinkSelect('/Teacher-Dashboard/noticeboard/allnotice')}
                        >
                            All
                        </Link> */}
                        <Link
                            to={'/Teacher-Dashboard/noticeboard/teacher'}
                            className={`text-xl font-medium px-2 rounded-lg  py-1 ${selectedLink === '/Teacher-Dashboard/noticeboard/teacher' ? 'bg-secondary ' : 'bg-gray-300'}`}
                            onClick={() => handleLinkSelect('/Teacher-Dashboard/noticeboard/teacher')}
                        >
                            Teacher
                        </Link>
                        {/* <Link
                            to={'/Teacher-Dashboard/noticeboard/student'}
                            className={`text-xl font-medium px-2 rounded-lg py-1 ${selectedLink === '/Teacher-Dashboard/noticeboard/student' ? 'bg-secondary ' : 'bg-gray-300'}`}
                            onClick={() => handleLinkSelect('/Teacher-Dashboard/noticeboard/student')}
                        >
                            Student
                        </Link> */}
                    </div>
                    <div className=" text-base font-normal text-white bg-purple-300 rounded-lg shadow-md p-2 cursor-pointer" onClick={handleModal}>
                        Publish
                    </div>

                </div>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                        <div className="bg-white rounded-lg p-6 shadow-lg w-1/2">
                            <div className="flex mobile:max-tablet:w-full gap-2 items-center">
                                <label className="text-lg font-normal">Title :</label>
                                <input type="text"  className="border"  />
                            </div>
                            <div className="flex justify-end">
                                <button className="bg-gray-300 rounded-lg px-4 py-2 mr-2" onClick={handleCloseModal}>Cancel</button>
                                <button className="bg-blue-600 text-white rounded-lg px-4 py-2" onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                )}
                <hr className='border-t-2 bg-slate-500 mt-2 mb-3 ml-3 mr-3' />
                <Outlet />
                <br></br>
            </div>
        </div>
    )
}

export default NoticeBoard