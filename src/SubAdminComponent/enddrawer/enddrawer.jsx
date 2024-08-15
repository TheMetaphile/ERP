import { Link } from "react-router-dom";
import Ballroom from "./../../assets/BallroomDance.png";
import Notice from './notice.jsx';


export default function Enddrawer() {


  return (
    <div className="overflow-auto h-full px-2 w-full">
      <h6 className="flex justify-between text-sm mt-3">Notice
        <Link to={'/Sub-Admin/Notice'}>
          <span className="text-blue-500">See All</span>
        </Link>
      </h6>
      <div className="dialyNotices w-full  bg-blue-50 rounded-xl p-2 mt-3 mb-3 overflow-auto border border-gray-300">
        <Notice />
      </div>


    </div>
  );
}
