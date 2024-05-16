export default function Middle(props) {
    return (
        <div className="flex w-full justify-between py-2 pl-2  h-fit rounded-t-lg border-b-2 border-gray-300 ">
            {props.values.map((value, index) => (
                index === props.values.length - 1
                    ?
                    <h1 className={`w-28 ${value==='Good' ? 'text-green-400' : value==='Average' ? 'text-orange-400' : 'text-red-400'}`}>
                        {value}
                    </h1>
                    :
                    <h1 className="w-28">
                        {value}
                    </h1>
            ))}
        </div>
    )
}