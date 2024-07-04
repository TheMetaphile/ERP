
export default function HeadersCard(props) {
    const { data } = props;
    return (
        <div className="flex flex-wrap gap-2 justify-center w-full">
            <div className="flex w-full justify-center mobile:max-tablet:flex-col mobile:max-tablet:gap-4 hover:cursor-pointer mobile:max-tablet:w-auto">
                {data.map((item, index) => (
                    <div key={index} className="bg-secondary shadow-md rounded-lg p-4 w-60  mx-2 flex flex-col items-center hover:bg-secondary mobile:max-tablet:w-full mobile:max-tablet:mx-0">
                        <h1 className="text-xl font-semibold">{item.heading}</h1>
                        <p className="text-gray-700 font-semibold">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}