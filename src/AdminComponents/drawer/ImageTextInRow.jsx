import { Link } from 'react-router-dom';

export default function ImageTextInRow(props) {
  return (
    <Link to={props.route} className="flex items-start text-black text-sm no-underline">
      <img src={props.image} alt={props.alternateText} className="w-1/6 mb-4" />
      <span className="ml-2">{props.text}</span> 
    </Link>
  );
}
