import Drawer from "../components/drawer/Drawer.jsx";
import Navbar from "../components/navbar/navbar.jsx";
import Enddrawer from "../components/enddrawer/enddrawer.jsx";
import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { messaging, getToken, onMessage } from './../firebase';


export default function Dashboard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const [isEndDrawerOpen, setIsEndDrawerOpen] = useState(false);

  const toggleEndDrawer = () => {
    setIsEndDrawerOpen(!isEndDrawerOpen);
  };

  const handleClickOutside = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      setIsDrawerOpen(false);
    }
  };

  useEffect(() => {
    if (isDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDrawerOpen]);


  useEffect(() => {
    // Request permission and get token as shown in the previous step

    // Handle incoming messages
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // Customize notification handling here
      alert(`New message: ${payload.notification.title}`);
    });
  }, []);
  return (
    <div className="w-screen h-screen overflow-x-auto  no-scrollbar">
      <div className="fixed top-0 left-0 w-full px-2 z-50">
        <Navbar
          onDrawerToggle={toggleDrawer}
          onEndDrawerToggle={toggleEndDrawer}
          isDrawerOpen={isDrawerOpen}
        />
      </div>

      <div className="flex flex-grow h-screen pt-20 mobile:max-tablet:pt-28 ">
        <div
          ref={drawerRef}
          className={`mobile:max-tablet:absolute z-10 flex-shrink-0 transition-all duration-300 ${isDrawerOpen ? "w-60 h-full" : "w-0"} overflow-y-auto no-scrollbar`}
        >
          <Drawer isOpen={isDrawerOpen} />
        </div>
        <div className="flex-grow  overflow-y-auto no-scrollbar ">
          <Outlet />
        </div>
        <div className={`mobile:max-laptop:absolute mobile:max-laptop:right-0 flex-shrink-0 transition-all duration-300 mobile:max-laptop:${isEndDrawerOpen ? 'w-60 h-full' : 'w-0 h-0'} laptop:w-60 laptop:h-full overflow-y-auto no-scrollbar`}>
          <Enddrawer />
        </div>
      </div>
    </div>
  );
}

