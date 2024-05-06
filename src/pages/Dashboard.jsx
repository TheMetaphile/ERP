import Drawer from "../components/drawer/Drawer.jsx";
import Navbar from "../components/navbar/navbar.jsx";
import Enddrawer from "../components/enddrawer/enddrawer.jsx";
import { Outlet } from "react-router-dom";
import { useState } from "react";

// Dashboard.jsx
export default function Dashboard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <div className="w-screen h-screen overflow-x-auto  no-scrollbar ">
    <div className="flex-grow-0 w-screen px-2">
    <Navbar onDrawerToggle={toggleDrawer} />
    </div>

    <div className="flex h-screen ">
      <div className={`flex-shrink-0 transition-all duration-300 ${isDrawerOpen ? 'w-60 h-full' : 'w-0'} overflow-y-auto no-scrollbar`}>
        <Drawer isOpen={isDrawerOpen} />
      </div>
      <div className="flex-grow overflow-y-auto no-scrollbar ">
        <Outlet />
      </div>
      <div className="flex-shrink-0 w-60 h-screen">
      <Enddrawer />
      </div>
    </div>
  </div>
  );
}

