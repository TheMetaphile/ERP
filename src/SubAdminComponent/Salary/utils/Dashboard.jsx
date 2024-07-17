import React from "react";
// import Credit from "./Credit";
import Transactions from './Transactions'


const Dashboard = ({ selectedTab, data }) => {
    return (
        <div className="p-4">
            {selectedTab === "Reports" && (
                <div>
                    <div className="flex justify-between">
                        <div>
                            <h2 className="text-xl">Collection Report</h2>
                            <p>Total Expected Amount: {data.collectionReport.totalExpectedAmount}</p>
                            <p>Total Collected Amount: {data.collectionReport.totalCollectedAmount}</p>
                            <p>Total Remaining Amount: {data.collectionReport.totalRemainingAmount}</p>
                            <p>Growth Performance: {data.collectionReport.growthPerformance}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="bg-gray-100 p-4 rounded shadow">
                            <div className="h-64">Chart</div>
                        </div>
                    </div>
                </div>
            )}
            {selectedTab === "Transactions" && (
                <Transactions transactions={data.transactions} />
            )}
            {selectedTab === "Credit" && (
                <Transactions transactions={data.transactions} />
            )}
            {selectedTab === "Debit" && (
                <Transactions transactions={data.transactions} />
            )}
            {selectedTab === "Due" && (
                <Transactions transactions={data.transactions} />
            )}
            {/* Add similar blocks for other tabs */}
        </div>
    );
};

export default Dashboard;
