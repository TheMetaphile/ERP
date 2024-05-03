import PresentAttendanceTile from "./utils/PresentTile";
import TotalAttendance from "./utils/TotalAttendaceTile";
import Present from './../../assets/present1.png';
import Absent from './../../assets/absent1.png';
import Leave from './../../assets/leave.png';
import Calendar from "./utils/CalendarTile";
import  Doughnut  from "./../Home/utils/AttendanceCard/PieChart";
export default function Attendance() {
  const data = {
    labels: [
      'Absent',
      'Present',
      'Leave'
    ],
    datasets: [{
      label: 'Attendance',
      data: [2, 45, 4],
      backgroundColor: [
        '#EB3232',
        '#7BD850',
        '#F8EE00'
      ],
      bg: ['text-red-600', 'text-green-600', 'text-yellow-400'],
      hoverOffset: 4,
      cutout: "80%",
      borderRadius: 30,
      borderColor: "transparent"
    }]
  };
  return (
    <div className=" flex flex-col w-full h-screen overflow-y-auto items-start px-3 py-3 no-scrollbar">
      <h1 className="text-2xl font-medium">Attendance</h1>
      <div className="flex w-full justify-start ">
        <TotalAttendance TotalAttendance={260}/>
        <PresentAttendanceTile Present={230} image={Present} text="Present"/>
        <PresentAttendanceTile Present={230} image={Absent} text="Absent"/>
        <PresentAttendanceTile Present={230} image={Leave} text="Leave"/>
      </div>
      <div className="flex w-full justify-evenly my-4">
        <Calendar />
        <Doughnut chartData={data} title='Attendance Status'/>
      </div>
    </div>
  )
}
