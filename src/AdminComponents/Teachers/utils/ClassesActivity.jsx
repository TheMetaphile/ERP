import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
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

const ClassesActivityChart = () => {
  return (
    <BarChart width={1000} height={400} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Bar dataKey="math" fill="#f87979" />
      <Bar dataKey="english" fill="#7bcbc4" />
      <Bar dataKey="science" fill="#817d4d" />
    </BarChart>
  );
};

export default ClassesActivityChart;