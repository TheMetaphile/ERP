import schoolImage from "../../assets/School.png";
import logout from "../../assets/logout.png";
import ExpansionTile from "../utils/ExpansionTile.jsx";
import menuItems from "./helper.js";
import { Link } from "react-router-dom";
export default function AdminDrawer() {
  return (
    <div className="w-60 h-screen rounded-lg text-center items-center border bg-white py-6 px-4 shadow-md overflow-auto no-scrollbar">
      <div className="flex items-center">
        <img src={schoolImage} alt="school_image" className="w-1/3" />
        <span className="text-black ml-4">Methaphile Public School</span>

      </div>
      <div className="mt-12 bg-teal-300 px-2 py-4 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        
        <div className="mt-4">
          {menuItems.map((menuItem, index) => (
            <ExpansionTile
              key={index}
              image={menuItem.image}
              alternateText={menuItem.alt}
              title={menuItem.title}
              childrens={menuItem.children}
              route={menuItem.route}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-8"> {/* Added flex justify-center here */}
        <Link to='/' className="bg-teal-300 border border-transparent rounded-xl px-4 py-2 flex items-center shadow-md">
          <span className="text-black">Log out</span>
          <img src={logout} alt="School" className="w-6 ml-2" />
        </Link>
      </div>
    </div>
  );
}
