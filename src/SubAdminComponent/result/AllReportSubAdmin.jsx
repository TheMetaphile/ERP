import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function AllReportSubAdmin() {
    const [selectedTab, setSelectedTab] = useState("Report Card");

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };
    return (
        <div className='pt-20 px-3'>

            <div className="flex">
                <Link to={`/Sub-Admin/Result`} onClick={() => handleTabChange('Report Card')}>
                    <h1 className={`p-2 mx-1 ${selectedTab === 'Report Card' ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"}`}>
                        Report Card
                    </h1>
                </Link>

                <Link to={`/Sub-Admin/Result/exStudent`} onClick={() => handleTabChange('Ex Student')}>
                    <h1 className={`p-2 mx-1 ${selectedTab === 'Ex Student' ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"}`}>
                        Ex Student
                    </h1>
                </Link>
            </div>
            <Outlet />
        </div>
    )
}

