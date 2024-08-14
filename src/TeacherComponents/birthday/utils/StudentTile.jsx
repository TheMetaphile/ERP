import { IoLogoWhatsapp } from "react-icons/io";

export default function StudentTile({ birthdays }) {
    const todayBirthday = birthdays?.todayBirthday || [];
    const upcomingBirthdays = birthdays?.upcomingBirthdays || [];

    return (
        <div className="w-full flex flex-col border-gray-300 border p-2 rounded-lg shadow-md ">
            {todayBirthday.length === 0 ? (
                <div>Today is no one's birthday</div>
            ) : (
                <>
                    <span className='font-medium text-lg px-2'>Today</span>
                    {todayBirthday.map((detail, index) => (
                        <div key={index} className='w-full flex   items-center mb-2 p-3 mt-2 border-gray-300 border rounded-lg shadow-md justify-between '>
                            <div className='flex mobile:max-tablet:gap-2 gap-2 items-center mobile:max-laptop:flex-col mobile:max-laptop:items-start'>
                                <div className=" gap-1 flex whitespace-nowrap items-center">
                                    <img src={detail.profileLink} alt="Profile" className='h-10 w-10 rounded-full' />
                                    <span>{detail.name}</span>
                                </div>
                                <span className=" mobile:max-laptop:hidden mx-2">|</span>
                                <div className='flex gap-2 font-normal mobile:max-laptop:ml-0'>
                                    <span>Class: {detail.currentClass}</span>
                                </div>
                                <span className=" mobile:max-laptop:hidden mx-2">|</span>
                                <div>
                                    <span>DOB: {detail.DOB}</span>
                                </div>
                            </div>
                            <div className='flex items-center bg-green-800 text-white p-2 gap-1 rounded-lg shadow-md'>
                                <IoLogoWhatsapp className='text-green-600' />
                                <span>Message</span>
                            </div>
                        </div>
                    ))}
                </>
            )}

            {upcomingBirthdays.length === 0 ? (
                <div>No upcoming birthday</div>
            ) : (
                <>
                    <span className='font-medium text-lg px-2'>Upcoming Birthdays</span>
                    {upcomingBirthdays.map((detail, index) => (
                        <div key={index} className='w-full flex   items-center mb-2 p-3 mt-2 border-gray-300 border rounded-lg shadow-md justify-between'>
                            <div className='flex mobile:max-tablet:gap-2 gap-2 items-center mobile:max-laptop:flex-col mobile:max-laptop:items-start'>
                                <div className=" gap-1 flex whitespace-nowrap items-center">
                                    <img src={detail.profileLink} alt="Profile" className='h-10 w-10 rounded-full' />
                                    <span>{detail.name}</span>
                                </div>
                                <span className=" mobile:max-laptop:hidden mx-2">|</span>
                                <div className='flex gap-2 font-normal mobile:max-laptop:ml-0'>
                                    <span>Class: {detail.currentClass}</span>
                                </div>
                                <span className=" mobile:max-laptop:hidden mx-2">|</span>
                                <div>
                                    <span>DOB: {detail.DOB}</span>
                                </div>
                            </div>
                            <div className='flex items-center bg-green-800 text-white p-2 gap-1 rounded-lg shadow-md'>
                                <IoLogoWhatsapp className='text-green-600' />
                                <span>Message</span>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

