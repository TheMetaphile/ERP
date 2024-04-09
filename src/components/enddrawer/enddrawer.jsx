import Activities from './activity.jsx';
import Ballroom from "./../../assets/BallroomDance.png"; 
import Notice from './notice.jsx';

export default function Enddrawer() {
  return (
    <div className="enddrawer overflow-auto h-screen w-80 mr-2 no-scrollbar">
      <h6 className="flex justify-between text-sm mt-3">Daily Notice <span className="text-blue-500">See All</span></h6>
      <div className="dialyNotices w-full h-2/5 bg-blue-50 rounded-xl p-2 mt-3 mb-3 overflow-auto no-scrollbar">
        <Notice title="Events" description="Today All the student of class 1st to 8th come to Auditorium at 12:00."/>
        <Notice title="Exam Schedule" description="From 13 April to 20 April the Exam will be start."/>
        <Notice title="Holiday" description="Tomorrow will be a Holiday on the occasion of Holi."/>
        <Notice title="Events" description="Today All the student of class 1st to 8th come to Auditorium at 12:00."/>
      </div>
      <h6 className="flex justify-between text-sm overflow-auto no-scrollbar">Activities <span className="text-blue-500">See All</span></h6>
      <Activities image={Ballroom} title="Rhyme Time: A Night of Poetry" time="24 Jan 21, 09:00 AM" description="April is also a National Poetry Month. Now there is a great theme for a fun family night!"/>
      <Activities image={Ballroom} title="Rhyme Time: A Night of Poetry" time="24 Jan 21, 09:00 AM" description="April is also a National Poetry Month. Now there is a great theme for a fun family night!"/>
      <Activities image={Ballroom} title="Rhyme Time: A Night of Poetry" time="24 Jan 21, 09:00 AM" description="April is also a National Poetry Month. Now there is a great theme for a fun family night!"/>
      <Activities image={Ballroom} title="Rhyme Time: A Night of Poetry" time="24 Jan 21, 09:00 AM" description="April is also a National Poetry Month. Now there is a great theme for a fun family night!"/>
    </div>
  );
}
