import React, { useState, useContext, useEffect } from "react";
import Doughnut from './utils/AttendanceCard/PieChart';
import ProfileCard from './utils/ProfileCard/ProfileCard';
import FeeStatus from './utils/FeeStatus/FeeStatus';
import AllSubjectProgress from './utils/SubjectProgress/AllSubjectProgress';
import axios from 'axios';
import AuthContext from "../../Context/AuthContext";
import Loading from "../../LoadingScreen/Loading";
import { BASE_URL } from "../../Config";
import { refreshAccessToken } from "../../RefreshTokenHelper";

export default function Home() {
  const { authState, darkMode, updateAccessToken, logout } = useContext(AuthContext);
  const [data, setData] = useState({ absent: 0, present: 0, leave: 0 });
  const [loading, setLoading] = useState(false);

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-white';
  const subTextClass = darkMode ? 'text-gray-300' : 'text-text_blue';
  const cardBgClass = darkMode
    ? 'bg-gradient-to-r from-gray-800 to-gray-900'
    : 'bg-gradient-to-r from-blue-50 to-teal-50';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-300';

  const chartData = {
    labels: ['Absent', 'Present', 'Leave'],
    datasets: [{
      label: 'Attendance',
      data: [data.absent, data.present, data.leave],
      backgroundColor: darkMode
        ? ['#ef4444', '#22c55e', '#eab308']
        : ['#EB3232', '#7BD850', '#F8EE00'],
      bg: darkMode
        ? ['text-red-500', 'text-green-500', 'text-yellow-500']
        : ['text-red-600', 'text-green-600', 'text-yellow-400'],
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
        const response = await axios.get(`${BASE_URL}/studentAttendance/fetch/student/stats?month=${month}&year=${year}`, {
          headers: {
            Authorization: `Bearer ${authState?.accessToken}`,
          }
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching student month attendance:", error);
        if (
          error.response &&
          error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
        ) {
          toast.warn('Access denied. Attempting to refresh token...');
          try {
            const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
            await fetchStudents();
          } catch (refreshError) {
          }
        } else {
          toast.error(error.response?.data?.error || "An error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [authState?.accessToken]);

  return (
    <div
      className={`
        flex flex-col w-full h-screen mt-3 
        overflow-y-auto space-y-6 p-4 
        mobile:p-2 tablet:p-6 no-scrollbar mb-2 
        ${bgClass}
      `}
    >
      <h2 className={`text-xl tablet:text-4xl font-semibold ${subTextClass}`}>
        Student Dashboard
      </h2>

      <ProfileCard darkMode={darkMode} />

      <section>
        <FeeStatus darkMode={darkMode} />
      </section>

      <section
        className='
          flex flex-col-reverse laptop:flex-row 
          laptop:space-x-6 gap-4 space-y-6 laptop:space-y-0
        '
      >
        <div className='laptop:w-2/3 h-72'>
          <h2 className={`text-xl tablet:text-2xl font-semibold ${subTextClass} mb-1`}>
            Subject Progress
          </h2>
          <div
            className={`
              ${cardBgClass} rounded-xl border 
              ${borderClass} shadow-md p-4 h-full
            `}
          >
            <AllSubjectProgress darkMode={darkMode} />
          </div>
        </div>

        <div className='laptop:w-1/3'>
          <h2 className={`text-xl tablet:text-2xl font-semibold ${subTextClass} mb-1`}>
            Attendance Progress
          </h2>

          <div
            className={`
              ${darkMode ? 'bg-gray-800' : 'bg-white'} 
              rounded-xl border ${borderClass} 
              shadow-md p-4
            `}
          >
            {loading ? (
              <Loading />
            ) : (
              <Doughnut
                chartData={chartData}
                title='Attendance Status'
                darkMode={darkMode}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}