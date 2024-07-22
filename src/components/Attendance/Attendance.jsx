import React, { useState, useContext, useEffect } from "react";
import PresentAttendanceTile from "./utils/PresentTile";
import TotalAttendance from "./utils/TotalAttendaceTile";
import Present from './../../assets/present1.png';
import Absent from './../../assets/absent1.png';
import Leave from './../../assets/leave.png';
import Calendar from "./utils/CalendarTile";
import Doughnut from "./../Home/utils/AttendanceCard/PieChart";
import AuthContext from "../../Context/AuthContext";
import axios from 'axios'
import Loading from "../../LoadingScreen/Loading"
import { BASE_URL_Attendence } from "../../Config";

export default function Attendance() {
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
      borderColor: "transparent",
    }]
  };

  const currentDate = new Date();

  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const months = [
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 },
  ];

  const years = Array.from({ length: 30 }, (v, i) => ({
    value: new Date().getFullYear() - 15 + i,
    label: new Date().getFullYear() - 15 + i,
  }));

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);
  };

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);

  };
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL_Attendence}/studentAttendance/fetch/student/stats?month=${selectedMonth}&year=${selectedYear}`, {
          headers: {
            Authorization: `Bearer ${authState.accessToken}`,
          }
        });
        setData(response.data)
      } catch (error) {
        console.error("Error fetching student month attendance:", error);
      }
      finally {
        setLoading(false)
      }
    };

    fetchStudents();
  }, [authState.accessToken, selectedMonth, selectedYear]);
  return (
    <div className=" flex flex-col w-full overflow-y-auto items-start px-2 mb-1 pb-4 no-scrollbar mt-2">
      <div className="flex mobile:max-tablet:flex-col justify-between w-full mb-2 gap-2 mobile:max-tablet:mt-2">
        <h1 className="text-2xl mobile:max-tablet:text-lg font-medium">Attendance</h1>
        <div className=" mobile:max-tablet:flex gap-2">
          <select
            id="month-selector"
            value={selectedMonth}
            onChange={(e) => handleMonthChange(e.target.value)}
            className="border rounded p-2 mobile:max-tablet:mx-0 mx-2 flex-1"
          >
            <option value="" disabled>Select a month</option>
            {months.map((month, index) => (
              <option key={index} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
          <select
            id="year-selector"
            value={selectedYear}
            onChange={(e) => handleYearChange(e.target.value)}
            className="border rounded p-2 mx-2 mobile:max-tablet:mx-0 flex-1"
          >
            <option value="" disabled>Select a year</option>
            {years.map((year) => (
              <option key={year.value} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {loading ? (
        <div className=" self-center ">
          <Loading />
        </div>
      ) : (
        <>
          <div className=" flex w-full justify-start mobile:max-tablet:flex-col gap-2">
            <TotalAttendance TotalAttendance={data.present + data.leave + data.absent} />
            <PresentAttendanceTile Present={data.present} image={Present} text="Present" />
            <PresentAttendanceTile Present={data.absent} image={Absent} text="Absent" />
            <PresentAttendanceTile Present={data.leave} image={Leave} text="Leave" />
          </div>
          <div className=" flex w-full  mobile:max-laptop:h-80 tablet:max-laptop:justify-evenly mobile:max-laptop:flex-col items-center mt-4 mb-4 gap-2 ">
            <div className=" mobile:max-laptop:w-full flex-1 ">
              <Calendar month={selectedMonth} year={selectedYear} />
            </div>
            <div className=" h-96  mobile:max-laptop:w-full flex-1 ">
              <Doughnut chartData={chartData} title='Attendance Status' />
            </div>
          </div>
        </>
      )}

    </div>
  )
}
