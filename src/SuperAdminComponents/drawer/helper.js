import homeImage from "../../assets/home.png";
import teacherImage from "../../assets/teacher2.png";
import studentImage from "../../assets/student.png";
import teacherAltImage from "../../assets/teacher.png";
import classImage from "../../assets/class.png";
import subjectImage from "../../assets/subject.png";
import parentImage from "../../assets/parent.png";
import libraryImage from "../../assets/library.png";
import accountImage from "../../assets/account.png";
import examImage from "../../assets/exam.png";
import transportImage from "../../assets/transport.png";
import noticeImage from "../../assets/notice.png";
import messageImage from "../../assets/message.png";
import leaveImage from "../../assets/leave_icon.png";
import timetable from "../../assets/Dashboard_time_table.png";
import events from "../../assets/Dashboard_events.png";

const menuItems = [
  {
    image: homeImage,
    alt: "Attendance image",
    title: "Dashboard",
    route: "/Sup-Admin",
    children: [],
  },
  {
    image: homeImage,
    alt: "Attendance image",
    title: "Admin",
    route: "/Sup-Admin/Admins",
    children: [],
  },
  // {
  //   image: teacherAltImage,
  //   alt: "img",
  //   title: "Teachers",
  //   children: [
  //     {
  //       text: "All Teachers",
  //       route: "/Sup-Admin/Teachers",
  //     },
  //     {
  //       text: "Add New Teacher",
  //       route: "/Sup-Admin/AddTeachers",
  //     }
  //   ],
  // }
];

export default menuItems;
