export default function Header(props) {
    return (
        <div className="flex justify-evenly items-center py-2 pl-2 bg-gradient-to-r from-purple-200 to-purple-100 h-fit rounded-t-lg border-b-2 border-black w-full tablet:max-laptop:w-fit  gap-2 tablet:max-laptop:gap-3">
            {props.headings.map((heading, index) => (
                <h1 key={index} className={`${heading === 'Name' ? "w-40 mobile:max-tablet:w-20 " : heading === 'Roll Number' ? "w-32 mobile:max-tablet:w-20 " : "mobile:max-tablet:w-20 w-32 tablet:max-laptop:w-40 "} text-lg  font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm`}>
                    {heading}
                </h1>
            ))}
        </div>
    )
}