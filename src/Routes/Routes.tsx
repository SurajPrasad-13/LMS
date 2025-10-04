import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/pages/MainLayout"; // public layout
import Layout from "@/components/Layout"; // dashboard layout
import ProtectedRoute from "./ProtectedRoute";

// Public Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Courses from "@/pages/Courses";
import Classes from "@/pages/Classes";
import Mentors from "@/pages/Mentors";
import Blogs from "@/pages/Blogs";
import ContactUs from "@/pages/ContactUs";
import Login from "@/pages/Login";
import GetStarted from "@/pages/GetStarted";

// LMS Pages
import Dashboard from "@/pages/Dashboard";
import MyCourses from "@/pages/MyCourses";
import LiveSessions from "@/pages/LiveSessions";
import Assignments from "@/pages/Assignments";
import Achievements from "@/pages/Achievements";
import AITutor from "@/pages/AITutor";
import Schedule from "@/pages/Schedule";
import Page404 from "@/Page404";
import CourseForm from "@/pages/CourseForm";
import EditCourseForm from "@/pages/EditCourseForm";
import SessionForm from "@/pages/SessionForm";
import EditSessionForm from "@/pages/EditSessionForm";
import AssignmentsForm from "@/pages/AssignmentsForm";
import EditAssignment from "@/pages/EditAssignment";
import AchievementForm from "@/pages/AchievementForm";
import EditAchievements from "@/pages/EditAchievements";
import ScheduleForm from "@/pages/ScheduleForm";
import EditSchedule from "@/pages/EditSchedule";
import Profile from "@/pages/Profile";
import EditProfile from "@/pages/EditProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "courses", element: <Courses /> },
      { path: "classes", element: <Classes /> },
      { path: "mentors", element: <Mentors /> },
      { path: "blogs", element: <Blogs /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "login", element: <Login /> },
      { path: "get-started", element: <GetStarted /> },
      { path: "*", element: <Page404 /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },

      // Routes for course
      {
        path: "my-courses",
        element: (
          <ProtectedRoute requiredRole={["Admin", "Student"]}>
            <MyCourses />
          </ProtectedRoute>
        ),
      }, //get and delete
      {
        path: "my-courses/courseForm",
        element: (
          <ProtectedRoute requiredRole="admin">
            <CourseForm />
          </ProtectedRoute>
        ),
      }, // add
      {
        path: "my-courses/editCourseForm/:id",
        element: (
          <ProtectedRoute requiredRole="admin">
            <EditCourseForm />
          </ProtectedRoute>
        ),
      }, // Update

      // Routes for Live Session
      {
        path: "sessions",
        element: (
          <ProtectedRoute requiredRole={["Admin", "Student"]}>
            <LiveSessions />
          </ProtectedRoute>
        ),
      }, //get and delete
      {
        path: "sessions/sessionForm",
        element: (
          <ProtectedRoute requiredRole="admin">
            <SessionForm />
          </ProtectedRoute>
        ),
      }, //add
      {
        path: "sessions/editSessionForm/:id",
        element: (
          <ProtectedRoute requiredRole="admin">
            <EditSessionForm />
          </ProtectedRoute>
        ),
      }, //Update

      // Routes for Live Assignments
      {
        path: "assignments",
        element: (
          <ProtectedRoute requiredRole={["Admin", "Student"]}>
            <Assignments />
          </ProtectedRoute>
        ),
      }, //get and delete
      {
        path: "assignments/assignmentsForm",
        element: (
          <ProtectedRoute requiredRole="admin">
            <AssignmentsForm />
          </ProtectedRoute>
        ),
      }, //add
      {
        path: "my-courses/assignmentsForm",
        element: (
          <ProtectedRoute requiredRole="admin">
            <AssignmentsForm />
          </ProtectedRoute>
        ),
      }, //add
      {
        path: "assignments/editAssignment/:id",
        element: (
          <ProtectedRoute requiredRole="admin">
            <EditAssignment />
          </ProtectedRoute>
        ),
      }, //Update

      {
        path: "achievements",
        element: (
          <ProtectedRoute requiredRole={["Admin", "Student"]}>
            <Achievements />
          </ProtectedRoute>
        ),
      },
      {
        path: "achievements/achievementForm",
        element: (
          <ProtectedRoute requiredRole="admin">
            <AchievementForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "achievements/editachievementForm/:id",
        element: (
          <ProtectedRoute requiredRole="admin">
            <EditAchievements />
          </ProtectedRoute>
        ),
      },

      { path: "ai-tutor", element: <AITutor /> },

      {
        path: "schedule",
        element: (
          <ProtectedRoute requiredRole={["Admin", "Student"]}>
            <Schedule />
          </ProtectedRoute>
        ),
      },
      {
        path: "schedule/scheduleform",
        element: (
          <ProtectedRoute requiredRole="admin">
            <ScheduleForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "schedule/editscheduleform/:id",
        element: (
          <ProtectedRoute requiredRole="admin">
            <EditSchedule />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute requiredRole={["Admin", "Student"]}>
            <Profile />
          </ProtectedRoute>
        ),
      },
      { path: "profile/editProfile", element: <EditProfile /> },
    ],
  },
]);
