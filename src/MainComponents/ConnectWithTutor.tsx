import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { LoaderOne } from "@/components/ui/loader";

export default function ConnectWithTutor({ setShowFormModal,onSuccess }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const submit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("form data submitted with", data);
    reset();
    setShowFormModal(false);
    onSuccess()
  };

  return (
    <>
      <div className="  md:py-10 w-full max-w-5xl flex flex-col md:flex-row gap-4">
        {/* Left Side */}
        <div className="flex-1">
          <h1 className=" text-2xl sm:text-3xl md:text-4xl text-orange-500 mb-1 md:mb-3">
            Get in Touch
          </h1>
          <p className="md:text-lg text-orange-400 mb-1 md:mb-3 font-medium">
            We’d like to hear from you!
          </p>
          <p className="text-gray-600 text-sm md:text-[16px] mb-2 sm:mb-4 md:mb-6">
            If you have any inquiries or just want to connect with our Tutor,
            please use the contact form!
          </p>

          {/* Email */}
          <div className="flex items-center justify-start gap-1">
            <Mail className="text-orange-400 size-5" />
            <a
              href="mailto:yukaidu.doralice@gmail.com"
              className="text-orange-400 underline"
            >
              sudotechlabs@gmail.com
            </a>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="flex-1 ">
          <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
            <div className="w-auto">
              <input
                type="text"
                {...register("name", {
                  required: "Please Enter Your name",
                })}
                placeholder="Your Name"
                className="w-full border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:ring-2 ring-offset ring-orange-400"
              />
              {errors.name && (
                <p className="text-sm text-red-600">
                  {errors.name.message as string}{" "}
                </p>
              )}
            </div>
            <input
              type="email"
              {...register("email", {
                required: { value: true, message: "Email is required" },
                pattern: {
                  value: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="Email *"
              className="w-full border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:ring-2 ring-offset ring-orange-400"
            />
            {errors.email && (
              <p className="text-sm text-red-600 -mt-4">
                {errors.email.message as string}{" "}
              </p>
            )}
            <input
              type="tel"
              {...register("phone", {
                required: "Phone Number is required",
                minLength: { value: 10, message: "Enter 10 Digits" },
                maxLength: { value: 10, message: "Enter Only 10 Gigits" },
              })}
              placeholder="Phone Number *"
              className="w-full border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:ring-2 ring-offset ring-orange-400"
            />
            {errors.phone && (
              <p className="text-sm text-red-600 -mt-4">
                {errors.phone.message as string}{" "}
              </p>
            )}
            <textarea
              {...register("message")}
              placeholder="Message"
              rows="2"
              className="w-full border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:ring-2 ring-offset ring-orange-400"
            ></textarea>
            <Button
              type="submit"
              className={` ${
                isSubmitting
                  ? "my-3 text-xs bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent"
                  : "w-full text-lg outline-none p-2 rounded-md text-white font-semibold my-3 cursor-pointer flex items-center justify-center hover:scale-100"
              }`}
            >
              {isSubmitting ? <LoaderOne /> : <>Send</>}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
