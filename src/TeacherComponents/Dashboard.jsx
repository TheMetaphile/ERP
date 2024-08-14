import { useState } from "react";
import { Outlet } from "react-router-dom";
import TeacherDrawer from "./drawer/Drawer.jsx"
import TeacherNavbar from "./navbar/navbar.jsx";
import TeacherEnddrawer from "./enddrawer/enddrawer.jsx";

export default function TeacherDashboard() {
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
      <div className="sticky top-0 left-0 w-full px-2 z-50">
        <TeacherNavbar onDrawerToggle={toggleDrawer} onEndDrawerToggle={toggleEndDrawer} />
      </div>

      <div className="flex flex-grow h-screen">
        <div className={`mobile:max-tablet:absolute z-20 flex-shrink-0 transition-all duration-300 mobile:max-tablet:mt-2. ${isDrawerOpen ? 'w-60 h-full' : 'w-0'} overflow-y-auto no-scrollbar`}>
          <TeacherDrawer isOpen={isDrawerOpen} />
        </div>
        <div className="flex-grow  overflow-y-auto no-scrollbar ">
          <Outlet />
        </div>
        <div className={`mobile:max-laptop:absolute mobile:max-laptop:right-0 rounded-lg shadow-md flex-shrink-0 bg-white transition-all duration-300 mobile:max-laptop:${isEndDrawerOpen ? 'w-60 h-full' : 'w-0 h-0'} laptop:w-60 laptop:h-full overflow-y-auto no-scrollbar`}>
          <TeacherEnddrawer />
        </div>
      </div>
    </div>
  );
}
