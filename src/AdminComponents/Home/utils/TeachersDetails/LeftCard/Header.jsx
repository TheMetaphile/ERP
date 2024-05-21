export default function Header(props){
    return (
        <div className="flex justify-between  py-2 pl-2 bg-bg_blue h-fit rounded-t-lg border-b-2 border-black w-full ">
            {props.headings.map((heading,index) => (
            <h1 key={index} className="w-28 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                {heading}
            </h1>
          ))}
        </div>
    )
}