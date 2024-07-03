export default function Middle(props) {
    return (
        <div className="flex justify-evenly items-center py-2 pl-2  h-fit  border border-gray-300 text-center w-fit laptop:w-full  gap-2">
            {props.values.map((value, index) => (
                <h1 key={index} className={`${index === 0 ? "w-40 mobile:max-tablet:w-20 " : "mobile:max-tablet:w-20 w-32 "} text-lg  font-normal mobile:max-tablet:text-sm mobile:max-tablet:font-sm ${index === props.values.length - 1 ? `${value === 'Good' ? 'text-green-400' : value === 'Average' ? 'text-orange-400' : 'text-red-400'}` : ""}`}>
                    {value}
                </h1>
            ))}
        </div>
    )
}