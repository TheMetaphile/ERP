import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ProgressCard from "../assignment_report/utils/progressCard"
import SubjectHomeWorkTile from "./utils/SubjectHomeWorkTile"
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js/auto";
import axios from 'axios'
import Loading from "../../LoadingScreen/Loading";
import AuthContext from "../../Context/AuthContext";
import { BASE_URL_Homework } from "../../Config";

ChartJS.register(Tooltip, Legend, ArcElement);

export default function SubjectHomeWork() {
    const { name } = useParams();

    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        const fetchHomework = async () => {
            console.log(authState.userDetails.currentClass, new Date().getMonth() + 1, authState.userDetails.academicYear, authState.userDetails.section, name)
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL_Homework}/homework/fetch/student?class=${authState.userDetails.currentClass}&month=${new Date().getMonth() + 1}&year=${authState.userDetails.academicYear}&section=${authState.userDetails.section}&subject=${name}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    }
                });

                setDetails(response.data.homework);
                console.log('fetch', response.data)
            } catch (error) {
                console.error("Error fetching student homework:", error);
            }
            finally {
                setLoading(false)
            }
        };

        fetchHomework();
    }, [authState.accessToken]);

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
    return (
        <div className=" flex flex-col px-3 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar">
            <h1 className="text-xl font-medium">{name} HomeWork</h1>
            <div className='flex mobile:max-tablet:flex-col items-center gap-3 mb-4 h-fit px-5 py-3 w-full rounded-lg justify-between shadow-lg'>
                <div className='flex flex-col w-44 mobile:max-tablet:w-full h-60 justify-evenly rounded-lg shadow-lg  text-center font-medium text-lg '>
                    <div>
                        <Doughnut data={chartData} options={options} className='w-44 h-44' />
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
            {loading ? (
                <Loading />
            ) : details.length === 0 ? (
                <>No homework found</>
            ) : (
                <SubjectHomeWorkTile subject={name} details={details} />

            )
            }
            {/* <SubjectHomeWorkTile subject={name} classwork='Write a Essay on My Mother ?' assignedDate='01-05-2024' bg='bg-green-200' />
            <SubjectHomeWorkTile subject={name} classwork='Complete Exercise 2.9 .' assignedDate='31-04-2024' bg='bg-red-200' />
            <SubjectHomeWorkTile subject={name} classwork='Complete Exercise 2.9 .' assignedDate='30-04-2024' bg='bg-purple-200' />
            <SubjectHomeWorkTile subject={name} classwork='Complete Exercise 2.9 .' assignedDate='29-04-2024' bg='bg-green-200' /> */}

        </div>

    )
}