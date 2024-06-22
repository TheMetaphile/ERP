export default function Allevents(props) {
  return (
    <div className={`flex-1 h-44 ${props.color} rounded-lg  m-4 p-4 shadow-md`}>
      <img src={props.img} className="w-24 h-24 object-cover mb-2" alt="Event" />
      <h5 className="text-sm font-medium">{props.text}</h5>
      <h6 className="text-xs">{props.date}</h6>
    </div>
  );
}
