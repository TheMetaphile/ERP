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
import StudentAttendance from "./AdminComponents/Students/Students Attendance/StudentAttendance.jsx";
import HomeWork from "./components/homeWork/HomeWork.jsx"
import SubjectHomeWork from "./components/homeWork/SubjectHomeWork.jsx"

import Route from './components/homeWork/route.jsx';
import StudentResult from "./AdminComponents/Students/AllStudents/StudentResult.jsx";
import AllParents from "./AdminComponents/Parents/AllParents.jsx";
import AllBooks from "./AdminComponents/Library/AllBooks.jsx";
import ResultLayout from "./AdminComponents/Students/AllStudents/utils/ResultLayout.jsx";
import ParentsDetails from "./AdminComponents/Parents/utils/ParentsDetails.jsx";
import Panel from "./components/quiz/Panel.jsx";
import QuizRoute from "./components/quiz/QuizRoute.jsx"
import Examination from "./components/exam/Examination.jsx"
import ExamRoute from "./components/exam/ExamRoute.jsx";
import Gallery from "./components/gallery/Gallery.jsx"
import Transport from "./AdminComponents/Transport/Transport.jsx";
import Notice from "./AdminComponents/Notice/Notice.jsx";
import Leaves from "./AdminComponents/Leave/Leaves.jsx";
import Class from "./AdminComponents/Classes/Class.jsx";
import Exam from "./AdminComponents/Exam/Exam.jsx";
import Message from "./AdminComponents/Message/Message.jsx";
import Subject from "./AdminComponents/Subjects/Subject.jsx";
import Expenses from "./AdminComponents/Accounts/Expenses.jsx";
import TeacherStudent from "./AdminComponents/Accounts/TeacherStudent.jsx";
import PrivateRoute from "./components/PrivateRoutes.jsx";
import TeacherDashboard from './TeacherComponents/Dashboard.jsx'
import NoticeBoard from "./TeacherComponents/notice/NoticeBoard.jsx";
import AllNotice from "./TeacherComponents/notice/utils/AllNotice.jsx";
import Teacher from "./TeacherComponents/notice/utils/Teacher.jsx";
import Student from "./TeacherComponents/notice/utils/Student.jsx";
import CheckIn from "./TeacherComponents/checkin/CheckIn.jsx";
import ClassWorkTeacher from "./TeacherComponents/classwork/ClassWork.jsx"
import HomeWorkTeacher from "./TeacherComponents/homework/HomeWork.jsx"
import TeacherStudentAttendance from "./TeacherComponents/studentattendence/StudentAttendence.jsx";
import TakeLeave from "./TeacherComponents/takeleave/TakeLeave.jsx";
import ReportCard from "./TeacherComponents/reportcard/ReportCard.jsx";
import AllReport from "./TeacherComponents/reportcard/AllReport.jsx";
import Performance from "./TeacherComponents/reportcard/utils/performance/PerformanceProfile.jsx"
import TimeTableTeacher from "./TeacherComponents/timetable/TimeTable.jsx"
import BirthDay from "./TeacherComponents/birthday/BirthDay.jsx";
import All from "./TeacherComponents/birthday/utils/All.jsx"
import TeacherBirthDay from "./TeacherComponents/birthday/utils/Teacher.jsx"
import StudentBirthDay from "./TeacherComponents/birthday/utils/Student.jsx"
import StudentLeave from "./TeacherComponents/studentleave/StudentLeave.jsx";
import New from "./TeacherComponents/studentleave/utils/New.jsx"
import Approved from "./TeacherComponents/studentleave/utils/Approved.jsx";
import Rejected from "./TeacherComponents/studentleave/utils/Rejected.jsx";
import StudentFee from "./TeacherComponents/studentfee/StudentFee.jsx";
import NoteBook from "./TeacherComponents/notebook/NoteBook.jsx";
import TeacherMessage from "./TeacherComponents/message/Message.jsx"
import TeacherHome from "./TeacherComponents/Home/TeacherHome.jsx";
import TimeTableAdmin from "./AdminComponents/timetable/TimeTable.jsx"
import Upload from "./AdminComponents/timetable/utils/Upload.jsx";
import ClassTeacher from "./AdminComponents/Classes/utils/ClassTeacher.jsx";
import AssignTeacher from "./AdminComponents/Classes/utils/AssignTeacher.jsx";
import AssignSubject from "./AdminComponents/Subjects/utils/AssignSubject.jsx";
import StudentAttendanceRecord from "./TeacherComponents/studentattendence/Students Attendance/StudentAttendanceRecord.jsx";
import FeeAdmin from "./AdminComponents/fee/FeeAdmin.jsx";
import Event from "./AdminComponents/event/Event.jsx";
import AllTC from "./AdminComponents/Students/TransferCharacter/AllTC.jsx"
import TC from "./AdminComponents/Students/TransferCharacter/TC.jsx"
import CC from "./AdminComponents/Students/Character/CC.jsx"
import Certificate from "./AdminComponents/Students/TransferCharacter/utils/performance/Certificate.jsx";
import AllCC from "./AdminComponents/Students/Character/AllCC.jsx";
import CharacterCertificate from "./AdminComponents/Students/Character/utils/performance/CharacterCertificate.jsx";
import FeeDetails from "./AdminComponents/fee/StudentFee/FeeDetails.jsx"
import FeeStructure from "./AdminComponents/fee/FeeStructure/FeeStructure.jsx"
import FeeDiscount from "./AdminComponents/fee/Discount/FeeDiscount.jsx"

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
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
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
        path: "/Student-Dashboard/gallery",
        element: <Gallery />,
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
    element: (
    <PrivateRoute>
    <AdminDashboard />
    </PrivateRoute>
    ),
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
            path: '/Admin-Dashboard/Students/studentdetails',
            element: <StudentDetailScreen />
          },
        ]
      },
      {
        path: "/Admin-Dashboard/StudentsAddmissionForm",
        element: <AddmissionForm/>,
        children:[]
      },
      {
        path: "/Admin-Dashboard/StudentsFee",
        element: <FeeAdmin/>,
        children: [
          {
            path: '/Admin-Dashboard/StudentsFee/details',
            element: <FeeDetails />
          },
          {
            path: '/Admin-Dashboard/StudentsFee/structure',
            element: <FeeStructure />
          },
          {
            path: '/Admin-Dashboard/StudentsFee/feediscount',
            element: <FeeDiscount />
          },
          {
            path: '',
            element: <FeeDetails />
          },
        ]
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
        path: "/Admin-Dashboard/transfercertificate",
        element: <AllTC />,
        children:[
          {
            path: '',
            element: <TC />
          },
          {
            path: ':id',
            element: <Certificate/>
          }
        ]
      },
      {
        path: "/Admin-Dashboard/charactercetificate",
        element: <AllCC />,
        children:[
          {
            path: '',
            element: <CC />
          },
          {
            path: ':id',
            element: <CharacterCertificate/>
          }
        ]
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
        path: "/Admin-Dashboard/StudentResult/Details",
        element: <ResultLayout/>,
        children:[]
      },
      {
        path: "/Admin-Dashboard/Transport",
        element: <Transport/>,
        children:[]
      },
      {
        path: "/Admin-Dashboard/Notice",
        element: <Notice/>,
        children:[]
      },
      {
        path: "/Admin-Dashboard/Leave",
        element: <Leaves/>,
        children:[]
      },
      {
        path: "/Admin-Dashboard/Classes",
        element: <Class/>,
        children:[]
      },
      {
        path: "/Admin-Dashboard/Classteacher",
        element: <ClassTeacher/>,
        children:[]
      },
      {
        path: "/Admin-Dashboard/Assignteacher",
        element: <AssignTeacher/>,
        children:[]
      },
      {
        path: "/Admin-Dashboard/Exam",
        element: <Exam/>,
        children:[]
      },
      {
        path: "/Admin-Dashboard/Message",
        element: <Message/>,
        children:[]
      },
      {
        path: "/Admin-Dashboard/Subjects",
        element: <Subject/>,
        children:[]
      },
      {
        path: "/Admin-Dashboard/Assignsubject",
        element: <AssignSubject/>,
        children:[]
      },
      {
        path: "/Admin-Dashboard/Account/Expenses",
        element: <Expenses/>,
        children:[]
      },
      {
        path: "/Admin-Dashboard/Account/TeacherStudents",
        element: <TeacherStudent/>,
        children:[]
      },
      {
        path: "/Admin-Dashboard/timetable",
        element: <TimeTableAdmin/>,
        children:[ 
        ]
      },
      {
        path: '/Admin-Dashboard/timetablestructure',
            element: <Upload />
      },
      {
        path: '/Admin-Dashboard/Events',
            element: <Event />
      },
    ]
  },
  {
    path: "/Teacher-Dashboard",
    element: (
   
    <TeacherDashboard />
   
    ),
    children:[
      {
        path: "",
        element: <TeacherHome />,
      },
      {
        path: "/Teacher-Dashboard/noticeboard",
        element: <NoticeBoard />,
        children: [
          {
            path: '/Teacher-Dashboard/noticeboard/allnotice',
            element: <AllNotice />
          },
          {
            path: '/Teacher-Dashboard/noticeboard/teacher',
            element: <Teacher />
          },
          {
            path: '/Teacher-Dashboard/noticeboard/student',
            element: <Student />
          },
          {
            path: '',
            element: <AllNotice />
          },
        ]
      },
      {
        path: "/Teacher-Dashboard/checkin",
        element: <CheckIn/>,
        children:[]
      },
      {
        path: "/Teacher-Dashboard/classwork",
        element: <ClassWorkTeacher/>,
        children:[]
      },
      {
        path: "/Teacher-Dashboard/homework",
        element: <HomeWorkTeacher/>,
        children:[]
      },
      {
        path: "/Teacher-Dashboard/studentAttendence",
        element: <TeacherStudentAttendance/>,
        children:[]
      }, 
      {
        path: "/Teacher-Dashboard/studentattendence/record",
        element: <StudentAttendanceRecord/>,
        children:[]
      },
      {
        path: "/Teacher-Dashboard/takeleave",
        element: <TakeLeave/>,
        children:[]
      },
      {
        path: "/Teacher-Dashboard/reportcard",
        element: <AllReport/>,
        children:[
          {
            path: '',
            element: <ReportCard />
          },
          {
            path: ':id',
            element: <Performance />
          }
        ]
      },
      {
        path: "/Teacher-Dashboard/timetable",
        element: <TimeTableTeacher/>,
        children:[]
      },
      {
        path: "/Teacher-Dashboard/birthday",
        element: <BirthDay />,
        children: [
          {
            path: '/Teacher-Dashboard/birthday/all',
            element: <All />
          },
          {
            path: '/Teacher-Dashboard/birthday/teacher',
            element: <TeacherBirthDay />
          },
          {
            path: '/Teacher-Dashboard/birthday/student',
            element: <StudentBirthDay />
          },
          {
            path: '',
            element: <All />
          },
        ]
      },
      {
        path: "/Teacher-Dashboard/studentleave",
        element: <StudentLeave />,
        children: [
          {
            path: '/Teacher-Dashboard/studentleave/new',
            element: <New />
          },
          {
            path: '/Teacher-Dashboard/studentleave/approved',
            element: <Approved />
          },
          {
            path: '/Teacher-Dashboard/studentleave/rejected',
            element: <Rejected />
          },
          {
            path: '',
            element: <New/>
          },
        ]
      },
      {
        path: "/Teacher-Dashboard/studentfee",
        element: <StudentFee/>,
        children:[]
      },
      {
        path: "/Teacher-Dashboard/notebook",
        element: <NoteBook/>,
        children:[]
      },
      {
        path: "/Teacher-Dashboard/message",
        element: <TeacherMessage/>,
        children:[]
      },
    ]
  }
 
]);

export default router;
