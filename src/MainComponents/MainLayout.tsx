import React from "react";
import MainNav from "./MainNav";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div>
      <MainNav />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default MainLayout;
