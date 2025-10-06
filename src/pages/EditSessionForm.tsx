import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthContext";

const EditSessionForm = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      topics: "",
      start_time: "",
      end_time: "",
      instructor: "",
      recording_url: "",
      duration: "",
      max_participants: 1,
      status: "",
      course_title: "",
      difficulty: "",
      meeting_list: [{ date: "", time: "", topic: "" }],
      description: "",
    },
  });

  const { id } = useParams();
  const { user } = useAuth();

  const url = `${
    import.meta.env.VITE_API_BACKEND_URL
  }/api/sessions/sessions/${id}/`;

  const navigate = useNavigate();
  const formatDateTimeLocal = (isoString: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    // Converts to "YYYY-MM-DDTHH:mm"
    return date.toISOString().slice(0, 16);
  };

  const getUserData = async () => {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: user?.access ? `Bearer ${user?.access}` : "",
        },
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.status}`);
      }
      const data = await res.json();
      // Convert ISO datetimes to datetime-local format
      const formattedResult = {
        ...data,
        start_time: formatDateTimeLocal(data.start_time),
        end_time: formatDateTimeLocal(data.end_time),
        reminder_time: data.reminder_time
          ? formatDateTimeLocal(data.reminder_time)
          : "",
      };

      reset(formattedResult);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [id]);

  const updateSession = async (data) => {
    try {
      let res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "content-Type": "application/json",
          Authorization: user?.access ? `Bearer ${user?.access}` : "",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to update course: ${res.status}`);
      }

      toast.success("Session Updated Successfully");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const result = await res.json();
      console.log(result);
      navigate("/dashboard/sessions");
    } catch (error) {
      console.error("Error in updating course:", error);
    }
  };
  return (
    <div>
      <div className="group max-w-[600px] mx-auto p-6 bg-gradient-to-br from-orange-200/80 to-white  rounded-2xl shadow transition-all duration-200 hover:shadow-2xl hover:-translate-y-3 mb-20 mt-4">
        <h2 className=" transition-all duration-200 group-hover:-translate-y-1 h-9 text-2xl font-semibold mb-4">
          Update Your Session
        </h2>
        <form onSubmit={handleSubmit(updateSession)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              {...register("title", { required: "Title required" })}
              className="w-full border rounded-md px-3 py-2"
            />
            {errors.title && (
              <p className="text-sm text-red-500">
                {errors.title.message as string}
              </p>
            )}
          </div>
          {/* Content */}
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
              <p className="text-sm text-red-500">
                {errors.topics.message as string}
              </p>
            )}
          </div>
          {/* Start / End time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Start Time
              </label>
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
          {/* Instructor and Recording URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Instructor
              </label>
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
                {...register("recording_url", { required: true })}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>
          {/* Participants, Duration */}
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
                {...register("max_participants", { min: 1 })}
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
                      {["live", "scheduled", "starting-soon", "recorded"].map(
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
              <label className="block text-sm font-medium mb-1">
                Difficulty
              </label>
              {/* <Input
                {...register("difficulty", { required: true })}
                className="w-full border rounded-md px-3 py-2"
              /> */}

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
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
          </div>
          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <Textarea
              {...register("description", { required: true })}
              className="w-full border rounded-md px-3 py-2 h-24"
            />
          </div>
          <div className="flex items-center justify-center">
            <Button
              type="submit"
              className="bg-gradient-learning text-white px-16 py-2 rounded mt-4"
            >
              Submit
            </Button>
          </div>{" "}
        </form>
      </div>
    </div>
  );
};

export default EditSessionForm;
