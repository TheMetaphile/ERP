import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js/auto";

ChartJS.register(Tooltip, Legend, ArcElement);

export default function DoughnutSecond({ chartData, title }) {
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      }
    },
    elements: {
      arc: {
        backgroundColor: chartData.datasets[0].data.every((value) => value === 0) ? '#dddddd' : '#ffffff',
      },
    },
  };
  return (
    <div className="flex flex-col h-full w-fit mobile:max-tablet:w-full justify-evenly items-center shadow-lg bg-teal-100 border border-gray-300 rounded-lg px-4 ">
      <div className="w-11/12">
        <h2 className="mb-2  whitespace-nowrap mobile:max-tablet:text-lg text-2xl text-center font-medium">{title}</h2>
        <div >
          <Doughnut data={chartData} options={options} />
        </div>

      </div>
      <div className="flex mt-2 mobile:max-tablet:flex-wrap gap-0.5 my-2 mobile:max-tablet:w-full">
        {chartData.labels.map((label, index) => (

          <div key={index} className={`text-center ${chartData.datasets[0].bg[index]} text-xl mr-3 `}>
            <h4 className=" mobile:max-laptop:text-sm">
              {label}
            </h4>
            <p className=" mobile:max-tablet:text-sm">
              {chartData.datasets[0].data[index]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}