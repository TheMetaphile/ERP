import Drawer from "../components/drawer/Drawer.jsx";
import Navbar from "../components/navbar/navbar.jsx";
import Enddrawer from "../components/enddrawer/enddrawer.jsx";
import { Outlet } from "react-router-dom";

// Dashboard.jsx
export default function Dashboard() {
  return (
    <div className="flex h-screen overflow-auto no-scrollbar">
      <div>
        <Drawer />
      </div>
      <div className="flex h-screen flex-col w-full overflow-y-auto">
        <Navbar />
        <div className="flex flex-row w-full">
          <Outlet />
          <Enddrawer />
        </div>
      </div>
    </div>
  );
}

