import { Link } from "react-router-dom";

export default function StudentDetailTile(props) {
    return (
        <Link to={props.id} className=" flex w-fit justify-between py-2 pl-2 rounded-md shadow-sm h-fit rounded-t-lg border-b-2 border-gray-300">
            {props.values.map((value,index) => (
                
                    <h1 key={index} className="w-40  ">
                        {value}
                    </h1>
            ))}
        </Link>
    )
}