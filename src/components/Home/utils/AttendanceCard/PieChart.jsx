import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js/auto";

ChartJS.register(Tooltip, Legend, ArcElement);

export default function DoughnutChart({ chartData, title }) {
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      }
    },
    elements: {
      arc: {
        backgroundColor: chartData.datasets[0].data.every((value) => value === 0) ? '#dddddd' : '#ffffff',
      },
    },
  };
  return (
    <div className="flex flex-col h-full justify-evenly items-center shadow-lg bg-teal-100 border border-gray-300 rounded-lg px-4 py-2">
      <div className="w-11/12">
        <h2 className="mb-2  whitespace-nowrap mobile:max-tablet:text-3xl tablet:text-xl text-center font-medium">{title}</h2>
        <div >
          <Doughnut data={chartData} options={options} />
        </div>

      </div>
      <div className="flex mt-2">
        {chartData.labels.map((label, index) => (

          <div key={index} className={`text-center ${chartData.datasets[0].bg[index]} text-xl mr-3`}>
            <h4>
              {label}
            </h4>
            <p>
              {chartData.datasets[0].data[index]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}