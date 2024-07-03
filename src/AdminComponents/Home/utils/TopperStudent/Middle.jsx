export default function TopperMiddle(props) {
    return (
        <div className="flex w-full justify-evenly py-2 pl-2  h-fit rounded-t-lg border-b-2 border-gray-300">
            {props.values.map((value, index) => (

                <h1 key={index} className="w-40 text-center">
                    {value}
                </h1>
            ))}
        </div>
    )
}