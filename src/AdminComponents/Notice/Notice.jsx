import React from "react";
import NoticeUser from "./utils/NoticeUser.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Notice(){
    return(
           <div className="mx-2">
            <ToastContainer />
            <div className="mt-2 w-full flex flex-col rounded-lg shadow-lg mb-4">
                <NoticeUser/>
            </div>
            </div>
   
    )
} 