import { Slide, toast, ToastContainer } from "react-toastify";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Rocket, Shield, Gift } from "lucide-react";
import Registeration from "./Registration";

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

const GetStarted = () => {
  const notify = () =>
    toast.success("Registration Successfull", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
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
            <Registeration onSuccess={notify} />
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
        theme="light"
      />
    </div>
  );
};

export default GetStarted;
