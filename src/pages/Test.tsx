import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, LogIn, UserPlus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Test = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Services",
      href: "/services",
      dropdown: [
        { name: "All Services", href: "/services" },
        { name: "Solutions", href: "/solutions" },
        { name: "Industries", href: "/industries" },
      ],
    },
    { name: "Products", href: "/products" },
    {
      name: "Work",
      href: "/projects",
      dropdown: [
        { name: "Projects", href: "/projects" },
        { name: "Portfolio", href: "/portfolio" },
        { name: "Case Studies", href: "/case-studies" },
      ],
    },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Blogs", href: "/blogs" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="bg-white/95 border-b border-orange-200 backdrop-blur-md sticky top-0 z-50 shadow-md">
        <div className="max-w-screen-xl mx-auto  sm:px-5 xl:pl-8 py-3 gap-3 ">
          <div className="flex justify-between items-center h-14 ">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <NavLink
                to="/"
                className="gradient-orange p-3 rounded-xl shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white drop-shadow-sm"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </NavLink>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#fa811e] to-[#ffb845] text-transparent bg-clip-text">
                SudoTechLabs
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center m-3 gap-2.5 flex-1 justify-center">
              {navigation.map((item) =>
                item.dropdown ? (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="hover:bg-orange-50 gap-1 px-2 py-1"
                      >
                        <span>{item.name}</span>
                        <ChevronDown className="h-4 w-4 " />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white shadow-lg border border-orange-100">
                      {item.dropdown.map((sub) => (
                        <DropdownMenuItem key={sub.name} asChild>
                          <Link
                            to={sub.href}
                            className="w-full  py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                          >
                            {sub.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-sm font-medium px-2.5  lg:text-md py-2 rounded-md transition-all duration-200 ${
                      isActive(item.href)
                        ? "text-orange-600 bg-orange-50"
                        : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>

            {/* Login/Register Desktop */}
            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center gap-4 mr-[-30px]">
              {!isLoggedIn ? (
                <>
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="border-orange-300 text-orange-600 hover:bg-orange-50 px-4 py-1.5 text-sm"
                    >
                      <LogIn className="h-4 w-4 mr-1" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-gradient-to-r from-[#fa821e] to-[#ffb845] text-white px-3 py-1.5 text-sm">
                      <UserPlus className="h-4 w-4 mr-1" />
                      Register
                    </Button>
                  </Link>
                </>
              ) : (
                <Button
                  onClick={() => setIsLoggedIn(false)}
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50 px-4 py-1.5 text-sm"
                >
                  Logout
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-orange-600 p-2 rounded-md hover:bg-orange-50"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-orange-200 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 max-h-96 overflow-y-auto">
              {navigation.map((item) =>
                item.dropdown ? (
                  <div key={item.name} className="space-y-1">
                    <div className="px-3 py-2 text-base font-medium text-gray-800 border-b border-orange-100">
                      {item.name}
                    </div>
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        onClick={() => setIsOpen(false)}
                        className={`block px-6 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                          isActive(subItem.href)
                            ? "text-orange-600 bg-orange-50"
                            : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                      isActive(item.href)
                        ? "text-orange-600 bg-orange-50"
                        : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              )}

              <div className="flex flex-col px-3 pt-4 border-t border-orange-200 gap-2">
                {!isLoggedIn ? (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full border-orange-300 text-orange-600"
                      >
                        <LogIn className="h-4 w-4 mr-1" />
                        Login
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-[#fa821e] to-[#ffb845] text-white">
                        <UserPlus className="h-4 w-4 mr-1" />
                        Register
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      setIsLoggedIn(false);
                      setIsOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-red-300 text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Test