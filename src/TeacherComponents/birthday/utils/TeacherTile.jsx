import Logo from '../../../assets/Test Account.png'
import { IoLogoWhatsapp } from "react-icons/io";

export default function TeacherTile({ birthdays }) {
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
                        <div key={index} className='w-full flex   items-center mb-2 p-3 mt-2 border-gray-300 border rounded-lg shadow-md justify-between'>
                            <div className='flex items-center'>
                                <img src={detail.profileLink} alt="Profile" className='h-10 w-10 rounded-full' />

                                <div className='flex gap-2 font-normal ml-3'>
                                    <span>{detail.name}</span> |
                                    <span>Class: {detail.currentClass}</span> |
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
                            <div className='flex items-center'>
                                <img src={detail.profileLink} alt="Profile" className='h-10 w-10 rounded-full' />

                                <div className='flex gap-2 font-normal ml-3'>
                                    <span>{detail.name}</span>|
                                    <span>Class: {detail.currentClass}</span>|
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

