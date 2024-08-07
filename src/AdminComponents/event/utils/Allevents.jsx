export default function Allevents(props) {
  return (
    <div className={`flex-1 h-44 ${props.color} border border-gray-300 rounded-lg  m-4 p-4 shadow-md py-2  `}>
      <img src={props.img} className="w-24 h-24 object-cover mb-2" alt="Event" />
      <h5 className="text-sm font-medium tablet:max-laptop:flex-wrap flex">{props.text}</h5>
      <h6 className="text-xs">{props.date}</h6>
    </div>
  );
}
