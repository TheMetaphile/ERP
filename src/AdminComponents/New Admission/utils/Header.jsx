export default function Header(props) {
    return (
        <tr className=" text-center py-2  bg-purple-200 h-fit rounded-t-lg border-b-2 border-black w-full tablet:max-laptop:w-fit   tablet:max-laptop:gap-3">
            {props.headings.map((heading, index) => (
                <th key={index} className={`px-4 py-3 text-lg  font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm`}>
                    {heading}
                </th>
            ))}
        </tr>
    )
}