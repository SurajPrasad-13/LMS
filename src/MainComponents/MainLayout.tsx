import React from "react";
import MainNav from "./MainNav";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div>
      <MainNav />
      <div className="mt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
