import Drawer from "../components/drawer/Drawer.jsx";
import Navbar from "../components/navbar/navbar.jsx";
import Enddrawer from "../components/enddrawer/enddrawer.jsx";
import { Outlet } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { messaging, getToken, onMessage } from './../firebase';
import AuthContext from "../Context/AuthContext.jsx";
import { Bell, X } from "react-feather";


export default function Dashboard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEndDrawerOpen, setIsEndDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const [notification, setNotification] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const { darkMode } = useContext(AuthContext);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };


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
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      setNotification({
        title: payload.notification?.title || 'New Message',
        body: payload.notification?.body || 'You have a new notification',
        timestamp: new Date().toLocaleTimeString()
      });
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    });

    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <div className={`w-screen h-screen flex overflow-x-auto no-scrollbar pt-20 mobile:max-tablet:mt-16 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      <div className="fixed top-0 left-0 w-full px-2 z-50">

        <Navbar
          onDrawerToggle={toggleDrawer}
          onEndDrawerToggle={toggleEndDrawer}
          darkMode={darkMode}
        />
      </div>

      <div className="flex flex-grow relative">
        <div
          className={`mobile:max-tablet:fixed z-30 mt-2 flex-shrink-0 transition-all duration-300 
                ${isDrawerOpen ? 'w-64' : 'w-0'} 
                ${darkMode ? 'bg-gray-800' : 'bg-white'} 
                shadow-lg rounded-r-lg overflow-hidden`}
        >
          <Drawer isOpen={isDrawerOpen} darkMode={darkMode} />
        </div>

        <div className={`flex-grow overflow-auto no-scrollbar transition-all duration-300 ${isDrawerOpen ? 'mobile:max-tablet:ml-64' : 'ml-0'
          } ${isEndDrawerOpen ? 'mr-60' : 'mr-0'
          }`}>
          <div className={` w-full  ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <Outlet />
          </div>
        </div>

        <div
          className={`fixed right-0 top-20 z-30 h-[calc(100vh-5rem)]
                rounded-l-lg shadow-lg flex-shrink-0 transition-all duration-300 
                ${isEndDrawerOpen ? 'w-60' : 'w-0'} 
                overflow-hidden
                ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <Enddrawer darkMode={darkMode} />
        </div>
      </div>

      {showNotification && notification && (
        <div
          className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-xs transform transition-all duration-300 ease-in-out ${showNotification ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            } ${darkMode ? 'bg-gray-800 text-white border border-gray-700' : 'bg-white text-gray-800 border border-gray-200'
            }`}
        >
          <div className="flex items-start">
            <div className={`p-2 rounded-full mr-3 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
              <Bell size={20} className={darkMode ? 'text-blue-300' : 'text-blue-600'} />
            </div>
            <div className="flex-1">
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {notification.title}
              </h3>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {notification.body}
              </p>
              <span className={`text-xs mt-2 block ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {notification.timestamp}
              </span>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className={`ml-4 p-1 rounded-full hover:bg-opacity-10 ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                }`}
            >
              <X size={16} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
            </button>
          </div>
        </div>
      )}

      {(isDrawerOpen || isEndDrawerOpen) && (
        <div
          className="mobile:max-tablet:fixed inset-0 bg-black bg-opacity-50 z-20 tablet:hidden"
          onClick={() => {
            setIsDrawerOpen(false);
            setIsEndDrawerOpen(false);
          }}
        />
      )}
    </div>
  );
}

