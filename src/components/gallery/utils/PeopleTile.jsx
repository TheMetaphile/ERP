import tour from "./../../../assets/tour.jpg"
export default function PeopleTile(props) {
    return (
        <div className="flex flex-col items-center">
            
            <img src={tour} alt="" className="w-15 h-15 rounded-full shadow-md" />
            <h1 className="pl-2 mt-3 font-medium text-base">{props.description}</h1>
        </div>

    )
}