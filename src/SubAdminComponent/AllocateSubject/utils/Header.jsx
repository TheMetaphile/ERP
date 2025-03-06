export default function Header(props) {
    return (
        <div className="flex justify-evenly items-center py-3 pl-2 rounded-t-lg w-full tablet:max-laptop:w-fit gap-2 tablet:max-laptop:gap-3 overflow-hidden bg-purple-200 shadow-md">
            {props.headings.map((heading, index) => (
                <h1
                    key={index}
                    className={`
            ${heading === 'Name'
                            ? "w-40 mobile:max-tablet:w-20"
                            : heading === 'Roll Number'
                                ? "w-32 mobile:max-tablet:w-20"
                                : "mobile:max-tablet:w-20 w-32 tablet:max-laptop:w-40"
                        } 
            text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-normal
         transition-all duration-300 ease-in-out transform hover:scale-105
          `}
                >
                    {heading}
                </h1>
            ))}
        </div>
    )
}