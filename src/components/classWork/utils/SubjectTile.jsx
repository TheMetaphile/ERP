import { Link } from "react-router-dom";

export default function SubjectTile(props) {
    return (
        <Link to={`${props.subject}`} className=" flex shadow-md rounded-lg p-4 justify-between items-center">
            <div className=" w-full flex flex-col tablet:flex-row justify-between items-center space-x-4">
                <h1 className="font-medium text-lg">{props.subject}</h1>
                <img src={props.image} alt="image" className="mobile:max-laptop:h-10 laptop:h-14 " />
            </div>


        </Link>
    )
}