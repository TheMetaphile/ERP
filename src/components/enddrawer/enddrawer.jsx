import { Link } from "react-router-dom";
import Activities from './activity.jsx';
import Ballroom from "./../../assets/BallroomDance.png";
import Notice from './notice.jsx';

export default function Enddrawer() {
  return (
    <div className="overflow-auto h-full px-2 w-full">
      <h6 className="flex justify-between text-sm mt-3">Daily Notice
        <Link to={'/Student-Dashboard/notification/allnotification'}>
          <span className="text-blue-500">See All</span>
        </Link>
      </h6>
      <div className="dialyNotices w-full  bg-blue-50 rounded-xl p-2 mt-3 mb-3 overflow-auto border border-gray-300">
        <Notice />
      </div>
      {/* <h6 className="flex justify-between text-sm overflow-auto no-scrollbar">Activities
        <Link to={'/Student-Dashboard/activities/recentactivity'}>
          <span className="text-blue-500">See All</span>
        </Link>
      </h6>
      <Activities image={Ballroom} title="Rhyme Time: A Night of Poetry" time="24 Jan 21, 09:00 AM" description="April is also a National Poetry Month. Now there is a great theme for a fun family night!" />
      <Activities image={Ballroom} title="Rhyme Time: A Night of Poetry" time="24 Jan 21, 09:00 AM" description="April is also a National Poetry Month. Now there is a great theme for a fun family night!" />
      <Activities image={Ballroom} title="Rhyme Time: A Night of Poetry" time="24 Jan 21, 09:00 AM" description="April is also a National Poetry Month. Now there is a great theme for a fun family night!" />
      <Activities image={Ballroom} title="Rhyme Time: A Night of Poetry" time="24 Jan 21, 09:00 AM" description="April is also a National Poetry Month. Now there is a great theme for a fun family night!" /> */}
    </div>
  );
}
