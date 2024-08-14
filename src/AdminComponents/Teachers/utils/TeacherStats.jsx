import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';

Chart.register(ArcElement);

const TeacherStats = () => {
  const data = {
    labels: ['Total Teachers', 'Female Teachers', 'Male Teachers'],
    datasets: [
      {
        data: [300, 150, 150],
        backgroundColor: ['#4267B2', '#D94D94', '#4285F4'],
        borderWidth: 0,
        cutout: '70%',
        borderRadius: 30,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    layout: {
      padding: 0,
    },
  };

  return (
    <div className="flex gap-4 mobile:max-tablet:gap-2 mobile:max-tablet:flex-col">
      <div className="flex flex-1 flex-col mobile:max-tablet:flex-row  items-center text-center bg-white rounded-lg shadow p-4 w-60 border mobile:max-tablet:gap-2 mobile:max-tablet:w-auto ">
        <div className="w-20 h-20 ">
          {/* <Doughnut data={data} options={options} /> */}
          <Doughnut
            data={{
              labels: ['Female Teachers', 'Male Teachers'],
              datasets: [
                {
                  data: [150, 150], // Update the data values here
                  backgroundColor: ['#D94D94', '#4285F4'],
                  borderWidth: 0,
                  cutout: '70%',
                  borderRadius: 30,
                },
              ],
            }}
            options={options}
          />
        </div>
        <p className="text-2xl font-semibold mt-3 ">184</p>
        <p className="text-lg  font-medium text-gray-400 mt-1">Total Teachers</p>
      </div>
      <div className="flex flex-1 mobile:max-tablet:flex-row flex-col items-center text-center bg-white rounded-lg shadow p-4 w-60 border mobile:max-tablet:gap-2 mobile:max-tablet:w-auto">
        <div className="w-20 h-20">
          <Doughnut
            data={{
              ...data,
              datasets: [
                {
                  ...data.datasets[0],
                  data: [150, 300 - 150],
                  backgroundColor: ['#D94D94', '#E2E8F0'],
                },
              ],
            }}
            options={options}
          />
        </div>
        <p className="text-2xl font-semibold mt-3 ">95</p>
        <p className="text-lg  font-medium text-gray-400 mt-1">Female Teachers</p>
      </div>
      <div className="flex flex-1 mobile:max-tablet:flex-row flex-col items-center text-center bg-white rounded-lg shadow p-4 w-60 border mobile:max-tablet:gap-2 mobile:max-tablet:w-auto">
        <div className="w-20 h-20">
          <Doughnut
            data={{
              ...data,
              datasets: [
                {
                  ...data.datasets[0],
                  data: [150, 300 - 150],
                  backgroundColor: ['#4285F4', '#E2E8F0'],
                },
              ],
            }}
            options={options}
          />
        </div>
        <p className="text-2xl font-semibold mt-3 ">89</p>
        <p className="text-lg  font-medium text-gray-400 mt-1">Male Teachers</p>
      </div>
    </div>
  );
};

export default TeacherStats;

