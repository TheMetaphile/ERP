import React from 'react'
import Calendar from '../Attendance/utils/CalendarTile';
import AttendenceTable from './utils/AttendenceTable';
import ApplyLeave from './utils/ApplyLeave'
import ProgressCard from '../assignment_report/utils/progressCard';
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js/auto";

ChartJS.register(Tooltip, Legend, ArcElement);
export default function leave() {
    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            }
        }
    };

    const chartData = {

        datasets: [{
            data: [63, 17, 10],
            backgroundColor: [
                '#4caf50',
                '#FE8D01',
                '#ff0000'
            ],
            bg: ['text-red-600', 'text-green-600', 'text-yellow-400'],
            hoverOffset: 4,
            cutout: "80%",
            borderRadius: 30,
            borderColor: "transparent"
        }]
    };
    return (
        <div className=" flex flex-col px-3 overflow-y-auto items-start mt-2 ml-2 mr-3 pb-4 no-scrollbar">
            <h1 className='text-xl font-medium'>Your Leave</h1>
            <div className='flex mobile:max-tablet:flex-col items-center gap-3 mb-4 h-fit px-5 py-3 w-full rounded-lg justify-between shadow-lg'>
                <div className='flex flex-col w-44 mobile:max-tablet:w-full h-60 justify-evenly rounded-lg shadow-lg  text-center font-medium text-lg '>
                    <div>
                    <Doughnut data={chartData} options={options} className='w-44 h-44'/>
                    </div>
                    <h1>Total Leave Status</h1>
                </div>
                <ProgressCard
                    title='Approved'
                    percent='63'
                    centerText='63'
                    trailColor='#c8ebc9'
                    strokeColor='#4caf50'
                />
                <ProgressCard
                    title='Pending'
                    percent='17'
                    centerText='17'
                    trailColor='#FFD8B2'
                    strokeColor='#FE8D01'
                />
                <ProgressCard
                    title='Rejected'
                    percent='10'
                    centerText='10'
                    trailColor='#ffd6d6'
                    strokeColor='#ff0000'
                />
            </div>

            <h1 className=" text-xl font-medium">Total New Leave</h1>
            <div className="gap-2 overflow-x-auto flex w-full tablet:justify-evenly my-4 mobile:max-tablet:flex-col items-center">
                <div className=" tablet:w-2/3  mobile:max-tablet:w-full  mobile:max-tablet:mb-5 ">
                    <Calendar />
                </div>
                <div className=" tablet:w-fit  py-3 mobile:max-tablet:w-full flex-grow">
                    <ApplyLeave />
                </div>
            </div>

            <h1 className="text-xl font-medium">Old Leave</h1>
            
            <AttendenceTable />
            
        </div>
    )
}

