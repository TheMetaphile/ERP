import homeImage from "../../assets/home.png";
import salary from "../../assets/salary.png";
import history from "../../assets/history.png";
import teacher from "../../assets/teachers.png";
import student from "../../assets/student.png";
import fee from "../../assets/Dashboard_fee.png";
import dashboardLeaveImage from "../../assets/Dashboard_leave.png";
import classImage from "../../assets/class.png";

const menuItems = [
  {
    image: homeImage,
    alt: "Attendance image",
    title: "Dashboard",
    route: "/Sub-Admin",
    children: [],
  },
  {
    image: homeImage,
    alt: "Attendance image",
    title: "Certificate",
    route: "/Sub-Admin/Certificates",
    children: [],
  },
  {
    image: homeImage,
    alt: "Attendance image",
    title: "Result",
    route: "/Sub-Admin/Result",
    children: [],
  },
  // {
  //   image: salary,
  //   alt: "Salary image",
  //   title: "Transaction History",
  //   route: "/Sub-Admin/Salary",
  //   children: [],
  // },
  {
    image: teacher,
    alt: "Teacher image",
    title: "Teacher Registration",
    route: "/Sub-Admin/registerTeacher",
    children: [],
  },
  {
    image: student,
    alt: "Student image",
    title: "Student Registration",
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
    image: dashboardLeaveImage,
    alt: "Notice image",
    title: "Notice",
    route: "/Sub-Admin/Notice",
    children: [],
  },
  {
    image: dashboardLeaveImage,
    alt: "Notice image",
    title: "Take Leave",
    route: "/Sub-Admin/TakeLeave",
    children: [],
  },
  {
    image: classImage,
    alt: "Notice image",
    title: "New Admission",
    route: "/Sub-Admin/NewAdmission",
    children: [],
  },
  {
    image: dashboardLeaveImage,
    alt: "Notice image",
    title: "New Section",
    route: "/Sub-Admin/Assignteacher",
    children: [],
  },
  {
    image: dashboardLeaveImage,
    alt: "Notice image",
    title: "Assign Subject",
    route: "/Sub-Admin/Assignsubject",
    children: [],
  },
  {
    image: dashboardLeaveImage,
    alt: "Notice image",
    title: "Time Table",
    route: "/Sub-Admin/TimeTable",
    children: [],
  },
  {
    image: dashboardLeaveImage,
    alt: "Notice image",
    title: "Assign Coordinator",
    route: "/Sub-Admin/Assigncoordinator",
    children: [],
  },
  {
    image: dashboardLeaveImage,
    alt: "img",
    title: "Substitute",
    children: [
      {
        text: "Substitute Coordinator",
        route: "/Sub-Admin/Substitutecoordinator",
      },
      {
        text: "ClassTeacher Substitute",
        route: "/Sub-Admin/classTeacherSubstitute",
      },
      {
        text: "Lecture Substitute",
        route: "/Sub-Admin/lectureSubstitute",
      },
    ],
  },
  {
    image: dashboardLeaveImage,
    alt: "Notice image",
    title: "SubAdmin Registration",
    route: "/Sub-Admin/Employee",
    children: [],
  },
  {
    image: dashboardLeaveImage,
    alt: "Notice image",
    title: "Access Control",
    route: "/Sub-Admin/SubAdmin",
    children: [],
  },
  {
    image: dashboardLeaveImage,
    alt: "Notice image",
    title: "Custom Registration Builder",
    route: "/Sub-Admin/DynamicRegister",
    children: [],
  },
  {
    image: dashboardLeaveImage,
    alt: "Notice image",
    title: "Template",
    route: "/Sub-Admin/Template",
    children: [],
  },
];

export default menuItems;
