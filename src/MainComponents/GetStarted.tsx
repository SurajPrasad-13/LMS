import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { LoaderOne } from "@/components/ui/loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ToastContainer, toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Brain,
  Rocket,
  Shield,
  Gift,
} from "lucide-react";

const GetStarted = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    learningGoal: "",
    agreeToTerms: false,
    subscribeNewsletter: true,
  });

  const learningGoals = [
    "Advance my career",
    "Learn new skills",
    "Change careers",
    "Start a business",
    "Personal development",
    "Academic purposes",
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Personalized curriculum based on your goals",
    },
    {
      icon: Rocket,
      title: "Fast-Track Progress",
      description: "Learn 3x faster with adaptive technology",
    },
    {
      icon: Shield,
      title: "Industry Certification",
      description: "Earn recognized certificates",
    },
    {
      icon: Gift,
      title: "Free Trial",
      description: "7-day free access to premium features",
    },
  ];
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const notify = () =>
    toast.success("🦄 Wow so easy!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    });

  const handleSignUp = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Sign up attempted with:", data);
    notify();
    reset();
  };

  return (
    <div className="min-h-screen flex pt-10">
      {/* Left Side - Features */}
      <div className="flex-1 bg-gradient-to-br from-orange-100/50 to-yellow-100/50 p-8 hidden lg:flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <Badge className="mb-6 bg-white/50 border-gray-300 text-black hover:text-white">
            <Gift className="w-4 h-4 mr-2" />
            7-Day Free Trial
          </Badge>

          <h2 className="text-3xl font-bold mb-6">
            Start Your AI-Enhanced Learning Journey Today
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            Join over 50,000 students who are transforming their careers with
            personalized AI-powered education.
          </p>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-learning flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-white/50 rounded-2xl backdrop-blur-sm border border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">95%</div>
              <div className="text-sm text-muted-foreground">
                of our students report career advancement within 6 months
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md interactive-card">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-learning flex items-center justify-center">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Create Your Account
            </CardTitle>
            <CardDescription>
              Start your personalized learning journey in minutes
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
              {/* Full Name */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...register("firstName", {
                        required: {
                          value: true,
                          message: "FirstName is Required",
                        },
                        minLength: {
                          value: 2,
                          message: "Enter More than Two Characters",
                        },
                        maxLength: {
                          value: 10,
                          message: "Enter less then 10 characters ",
                        },
                        pattern: {
                          value: /^[a-zA-Z][a-zA-Z0]{1,11}$/,
                          message:
                            "firstName must be 2-10 characters, and contain only letters",
                        },
                      })}
                      id="firstName"
                      type="text"
                      placeholder="John"
                      className="pl-10 cursor-pointer"
                    />
                    {errors.firstName && (
                      <p className="text-xs my-2 text-red-500">
                        {errors.firstName.message as string}{" "}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    {...register("lastName", {
                      required: {
                        value: true,
                        message: "LastName is Required",
                      },
                      minLength: {
                        value: 3,
                        message: "Enter More than Three Characters",
                      },
                      maxLength: {
                        value: 15,
                        message: "Enter less then 15 characters ",
                      },
                      pattern: {
                        value: /^[a-zA-Z][a-zA-Z0]{1,15}$/,
                        message:
                          "lastName must be 3-15 characters, and contain only letters",
                      },
                    })}
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    className="pl-10 cursor-pointer"
                  />
                  {errors.lastName && (
                    <p className="text-xs mb-2 text-red-500">
                      {errors.lastName.message as string}{" "}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    {...register("email", {
                      required: {
                        value: true,
                        message: "email is Required",
                      },
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
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
                  <p className="text-xs mb-2 text-red-500">
                    {errors.email.message as string}{" "}
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
                      required: {
                        value: true,
                        message: "Password is Required",
                      },
                      minLength: {
                        value: 5,
                        message: "Enter More Than 5 Characters",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$&])[A-Za-z\d@$&]{6,10}$/,
                        message:
                          "Password must be include uppercase, lowercase, number, and special character",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 cursor-pointer"
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 h-full px-3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                  {errors.password && (
                    <p className="text-xs text-red-500">
                      {" "}
                      {errors.password.message as string}
                    </p>
                  )}
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  {...register("confirmPassword", {
                    required: "Please re-enter password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  className="cursor-pointer"
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm">
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
                    <Link
                      to="/privacy"
                      className="text-primary hover:underline"
                    >
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
                  <Label
                    htmlFor="newsletter"
                    className="text-sm cursor-pointer"
                  >
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

            {/* Sign Up with Google Or Facebook */}
            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or sign up with
                </span>
              </div>
            </div> */}

            {/* <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="btn-interactive">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button variant="outline" className="btn-interactive">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div> */}

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline cursor-pointer font-medium"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition={Slide}
      />
    </div>
  );
};

export default GetStarted;
