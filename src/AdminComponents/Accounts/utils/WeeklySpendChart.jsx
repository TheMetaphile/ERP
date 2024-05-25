import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: '',
      data: [20000, 25000, 30000, 28000, 27000, 18000, 22000],
      backgroundColor: ['#d18b4a', '#6a8cff', '#ff5959', '#d18b4a', '#6a8cff', '#ff5959', '#d18b4a'],
      barThickness: 40,
      borderRadius: 10,

    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  plugins: {
    tooltips: {
      enabled: true,
      mode: 'single',
    },
    legend: {
      display: false,
    },
  },
};


const WeeklySpendChart = () => (
  <div>
    <Bar data={data} options={options} />
  </div>
);

export default WeeklySpendChart;