import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { BarController, BarElement } from 'chart.js';

Chart.register(BarController, BarElement, ...registerables);

const ExpensesChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = {
      labels: ['Jan 2024', 'Feb 2024', 'Mar 2024'],
      datasets: [
        {
          label: 'Expenses',
          data: [130000, 230000, 180000],
          backgroundColor: [
            'rgba(255, 165, 0, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(255, 99, 132, 0.7)',
          ],
          borderColor: [
            'rgba(255, 165, 0, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1,
          barThickness: 30,
          cutout: "80%",
          borderRadius: 100, // Adjust this value to change the roundness of the bars
          borderSkipped: false,
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
          callbacks: {
            label: function (context) {
              const label = context.dataset.label || '';
              const value = context.formattedValue || '';
              return `${label}: Rs.${value.toLocaleString()}`;
            },
          },
        },
      },
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
    };

    const chartInstance = new Chart(chartRef.current, {
      type: 'bar',
      data,
      options,
    });

    return () => {
      chartInstance.destroy();
    };
  }, []);

  return <div className='flex-grow h-full'><canvas ref={chartRef} className='w-full rounded-lg shadow-lg tablet:mx-3 px-3 py-2'/></div>;
};

export default ExpensesChart;