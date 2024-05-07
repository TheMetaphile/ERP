import LinearProgressBar from './../LinearProgressBar/LinearProgressBar.jsx';

export default function SubjectProgress(props) {
  return (
    <div className="flex w-full min-h-min-content items-center rounded-lg shadow-md bg-white p-4 mb-3">
      <h3 className="w-24 mobile:max-tablet:w-20  tablet:mr-7 text-blue-500 font-medium">
        {props.subject}
      </h3>
      <p className="w-24 mobile:max-tablet:w-24 tablet:mr-7  text-gray-500">
        {props.description}
      </p>
      <LinearProgressBar value={props.percent} max={100} />
    </div>
  );
}
