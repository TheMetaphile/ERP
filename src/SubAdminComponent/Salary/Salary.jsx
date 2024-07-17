import React, { useState } from "react";
import Tabs from "./utils/Tabs";
import Dashboard from "./utils/Dashboard";
import profile from '../../assets/Shailesh.jpg'
import { GoBell } from "react-icons/go";
import { IoChatbubbleOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

const data = {
    collectionReport: {
        totalExpectedAmount: "₹ 5,20,000",
        totalCollectedAmount: "₹ 2,20,000",
        totalRemainingAmount: "₹ 3,00,000",
        growthPerformance: "+ 8.9%",
    },
    transactions: [
        { id: 1, name: "Yuvraj Kumar", date: "03 April 2023", transactionId: "1491255800", amount: "₹ 80,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 2, name: "Abhishek Kumar", date: "04 April 2023", transactionId: "1491255801", amount: "₹ 80,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Alok Kumar", date: "05 April 2023", transactionId: "1491255802", amount: "₹ 80,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Shivam Kumar", date: "04 April 2023", transactionId: "1491255802", amount: "₹ 80,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Abhishek Kumar", date: "05 April 2023", transactionId: "1491255802", amount: "₹ 80,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Abhay Kumar", date: "13 April 2023", transactionId: "1491255802", amount: "₹ 80,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Atul Kumar", date: "28 April 2023", transactionId: "1491255802", amount: "₹ 80,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Abhishek Kumar", date: "12 April 2023", transactionId: "1491255802", amount: "₹ 80,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Ajay Kumar", date: "11 April 2023", transactionId: "1491255802", amount: "₹ 80,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
    ],
    Credit: [
        { id: 1, name: "Lokesh Kumar", date: "19 April 2023", CreditId: "1491255800", amount: "₹ 10,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 2, name: "Akash Kumar", date: "20 April 2023", CreditId: "1491255801", amount: "₹ 20,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "beena Kumari", date: "20 April 2023", CreditId: "1491255802", amount: "₹ 30,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Shivam Singh", date: "20 April 2023", CreditId: "1491255802", amount: "₹ 40,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Abhi Kumar", date: "24 April 2023", CreditId: "1491255802", amount: "₹ 50,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Abha Sharma", date: "24 April 2023", CreditId: "1491255802", amount: "₹ 60,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Atulya verma", date: "24 April 2023", CreditId: "1491255802", amount: "₹ 70,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Nitin Kumar", date: "24 April 2023", CreditId: "1491255802", amount: "₹ 80,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Anunay Singh", date: "12 April 2023", CreditId: "1491255802", amount: "₹ 90,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
    ],
    Debit: [
        { id: 1, name: "Divya Kumar", date: "23 April 2023", DebitId: "1491255800", amount: "₹ 30,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 2, name: "Shekhar Kumar", date: "23 April 2023", DebitId: "1491255801", amount: "₹ 40,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Himani singh", date: "24 April 2023", DebitId: "1491255802", amount: "₹ 60,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Pooja Kumar", date: "24 April 2023", DebitId: "1491255802", amount: "₹ 70,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Poonam Kumar", date: "24 April 2023", DebitId: "1491255802", amount: "₹10,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Abhinya Kumar", date: "24 April 2023", DebitId: "1491255802", amount: "₹ 40,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Atul Kumar", date: "18 April 2023", DebitId: "1491255802", amount: "₹ 60,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Abhishek Kumar", date: "18 April 2023", DebitId: "1491255802", amount: "₹ 40,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
        { id: 3, name: "Ajay Kumar", date: "18 April 2023", DebitId: "1491255802", amount: "₹ 30,000", phoneNumber: "+919024743491", paymentMethod: "UPI", status: "Success" },
    ], Due: [
        { id: 1, name: "Durgesh Kumar", date: "19 April 2023", amount: "₹ 30,000", phoneNumber: "+919024743491", status: "Due" },
        { id: 2, name: "Shikha Kumar", date: "19 April 2023", amount: "₹ 40,000", phoneNumber: "+919024743491", status: "Due" },
        { id: 3, name: "Shaan Kumar", date: "19 April 2023", amount: "₹ 20,000", phoneNumber: "+919024743491", status: "Due" },
        { id: 3, name: "Shivam Kumar", date: "19 April 2023", amount: "₹ 50,000", phoneNumber: "+919024743491", status: "Due" },
        { id: 3, name: "Abhishek Kumar", date: "18 April 2023", amount: "₹ 50,000", phoneNumber: "+919024743491", status: "Due" },
        { id: 3, name: "Alokik Kumar", date: "18 April 2023", amount: "₹ 80,000", phoneNumber: "+919024743491", status: "Due" },
        { id: 3, name: "Archana Kumar", date: "18 April 2023", amount: "₹ 80,000", phoneNumber: "+919024743491", status: "Due" },
        { id: 3, name: "Abhishek Kumar", date: "18 April 2023", amount: "₹ 80,000", phoneNumber: "+919024743491", status: "Due" },
        { id: 3, name: "Ajay Kumar", date: "23 April 2023", amount: "₹ 80,000", phoneNumber: "+919024743491", status: "Due" },
    ],
    chartData: [
        { date: '22 Jul', amount: 10 },
        { date: '23 Jul', amount: 20 },
        { date: '24 Jul', amount: 30 },
    ],


};

function Salary() {
    const [selectedTab, setSelectedTab] = useState("Reports");

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <div className="pt-20">
            <header className="p-4 mobile:max-tablet:p-2 flex justify-between items-center mobile:max-tablet:flex-col mobile:max-tablet:items-start">
                <div>
                    <h1 className="text-3xl font-semibold mb-2 mobile:max-laptop:text-lg whitespace-nowrap">Welcome Abhishek</h1>
                    <p className="text-sm">Senior Admin</p>
                </div>
                <div className=" flex tablet:items-center">
                    <div className="">

                        <input
                            type="text"
                            placeholder="Search Accounts"
                            className="tablet:max-laptop:px-8 desktop:px-12 mobile:max-tablet:py-1 mt-2 tablet-py-2 rounded-md border tablet:mx-10"
                        />
                    </div>
                    <div className="icons flex items-center gap-4 mobile:max-tablet:hidden">
                        <div className="bell"><GoBell className=" h-9 w-9 mobile:max-tablet:h-4 mobile:max-laptop:w-4 cursor-pointer" /></div>
                        <div className="message"><IoChatbubbleOutline className=" h-9 w-9 mobile:max-tablet:h-4 mobile:max-laptop:w-4 cursor-pointer" /></div>
                    </div>
                    <div className="flex items-center ml-4 mobile:max-tablet:hidden">
                        <div>
                            <img src={profile} alt="profile.jpg" className=" h-10 w-10 rounded mr-2" />
                        </div>
                        <div className=" flex items- flex-col">
                            <p className=" text-lg mobile:max-laptop:text-sm whitespace-nowrap"> Abhishek Kumar</p>
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
