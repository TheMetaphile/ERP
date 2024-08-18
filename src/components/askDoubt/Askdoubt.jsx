import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";

export default function Askdoubt() {
    const [selectedLink, setSelectedLink] = useState('/Student-Dashboard/askdoubt/mydoubts');

    const handleLinkSelect = (link) => {
        setSelectedLink(link);
    };

    return (
        <div className="flex flex-col px-3 h-screen overflow-y-auto items-start mb-3 no-scrollbar">

            <Outlet />
        </div>
    );
}
