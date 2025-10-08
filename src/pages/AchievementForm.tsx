import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "react-toastify";
import { FilePlus2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {useAuth} from '../Context/AuthContext'

type AchievementFormData = {
  user: string;
  earned_on: string | null;
  title: string;
  description: string;
  category: string;
  points: number;
  rarity: string;
  is_unlocked: boolean; // "true" | "false"
  progress: number;
  requirement: string;
  unlocked_date: string | null;
};

export default function AchievementForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AchievementFormData>({
    defaultValues: {
      user: "",
      earned_on: null,
      title: "",
      description: "",
      category: "",
      points: 0,
      rarity: "",
      is_unlocked: false,
      progress: 0,
      requirement: "",
      unlocked_date: null,
    },
  });

  const {user} = useAuth()

  const [fileName, setFileName] = useState<string | null>(null);
  const navigate = useNavigate();
  // const onSubmit = async (data: AchievementFormData) => {
  //   console.log("Form data:", data);

  //   try {
  //     const formData = new FormData();

  //     // Object.entries(data).forEach(([key, value]) => {
  //     //   if (key === "icon" && value instanceof FileList && value.length > 0) {
  //     //     formData.append("icon", value[0]); // only one file
  //     //   } else {
  //     //     formData.append(key, String(value));
  //     //   }
  //     // });

  //     const response = await fetch(
  //       `${
  //         import.meta.env.VITE_API_BACKEND_URL
  //       }/api/achievements/achievements/`,
  //       {
  //         method: "POST",
  //         body: formData,
  //         headers: {
  //           Authorization: `Bearer ${user?.access}`,
  //         },
  //       }
  //     );
  //     console.log(response);

  //     const result = await response.json();
  //     if (!response.ok) {
  //       console.error("Failed to Add Achievement: ", result);
  //       return;
  //     }
  //     console.log("API Response:", result);
  //     toast.success("Achievement Added Successfully", {
  //       icon: <FilePlus2 className="text-green-600" />,
  //       className: "text-green-500", 
  //     });
  //     reset();
  //     setFileName(null);
  //     navigate("/dashboard/achievements");
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }
  // };

  const onSubmit = async (data: AchievementFormData) => {
  console.log("Form data:", data);


  if (data.unlocked_date) {
  const date = new Date(data.unlocked_date);
  data.unlocked_date = date.toISOString();
} else {
  data.unlocked_date = null as any; // let backend treat it as nullable
}


  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BACKEND_URL}/api/achievements/achievements/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ now correct since no files
          Authorization: `Bearer ${user?.access}`,
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Failed to Add Achievement: ", result);
      return;
    }

    console.log("API Response:", result);
    toast.success("Achievement Added Successfully", {
      icon: <FilePlus2 className="text-green-600" />,
      className: "text-green-500",
    });
    reset();
    setFileName(null);
    navigate("/dashboard/achievements");
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-orange-200/80 to-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Create Assignment</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label className="block font-medium mb-1">Title</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Select Title" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "First Steps",
                      "Quick Learner",
                      "Perfect Score",
                      "Night Owl",
                      "Consistency Master",
                      "Code Warrior",
                      "AI Collaborator",
                      "Community Helper",
                      "Speed Demon",
                      "Knowledge Seeker",
                    ].map((ttl) => (
                      <SelectItem key={ttl} value={ttl}>
                        {ttl.charAt(0).toUpperCase() + ttl.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">Title is required</p>
            )}
          </div>
          {/* Category */}
          <div>
            <label className="block font-medium mb-1">Category</label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "milestone",
                      "speed",
                      "performance",
                      "consistency",
                      "community",
                    ].map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        {/* Requirement */}
        <div>
          <label className="block font-medium mb-1">Requirement</label>
          <Input
            {...register("requirement")}
            placeholder="e.g. Study for 30 consecutive days"
          />
        </div>

        {/* User */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          

          <div>
            <label className="block font-medium mb-1">User</label>
            <Input {...register("user")} placeholder="User ID" />
            {errors.user && (
              <p className="text-red-500 text-sm">User is required</p>
            )}
          </div>
        </div> */}

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Earned On */}
          <div>
            <label className="block font-medium mb-1">Earned On</label>
            <Input type="datetime-local" {...register("earned_on")} />
          </div>
          {/* Unlocked Date */}
          <div>
            <label className="block font-medium mb-1">Unlocked Date</label>
            <Input type="datetime-local" {...register("unlocked_date")} />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <Textarea
            {...register("description")}
            placeholder="Assignment description"
          />
        </div>

        {/* Points,Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Points */}
          <div>
            <label className="block font-medium mb-1">Points</label>
            <Input type="number" {...register("points")} />
          </div>
          {/* Progress */}
          <div>
            <label className="block font-medium mb-1">Progress</label>
            <Input type="number" {...register("progress")} />
          </div>
        </div>

        {/* Rarity, Is Unlocked */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Rarity */}
          <div>
            <label className="block font-medium mb-1">Rarity</label>
            <Controller
              name="rarity"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Select Rarity" />
                  </SelectTrigger>
                  <SelectContent>
                    {["common", "rare", "epic", "legendary", "uncommon"].map(
                      (r) => (
                        <SelectItem key={r} value={r}>
                          {r.charAt(0).toUpperCase() + r.slice(1)}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Is Unlocked */}
          <div>
            <label className="block font-medium mb-1">Is Unlocked</label>
            <Controller
              name="is_unlocked"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value ? "true" : "false"}
                  onValueChange={(val) => field.onChange(val === "true")}
                >
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">True</SelectItem>
                    <SelectItem value="false">False</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button type="submit" className="px-8 py-2 rounded">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
