import Logo from '../../../assets/metaphile_logo.png'
export default function AllNotificationTile({ details }) {
    return (
        <div className="w-full">
            {details.map((detail, index) => (
                <div key={index} className=" w-full p-2  rounded-lg border border-gray-300 shadow-md mt-3 flex items-center mobile:max-laptop:flex mobile:max-laptop:flex-col">
                    <img src={Logo} alt="" className='h-12'></img>
                    <div className='px-2 w-11/12'>
                        <div className='flex justify-between items-center'>
                            <div className="pl-2 mt-1 font-medium text-lg">Title : {detail.title}</div>
                        </div>
                        <div className="pl-2 mt-1 font-medium text-lg ">Description : <p className='font-normal text-justify'>{detail.description}</p></div>
                        <div className='flex gap-2 mobile:max-tablet:gap-0 justify-between mt-2 items-center'>
                            <div className='flex'>
                                <img src={detail.from.profileLink} alt="img" className='h-10 w-10 mobile:max-tablet:h-8 mobile:max-tablet:w-8 rounded-full' />
                                <div className="pl-2 mt-1 font-medium text-lg">{detail.from.name}</div>
                            </div>
                            <div className="pl-2 mt-1 font-medium text-sm text-right text-gray-500">{detail.date}</div>
                        </div>
                    </div>

                </div >
            ))
            }
        </div >
    )
}

