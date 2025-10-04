import React, { useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { SquarePen } from "lucide-react";
import {useAuth}  from '../Context/AuthContext'

type AchievementFormData = {
  user: string;
  earned_on: string | null;
  title: string;
  description: string;
  category: string;
  points: number;
  rarity: string;
  is_unlocked: boolean; // boolean instead of string
  progress: number;
  requirement: string;
  unlocked_date: string | null;
};

const EditAchievements = () => {
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
      is_unlocked: false, // boolean default
      progress: 0,
      requirement: "",
      unlocked_date: null,
    },
  });

  const [fileName, setFileName] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const url = `${
    import.meta.env.VITE_API_BACKEND_URL
  }/api/achievements/achievements/${id}/`;

  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return "";
    // Convert to datetime-local format (YYYY-MM-DDTHH:mm)
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

  // Get data
  const getAchievementData = async () => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${user?.access}`,
        },
      });
      if (!response.ok) {
        throw new Error(
          `Failed to fetch Achievement Status: ${response.status}`
        );
      }
      const result = await response.json();
      reset({
        ...result,
        earned_on: formatDateForInput(result.earned_on),
        unlocked_date: formatDateForInput(result.unlocked_date),
      });
      console.log("Fetched Achievement data:", result);
    } catch (error) {
      console.error("Error fetching Achievement data:", error);
    }
  };

  const updateAchievement = async (data: AchievementFormData) => {
    console.log("Form data:", data);

    // Convert datetime-local to ISO format if provided
    if (data.unlocked_date) {
      const date = new Date(data.unlocked_date);
      data.unlocked_date = date.toISOString();
    } else {
      data.unlocked_date = null as any;
    }

    if (data.earned_on) {
      const date = new Date(data.earned_on);
      data.earned_on = date.toISOString();
    } else {
      data.earned_on = null as any;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/achievements/achievements/${id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.access}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error("Update failed:", result);
        return;
      }

      console.log("Updated Achievement:", result);
      toast.success("Achievement Updated Successfully", {
        icon: <SquarePen className="text-green-600" />,
        className: "text-green-600",
      });
      reset();
      setFileName(null);
      navigate("/dashboard/achievements");
    } catch (error) {
      console.error("Error in updating achievements:", error);
    }
  };

  useEffect(() => {
    getAchievementData();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-orange-200/80 to-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Edit Achievement</h2>
      <form onSubmit={handleSubmit(updateAchievement)} className="space-y-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* User */}
          <div>
            <label className="block font-medium mb-1">User</label>
            <Input {...register("user")} placeholder="User ID" />
            {errors.user && (
              <p className="text-red-500 text-sm">User is required</p>
            )}
          </div>
        </div>

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
            placeholder="Achievement description"
          />
        </div>

        {/* Points, Progress */}
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
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditAchievements;