import React, { useState, useContext, useEffect } from "react";
import Doughnut from './utils/AttendanceCard/PieChart.jsx';
import ProfileCard from './utils/ProfileCard/ProfileCard.jsx';
import FeeStatus from './utils/FeeStatus/FeeStatus.jsx';
import AllSubjectProgress from './utils/SubjectProgress/AllSubjectProgress.jsx';
import axios from 'axios'
import AuthContext from "../../Context/AuthContext.jsx";
import Loading from "../../LoadingScreen/Loading.jsx";

export default function Home() {
  const { authState } = useContext(AuthContext);
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  const chartData = {
    labels: [
      'Absent',
      'Present',
      'Leave'
    ],
    datasets: [{
      label: 'Attendance',
      data: [data.absent, data.present, data.leave],
      backgroundColor: [
        '#EB3232',
        '#7BD850',
        '#F8EE00'
      ],
      bg: ['text-red-600', 'text-green-600', 'text-yellow-400'],
      hoverOffset: 4,
      cutout: "80%",
      borderRadius: 60,
      borderColor: "transparent"
    }]
  };

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const today = new Date();
        const month = parseInt(today.getMonth() + 1, 10);
        const year = today.getFullYear();
        const response = await axios.get(`https://attendance-api-lako.onrender.com/studentAttendance/fetch/student/stats?month=${month}&year=${year}`, {
          headers: {
            Authorization: `Bearer ${authState.accessToken}`,
          }
        });
        console.log('y', year);
        console.log('m', month)
        console.log('data', response.data)
        setData(response.data)
      } catch (error) {
        console.error("Error fetching student month attendance:", error);
      }
      finally {
        setLoading(false)
      }
    };

    fetchStudents();
  }, [authState.accessToken]);


  return (
    <div className='flex flex-col w-full h-screen overflow-y-auto items-start mt-2 px-2 no-scrollbar'>
      <ProfileCard name='Abhishek' class='4th' section="B" rollNumber='21' session='2023-24' notification={4} />
      <h1 className='text-2xl font-medium text-black mt-3 mb-2 ml-2'>Fee Status</h1>
      <FeeStatus />
      <h1 className='text-2xl font-medium text-black mt-3 mb-2 ml-2'>Subject's Progress</h1>
      <div className='flex mobile:max-tablet:flex-col-reverse w-full mt-2 '>
        <div className='flex-grow px-2 tablet:h-80 tablet:pb-3 mobile:max-tablet:mb-5'>
          <AllSubjectProgress />
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className='tablet:h-full pb-3 mobile:max-tablet:w-full  mobile:max-tablet:mb-4 px-2 tablet:w-80 '>
            <Doughnut chartData={chartData} title='Attendance Status' />
          </div>
        )}

      </div>
    </div>
  );
}
