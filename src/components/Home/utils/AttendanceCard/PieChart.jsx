import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js/auto";

ChartJS.register(Tooltip, Legend, ArcElement);

export default function DoughnutChart({ chartData,title }) {
  console.log(chartData.datasets[0].bg);
  const options={
    plugins:{
      legend: {
        display: false,
        
      }
    }
  };
  return (
    <div className="flex flex-col justify-evenly items-center md:w-60 md:mx-1 md:my-3 sm:w-full sm:mx-2 shadow-md bg-teal-100 rounded-lg px-4 py-2">
      <div className="w-full">
        <h2 className="mb-2 whitespace-nowrap text-xl text-center font-medium">{title}</h2>
        <Doughnut data={chartData} options={options} />
        
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
