const menuItems = [
  {
    image: "src/assets/home.png",
    alt: "Attendance image",
    title: "Dashboard",
    route: '/Admin-Dashboard',
    children: []
  },
  {
    image: "src/assets/teacher2.png",
    alt: "Teacher image",
    title: "Teacher",
    route: '/Teacher-Dashboard',
    children: []
  },
  {
    image: "src/assets/student.png",
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
    ]
  },
  {
    image: "src/assets/teacher.png",
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
    image: "src/assets/parent.png",
    alt: "img",
    title: "Parents",
    children: [{
      text: 'All Parents',
      route: '/Admin-Dashboard/Parents/AllParents'
    },
    ]
  },
  {
    image: "src/assets/library.png",
    alt: "img",
    title: "Library",
    children: [{
      text: 'All Books',
      route: '/Admin-Dashboard/Library/AllBooks'
    },
    ]
  },

  {
    image: "src/assets/account.png",
    alt: "img",
    title: "Account",
    children: [{
      text: 'Teacher/Students',
      route: '/Admin-Dashboard/Account/TeacherStudents'
    },
    {
      text: 'Expenses',
      route: '/Admin-Dashboard/Account/Expenses'
    },
    ]
  },

  {
    image: "src/assets/class.png",
    alt: "img",
    title: "class",
    children: [{
      text: 'All Classes',
      route: '/Admin-Dashboard/Classes'
    },
    {
      text: 'Class Teacher',
      route: '/Admin-Dashboard/Classteacher'
    },
    ]
  },

  {
    image: "src/assets/subject.png",
    alt: "img",
    title: "Subject",
    children: [{
      text: 'All Subjects',
      route: '/Admin-Dashboard/Subjects'
    },
    
    ]
  },

  {
    image: "src/assets/exam.png",
    alt: "img",
    title: "Exam",
    route:"/Admin-Dashboard/Exam",
    children: []
  },

  {
    image: "src/assets/transport.png",
    alt: "img",
    title: "Transport",
    route:"/Admin-Dashboard/Transport",
    children: []
  },

  {
    image: "src/assets/notice.png",
    alt: "img",
    title: "Notice",
    route:"/Admin-Dashboard/Notice",
    children: []
  },

  {
    image: "src/assets/message.png",
    alt: "img",
    title: "Message",
    route:"/Admin-Dashboard/Message",
    children: []
  },

  {
    image: "src/assets/leave_icon.png",
    alt: "img",
    title: "Leave",
    route:"/Admin-Dashboard/Leave",
    children: []
  },
];

export default menuItems;
