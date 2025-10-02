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
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Bounce, Slide, toast, ToastContainer } from "react-toastify";
import {useAuth} from '../Context/AuthContext'

function CourseForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const {user} = useAuth()

  // Add course
  const addCourse = async (data) => {
    try {
      const formData = new FormData();

      // Append normal fields
      formData.append("title", data.title);
      formData.append("instructor", data.instructor || "");
      formData.append("level", data.level || "");
      formData.append("duration_minutes", data.duration_minutes || "");
      formData.append("price", data.price || "");
      formData.append("description", data.description || "");
      formData.append("category", data.category || "");
      formData.append("next_lesson", data.next_lesson || "");
      formData.append("completed_lesson", data.completed_lesson ?? 0);
      formData.append("total_lessons", data.total_lessons ?? 0);
      formData.append("ai_assisted", data.ai_assisted ? "true" : "false");

      // Append skills as JSON string
      if (Array.isArray(data.skills)) {
        formData.append("skills", JSON.stringify(data.skills));
      } else {
        formData.append("skills", JSON.stringify([]));
      }

      // // Append file if present
      // if (data.thumbnail && data.thumbnail[0]) {
      //   formData.append("thumbnail", data.thumbnail[0]);
      // }

      let response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/courses/courses/`,
        {
          method: "POST",
          body: formData,
          headers: {
          Authorization: `Bearer ${user?.access}`, // 🔑 attach access
        },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("failed to add Course: ", errorData);
        return;
      }
      toast.success("Course Added Successfully");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      let result = await response.json();
      console.log("Course created:", result);

      navigate("/dashboard/my-courses");
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-orange-200/80 to-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">AddCourse</h2>
      <form onSubmit={handleSubmit(addCourse)} className="space-y-4">
        {/* Title */}
        <div className="grid grid-cols-1  gap-4">
          {/* title */}
          <div>
            <label className="block font-medium">Title</label>
            <Input
              {...register("title", { required: "Title is required" })}
              className="w-full p-2  "
            />
            {errors.title && (
              <p className="text-red-500 text-sm">
                {errors.title.message as string}
              </p>
            )}
          </div>

        </div>

{/* Skills */}
        <div>
          <label className="block font-medium">Skills</label>
          <Controller
            name="skills"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Input
                {...field}
                value={Array.isArray(field.value) ? field.value.join(",") : ""}
                onChange={(e) => {
                  const arr = e.target.value.split(",");
                  const last = arr.pop() || "";
                  const processed = arr.map((s) => s.trim()).filter(Boolean);
                  field.onChange([...processed, last]);
                }}
                className="flex-1 p-2 border "
              />
            )}
          />
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
              className="w-full p-2 border "
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
              className="w-full p-2 border "
            />
          </div>

          {/* Thumbnail */}
          {/* <div>
            <label className="block font-medium">Thumbnail</label>
            <Input
              type="file"
              {...register("thumbnail")}
              className="w-full p-2 border "
            />
          </div> */}
        </div>

        
        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            {...register("description", { required: true })}
            className="w-full border -md px-3 py-2 h-16"
          />
        </div>

        {/* Duration, level, price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Duration */}
          <div>
            <label className="block font-medium">Duration (Weeks)</label>
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
                Please select Course duration
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
              className="w-full p-2 border "
            />
          </div>
          <div>
            <label className="block font-medium">Completed Lessons</label>
            <Input
              type="number"
              {...register("completed_lesson", { min: 0 })}
              className="w-full p-2 border "
            />
          </div>
          <div>
            <label className="block font-medium">Total Lessons</label>
            <Input
              type="number"
              {...register("total_lessons", { min: 0 })}
              className="w-full p-2 border "
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Price */}
          <div>
            <label className="block font-medium">Price</label>
            <Input
              {...register("price", { required: true })}
              className="w-full p-2 border "
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
                : " outline-none p-2 px-16 -md text-white font-semibold my-3 cursor-pointer flex items-center justify-center hover:scale-100 text-lg "
            } `}
          >
            {isSubmitting ? <LoaderOne /> : "Submit"}
          </Button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </div>
  );
}

export default CourseForm;
