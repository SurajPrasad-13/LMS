import React from "react";
import MainNav from "./MainNav";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const MainLayout = () => {
//   console.log(import.meta.env.VITE_API_BACKEND_URL)
// console.log('hello')
  return (
    <div>
      <MainNav />
      <div className=" mt-12 lg:mt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
