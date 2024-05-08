import { Bar } from "react-chartjs-2";


const dataSet = [
  {
    name: 'January',
    math: 15,
    english: 12,
    science: 8,
  },
  {
    name: 'February',
    math: 16,
    english: 19,
    science: 21,
  },
  {
    name: 'March',
    math: 18,
    english: 3,
    science: 13,
  },
  {
    name: 'April',
    math: 14,
    english: 17,
    science: 15,
  },
  {
    name: 'May',
    math: 20,
    english: 28,
    science: 20,
  },
  {
    name: 'June',
    math: 24,
    english: 24,
    science: 34,
  },
  {
    name: 'July',
    math: 20,
    english: 7,
    science: 24,
  },
];
const options = {
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Days',
        position: 'left',
        font: {
          size: 22,
        },
      },
      ticks: {
        mirror: true,
      },
    },
  },
};
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets:  [
    {
      label: 'Math',
      backgroundColor: '#FDA47E',
      borderRadius: 50, 
      data: [15, 16, 18, 14, 20, 24, 20],
    },
    {
      label: 'English',
      backgroundColor: '#81FD7E',
      borderRadius: 50, 
      data: [12, 19, 3, 17, 28, 24, 7],
    },
    {
      label: 'Science',
      backgroundColor: '#FD7E7E',
      borderRadius: 50, 
      data: [8, 21, 13, 15, 20, 34, 24],
    },
  ],
};
const ClassesActivityChart = () => {
  return <Bar data={data} options={options} />;
};

export default ClassesActivityChart;