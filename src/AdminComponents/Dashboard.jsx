
import { Outlet } from "react-router-dom";
import AdminDrawer from "./drawer/Drawer.jsx";
import AdminNavbar from "./navbar/navbar.jsx";
import AdminEnddrawer from "./enddrawer/enddrawer.jsx";
// Dashboard.jsx
export default function AdminDashboard() {
  return (
    <div className="flex h-screen overflow-auto no-scrollbar">
      <div>
        <AdminDrawer />
      </div>
      <div className="flex h-screen flex-col w-full overflow-y-auto">
        <AdminNavbar />
        <div className="flex flex-row w-full">
        <div className='flex w-full'>
        <Outlet />
        </div>
          <AdminEnddrawer />
        </div>
      </div>
    </div>
  );
}

