import { motion } from "framer-motion";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js/auto";
import { FaChartPie } from "react-icons/fa";

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
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}

      className="flex flex-col h-full w-full mobile:max-tablet:w-full justify-evenly items-center shadow-lg bg-white border border-blue-300 rounded-lg px-4 py-6   mobile:max-tablet:px-2 overflow-auto"

    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        className="w-11/12"
      >
        <h2 className="mb-4 whitespace-nowrap mobile:max-tablet:text-xl text-2xl text-center font-semibold text-blue-800 flex items-center justify-center">
          <FaChartPie className="mr-2 text-blue-600" />
          {title}
        </h2>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Doughnut data={chartData} options={options} />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex mt-6 mobile:max-tablet: mobile:max-tablet:justify-center mobile:max-tablet:flex-wrap gap-2 my-2"
      >
        {chartData.labels.map((label, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}

            className={`text-center ${chartData.datasets[0].bg[index]} text-xl mr-3 bg-white border border-blue-200 rounded-lg p-2`}

          >
            <h4 className="mobile:max-laptop:text-sm font-medium">
              {label}
            </h4>
            <p className="mobile:max-tablet:text-sm font-bold">
              {chartData.datasets[0].data[index]}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}