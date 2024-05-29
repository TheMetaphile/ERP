import Activities from './activity.jsx';
import Ballroom from "./../../assets/BallroomDance.png"; 
import Notice from './notice.jsx';
import { FaCircle } from "react-icons/fa";
export default function TeacherEnddrawer() {
  return (
    <div className="overflow-y-auto w-full h-full px-2 no-scrollbar bg-orange-400">
      <h6 className="flex justify-between text-sm mt-3">Upcoming Activities <span className="text-blue-500">See All</span></h6>
      <div className="dialyNotices w-full h-2/5 bg-blue-50 rounded-xl p-2 mt-3 mb-3 overflow-auto no-scrollbar">
        <div className='flex items-center'>
        <FaCircle />
        <Activities title="Meeting with the VC" time="10 A.M - 11 A.M" status="Due Soon" link="Meeting link//www.zoom.com"/>
        </div>
        <FaCircle /><Activities title="Meeting with the VC" time="10 A.M - 11 A.M" status="Due Soon" link="Meeting link//www.zoom.com"/>
        <FaCircle /><Activities title="Meeting with the VC" time="10 A.M - 11 A.M" status="Due Soon" link="Meeting link//www.zoom.com"/>
        <FaCircle /><Activities title="Meeting with the VC" time="10 A.M - 11 A.M" status="Due Soon" link="Meeting link//www.zoom.com"/>
      </div>
      <h6 className="flex justify-between text-sm overflow-auto no-scrollbar">Activities <span className="text-blue-500">See All</span></h6>
      {/* <Notice image={Ballroom} title="Rhyme Time: A Night of Poetry" time="24 Jan 21, 09:00 AM" description="April is also a National Poetry Month. Now there is a great theme for a fun family night!"/>
      <Activities image={Ballroom} title="Rhyme Time: A Night of Poetry" time="24 Jan 21, 09:00 AM" description="April is also a National Poetry Month. Now there is a great theme for a fun family night!"/>
      <Activities image={Ballroom} title="Rhyme Time: A Night of Poetry" time="24 Jan 21, 09:00 AM" description="April is also a National Poetry Month. Now there is a great theme for a fun family night!"/>
      <Activities image={Ballroom} title="Rhyme Time: A Night of Poetry" time="24 Jan 21, 09:00 AM" description="April is also a National Poetry Month. Now there is a great theme for a fun family night!"/> */}
    </div>
  );
}
