import { useParams } from "react-router-dom";
import ProgressCard from "../assignment_report/utils/progressCard"
import SubjectHomeWorkTile from "./utils/SubjectHomeWorkTile"
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js/auto";

ChartJS.register(Tooltip, Legend, ArcElement);

export default function SubjectHomeWork(){
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
            data: [5, 4, 1],
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
    const { name } = useParams();
    return (
        <div className=" flex flex-col px-3 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar">
            <h1 className="text-xl font-medium">{name} HomeWork</h1>
            <div className='flex mobile:max-tablet:flex-col items-center gap-3 mb-4 h-fit px-5 py-3 w-full rounded-lg justify-between shadow-lg'>
                <div className='flex flex-col w-44 mobile:max-tablet:w-full h-60 justify-evenly rounded-lg shadow-lg  text-center font-medium text-lg '>
                    <div>
                    <Doughnut data={chartData} options={options} className='w-44 h-44'/>
                    </div>
                    <h1>Total</h1>
                </div>
                <ProgressCard
                    title='Checked'
                    percent='50'
                    centerText='5'
                    trailColor='#c8ebc9'
                    strokeColor='#4caf50'
                />
                <ProgressCard
                    title='Unchecked'
                    percent='40'
                    centerText='4'
                    trailColor='#FFD8B2'
                    strokeColor='#FE8D01'
                />
                <ProgressCard
                    title='Incomplete'
                    percent='10'
                    centerText='1'
                    trailColor='#ffd6d6'
                    strokeColor='#ff0000'
                />
            </div>
            <h1 className="text-xl font-medium mt-4 ">List of HomeWork</h1>
            <SubjectHomeWorkTile subject={name} classwork='Write a Essay on My Mother ?' assignedDate='01-05-2024' bg='bg-green-200'/>
            <SubjectHomeWorkTile subject={name} classwork='Complete Exercise 2.9 .' assignedDate='31-04-2024' bg='bg-red-200'/>
            <SubjectHomeWorkTile subject={name} classwork='Complete Exercise 2.9 .' assignedDate='30-04-2024' bg='bg-purple-200'/>
            <SubjectHomeWorkTile subject={name} classwork='Complete Exercise 2.9 .' assignedDate='29-04-2024' bg='bg-green-200'/>
           
        </div>
        
    )
}