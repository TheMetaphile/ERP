import React, { useState } from "react";
import Tabs from "./utils/Tabs";
import Dashboard from "./utils/Dashboard";
import profile from '../../assets/Shailesh.jpg'
import { GoBell } from "react-icons/go";
import { IoChatbubbleOutline } from "react-icons/io5";

const data = {
    collectionReport: {
        totalExpectedAmount: "₹ 5,20,000",
        totalCollectedAmount: "₹ 2,20,000",
        totalRemainingAmount: "₹ 3,00,000",
        growthPerformance: "+ 8.9%",
    },
    transactions: [
        { id: 1, name: "Yuvraj Kumar", date: "03 April 2023", transactionId: "1491255800", amount: "₹ 80,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 2, name: "Abhishek Kumar", date: "03 April 2023", transactionId: "1491255801", amount: "₹ 80,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Alok Kumar", date: "03 April 2023", transactionId: "1491255802", amount: "₹ 80,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Shivam Kumar", date: "03 April 2023", transactionId: "1491255802", amount: "₹ 80,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Abhishek Kumar", date: "03 April 2023", transactionId: "1491255802", amount: "₹ 80,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Abhay Kumar", date: "03 April 2023", transactionId: "1491255802", amount: "₹ 80,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Atul Kumar", date: "03 April 2023", transactionId: "1491255802", amount: "₹ 80,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Abhishek Kumar", date: "03 April 2023", transactionId: "1491255802", amount: "₹ 80,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Ajay Kumar", date: "03 April 2023", transactionId: "1491255802", amount: "₹ 80,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
    ],

};

function Salary() {
    const [selectedTab, setSelectedTab] = useState("Reports");

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <div className="pt-20">
            <header className="p-4 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-semibold mb-2 mobile:max-tablet:text-lg whitespace-nowrap">Welcome Abhishek</h1>
                    <p className="text-sm">Senior Admin</p>
                </div>
                <div className=" flex items-center">
                    <div className="">
                        <input
                            type="text"
                            placeholder="Search Accounts"
                            className="px-12 py-2 rounded-md border"
                        />
                    </div>
                    <div className="icons flex items-center gap-4">
                        <div className="bell"><GoBell className=" h-9 w-9" /></div>
                        <div className="message"><IoChatbubbleOutline className=" h-9 w-9" /></div>
                    </div>
                    <div className="flex items-center ml-4">
                        <div>
                            <img src={profile} alt="profile.jpg" className=" h-10 w-10 rounded mr-2" />
                        </div>
                        <div className=" flex items- flex-col">
                            <p className=" text-lg"> Abhishek Kumar</p>
                            <p className=" text-sm text-gray-500">Senior Admin</p>
                        </div>
                    </div>
                </div>
            </header>
            <Tabs selectedTab={selectedTab} onTabChange={handleTabChange} />
            <Dashboard selectedTab={selectedTab} data={data} />
        </div>
    );
}

export default Salary;
