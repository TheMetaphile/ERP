export default function Header(props) {
    return (
        <div className="flex justify-between items-center py-2 pl-2 bg-bg_blue h-fit rounded-t-lg border-b-2 border-black text-center w-fit mobile:max-tablet:w-full laptop:w-full  gap-2 ">
            {props.headings.map((heading, index) => (
                <h1 key={index} className={`${heading === 'Name' ? "w-48 mobile:max-laptop:w-48 " : heading === 'Roll Number' ? "w-28 mobile:max-tablet:w-20  tablet:" : heading === "" ? "laptop:w-10" : "mobile:max-tablet:w-20 w-40 "} text-lg  font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm`}>
                    {heading}
                </h1>
            ))}
        </div>
    )
}