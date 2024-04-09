export default function Eventcard(props) {
  return (
    <div className={`flex-1 h-48  ${props.color} rounded-lg mx-2 my-3 p-4 shadow-md whitespace-nowrap`}>
      <img src={props.img} className="w-16 h-16 object-cover mb-2" alt="Event" />
      <h5 className="text-sm font-medium">{props.text}</h5>
      <h6 className="text-xs">{props.date}</h6>
    </div>
  );
}
