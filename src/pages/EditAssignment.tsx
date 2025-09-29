import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { stringify } from "querystring";
import { toast } from "react-toastify";
import { SquarePen, ThumbsUp } from "lucide-react";
import { FcDeleteDatabase } from "react-icons/fc";

export default function EditAssignment() {
  type FormData = {
    title: string;
    instructor: string;
    status: string;
    priority: string;
    points: number;
    earned_points: number;
    type: string;
    requirements: string[];
    time_estimate: string;
    ai_hints: string[];
    feed_back: string;
    submission_format: string;
    description: string;
    due_date: string;
    sumbitted_date: string;
    attachment: FileList | null;
    slug: string;
    course: number;
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      instructor: "",
      status: "",
      priority: "",
      points: 0,
      earned_points: 0,
      type: "",
      requirements: [""],
      time_estimate: "",
      ai_hints: [""],
      feed_back: "",
      submission_format: "",
      description: "",
      due_date: "",
      sumbitted_date: "",
      attachment: null,
      slug: "",
      course: 0,
    },
  });

  // Field arrays for requirements & AI hints
  const {
    fields: reqFields,
    append: addRequirement,
    remove: removeRequirement,
  } = useFieldArray({ control, name: "requirements" });

  const {
    fields: hintFields,
    append: addHint,
    remove: removeHint,
  } = useFieldArray({ control, name: "ai_hints" });

  // For previewing multiple file names
  const [fileNames, setFileNames] = useState<string[]>([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const url = `${
    import.meta.env.VITE_API_BACKEND_URL
  }/api/assignments/assignments/${id}/`;
  // get Assignment Data
  const getAssignment = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch Assignment Status:${response.status}`);
      }
      const result = await response.json();
      result.due_date = result.due_date.slice(0,16)
    result.sumbitted_date = result.sumbitted_date.slice(0,16)
      reset(result);
      console.log("Fetched assignment data:", result);
    } catch (error) {
      console.error("Error fetching assignment data:", error);
    }
  };

  const updateAssignment = async (data: Record<string, any>) => {
    try {
      const formData = new FormData();

      // Build FormData from data object
      Object.entries(data).forEach(([key, value]) => {
        if (
          key === "attachment" &&
          value instanceof FileList &&
          value.length > 0
        ) {
          Array.from(value).forEach((file) => formData.append(key, file)); // multiple files
        } else if (key === "requirements" || key === "ai_hints") {
          formData.append(key, JSON.stringify(value)); // if backend expects JSON
        } else if (value !== null && value !== undefined) {
          formData.append(key, String(value));
        }
      });

      const response = await fetch(url, {
        method: "PATCH",
        body: formData,        
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Update failed:", result);
        return;
      }

      toast.success("Assignment Updated successfully", {
        icon: <SquarePen className="text-green-600" />,
      });
      console.log("Updated Assignment:", result);
      navigate("/dashboard/assignments");
    } catch (error) {
      console.error("Error in updating Assignment:", error);
    }
  };

  useEffect(() => {
    if (id) getAssignment();
  }, [id]);

  return (
    <div className="group max-w-[600px] mx-auto p-6 bg-gradient-to-br from-orange-200/80 to-white  rounded-2xl shadow transition-all duration-200 hover:shadow-2xl hover:-translate-y-3 mb-20 mt-4">
      <h2 className="text-2xl font-bold mb-4">Edit Assignment</h2>
      <form
        onSubmit={handleSubmit(updateAssignment)}
        className="max-w-2xl mx-auto p-4 space-y-4"
      >
        <div>
          <label className="block text-sm md:text-[16px] font-medium mb-1">
            Title
          </label>
          <Input
            {...register("title", { required: "Title is required" })}
            placeholder="Assinment Title"
            className=" "
            readOnly
          />
          {errors.title && (
            <p className="text-red-500 text-sm">
              {errors.title.message as string}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm md:text-[16px] font-medium mb-1">
            Instructor
          </label>
          <Input
            {...register("instructor")}
            placeholder="Instructor name"
            className=" "
          />
        </div>

        {/* Status, Priority */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Status */}

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
                    {["upcoming", "late", "pending", "graded", "submitted"].map(
                      (priority) => (
                        <SelectItem
                          key={priority}
                          value={priority}
                          className="cursor-pointer"
                        >
                          {priority}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && (
              <p className="text-red-500 text-sm">
                {errors.status.message as string}
              </p>
            )}
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <Controller
              name="priority"
              control={control}
              rules={{
                required: { value: true, message: "This Field is Required" },
              }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {["low", "medium", "high"].map((priority) => (
                      <SelectItem
                        key={priority}
                        value={priority}
                        className="cursor-pointer"
                      >
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.priority && (
              <p className="text-red-500 text-sm">
                {errors.priority.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Requirements */}
        <div>
          <label className="block font-medium">Requirements</label>
          {reqFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <Input
                {...register(`requirements.${index}`)}
                placeholder={`Requirement ${index + 1}`}
                // className="border p-2 flex-1 rounded"
              />
              <button
                type="button"
                onClick={() => removeRequirement(index)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addRequirement("")}
            className="text-orange-500"
          >
            + Add Requirement
          </button>
        </div>

        {/* AI Hints */}
        <div>
          <label className="block font-medium">AI Hints</label>
          {hintFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <Input
                {...register(`ai_hints.${index}`)}
                placeholder={`AI Hint ${index + 1}`}
                // className="border p-2 flex-1 rounded"
              />
              <button
                type="button"
                onClick={() => removeHint(index)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addHint("")}
            className="text-orange-500"
          >
            + Add Hint
          </button>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="">
            <label className="block text-sm md:text-[16px] font-medium mb-1">
              Due Date
            </label>

            <Input
              type="datetime-local"
              {...register("due_date")}
              className=" "
            />
          </div>
          <div className="">
            <label className="block text-sm md:text-[16px] font-medium mb-1">
              Submitted Date
            </label>

            <Input
              type="datetime-local"
              {...register("sumbitted_date")}
              className=" "
            />
          </div>
        </div>

        {/* Estimated time, Submissioin Formate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="">
            <label className="block text-sm md:text-[16px] font-medium mb-1">
              Estimate Time (hours)
            </label>
            <Input {...register("time_estimate")} className=" " />
          </div>
          <div className="">
            <label className="block text-sm font-medium mb-1">Type</label>
            <Controller
              name="type"
              control={control}
              rules={{
                required: { value: true, message: "This Field is Required" },
              }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Design",
                      "Project",
                      "Implementation",
                      "Analysis",
                      "Research",
                    ].map((type) => (
                      <SelectItem
                        key={type}
                        value={type}
                        className="cursor-pointer"
                      >
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        {/* File */}
        <div>
          <label className="block text-sm md:text-[16px] font-medium mb-1">
            Upload Files
          </label>
          <Controller
            name="attachment"
            control={control}
            render={({ field }) => (
              <Input
                type="file"
                multiple
                className="border p-2 w-full rounded"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files) {
                    field.onChange(files); // ✅ update RHF value
                    setFileNames(Array.from(files).map((file) => file.name));
                  }
                }}
              />
            )}
          />

          {/* File Preview */}
          {fileNames.length > 0 && (
            <ul className="mt-2 text-sm text-gray-600">
              {fileNames.map((name, index) => (
                <li key={index}>📄 {name}</li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="block text-sm md:text-[16px] font-medium mb-1">
            Description
          </label>
          <Textarea {...register("description")} className=" min-h-20 " />
        </div>
        <div className="flex items-center justify-center">
          <Button
            type="submit"
            className=" text-white p-2 px-12 font-semibold rounded "
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
