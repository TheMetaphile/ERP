export default function Header(props){
    return (
        <div className="flex w-full justify-between py-2 px-4 bg-bg_blue h-fit rounded-t-lg border-b-2 border-black">
            {props.headings.map((heading) => (
            <h1 className="w-32 text-lg font-medium">
                {heading}
            </h1>
          ))}
        </div>
    )
}