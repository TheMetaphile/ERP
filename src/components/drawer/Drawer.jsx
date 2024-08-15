import schoolImage from "../../assets/School.png";
import logout1 from "../../assets/logout.png";
import ImageTextInRow from "./ImageTextInRow.jsx";
import menuItems from "../../helpers/menuItems.js";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../Context/AuthContext";

export default function Drawer() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [active, setActive] = useState(null)

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleClick = (index) => {
    setActive(index)
  }
  return (
    <div className="w-60 z-10 h-full text-center items-center  py-6 px-2  overflow-auto no-scrollbar mobile:max-tablet:mt-2">
      <div className="flex items-center">
        <img src={schoolImage} alt="school_image" className="w-1/3" />
        <span className="text-black ml-4">Metaphile Public School</span>
      </div>
      <div className="mt-8 bg-teal-300 px-2 py-4 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <div className="  items-center">
          {menuItems.map((menuItem, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`cursor-pointer rounded-lg  mt-3  ${active === index ? 'bg-secondary' : ''}`}
            >
              <ImageTextInRow
                key={index}
                image={menuItem.image}
                alternateText={menuItem.alt}
                text={menuItem.text}
                route={menuItem.route}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-8"> {/* Added flex justify-center here */}
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
