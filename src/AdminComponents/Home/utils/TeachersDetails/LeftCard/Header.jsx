export default function Header(props){
    return (
        <div className="flex justify-between w-full py-2 pl-2 bg-bg_blue h-fit rounded-t-lg border-b-2 border-black ">
            {props.headings.map((heading,index) => (
            <h1 key={index} className={`${heading ==='Name' ? "w-52" : "w-40"} text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm`}>
                {heading}
            </h1>
          ))}
        </div>
    )
}