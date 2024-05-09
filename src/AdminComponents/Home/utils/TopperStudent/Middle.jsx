export default function TopperMiddle(props) {
    return (
        <div className="flex w-fit justify-between py-2 pl-2  h-fit rounded-t-lg border-b-2 border-gray-300">
            {props.values.map((value,) => (
                
                    <h1 className="w-28">
                        {value}
                    </h1>
            ))}
        </div>
    )
}