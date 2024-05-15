// import React from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import { Chart, ArcElement } from 'chart.js';

// Chart.register(ArcElement);

// const Stats = () => {
//   const data = {
//     labels: ['Total', 'Total Students', 'Total Teachers','Total Employ'],
//     datasets: [
//       {
//         data: [6200, 5540, 500, 160],
//         backgroundColor: ['#4267B2', '#D94D94', '#4285F4','#800080.'],
//         borderWidth: 0,
//         cutout: '70%',
//         borderRadius: 30,
//       },
//     ],
//   };

//   const options = {
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//     layout: {
//       padding: 0,
//     },
//   };

//   return (
//     <div className="flex gap-4 mobile:max-tablet:gap-2">
//       <div className="flex flex-col items-center text-center bg-white rounded-lg shadow p-4 w-60 border">
//         <div className="w-20 h-20">
//           {/* <Doughnut data={data} options={options} /> */}
//           <Doughnut
//             data={{
//               labels: [ 'Total Students', 'Total Teachers','Total Employ'],
//               datasets: [
//                 {
//                   data: [5540, 500, 160], // Update the data values here
//                   backgroundColor: ['#D94D94', '#4285F4','#800080.'],
//                   borderWidth: 0,
//                   cutout: '70%',
//                   borderRadius: 30,
//                 },
//               ],
//             }}
//             options={options}
//           />
//         </div>
//         <p className="text-2xl font-semibold mt-3 ">6200</p>
//         <p className="text-lg  font-medium text-gray-400 mt-1">Total</p>
//       </div>
//       <div className="flex flex-col items-center text-center bg-white rounded-lg shadow p-4 w-60 border">
//         <div className="w-20 h-20">
//           <Doughnut
//             data={{
//               ...data,
//               datasets: [
//                 {
//                   ...data.datasets[0],
//                   data: [150, 300 - 150],
//                   backgroundColor: ['#D94D94', '#E2E8F0'],
//                 },
//               ],
//             }}
//             options={options}
//           />
//         </div>
//         <p className="text-2xl font-semibold mt-3 ">95</p>
//         <p className="text-lg  font-medium text-gray-400 mt-1">Female Teachers</p>
//       </div>
//       <div className="flex flex-col items-center text-center bg-white rounded-lg shadow p-4 w-60 border">
//         <div className="w-20 h-20">
//           <Doughnut
//             data={{
//               ...data,
//               datasets: [
//                 {
//                   ...data.datasets[0],
//                   data: [150, 300 - 150],
//                   backgroundColor: ['#4285F4', '#E2E8F0'],
//                 },
//               ],
//             }}
//             options={options}
//           />
//         </div>
//         <p className="text-2xl font-semibold mt-3 ">89</p>
//         <p className="text-lg  font-medium text-gray-400 mt-1">Male Teachers</p>
//       </div>
//     </div>
//   );
// };

// export default Stats;
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';

Chart.register(ArcElement);

const Stats = () => {
  const data = {
    labels: ['Total Students', 'Total Teachers', 'Total Employ'],
    datasets: [
      {
        data: [5540, 500, 160],
        backgroundColor: ['#D94D94', '#4285F4', '#800080'],
        borderWidth: 0,
        cutout: '70%',
        borderRadius: 30,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    layout: {
      padding: 0,
    },
  };

  return (
    <div className="flex gap-4 mobile:max-tablet:gap-2 px-4 w-full  mobile:max-tablet:flex-wrap">
      <div className="flex flex-col items-center text-center rounded-lg shadow p-4 w-60 border bg-white">
        <div className="w-20 h-20">
          <Doughnut data={data} options={options} />
        </div>
        <p className="text-3xl mt-3">6200</p>
        <p className="text-xl font-medium text-gray-800 mt-1">Total</p>
      </div>
      <div className="flex flex-col items-center text-center bg-white rounded-lg shadow p-4 w-60 border">
        <div className="w-20 h-20">
          <Doughnut
            data={{
              labels: ['Female Teachers', 'Remaining Female'],
              datasets: [
                {
                  data: [150, 300 - 150],
                  backgroundColor: ['#D94D94', '#E2E8F0'],
                  borderWidth: 0,
                  cutout: '70%',
                  borderRadius: 30,
                },
              ],
            }}
            options={options}
          />
        </div>
        <p className="text-3xl mt-3">5540</p>
        <p className="text-xl font-medium text-gray-800 mt-1">Total Students</p>
      </div>
      <div className="flex flex-col items-center text-center bg-white rounded-lg shadow p-4 w-60 border">
        <div className="w-20 h-20">
          <Doughnut
            data={{
              labels: ['Male Teachers', 'Remaining Male'],
              datasets: [
                {
                  data: [89, 300 - 89],
                  backgroundColor: ['#4285F4', '#E2E8F0'],
                  borderWidth: 0,
                  cutout: '70%',
                  borderRadius: 30,
                },
              ],
            }}
            options={options}
          />
        </div>
        <p className="text-3xl mt-3">500</p>
        <p className="text-xl font-medium text-gray-800 mt-1">Total Teachers</p>
      </div>
      <div className="flex flex-col items-center text-center bg-white rounded-lg shadow p-4 w-60 border">
        <div className="w-20 h-20">
          <Doughnut
            data={{
              labels: ['Total Employ', 'Remaining Employ'],
              datasets: [
                {
                  data: [160, 300 - 160],
                  backgroundColor: ['#800080', '#E2E8F0'],
                  borderWidth: 0,
                  cutout: '70%',
                  borderRadius: 30,
                },
              ],
            }}
            options={options}
          />
        </div>
        <p className="text-3xl mt-3">160</p>
        <p className="text-xl font-medium text-gray-800 mt-1">Total Employ</p>
      </div>
    </div>
  );
};

export default Stats;

