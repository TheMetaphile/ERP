import { Link } from "react-router-dom";

export default function StudentDetailTile(props) {
    return (
        <Link to={props.id} className=" flex w-full justify-between py-2 px-4 rounded-md shadow-sm h-fit rounded-t-lg border-b-2 border-gray-300">
            {props.values.map((value,index) => (
                
                    <h1 key={index} className="w-full  ">
                        {value}
                    </h1>
            ))}
        </Link>
    )
}