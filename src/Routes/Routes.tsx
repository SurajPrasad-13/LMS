// import { createBrowserRouter } from "react-router-dom";
// import Home from "../MainComponents/Home";
// import App from "../App";
// import About from "@/MainComponents/About";
// import Courses from "@/MainComponents/Courses";
// import Classes from "@/MainComponents/Classes";
// import Mentors from "@/MainComponents/Mentors";
// import Blogs from "@/MainComponents/Blogs";
// import ContactUs from "@/MainComponents/ContactUs";
// import Login from "@/pages/Login";
// import Layout from "@/components/Layout";
// import MyCourses from "@/pages/MyCourses";
// import LiveSessions from "@/pages/LiveSessions";
// import Assignments from "@/pages/Assignments";
// import Achievements from "@/pages/Achievements";
// import AITutor from "@/pages/AITutor";
// import Dashboard from "@/pages/Dashboard";
// import MainLayout from "@/MainComponents/MainLayout";
// import Schedule from "@/pages/Schedule";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       {
//         path:'',
//         element: <Home />,
//       },
//       {
//         path: "about",
//         element: <About />,
//       },
//       {
//         path: "courses",
//         element: <Courses />,
//       },
//       {
//         path: "classes",
//         element: <Classes />,
//       },
//       {
//         path: "mentors",
//         element: <Mentors />,
//       },
//       {
//         path: "blogs",
//         element: <Blogs />,
//       },
//       {
//         path: "contact-us",
//         element: <ContactUs />,
//       },
//       {
//         path: "login",
//         element: <Login />,
//       },
//       {
//         path: "layout",
//         element: <Layout />,
//       },
//       {
//         path: "dashboard",
//         element: <Dashboard />,
//       },
//       {
//         path: "my-courses",
//         element: <MyCourses />,
//       },
//       {
//         path: "sessions",
//         element: <LiveSessions />,
//       },
//       {
//         path: "assignments",
//         element: <Assignments />,
//       },
//       {
//         path: "achievements",
//         element: <Achievements />,
//       },
//       {
//         path: "ai-tutor",
//         element: <AITutor />,
//       },
//       {
//         path: "schedule",
//         element: <Schedule />,
//       },
//     ],
//   },
// ]);


import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/MainComponents/MainLayout"; // new layout
import Layout from "@/components/Layout"; // dashboard layout

// Public Pages
import Home from "@/MainComponents/Home";
import About from "@/MainComponents/About";
import Courses from "@/MainComponents/Courses";
import Classes from "@/MainComponents/Classes";
import Mentors from "@/MainComponents/Mentors";
import Blogs from "@/MainComponents/Blogs";
import ContactUs from "@/MainComponents/ContactUs";
import Login from "@/pages/Login";

// Dashboard Pages
import Dashboard from "@/pages/Dashboard";
import MyCourses from "@/pages/MyCourses";
import LiveSessions from "@/pages/LiveSessions";
import Assignments from "@/pages/Assignments";
import Achievements from "@/pages/Achievements";
import AITutor from "@/pages/AITutor";
import Schedule from "@/pages/Schedule";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // 🟢 PUBLIC layout with MainNav
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "courses", element: <Courses /> },
      { path: "classes", element: <Classes /> },
      { path: "mentors", element: <Mentors /> },
      { path: "blogs", element: <Blogs /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "login", element: <Login /> },
    ],
  },
  {
    path: "/",
    element: <Layout />, // 🔒 PRIVATE layout (dashboard)
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "my-courses", element: <MyCourses /> },
      { path: "sessions", element: <LiveSessions /> },
      { path: "assignments", element: <Assignments /> },
      { path: "achievements", element: <Achievements /> },
      { path: "ai-tutor", element: <AITutor /> },
      { path: "schedule", element: <Schedule /> },
    ],
  },
]);
