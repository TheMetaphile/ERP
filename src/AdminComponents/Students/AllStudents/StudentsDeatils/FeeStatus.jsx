
import { Doughnut } from 'react-chartjs-2';
import ProfileIcon from './../../../../assets/profileIcon.png';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js/auto";
import { useLocation } from "react-router-dom";

ChartJS.register(Tooltip, Legend, ArcElement);

export default function FeeStatus() {
    const options = {
        plugins: {
            legend: {
                display: false,
            }
        }
    };
    const data = {
        labels: [
            'Paid',
            'Pending',
        ],
        datasets: [{
            label: 'Fee Status',
            data: [9000, 5000],
            backgroundColor: [
                '#7BD850',
                '#EB3232',
            ],
            hoverOffset: 4,
            cutout: "80%",
            borderRadius: 30,
            borderColor: "transparent"
        }]
    };

    const query = new URLSearchParams(useLocation().search);
    const name = query.get('name');
    const classs = query.get('classs');
    const rollNumber = query.get('rollNumber');
    return (
        <div className="flex mobile:max-tablet:flex-col mobile:max-tablet:items-center w-full mb-1 shadow-md rounded-lg bg-white p-2 h-fit">
            <img src={ProfileIcon} alt="ProfileIcon" className="w-20 h-20" />
            <div className='ml-3 mobile:max-tablet:flex-col mobile:max-tablet:text-center'>
                <h3 className="mb-1 mobile:max-tablet:mt-2">{name}</h3>
                <h5 className="mb-1">Class {classs} | Roll No. {rollNumber}</h5>
                <div className='flex mobile:max-tablet:justify-center w-full '>
                    <p className='px-2 py-1 rounded-md bg-teal-100 w-fit shadow-md'></p>
                </div>
            </div>
            <div className='flex h-24 tablet:ml-auto relative'>

                <div className='flex-1 self-center  text-lg font-medium whitespace-nowrap'>
                    <h1>
                        Total Fees :-
                    </h1>
                    <h1>
                        Paid Fees :-
                    </h1>
                    <h1>
                        Pending Fees :-
                    </h1>
                </div>
                <div className='flex-1 self-center ml-2 mr-4 text-lg font-medium'>
                    <h1 className=' text-blue-400'>
                        Rs. 14,000
                    </h1 >
                    <h1 className='text-green-600'>
                        Rs. 9,000
                    </h1>
                    <h1 className='text-red-600'>
                        Rs. 5,000
                    </h1>
                </div>
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
}
