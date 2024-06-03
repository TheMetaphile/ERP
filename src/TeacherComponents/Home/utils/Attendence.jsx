import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const Attendence = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = {
      labels: ['Class 2nd', 'Class 2nd', 'Class 2nd', 'Class 2nd', 'Class 2nd'],
      datasets: [
        {
          label: 'Student Attendence',
          data: [4, 3, 2, 4, 2],
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
        yAxes: [{
          ticks: {
            callback: function (value, index, values) {
              // Assuming each unit represents a week, adjust accordingly
              if (Number.isInteger(value)) {
                return `Week   ${value}`
              }
              return null; // Hide other non-integer values
            },
            beginAtZero: true // Ensure the y-axis starts at zero
          }
        }]
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
      data: data,
      options: options,
    });

    return () => {
      chartInstance.destroy();
    };
  }, []);

  return <div className='h-96 w-full border shadow-md rounded-lg'><canvas ref={chartRef} className='flex-grow  mt-3  px-3 py-2 tablet:ml-5 ' /></div>;
};

export default Attendence;