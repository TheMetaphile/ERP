import Dashboard from "./pages/Dashboard.jsx";
import React from "react";
import Home from "./components/Home/Home.jsx";
import AssignmentReport from "./components/assignment_report/assignmentReport.jsx";
import Fee from "./components/fees/fees.jsx";
import Border from "./components/event/border.jsx";
import Profile from "./components/profile/profile.jsx";
import Quiz from "./components/quiz/quiz.jsx";
import Receipt from "./components/receipt/receipt.jsx";
import Result from "./components/Subresult/Subresult.jsx";
import DateSheet from "./components/DateSheet/datesheet.jsx";
// import Palyquiz from "./components/playquiz/firstquizs.jsx";
import Attendance from "./components/Attendance/Attendance.jsx";
import TimeTable from "./components/TimeTable/Timetable.jsx";
import AskDoubt from "./components/askDoubt/Askdoubt.jsx";
import MyDoubts from './components/askDoubt/MyDoubts.jsx';
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
import HomeWork from "./components/homeWork/HomeWork.jsx";

import Route from './components/homeWork/route.jsx';
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
import TimeTableTeacher from "./TeacherComponents/timetable/TimeTable.jsx"
import BirthDay from "./TeacherComponents/birthday/BirthDay.jsx";
import All from "./TeacherComponents/birthday/utils/All.jsx"
import TeacherBirthDay from "./TeacherComponents/birthday/utils/Teacher.jsx"
import StudentBirthDay from "./TeacherComponents/birthday/utils/Student.jsx"
import StudentLeave from "./TeacherComponents/studentleave/StudentLeave.jsx";
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
import StudentDoubts from "./TeacherComponents/studentDoubt/StudentDoubts.jsx"
import NewDoubt from "./TeacherComponents/studentDoubt/utils/NewDoubt.jsx"
import Answered from "./TeacherComponents/studentDoubt/utils/Answered.jsx"
import ClassActivity from "./TeacherComponents/ClassActivity/ClassActivity.jsx";
import AllReportAdmin from "./AdminComponents/result/AllReportAdmin.jsx";
import ReportCardAdmin from "./AdminComponents/result/ReportCardAdmin.jsx";
import PerformanceProfileAdmin from "./AdminComponents/result/utils/performance/PerformanceProfileAdmin.jsx";
import UploadResult from "./TeacherComponents/UploadResult/UploadResult.jsx";
import TimeTableStudent from "./TeacherComponents/timeTableStudent/TimeTableStudent.jsx";
import TodayHomeWork from "./components/homeWork/TodayHomeWork.jsx";
import Appraisal from "./TeacherComponents/appraisal/Appraisal.jsx";
import UploadNotice from "./TeacherComponents/notice/utils/Upload.jsx";
import Apply from "./TeacherComponents/appraisal/utils/Apply.jsx";
import Applied from "./TeacherComponents/appraisal/utils/Applied.jsx";
import Employee from "./AdminComponents/Employee/Employee.jsx";
import Allcertificate from "./SubAdminComponent/Certificates/Allcertificate.jsx";
import Certificates from "./SubAdminComponent/Certificates/Certificates.jsx";
import Transfer from "./SubAdminComponent/Certificates/utils/Transfer.jsx";
import Character from "./SubAdminComponent/Certificates/utils/Character.jsx";
import SubAdminDashboard from "./SubAdminComponent/Dashboard.jsx";
import AllStudentsList from "./SubAdminComponent/AllStudents/AllStudentsList.jsx";
import AllStudentSubAdmin from "./SubAdminComponent/AllStudents/AllStudentSubAdmin.jsx";
import AllReportSubAdmin from "./SubAdminComponent/result/AllReportSubAdmin.jsx";
import ReportCardSubAdmin from "./SubAdminComponent/result/ReportCardSubAdmin.jsx";
import PerformanceProfileSubAdmin from "./SubAdminComponent/result/utils/performance/PerformanceProfileSubAdmin.jsx";
import Salary from "./SubAdminComponent/Salary/Salary.jsx";
import AllSalary from "./SubAdminComponent/Salary/AllSalary.jsx";
import StudentRegister from "./SubAdminComponent/Student/StudentRegister.jsx";
import TeacherRegister from "./SubAdminComponent/Teacher/TeacherRegister.jsx";
import Subresult from "./TeacherComponents/Subresult/Subresult.jsx";
import AllExReport from "./SubAdminComponent/result/ExReport/AllExReport.jsx";
import List from "./SubAdminComponent/result/ExReport/List.jsx";
import ExResult from "./SubAdminComponent/result/ExReport/utils/ExResult.jsx";
import AllNoteBookRecord from "./TeacherComponents/notebook/utils/AllNotebookRecord.jsx";
import NewNoteBookRecord from "./TeacherComponents/notebook/utils/NewNotebookRecord.jsx";
import RecordDetails from "./TeacherComponents/notebook/utils/Details.jsx";
import FeeSubAdmin from "./SubAdminComponent/SubAdminFee/FeeSubAdmin.jsx";
import FeeDetailsSubAdmin from "./SubAdminComponent/SubAdminFee/StudentFee/FeeDetailsSubAdmin.jsx";
import FeeStructureSubAdmin from "./SubAdminComponent/SubAdminFee/FeeStructure/FeeStructureSubAdmin.jsx";
import FeeDiscountSubAdmin from "./SubAdminComponent/SubAdminFee/Discount/FeeDiscountSubAdmin.jsx";
import Status from "./components/notebook/Status.jsx";
import Planner from "./TeacherComponents/Planner/Planner.jsx";
import StudentDetails from "./SubAdminComponent/SubAdminFee/StudentFee/utils/StudentDetails.jsx";
import AllExDetails from "./SubAdminComponent/SubAdminFee/StudentFee/AllDetails.jsx";
import FeeDetail from "./SubAdminComponent/SubAdminFee/StudentFee/utils/FeeDetail.jsx";
import NoticeSubAdmin from "./SubAdminComponent/notification/utils/NoticeSubAdmin.jsx";
import FeeDetailAdmin from "./AdminComponents/fee/StudentFee/utils/FeeDetailAdmin.jsx";
import AllDetailsAdmin from "./AdminComponents/fee/StudentFee/AllDetailsAdmin.jsx";
import Hod from "./TeacherComponents/HOD/Hod.jsx";
import NoteBookHOD from "./TeacherComponents/HOD/utils/notebook/NoteBookHOD.jsx";
import AllNoteBookRecordHOD from "./TeacherComponents/HOD/utils/notebook/utils/AllNotebookRecordHOD.jsx";
import NewNoteBookRecordHOD from "./TeacherComponents/HOD/utils/notebook/utils/NewNotebookRecordHOD.jsx";
import RecordDetailsHOD from "./TeacherComponents/HOD/utils/notebook/utils/Details.jsx";
import PlannerHOD from "./TeacherComponents/HOD/utils/Planner/Planner.jsx";
import ClassTeacherSubstitute from "./TeacherComponents/HOD/utils/ClassTeacherSubstitute/main.jsx";
import LectureSubstitute from "./TeacherComponents/HOD/utils/LectureSubstitute/main.jsx";
import Assigncoordinator from "./AdminComponents/Coordinator/Assigncoordinator.jsx";
import Substitutecoordinator from "./AdminComponents/SubstituteCoordinator/Substitutecoordinator.jsx";
import PlannerAdmin from "./AdminComponents/Planner/PlannerAdmin.jsx";
import AppraisalAdmin from "./AdminComponents/appraisal/AppraisalAdmin.jsx";
import ApplyAdmin from "./AdminComponents/appraisal/utils/ApplyAdmin.jsx";
import AppliedAdmin from "./AdminComponents/appraisal/utils/AppliedAdmin.jsx";
import NewAdmission from "./AdminComponents/New Admission/NewAdmission.jsx";
import Readmission from "./SubAdminComponent/Readmission/Readmission.jsx";
import AllAdmission from "./SubAdminComponent/Readmission/AllAdmission.jsx";
import TabsStudentFee from "./components/fees/Tabs.jsx";
// import Doubts from "./TeacherComponents/hoddoubts/Doubts.jsx";


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
        element: <TabsStudentFee />,
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
        element: <Receipt />,
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

          // {
          //   path: ':name',
          //   element: <SubjectClassWork />
          // }
        ]
      },
      {
        path: "/Student-Dashboard/homework",
        element: <Route />,
        children: [
          {
            path: '',
            element: <TodayHomeWork />
          },

          // {
          //   path: ':name',
          //   element: <SubjectHomeWork />
          // }
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
            element: <MyDoubts />
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
            element: <Archived />
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
        element: <Mediacal />,
      },
      {
        path: "/Student-Dashboard/homework",
        element: <HomeWork />,
      },
      {
        path: "/Student-Dashboard/notebook",
        element: <Status />,
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
    children: [
      {
        path: "",
        element: <AdminHome />,
      },
      {
        path: "/Admin-Dashboard/Students",
        element: <AllStudents />,
        children: [
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
        element: <AddmissionForm />,
        children: []
      },
      {
        path: "/Admin-Dashboard/StudentsFee",
        element: <FeeAdmin />,
        children: [
          {
            path: '/Admin-Dashboard/StudentsFee/details',
            element: <AllDetailsAdmin />,
            children: [
              {
                path: '',
                element: <FeeDetails />
              },
              {
                path: ':id',
                element: <FeeDetailAdmin />
              }
            ]
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
        element: <StudentAttendance />,
        children: []
      },
      {
        path: "/Admin-Dashboard/StudentPromotion",
        element: <StudentPromotion />,
        children: []
      },
      {
        path: "/Admin-Dashboard/Result",
        element: <AllReportAdmin />,
        children: [
          {
            path: '',
            element: <ReportCardAdmin />
          },
          {
            path: ':id',
            element: <Subresult />
          }
        ]
      },
      // {
      //   path: "/Admin-Dashboard/StudentResult",
      //   element: <StudentResult/>,
      //   children:[]
      // },
      {
        path: "/Admin-Dashboard/transfercertificate",
        element: <AllTC />,
        children: [
          {
            path: '',
            element: <TC />
          },
          {
            path: ':id',
            element: <Certificate />
          }
        ]
      },
      {
        path: "/Admin-Dashboard/charactercetificate",
        element: <AllCC />,
        children: [
          {
            path: '',
            element: <CC />
          },
          {
            path: ':id',
            element: <CharacterCertificate />
          }
        ]
      },
      {
        path: "/Admin-Dashboard/Assigncoordinator",
        element: <Assigncoordinator />,
        children: [],
      },
      {
        path: "/Admin-Dashboard/Substitutecoordinator",
        element: <Substitutecoordinator />,
        children: [],
      },
      // {
      //   path: "/Admin-Dashboard/Certificates",
      //   element: <Allcertificate />,
      //   children: [
      //     {
      //       path: '',
      //       element: <Certificates />
      //     },
      //     {
      //       path: ':tc',
      //       element: <Transfer />
      //     },
      //     {
      //       path: ':id',
      //       element: <Character />
      //     }
      //   ]
      // },
      {
        path: "/Admin-Dashboard/NewAdmission",
        element: <NewAdmission />,
        children: []
      },
      {
        path: "/Admin-Dashboard/Teachers",
        element: <AllTeachers />,
        children: []
      },
      {
        path: "/Admin-Dashboard/Teachers/Profile",
        element: <TeacherProfile />,
        children: []
      },
      {
        path: "/Admin-Dashboard/AddTeachers",
        element: <AddTeacher />,
        children: []
      },
      {
        path: "/Admin-Dashboard/TeachersAttendance",
        element: <TeacherAttendance />,
        children: []
      },
      {
        path: "/Admin-Dashboard/TeachersSalary",
        element: <TeachersSalary />,
        children: []
      },
      {
        path: "/Admin-Dashboard/Parents/AllParents",
        element: <AllParents />,
        children: []
      },
      {
        path: "/Admin-Dashboard/Parents/AllParents/Details",
        element: <ParentsDetails />,
        children: []
      },
      {
        path: "/Admin-Dashboard/Library/AllBooks",
        element: <AllBooks />,
        children: []
      },
      {
        path: "/Admin-Dashboard/StudentResult/Details",
        element: <ResultLayout />,
        children: []
      },
      {
        path: "/Admin-Dashboard/Transport",
        element: <Transport />,
        children: []
      },
      {
        path: "/Admin-Dashboard/Notice",
        element: <Notice />,
        children: []
      },
      {
        path: "/Admin-Dashboard/Leave",
        element: <Leaves />,
        children: []
      },
      {
        path: "/Admin-Dashboard/Classes",
        element: <Class />,
        children: []
      },
      {
        path: "/Admin-Dashboard/Classteacher",
        element: <ClassTeacher />,
        children: []
      },
      {
        path: "/Admin-Dashboard/Assignteacher",
        element: <AssignTeacher />,
        children: []
      },
      {
        path: "/Admin-Dashboard/Exam",
        element: <Exam />,
        children: []
      },
      {
        path: "/Admin-Dashboard/Message",
        element: <Message />,
        children: []
      },
      {
        path: "/Admin-Dashboard/Subjects",
        element: <Subject />,
        children: []
      },
      {
        path: "/Admin-Dashboard/Assignsubject",
        element: <AssignSubject />,
        children: []
      },
      {
        path: "/Admin-Dashboard/Account/Expenses",
        element: <Expenses />,
        children: []
      },
      {
        path: "/Admin-Dashboard/Account/TeacherStudents",
        element: <TeacherStudent />,
        children: []
      },
      {
        path: "/Admin-Dashboard/Employee",
        element: <Employee />,
        children: []
      },
      {
        path: "/Admin-Dashboard/timetable",
        element: <TimeTableAdmin />,
        children: [
        ]
      },
      {
        path: '/Admin-Dashboard/timetablestructure',
        element: <Upload />
      },
      {
        path: "/Admin-Dashboard/weekplan",
        element: <PlannerAdmin />,
      },
      {
        path: "/Admin-Dashboard/appraisal",
        element: <AppraisalAdmin />,
        children: [
          {
            path: '',
            element: <AppliedAdmin />
          },
          {
            path: ':id',
            element: <ApplyAdmin />
          }
        ]
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
    children: [
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
            path: '/Teacher-Dashboard/noticeboard/upload',
            element: <UploadNotice />
          },
          {
            path: '',
            element: <Teacher />
          },
        ]
      },
      {
        path: "/Teacher-Dashboard/checkin",
        element: <CheckIn />,
        children: []
      },
      {
        path: "/Teacher-Dashboard/classwork",
        element: <ClassWorkTeacher />,
        children: []
      },
      {
        path: "/Teacher-Dashboard/homework",
        element: <HomeWorkTeacher />,
        children: []
      },
      {
        path: "/Teacher-Dashboard/takeleave",
        element: <TakeLeave />,
        children: []
      },

      {
        path: "/Teacher-Dashboard/timetable",
        element: <TimeTableTeacher />,
        children: []
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
            element: <StudentBirthDay />
          },
        ]
      },
      {
        path: "/Teacher-Dashboard/appraisal",
        element: <Appraisal />,
        children: [
          {
            path: '/Teacher-Dashboard/appraisal/apply',
            element: <Apply />
          },
          {
            path: '/Teacher-Dashboard/appraisal/applied',
            element: <Applied />
          },
          {
            path: '',
            element: <Apply />
          },
        ]
      },
      {
        path: "/Teacher-Dashboard/studentdoubts",
        element: <StudentDoubts />,
        children: [
          {
            path: "new",
            element: <NewDoubt />
          },
          {
            path: "answered",
            element: <Answered />
          },
          {
            path: "",
            element: <NewDoubt />
          }
        ]
      },
      {
        path: "/Teacher-Dashboard/class_activity",
        element: <ClassActivity />,
        children: [
          {
            path: "",
            element: <TimeTableStudent />
          },
          {
            path: "/Teacher-Dashboard/class_activity/timetablestudent",
            element: <TimeTableStudent />,
            children: []
          },

          {
            path: "reportcard",
            element: <AllReport />,
            children: [
              {
                path: '',
                element: <ReportCard />
              },
              {
                path: ':id',
                element: <Subresult />
              }
            ]
          },


          {
            path: "/Teacher-Dashboard/class_activity/studentfee",
            element: <StudentFee />,
            children: []
          },
          {
            path: "/Teacher-Dashboard/class_activity/studentAttendence",
            element: <TeacherStudentAttendance />,
            children: []
          },
          {
            path: "/Teacher-Dashboard/class_activity/studentattendence/record",
            element: <StudentAttendanceRecord />,
            children: []
          },
          {
            path: "/Teacher-Dashboard/class_activity/studentleave",
            element: <StudentLeave />,
            children: []
          },
        ]
      },

      {
        path: "/Teacher-Dashboard/notebook",
        element: <NoteBook />,
        children: [
          {
            path: "",
            element: <AllNoteBookRecord />
          },
          {
            path: "All",
            element: <AllNoteBookRecord />
          },
          {
            path: "New",
            element: <NewNoteBookRecord />
          },

        ]
      },
      {
        path: "/Teacher-Dashboard/HOD",
        element: <Hod />,
        children: [
          {
            path: "",
            element: <PlannerHOD />
          },
          {
            path: "/Teacher-Dashboard/HOD/planner",
            element: <PlannerHOD />,
          },
          {
            path: "/Teacher-Dashboard/HOD/notebook",
            element: <NoteBookHOD />,
            children: []
          },
          {
            path: "/Teacher-Dashboard/HOD/notebook/details/:id",
            element: <RecordDetailsHOD />,
            children: []
          },
          {
            path: "/Teacher-Dashboard/HOD/classTeacherSubstitute",
            element: <ClassTeacherSubstitute />,
          },
          {
            path: "/Teacher-Dashboard/HOD/lectureSubstitute",
            element: <LectureSubstitute />,
          },
        ]
      },
      {
        path: "/Teacher-Dashboard/planner",
        element: <Planner />,
      },
      {
        path: "/Teacher-Dashboard/notebook/details/:id",
        element: <RecordDetails />,
        children: []
      },
      {
        path: "/Teacher-Dashboard/message",
        element: <TeacherMessage />,
        children: []
      },
      // {
      //   path: "/Teacher-Dashboard/SubResult",
      //   element: <Allsubresult />,
      //   children: [
      //     {
      //       path: '',
      //       element: <Subresult />
      //     },
      //     // {
      //     //   path: ':subject',
      //     //   element: <Quiz />
      //     // }
      //   ]
      // },
      {
        path: "/Teacher-Dashboard/uploadResult",
        element: <UploadResult />,
        children: []
      },
    ]
  },
  {
    path: "/Sub-Admin",
    element: (
      <SubAdminDashboard />
    ),
    children: [
      {
        path: '',
        element: <AllStudentsList />
      },
      {
        path: "/Sub-Admin/Certificates",
        element: <Allcertificate />,
        children: [
          {
            path: '',
            element: <Certificates />
          },
          {
            path: 'transfer/:tc/:class/:section/:session',
            element: <Transfer />
          },
          {
            path: 'character/:tc/:class/:section/:session',
            element: <Character />
          }
        ]
      },
      {
        path: "/Sub-Admin/Students",
        element: <AllStudentSubAdmin />,
        children: [
          {
            path: '',
            element: <AllStudentsList />
          },
          // {
          //   path: '/Sub-Admin/Students/studentdetails',
          //   element: <StudentDetailScreen />
          // },
        ]
      },
      {
        path: "/Sub-Admin/Readmission",
        element: <Readmission />,
        children: [
          {
            path: '',
            element: <AllAdmission />
          },
        ]
      },
      {
        path: "/Sub-Admin/Result",
        element: <AllReportSubAdmin />,
        children: [
          {
            path: '',
            element: <ReportCardSubAdmin />
          },
          {
            path: ':id',
            element: <Subresult />
          },
          {
            path: "exStudent",
            element: <AllExReport />,
            children: [
              {
                path: '',
                element: <List />
              },
              {
                path: ':id',
                element: <ExResult />
              }
            ]
          },
        ]
      },
      // {
      //   path: "/Sub-Admin/exStudent",
      //   element: <AllExReport />,
      //   children: [
      //     {
      //       path: '',
      //       element: <List />
      //     },
      //     {
      //       path: ':id',
      //       element: <ExResult />
      //     }
      //   ]
      // },

      {
        path: "/Sub-Admin/Salary",
        element: <AllSalary />,
        children: [
          {
            path: '',
            element: <Salary />
          },
          // {
          //   path: ':id',
          //   element: <PerformanceProfileSubAdmin />
          // }
        ]
      },
      {
        path: "/Sub-Admin/registerTeacher",
        element: <TeacherRegister />,
        children: []
      },
      {
        path: "/Sub-Admin/registerStudent",
        element: <StudentRegister />,
        children: []
      },
      {
        path: "/Sub-Admin/StudentsFee",
        element: <FeeSubAdmin />,
        children: [
          {
            path: '/Sub-Admin/StudentsFee/details',
            element: <AllExDetails />,
            children: [
              {
                path: '',
                element: <FeeDetailsSubAdmin />
              },
              {
                path: ':id',
                element: <FeeDetail />
              }
            ]
          },
          {
            path: '/Sub-Admin/StudentsFee/structure',
            element: <FeeStructureSubAdmin />
          },
          {
            path: '/Sub-Admin/StudentsFee/feediscount',
            element: <FeeDiscountSubAdmin />
          },
          {
            path: '',
            element: <FeeDetailsSubAdmin />
          },
        ]
      },
      {
        path: "/Sub-Admin/Notice",
        element: <NoticeSubAdmin />,
        children: []
      },
    ]
  }

]);

export default router;
