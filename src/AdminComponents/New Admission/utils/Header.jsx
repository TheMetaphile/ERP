export default function Header(props) {
    return (
        <div className="flex justify-evenly items-center py-2  bg-bg_blue h-fit rounded-t-lg border-b-2 border-black w-full tablet:max-laptop:w-fit   tablet:max-laptop:gap-3">
            {props.headings.map((heading, index) => (
                <h1 key={index} className={`${heading === 'email' ? "w-52 mobile:max-tablet:w-20 " : "w-40 mobile:max-tablet:w-20 "} text-lg  font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm`}>
                    {heading}
                </h1>
            ))}
        </div>
    )
}