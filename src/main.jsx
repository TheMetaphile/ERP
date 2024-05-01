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
import Result from "./components/Result/CustomResult.jsx";
import  DateSheet  from "./components/DateSheet/datesheet.jsx";
import Palyquiz from "./components/playquiz/firstquizs.jsx";
import Attendance from "./components/Attendance/Attendance.jsx";
import TimeTable from "./components/TimeTable/Timetable.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/assignment",
        element: <AssignmentReport />,
      },
      {
        path: "/fee-due",
        element: <Fee />,
      },
      {
        path: "/events",
        element: <Border />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/playquiz",
        element: <Palyquiz/>,
      },
      {
        path: "/receipt",
        element: <Receipt/>,
      },
      {
        path: "/quiz/:subject",
        element: <Quiz/>,
      },
      {
        path: "/result",
        element: <Result />,
      },
      {
        path: "/Attendance",
        element: <Attendance />,
      },
      {
        path: "/datesheet",
        element: <DateSheet />,
      },
      {
        path: "/timetable",
        element: <TimeTable />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);