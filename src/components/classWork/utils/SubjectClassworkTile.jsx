export default function SubjectClassWorkTile({ subject, details }) {
    return (
        <div className='mt-2 w-full px-3'>
            {details.map((detail, index) => (
                <div key={index} className='mt-1 p-3 w-full flex-col rounded-lg shadow-md items-center border  border-gray-300' >
                    <div className="flex items-center justify-between  ">

                        <div className="w-80 pl-2  font-medium">Chapter : <span className="font-normal">{detail.chapter}</span></div>

                        <div className=" px-3 py-1 bg-bg_blue rounded-full w-fit">{subject}</div>

                    </div>
                    <div className="pl-2 mb-1  font-medium">Topic : <span className="font-normal">{detail.topic}</span></div>
                    <h1 className="font-medium pl-2">Description: <span className="font-normal">{detail.description}</span></h1>

                    <div className='flex pl-2 justify-end gap-1  text-gray-500 mobile:max-tablet:flex-col'>
                        <h1 className=" text-gray-500">Classwork on <span className="font-medium text-black">{detail.date}</span></h1>
                        <div className="flex gap-2">
                            <p>By -</p>
                            <img src={detail.by.profileLink} alt="img" className='w-8 h-8 rounded-full mobile:max-laptop:h-6 mobile:max-laptop:w-6'></img>
                            <div className="font-medium text-black">{detail.by.name}</div>
                        </div>

                    </div>
                </div>
            ))}

        </div>
    )
}