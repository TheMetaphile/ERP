
export default function DiseaseTile(props) {
    return (
        <div className=" w-fit px-5 py-2 ml-3 rounded-lg shadow-md mt-3 flex items-center mb-3">
            <h1 className="font-medium">{props.disease} :</h1>
            <h1> {props.value}</h1>

        </div>
    )
}

