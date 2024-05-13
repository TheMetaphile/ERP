import Dashboard from "./pages/Dashboard.jsx";
import React from "react";
import Home from "./components/Home/Home.jsx";
import AssignmentReport from "./components/assignment_report/assignmentReport.jsx";
import Fee from "./components/fees/fees.jsx";
import Border from "./components/event/border.jsx";
import Profile from "./components/profile/profile.jsx";
import Quiz from "./components/quiz/quiz.jsx";
import Receipt from "./components/receipt/receipt.jsx";
import Result from "./components/Result/Result.jsx";
import DateSheet  from "./components/DateSheet/datesheet.jsx";
// import Palyquiz from "./components/playquiz/firstquizs.jsx";
import Attendance from "./components/Attendance/Attendance.jsx";
import TimeTable from "./components/TimeTable/Timetable.jsx";
import AskDoubt from "./components/askDoubt/Askdoubt.jsx";
import MyDoubts from './components/askDoubt/MyDoubts.jsx'
import SubjectClassWork from "./components/classWork/SubjectClassWork.jsx";
import ClassWork from "./components/classWork/route.jsx";
import TodayClassWork from "./components/classWork/TodayClassWork.jsx";
import Login from "./components/onBoarding/Login/Login.jsx";
import ResetPassword from "./components/onBoarding/ResetPassword/ResetPassword.jsx";
import SetNewPassword from "./components/onBoarding/SetNewPassword/SetNewPassword.jsx";
import AdminDashboard from './AdminComponents/Dashboard.jsx'
import AdminHome from "./AdminComponents/Home/Home.jsx";
import AllStudents from "./AdminComponents/Students/AllStudents/AllStudents.jsx";
import { createBrowserRouter } from "react-router-dom";
import StudentsList from "./AdminComponents/Students/AllStudents/utils/StudentsList.jsx";
import StudentDetailScreen from "./AdminComponents/Students/AllStudents/StudentsDeatils/StudentDetailScreen.jsx";
import AllDoubts from "./components/askDoubt/utils/AllDoubts.jsx";
import Notification from "./components/notification/Notification.jsx";
import AllNotification from "./components/notification/utils/AllNotification.jsx";
import Inbox from "./components/notification/utils/Inbox.jsx";
import Archived from "./components/notification/utils/Archived.jsx";
import Leave from "./components/leave/leave.jsx";
import AllTeachers from "./AdminComponents/Teachers/AllTeachers.jsx";
import TeacherProfile from "./AdminComponents/Teachers/utils/TeacherProfile.jsx";
import AddTeacher from "./AdminComponents/Teachers/AddTeacher.jsx";
import TeacherAttendance from "./AdminComponents/Teachers/TeacherAttendance.jsx";
import TeachersSalary from "./AdminComponents/Teachers/TeachersSalary.jsx";
import BroadCast from "./components/broadcast/broadcast.jsx"
import Activities from "./components/activities/Activities.jsx";
import RecentActivity from "./components/activities/utils/RecentActivity.jsx";
import AllActivity from "./components/activities/utils/AllActivity.jsx";
import Mediacal from "./components/medical/Medical.jsx";
import AddmissionForm from "./AdminComponents/Students/AllStudents/AddmissionForm.jsx";
import StudentPromotion from "./AdminComponents/Students/AllStudents/StudentPromotion.jsx";
import StudentAttendance from "./AdminComponents/Students/AllStudents/StudentAttendance.jsx";
import HomeWork from "./components/homeWork/HomeWork.jsx"
import SubjectHomeWork from "./components/homeWork/SubjectHomeWork.jsx"

import Route from './components/homeWork/route.jsx';
import StudentResult from "./AdminComponents/Students/AllStudents/StudentResult.jsx";
import AllParents from "./AdminComponents/Parents/AllParents.jsx";
import AllBooks from "./AdminComponents/Library/AllBooks.jsx";
import AddNewBook from "./AdminComponents/Library/AddNewBook.jsx";
import ResultLayout from "./AdminComponents/Students/AllStudents/utils/ResultLayout.jsx";
import ParentsDetails from "./AdminComponents/Parents/utils/ParentsDetails.jsx";
import Panel from "./components/quiz/Panel.jsx";
import QuizRoute from "./components/quiz/QuizRoute.jsx"
import Examination from "./components/exam/Examination.jsx"
import ExamRoute from "./components/exam/ExamRoute.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/resetpassword",
    element: <ResetPassword />,
  },
  {
    path: "/newPassword",
    element: <SetNewPassword />,
  },
  {
    path: "/Student-Dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/Student-Dashboard/home",
        element: <Home />,
      },
      {
        path: "/Student-Dashboard/assignment",
        element: <AssignmentReport />,
      },
      {
        path: "/Student-Dashboard/fee-due",
        element: <Fee />,
      },
      {
        path: "/Student-Dashboard/events",
        element: <Border />,
      },
      {
        path: "/Student-Dashboard/profile",
        element: <Profile />,
      },
      // {
      //   path: "/Student-Dashboard/playquiz",
      //   element: <Palyquiz/>,
      // },
      {
        path: "/Student-Dashboard/receipt",
        element: <Receipt/>,
      },
      {
        path: "/Student-Dashboard/quiz",
        element: <QuizRoute />,
        children: [
          {
            path: '',
            element: <Panel />
          },
          
          {
            path: ':subject',
            element: <Quiz />
          }
        ]
      },
      {
        path: "/Student-Dashboard/exam",
        element: <ExamRoute />,
        children: [
          {
            path: '',
            element: <Examination />
          },
          {
            path: ':subject',
            element: <Quiz />
          }
        ]
      },
      {
        path: "/Student-Dashboard/result",
        element: <Result />,
      },
      {
        path: "/Student-Dashboard/attendance",
        element: <Attendance />,
      },
      {
        path: "/Student-Dashboard/datesheet",
        element: <DateSheet />,
      },
      {
        path: "/Student-Dashboard/timetable",
        element: <TimeTable />,
      },
      {
        path: "/Student-Dashboard/classwork",
        element: <ClassWork />,
        children: [
          {
            path: '',
            element: <TodayClassWork />
          },
          
          {
            path: ':name',
            element: <SubjectClassWork />
          }
        ]
      },
      {
        path: "/Student-Dashboard/homework",
        element: <Route />,
        children: [
          {
            path: '',
            element: <HomeWork />
          },
          
          {
            path: ':name',
            element: <SubjectHomeWork />
          }
        ]
      },
      {
        path: "/Student-Dashboard/askdoubt",
        element: <AskDoubt />,
        children: [
          {
            path: '/Student-Dashboard/askdoubt/mydoubts',
            element: <MyDoubts />
          },
          {
            path: '/Student-Dashboard/askdoubt/alldoubt',
            element: <AllDoubts />
          },
          {
            path: '',
            element: <AllDoubts />
          }
        ]
      },
      {
        path: "/Student-Dashboard/notification",
        element: <Notification />,
        children: [
          {
            path: '/Student-Dashboard/notification/allnotification',
            element: <AllNotification />
          },
          {
            path: '/Student-Dashboard/notification/inbox',
            element: <Inbox />
          },
          {
            path: '/Student-Dashboard/notification/archived',
            element: <Archived/>
          },
          {
            path: '',
            element: <AllNotification />
          },
        ]
      },
      {
        path: "/Student-Dashboard/leave",
        element: <Leave />,
      },
      {
        path: "/Student-Dashboard/broadcast",
        element: <BroadCast />,
      },
      {
        path: "/Student-Dashboard/activities",
        element: <Activities />,
        children: [
          {
            path: '/Student-Dashboard/activities/recentactivity',
            element: <RecentActivity />
          },
          {
            path: '/Student-Dashboard/activities/allactivity',
            element: <AllActivity />
          },
          {
            path: '',
            element: <RecentActivity />
          },
        ]
      },
      {
        path: "/Student-Dashboard/medical",
        element: <Mediacal/>,
      },
      {
        path: "/Student-Dashboard/homework",
        element: <HomeWork />,
      },
    ],
  },
  {
    path: "/Admin-Dashboard",
    element: <AdminDashboard />,
    children:[
      {
        path: "",
        element: <AdminHome />,
      },
      {
        path: "/Admin-Dashboard/Students",
        element: <AllStudents />,
        children:[
          {
            path: '',
            element: <StudentsList />
          },
          {
            path: ':id',
            element: <StudentDetailScreen />
          }
        ]
      },
      {
        path: "/Admin-Dashboard/StudentsAddmissionForm",
        element: <AddmissionForm/>,
        children:[]
      },

      {
        path: "/Admin-Dashboard/StudentAttendance",
        element: <StudentAttendance/>,
        children:[]
      },
      {
        path: "/Admin-Dashboard/StudentPromotion",
        element: <StudentPromotion/>,
        children:[]
      },
      {
        path: "/Admin-Dashboard/StudentResult",
        element: <StudentResult/>,
        children:[]
      },

      {
        path: "/Admin-Dashboard/Teachers",
        element: <AllTeachers />,
        children:[]
      },
      {
        path: "/Admin-Dashboard/Teachers/Profile",
        element: <TeacherProfile />,
        children:[]
      },
      {
        path: "/Admin-Dashboard/AddTeachers",
        element: <AddTeacher />,
        children:[]
      },
      {
        path: "/Admin-Dashboard/TeachersAttendance",
        element: <TeacherAttendance />,
        children:[]
      },
      {
        path: "/Admin-Dashboard/TeachersSalary",
        element: <TeachersSalary />,
        children:[]
      },
      {
        path: "/Admin-Dashboard/Parents/AllParents",
        element: <AllParents />,
        children:[]
      },
      {
        path: "/Admin-Dashboard/Parents/AllParents/Details",
        element: <ParentsDetails />,
        children:[]
      },
      {
        path: "/Admin-Dashboard/Library/AllBooks",
        element: <AllBooks />,
        children:[]
      },
      {
        path: "/Admin-Dashboard/Library/AddNewBooks",
        element: <AddNewBook />,
        children:[]
      },
      {
        path: "/Admin-Dashboard/StudentResult/Details",
        element: <ResultLayout/>,
        children:[]
      },
    ]
  }
 
]);

export default router;