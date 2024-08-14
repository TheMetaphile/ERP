import { useState } from "react";
import Credit from "./Credit";
import Debit from "./Debit";
import Transactions from './Transactions'
import Due from "./Due";
import DetailDialog from "./DetailDialog";
import ChartComponent from "./ChartComponent";

const Dashboard = ({ selectedTab, data }) => {
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const handleRowClick = (Credit) => {
        setSelectedTransaction(Credit);
    };

    const handleCloseDialog = () => {
        setSelectedTransaction(null);
    };

    return (
        <div className="p-4">
            {selectedTab === "Reports" && (
                <ChartComponent
                    chartData={data.chartData}
                    collectionReport={data.collectionReport}
                />
            )}
            {selectedTab === "Transactions" && (
                <Transactions transactions={data.transactions} />
            )}
            {selectedTab === "Credit" && (
                <Credit Credit={data.Credit} onRowClick={handleRowClick} />
            )}
            <DetailDialog Credit={selectedTransaction} onClose={handleCloseDialog} />
            {selectedTab === "Debit" && (
                <Debit Debit={data.Debit} onRowClick={handleRowClick} />
            )}
            {selectedTab === "Due" && (
                <Due Due={data.Due} />
            )}
        </div>
    );
};

export default Dashboard;
