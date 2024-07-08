import dashboardAssignment from "../assets/Dashboard_assignment.png";
import dashboardFee from "../assets/Dashboard_fee.png";
import presentation from "../assets/presentation 1.png";
import freelance from "../assets/freelance 1.png";
import dashboardEvents from "../assets/Dashboard_events.png";
import dashboardQuiz from "../assets/Dashboard_quiz.png";
import dashboardTimeTable from "../assets/Dashboard_time_table.png";
import dashboardResult from "../assets/Dashboard_result.png";
import dashboardGallery from "../assets/Dashboard_gallery.png";
import dashboardLeave from "../assets/Dashboard_leave.png";
import dashboardDoubt from "../assets/Dashboard_doubt.png";
import notification from "../assets/notification 1.png";
import medical from "../assets/Picture1.png";
import datesheet from "../assets/datesheet.png";
import lifestyle from "../assets/lifestyle 1.png";
import live from "../assets/live 1.png";
import changePassword from "../assets/change_password.png";

const menuItems = [
  {
    image: dashboardAssignment,
    alt: "Attendance image",
    text: "Attendance",
    route: '/Student-Dashboard/attendance'
  },
  {
    image: dashboardFee,
    alt: "Fee Due image",
    text: "Fee Due",
    route: '/Student-Dashboard/fee-due'
  },
  {
    image: presentation,
    alt: "presentation image",
    text: "Class Work",
    route: '/Student-Dashboard/classwork'
  },
  {
    image: freelance,
    alt: "freelance image",
    text: "Home Work",
    route: '/Student-Dashboard/homework'
  },
  // {
  //   image: dashboardEvents,
  //   alt: "Events image",
  //   text: "Events",
  //   route: '/Student-Dashboard/events'
  // },
  // {
  //   image: dashboardQuiz,
  //   alt: "Play Quiz image",
  //   text: "Play Quiz",
  //   route: "/Student-Dashboard/quiz"
  // },
  // {
  //   image: dashboardAssignment,
  //   alt: "Assignment image",
  //   text: "Assignment",
  //   route: '/Student-Dashboard/assignment'
  // },
  {
    image: dashboardTimeTable,
    alt: "Time table image",
    text: "Time Table",
    route: '/Student-Dashboard/timetable'
  },
  {
    image: dashboardResult,
    alt: "Result image",
    text: "Result",
    route: '/Student-Dashboard/result'
  },
  // {
  //   image: dashboardGallery,
  //   alt: "School gallery image",
  //   text: "School Gallery",
  //   route: '/Student-Dashboard/gallery'
  // },
  {
    image: dashboardLeave,
    alt: "Leave application image",
    text: "Leave Application",
    route: '/Student-Dashboard/leave'
  },
  {
    image: dashboardDoubt,
    alt: "Ask doubt image",
    text: "Ask Doubt",
    route: '/Student-Dashboard/askdoubt'
  },
  {
    image: notification,
    alt: "notification image",
    text: "Notice",
    route: '/Student-Dashboard/notification'
  },
  // {
  //   image: medical,
  //   alt: "medical image",
  //   text: "Medical Records",
  //   route: '/Student-Dashboard/medical'
  // },
  {
    image: datesheet,
    alt: "Date sheet image",
    text: "Date Sheet",
    route: "/Student-Dashboard/datesheet"
  },
  // {
  //   image: lifestyle,
  //   alt: "lifestyle image",
  //   text: "Activities",
  //   route: "/Student-Dashboard/activities"
  // },
  // {
  //   image: live,
  //   alt: "live image",
  //   text: "Broadcast channels",
  //   route: "/Student-Dashboard/broadcast"
  // },
  {
    image: changePassword,
    alt: "Change password image",
    text: "Change Password",
  },
];

export default menuItems;
