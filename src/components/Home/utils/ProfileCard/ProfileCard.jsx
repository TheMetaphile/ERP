import ProfileIcon from './../../../../assets/profileIcon.png'
import NotificationIcon from './../../../../assets/notificationIcon.png'

export default function ProfileCard(props) {
  return (
    <div className="flex w-full mx-1 mb-1 shadow-md rounded-lg bg-white p-2 h-fit">
      <img src={ProfileIcon} alt="ProfileIcon" className="w-20 h-20" />
      <div className='ml-3'>
        <h3 className="mb-1">Hi, {props.name}</h3>
        <h5 className="mb-1">Class {props.class}-{props.section} | Roll No. {props.rollNumber}</h5>
        <p className='px-2 py-1 rounded-md bg-teal-100 w-fit shadow-md'>{props.session}</p>
      </div>
      <div className='ml-auto relative text-center'>
        <img src={NotificationIcon} alt="Notifications" className="block w-16 h-16" />
        <span className='absolute bg-red-500 rounded-full text-white text-xs px-2 py-1 right-2 bottom-6'>{props.notification}</span>
      </div>
    </div>
  );
}
