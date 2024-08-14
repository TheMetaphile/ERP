import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ProgressProvider from './ProgressProvider';
export default function ProgressCard(props) {
  return (
    <div className="w-52  mobile:max-tablet:w-full h-52 border border-gray-300 bg-white shadow-md rounded-lg mr-2 p-4 flex flex-col items-center justify-center">
      <ProgressProvider valueStart={0} valueEnd={props.percent}>
        {value => <CircularProgressbar
          value={value}
          text={props.centerText}
          strokeWidth={8}

          styles={{
            path: {
              stroke: props.strokeColor,
              strokeLinecap: 'round',
              transition: 'stroke-dashoffset 1s ease 0s',

            },
            trail: { stroke: props.trailColor },
            text: {
              fontSize: '20px',
              fill: '#000',
            },
          }}
          renderText={(value) => (
            <tspan x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">
              {value}
            </tspan>
          )}
        />}
      </ProgressProvider>
      <p className="text-base font-medium mt-3 text-center">{props.title}</p>
    </div>
  );
}
