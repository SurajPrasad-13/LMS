import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { router } from "./Routes/Routes";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <RouterProvider router={router}/>
            
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </>
);

{
  /* <BrowserRouter>
  <Home />
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
      <Route path="contact" element={<Contact />} />
      <Route path="Home" element={<Home />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter> */
}
{
  /* <Route path="logout" element={<LogOut />} /> */
}
{
  /* <Route path="test" element={<Test />} /> */
}
