import React from 'react';
import Doughnut from './utils/AttendanceCard/PieChart.jsx';
import ProfileCard from './utils/ProfileCard/ProfileCard.jsx';
import FeeStatus from './utils/FeeStatus/FeeStatus.jsx';
import AllSubjectProgress from './utils/SubjectProgress/AllSubjectProgress.jsx';


export default function Home() {
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
    <div className='flex flex-col w-full h-screen overflow-y-auto items-start mt-2 px-2 no-scrollbar'>
      <ProfileCard name='Abhishek' class='4th' section="B" rollNumber='21' session='2023-24' notification={4}/>
      <h1 className='text-2xl font-medium text-black mt-3 mb-2 ml-2'>Fee Status</h1>
      <FeeStatus />
      <h1 className='text-2xl font-medium text-black mt-3 mb-2 ml-2'>Subject's Progress</h1>
      <div className='flex mobile:max-tablet:flex-col-reverse w-full mt-2 '>
        <div className='flex-grow px-2 tablet:h-80 tablet:pb-3 mobile:max-tablet:mb-5'>
        <AllSubjectProgress />
        </div>
        <div className='tablet:h-full pb-3 tablet:w-3/12 mobile:max-tablet:w-full  mobile:max-tablet:mb-4 px-2'>
        <Doughnut chartData={data} title='Attendance Status'/>
        </div>
      </div>
    </div>
  );
}
