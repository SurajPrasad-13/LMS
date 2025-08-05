import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="courses" element={<Courses />} />
              <Route path="sessions" element={<LiveSessions />} />
              <Route path="assignments" element={<Assignments />} />
              <Route path="achievements" element={<Achievements />} />
              <Route path="ai-tutor" element={<AITutor />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="login" element={<Login />} />
              <Route path="logout" element={<LogOut />} />
              <Route path="test" element={<Test />} />
              <Route path="contact" element={<Contact />} />

            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
