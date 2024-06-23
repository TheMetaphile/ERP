import homeImage from "../../assets/home.png";
import adminImage from "../../assets/admin.png";
import checkinImage from "../../assets/checkin.png";
import dashboardLeaveImage from "../../assets/Dashboard_leave.png";
import salaryImage from "../../assets/salary.png";
import homeworkImage from "../../assets/freelance 1.png";
import classworkImage from "../../assets/presentation 1.png";
import timeTableImage from "../../assets/Dashboard_time_table.png";
import resultImage from "../../assets/Dashboard_result.png";
import studentFeesImage from "../../assets/Dashboard_fee.png";
import transportImage from "../../assets/transport.png";
import studentAttendanceImage from "../../assets/Dashboard_assignment.png";
import birthdayImage from "../../assets/birthday.png";
import messageImage from "../../assets/message.png";
import noticeImage from "../../assets/notice2.png";
import notebookImage from "../../assets/notebook.png";

const menuItems = [
  {
    image: homeImage,
    alt: "Attendance image",
    title: "Dashboard",
    route: '/Teacher-Dashboard',
    children: []
  },
  {
    image: adminImage,
    alt: "Admin image",
    title: "Admin",
    route: '/Admin-Dashboard',
    children: []
  },
  {
    image: checkinImage,
    alt: "Check In Image",
    title: "Check In",
    route: '/Teacher-Dashboard/checkin',
    children: []
  },
  {
    image: dashboardLeaveImage,
    alt: "Leave application image",
    title: "Take Leave",
    route: '/Teacher-Dashboard/takeleave',
    children: []
  },
  {
    image: salaryImage,
    alt: "Salary Image",
    title: "Salary",
    children: []
  },
  {
    image: homeworkImage,
    alt: "Home Work Image",
    title: "Home Work",
    route: '/Teacher-Dashboard/homework',
    children: []
  },
  {
    image: classworkImage,
    alt: "Class Work Image",
    title: "Class Work",
    route: '/Teacher-Dashboard/classwork',
    children: []
  },
  {
    image: timeTableImage,
    alt: "Time Table Image",
    title: "Time Table",
    route: '/Teacher-Dashboard/timetable',
    children: []
  },
  {
    image: resultImage,
    alt: "Result image",
    title: "Report Card",
    route: '/Teacher-Dashboard/reportcard',
    children: []
  },
  {
    image: studentFeesImage,
    alt: "Fee Due image",
    title: "Student Fees",
    route: '/Teacher-Dashboard/studentfee',
    children: []
  },
  {
    image: transportImage,
    alt: "img",
    title: "Student Leave",
    route: '/Teacher-Dashboard/studentleave',
    children: []
  },
  {
    image: studentAttendanceImage,
    alt: "Attendance image",
    title: "Student Attendence",
    route: '/Teacher-Dashboard/studentattendence',
    children: []
  },
  {
    image: birthdayImage,
    alt: "BirthDay Image",
    title: "Birthdays",
    route: '/Teacher-Dashboard/birthday',
    children: []
  },
  {
    image: messageImage,
    alt: "img",
    title: "Message",
    route: '/Teacher-Dashboard/message',
    children: []
  },
  {
    image: noticeImage,
    alt: "Notice Image",
    title: "Notice Board",
    route: '/Teacher-Dashboard/noticeboard',
    children: []
  },
  {
    image: notebookImage,
    alt: "Note Book Image",
    title: "Note Book Record",
    route: '/Teacher-Dashboard/notebook',
    children: []
  },
];

export default menuItems;
