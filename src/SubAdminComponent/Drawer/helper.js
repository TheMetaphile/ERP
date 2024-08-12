import homeImage from "../../assets/home.png";
import salary from "../../assets/salary.png";
import history from "../../assets/history.png";
import teacher from "../../assets/teachers.png";
import student from "../../assets/student.png";
import fee from "../../assets/Dashboard_fee.png";

const menuItems = [
  {
    image: homeImage,
    alt: "Attendance image",
    title: "Dashboard",
    route: "/Sub-Admin",
    children: [],
  },
  {
    image: salary,
    alt: "Salary image",
    title: "Salary History",
    route: "/Sub-Admin/Salary",
    children: [],
  },
  {
    image: teacher,
    alt: "Teacher image",
    title: "Register Teacher",
    route: "/Sub-Admin/registerTeacher",
    children: [],
  },
  {
    image: student,
    alt: "Student image",
    title: "Register Student",
    route: "/Sub-Admin/registerStudent",
    children: [],
  },
  {
    image: student,
    alt: "Student image",
    title: "Readmission",
    route: "/Sub-Admin/Readmission",
    children: [],
  },
  {
    image: fee,
    alt: "Fee image",
    title: "Student Fees",
    route: "/Sub-Admin/StudentsFee",
    children: [],
  },
  {
    image: fee,
    alt: "Notice image",
    title: "Notice",
    route: "/Sub-Admin/Notice",
    children: [],
  },
];

export default menuItems;
