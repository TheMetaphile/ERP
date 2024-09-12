import { createBrowserRouter } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import Loading from "./LoadingScreen/Loading.jsx";
import StudentCard from "./AdminComponents/StudentDetails.jsx";
import Studentdetailscard from "./TeacherComponents/studentattendence/Students Attendance/utils/studentdetailcard.jsx";

const AllPreviousDetailsAdmin = lazy(() => import("./AdminComponents/fee/PreviousFee/AllDetailsAdmin.jsx"));
const PreviousFeeDetailAdmin = lazy(() => import("./AdminComponents/fee/PreviousFee/utils/PreviousFeeDetailAdmin.jsx"));
const PreviousFeeDetailsAdmin = lazy(() => import("./AdminComponents/fee/PreviousFee/PreviousFeeDetails.jsx"));
const TeacherDashboardProfile = lazy(() => import("./TeacherComponents/profile/TeacherProfile.jsx"));
const AdminProfile = lazy(() => import("./AdminComponents/profile/AdminProfile.jsx"));
const AllPreviousDetails = lazy(() => import("./SubAdminComponent/SubAdminFee/PreviousFee/AllDetails.jsx"));
const PreviousFeeDetailsSubAdmin = lazy(() => import("./SubAdminComponent/SubAdminFee/PreviousFee/FeeDetailsSubAdmin.jsx"));
const PreviousFeeDetail = lazy(() => import("./SubAdminComponent/SubAdminFee/PreviousFee/utils/FeeDetail.jsx"));
const ProfileSubAdmin = lazy(() => import("./SubAdminComponent/profile/profileSubAdmin.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Home = lazy(() => import("./components/Home/Home.jsx"));
const AssignmentReport = lazy(() => import("./components/assignment_report/assignmentReport.jsx"));
const Border = lazy(() => import("./components/event/border.jsx"));
const Profile = lazy(() => import("./components/profile/profile.jsx"));
const Quiz = lazy(() => import("./components/quiz/quiz.jsx"));
const Receipt = lazy(() => import("./components/receipt/receipt.jsx"));
const Result = lazy(() => import("./components/Subresult/Subresult.jsx"));
const DateSheet = lazy(() => import("./components/DateSheet/datesheet.jsx"));
const Attendance = lazy(() => import("./components/Attendance/Attendance.jsx"));
const TimeTable = lazy(() => import("./components/TimeTable/Timetable.jsx"));
const AskDoubt = lazy(() => import("./components/askDoubt/Askdoubt.jsx"));
const MyDoubts = lazy(() => import("./components/askDoubt/MyDoubts.jsx"));
const ClassWork = lazy(() => import("./components/classWork/route.jsx"));
const TodayClassWork = lazy(() => import("./components/classWork/TodayClassWork.jsx"));
const Login = lazy(() => import("./components/onBoarding/Login/Login.jsx"));
const ResetPassword = lazy(() => import("./components/onBoarding/ResetPassword/ResetPassword.jsx"));
const SetNewPassword = lazy(() => import("./components/onBoarding/SetNewPassword/SetNewPassword.jsx"));
const AdminDashboard = lazy(() => import('./AdminComponents/Dashboard.jsx'));
const AdminHome = lazy(() => import("./AdminComponents/Home/Home.jsx"));
const AllStudents = lazy(() => import("./AdminComponents/Students/AllStudents/AllStudents.jsx"));
const StudentsList = lazy(() => import("./AdminComponents/Students/AllStudents/utils/StudentsList.jsx"));
const StudentDetailScreen = lazy(() => import("./AdminComponents/Students/AllStudents/StudentsDeatils/StudentDetailScreen.jsx"));
const AllDoubts = lazy(() => import("./components/askDoubt/utils/AllDoubts.jsx"));
const Notification = lazy(() => import("./components/notification/Notification.jsx"));
const AllNotification = lazy(() => import("./components/notification/utils/AllNotification.jsx"));
const Inbox = lazy(() => import("./components/notification/utils/Inbox.jsx"));
const Archived = lazy(() => import("./components/notification/utils/Archived.jsx"));
const Leave = lazy(() => import("./components/leave/leave.jsx"));
const AllTeachers = lazy(() => import("./AdminComponents/Teachers/AllTeachers.jsx"));
const TeacherProfile = lazy(() => import("./AdminComponents/Teachers/utils/TeacherProfile.jsx"));
const AddTeacher = lazy(() => import("./AdminComponents/Teachers/AddTeacher.jsx"));
const TeacherAttendance = lazy(() => import("./AdminComponents/Teachers/TeacherAttendance.jsx"));
const TeachersSalary = lazy(() => import("./AdminComponents/Teachers/TeachersSalary.jsx"));
const BroadCast = lazy(() => import("./components/broadcast/broadcast.jsx"));
const Activities = lazy(() => import("./components/activities/Activities.jsx"));
const RecentActivity = lazy(() => import("./components/activities/utils/RecentActivity.jsx"));
const AllActivity = lazy(() => import("./components/activities/utils/AllActivity.jsx"));
const Mediacal = lazy(() => import("./components/medical/Medical.jsx"));

const StudentPromotion = lazy(() => import("./AdminComponents/Students/AllStudents/StudentPromotion.jsx"));
const StudentAttendance = lazy(() => import("./AdminComponents/Students/Students Attendance/StudentAttendance.jsx"));
const HomeWork = lazy(() => import("./components/homeWork/HomeWork.jsx"));
const Route = lazy(() => import('./components/homeWork/route.jsx'));
const AllParents = lazy(() => import("./AdminComponents/Parents/AllParents.jsx"));
const AllBooks = lazy(() => import("./AdminComponents/Library/AllBooks.jsx"));
const ResultLayout = lazy(() => import("./AdminComponents/Students/AllStudents/utils/ResultLayout.jsx"));
const ParentsDetails = lazy(() => import("./AdminComponents/Parents/utils/ParentsDetails.jsx"));
const Panel = lazy(() => import("./components/quiz/Panel.jsx"));
const QuizRoute = lazy(() => import("./components/quiz/QuizRoute.jsx"));
const Examination = lazy(() => import("./components/exam/Examination.jsx"));
const ExamRoute = lazy(() => import("./components/exam/ExamRoute.jsx"));
const Gallery = lazy(() => import("./components/gallery/Gallery.jsx"));
const Transport = lazy(() => import("./AdminComponents/Transport/Transport.jsx"));
const Notice = lazy(() => import("./AdminComponents/Notice/Notice.jsx"));
const Leaves = lazy(() => import("./AdminComponents/Leave/Leaves.jsx"));
const Class = lazy(() => import("./AdminComponents/Classes/Class.jsx"));
const Exam = lazy(() => import("./AdminComponents/Exam/Exam.jsx"));
const Message = lazy(() => import("./AdminComponents/Message/Message.jsx"));
const Subject = lazy(() => import("./AdminComponents/Subjects/Subject.jsx"));
const Expenses = lazy(() => import("./AdminComponents/Accounts/Expenses.jsx"));
const TeacherStudent = lazy(() => import("./AdminComponents/Accounts/TeacherStudent.jsx"));
const PrivateRoute = lazy(() => import("./components/PrivateRoutes.jsx"));
const TeacherDashboard = lazy(() => import('./TeacherComponents/Dashboard.jsx'));
const NoticeBoard = lazy(() => import("./TeacherComponents/notice/NoticeBoard.jsx"));
// const AllNotice = lazy(() => import("./TeacherComponents/notice/utils/AllNotice.jsx"));
const Teacher = lazy(() => import("./TeacherComponents/notice/utils/Teacher.jsx"));
// const Student = lazy(() => import("./TeacherComponents/notice/utils/Student.jsx"));
const CheckIn = lazy(() => import("./TeacherComponents/checkin/CheckIn.jsx"));
const ClassWorkTeacher = lazy(() => import("./TeacherComponents/classwork/ClassWork.jsx"));
const HomeWorkTeacher = lazy(() => import("./TeacherComponents/homework/HomeWork.jsx"));
const TeacherStudentAttendance = lazy(() => import("./TeacherComponents/studentattendence/StudentAttendence.jsx"));
const TakeLeave = lazy(() => import("./TeacherComponents/takeleave/TakeLeave.jsx"));
const ReportCard = lazy(() => import("./TeacherComponents/reportcard/ReportCard.jsx"));
const AllReport = lazy(() => import("./TeacherComponents/reportcard/AllReport.jsx"));
const TimeTableTeacher = lazy(() => import("./TeacherComponents/timetable/TimeTable.jsx"));
const BirthDay = lazy(() => import("./TeacherComponents/birthday/BirthDay.jsx"));
const All = lazy(() => import("./TeacherComponents/birthday/utils/All.jsx"));
const TeacherBirthDay = lazy(() => import("./TeacherComponents/birthday/utils/Teacher.jsx"));
const StudentBirthDay = lazy(() => import("./TeacherComponents/birthday/utils/Student.jsx"));
const StudentLeave = lazy(() => import("./TeacherComponents/studentleave/StudentLeave.jsx"));
const StudentFee = lazy(() => import("./TeacherComponents/studentfee/StudentFee.jsx"));
const NoteBook = lazy(() => import("./TeacherComponents/notebook/NoteBook.jsx"));
const TeacherMessage = lazy(() => import("./TeacherComponents/message/Message.jsx"));
const TeacherHome = lazy(() => import("./TeacherComponents/Home/TeacherHome.jsx"));
const TimeTableAdmin = lazy(() => import("./AdminComponents/timetable/TimeTable.jsx"));
const Upload = lazy(() => import("./AdminComponents/timetable/utils/Upload/Upload.jsx"));
const ClassTeacher = lazy(() => import("./AdminComponents/Classes/utils/ClassTeacher.jsx"));
const AssignTeacher = lazy(() => import("./AdminComponents/Classes/utils/AssignTeacher.jsx"));
const AssignSubject = lazy(() => import("./AdminComponents/Subjects/utils/AssignSubject.jsx"));
const StudentAttendanceRecord = lazy(() => import("./TeacherComponents/studentattendence/Students Attendance/StudentAttendanceRecord.jsx"));
const FeeAdmin = lazy(() => import("./AdminComponents/fee/FeeAdmin.jsx"));
const Event = lazy(() => import("./AdminComponents/event/Event.jsx"));
const AllTC = lazy(() => import("./AdminComponents/Students/TransferCharacter/AllTC.jsx"));
const TC = lazy(() => import("./AdminComponents/Students/TransferCharacter/TC.jsx"));
const CC = lazy(() => import("./AdminComponents/Students/Character/CC.jsx"));
const Certificate = lazy(() => import("./AdminComponents/Students/TransferCharacter/utils/performance/Certificate.jsx"));
const AllCC = lazy(() => import("./AdminComponents/Students/Character/AllCC.jsx"));
const CharacterCertificate = lazy(() => import("./AdminComponents/Students/Character/utils/performance/CharacterCertificate.jsx"));
const FeeDetails = lazy(() => import("./AdminComponents/fee/StudentFee/FeeDetails.jsx"));
const FeeStructure = lazy(() => import("./AdminComponents/fee/FeeStructure/FeeStructure.jsx"));
const FeeDiscount = lazy(() => import("./AdminComponents/fee/Discount/FeeDiscount.jsx"));
const StudentDoubts = lazy(() => import("./TeacherComponents/studentDoubt/StudentDoubts.jsx"));
const NewDoubt = lazy(() => import("./TeacherComponents/studentDoubt/utils/NewDoubt.jsx"));
const Answered = lazy(() => import("./TeacherComponents/studentDoubt/utils/Answered.jsx"));
const ClassActivity = lazy(() => import("./TeacherComponents/ClassActivity/ClassActivity.jsx"));
const AllReportAdmin = lazy(() => import("./AdminComponents/result/AllReportAdmin.jsx"));
const ReportCardAdmin = lazy(() => import("./AdminComponents/result/ReportCardAdmin.jsx"));
const UploadResult = lazy(() => import("./TeacherComponents/UploadResult/UploadResult.jsx"));
const TimeTableStudent = lazy(() => import("./TeacherComponents/timeTableStudent/TimeTableStudent.jsx"));

const TodayHomeWork = lazy(() => import("./components/homeWork/TodayHomeWork.jsx"));
const Appraisal = lazy(() => import("./TeacherComponents/appraisal/Appraisal.jsx"));
const UploadNotice = lazy(() => import("./TeacherComponents/notice/utils/Upload.jsx"));
const Apply = lazy(() => import("./TeacherComponents/appraisal/utils/Apply.jsx"));
const Applied = lazy(() => import("./TeacherComponents/appraisal/utils/Applied.jsx"));
const Employee = lazy(() => import("./AdminComponents/Employee/Employee.jsx"));
const Allcertificate = lazy(() => import("./SubAdminComponent/Certificates/Allcertificate.jsx"));
const Certificates = lazy(() => import("./SubAdminComponent/Certificates/Certificates.jsx"));
const Transfer = lazy(() => import("./SubAdminComponent/Certificates/utils/Transfer.jsx"));
const Character = lazy(() => import("./SubAdminComponent/Certificates/utils/Character.jsx"));
const SubAdminDashboard = lazy(() => import("./SubAdminComponent/Dashboard.jsx"));
const AllStudentsList = lazy(() => import("./SubAdminComponent/AllStudents/AllStudentsList.jsx"));
const AllStudentSubAdmin = lazy(() => import("./SubAdminComponent/AllStudents/AllStudentSubAdmin.jsx"));
const AllReportSubAdmin = lazy(() => import("./SubAdminComponent/result/AllReportSubAdmin.jsx"));
const ReportCardSubAdmin = lazy(() => import("./SubAdminComponent/result/ReportCardSubAdmin.jsx"));
const Salary = lazy(() => import("./SubAdminComponent/Salary/Salary.jsx"));
const AllSalary = lazy(() => import("./SubAdminComponent/Salary/AllSalary.jsx"));
const StudentRegister = lazy(() => import("./SubAdminComponent/Student/StudentRegister.jsx"));
const TeacherRegister = lazy(() => import("./SubAdminComponent/Teacher/TeacherRegister.jsx"));
const Subresult = lazy(() => import("./TeacherComponents/Subresult/Subresult.jsx"));
const AllExReport = lazy(() => import("./SubAdminComponent/result/ExReport/AllExReport.jsx"));
const List = lazy(() => import("./SubAdminComponent/result/ExReport/List.jsx"));
const ExResult = lazy(() => import("./SubAdminComponent/result/ExReport/utils/ExResult.jsx"));
const AllNoteBookRecord = lazy(() => import("./TeacherComponents/notebook/utils/AllNotebookRecord.jsx"));
const NewNoteBookRecord = lazy(() => import("./TeacherComponents/notebook/utils/NewNotebookRecord.jsx"));
const RecordDetails = lazy(() => import("./TeacherComponents/notebook/utils/Details.jsx"));
const FeeSubAdmin = lazy(() => import("./SubAdminComponent/SubAdminFee/FeeSubAdmin.jsx"));
const FeeDetailsSubAdmin = lazy(() => import("./SubAdminComponent/SubAdminFee/StudentFee/FeeDetailsSubAdmin.jsx"));
const FeeStructureSubAdmin = lazy(() => import("./SubAdminComponent/SubAdminFee/FeeStructure/FeeStructureSubAdmin.jsx"));
const FeeDiscountSubAdmin = lazy(() => import("./SubAdminComponent/SubAdminFee/Discount/FeeDiscountSubAdmin.jsx"));
const Status = lazy(() => import("./components/notebook/Status.jsx"));
const Planner = lazy(() => import("./TeacherComponents/Planner/Planner.jsx"));
const AllExDetails = lazy(() => import("./SubAdminComponent/SubAdminFee/StudentFee/AllDetails.jsx"));
const FeeDetail = lazy(() => import("./SubAdminComponent/SubAdminFee/StudentFee/utils/FeeDetail.jsx"));
const NoticeSubAdmin = lazy(() => import("./SubAdminComponent/notification/utils/NoticeSubAdmin.jsx"));
const FeeDetailAdmin = lazy(() => import("./AdminComponents/fee/StudentFee/utils/FeeDetailAdmin.jsx"));
const AllDetailsAdmin = lazy(() => import("./AdminComponents/fee/StudentFee/AllDetailsAdmin.jsx"));
const Hod = lazy(() => import("./TeacherComponents/HOD/Hod.jsx"));
const NoteBookHOD = lazy(() => import("./TeacherComponents/HOD/utils/notebook/NoteBookHOD.jsx"));
const RecordDetailsHOD = lazy(() => import("./TeacherComponents/HOD/utils/notebook/utils/Details.jsx"));
const PlannerHOD = lazy(() => import("./TeacherComponents/HOD/utils/Planner/Planner.jsx"));
const ClassTeacherSubstitute = lazy(() => import("./TeacherComponents/HOD/utils/ClassTeacherSubstitute/main.jsx"));
const LectureSubstitute = lazy(() => import("./TeacherComponents/HOD/utils/LectureSubstitute/main.jsx"));
const Assigncoordinator = lazy(() => import("./AdminComponents/Coordinator/Assigncoordinator.jsx"));
const Substitutecoordinator = lazy(() => import("./AdminComponents/SubstituteCoordinator/Substitutecoordinator.jsx"));
const PlannerAdmin = lazy(() => import("./AdminComponents/Planner/PlannerAdmin.jsx"));
const AppraisalAdmin = lazy(() => import("./AdminComponents/appraisal/AppraisalAdmin.jsx"));
const ApplyAdmin = lazy(() => import("./AdminComponents/appraisal/utils/ApplyAdmin.jsx"));
const AppliedAdmin = lazy(() => import("./AdminComponents/appraisal/utils/AppliedAdmin.jsx"));
const NewAdmission = lazy(() => import("./AdminComponents/New Admission/NewAdmission.jsx"));
const Readmission = lazy(() => import("./SubAdminComponent/Readmission/Readmission.jsx"));
const AllAdmission = lazy(() => import("./SubAdminComponent/Readmission/AllAdmission.jsx"));
const TabsStudentFee = lazy(() => import("./components/fees/Tabs.jsx"));
const Promotion = lazy(() => import("./TeacherComponents/StudentPromotion/Promotion.jsx"));
const TeachersTimeTable = lazy(() => import("./AdminComponents/timetable/utils/Teacher/main.jsx"));
const StudentsTimeTable = lazy(() => import("./AdminComponents/timetable/utils/Student/main.jsx"));
const UserProfile = lazy(() => import("./components/StudentProfile/Profile.jsx"));
const TakeLeaveSubAdmin = lazy(() => import("./SubAdminComponent/takeleave/TakeLeaveSubAdmin.jsx"));





const router = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={Loading}>
      <Login /></Suspense>


    ,
  },
  {
    path: "/resetpassword",
    element: <Suspense fallback={Loading}><ResetPassword /></Suspense>
    ,
  },
  {
    path: "/newPassword",
    element: <Suspense fallback={Loading}>
      <SetNewPassword /></Suspense>,
  },
  {
    path: "/Student-Dashboard",
    element: (
      <PrivateRoute>
        <Suspense fallback={Loading}>
          <Dashboard /></Suspense>
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <Suspense fallback={Loading}>
          <Home /></Suspense>,
      },
      {
        path: "/Student-Dashboard/home",
        element: <Suspense fallback={Loading}>
          <Home /></Suspense>,
      },
      {
        path: "/Student-Dashboard/profile",
        element: <Suspense fallback={Loading}>
          <UserProfile /></Suspense>,
      },
      {
        path: "/Student-Dashboard/assignment",
        element: <Suspense fallback={Loading}>
          <AssignmentReport /></Suspense>,
      },
      {
        path: "/Student-Dashboard/fee-due",
        element: <Suspense fallback={Loading}>
          <TabsStudentFee /></Suspense>,
      },
      {
        path: "/Student-Dashboard/events",
        element: <Suspense fallback={Loading}>
          <Border /></Suspense>,
      },
      {
        path: "/Student-Dashboard/profile",
        element: <Suspense fallback={Loading}>
          <Profile /></Suspense>,
      },
      // {
      //   path: "/Student-Dashboard/playquiz",
      //   element: <Palyquiz/>,
      // },
      {
        path: "/Student-Dashboard/receipt",
        element: <Suspense fallback={Loading}>
          <Receipt /></Suspense>,
      },
      {
        path: "/Student-Dashboard/quiz",
        element: <Suspense fallback={Loading}><QuizRoute /></Suspense>,
        children: [
          {
            path: '',
            element: <Suspense fallback={Loading}>
              <Panel /></Suspense>
          },

          {
            path: ':subject',
            element: <Suspense fallback={Loading}>
              <Quiz /></Suspense>
          }
        ]
      },
      {
        path: "/Student-Dashboard/exam",
        element: <Suspense fallback={Loading}>
          <ExamRoute /></Suspense>,
        children: [
          {
            path: '',
            element: <Suspense fallback={Loading}>
              <Examination /></Suspense>
          },
          {
            path: ':subject',
            element: <Suspense fallback={Loading}>
              <Quiz /></Suspense>
          }
        ]
      },
      {
        path: "/Student-Dashboard/result",
        element: <Suspense fallback={Loading}>
          <Result /></Suspense>,
      },
      {
        path: "/Student-Dashboard/attendance",
        element: <Suspense fallback={Loading}>
          <Attendance /></Suspense>,
      },
      {
        path: "/Student-Dashboard/datesheet",
        element: <Suspense fallback={Loading}>
          <DateSheet /></Suspense>,
      },
      {
        path: "/Student-Dashboard/timetable",
        element: <Suspense fallback={Loading}>
          <TimeTable /></Suspense>,
      },
      {
        path: "/Student-Dashboard/classwork",
        element: <Suspense fallback={Loading}>
          <ClassWork /></Suspense>,
        children: [
          {
            path: '',
            element: <Suspense fallback={Loading}>
              <TodayClassWork /></Suspense>
          },

          // {
          //   path: ':name',
          //   element: <SubjectClassWork />
          // }
        ]
      },
      {
        path: "/Student-Dashboard/homework",
        element: <Suspense fallback={Loading}>
          <Route /></Suspense>,
        children: [
          {
            path: '',
            element: <Suspense fallback={Loading}>
              <TodayHomeWork /></Suspense>
          },

          // {
          //   path: ':name',
          //   element: <SubjectHomeWork />
          // }
        ]
      },
      {
        path: "/Student-Dashboard/askdoubt",
        element: <Suspense fallback={Loading}>
          <AskDoubt /></Suspense>,
        children: [
          {
            path: '/Student-Dashboard/askdoubt/mydoubts',
            element: <Suspense fallback={Loading}>
              <MyDoubts /></Suspense>
          },
          {
            path: '/Student-Dashboard/askdoubt/alldoubt',
            element: <Suspense fallback={Loading}>
              <AllDoubts /></Suspense>
          },
          {
            path: '',
            element: <Suspense fallback={Loading}>
              <MyDoubts /></Suspense>
          }
        ]
      },
      {
        path: "/Student-Dashboard/notification",
        element: <Suspense fallback={Loading}>
          <Notification /></Suspense>,
        children: [
          {
            path: '/Student-Dashboard/notification/allnotification',
            element: <Suspense fallback={Loading}>
              <AllNotification /></Suspense>
          },
          {
            path: '/Student-Dashboard/notification/inbox',
            element: <Suspense fallback={Loading}>
              <Inbox /></Suspense>
          },
          {
            path: '/Student-Dashboard/notification/archived',
            element: <Suspense fallback={Loading}>
              <Archived /></Suspense>
          },
          {
            path: '',
            element: <Suspense fallback={Loading}>
              <AllNotification /></Suspense>
          },
        ]
      },
      {
        path: "/Student-Dashboard/leave",
        element: <Suspense fallback={Loading}>
          <Leave /></Suspense>,
      },
      {
        path: "/Student-Dashboard/gallery",
        element: <Suspense fallback={Loading}>
          <Gallery /></Suspense>,
      },
      {
        path: "/Student-Dashboard/broadcast",
        element: <Suspense fallback={Loading}>
          <BroadCast /></Suspense>,
      },
      {
        path: "/Student-Dashboard/activities",
        element: <Suspense fallback={Loading}>
          <Activities /></Suspense>,
        children: [
          {
            path: '/Student-Dashboard/activities/recentactivity',
            element: <Suspense fallback={Loading}>
              <RecentActivity /></Suspense>
          },
          {
            path: '/Student-Dashboard/activities/allactivity',
            element: <Suspense fallback={Loading}>
              <AllActivity /></Suspense>
          },
          {
            path: '',
            element: <Suspense fallback={Loading}>
              <RecentActivity /></Suspense>
          },
        ]
      },
      {
        path: "/Student-Dashboard/medical",
        element: <Suspense fallback={Loading}>
          <Mediacal /></Suspense>,
      },
      {
        path: "/Student-Dashboard/homework",
        element: <Suspense fallback={Loading}>
          <HomeWork /></Suspense>,
      },
      {
        path: "/Student-Dashboard/notebook",
        element: <Suspense fallback={Loading}>
          <Status /></Suspense>,
      },
    ],
  },
  {
    path: "/Admin-Dashboard",
    element: (
      <PrivateRoute>
        <Suspense fallback={Loading}>
          <AdminDashboard />
        </Suspense>
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <Suspense fallback={Loading}>
          <AdminHome /></Suspense>,
      },
      {
        path: '/Admin-Dashboard/Profile',
        element: <Suspense fallback={Loading}>
          <AdminProfile /></Suspense>
      },
      {
        path: "/Admin-Dashboard/Students",
        element: <Suspense fallback={Loading}>
          <AllStudents /></Suspense>,
        children: [
          {
            path: '',
            element: <Suspense fallback={Loading}>
              <StudentsList /></Suspense>
          },
          {
            path: '/Admin-Dashboard/Students/studentdetails',
            element: <Suspense fallback={Loading}>
              <StudentDetailScreen /></Suspense>
          },
        ]
      },
      {
        path: "/Admin-Dashboard/StudentsAddmissionForm",
        element: <Suspense fallback={Loading}>
          <StudentRegister /></Suspense>,
        children: []
      },
      {
        path: "/Admin-Dashboard/StudentsFee",
        element: <Suspense fallback={Loading}>
          <FeeAdmin /></Suspense>,
        children: [
          {
            path: '/Admin-Dashboard/StudentsFee/details',
            element: <Suspense fallback={Loading}>
              <AllDetailsAdmin /></Suspense>,
            children: [
              {
                path: '',
                element: <Suspense fallback={Loading}>
                  <FeeDetails /></Suspense>
              },
              {
                path: ':email',
                element: <Suspense fallback={Loading}><FeeDetailAdmin /></Suspense>
              }
            ]
          },
          {
            path: '/Admin-Dashboard/StudentsFee/structure',
            element: <Suspense fallback={Loading}>
              <FeeStructure /></Suspense>
          },
          {
            path: '/Admin-Dashboard/StudentsFee/feediscount',
            element: <Suspense fallback={Loading}>
              <FeeDiscount /></Suspense>
          },
          {
            path: '',
            element: <Suspense fallback={Loading}>
              <FeeDetails /></Suspense>
          },
          {
            path: '/Admin-Dashboard/StudentsFee/PreviousFee',
            element: <Suspense fallback={Loading}>
              <AllPreviousDetailsAdmin /></Suspense>,
            children: [
              {
                path: '',
                element: <Suspense fallback={Loading}>
                  <PreviousFeeDetailsAdmin /></Suspense>
              },
              {
                path: ':email',
                element: <Suspense fallback={Loading}><PreviousFeeDetailAdmin /></Suspense>
              }
            ]
          }
        ]
      },

      {
        path: "/Admin-Dashboard/StudentAttendance",
        element: <Suspense fallback={Loading}>
          <StudentAttendance /></Suspense>,
        children: []
      },
      {
        path: "/Admin-Dashboard/StudentPromotion",
        element: <Suspense fallback={Loading}>
          <StudentPromotion /></Suspense>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Result",
        element: <Suspense fallback={Loading}>
          <AllReportAdmin /></Suspense>,
        children: [
          {
            path: '',
            element: <Suspense fallback={Loading}>
              <ReportCardAdmin /></Suspense>
          },
          {
            path: ':id',
            element: <Suspense fallback={Loading}>
              <Subresult /></Suspense>
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
        element: <Suspense fallback={Loading}>
          <AllTC /></Suspense>,
        children: [
          {
            path: '',
            element: <Suspense fallback={Loading}>
              <TC /></Suspense>
          },
          {
            path: ':id',
            element: <Suspense fallback={Loading}>
              <Certificate /></Suspense>
          }
        ]
      },
      {
        path: "/Admin-Dashboard/charactercetificate",
        element: <Suspense fallback={Loading}>
          <AllCC /></Suspense>,
        children: [
          {
            path: '',
            element: <Suspense fallback={Loading}>
              <CC /></Suspense>
          },
          {
            path: ':id',
            element: <Suspense fallback={Loading}>
              <CharacterCertificate /></Suspense>
          }
        ]
      },
      {
        path: "/Admin-Dashboard/Assigncoordinator",
        element: <Suspense fallback={Loading}>
          <Assigncoordinator /></Suspense>,
        children: [],
      },
      {
        path: "/Admin-Dashboard/Substitutecoordinator",
        element: <Suspense fallback={Loading}>
          <Substitutecoordinator /></Suspense>,
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
        element: <Suspense fallback={Loading}>
          <NewAdmission /></Suspense>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Teachers",
        element: <Suspense fallback={Loading}>
          <AllTeachers /></Suspense>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Teachers/Profile",
        element: <Suspense fallback={Loading}>
          <TeacherProfile /></Suspense>,
        children: []
      },
      {
        path: "/Admin-Dashboard/AddTeachers",
        element: <Suspense fallback={Loading}>
          <TeacherRegister /></Suspense>,
        children: []
      },
      {
        path: "/Admin-Dashboard/TeachersAttendance",
        element: <Suspense fallback={Loading}>
          <TeacherAttendance /></Suspense>,
        children: []
      },
      {
        path: "/Admin-Dashboard/TeachersSalary",
        element: <Suspense fallback={Loading}>
          <TeachersSalary /></Suspense>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Parents/AllParents",
        element: <Suspense fallback={Loading}>
          <AllParents /></Suspense>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Parents/AllParents/Details",
        element: <Suspense fallback={Loading}>
          <ParentsDetails /></Suspense>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Library/AllBooks",
        element: <Suspense fallback={Loading}>
          <AllBooks /></Suspense>,
        children: []
      },
      {
        path: "/Admin-Dashboard/StudentResult/Details",
        element: <Suspense fallback={Loading}>
          <ResultLayout /></Suspense>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Transport",
        element: <Suspense fallback={Loading}>
          <Transport /></Suspense>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Notice",
        element: <Suspense fallback={Loading}>
          <Notice /></Suspense>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Leave",
        element: <Suspense fallback={Loading}><Leaves /></Suspense>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Classes",
        element: <Suspense fallback={Loading}>
          <Class /></Suspense>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Classteacher",
        element: <Suspense fallback={Loading}>
          <ClassTeacher /></Suspense>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Assignteacher",
        element: <Suspense fallback={Loading}>
          <AssignTeacher /></Suspense>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Exam",
        element: <Suspense fallback={Loading}>
          <Exam /></Suspense>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Message",
        element: <Suspense fallback={Loading}>
          <Message /></Suspense>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Subjects",
        element: <Suspense fallback={Loading}>
          <Subject /></Suspense>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Assignsubject",
        element: <Suspense fallback={Loading}>
          <AssignSubject /></Suspense>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Account/Expenses",
        element: <Suspense fallback={Loading}>
          <Expenses /></Suspense>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Account/TeacherStudents",
        element: <Suspense fallback={Loading}>
          <TeacherStudent /></Suspense>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Employee",
        element: <Suspense fallback={Loading}>
          <Employee /></Suspense>,
        children: []
      },
      {
        path: "/Admin-Dashboard/timetable",
        element: <Suspense fallback={Loading}>
          <TimeTableAdmin /></Suspense>,
        children: [
          {
            path: "",
            element: <Suspense fallback={Loading}>
              <StudentsTimeTable /></Suspense>,
            children: []
          },
          {
            path: "timetablestructure",
            element: <Suspense fallback={Loading}><Employee /></Suspense>,
            children: []
          },
          {
            path: "upload",
            element: <Suspense fallback={Loading}>
              <Upload /></Suspense>,
            children: []
          },
          {
            path: "teacher",
            element: <Suspense fallback={Loading}>
              <TeachersTimeTable /></Suspense>,
            children: []
          },
          {
            path: "student",
            element: <Suspense fallback={Loading}>
              <StudentsTimeTable /></Suspense>,
            children: []
          },
        ]
      },
      {
        path: "/Admin-Dashboard/weekplan",
        element: <Suspense fallback={Loading}>
          <PlannerAdmin /></Suspense>,
      },
      {
        path: "/Admin-Dashboard/appraisal",
        element: <Suspense fallback={Loading}>
          <AppraisalAdmin /></Suspense>,
        children: [
          {
            path: '',
            element: <Suspense fallback={Loading}>
              <AppliedAdmin /></Suspense>
          },
          {
            path: ':id',
            element: <Suspense fallback={Loading}>
              <ApplyAdmin /></Suspense>
          }
        ]
      },
      {
        path: '/Admin-Dashboard/Events',
        element: <Suspense fallback={Loading}>
          <Event /></Suspense>
      },
    ]
  },
  {
    path: "/Teacher-Dashboard",
    element: (

      <Suspense fallback={Loading}>
        <TeacherDashboard /></Suspense>

    ),
    children: [
      {
        path: "",
        element: <Suspense fallback={Loading}>
          <TeacherHome /></Suspense>,
      },
      {
        path: '/Teacher-Dashboard/Profile',
        element: <Suspense fallback={Loading}>
          <TeacherDashboardProfile /></Suspense>
      },
      {
        path: "/Teacher-Dashboard/noticeboard",
        element: <Suspense fallback={Loading}><NoticeBoard /></Suspense>,
        children: [
          // {
          //   path: '/Teacher-Dashboard/noticeboard/allnotice',
          //   element: <Suspense fallback={Loading}>
          //     <AllNotice /></Suspense>
          // },
          {
            path: '/Teacher-Dashboard/noticeboard/teacher',
            element: <Suspense fallback={Loading}>
              <Teacher /></Suspense>
          },
          // {
          //   path: '/Teacher-Dashboard/noticeboard/student',
          //   element: <Suspense fallback={Loading}>
          //     <Student /></Suspense>
          // },
          {
            path: '/Teacher-Dashboard/noticeboard/upload',
            element: <Suspense fallback={Loading}>
              <UploadNotice /></Suspense>
          },
          {
            path: '',
            element: <Suspense fallback={Loading}>
              <Teacher /></Suspense>
          },
        ]
      },
      {
        path: "/Teacher-Dashboard/checkin",
        element: <Suspense fallback={Loading}>
          <CheckIn /></Suspense>,
        children: []
      },
      {
        path: "/Teacher-Dashboard/classwork",
        element: <Suspense fallback={Loading}>
          <ClassWorkTeacher /></Suspense>,
        children: []
      },
      {
        path: "/Teacher-Dashboard/homework",
        element: <Suspense fallback={Loading}>
          <HomeWorkTeacher /></Suspense>,
        children: []
      },
      {
        path: "/Teacher-Dashboard/takeleave",
        element: <Suspense fallback={Loading}>
          <TakeLeave /></Suspense>,
        children: []
      },

      {
        path: "/Teacher-Dashboard/timetable",
        element: <Suspense fallback={Loading}>
          <TimeTableTeacher /></Suspense>,
        children: []
      },
      {
        path: "/Teacher-Dashboard/birthday",
        element: <Suspense fallback={Loading}>
          <BirthDay /></Suspense>,
        children: [
          {
            path: '/Teacher-Dashboard/birthday/all',
            element: <Suspense fallback={Loading}>
              <All /></Suspense>
          },
          {
            path: '/Teacher-Dashboard/birthday/teacher',
            element: <Suspense fallback={Loading}>
              <TeacherBirthDay /></Suspense>
          },
          {
            path: '/Teacher-Dashboard/birthday/student',
            element: <Suspense fallback={Loading}>
              <StudentBirthDay /></Suspense>
          },
          {
            path: '',
            element: <Suspense fallback={Loading}><StudentBirthDay /></Suspense>
          },
        ]
      },
      {
        path: "/Teacher-Dashboard/appraisal",
        element: <Suspense fallback={Loading}>
          <Appraisal /></Suspense>,
        children: [
          {
            path: '/Teacher-Dashboard/appraisal/apply',
            element: <Suspense fallback={Loading}>
              <Apply /></Suspense>
          },
          {
            path: '/Teacher-Dashboard/appraisal/applied',
            element: <Suspense fallback={Loading}>
              <Applied /></Suspense>
          },
          {
            path: '',
            element: <Suspense fallback={Loading}>
              <Apply /></Suspense>
          },
        ]
      },
      {
        path: "/Teacher-Dashboard/studentdoubts",
        element: <Suspense fallback={Loading}>
          <StudentDoubts /></Suspense>,
        children: [
          {
            path: "new",
            element: <Suspense fallback={Loading}>
              <NewDoubt /></Suspense>
          },
          {
            path: "answered",
            element: <Suspense fallback={Loading}>
              <Answered /></Suspense>
          },
          {
            path: "",
            element: <Suspense fallback={Loading}>
              <NewDoubt /></Suspense>
          }
        ]
      },
      {
        path: "/Teacher-Dashboard/class_activity",
        element: <Suspense fallback={Loading}>
          <ClassActivity /></Suspense>,

        children: [
          {
            path: "",
            element: <Suspense fallback={Loading}>
              <TimeTableStudent /></Suspense>,
            children: []
          },
          {
            path: "/Teacher-Dashboard/class_activity/details",
            element: <Suspense fallback={Loading}>
              <Studentdetailscard /></Suspense>,
            children: [
              {
                path: ':email',
                element: <Suspense fallback={Loading}><Studentdetailscard /></Suspense>
              }
            ]
          },
          {
            path: "/Teacher-Dashboard/class_activity/timetablestudent",
            element: <Suspense fallback={Loading}>
              <TimeTableStudent /></Suspense>,
            children: []
          },
          {
            path: "reportcard",
            element: <Suspense fallback={Loading}>
              <AllReport /></Suspense>,
            children: [
              {
                path: '',
                element: <Suspense fallback={Loading}>
                  <ReportCard /></Suspense>
              },
              {
                path: ':id',
                element: <Suspense fallback={Loading}>
                  <Subresult /></Suspense>
              }
            ]
          },
          {
            path: "/Teacher-Dashboard/class_activity/studentfee",
            element: <Suspense fallback={Loading}>
              <StudentFee /></Suspense>,
            children: []
          },
          {
            path: "/Teacher-Dashboard/class_activity/studentAttendence",
            element: <Suspense fallback={Loading}>
              <TeacherStudentAttendance /></Suspense>,
            children: []
          },
          {
            path: "/Teacher-Dashboard/class_activity/studentattendence/record",
            element: <Suspense fallback={Loading}>
              <StudentAttendanceRecord /></Suspense>,
            children: []
          },
          {
            path: "/Teacher-Dashboard/class_activity/studentleave",
            element: <Suspense fallback={Loading}>
              <StudentLeave /></Suspense>,
            children: []
          },
          {
            path: "/Teacher-Dashboard/class_activity/studentPromotion",
            element: <Suspense fallback={Loading}>
              <Promotion /></Suspense>,
            children: []
          },
        ]
      },

      {
        path: "/Teacher-Dashboard/notebook",
        element: <Suspense fallback={Loading}>
          <NoteBook /></Suspense>,
        children: [
          {
            path: "",
            element: <Suspense fallback={Loading}>
              <AllNoteBookRecord /></Suspense>
          },
          {
            path: "All",
            element: <Suspense fallback={Loading}>
              <AllNoteBookRecord /></Suspense>
          },
          {
            path: "New",
            element: <Suspense fallback={Loading}>
              <NewNoteBookRecord /></Suspense>
          },

        ]
      },
      {
        path: "/Teacher-Dashboard/HOD",
        element: <Suspense fallback={Loading}>
          <Hod /></Suspense>,
        children: [
          {
            path: "",
            element: <Suspense fallback={Loading}>
              <PlannerHOD /></Suspense>
          },
          {
            path: "/Teacher-Dashboard/HOD/planner",
            element: <Suspense fallback={Loading}>
              <PlannerHOD /></Suspense>,
          },
          {
            path: "/Teacher-Dashboard/HOD/notebook",
            element: <Suspense fallback={Loading}>
              <NoteBookHOD /></Suspense>,
            children: []
          },
          {
            path: "/Teacher-Dashboard/HOD/notebook/details/:id",
            element: <Suspense fallback={Loading}>
              <RecordDetailsHOD /></Suspense>,
            children: []
          },
          {
            path: "/Teacher-Dashboard/HOD/classTeacherSubstitute",
            element: <Suspense fallback={Loading}>
              <ClassTeacherSubstitute /></Suspense>,
          },
          {
            path: "/Teacher-Dashboard/HOD/lectureSubstitute",
            element: <Suspense fallback={Loading}>
              <LectureSubstitute /></Suspense>,
          },
        ]
      },
      {
        path: "/Teacher-Dashboard/planner",
        element: <Suspense fallback={Loading}>
          <Planner /></Suspense>,
      },
      {
        path: "/Teacher-Dashboard/notebook/details/:id",
        element: <Suspense fallback={Loading}>
          <RecordDetails /></Suspense>,
        children: []
      },
      {
        path: "/Teacher-Dashboard/message",
        element: <Suspense fallback={Loading}>
          <TeacherMessage /></Suspense>,
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
        element: <Suspense fallback={Loading}>
          <UploadResult /></Suspense>,
        children: []
      },
    ]
  },
  {
    path: "/Sub-Admin",
    element: (
      <Suspense fallback={Loading}> <SubAdminDashboard /></Suspense>
    ),
    children: [
      {
        path: '',
        element: <Suspense fallback={Loading}>
          <AllStudentsList /></Suspense>
      },
      {
        path: 'Profile',
        element: <Suspense fallback={Loading}>
          <ProfileSubAdmin /></Suspense>
      },
      {
        path: "/Sub-Admin/Certificates",
        element: <Suspense fallback={Loading}>
          <Allcertificate /></Suspense>,
        children: [
          {
            path: '',
            element: <Suspense fallback={Loading}>
              <Certificates /></Suspense>
          },
          {
            path: 'transfer/:tc/:class/:section/:session',
            element: <Suspense fallback={Loading}>
              <Transfer /></Suspense>
          },
          {
            path: 'character/:tc/:class/:section/:session',
            element: <Suspense fallback={Loading}>
              <Character /></Suspense>
          }
        ]
      },
      {
        path: "/Sub-Admin/Students",
        element: <Suspense fallback={Loading}>
          <AllStudentSubAdmin /></Suspense>,
        children: [
          {
            path: '',
            element: <Suspense fallback={Loading}>
              <AllStudentsList /></Suspense>
          },
          // {
          //   path: '/Sub-Admin/Students/studentdetails',
          //   element: <StudentDetailScreen />
          // },
        ]
      },
      {
        path: "/Sub-Admin/Readmission",
        element: <Suspense fallback={Loading}>
          <Readmission /></Suspense>,
        children: [
          {
            path: '',
            element: <Suspense fallback={Loading}>
              <AllAdmission /></Suspense>
          },
        ]
      },
      {
        path: "/Sub-Admin/Result",
        element: <Suspense fallback={Loading}>
          <AllReportSubAdmin /></Suspense>,
        children: [
          {
            path: '',
            element: <Suspense fallback={Loading}>
              <ReportCardSubAdmin /></Suspense>
          },
          {
            path: ':id',
            element: <Suspense fallback={Loading}>
              <Subresult /></Suspense>
          },
          {
            path: "exStudent",
            element: <Suspense fallback={Loading}>
              <AllExReport /></Suspense>,
            children: [
              {
                path: '',
                element: <Suspense fallback={Loading}>
                  <List /></Suspense>
              },
              {
                path: ':id',
                element: <Suspense fallback={Loading}>
                  <ExResult /></Suspense>
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
        element: <Suspense fallback={Loading}>
          <AllSalary /></Suspense>,
        children: [
          {
            path: '',
            element: <Suspense fallback={Loading}>
              <Salary /></Suspense>
          },
          // {
          //   path: ':id',
          //   element: <PerformanceProfileSubAdmin />
          // }
        ]
      },
      {
        path: "/Sub-Admin/registerTeacher",
        element: <Suspense fallback={Loading}>
          <TeacherRegister /></Suspense>,
        children: []
      },
      {
        path: "/Sub-Admin/registerStudent",
        element: <Suspense fallback={Loading}>
          <StudentRegister /></Suspense>,
        children: []
      },
      {
        path: "/Sub-Admin/StudentsFee",
        element: <Suspense fallback={Loading}>
          <FeeSubAdmin /></Suspense>,
        children: [
          {
            path: '/Sub-Admin/StudentsFee/details',
            element: <Suspense fallback={Loading}>
              <AllExDetails /></Suspense>,
            children: [
              {
                path: '',
                element: <Suspense fallback={Loading}>
                  <FeeDetailsSubAdmin /></Suspense>
              },
              {
                path: ':id',
                element: <Suspense fallback={Loading}>
                  <FeeDetail /></Suspense>
              }
            ]
          },
          {
            path: '/Sub-Admin/StudentsFee/structure',
            element: <Suspense fallback={Loading}><FeeStructureSubAdmin /></Suspense>
          },
          {
            path: '/Sub-Admin/StudentsFee/feediscount',
            element: <Suspense fallback={Loading}>
              <FeeDiscountSubAdmin /></Suspense>
          },
          {
            path: '/Sub-Admin/StudentsFee/PreviousFeeSubAdmin',
            element: <Suspense fallback={Loading}>
              <AllPreviousDetails /></Suspense>,
            children: [
              {
                path: '',
                element: <Suspense fallback={Loading}>
                  <PreviousFeeDetailsSubAdmin /></Suspense>
              },
              {
                path: ':id',
                element: <Suspense fallback={Loading}>
                  <PreviousFeeDetail /></Suspense>
              }
            ]
          },
          {
            path: '',
            element: <Suspense fallback={Loading}>
              <FeeDetailsSubAdmin /> </Suspense>
          },
        ]
      },
      {
        path: "/Sub-Admin/Notice",
        element: <Suspense fallback={Loading}> <NoticeSubAdmin /> </Suspense>
        ,
        children: []
      },
      {
        path: '/Sub-Admin/TakeLeave',
        element: <Suspense fallback={Loading}>
          <TakeLeaveSubAdmin /></Suspense>
      },
    ]
  }

]);

export default router;
