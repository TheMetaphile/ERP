import { createBrowserRouter } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import Loading from "./LoadingScreen/Loading.jsx";
import StudentCard from "./AdminComponents/StudentDetails.jsx";
import CompleteFee from "./AdminComponents/fee/CompleteFee/CompleteFee.jsx";
import CreateCategory from "./AdminComponents/fee/DiscountCategories/CreateCategory.jsx";

const SupAdminTeacherRegister = lazy(() => import("./SuperAdminComponents/Teacher/SupAdminTeacherRegister.jsx"));
const Studentdetailscard = lazy(() => import("./TeacherComponents/studentdetailcard.jsx"));
const Detailscard = lazy(() => import("./SubAdminComponent/Detailscard.jsx"));
const StudentDoubtsHOD = lazy(() => import("./TeacherComponents/HOD/utils/studentDoubt/StudentDoubtsHOD.jsx"));
const SuperAdminDashboard = lazy(() => import("./SuperAdminComponents/Dashboard.jsx"));
const SuperAdminHome = lazy(() => import("./SuperAdminComponents/Home/Home.jsx"));
const SuperAdminProfile = lazy(() => import("./SuperAdminComponents/profile/AdminProfile.jsx"));
const AllAdmins = lazy(() => import("./SuperAdminComponents/Admins/AllAdmins.jsx"));
const AllReportHOD = lazy(() => import("./TeacherComponents/HOD/utils/result/AllReportHOD.jsx"));
const ReportCardHOD = lazy(() => import("./TeacherComponents/HOD/utils/result/ReportCardHOD.jsx"));
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

const SuspenseWrapper = ({ children }) => (
  <Suspense
    fallback={
      <Loading />
    }
  >
    {children}
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <SuspenseWrapper fallback={Loading}>
      <Login /></SuspenseWrapper>


    ,
  },
  {
    path: "/resetpassword",
    element: <SuspenseWrapper fallback={Loading}><ResetPassword /></SuspenseWrapper>
    ,
  },
  {
    path: "/newPassword",
    element: <SuspenseWrapper fallback={Loading}>
      <SetNewPassword /></SuspenseWrapper>,
  },
  {
    path: "/Student-Dashboard",
    element: (
      // <PrivateRoute>
      <SuspenseWrapper fallback={Loading}>
        <Dashboard /></SuspenseWrapper>
      // </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <SuspenseWrapper fallback={Loading}>
          <Home /></SuspenseWrapper>,
      },
      {
        path: "/Student-Dashboard/home",
        element: <SuspenseWrapper fallback={Loading}>
          <Home /></SuspenseWrapper>,
      },
      {
        path: "/Student-Dashboard/profile",
        element: <SuspenseWrapper fallback={Loading}>
          <UserProfile /></SuspenseWrapper>,
      },
      {
        path: "/Student-Dashboard/assignment",
        element: <SuspenseWrapper fallback={Loading}>
          <AssignmentReport /></SuspenseWrapper>,
      },
      {
        path: "/Student-Dashboard/fee-due",
        element: <SuspenseWrapper fallback={Loading}>
          <TabsStudentFee /></SuspenseWrapper>,
      },
      {
        path: "/Student-Dashboard/events",
        element: <SuspenseWrapper fallback={Loading}>
          <Border /></SuspenseWrapper>,
      },
      {
        path: "/Student-Dashboard/profile",
        element: <SuspenseWrapper fallback={Loading}>
          <Profile /></SuspenseWrapper>,
      },
      // {
      //   path: "/Student-Dashboard/playquiz",
      //   element: <Palyquiz/>,
      // },
      {
        path: "/Student-Dashboard/receipt",
        element: <SuspenseWrapper fallback={Loading}>
          <Receipt /></SuspenseWrapper>,
      },
      {
        path: "/Student-Dashboard/quiz",
        element: <SuspenseWrapper fallback={Loading}><QuizRoute /></SuspenseWrapper>,
        children: [
          {
            path: '',
            element: <SuspenseWrapper fallback={Loading}>
              <Panel /></SuspenseWrapper>
          },

          {
            path: ':subject',
            element: <SuspenseWrapper fallback={Loading}>
              <Quiz /></SuspenseWrapper>
          }
        ]
      },
      {
        path: "/Student-Dashboard/exam",
        element: <SuspenseWrapper fallback={Loading}>
          <ExamRoute /></SuspenseWrapper>,
        children: [
          {
            path: '',
            element: <SuspenseWrapper fallback={Loading}>
              <Examination /></SuspenseWrapper>
          },
          {
            path: ':subject',
            element: <SuspenseWrapper fallback={Loading}>
              <Quiz /></SuspenseWrapper>
          }
        ]
      },
      {
        path: "/Student-Dashboard/result",
        element: <SuspenseWrapper fallback={Loading}>
          <Result /></SuspenseWrapper>,
      },
      {
        path: "/Student-Dashboard/attendance",
        element: <SuspenseWrapper fallback={Loading}>
          <Attendance /></SuspenseWrapper>,
      },
      {
        path: "/Student-Dashboard/datesheet",
        element: <SuspenseWrapper fallback={Loading}>
          <DateSheet /></SuspenseWrapper>,
      },
      {
        path: "/Student-Dashboard/timetable",
        element: <SuspenseWrapper fallback={Loading}>
          <TimeTable /></SuspenseWrapper>,
      },
      {
        path: "/Student-Dashboard/classwork",
        element: <SuspenseWrapper fallback={Loading}>
          <ClassWork /></SuspenseWrapper>,
        children: [
          {
            path: '',
            element: <SuspenseWrapper fallback={Loading}>
              <TodayClassWork /></SuspenseWrapper>
          },

          // {
          //   path: ':name',
          //   element: <SubjectClassWork />
          // }
        ]
      },
      {
        path: "/Student-Dashboard/homework",
        element: <SuspenseWrapper fallback={Loading}>
          <Route /></SuspenseWrapper>,
        children: [
          {
            path: '',
            element: <SuspenseWrapper fallback={Loading}>
              <TodayHomeWork /></SuspenseWrapper>
          },

          // {
          //   path: ':name',
          //   element: <SubjectHomeWork />
          // }
        ]
      },
      {
        path: "/Student-Dashboard/askdoubt",
        element: <SuspenseWrapper fallback={Loading}>
          <AskDoubt /></SuspenseWrapper>,
        children: [
          {
            path: '/Student-Dashboard/askdoubt/mydoubts',
            element: <SuspenseWrapper fallback={Loading}>
              <MyDoubts /></SuspenseWrapper>
          },
          {
            path: '/Student-Dashboard/askdoubt/alldoubt',
            element: <SuspenseWrapper fallback={Loading}>
              <AllDoubts /></SuspenseWrapper>
          },
          {
            path: '',
            element: <SuspenseWrapper fallback={Loading}>
              <MyDoubts /></SuspenseWrapper>
          }
        ]
      },
      {
        path: "/Student-Dashboard/notification",
        element: <SuspenseWrapper fallback={Loading}>
          <Notification /></SuspenseWrapper>,
        children: [
          {
            path: '/Student-Dashboard/notification/allnotification',
            element: <SuspenseWrapper fallback={Loading}>
              <AllNotification /></SuspenseWrapper>
          },
          {
            path: '/Student-Dashboard/notification/inbox',
            element: <SuspenseWrapper fallback={Loading}>
              <Inbox /></SuspenseWrapper>
          },
          {
            path: '/Student-Dashboard/notification/archived',
            element: <SuspenseWrapper fallback={Loading}>
              <Archived /></SuspenseWrapper>
          },
          {
            path: '',
            element: <SuspenseWrapper fallback={Loading}>
              <AllNotification /></SuspenseWrapper>
          },
        ]
      },
      {
        path: "/Student-Dashboard/leave",
        element: <SuspenseWrapper fallback={Loading}>
          <Leave /></SuspenseWrapper>,
      },
      {
        path: "/Student-Dashboard/gallery",
        element: <SuspenseWrapper fallback={Loading}>
          <Gallery /></SuspenseWrapper>,
      },
      {
        path: "/Student-Dashboard/broadcast",
        element: <SuspenseWrapper fallback={Loading}>
          <BroadCast /></SuspenseWrapper>,
      },
      {
        path: "/Student-Dashboard/activities",
        element: <SuspenseWrapper fallback={Loading}>
          <Activities /></SuspenseWrapper>,
        children: [
          {
            path: '/Student-Dashboard/activities/recentactivity',
            element: <SuspenseWrapper fallback={Loading}>
              <RecentActivity /></SuspenseWrapper>
          },
          {
            path: '/Student-Dashboard/activities/allactivity',
            element: <SuspenseWrapper fallback={Loading}>
              <AllActivity /></SuspenseWrapper>
          },
          {
            path: '',
            element: <SuspenseWrapper fallback={Loading}>
              <RecentActivity /></SuspenseWrapper>
          },
        ]
      },
      {
        path: "/Student-Dashboard/medical",
        element: <SuspenseWrapper fallback={Loading}>
          <Mediacal /></SuspenseWrapper>,
      },
      {
        path: "/Student-Dashboard/homework",
        element: <SuspenseWrapper fallback={Loading}>
          <HomeWork /></SuspenseWrapper>,
      },
      {
        path: "/Student-Dashboard/notebook",
        element: <SuspenseWrapper fallback={Loading}>
          <Status /></SuspenseWrapper>,
      },
    ],
  },
  {
    path: "/Admin-Dashboard",
    element: (
      // <PrivateRoute>
      <SuspenseWrapper fallback={Loading}>
        <AdminDashboard />
      </SuspenseWrapper>
      // </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <SuspenseWrapper fallback={Loading}>
          <AdminHome /></SuspenseWrapper>,
      },
      {
        path: '/Admin-Dashboard/Profile',
        element: <SuspenseWrapper fallback={Loading}>
          <AdminProfile /></SuspenseWrapper>
      },
      {
        path: "/Admin-Dashboard/Students",
        element: <SuspenseWrapper fallback={Loading}>
          <AllStudents /></SuspenseWrapper>,
        children: [
          {
            path: '',
            element: <SuspenseWrapper fallback={Loading}>
              <StudentsList /></SuspenseWrapper>
          },
          {
            path: '/Admin-Dashboard/Students/studentdetails',
            element: <SuspenseWrapper fallback={Loading}>
              <StudentDetailScreen /></SuspenseWrapper>
          },
        ]
      },
      {
        path: "/Admin-Dashboard/StudentsAddmissionForm",
        element: <SuspenseWrapper fallback={Loading}>
          <StudentRegister /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Admin-Dashboard/StudentsFee",
        element: <SuspenseWrapper fallback={Loading}>
          <FeeAdmin /></SuspenseWrapper>,
        children: [
          {
            path: '/Admin-Dashboard/StudentsFee/details',
            element: <SuspenseWrapper fallback={Loading}>
              <AllDetailsAdmin /></SuspenseWrapper>,
            children: [
              {
                path: '',
                element: <SuspenseWrapper fallback={Loading}>
                  <FeeDetails /></SuspenseWrapper>
              },
              {
                path: ':id',
                element: <SuspenseWrapper fallback={Loading}><FeeDetailAdmin /></SuspenseWrapper>
              }
            ]
          },
          {
            path: '/Admin-Dashboard/StudentsFee/structure',
            element: <SuspenseWrapper fallback={Loading}>
              <FeeStructure /></SuspenseWrapper>
          },
          {
            path: '/Admin-Dashboard/StudentsFee/discountCategory',
            element: <SuspenseWrapper fallback={Loading}>
              <CreateCategory /></SuspenseWrapper>
          },
          {
            path: '/Admin-Dashboard/StudentsFee/feediscount',
            element: <SuspenseWrapper fallback={Loading}>
              <FeeDiscount /></SuspenseWrapper>,
            children: [
              {
                path: ':email',
                element: <SuspenseWrapper fallback={Loading}><FeeDiscount /></SuspenseWrapper>
              }
            ]
          },
          {
            path: '',
            element: <SuspenseWrapper fallback={Loading}>
              <FeeDetails /></SuspenseWrapper>
          },
          {
            path: '/Admin-Dashboard/StudentsFee/PreviousFee',
            element: <SuspenseWrapper fallback={Loading}>
              <AllPreviousDetailsAdmin /></SuspenseWrapper>,
            children: [
              {
                path: '',
                element: <SuspenseWrapper fallback={Loading}>
                  <PreviousFeeDetailsAdmin /></SuspenseWrapper>
              },
              {
                path: ':email',
                element: <SuspenseWrapper fallback={Loading}><PreviousFeeDetailAdmin /></SuspenseWrapper>
              }
            ]
          },
          {
            path: '/Admin-Dashboard/StudentsFee/CompleteFee',
            element: <SuspenseWrapper fallback={Loading}>
              <CompleteFee /></SuspenseWrapper>
          },
        ]
      },

      {
        path: "/Admin-Dashboard/StudentAttendance",
        element: <SuspenseWrapper fallback={Loading}>
          <StudentAttendance /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Admin-Dashboard/StudentPromotion",
        element: <SuspenseWrapper fallback={Loading}>
          <StudentPromotion /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Result",
        element: <SuspenseWrapper fallback={Loading}>
          <AllReportAdmin /></SuspenseWrapper>,
        children: [
          {
            path: '',
            element: <SuspenseWrapper fallback={Loading}>
              <ReportCardAdmin /></SuspenseWrapper>
          },
          {
            path: ':id',
            element: <SuspenseWrapper fallback={Loading}>
              <Subresult /></SuspenseWrapper>
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
        element: <SuspenseWrapper fallback={Loading}>
          <AllTC /></SuspenseWrapper>,
        children: [
          {
            path: '',
            element: <SuspenseWrapper fallback={Loading}>
              <TC /></SuspenseWrapper>
          },
          {
            path: ':id',
            element: <SuspenseWrapper fallback={Loading}>
              <Certificate /></SuspenseWrapper>
          }
        ]
      },
      {
        path: "/Admin-Dashboard/charactercetificate",
        element: <SuspenseWrapper fallback={Loading}>
          <AllCC /></SuspenseWrapper>,
        children: [
          {
            path: '',
            element: <SuspenseWrapper fallback={Loading}>
              <CC /></SuspenseWrapper>
          },
          {
            path: ':id',
            element: <SuspenseWrapper fallback={Loading}>
              <CharacterCertificate /></SuspenseWrapper>
          }
        ]
      },
      {
        path: "/Admin-Dashboard/Assigncoordinator",
        element: <SuspenseWrapper fallback={Loading}>
          <Assigncoordinator /></SuspenseWrapper>,
        children: [],
      },
      {
        path: "/Admin-Dashboard/Substitutecoordinator",
        element: <SuspenseWrapper fallback={Loading}>
          <Substitutecoordinator /></SuspenseWrapper>,
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
        element: <SuspenseWrapper fallback={Loading}>
          <NewAdmission /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Teachers",
        element: <SuspenseWrapper fallback={Loading}>
          <AllTeachers /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Teachers/Profile",
        element: <SuspenseWrapper fallback={Loading}>
          <TeacherProfile /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Admin-Dashboard/AddTeachers",
        element: <SuspenseWrapper fallback={Loading}>
          <TeacherRegister /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Admin-Dashboard/TeachersAttendance",
        element: <SuspenseWrapper fallback={Loading}>
          <TeacherAttendance /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Admin-Dashboard/TeachersSalary",
        element: <SuspenseWrapper fallback={Loading}>
          <TeachersSalary /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Parents/AllParents",
        element: <SuspenseWrapper fallback={Loading}>
          <AllParents /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Parents/AllParents/Details",
        element: <SuspenseWrapper fallback={Loading}>
          <ParentsDetails /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Library/AllBooks",
        element: <SuspenseWrapper fallback={Loading}>
          <AllBooks /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Admin-Dashboard/StudentResult/Details",
        element: <SuspenseWrapper fallback={Loading}>
          <ResultLayout /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Transport",
        element: <SuspenseWrapper fallback={Loading}>
          <Transport /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Notice",
        element: <SuspenseWrapper fallback={Loading}>
          <Notice /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Leave",
        element: <SuspenseWrapper fallback={Loading}><Leaves /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Classes",
        element: <SuspenseWrapper fallback={Loading}>
          <Class /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Classteacher",
        element: <SuspenseWrapper fallback={Loading}>
          <ClassTeacher /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Assignteacher",
        element: <SuspenseWrapper fallback={Loading}>
          <AssignTeacher /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Exam",
        element: <SuspenseWrapper fallback={Loading}>
          <Exam /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Message",
        element: <SuspenseWrapper fallback={Loading}>
          <Message /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Subjects",
        element: <SuspenseWrapper fallback={Loading}>
          <Subject /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Assignsubject",
        element: <SuspenseWrapper fallback={Loading}>
          <AssignSubject /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Account/Expenses",
        element: <SuspenseWrapper fallback={Loading}>
          <Expenses /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Account/TeacherStudents",
        element: <SuspenseWrapper fallback={Loading}>
          <TeacherStudent /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Admin-Dashboard/Employee",
        element: <SuspenseWrapper fallback={Loading}>
          <Employee /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Admin-Dashboard/timetable",
        element: <SuspenseWrapper fallback={Loading}>
          <TimeTableAdmin /></SuspenseWrapper>,
        children: [
          {
            path: "",
            element: <SuspenseWrapper fallback={Loading}>
              <StudentsTimeTable /></SuspenseWrapper>,
            children: []
          },
          {
            path: "timetablestructure",
            element: <SuspenseWrapper fallback={Loading}><Employee /></SuspenseWrapper>,
            children: []
          },
          {
            path: "upload",
            element: <SuspenseWrapper fallback={Loading}>
              <Upload /></SuspenseWrapper>,
            children: []
          },
          {
            path: "teacher",
            element: <SuspenseWrapper fallback={Loading}>
              <TeachersTimeTable /></SuspenseWrapper>,
            children: []
          },
          {
            path: "student",
            element: <SuspenseWrapper fallback={Loading}>
              <StudentsTimeTable /></SuspenseWrapper>,
            children: []
          },
        ]
      },
      {
        path: "/Admin-Dashboard/weekplan",
        element: <SuspenseWrapper fallback={Loading}>
          <PlannerAdmin /></SuspenseWrapper>,
      },
      {
        path: "/Admin-Dashboard/appraisal",
        element: <SuspenseWrapper fallback={Loading}>
          <AppraisalAdmin /></SuspenseWrapper>,
        children: [
          {
            path: '',
            element: <SuspenseWrapper fallback={Loading}>
              <AppliedAdmin /></SuspenseWrapper>
          },
          {
            path: ':id',
            element: <SuspenseWrapper fallback={Loading}>
              <ApplyAdmin /></SuspenseWrapper>
          }
        ]
      },
      {
        path: '/Admin-Dashboard/Events',
        element: <SuspenseWrapper fallback={Loading}>
          <Event /></SuspenseWrapper>
      },
    ]
  },
  {
    path: "/Teacher-Dashboard",
    element: (

      <SuspenseWrapper fallback={Loading}>
        <TeacherDashboard /></SuspenseWrapper>

    ),
    children: [
      {
        path: "",
        element: <SuspenseWrapper fallback={Loading}>
          <TeacherHome /></SuspenseWrapper>,
      },
      {
        path: '/Teacher-Dashboard/Profile',
        element: <SuspenseWrapper fallback={Loading}>
          <TeacherDashboardProfile /></SuspenseWrapper>
      },
      {
        path: "/Teacher-Dashboard/noticeboard",
        element: <SuspenseWrapper fallback={Loading}><NoticeBoard /></SuspenseWrapper>,
        children: [
          // {
          //   path: '/Teacher-Dashboard/noticeboard/allnotice',
          //   element: <SuspenseWrapper fallback={Loading}>
          //     <AllNotice /></SuspenseWrapper>
          // },
          {
            path: '/Teacher-Dashboard/noticeboard/teacher',
            element: <SuspenseWrapper fallback={Loading}>
              <Teacher /></SuspenseWrapper>
          },
          // {
          //   path: '/Teacher-Dashboard/noticeboard/student',
          //   element: <SuspenseWrapper fallback={Loading}>
          //     <Student /></SuspenseWrapper>
          // },
          {
            path: '/Teacher-Dashboard/noticeboard/upload',
            element: <SuspenseWrapper fallback={Loading}>
              <UploadNotice /></SuspenseWrapper>
          },
          {
            path: '',
            element: <SuspenseWrapper fallback={Loading}>
              <Teacher /></SuspenseWrapper>
          },
        ]
      },
      {
        path: "/Teacher-Dashboard/checkin",
        element: <SuspenseWrapper fallback={Loading}>
          <CheckIn /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Teacher-Dashboard/classwork",
        element: <SuspenseWrapper fallback={Loading}>
          <ClassWorkTeacher /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Teacher-Dashboard/homework",
        element: <SuspenseWrapper fallback={Loading}>
          <HomeWorkTeacher /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Teacher-Dashboard/takeleave",
        element: <SuspenseWrapper fallback={Loading}>
          <TakeLeave /></SuspenseWrapper>,
        children: []
      },

      {
        path: "/Teacher-Dashboard/timetable",
        element: <SuspenseWrapper fallback={Loading}>
          <TimeTableTeacher /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Teacher-Dashboard/birthday",
        element: <SuspenseWrapper fallback={Loading}>
          <BirthDay /></SuspenseWrapper>,
        children: [
          {
            path: '/Teacher-Dashboard/birthday/all',
            element: <SuspenseWrapper fallback={Loading}>
              <All /></SuspenseWrapper>
          },
          {
            path: '/Teacher-Dashboard/birthday/teacher',
            element: <SuspenseWrapper fallback={Loading}>
              <TeacherBirthDay /></SuspenseWrapper>
          },
          {
            path: '/Teacher-Dashboard/birthday/student',
            element: <SuspenseWrapper fallback={Loading}>
              <StudentBirthDay /></SuspenseWrapper>
          },
          {
            path: '',
            element: <SuspenseWrapper fallback={Loading}><StudentBirthDay /></SuspenseWrapper>
          },
        ]
      },
      {
        path: "/Teacher-Dashboard/appraisal",
        element: <SuspenseWrapper fallback={Loading}>
          <Appraisal /></SuspenseWrapper>,
        children: [
          {
            path: '/Teacher-Dashboard/appraisal/apply',
            element: <SuspenseWrapper fallback={Loading}>
              <Apply /></SuspenseWrapper>
          },
          {
            path: '/Teacher-Dashboard/appraisal/applied',
            element: <SuspenseWrapper fallback={Loading}>
              <Applied /></SuspenseWrapper>
          },
          {
            path: '',
            element: <SuspenseWrapper fallback={Loading}>
              <Apply /></SuspenseWrapper>
          },
        ]
      },
      {
        path: "/Teacher-Dashboard/studentdoubts",
        element: <SuspenseWrapper fallback={Loading}>
          <StudentDoubts /></SuspenseWrapper>,
        children: [
          {
            path: "new",
            element: <SuspenseWrapper fallback={Loading}>
              <NewDoubt /></SuspenseWrapper>
          },
          {
            path: "answered",
            element: <SuspenseWrapper fallback={Loading}>
              <Answered /></SuspenseWrapper>
          },
          {
            path: "",
            element: <SuspenseWrapper fallback={Loading}>
              <NewDoubt /></SuspenseWrapper>
          }
        ]
      },
      {
        path: "/Teacher-Dashboard/class_activity",
        element: <SuspenseWrapper fallback={Loading}>
          <ClassActivity /></SuspenseWrapper>,

        children: [
          {
            path: "",
            element: <SuspenseWrapper fallback={Loading}>
              <TimeTableStudent /></SuspenseWrapper>,
            children: []
          },
          {
            path: "/Teacher-Dashboard/class_activity/details",
            element: <SuspenseWrapper fallback={Loading}>
              <Studentdetailscard /></SuspenseWrapper>,
            children: [
              {
                path: ':email',
                element: <SuspenseWrapper fallback={Loading}><Studentdetailscard /></SuspenseWrapper>
              }
            ]
          },
          {
            path: "/Teacher-Dashboard/class_activity/timetablestudent",
            element: <SuspenseWrapper fallback={Loading}>
              <TimeTableStudent /></SuspenseWrapper>,
            children: []
          },
          {
            path: "reportcard",
            element: <SuspenseWrapper fallback={Loading}>
              <AllReport /></SuspenseWrapper>,
            children: [
              {
                path: '',
                element: <SuspenseWrapper fallback={Loading}>
                  <ReportCard /></SuspenseWrapper>
              },
              {
                path: ':id',
                element: <SuspenseWrapper fallback={Loading}>
                  <Subresult /></SuspenseWrapper>
              }
            ]
          },
          {
            path: "/Teacher-Dashboard/class_activity/studentfee",
            element: <SuspenseWrapper fallback={Loading}>
              <StudentFee /></SuspenseWrapper>,
            children: []
          },
          {
            path: "/Teacher-Dashboard/class_activity/studentAttendence",
            element: <SuspenseWrapper fallback={Loading}>
              <TeacherStudentAttendance /></SuspenseWrapper>,
            children: []
          },
          {
            path: "/Teacher-Dashboard/class_activity/studentattendence/record",
            element: <SuspenseWrapper fallback={Loading}>
              <StudentAttendanceRecord /></SuspenseWrapper>,
            children: []
          },
          {
            path: "/Teacher-Dashboard/class_activity/studentleave",
            element: <SuspenseWrapper fallback={Loading}>
              <StudentLeave /></SuspenseWrapper>,
            children: []
          },
          {
            path: "/Teacher-Dashboard/class_activity/studentPromotion",
            element: <SuspenseWrapper fallback={Loading}>
              <Promotion /></SuspenseWrapper>,
            children: []
          },
        ]
      },

      {
        path: "/Teacher-Dashboard/notebook",
        element: <SuspenseWrapper fallback={Loading}>
          <NoteBook /></SuspenseWrapper>,
        children: [
          {
            path: "",
            element: <SuspenseWrapper fallback={Loading}>
              <AllNoteBookRecord /></SuspenseWrapper>
          },
          {
            path: "All",
            element: <SuspenseWrapper fallback={Loading}>
              <AllNoteBookRecord /></SuspenseWrapper>
          },
          {
            path: "New",
            element: <SuspenseWrapper fallback={Loading}>
              <NewNoteBookRecord /></SuspenseWrapper>
          },
          {
            path: "/Teacher-Dashboard/notebook/studentdetails",
            element: <SuspenseWrapper fallback={Loading}>
              <Studentdetailscard /></SuspenseWrapper>,
            children: [
              {
                path: ':email',
                element: <SuspenseWrapper fallback={Loading}><Studentdetailscard /></SuspenseWrapper>
              },
            ]
          },
        ]
      },
      {
        path: "/Teacher-Dashboard/HOD",
        element: <SuspenseWrapper fallback={Loading}>
          <Hod /></SuspenseWrapper>,
        children: [
          {
            path: "",
            element: <SuspenseWrapper fallback={Loading}>
              <PlannerHOD /></SuspenseWrapper>
          },
          {
            path: "/Teacher-Dashboard/HOD/planner",
            element: <SuspenseWrapper fallback={Loading}>
              <PlannerHOD /></SuspenseWrapper>,
          },
          {
            path: "/Teacher-Dashboard/HOD/notebook",
            element: <SuspenseWrapper fallback={Loading}>
              <NoteBookHOD /></SuspenseWrapper>,
            children: []
          },
          {
            path: "/Teacher-Dashboard/HOD/notebook/details/:id",
            element: <SuspenseWrapper fallback={Loading}>
              <RecordDetailsHOD /></SuspenseWrapper>,
            children: []
          },
          {
            path: "/Teacher-Dashboard/HOD/classTeacherSubstitute",
            element: <SuspenseWrapper fallback={Loading}>
              <ClassTeacherSubstitute /></SuspenseWrapper>,
          },
          {
            path: "/Teacher-Dashboard/HOD/lectureSubstitute",
            element: <SuspenseWrapper fallback={Loading}>
              <LectureSubstitute /></SuspenseWrapper>,
          },
          {
            path: "/Teacher-Dashboard/HOD/studentResult",
            element: <SuspenseWrapper fallback={Loading}>
              <AllReportHOD /></SuspenseWrapper>,
            children: [
              {
                path: '',
                element: <SuspenseWrapper fallback={Loading}>
                  <ReportCardHOD /></SuspenseWrapper>
              },
              {
                path: ':id',
                element: <SuspenseWrapper fallback={Loading}>
                  <Subresult /></SuspenseWrapper>
              }
            ]
          },
          {
            path: "/Teacher-Dashboard/HOD/studentDoubts",
            element: <SuspenseWrapper fallback={Loading}>
              <StudentDoubtsHOD /></SuspenseWrapper>,
            children: [
              {
                path: "new",
                element: <SuspenseWrapper fallback={Loading}>
                  <NewDoubt /></SuspenseWrapper>
              },
              {
                path: "answered",
                element: <SuspenseWrapper fallback={Loading}>
                  <Answered /></SuspenseWrapper>
              },
              {
                path: "",
                element: <SuspenseWrapper fallback={Loading}>
                  <NewDoubt /></SuspenseWrapper>
              }
            ]
          },
        ]
      },
      {
        path: "/Teacher-Dashboard/planner",
        element: <SuspenseWrapper fallback={Loading}>
          <Planner /></SuspenseWrapper>,
      },
      {
        path: "/Teacher-Dashboard/notebook/details/:id",
        element: <SuspenseWrapper fallback={Loading}>
          <RecordDetails /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Teacher-Dashboard/message",
        element: <SuspenseWrapper fallback={Loading}>
          <TeacherMessage /></SuspenseWrapper>,
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
        element: <SuspenseWrapper fallback={Loading}>
          <UploadResult /></SuspenseWrapper>,
        children: [
          {
            path: '/Teacher-Dashboard/uploadResult/details/:email',
            element: <SuspenseWrapper fallback={Loading}><Studentdetailscard /></SuspenseWrapper>
          },

        ]
      },
    ]
  },
  {
    path: "/Sub-Admin",
    element: (
      <SuspenseWrapper fallback={Loading}> <SubAdminDashboard /></SuspenseWrapper>
    ),
    children: [
      {
        path: '',
        element: <SuspenseWrapper fallback={Loading}>
          <AllStudentsList /></SuspenseWrapper>
      },
      {
        path: 'Profile',
        element: <SuspenseWrapper fallback={Loading}>
          <ProfileSubAdmin /></SuspenseWrapper>
      },
      {
        path: "/Sub-Admin/Certificates",
        element: <SuspenseWrapper fallback={Loading}>
          <Allcertificate /></SuspenseWrapper>,
        children: [
          {
            path: '',
            element: <SuspenseWrapper fallback={Loading}>
              <Certificates /></SuspenseWrapper>
          },
          {
            path: 'transfer/:tc/:class/:section/:session',
            element: <SuspenseWrapper fallback={Loading}>
              <Transfer /></SuspenseWrapper>
          },
          {
            path: 'character/:tc/:class/:section/:session',
            element: <SuspenseWrapper fallback={Loading}>
              <Character /></SuspenseWrapper>
          }
        ]
      },
      {
        path: "/Sub-Admin/Students",
        element: <SuspenseWrapper fallback={Loading}>
          <AllStudentSubAdmin /></SuspenseWrapper>,
        children: [
          {
            path: '',
            element: <SuspenseWrapper fallback={Loading}>
              <AllStudentsList /></SuspenseWrapper>
          },
          {
            path: "/Sub-Admin/Students/details",
            element: <SuspenseWrapper fallback={Loading}>
              <Detailscard /></SuspenseWrapper>,
            children: [
              {
                path: ":email",
                element: <SuspenseWrapper fallback={Loading}>
                  <Detailscard /></SuspenseWrapper>,
              }
            ]
          },
        ]
      },
      {
        path: "/Sub-Admin/Readmission",
        element: <SuspenseWrapper fallback={Loading}>
          <Readmission /></SuspenseWrapper>,
        children: [
          {
            path: '',
            element: <SuspenseWrapper fallback={Loading}>
              <AllAdmission /></SuspenseWrapper>,
          },
          {
            path: "/Sub-Admin/Readmission/details",
            element: <SuspenseWrapper fallback={Loading}>
              <Detailscard /></SuspenseWrapper>,
            children: [
              {
                path: ":email",
                element: <SuspenseWrapper fallback={Loading}>
                  <Detailscard /></SuspenseWrapper>,
              }
            ]
          }


        ]
      },
      {
        path: "/Sub-Admin/Result",
        element: <SuspenseWrapper fallback={Loading}>
          <AllReportSubAdmin /></SuspenseWrapper>,
        children: [
          {
            path: '',
            element: <SuspenseWrapper fallback={Loading}>
              <ReportCardSubAdmin /></SuspenseWrapper>
          },
          {
            path: ':id',
            element: <SuspenseWrapper fallback={Loading}>
              <Subresult /></SuspenseWrapper>
          },
          {
            path: "exStudent",
            element: <SuspenseWrapper fallback={Loading}>
              <AllExReport /></SuspenseWrapper>,
            children: [
              {
                path: '',
                element: <SuspenseWrapper fallback={Loading}>
                  <List /></SuspenseWrapper>
              },
              {
                path: ':id',
                element: <SuspenseWrapper fallback={Loading}>
                  <ExResult /></SuspenseWrapper>
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
        element: <SuspenseWrapper fallback={Loading}>
          <AllSalary /></SuspenseWrapper>,
        children: [
          {
            path: '',
            element: <SuspenseWrapper fallback={Loading}>
              <Salary /></SuspenseWrapper>
          },
          // {
          //   path: ':id',
          //   element: <PerformanceProfileSubAdmin />
          // }
        ]
      },
      {
        path: "/Sub-Admin/registerTeacher",
        element: <SuspenseWrapper fallback={Loading}>
          <TeacherRegister /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Sub-Admin/registerStudent",
        element: <SuspenseWrapper fallback={Loading}>
          <StudentRegister /></SuspenseWrapper>,
        children: []
      },
      {
        path: "/Sub-Admin/StudentsFee",
        element: <SuspenseWrapper fallback={Loading}>
          <FeeSubAdmin /></SuspenseWrapper>,
        children: [
          {
            path: '/Sub-Admin/StudentsFee/details',
            element: <SuspenseWrapper fallback={Loading}>
              <AllExDetails /></SuspenseWrapper>,
            children: [
              {
                path: '',
                element: <SuspenseWrapper fallback={Loading}>
                  <FeeDetail /></SuspenseWrapper>
              },
              {
                path: ':id',
                element: <SuspenseWrapper fallback={Loading}>
                  <FeeDetail /></SuspenseWrapper>
              }
            ]
          },
          {
            path: '/Sub-Admin/StudentsFee/structure',
            element: <SuspenseWrapper fallback={Loading}><FeeStructureSubAdmin /></SuspenseWrapper>
          },
          {
            path: '/Sub-Admin/StudentsFee/feediscount',
            element: <SuspenseWrapper fallback={Loading}>
              <FeeDiscountSubAdmin /></SuspenseWrapper>
          },
          {
            path: '/Sub-Admin/StudentsFee/PreviousFeeSubAdmin',
            element: <SuspenseWrapper fallback={Loading}>
              <AllPreviousDetails /></SuspenseWrapper>,
            children: [
              {
                path: '',
                element: <SuspenseWrapper fallback={Loading}>
                  <PreviousFeeDetailsSubAdmin /></SuspenseWrapper>
              },
              {
                path: ':id',
                element: <SuspenseWrapper fallback={Loading}>
                  <PreviousFeeDetail /></SuspenseWrapper>
              }
            ]
          },
          {
            path: '',
            element: <SuspenseWrapper fallback={Loading}>
              <FeeDetailsSubAdmin /> </SuspenseWrapper>
          },
        ]
      },
      {
        path: "/Sub-Admin/Notice",
        element: <SuspenseWrapper fallback={Loading}> <NoticeSubAdmin /> </SuspenseWrapper>
        ,
        children: []
      },
      {
        path: '/Sub-Admin/TakeLeave',
        element: <SuspenseWrapper fallback={Loading}>
          <TakeLeaveSubAdmin /></SuspenseWrapper>
      },
    ]
  },
  {
    path: "/Sup-Admin",
    element: (
      // <PrivateRoute>
      <SuspenseWrapper fallback={Loading}>
        <SuperAdminDashboard />
      </SuspenseWrapper>
      // </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <SuspenseWrapper fallback={Loading}>
          <SuperAdminHome /></SuspenseWrapper>,
      },
      {
        path: '/Sup-Admin/Profile',
        element: <SuspenseWrapper fallback={Loading}>
          <SuperAdminProfile /></SuspenseWrapper>
      },
      {
        path: '/Sup-Admin/Admins',
        element: <SuspenseWrapper fallback={Loading}>
          <AllAdmins /></SuspenseWrapper>
      },
      {
        path: "/Sup-Admin/AddTeachers",
        element: <SuspenseWrapper fallback={Loading}>
          <SupAdminTeacherRegister /></SuspenseWrapper>,
        children: []
      },
    ]
  },

]);

export default router;
