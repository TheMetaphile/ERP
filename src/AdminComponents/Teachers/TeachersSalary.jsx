import React from "react";
import HeadersCard from "./utils/TeachersHeadersCard";
import SalaryDetails from "./utils/SalaryDetails";

export default function TeachersSalary() {
    const Cardsdata = [
        {
            heading: "300", description: "Total Teachers"
        },
        {
            heading: "473 Hours", description: "Working Hours"
        },
        {
            heading: "2 Lakh", description: "Payable Amount"
        },
        {
            heading: "15 Hundred", description: "Deduction Amount"
        }
    ];
    const teachersList = [
        { name: 'Alice', id: '1', paidHours: "160 Hours", grossPay: "Rs 5000", deduction: "Rs 500", incentive: "Rs 500", netPay: "Rs 4700", status: 'Paid' },
        { name: 'Bob', id: '2', paidHours: "160 Hours", grossPay: "Rs 5000", deduction: "Rs 480", incentive: "Rs 500", netPay: "Rs 4700", status: 'Paid' },
        { name: 'Abhishek', id: '2', paidHours: "160 Hours", grossPay: "Rs 5000", deduction: "Rs 480", incentive: "Rs 500", netPay: "Rs 4700", status: 'Unpaid' },
        { name: 'Bob', id: '2', paidHours: "160 Hours", grossPay: "Rs 5000", deduction: "Rs 480", incentive: "Rs 500", netPay: "Rs 4700", status: 'Unpaid' },
        { name: 'Bob', id: '2', paidHours: "160 Hours", grossPay: "Rs 5000", deduction: "Rs 480", incentive: "Rs 500", netPay: "Rs 4700", status: 'Unpaid' },
        { name: 'Bob', id: '2', paidHours: "160 Hours", grossPay: "Rs 5000", deduction: "Rs 480", incentive: "Rs 500", netPay: "Rs 4700", status: 'Unpaid' },
        { name: 'Bob', id: '2', paidHours: "160 Hours", grossPay: "Rs 5000", deduction: "Rs 480", incentive: "Rs 500", netPay: "Rs 4700", status: 'Unpaid' },
        { name: 'Bob', id: '2', paidHours: "160 Hours", grossPay: "Rs 5000", deduction: "Rs 480", incentive: "Rs 500", netPay: "Rs 4700", status: 'Unpaid' },
        { name: 'Bob', id: '2', paidHours: "160 Hours", grossPay: "Rs 5000", deduction: "Rs 480", incentive: "Rs 500", netPay: "Rs 4700", status: 'Unpaid' },
    ];

    return (
        <div className="flex flex-col  px-3 my-3">
            <div className="mt-8 mobile:max-tablet:mt-0">
                <HeadersCard data={Cardsdata} />
            </div>
            <div className="mt-12 mx-1">
                <SalaryDetails teachers={teachersList} />
            </div>
        </div>
    )
}