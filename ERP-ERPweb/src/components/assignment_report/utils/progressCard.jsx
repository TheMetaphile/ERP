import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import ProgressProvider from './ProgressProvider';
export default function ProgressCard(props) {
  return (
    <div className="w-48 bg-white shadow-lg rounded-lg ml-4 p-4 flex flex-col items-center">
      <ProgressProvider  valueStart={0} valueEnd={props.percent}>
        {value=><CircularProgressbar 
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
        }}
      />}
      </ProgressProvider>
      <p className="text-base truncate font-medium mt-3">{props.title}</p>
    </div>
  );
}
