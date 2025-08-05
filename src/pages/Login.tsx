import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";
import { useAuth } from "../Context/AuthContext";
import { LoaderOne } from "@/components/ui/loader";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { EyeOff } from "lucide-react";
import { IoMdEyeOff } from "react-icons/io";
const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    setIsLoggedIn(true);
    navigate("/");
  };
  const [showPass, setshowPass] = useState(false)

  return (
    <div className="flex items-center bg-black/70 justify-center h-[100vh]">
      <div className="py-5 px-7 md:px-10 bg-white backdrop-blur-md  rounded-lg w-[calc(100%-32px)] sm:w-[320px] md:w-[380px] lg:w-[440px]">
        <h1 className="text-3xl font-bold my-2 md:my-4">Log in</h1>
        <form action="" className="w-full" onSubmit={handleSubmit(handleLogin)}>
          <div className="">
            <label htmlFor="UserName">UserName</label>
            <div className="  transition-all duration-100 p-2 rounded-md my-2 w-full border border-gray-400   focus:outline-blue-500 flex items-center justify-start gap-2">
              <FaUser className="text-blue-500 text-xl" />
              <input
                {...register("username", {
                  required: { value: true, message: "UserName is Required" },
                  minLength: {
                    value: 2,
                    message: "Enter More than Two Characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z][a-zA-Z0]{1,11}$/,
                    message:
                      "Username must be 2-10 characters, and contain only letters",
                  },
                })}
                type="text"
                id="UserName"
                className="w-full bg-transparent outline-none ml-1"
              />
            </div>
            {errors.username && (
              <p className="text-xs mb-2 text-red-500">
                {errors.username.message}{" "}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="Password">Password</label>
            <div className="transition-all duration-100 p-2 rounded-md my-2 w-full border border-gray-400 focus:outline-blue-500 flex items-center justify-start gap-2">
              <TbPasswordFingerprint className="text-blue-500 text-2xl" />
              <input
                {...register("password", {
                  required: { value: true, message: "Password is Required" },
                  minLength: {
                    value: 5,
                    message: "Enter More Than 5 Characters",
                  },
                  pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$&])[A-Za-z\d@$&]{6,10}$/,
              message:
                "Password must be at least 6 characters long and include uppercase, lowercase, number, and special character",
            },
                })}
                id="Password"
                type={`${showPass?'text':'password'}`}
                className="w-full bg-transparent outline-none ml-1"
              />
              <div onClick={()=>setshowPass(!showPass)} >
                {showPass?<IoMdEyeOff className="text-xl text-blue-500"/>:<IoEye className="text-xl text-blue-500"/>}
              </div>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500"> {errors.password.message}</p>
            )}
          </div>
          <div className="mt-3 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${
                isSubmitting
                  ? "bg-white my-3 text-xs "
                  : "w-full outline-none p-2 rounded-md text-white font-semibold my-3 cursor-pointer bg-blue-500 flex items-center justify-center "
              } `}
            >
              {isSubmitting ? <LoaderOne  /> : "Login"}
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center gap-1 text-sm text-gray-500 font-bold pb-3">
          <p>or, </p>
          <button className=" text-red-500">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
