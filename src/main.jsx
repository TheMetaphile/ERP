import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home/Home.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import AssignmentReport from "./components/assignment_report/assignmentReport.jsx";
import Fee from "./components/fees/fees.jsx";
import Border from "./components/event/border.jsx";
import Profile from "./components/profile/profile.jsx";
import Quiz from "./components/quiz/quiz.jsx";
import Receipt from "./components/receipt/receipt.jsx";
import Result from "./components/Result/Result.jsx";
import  DateSheet  from "./components/DateSheet/datesheet.jsx";
import Palyquiz from "./components/playquiz/firstquizs.jsx";
import Attendance from "./components/Attendance/Attendance.jsx";
import TimeTable from "./components/TimeTable/Timetable.jsx";
import SubjectClassWork from "./components/classWork/SubjectClassWork.jsx";
import ClassWork from "./components/classWork/route.jsx";
import TodayClassWork from "./components/classWork/TodayClassWork.jsx";
import Login from "./components/onBoarding/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/dashboard/home",
        element: <Home />,
      },
      {
        path: "/dashboard/assignment",
        element: <AssignmentReport />,
      },
      {
        path: "/dashboard/fee-due",
        element: <Fee />,
      },
      {
        path: "/dashboard/events",
        element: <Border />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/playquiz",
        element: <Palyquiz/>,
      },
      {
        path: "/dashboard/receipt",
        element: <Receipt/>,
      },
      {
        path: "/dashboard/quiz/:subject",
        element: <Quiz/>,
      },
      {
        path: "/dashboard/result",
        element: <Result />,
      },
      {
        path: "/dashboard/attendance",
        element: <Attendance />,
      },
      {
        path: "/dashboard/datesheet",
        element: <DateSheet />,
      },
      {
        path: "/dashboard/timetable",
        element: <TimeTable />,
      },
      {
        path: "/dashboard/classwork",
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
    ],
  },
 
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
