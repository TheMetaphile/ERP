import { useState } from "react";
import SubAdminNavbar from "./navbar/navbar.jsx";
import { Outlet } from "react-router-dom";

export default function SubAdminDashboard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const [isEndDrawerOpen, setIsEndDrawerOpen] = useState(false);

  const toggleEndDrawer = () => {
    setIsEndDrawerOpen(!isEndDrawerOpen);
  };
  return (
    <div className="w-screen h-screen overflow-x-auto  no-scrollbar ">
      <div className="fixed top-0 left-0 w-full px-2 z-50">
        <SubAdminNavbar onDrawerToggle={toggleDrawer} onEndDrawerToggle={toggleEndDrawer} />
      </div>

      <Outlet />
    </div>
  );
}
