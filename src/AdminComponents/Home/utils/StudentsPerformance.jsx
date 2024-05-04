import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const SchoolPerformanceChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = {
      labels: ['Week 01', 'Week 02', 'Week 03', 'Week 04', 'Week 05', 'Week 06'],
      datasets: [
        {
          label: 'This Week',
          data: [150000, 120000, 200000, 180000, 160000, 200000],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          tension: 0.4, // Adjust this value between 0 and 1 for smoother lines
        },
        {
          label: 'Last Week',
          data: [180000, 240000, 140000, 220000, 280000, 160000],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          tension: 0.4, // Adjust this value between 0 and 1 for smoother lines
        },
      ],
    };

    const options = {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
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

  return <div className=' h-full'><canvas ref={chartRef}  className='flex-grow rounded-lg mt-3 shadow-lg px-3 py-2 ml-5 ' /></div>;
};

export default SchoolPerformanceChart;