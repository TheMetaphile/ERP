import homeImage from "../../assets/home.png";
import history from "../../assets/history.png";

const menuItems = [
  {
    image: homeImage,
    alt: "Attendance image",
    title: "Dashboard",
    route: "/Sub-Admin",
    children: [],
  },
  {
    image: history,
    alt: "History image",
    title: "Salary History",
    route: "/Sub-Admin/Salary",
    children: [],
  },
];

export default menuItems;
