import React from "react";
import AnnouncementList from "./utils/NoticeList.jsx";
import NoticeUser from "./utils/NoticeUser.jsx";

export default function Notice(){
    return(
           <div className="mx-2">
            <div className="mt-2 w-full flex flex-col rounded-lg shadow-lg mb-4">
                <NoticeUser/>
            </div>
            </div>
   
    )
} 