export default function SummaryTile(props){
    return (
        <div className="flex md:w-fit border border-gray-300 rounded-lg shadow-lg px-3 py-2 items-center bg-secondary">
            <img src={props.img} alt="img" className="h-10 w-10 mr-3"/>
            <div>
                <h3 className="text-lg">{props.title}</h3>
                <h1 className="text-xl font-medium break-all">{props.value}</h1>
            </div>
        </div>
    )
}




