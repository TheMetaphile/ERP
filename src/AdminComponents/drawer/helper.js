const menuItems = [
  {
    image: "src/assets/home.png",
    alt: "Attendance image",
    title: "Dashboard",
    route: '/Admin-Dashboard',
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
        text: 'Add New Students',
        route: '/'
      },
      {
        text: 'Admission Form',
        route: '/'
      },
      {
        text: 'Students Promotion',
        route: '/'
      },
      {
        text: 'Students Attendance',
        route: '/'
      },
      {
        text: 'Students Result',
        route: '/'
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
        route: '/'
      },
      {
        text: 'Add New Teacher',
        route: '/'
      },
      {
        text: 'Teachers Sallery',
        route: '/'
      },
      {
        text: 'Teachers Attendance',
        route: '/'
      },
    ]
  },
  {
    image: "src/assets/parent.png",
    alt: "img",
    title: "Parents",
    children: [{
      text: 'All Parents',
      route: '/'
    },
    {
      text: 'Add New Parents',
      route: '/'
    },
    ]
  },
  {
    image: "src/assets/file.png",
    alt: "img",
    title: "File Manager",
    children: [{
      text: 'Calendar',
      route: '/'
    },
    {
      text: 'Activities',
      route: '/'
    },
    {
      text: 'Chat',
      route: '/'
    },
    {
      text: 'Gallery',
      route: '/'
    },
    {
      text: 'Documents',
      route: '/'
    },
    ]
  },

  {
    image: "src/assets/library.png",
    alt: "img",
    title: "Library",
    children: [{
      text: 'All Books',
      route: '/'
    },
    {
      text: 'Add New Books',
      route: '/'
    },
    ]
  },

  {
    image: "src/assets/account.png",
    alt: "img",
    title: "Account",
    children: [{
      text: 'Fees Coolection',
      route: '/'
    },
    {
      text: 'Expenses',
      route: '/'
    },
    {
      text: 'Add Expenses',
      route: '/'
    },
    {
      text: 'Budget',
      route: '/'
    },
    ]
  },

  {
    image: "src/assets/class.png",
    alt: "img",
    title: "class",
    children: [{
      text: 'All Classes',
      route: '/'
    },
    {
      text: 'Add New Class',
      route: '/'
    },
    {
      text: 'Class Routine',
      route: '/'
    },
    ]
  },

  {
    image: "src/assets/subject.png",
    alt: "img",
    title: "Subject",
    children: [{
      text: 'All Subjects',
      route: '/'
    },
    {
      text: 'Add New Subject',
      route: '/'
    },
    ]
  },

  {
    image: "src/assets/exam.png",
    alt: "img",
    title: "Exam",
    children: []
  },

  {
    image: "src/assets/transport.png",
    alt: "img",
    title: "Transport",
    children: []
  },

  {
    image: "src/assets/notice.png",
    alt: "img",
    title: "Notice",
    children: []
  },

  {
    image: "src/assets/message.png",
    alt: "img",
    title: "Message",
    children: []
  },

  {
    image: "src/assets/leave_icon.png",
    alt: "img",
    title: "Leave",
    children: []
  },
];

export default menuItems;
