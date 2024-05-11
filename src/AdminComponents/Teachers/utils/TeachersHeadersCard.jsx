
export default function HeadersCard(props) {
    const {data} = props;
    return (
        <div className="flex flex-wrap justify-center w-full">
        <div className="flex w-full justify-center mobile:max-tablet:flex-col mobile:max-tablet:gap-4 hover:cursor-pointer">
            {data.map((item, index) => (
                <div key={index} className="bg-secondary shadow-md rounded-lg p-4 w-64 mx-auto flex flex-col items-center hover:bg-secondary">
                    <h1 className="text-xl font-semibold">{item.heading}</h1>
                    <p className="text-gray-400 font-semibold">{item.description}</p>
                </div>
            ))}
        </div>
    </div>
    );
}