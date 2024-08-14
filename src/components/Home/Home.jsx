import React, { useState, useContext, useEffect } from "react";
import Doughnut from './utils/AttendanceCard/PieChart';
import ProfileCard from './utils/ProfileCard/ProfileCard';
import FeeStatus from './utils/FeeStatus/FeeStatus';
import AllSubjectProgress from './utils/SubjectProgress/AllSubjectProgress';
import axios from 'axios';
import AuthContext from "../../Context/AuthContext";
import Loading from "../../LoadingScreen/Loading";
import { BASE_URL_Attendence } from "../../Config";

export default function Home() {
  const { authState } = useContext(AuthContext);
  const [data, setData] = useState({ absent: 0, present: 0, leave: 0 });
  const [loading, setLoading] = useState(false);

  const chartData = {
    labels: ['Absent', 'Present', 'Leave'],
    datasets: [{
      label: 'Attendance',
      data: [data.absent, data.present, data.leave],
      backgroundColor: ['#EB3232', '#7BD850', '#F8EE00'],
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
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const response = await axios.get(`${BASE_URL_Attendence}/studentAttendance/fetch/student/stats?month=${month}&year=${year}`, {
          headers: {
            Authorization: `Bearer ${authState.accessToken}`,
          }
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching student month attendance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [authState.accessToken]);

  return (
    <div className='flex flex-col w-full h-screen mt-3 overflow-y-auto space-y-6 p-4 mobile:p-2 tablet:p-6 no-scrollbar mb-2'>
          <h2 className='text-xl tablet:text-4xl font-semibold text-text_blue '>Student Dashboard</h2>

      <ProfileCard />
      
      <section>
        <FeeStatus />
      </section>
      
      <section className='flex flex-col-reverse laptop:flex-row laptop:space-x-6 gap-4 space-y-6 laptop:space-y-0'>
        <div className=' laptop:w-2/3 h-72'>
          <h2 className='text-xl tablet:text-2xl font-semibold text-text_blue mb-1'>Subject Progress</h2>
          <div className='bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl border border-gray-300 shadow-md p-4 h-full '>
            <AllSubjectProgress />
          </div>
        </div>
        
        <div className='laptop:w-1/3'>
        <h2 className='text-xl tablet:text-2xl font-semibold text-text_blue mb-1'>Attendance Progress</h2>

          <div className='bg-white rounded-xl border border-gray-300 shadow-md p-4'>
            {loading ? <Loading /> : <Doughnut chartData={chartData} title='Attendance Status' />}
          </div>
        </div>
      </section>
    </div>
  );
}