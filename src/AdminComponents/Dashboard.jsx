import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminDrawer from "./drawer/Drawer.jsx";
import AdminNavbar from "./navbar/navbar.jsx";
import AdminEnddrawer from "./enddrawer/enddrawer.jsx";
import { messaging, getToken,onMessage } from './../firebase';


export default function AdminDashboard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  
  const [isEndDrawerOpen, setIsEndDrawerOpen] = useState(false);

  const toggleEndDrawer = () => {
    setIsEndDrawerOpen(!isEndDrawerOpen);
  };

  useEffect(() => {
    // Request permission to send notifications
    const requestPermission = async () => {
      try {
        await Notification.requestPermission();
        const token = await getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' });
        console.log('FCM Token:', token);
        // You can send the token to your server to save it and use it to send push notifications
      } catch (error) {
        console.error('Error getting FCM token', error);
      }
    };

    requestPermission();
  }, []);
  
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
    <div className="w-screen h-screen overflow-x-auto  no-scrollbar ">
      <div className="fixed top-0 left-0 w-full px-2 z-50">
        <AdminNavbar onDrawerToggle={toggleDrawer} onEndDrawerToggle={toggleEndDrawer} />
      </div>

      <div className="flex flex-grow h-screen pt-20 mobile:max-tablet:pt-32">
        <div className={`mobile:max-laptop:absolute z-20 flex-shrink-0 transition-all duration-300 mobile:max-tablet:mt-2.5 ${isDrawerOpen ? 'w-60 h-full' : 'w-0'} overflow-y-auto no-scrollbar`}>
          <AdminDrawer isOpen={isDrawerOpen} />
        </div>
        <div className="flex-grow  overflow-y-auto no-scrollbar mobile:max-tablet:mt-4">
          <Outlet />
        </div>
        <div className={`mobile:max-tablet:absolute mobile:max-tablet:right-0 rounded-lg shadow-md flex-shrink-0 bg-white transition-all duration-300 mobile:max-tablet:${isEndDrawerOpen ? 'mt-4 h-full' : 'w-0 h-0'} tablet:w-60 tablet:h-full overflow-y-auto no-scrollbar`}>
          <AdminEnddrawer />
        </div>
      </div>
    </div>
  );
}
