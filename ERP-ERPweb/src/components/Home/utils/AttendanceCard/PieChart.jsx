import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js/auto";

ChartJS.register(Tooltip, Legend, ArcElement);

export default function DoughnutChart({ chartData, options }) {
  console.log(chartData.datasets[0].bg);
  return (
    <div className="h-72 md:w-60 md:mx-1 md:my-3 sm:w-full sm:mx-2 shadow-md">
      <div className="bg-teal-100 rounded-lg shadow-md p-4">
        <Doughnut data={chartData} options={options} />
        <div className="flex justify-between mt-4">
          {chartData.labels.map((label, index) => (
            
            <div key={index} className={`text-center ${chartData.datasets[0].bg[index]} text-xl`}>
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
    </div>
  );
}
