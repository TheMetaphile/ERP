import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminDrawer from "./drawer/Drawer.jsx";
import AdminNavbar from "./navbar/navbar.jsx";
import AdminEnddrawer from "./enddrawer/enddrawer.jsx";

export default function AdminDashboard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="w-screen h-screen overflow-x-auto  no-scrollbar ">
      <div className="flex-grow-0 w-screen px-2">
      <AdminNavbar onDrawerToggle={toggleDrawer} />
      </div>

      <div className="flex h-screen ">
        <div className={`transition-all duration-300 ${isDrawerOpen ? 'w-2/12 h-full' : 'w-0'} overflow-y-auto no-scrollbar`}>
          <AdminDrawer isOpen={isDrawerOpen} />
        </div>
        <div className="flex-grow  overflow-y-auto no-scrollbar ">
          <Outlet />
        </div>
        <div className="w-2/12 h-screen">
        <AdminEnddrawer />
        </div>
      </div>
    </div>
  );
}
