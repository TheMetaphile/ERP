import React, { useState } from "react";
import Dashboard from "./utils/Dashboard";



function Subresult() {
    const [selectedTab, setSelectedTab] = useState("Reports");

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <div className="pt-20">
            <Dashboard selectedTab={selectedTab} />
        </div>
    );
}

export default Subresult;
