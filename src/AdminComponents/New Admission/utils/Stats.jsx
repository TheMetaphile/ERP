import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Stats = ({ stat }) => {
  const percentData = stat.percent;
  const nameData = stat.name;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: ' Statistics',
        font: {
          size: 20,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
    barThickness: 20, // Make bars thinner
    borderRadius: 10, // Add rounded corners to bars
  };

  const percentChartData = {
    labels: Object.keys(percentData).filter(key => key !== 'total'),
    datasets: [
      {
        label: 'Percentage',
        data: Object.values(percentData).filter((_, index) => index !== 0),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        borderRadius: 10, // Add rounded corners to individual bars
      },
    ],
  };

  const nameChartData = {
    labels: Object.keys(nameData),
    datasets: [
      {
        label: 'Count',
        data: Object.values(nameData),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        borderRadius: 10, // Add rounded corners to individual bars
      },
    ],
  };

  return (
    <div className="bg-white p-8 mobile:max-tablet:p-2 border rounded-xl shadow-lg">

      <div className="grid grid-cols-2 mobile:max-tablet:grid-cols-1 gap-8">
        <div className="bg-purple-50 p-6 mobile:max-tablet:p-1 rounded-lg shadow-md border">
          <h2 className="text-xl mobile:max-tablet:text-sm font-semibold mb-4 text-purple-700">Percentage Distribution</h2>
          <Bar options={options} data={percentChartData} />
        </div>
        <div className="bg-purple-50 p-6 mobile:max-tablet:p-1 rounded-lg shadow- border">
          <h2 className="text-xl mobile:max-tablet:text-sm  font-semibold mb-4 text-purple-700">Name Distribution</h2>
          <Bar options={options} data={nameChartData} />
        </div>
      </div>

    </div>
  );
};

export default Stats;