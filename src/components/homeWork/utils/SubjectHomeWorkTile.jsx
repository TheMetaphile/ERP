import check from './../../../assets/Checkmark.png'
import cross from './../../../assets/Circled X.png'
import excla from './../../../assets/exclamation.png'

export default function SubjectHomeWorkTile({ subject, details }) {

    return (
        <div className={`mt-3 w-full p-3 flex justify-between rounded-lg shadow-md items-center border  `}>
            {details.map((detail, index) => (
                <div key={index} className=' w-full ' >
                    <div className="flex items-center justify-between  ">
                        <div className=" px-3 py-1 bg-bg_blue rounded-full w-fit">{subject}</div>
                        <div className="pl-2  font-medium">Chapter : {detail.chapter}</div>
                        <h1 className="font-medium">Date: {detail.date}</h1>

                    </div>

                    <div className="flex items-center justify-between mt-3">
                        {/* <img src={icon} alt="Icon" className="mr-2" /> */}
                        <div className="pl-2  font-medium">Topic : {detail.topic}</div>
                        <h1 className="font-medium">Task: {detail.description}</h1>
                        <div className='flex items-center gap-1'>
                            <img src={detail.by.profileLink} alt="img" className='w-8 h-8 rounded-full'></img>
                            <div className="font-medium">{detail.by.name}</div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}