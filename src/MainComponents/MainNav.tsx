import { NavLink } from "react-router-dom";
import "./MainNav.css";
import logo from "../assets/Logo1.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

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

  const [isOpen, setisOpen] = useState(false);
  return (
    <>
      <div className="">
        <div className="bg-white w-full h-full px-6 flex items-center justify-between">
          <NavLink to="/home">
            <div className="flex items-center justify-center cursor-pointer">
              <img src={logo} alt="Sudo logo" className="h-12 lg:h-16 " />

              <div className=" text-xl lg:text-2xl font-bold bg-gradient-to-r from-orange-400  to-yellow-400 text-transparent bg-clip-text ">
                Sudo Lms AI
              </div>
            </div>
          </NavLink>
          <div className="hidden md:flex items-center justify-around md:gap-4">
            <div className="flex items-center gap-2 lg:gap-4 text-gray-500">
              {navbar.map((navigation) => (
                <NavLink
                  className={({ isActive }) =>
                    ` transition-all duration-200 px-[2px] lg:px-2 text-[15px] lg:text-[17px]  ${
                      isActive
                        ? "text-white bg-gradient-to-br from-[#fa811e] to-[#ffb845] py-2 md:px-4  rounded-xl font-semibold border-none "
                        : "text-gray-600 hover:text-black hover:-translate-y-[2px] inactive-Link "
                    }`
                  }
                  key={navigation.title}
                  to={navigation.href}
                >
                  {" "}
                  {navigation.title}{" "}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center ">
              <NavLink
                className={({ isActive }) =>
                  ` transition-all duration-200 px-2 lg:px-3.5 py-1.5 text-[15px] lg:text-[17px]   border-2 border-[#ffae6c] rounded-lg ${
                    isActive
                      ? "text-white bg-gradient-to-br from-[#fa811e] to-[#ffb845] py-2 px-4 rounded-lg font-semibold border-none "
                      : "text-gray-600 hover:text-white hover:bg-[#ffb845] hover:border-[#ffb845]  "
                  }`
                }
                to="/login"
              >
                Login
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
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute w-30 sm:w-36 right-0 top-12 md:hidden h-[89vh] bg-white z-40 flex flex-col items-center justify-around"
            >
              {navbar.map((navigation) => (
                <NavLink
                onClick={()=>setisOpen(!isOpen)}
                  key={navigation.title}
                  to={navigation.href}
                  className={({ isActive }) =>
                    `transition-all duration-200 px-2 ${
                      isActive
                        ? "text-white bg-gradient-to-br from-[#fa811e] to-[#ffb845] py-2 px-4 rounded-xl font-semibold border-none"
                        : "text-gray-600 hover:text-black hover:-translate-y-[2px] inactive-Link"
                    }`
                  }
                >
                  {navigation.title}
                </NavLink>
              ))}
              <div>
                <NavLink
                
                  to="/login"
                  className={({ isActive }) =>
                    `transition-all duration-200 ${
                      isActive
                        ? "text-white bg-gradient-to-br from-[#fa811e] to-[#ffb845] py-2 px-4 rounded-xl font-semibold border-none"
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
