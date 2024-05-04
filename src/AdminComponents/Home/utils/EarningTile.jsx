import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const EarningsChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = {
      labels,
      datasets: [
        {
          label: 'Total Earnings',
          data: [90000, 210000, 90000, 40000, 150000, 230000, 160000],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Fees & Sales',
          data: [70000, 120000, 130000, 80000, 130000, 80000, 140000],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
        },
      ],
    };

    const options = {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return 'Rs.' + value.toLocaleString();
            },
          },
        },
      },
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false,
        },
      },
    };

    const chartInstance = new Chart(chartRef.current, {
      type: 'line',
      data,
      options,
    });

    return () => {
      chartInstance.destroy();
    };
  }, []);

  return <div className='flex-grow'>
    <canvas ref={chartRef} className='w-full rounded-lg shadow-lg mx-3 mt-3 px-3 py-2'/>
  </div>;
};

export default EarningsChart;