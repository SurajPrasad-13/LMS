import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FilePlus2 } from "lucide-react";
import {useAuth} from '../Context/AuthContext'


export default function ScheduleForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const {user} = useAuth()
  const navigate = useNavigate();
  const AddSchedule = async (data) => {
    try {
      // Convert datetime-local (which is just "YYYY-MM-DDTHH:MM") into full ISO string
      const payload = {
        ...data,
        start_time: new Date(data.start_time).toISOString(),
        end_time: new Date(data.end_time).toISOString(),
        reminder_time: data.reminder_time
          ? new Date(data.reminder_time).toISOString()
          : null,
      };
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/schedule/schedules/`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.access}`, // 🔑 attach access
        },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error("failed to add schedule:", errorData);
        return;
      }
      const result = await response.json();
      console.log("API Response:", result);
      reset();
      toast.success("Schedule Added Successfully", {
        icon: <FilePlus2 className="text-green-600" />,
        className: "text-green-500", // your custom icon here
      });
      navigate("/dashboard/schedule");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-orange-200/80 to-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Create Schedule</h2>
      <form onSubmit={handleSubmit(AddSchedule)} className="space-y-4 ">
        {/* Title */}
        <div>
          <label className="block text-sm mb-1">Title</label>
          <Input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="border p-2 w-full"
            placeholder="Schedule Title"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message as string}</p>
          )}
        </div>

        {/* Course */}
        <div>
          <label className="block text-sm mb-1">Course</label>
          <Input
            type="text"
            {...register("course", { required: true })}
            className="border p-2 w-full"
            placeholder="Course name"
          />
        </div>

        {/* Instructor */}
        <div>
          <label className="block text-sm mb-1">Instructor</label>
          <Input
            type="text"
            {...register("instructor")}
            className="border p-2 w-full"
            placeholder="Instructor name"
          />
        </div>

        {/* Location, Participants */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Location */}
          <div>
            <label className="block text-sm mb-1">Location</label>
            <Input
              type="text"
              {...register("location")}
              className="border p-2 w-full"
            />
          </div>
          {/* Participants */}
          <div>
            <label className="block text-sm mb-1">Participants</label>
            <Input
              type="number"
              {...register("participants", { valueAsNumber: true })}
              className="border p-2 w-full"
            />
          </div>
        </div>

        {/* Start Time, End time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Start Time */}
          <div>
            <label className="block text-sm mb-1">Start Time</label>
            <Input
              type="datetime-local"
              {...register("start_time", { required: true })}
              className="border p-2 w-full"
            />
          </div>

          {/* End Time */}
          <div>
            <label className="block text-sm mb-1">End Time</label>
            <Input
              type="datetime-local"
              {...register("end_time", { required: true })}
              className="border p-2 w-full"
            />
          </div>
        </div>

        {/* Reminder, Reminder Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Reminder */}
          <div>
            <label className="block text-sm mb-1">Reminder</label>
            <Input
              type="text"
              {...register("reminder")}
              placeholder="e.g. 15 minutes before"
              className="border p-2 w-full"
            />
          </div>

          {/* Reminder Time */}
          <div>
            <label className="block text-sm mb-1">Reminder Time</label>
            <Input
              type="datetime-local"
              {...register("reminder_time")}
              className="border p-2 w-full"
            />
          </div>
        </div>

        {/* color, status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Color */}
          <div>
            <label className="block text-sm mb-1">Color</label>
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Select Colour" />
                  </SelectTrigger>
                  <SelectContent>
                    {["bg-blue-500", "bg-red-500", "bg-purple-500", "bg-green-500", "bg-yellow-500", "bg-orange-500"].map(
                      (clr) => (
                        <SelectItem key={clr} value={clr}>
                          {clr.charAt(3).toUpperCase() + clr.slice(4,-4)}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm mb-1">Status</label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Confirmed", "Pending"].map((clr) => (
                      <SelectItem key={clr} value={clr}>
                        {clr.charAt(0).toUpperCase() + clr.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {/* Type */}
          <div>
            <label className="block text-sm mb-1">Type</label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "exam",
                      "meeting",
                      "study-group",
                      "workshop",
                      "assignment",
                      "live-session",
                    ].map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm mb-1">Description</label>
          <Textarea
            {...register("description")}
            className="border p-2 w-full h-16"
          />
        </div>

        {/* Submit */}
        <div className="flex items-center justify-center">
          <Button type="submit" className=" text-white px-12 py-2 ">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
