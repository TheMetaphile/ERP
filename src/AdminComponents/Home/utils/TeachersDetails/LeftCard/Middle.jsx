export default function Middle(props) {
    return (
        <div className="flex w-full justify-evenly py-2 pl-2  h-fit rounded-t-lg border-b-2 border-gray-300 gap-5 mobile:max-tablet:w-fit">
            {props.values.map((value, index) => (
                index === props.values.length - 1
                    ?
                    <h1 key={index} className={`w-40 text-center ${value === 'Good' ? 'text-green-400' : value === 'Average' ? 'text-orange-400' : 'text-red-400'}`}>
                        {value}
                    </h1>
                    :
                    <h1 key={index} className="w-40 text-center">
                        {value}
                    </h1>
            ))}
        </div>
    )
}