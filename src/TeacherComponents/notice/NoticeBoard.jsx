import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AuthContext from '../../Context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewNotice from "./utils/NewNotice";

function NoticeBoard() {
    const [selectedLink, setSelectedLink] = useState('/Teacher-Dashboard/noticeboard/teacher');
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleLinkSelect = (link) => {
        setSelectedLink(link);
    };

    return (
        <div className=" flex flex-col px-3 mobile:max-tablet:px-0  items-start mt-2 mb-3">
            <ToastContainer />
            <div className="flex justify-between mobile:max-tablet:px-2  w-full">
                <h1 className='text-3xl mobile:max-tablet:text-lg'>Notice Board</h1>
                <div className="w-fit text-base font-normal text-white bg-purple-300 rounded-lg shadow-md mobile:max-tablet:p-1 p-2 cursor-pointer" onClick={handleOpenModal}>
                    Publish
                </div>
            </div>

            <div className=' border shadow-md mt-4 rounded-lg w-full '>
                <div className=" flex   ml-3 mr-3 items-center justify-between border-b-2 ">
                    <div className=" flex  gap-2 mt-2 -mb-0.5 ">
                        {/* <Link
                            to={'/Teacher-Dashboard/noticeboard/allnotice'}
                            className={`text-xl font-medium px-2 rounded-lg py-1 ${selectedLink === '/Teacher-Dashboard/noticeboard/allnotice' ? 'bg-secondary ' : 'bg-gray-300'}`}
                            onClick={() => handleLinkSelect('/Teacher-Dashboard/noticeboard/allnotice')}
                        >
                            All
                        </Link> */}
                        <Link
                            to={'/Teacher-Dashboard/noticeboard/teacher'}
                            className={`text-xl mobile:max-tablet:text-sm font-medium px-2   py-1 ${selectedLink === '/Teacher-Dashboard/noticeboard/teacher' ? 'text-purple-600 border-b-2 border-purple-600 ' : ''}`}
                            onClick={() => handleLinkSelect('/Teacher-Dashboard/noticeboard/teacher')}
                        >
                            For You
                        </Link>
                        <Link
                            to={'/Teacher-Dashboard/noticeboard/upload'}
                            className={`text-xl mobile:max-tablet:text-sm font-medium px-2  py-1 ${selectedLink === '/Teacher-Dashboard/noticeboard/upload' ? 'text-purple-600 border-b-2 border-purple-600 ' : ''}`}
                            onClick={() => handleLinkSelect('/Teacher-Dashboard/noticeboard/upload')}
                        >
                            By You
                        </Link>
                    </div>
                </div>
                <Outlet />
                <br></br>
            </div>
            {showModal ? <NewNotice setShowModal={setShowModal} /> : <></>}

        </div>
    )
}

export default NoticeBoard