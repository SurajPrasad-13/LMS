import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { LoaderOne } from "@/components/ui/loader";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Brain,
  Shield,
  CheckCircle,
  Star,
} from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    setIsLoggedIn(true);
    navigate("/dashboard");
  };
  const [showPass, setshowPass] = useState(false);

  const benefits = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Personalized course recommendations",
    },
    {
      icon: Shield,
      title: "Secure Progress",
      description: "Your learning data is encrypted",
    },
    {
      icon: Star,
      title: "Premium Content",
      description: "Access to exclusive courses",
    },
  ];

  return (
    <div className="min-h-screen flex px-10">
      {/* Left Side - Login Form */}
      <div className=" relative flex-1 flex items-center justify-center p-8 bg-background ">
        <Card className=" absolute top-28 w-full max-w-md hover:scale-105 transition-all duration-200 hover:shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to continue your AI-powered learning journey
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    {...register("username", {
                      required: {
                        value: true,
                        message: "UserName is Required",
                      },
                      minLength: {
                        value: 2,
                        message: "Enter More than Two Characters",
                      },
                      pattern: {
                        value: /^[a-zA-Z][a-zA-Z0]{1,11}$/,
                        message:
                          "Username must be 2-10 characters, and contain only letters",
                      },
                    })}
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    className="pl-10 cursor-pointer "
                  />
                </div>
                {errors.username && (
                  <p className="text-xs mb-2 text-red-500">
                    {errors.username.message as string}{" "}
                  </p>
                )}
              </div>

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
                          "Password must be at least 6 characters long and include uppercase, lowercase, number, and special character",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 cursor-pointer"
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 h-full  px-3 cursor-pointer"
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
                    {" "}
                    {errors.password.message as string}
                  </p>
                )}
              </div>
              <div className="mt-3 text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${
                    isSubmitting
                      ? "bg-white my-3 text-xs "
                      : "w-full outline-none p-2 rounded-md text-white font-semibold my-3 cursor-pointer flex items-center justify-center hover:scale-100 "
                  } `}
                >
                  {isSubmitting ? <LoaderOne /> : "Login"}
                </Button>
              </div>
            </form>

            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link
                to="/get-started"
                className="text-primary hover:underline cursor-pointer font-medium"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Benefits */}
      <div className="flex-1 bg-gradient-to-br from-orange-100/50 to-yellow-100/50 p-8 my-12 hidden lg:flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <Badge className="mb-3 border bg-white/50 text-black border-gray-300 hover:text-white ">
            <CheckCircle className="w-4 h-4 mr-2" />
            Trusted by 50,000+ Students
          </Badge>

          <h2 className="text-3xl font-bold mb-4">
            Transform Your Career with AI-Enhanced Learning
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of professionals who have accelerated their careers
            through our personalized learning platform.
          </p>

          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-learning flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-white/50 rounded-2xl backdrop-blur-sm border border-white/20">
            <div className="flex items-center space-x-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              "The AI-powered recommendations helped me land my dream job in
              just 6 months!"
            </p>
            <div className="mt-2 font-medium text-sm">
              - Sarah Johnson, Software Developer
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
