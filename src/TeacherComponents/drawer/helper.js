import homeImage from "../../assets/home.png";
import checkinImage from "../../assets/checkin.png";
import dashboardLeaveImage from "../../assets/Dashboard_leave.png";
import homeworkImage from "../../assets/freelance 1.png";
import classworkImage from "../../assets/presentation 1.png";
import timeTableImage from "../../assets/Dashboard_time_table.png";
import birthdayImage from "../../assets/birthday.png";
import noticeImage from "../../assets/notice2.png";
import notebookImage from "../../assets/notebook.png";
import ClassActivity from "../../assets/lecture.png";
import Doubts from "../../assets/doubts.png";
import Appraisal from "../../assets/appraisal.png";
import dashboardResult from "../../assets/Dashboard_result.png";

const menuItems = [
  {
    image: homeImage,
    alt: "Attendance image",
    title: "Dashboard",
    route: "/Teacher-Dashboard",
    children: [],
  },

  // {
  //   image: studentAttendanceImage,
  //   alt: "Attendance image",
  //   title: "Student Attendence",
  //   route: '/Teacher-Dashboard/studentattendence',
  //   children: []
  // },
  // {
  //   image: transportImage,
  //   alt: "img",
  //   title: "Student Leave",
  //   route: '/Teacher-Dashboard/studentleave',
  //   children: []
  // },
  {
    image: Doubts,
    alt: "img",
    title: "Student Doubts",
    route: "/Teacher-Dashboard/studentdoubts/new",
    children: [],
  },
  {
    image: ClassActivity,
    alt: "img",
    title: "Class Activity",
    route: "/Teacher-Dashboard/class_activity",
    children: [],
  },
  // {
  //   image: adminImage,
  //   alt: "Admin image",
  //   title: "Admin",
  //   route: '/Admin-Dashboard',
  //   children: []
  // },
  // {
  //   image: checkinImage,
  //   alt: "Check In Image",
  //   title: "Check In",
  //   route: "/Teacher-Dashboard/checkin",
  //   children: [],
  // },
  {
    image: dashboardLeaveImage,
    alt: "Leave application image",
    title: "Take Leave",
    route: "/Teacher-Dashboard/takeleave",
    children: [],
  },
  // {
  //   image: salaryImage,
  //   alt: "Salary Image",
  //   title: "Salary",
  //   children: []
  // },
  {
    image: homeworkImage,
    alt: "Home Work Image",
    title: "Home Work",
    route: "/Teacher-Dashboard/homework",
    children: [],
  },
  {
    image: classworkImage,
    alt: "Class Work Image",
    title: "Class Work",
    route: "/Teacher-Dashboard/classwork",
    children: [],
  },
  {
    image: timeTableImage,
    alt: "Time Table Image",
    title: "Time Table",
    route: "/Teacher-Dashboard/timetable",
    children: [],
  },
  // {
  //   image: resultImage,
  //   alt: "Result image",
  //   title: "Report Card",
  //   route: '/Teacher-Dashboard/reportcard',
  //   children: []
  // },
  // {
  //   image: studentFeesImage,
  //   alt: "Fee Due image",
  //   title: "Student Fees",
  //   route: '/Teacher-Dashboard/studentfee',
  //   children: []
  // },

  {
    image: birthdayImage,
    alt: "BirthDay Image",
    title: "Birthdays",
    route: "/Teacher-Dashboard/birthday",
    children: [],
  },
  // {
  //   image: messageImage,
  //   alt: "img",
  //   title: "Message",
  //   route: '/Teacher-Dashboard/message',
  //   children: []
  // },
  {
    image: Appraisal,
    alt: "Appraisal Image",
    title: "Appraisal",
    route: "/Teacher-Dashboard/appraisal/apply",
    children: [],
  },
  {
    image: noticeImage,
    alt: "Notice Image",
    title: "Notice Board",
    route: "/Teacher-Dashboard/noticeboard/teacher",
    children: [],
  },
  {
    image: notebookImage,
    alt: "Note Book Image",
    title: "Note Book Record",
    route: "/Teacher-Dashboard/notebook",
    children: [],
  },
  // {
  //   image: dashboardResult,
  //   alt: "Result image",
  //   title: "SubResult",
  //   route: "/Teacher-Dashboard/SubResult",
  //   children: [],
  // },
  {
    image: ClassActivity,
    alt: "img",
    title: "Upload Result",
    route: "/Teacher-Dashboard/uploadResult",
    children: [],
  },
  {
    image: notebookImage,
    alt: "weekly-planner",
    title: "Weekly Planner",
    route: "/Teacher-Dashboard/planner",
    children: [],
  },
  {
    image: notebookImage,
    alt: "HOD",
    title: "HOD",
    route: "/Teacher-Dashboard/HOD",
    children: [],
  },
];

export default menuItems;
