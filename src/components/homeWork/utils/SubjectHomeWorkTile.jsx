export default function SubjectHomeWorkTile({ subject, details }) {
    return (
        <div className='mt-2 w-full px-3'>
            {details.map((detail, index) => (
                <div key={index} className='mt-1 p-3 w-full flex-col rounded-lg shadow-md items-center border  border-gray-300' >
                    <div className="flex items-center justify-between  ">

                        <div className="w-80 pl-2  font-medium">Chapter : <span className="font-normal">{detail.chapter}</span></div>

                        <div className=" px-3 py-1 bg-bg_blue rounded-full w-fit">{subject}</div>

                    </div>
                    <div className="flex flex-col gap-1 mb-1">
                        <div className="pl-2  font-medium">Topic : <span className="font-normal">{detail.topic}</span></div>
                        <h1 className="font-medium mx-2 text-justify">Description: <span className="font-normal">{detail.description}</span></h1>
                    </div>

                    <div className='flex pl-2 justify-between text-gray-500 mobile:max-tablet:flex-col gap-1 '>
                        <p className=" text-gray-500">Deadline <span className="font-medium text-black">{detail.deadline}</span></p>
                        <div className="flex items-center gap-2">
                            <h1 className=" text-gray-500">Date <span className="font-medium text-black">{detail.date}</span></h1>

                        </div>
                        <div className="flex gap-2">
                            <p>By-</p>
                            <img src={detail.by.profileLink} alt="img" className='w-8 h-8 mobile:max-laptop:h-6 mobile:max-laptop:w-6 rounded-full'></img>
                            <div className="font-medium text-black">{detail.by.name}</div></div>
                    </div>
                </div>
            ))}

        </div>
    )
}