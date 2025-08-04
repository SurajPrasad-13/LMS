import React from "react";

const Login = () => {
  return (
    <div className="flex items-center bg-gradient-to-br from-[#5a75fd] to-[#210970] justify-center h-[89.2vh]">
      <div className="py-5 px-7 md:px-10 bg-white  rounded-lg w-auto sm:w-[320px] md:w-[380px] lg:w-[440px]">
        <h1 className="text-3xl font-bold my-2 md:my-4">Log in</h1>
        <form action="" className="w-full">
          <div className="">
            <label htmlFor="UserName">UserName</label>
            <input
              type="text"
              id="UserName"
              className=" hover:shadow-lg transition-all duration-100 p-2 rounded my-2 w-full border border-gray-400 bg-[#e2e2fd]  focus:outline-blue-500"
            />
          </div>
          <div>
            <label htmlFor="Password">Password</label>
            <input
              id="Password"
              type="text"
              className=" hover:shadow-lg transition-all duration-100 p-2 rounded my-2 w-full border border-gray-400 bg-[#e2e2fd] focus:outline-blue-500"
            />
          </div>
          <div className="mt-3">
            <input
              type="submit"
              value="Login"
              className="py-2 w-full px-6 text-lg text-white font-semibold  bg-[#4844cc] hover:shadow-xl hover:scale-[1.01] hover:-translate-y-[1px] transition-all duration-400  rounded mt-4 mb-1  border"
            />
          </div>
          <div className="flex items-center justify-center gap-1 text-sm text-gray-500 font-bold pb-3">
            <p>or, </p>
            <button className=" text-red-500">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
