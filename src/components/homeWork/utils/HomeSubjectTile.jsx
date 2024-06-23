import { Link } from "react-router-dom";

export default function HomeSubjectTile(props) {
    return (
        <Link to={`${props.subject}`} className=" flex shadow-md border border-gray-300 rounded-lg p-4 justify-between items-center self-center">
            <div className=" w-full flex flex-col tablet:flex-row justify-between items-center ">
                <h1 className="font-medium tablet:text-xl mb-3">{props.subject}</h1>
                <img src={props.image} alt="image" className="mobile:max-laptop:h-12 laptop:h-14 " />
            </div>


        </Link>
    )
}