import { useEffect, useState } from "react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Calendar,
  ClipboardList,
  Trophy,
  Bot,
  Video,
  User,
  Bell,
  Search,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import Login from "@/pages/Login";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Slide, toast, ToastContainer } from "react-toastify";
import { AnimatePresence, motion } from "motion/react";
import Notification from "./ui/Notification";
import logo from "../assets/Logo1.png";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BookOpen },
  { name: "My Courses", href: "/dashboard/my-courses", icon: BookOpen },
  { name: "Live Sessions", href: "/dashboard/sessions", icon: Video },
  { name: "Assignments", href: "/dashboard/assignments", icon: ClipboardList },
  { name: "Achievements", href: "/dashboard/achievements", icon: Trophy },
  { name: "AI Tutor", href: "/dashboard/ai-tutor", icon: Bot },
  { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
];

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notificationModel, setnotificationModel] = useState(false);

  const {
    data: notifications = [], // rename + default value
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:8000/api/lms/notifications/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.access}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  console.log(notifications);

  const { user, setUser } = useAuth();
  // console.log('user: ',user)

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("authAccess");
    localStorage.removeItem("userData");
    setUser(null); // ✅ Reset context user
    navigate("/");
  };
  const showNotifications = () => {
    if (notifications.length > 0) {
      setnotificationModel(!notificationModel);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background ">
        {/* Header */}
        <header className="border-b border-border/50 bg-card/50 w-full lg:px-2  backdrop-blur-xl sticky top-0 z-50">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-1">
            <div className="flex justify-between items-center h-16 w-full">
              {/* Logo */}
              <div className="flex items-center space-x-1">
                <img
                  src={logo}
                  alt="Sudo logo"
                  className="h-12 lg:h-14 xl:h-16  "
                />
                <span className="text-lg font-bold bg-gradient-learning bg-clip-text text-transparent">
                  Sudo LMS AI
                </span>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex space-x-1 ml-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    end={item.href === "/dashboard"}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 px-1 py-2 rounded text-sm lg:text-[16px]  font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-learning px-2 text-primary-foreground shadow-learning"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`
                    }
                  >
                    <item.icon className="size-4 xl:size-5" />
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </nav>

              {/* Right Side */}
              <div className="flex items-center">
                <Button
                  onClick={showNotifications}
                  size="sm"
                  className="relative p-2 bg-transparent hover:bg-gradient-learning text-black"
                >
                  <Bell className="w-4 h-4 " />
                  <span className="absolute -top-1 right-1 w-4 h-5 rounded-full text-xs text-red-400">
                    {notifications.length}
                  </span>
                </Button>

                <div
                  className="relative"
                  onMouseEnter={(e) => {
                    e.currentTarget
                      .querySelector(".dropdown")
                      .classList.remove("invisible", "opacity-0");
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget
                      .querySelector(".dropdown")
                      .classList.add("invisible", "opacity-0");
                  }}
                >
                  {/* Profile section */}
                  <div className=" sm:flex items-center bg-white/10 rounded-lg py-2 cursor-pointer">
                    <Button
                      className="p-2 sm:px-3 bg-transparent text-black hover:bg-gradient-learning "
                      size="sm"
                    >
                      <User className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Dropdown */}
                  <div className="dropdown invisible opacity-0 transition-all duration-200 absolute right-0 top-full mt-2 bg-white text-black rounded-lg shadow-lg p-4 w-40 z-50">
                    <button
                      onClick={logOut}
                      className="block w-full text-left px-3 py-1 rounded hover:bg-gray-100"
                    >
                      Logout
                    </button>
                    <button className="block w-full text-left px-3 py-1 rounded hover:bg-gray-100">
                      <NavLink to="profile">Profile</NavLink>
                    </button>
                  </div>
                </div>

                <Button
                  size="sm"
                  className="lg:hidden p-2 bg-transparent text-black "
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-4 h-4 bg-transparent text-black" />
                  ) : (
                    <Menu className="w-4 h-4 bg-transparent text-black" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-border/50   backdrop-blur-3xl">
              <nav className="px-2 py-4 space-y-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    end={item.href === "/dashboard"}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-learning text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className=" mx-auto  px-2 ">
          <Outlet />
        </main>
      </div>
      <AnimatePresence>
        {notificationModel && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ x: 50, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed right-0 w-auto inset-0  flex justify-end items-start  z-50 max-h-[40vh] top-16"
          >
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-lg py-2 w-[calc(100%-6rem)] sm:w-1/2 md:w-[45vw] lg:w-1/3 max-h-[85vh] overflow-y-scroll [&::-webkit-scrollbar]:hidden relative top-2 mr-14 shadow-2xl "
            >
              <button
                onClick={() => setnotificationModel(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-black"
              >
                <X />
              </button>
              <Notification notifications={notifications} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
