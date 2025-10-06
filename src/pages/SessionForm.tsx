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
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Slide, toast,  } from "react-toastify";
import { useAuth } from "../Context/AuthContext";

export default function SessionForm({ onSubmit }) {

  const location = useLocation()
  const {courseId,coursetitle} = location.state  || {};

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm({
    defaultValues: {
      title: coursetitle,
      content: "",
      start_time: "",
      end_time: "",
      recording_url: "",
      user: "",
      instructor: "",
      instructor_avatar: "",
      duration: "",
      participants: 0,
      max_participants: 0,
      ratings: 0,
      status: "",
      course_title: "",
      difficulty: "",
      topics: [],
      meeting_list: [{ date: "", time: "", topic: "" }],
      description: "",
      course: courseId
    },
  });

  const navigate = useNavigate();
  const { user } = useAuth();

  const addSession = async (data) => {
    console.log(data);
    try {
      let response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/sessions/sessions/`,
        {
          method: "POST", // use POST for creating new session
          headers: {
            "Content-Type": "application/json",
            Authorization: user?.access ? `Bearer ${user?.access}` : "",
          },
          body: JSON.stringify(data), // convert JS object to JSON string
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success("Session Added Successfully");
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("session response: ", response);
      let result = await response.json();
      console.log("Session created and the data is:", result);

      navigate("/dashboard/sessions");
      return result;
    } catch (error) {
      console.error("Error creating Session:", error);
    }
  };

  return (
    <div className="group max-w-[600px] mx-auto p-6 bg-gradient-to-br from-orange-200/80 to-white  rounded-2xl shadow transition-all duration-200 hover:shadow-2xl hover:-translate-y-3 mb-20 mt-4">
      <h2 className=" transition-all duration-200 group-hover:-translate-y-1 h-9 text-2xl font-semibold mb-4">
        Create Session
      </h2>
      <form onSubmit={handleSubmit(addSession)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input
            {...register("title", { required: "Title required" })}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        {/* Topics */}
        <div>
          <label className="block text-sm font-medium mb-1">Topics</label>
          <Controller
            name="topics"
            control={control}
            rules={{ required: "Topics are required" }}
            render={({ field }) => (
              <Input
                {...field}
                value={
                  Array.isArray(field.value)
                    ? field.value.join(", ")
                    : field.value
                }
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                className="w-full border rounded-md px-3 py-2"
              />
            )}
          />
          {errors.topics && (
            <p className="text-sm text-red-500">{errors.topics.message}</p>
          )}
        </div>
        {/* Start / End time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Time</label>
            <Input
              type="datetime-local"
              {...register("start_time", { required: true })}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Time</label>
            <Input
              type="datetime-local"
              {...register("end_time", { required: true })}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
        </div>
        {/* Instructor and Avatar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Instructor</label>
            <Input
              {...register("instructor", { required: true })}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          {/* Recording URL */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Recording URL
            </label>
            <Input
              type="url"
              {...register("recording_url")}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
        </div>
        {/* Duration */}
        {/* Participants */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Duration</label>
            <Input
              {...register("duration", { required: true })}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Max Participants
            </label>
            <Input
              type="number"
              {...register("max_participants", { required: true, min: 1 })}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
        </div>
        {/* Status, Course Title, Difficulty */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <Controller
              name="status"
              control={control}
              rules={{
                required: { value: true, message: "This Field is Required" },
              }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {["live", "scheduled", "starting soon", "recorded"].map(
                      (duration) => (
                        <SelectItem
                          key={duration}
                          value={duration}
                          className="cursor-pointer"
                        >
                          {duration}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Course Title
            </label>
            <Input
              {...register("course_title", { required: true })}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Difficulty</label>
            <Controller
              name="difficulty"
              control={control}
              rules={{
                required: { value: true, message: "This Field is Required" },
              }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Beginner", "intermediate", "advance"].map(
                      (difficulty) => (
                        <SelectItem
                          key={difficulty}
                          value={difficulty}
                          className="cursor-pointer"
                        >
                          {difficulty}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        {/* Meeting List (first item only for simplicity) */}
        <div>
          <h3 className="text-lg font-semibold">First Meeting</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Date"
              type="date"
              {...register("meeting_list.0.date", { required: true })}
              className="w-full border rounded-md px-3 py-2"
            />
            <Input
              placeholder="Time"
              type="time"
              {...register("meeting_list.0.time", { required: true })}
              className="w-full border rounded-md px-3 py-2"
            />
            <Input
              placeholder="Topic"
              {...register("meeting_list.0.topic", { required: true })}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
        </div>
        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            {...register("description", { required: true })}
            className="w-full border rounded-md px-3 py-2 h-24"
          />
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
        </div>{" "}
      </form>
    </div>
  );
}
