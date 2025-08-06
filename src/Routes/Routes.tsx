import { createBrowserRouter } from "react-router-dom";
import Home from "../MainComponents/Home";
import App from "../App";
import About from "@/MainComponents/About";
import Courses from "@/MainComponents/Courses";
import Classes from "@/MainComponents/Classes";
import Mentors from "@/MainComponents/Mentors";
import Blogs from "@/MainComponents/Blogs";
import ContactUs from "@/MainComponents/ContactUs";
import Login from "@/pages/Login";
import Layout from "@/components/Layout";
import MyCourses from "@/pages/MyCourses";
import LiveSessions from "@/pages/LiveSessions";
import Assignments from "@/pages/Assignments";
import Achievements from "@/pages/Achievements";
import AITutor from "@/pages/AITutor";
import Dashboard from "@/pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "classes",
        element: <Classes />,
      },
      {
        path: "mentors",
        element: <Mentors />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "layout",
        element: <Dashboard />,
      },
      {
        path: "my-courses",
        element: <MyCourses />,
      },
      {
        path: "sessions",
        element: <LiveSessions />,
      },
      {
        path: "assignments",
        element: <Assignments />,
      },
      {
        path: "achievements",
        element: <Achievements />,
      },
      {
        path: "ai-tutor",
        element: <AITutor />,
      },
      {
        path: "schedule",
        element: <AITutor />,
      },
    ],
  },
]);



