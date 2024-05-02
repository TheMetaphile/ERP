import { Link } from "react-router-dom";

export default function SubjectTile(props){
    return (
        <Link to={`${props.subject}`} className="flex shadow-md rounded-lg p-4 justify-between items-center">
            <h1 className="font-medium text-lg">{props.subject}</h1>
            <img src={props.image} alt="image" className="ml-4 h-14 "/>
        </Link>
    )
}