import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewNotice from "./utils/NewNotice";
import { motion } from "framer-motion";
import { FaClipboardList, FaUpload, FaPlusCircle } from "react-icons/fa";

function NoticeBoard() {
    const [selectedLink, setSelectedLink] = useState('/Teacher-Dashboard/noticeboard/teacher');
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleLinkSelect = (link) => setSelectedLink(link);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col px-3 mobile:max-tablet:px-0 items-start mt-2 mb-3 bg-blue-50"
        >
            <ToastContainer />
            <div className="flex justify-between mobile:max-tablet:px-2 w-full items-center mb-4 py-3">
                <motion.h1 
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    className='text-3xl mobile:max-tablet:text-lg font-medium text-black items-center flex'
                >
                    <FaClipboardList className="inline-block mr-2" />
                    Notice Board
                </motion.h1>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center text-base font-medium text-white bg-blue-600 rounded-lg shadow-md mobile:max-tablet:p-2 p-3 cursor-pointer transition-colors duration-300 hover:bg-blue-700"
                    onClick={handleOpenModal}
                >
                    <FaPlusCircle className="mr-2" />
                    Publish
                </motion.button>
            </div>

            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='border shadow-lg rounded-lg w-full bg-white overflow-hidden'
            >
                <div className="flex ml-3 mr-3 items-center justify-between ">
                    <div className="flex gap-4 mt-2">
                        <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                            <Link
                                to={'/Teacher-Dashboard/noticeboard/teacher'}
                                className={`text-xl mobile:max-tablet:text-sm font-medium px-4 py-2 rounded-t-lg transition-colors duration-300 flex items-center ${selectedLink === '/Teacher-Dashboard/noticeboard/teacher' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                                onClick={() => handleLinkSelect('/Teacher-Dashboard/noticeboard/teacher')}
                            >
                                <FaClipboardList className="mr-2" />
                                For You
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                            <Link
                                to={'/Teacher-Dashboard/noticeboard/upload'}
                                className={`text-xl mobile:max-tablet:text-sm font-medium px-4 py-2 rounded-t-lg transition-colors duration-300 flex items-center ${selectedLink === '/Teacher-Dashboard/noticeboard/upload' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                                onClick={() => handleLinkSelect('/Teacher-Dashboard/noticeboard/upload')}
                            >
                                <FaUpload className="mr-2" />
                                By You
                            </Link>
                        </motion.div>
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Outlet />
                </motion.div>
            </motion.div>
            {showModal && <NewNotice setShowModal={setShowModal} />}
        </motion.div>
    )
}

export default NoticeBoard