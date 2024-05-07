export default function TopperMiddle(props) {
    return (
        <div className="flex w-full justify-between py-2 px-2  h-fit rounded-t-lg border-b-2 border-gray-300">
            {props.values.map((value,) => (
                
                    <h1 className="w-28">
                        {value}
                    </h1>
            ))}
        </div>
    )
}