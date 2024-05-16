import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [20000, 25000, 30000, 28000, 27000, 18000, 22000],
      backgroundColor: ['#d18b4a', '#6a8cff', '#ff5959','#d18b4a', '#6a8cff', '#ff5959'],
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
    tooltips: {
      enabled: true,
      mode: 'single',
    //   callbacks: {
    //     label: function (tooltipItem, data) {
    //       return tooltipItem.yLabel;
    //     },
    //   },
    },
    legend: {
        display: false, // Hide the legend
      },
  };
  

const WeeklySpendChart = () => (
  <div>
    <Bar data={data} options={options} />
  </div>
);

export default WeeklySpendChart;