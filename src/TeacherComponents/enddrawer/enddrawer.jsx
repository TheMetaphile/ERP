import { Link } from "react-router-dom";
import Activities from './activity.jsx';
import Ballroom from "./../../assets/BallroomDance.png";
import { FaCircle } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import Notices from './Notices.jsx';
import Classwork from './classwork.jsx';
export default function TeacherEnddrawer() {
  return (
    <div className="overflow-y-auto w-full h-full px-2 rounded-lg border border-gray-300">
      {/* <h6 className="flex justify-between text-sm mt-3">Upcoming Activities <span className="text-blue-500">See All</span></h6>
      <div className="dialyNotices w-full h-2/5 bg-blue-50 rounded-xl p-2 mt-3 mb-3 overflow-auto no-scrollbar">
        <div className='flex items-center '>
          <FaCircle />
          <Activities title="Meeting with the VC" time="10 A.M - 11 A.M" status="Due Soon" link="Meeting link//www.zoom.com" />
        </div>
        <div className='flex items-center '>
          <FaCircle />
          <Activities title="Meeting with the VC" time="10 A.M - 11 A.M" status="Due Soon" link="Meeting link//www.zoom.com" />
        </div>
        <div className='flex items-center '>
          <FaCircle />
          <Activities title="Meeting with the VC" time="10 A.M - 11 A.M" status="Due Soon" link="Meeting link//www.zoom.com" />
        </div>
        <div className='flex items-center '>
          <FaCircle />
          <Activities title="Meeting with the VC" time="10 A.M - 11 A.M" status="Due Soon" link="Meeting link//www.zoom.com" />
        </div>

      </div> */}
      <h6 className="flex mt-2 justify-between text-sm overflow-auto no-scrollbar">Notices
        <Link to={'/Teacher-Dashboard/noticeboard/teacher'}>
          <span className="text-blue-500">See All</span>
        </Link>
      </h6>
      <div className="dialyNotices w-full  bg-blue-50 rounded-xl p-2 mt-2 mb-3 overflow-auto no-scrollbar">
        <Notices />
      </div>

      {/* <h6 className="flex justify-between text-sm overflow-auto no-scrollbar">Class Work <span className="text-blue-500">See All</span></h6>
      <div className="dialyNotices w-full h-2/5 bg-blue-50 rounded-xl p-2 mt-3 mb-3 overflow-auto no-scrollbar">
        <div className='flex items-center '>
          <MdAssignment />
          <Classwork classs="2nd" description="Write table 2 to 20" date="04 May, 09:20 AM" />
        </div>
        <div className='flex items-center '>
          <MdAssignment />
          <Classwork classs="2nd" description="Write table 2 to 20" date="04 May, 09:20 AM" />
        </div>
        <div className='flex items-center '>
          <MdAssignment />
          <Classwork classs="2nd" description="Write table 2 to 20" date="04 May, 09:20 AM" />
        </div>
        <div className='flex items-center '>
          <MdAssignment />
          <Classwork classs="2nd" description="Write table 2 to 20" date="04 May, 09:20 AM" />
        </div>

      </div> */}
    </div>
  );
}
