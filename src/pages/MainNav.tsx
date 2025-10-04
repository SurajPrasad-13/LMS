import { NavLink } from "react-router-dom";
import "./MainNav.css";
import logo from "../assets/Logo1.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../Context/AuthContext";
import { Button } from "@/components/ui/button";

const MainNav = () => {
  const navbar = [
    { href: "/", title: "Home" },
    { href: "/about", title: "About" },
    { href: "/courses", title: "Courses" },
    { href: "/classes", title: "Classes" },
    { href: "/mentors", title: "Mentors" },
    { href: "/blogs", title: "Blogs" },
    { href: "/contact-us", title: "Contact Us" },
  ];
  const { user, setUser } = useAuth();
  const logOut = () => {
    localStorage.removeItem("authAccess");
    localStorage.removeItem("userData");
    setUser(null); // ✅ Reset context user
  };

  const [isOpen, setisOpen] = useState(false);
  // const { user } = useAuth();
  return (
    <>
      <div className="fixed top-0 z-20 w-screen ">
        <div className="  w-full h-full  flex  items-center justify-between py-1 sm:py-0 px-4 sm:px-6  md:px-2 lg:px-10 xl:px-14  bg-white ">
          <NavLink to="/">
            <div className="flex items-center  cursor-pointer">
              <img src={logo} alt="Sudo logo" className="h-12 lg:h-16 " />

              <div className=" text-xl sm:text-[22px] lg:text-2xl font-bold bg-gradient-to-r from-orange-400  to-yellow-400 text-transparent bg-clip-text ">
                Sudo Lms AI
              </div>
            </div>
          </NavLink>
          <div className="hidden md:flex items-center justify-around md:gap-2 lg:gap-4">
            <div className="flex items-center  lg:gap-4 text-gray-500 ">
              {navbar.map((navigation) => (
                <NavLink
                  className={({ isActive }) =>
                    ` transition-all duration-200  text-[14px] lg:text-[17px]  ${
                      isActive
                        ? "text-white bg-gradient-to-br from-[#fa811e] to-[#ffb845] py-1 px-4 lg:px-6   rounded-sm font-semibold border-none "
                        : "text-gray-600 hover:text-black hover:-translate-y-[2px] inactive-Link px-2 "
                    }`
                  }
                  key={navigation.title}
                  to={navigation.href}
                >
                  {" "}
                  {navigation.title}{" "}
                </NavLink>
              ))}
              {user && <Button
                        onClick={logOut}
                        className="block w-full text-left px-3 py-1 rounded hover:bg-gray-100"
                      >
                        Logout
                      </Button>}
            </div>

            <div className="flex items-center ">
              <NavLink
                className={({ isActive }) =>
                  `transition-all duration-200 py-1 px-4 lg:px-6  text-[14px] lg:text-[17px]   border border-[#ffae6c] rounded-sm ${
                    isActive
                      ? "text-white bg-gradient-learning  rounded-sm font-semibold border-none "
                      : "text-gray-600 hover:text-white hover:bg-gradient-learning hover:border-[#ffb845]  px-3 py-1 "
                  }`
                }
                to="/login"
              >
                {user ? "Dashboard" : "Login"}
              </NavLink>
            </div>
          </div>

          <div className="md:hidden " onClick={() => setisOpen(!isOpen)}>
            {isOpen ? <RxCross2 /> : <RxHamburgerMenu />}
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: -500, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -500, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed w-full  right-0 top-12  md:hidden h-[70vh] pt-4  bg-white/90 z-40 flex flex-col items-center justify-around"
            >
              {navbar.map((navigation) => (
                <NavLink
                  onClick={() => setisOpen(!isOpen)}
                  key={navigation.title}
                  to={navigation.href}
                  className={({ isActive }) =>
                    `transition-all duration-200 px-24 ${
                      isActive
                        ? "text-white bg-gradient-to-br from-[#fa811e] to-[#ffb845] py-2 px-10 rounded-xl font-semibold border-none"
                        : "text-gray-600 hover:text-black hover:-translate-y-[2px] inactive-Link"
                    }`
                  }
                >
                  {navigation.title}
                </NavLink>
              ))}
              <div>
                <NavLink
                  onClick={() => setisOpen(!isOpen)}
                  to="/login"
                  className={({ isActive }) =>
                    `transition-all duration-200 px-24 ${
                      isActive
                        ? "text-white bg-gradient-learning py-2 px-10 rounded-xl font-semibold border-none"
                        : "text-gray-600 hover:text-black hover:-translate-y-[3px] inactive-Link"
                    }`
                  }
                >
                  Login
                </NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default MainNav;
