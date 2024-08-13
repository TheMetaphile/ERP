import { Link } from "react-router-dom";
import Activities from './activity';
import Ballroom from "./../../assets/BallroomDance.png";
import Notice from './notice';
import Classwork from "./classwork";

export default function Enddrawer() {
  return (
    <div className="border border-gray-300 roubder-full shadow-md h-full overflow-auto px-4 py-6">
      <section className="mb-8">
        <h2 className="flex justify-between items-center text-lg font-semibold mb-4">
          Daily Notice
          <Link to="/Student-Dashboard/notification/allnotification" className="text-blue-600 hover:text-blue-800 text-sm">
            See All
          </Link>
        </h2>
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
          <Notice />
        </div>
      </section>

      {/* <section className="mb-8">
        <h2 className="flex justify-between items-center text-lg font-semibold mb-4">
          Activities
          <Link to="/Student-Dashboard/activities/recentactivity" className="text-blue-600 hover:text-blue-800 text-sm">
            See All
          </Link>
        </h2>
        <div className="space-y-4">
          <Activities
            image={Ballroom}
            title="Rhyme Time: A Night of Poetry"
            time="24 Jan 21, 09:00 AM"
            description="April is also a National Poetry Month. Now there is a great theme for a fun family night!"
          />
          <Activities
            image={Ballroom}
            title="Dance Extravaganza"
            time="28 Jan 21, 02:00 PM"
            description="Join us for an evening of graceful movements and rhythmic beats!"
          />
        </div>
      </section> */}

      <section>
        <h2 className="flex justify-between items-center text-lg font-semibold mb-4">
          Classwork
          <Link to="/Student-Dashboard/classwork" className="text-blue-600 hover:text-blue-800 text-sm">
            See All
          </Link>
        </h2>
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
          <Classwork />
        </div>
      </section>
    </div>
  );
}