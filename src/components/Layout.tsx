import { useState } from "react";
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

const navigation = [
  { name: "Dashboard", href: "/", icon: BookOpen },
  { name: "My Courses", href: "/courses", icon: BookOpen },
  { name: "Live Sessions", href: "/sessions", icon: Video },
  { name: "Assignments", href: "/assignments", icon: ClipboardList },
  { name: "Achievements", href: "/achievements", icon: Trophy },
  { name: "AI Tutor", href: "/ai-tutor", icon: Bot },
  { name: "Schedule", href: "/schedule", icon: Calendar },
];

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(true);
  const navigte = useNavigate()

  return (
    <div className="min-h-screen bg-background ">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 w-full  backdrop-blur-xl sticky top-0 z-50">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-1">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-1">
              <div className="size-10 bg-gradient-learning rounded-md flex items-center justify-center">
                <BookOpen className="size-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-learning bg-clip-text text-transparent">
                EduFlow AI
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-2 py-2 rounded text-sm  font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-learning"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`
                  }
                >
                  <item.icon className="size-5" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 right-1 w-4 h-5 rounded-full text-xs text-red-400">
                  1
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
                {/* Admin section */}
                <div className="hidden sm:flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2 cursor-pointer">
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4" />
                  </Button>
                </div>

                {/* Dropdown */}
                <div className="dropdown invisible opacity-0 transition-all duration-200 absolute right-0 top-full mt-2 bg-white text-black rounded-lg shadow-lg p-4 w-40 z-50">
                  {isLoggedIn ? (
                    <button onClick={()=>navigte('/logOut')} className="block w-full text-left px-3 py-1 rounded hover:bg-gray-100">
                      Logout
                    </button>
                  ) : (
                    <button onClick={()=>navigte('/login')} className="block w-full text-left px-3 py-1 rounded hover:bg-gray-100">
                      Login
                    </button>
                  )}

                  <button className="block w-full text-left px-3 py-1 rounded hover:bg-gray-100">
                    Profile
                  </button>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border/50 bg-card/95 backdrop-blur-xl">
            <nav className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-primary-foreground"
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
  );
}
