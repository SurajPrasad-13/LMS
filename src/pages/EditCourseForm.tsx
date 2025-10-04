import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderOne } from "@/components/ui/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SquarePen } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";
import {useAuth} from '../Context/AuthContext'

function EditCourseForm() {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [skills, setSkills] = useState<any[]>([]);

  const handleChange = (e) => {
    const value = e.target.value;

    const arr = value
      .split(",")
      .map((word) => word.trim()) // extra spaces remove
      .filter((word) => word !== ""); // empty remove

    setSkills(arr);
    setValue("skills", arr); // react-hook-form me array set karo
  };

  const { id } = useParams();
  const {user} = useAuth()

  const url = `${
    import.meta.env.VITE_API_BACKEND_URL
  }/api/courses/courses/${id}/`;

  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const res = await fetch(url,{
        method:'GET',
        headers: {
          Authorization: `Bearer ${user?.access}`, // 🔑 attach access
        },
      });
      console.log(res)
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.status}`);
      }
      const data = await res.json();
      if (data.skills && Array.isArray(data.skills)) {
        setSkills(data.skills);
      }
      reset(data);
      console.log(data)
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [id]);

  const updateCourse = async (data) => {
    const processedData = { ...data };
    const skillsValue = processedData.skills;
    if (typeof skillsValue === "string") {
      processedData.skills = skillsValue
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (!Array.isArray(skillsValue)) {
      processedData.skills = [];
    }

    try {
      let res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(processedData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.access}`, // 🔑 attach access
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Failed to Update course:", errorData);
        return;
      }

     toast.success("Course Updated successfully", {
        icon: <SquarePen className="text-green-600"  />  , 
      });
      // await new Promise((resolve) => setTimeout(resolve, 1500));
      const result = await res.json();
      console.log(result);
      navigate("/dashboard/my-courses");
    } catch (error) {
      console.error("Error in updating course:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-orange-200/80 to-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">AddCourse</h2>
      <form onSubmit={handleSubmit(updateCourse)} className="space-y-4">
        {/* Title, Instructor */}
        <div className="grid grid-cols-1  gap-4">
          {/* title */}
          <div>
            <label className="block font-medium">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              className="w-full p-2 borar rounded"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">
                {errors.title.message as string}
              </p>
            )}
          </div>

        </div>

        {/* Category, Instructor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Instructor */}
          <div>
            <label className="block font-medium">Instructor</label>
            <Input
              {...register("instructor", {
                required: "Instructor name is required",
              })}
              className="w-full p-2 border rounded"
            />
            {errors.instructor && (
              <p className="text-red-500 text-sm">
                {errors.instructor.message as string}
              </p>
            )}
          </div>
          {/* Category */}
          <div>
            <label className="block font-medium">Category</label>
            <Input
              {...register("category", { required: true })}
              className="w-full p-2 border rounded"
            />
          </div>
          

        
        </div>
          <div>
            <label className="block font-medium">Course Status</label>
            {/* <Input              
              {...register("status")}
              className="w-full p-2 border rounded"
            /> */}


            <Controller
              name="status"
              control={control}
              rules={{
                required: { value: true, message: "This Field is Required" },
              }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {["in progress", "wishlist", "completed"].map((duration) => (
                      <SelectItem
                        key={duration}
                        value={duration}
                        className="cursor-pointer"
                      >
                        {duration}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

        {/* Skills */}
        <div>
          <label className="block font-medium">Skills</label>
          <Input
            {...register(`skills`, { required: true })}
            value={skills.join(",")}
            onChange={(e) => {
              const arr = e.target.value.split(",");
              const last = arr.pop() || "";
              const processed = arr.map((s) => s.trim()).filter(Boolean);
              setSkills([...processed, last]);
              setValue("skills", [...processed, last]);
            }}
            className="flex-1 p-2 border rounded"
          />
        </div>
        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full border rounded-md px-3 py-2 h-16"
          />
        </div>

        {/* Duration, level, price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Duration */}
          <div>
            <label className="block font-medium">Duration (weeks)</label>
            <Controller
              name="duration_minutes"
              control={control}
              rules={{
                required: { value: true, message: "This Field is Required" },
              }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Duration in weeks" />
                  </SelectTrigger>
                  <SelectContent>
                    {["2", "4", "8", "12", "16", "20", "24"].map((duration) => (
                      <SelectItem
                        key={duration}
                        value={duration}
                        className="cursor-pointer"
                      >
                        {duration}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.duration_minutes && (
              <p className="text-red-500 text-sm">
                Duration must be at least 1 minute
              </p>
            )}
          </div>
          {/* Level */}
          <div>
            <label className="block font-medium">Level</label>
            <Controller
              name="level"
              control={control}
              rules={{
                required: { value: true, message: "This Field is Required" },
              }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Beginner", "Intermediate", "Advanced"].map((level) => (
                      <SelectItem
                        key={level}
                        value={level}
                        className="cursor-pointer"
                      >
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {errors.level && (
              <p className="text-red-500 text-sm">
                {errors.level.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Lessons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium">Next Lesson</label>
            <Input
              {...register("next_lesson")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Completed Lessons</label>
            <Input
              type="number"
              {...register("completed_lesson", { min: 0 })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Total Lessons</label>
            <Input
              type="number"
              {...register("total_lessons", { min: 0 })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Price */}
          <div>
            <label className="block font-medium">Price</label>
            <Input
              {...register("price", { required: true })}
              className="w-full p-2 border rounded"
              placeholder="Course Price "
            />
          </div>
          <div className="flex items-center justify-start gap-4">
            <label htmlFor="aiAssist" className="block">
              This Course Is Ai-Assisted
            </label>
            <input
              {...register("ai_assisted")}
              id="aiAssist"
              type="checkbox"
              className="p-4 size-4 block"
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Button
            type="submit"
            className={`${
              isSubmitting
                ? "bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent my-3 text-xs "
                : " outline-none p-2 px-16 rounded-md text-white font-semibold my-3 cursor-pointer flex items-center justify-center hover:scale-100 text-lg "
            } `}
          >
            {isSubmitting ? <LoaderOne /> : "Submit"}
          </Button>
        </div>
      </form>
      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      /> */}
    </div>
  );
}

export default EditCourseForm;
