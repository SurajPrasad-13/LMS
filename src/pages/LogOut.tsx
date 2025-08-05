import React, { useState } from "react";
import { MdOutlineWavingHand } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();
  const [confirmLogOut, setconfirmLogOut] = useState(false);
  return (
    <>
      {confirmLogOut ? (
        ""
      ) : (
        <div className="min-h-[89.2vh] bg-cover bg-center flex items-center justify-center px-4 bg-gradient-to-br from-[#dce1fc] to-[#b9a4fe]  ">
          <div className="max-w-2xl text-center bg-white/60 backdrop-blur-md p-8 rounded-xl shadow-lg">
            <div className="mx-auto mb-6  size-14 md:size-16 flex items-center justify-center bg-white rounded-full shadow">
              <span className="text-2xl md:text-3xl">
                <MdOutlineWavingHand />
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-blue-950 mb-4">
              Goodbye for now!
            </h1>
            <p className=" md:text-lg text-blue-900 mb-6">
              You've successfully signed out on this device. Sign back in to get
              access to all you have saved on your account.
            </p>
            <button
              onClick={() => navigate("/login")}
              className=" outline-none py-2 px-8 rounded-md text-lg text-white font-semibold my-3 cursor-pointer bg-blue-500"
            >
              Sign back in
            </button>
            <div className="flex items-center justify-center gap-1 text-sm text-gray-500 font-bold pb-3">
            <p>or, </p>
            <button onClick={()=>navigate('/')} className=" text-red-500">Go to Home page</button>
          </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogOut;
