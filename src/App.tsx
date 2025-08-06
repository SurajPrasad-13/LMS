import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/MyCourses";
import LiveSessions from "./pages/LiveSessions";
import Assignments from "./pages/Assignments";
import Achievements from "./pages/Achievements";
import AITutor from "./pages/AITutor";
import Schedule from "./pages/Schedule";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import LogOut from "./pages/LogOut";
import Test from "./pages/Test";
import Contact from "./pages/Contact";
import { AuthProvider } from "./Context/AuthContext";
import Home from "./MainComponents/MainNav";
import { router } from "./Routes/Routes";
// import { Outlet } from "react-router-dom";

const queryClient = new QueryClient();
import { Outlet } from "react-router-dom";
import MainNav from "./MainComponents/MainNav";
const App = () => (
  <>
    <MainNav />
    <Outlet />
  </>
);

export default App;
