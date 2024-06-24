import homeImage from '../../assets/home.png';
import teacherImage from '../../assets/teacher2.png';
import studentImage from '../../assets/student.png';
import teacherAltImage from '../../assets/teacher.png';
import classImage from '../../assets/class.png';
import subjectImage from '../../assets/subject.png';
import parentImage from '../../assets/parent.png';
import libraryImage from '../../assets/library.png';
import accountImage from '../../assets/account.png';
import examImage from '../../assets/exam.png';
import transportImage from '../../assets/transport.png';
import noticeImage from '../../assets/notice.png';
import messageImage from '../../assets/message.png';
import leaveImage from '../../assets/leave_icon.png';

const menuItems = [
  {
    image: homeImage,
    alt: "Attendance image",
    title: "Dashboard",
    route: '/Admin-Dashboard',
    children: []
  },
  // {
  //   image: teacherImage,
  //   alt: "Teacher image",
  //   title: "Teacher",
  //   route: '/Teacher-Dashboard',
  //   children: []
  // },
  {
    image: studentImage,
    alt: "img",
    title: "Students",
    children: [
      {
        text: 'All Students',
        route: '/Admin-Dashboard/Students'
      },
      {
        text: 'Admission Form',
        route: '/Admin-Dashboard/StudentsAddmissionForm'
      },
      {
        text: 'Students Promotion',
        route: '/Admin-Dashboard/StudentPromotion'
      },
      {
        text: 'Students Attendance',
        route: '/Admin-Dashboard/StudentAttendance'
      },
      {
        text: 'Students Result',
        route: '/Admin-Dashboard/StudentResult'
      },
      {
        text: 'Transfer Certificate',
        route: '/Admin-Dashboard/transfercertificate'
      },
      {
        text: 'Character Certificate',
        route: '/Admin-Dashboard/charactercetificate'
      },
    ]
  },
  {
    image: teacherAltImage,
    alt: "img",
    title: "Teachers",
    children: [
      {
        text: 'All Teachers',
        route: '/Admin-Dashboard/Teachers'
      },
      {
        text: 'Add New Teacher',
        route: '/Admin-Dashboard/AddTeachers'
      },
      {
        text: 'Teachers Sallery',
        route: '/Admin-Dashboard/TeachersSalary'
      },
      {
        text: 'Teachers Attendance',
        route: '/Admin-Dashboard/TeachersAttendance'
      },
    ]
  },
  {
    image: classImage,
    alt: "img",
    title: "Assign Class Teacher",
    route: '/Admin-Dashboard/Assignteacher',
    children: [
      // {
      //   text: 'Class Teachers',
      //   route: '/Admin-Dashboard/Classteacher'
      // },
      // {
      //   text: 'Assign Class Teacher',
      //   route: '/Admin-Dashboard/Assignteacher'
      // },
    ]
  },
  {
    image: subjectImage,
    alt: "img",
    title: "Subject Teacher",
    route: '/Admin-Dashboard/Assignsubject',
    children: []
  },
  // {
  //   image: parentImage,
  //   alt: "img",
  //   title: "Parents",
  //   children: [{
  //     text: 'All Parents',
  //     route: '/Admin-Dashboard/Parents/AllParents'
  //   },
  //   ]
  // },
  {
    image: libraryImage,
    alt: "img",
    title: "Library",
    children: [{
      text: 'All Books',
      route: '/Admin-Dashboard/Library/AllBooks'
    },
    ]
  },
  {
    image: accountImage,
    alt: "img",
    title: "Expenses",
    route: '/Admin-Dashboard/Account/Expenses',
    children: [
    //   {
    //   text: 'Teacher/Students',
    //   route: '/Admin-Dashboard/Account/TeacherStudents'
    // // },
    // {
    //   text: 'Expenses',
    //   route: '/Admin-Dashboard/Account/Expenses'
    // },
    ]
  },
  {
    image: examImage,
    alt: "img",
    title: "Exam",
    route: "/Admin-Dashboard/Exam",
    children: []
  },
  {
    image: transportImage,
    alt: "img",
    title: "Transport",
    route: "/Admin-Dashboard/Transport",
    children: []
  },
  {
    image: noticeImage,
    alt: "img",
    title: "Notice",
    route: "/Admin-Dashboard/Notice",
    children: []
  },
  // {
  //   image: messageImage,
  //   alt: "img",
  //   title: "Message",
  //   route: "/Admin-Dashboard/Message",
  //   children: []
  // },
  {
    image: leaveImage,
    alt: "img",
    title: "Leave",
    route: "/Admin-Dashboard/Leave",
    children: []
  },
];



export default menuItems;
