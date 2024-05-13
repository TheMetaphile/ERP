import tour from "./../../../assets/tour.jpg"
export default function PlaceTile(props) {
    return (
        <div className="p-3  tablet:mr-2 mobile:max-tablet:mb-3 rounded-lg shadow-md flex flex-col justify-center items-center">
            <div className="">
                <img src={tour} alt="" className="w-full h-full" />
            </div>
            <h1 className="pl-2 mt-2 font-medium text-lg">{props.description}</h1>
        </div>

    )
}