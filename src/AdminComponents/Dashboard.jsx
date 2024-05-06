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
  <div className="fixed top-0 left-0 w-full px-2">
  <AdminNavbar onDrawerToggle={toggleDrawer} />
  </div>

  <div className="flex flex-grow h-screen pt-20">
    <div className={`flex-shrink-0 transition-all duration-300 ${isDrawerOpen ? 'w-60 h-full' : 'w-0'} overflow-y-auto no-scrollbar`}>
      <AdminDrawer isOpen={isDrawerOpen} />
    </div>
    <div className="flex-grow  overflow-y-auto no-scrollbar ">
      <Outlet />
    </div>
    <div className="flex-shrink-0 w-60 h-full">
    <AdminEnddrawer />
    </div>
  </div>
</div>
);
}
