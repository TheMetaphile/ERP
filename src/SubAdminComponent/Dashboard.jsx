import { useState, useContext } from "react";
import SubAdminNavbar from "./navbar/navbar.jsx";
import { Outlet } from "react-router-dom";
import SubadminDrawer from './Drawer/Drawer'
import SubAdminEndDrawer from './enddrawer/enddrawer.jsx';
import AuthContext from "../Context/AuthContext.jsx";

export default function SubAdminDashboard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { authState } = useContext(AuthContext);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const [isEndDrawerOpen, setIsEndDrawerOpen] = useState(false);

  const toggleEndDrawer = () => {
    setIsEndDrawerOpen(!isEndDrawerOpen);
  };
  return (
    <div className="w-screen h-screen overflow-x-auto  no-scrollbar  pt-20 mobile:max-tablet:mt-16">
      <div className="fixed top-0 left-0 w-full px-2 z-50">
        <SubAdminNavbar onDrawerToggle={toggleDrawer} onEndDrawerToggle={toggleEndDrawer} />
      </div>
      <div className="flex flex-grow h-screen">
        {authState.userDetails.role === 'Accountant' && (
          <div className={`mobile:max-tablet:absolute z-10 mt-2 flex-shrink-0 transition-all duration-300 mobile:max-tablet:mt-2. ${isDrawerOpen ? 'w-60 h-full' : 'w-0'} overflow-y-auto no-scrollbar`}>
            <SubadminDrawer isOpen={isDrawerOpen} />
          </div>
        )}

        <div className="flex-grow  overflow-y-auto no-scrollbar">
          <Outlet />
        </div>
        <div className={`mobile:max-laptop:absolute mobile:max-laptop:right-0 mobile:max-laptop:left-0 rounded-lg shadow-md flex-shrink-0 bg-white transition-all duration-300 mobile:max-laptop:${isEndDrawerOpen ? 'w-60 h-full' : 'w-0 h-0'} laptop:w-60 laptop:h-full overflow-y-auto no-scrollbar`}>
          <SubAdminEndDrawer />
        </div>
      </div>

    </div>
  );
}
