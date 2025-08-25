import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, ArrowRight, User, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LoaderOne } from "@/components/ui/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

export default function Registeration({
  setShowFormModal,
  showFormModal,
  onSuccess,
}) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const learningGoals = [
    "Advance my career",
    "Learn new skills",
    "Change careers",
    "Start a business",
    "Personal development",
    "Academic purposes",
  ];

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    agreeToTerms: false,
    subscribeNewsletter: true,
  });

  //    const handleRegister = async (data) => {
  //    try {
  //      const res = await axios.post(
  //        `${import.meta.env.VITE_API_BACKEND_URL}/api/accounts/register/`,
  //        data,
  //        {
  //          withCredentials: true,
  //          headers: {
  //            "Content-Type": "application/json",
  //          },
  //        }
  //      );
  //      onSubmit(data)
  //      console.log(res.data);
  //    } catch (err) {
  //      console.error("Registration failed:", err);
  //    }
  //  };
  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("registration attempted at form", data);
    reset();
    if (showFormModal) {
      setShowFormModal();
    }
    if (onSuccess) {
      onSuccess();
    }
    console.log(onSuccess);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                {...register("firstName", {
                  required: "First name is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                  maxLength: { value: 10, message: "Max 10 characters" },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Only alphabets allowed",
                  },
                })}
                id="firstName"
                type="text"
                placeholder="John"
                className="pl-10 cursor-pointer"
              />
            </div>
            {errors.firstName && (
              <p className="text-xs text-red-500">
                {errors.firstName.message as string}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              {...register("lastName", {
                required: "Last name is required",
                minLength: { value: 3, message: "At least 3 characters" },
                maxLength: { value: 15, message: "Max 15 characters" },
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Only alphabets allowed",
                },
              })}
              id="lastName"
              type="text"
              placeholder="Doe"
              className="pl-10 cursor-pointer"
            />
            {errors.lastName && (
              <p className="text-xs text-red-500">
                {errors.lastName.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
              id="email"
              type="email"
              placeholder="john@example.com"
              className="pl-10 cursor-pointer"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500">
              {errors.email.message as string}
            </p>
          )}
        </div>

        <Controller
          name="learningGoal"
          control={control}
          rules={{
            required: { value: true, message: "This Field is Required" },
          }}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="cursor-pointer">
                <SelectValue placeholder="What's your main goal?" />
              </SelectTrigger>
              <SelectContent>
                {learningGoals.map((goal) => (
                  <SelectItem
                    key={goal}
                    value={goal}
                    className="cursor-pointer"
                  >
                    {goal}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$&])[A-Za-z\d@$&]{6,10}$/,
                  message:
                    "Must include uppercase, lowercase, number & special char",
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="pl-10 pr-10 cursor-pointer"
            />
            <button
              type="button"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500">
              {errors.password.message as string}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: "Please re-enter password",
              validate: (val) =>
                val === watch("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">
              {errors.confirmPassword.message as string}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  agreeToTerms: checked as boolean,
                })
              }
              className="cursor-pointer"
            />
            <Label htmlFor="terms" className="text-sm cursor-pointer">
              I agree to the{" "}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              checked={formData.subscribeNewsletter}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  subscribeNewsletter: checked as boolean,
                })
              }
              className="cursor-pointer"
            />
            <Label htmlFor="newsletter" className="text-sm cursor-pointer">
              Subscribe to our newsletter for learning tips and updates
            </Label>
          </div>
        </div>
        <div className="mt-3 text-center bg-white">
          <Button
            type="submit"
            disabled={!formData.agreeToTerms}
            className={` ${
              isSubmitting
                ? "my-3 text-xs bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent"
                : "w-full outline-none p-2 rounded-md text-white font-semibold my-3 cursor-pointer flex items-center justify-center hover:scale-100"
            }`}
          >
            {isSubmitting ? (
              <LoaderOne />
            ) : (
              <>
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-all duration-200" />
              </>
            )}
          </Button>
        </div>
      </form>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-primary hover:underline cursor-pointer font-medium"
        >
          Sign in
        </Link>
      </div>
    </>
  );
}
