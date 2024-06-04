import schoolImage from "../../assets/School.png";
import logout1 from "../../assets/logout.png";
import ExpansionTile from "../utils/ExpansionTile.jsx";
import menuItems from "./helper.js";
import { Link,useNavigate } from "react-router-dom";
import { useContext,useState } from "react";
import AuthContext from "../../Context/AuthContext.jsx";

export default function AdminDrawer({ isOpen }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [active,setActive]=useState(null)


  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleClick=(index)=>{
    setActive(index)
  }
  return (
    <div className={` ${isOpen ? '  py-6 px-2' : ''} w-full overflow-y-auto rounded-lg text-center items-center border bg-white shadow-md no-scrollbar`}>
      <div className="flex items-center">
        <img src={schoolImage} alt="school_image" className="w-1/3" />
        <span className="text-black ml-4">Metaphile Public School</span>
      </div>
      <div className="mt-5 bg-teal-300 px-2 py-4 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <div className="mt-4">
          {menuItems.map((menuItem, index) => (
            <div
            key={index}
            onClick={() => handleClick(index)}
            className={`cursor-pointer rounded-lg ${active === index ? 'bg-secondary' : ''}`}
          >
            <ExpansionTile
             
              image={menuItem.image}
              alternateText={menuItem.alt}
              title={menuItem.title}
              childrens={menuItem.children}
              route={menuItem.route}
            />
            </div>
          ))}
        </div>
      </div>
      <div className="flex h-fit justify-center mt-8">
      <button
          onClick={handleLogout}
          className="bg-teal-300 border border-transparent rounded-xl px-4 py-2 flex items-center shadow-md"
        >
          <span className="text-black">Log out</span>
          <img src={logout1} alt="logout" className="w-6 ml-2" />
        </button>
      </div>
    </div>
  );
}
