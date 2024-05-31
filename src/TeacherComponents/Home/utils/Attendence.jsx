import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const Attendence = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = {
      labels: ['Class 2nd','Class 2nd','Class 2nd','Class 2nd','Class 2nd'],
      datasets: [
        {
        
          data: ['Week1', 2, 3, 4, 5],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          tension: 0.46, // Adjust this value between 0 and 1 for smoother lines
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

  return <div className='h-full  w-full'><canvas ref={chartRef}  className='flex-grow rounded-lg mt-3 shadow-lg px-3 py-2 tablet:ml-5 ' /></div>;
};

export default  Attendence;