import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Zap,
  Target,
  Globe,
  Play,
  Star,
  Clock,
  CheckCircle,
  X,
} from "lucide-react";
import coursesImage from "@/assets/courses-preview.png";
import aiTechImage from "@/assets/ai-technology.png";
import virtualClassroomImage from "@/assets/virtual-classroom.png";
import achievementDashboardImage from "@/assets/achievement-dashboard.jpg";
import globalCommunityImage from "@/assets/global-community.jpg";
import { useEffect, useState } from "react";
import Registeration from "./Registration";
import { Bounce, Slide, toast, ToastContainer } from "react-toastify";

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description:
        "Personalized learning paths powered by advanced AI algorithms that adapt to your learning style and pace.",
    },
    {
      icon: Users,
      title: "Expert Mentors",
      description:
        "Learn from industry experts and certified professionals with real-world experience.",
    },
    {
      icon: BookOpen,
      title: "Comprehensive Courses",
      description:
        "Access to 10,000+ courses across technology, business, design, and more.",
    },
    {
      icon: Award,
      title: "Certified Learning",
      description:
        "Earn industry-recognized certificates to boost your career prospects.",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description:
        "Advanced analytics to track your learning progress and identify improvement areas.",
    },
    {
      icon: Globe,
      title: "Global Community",
      description:
        "Connect with learners worldwide and build your professional network.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Students" },
    { number: "1000+", label: "Expert Instructors" },
    { number: "10K+", label: "Course Hours" },
    { number: "95%", label: "Success Rate" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Developer",
      content:
        "AI Learn transformed my career. The personalized learning path helped me master machine learning in just 6 months!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Data Scientist",
      content:
        "The mentorship program is exceptional. My mentor guided me through complex projects and helped land my dream job.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      content:
        "The course quality is outstanding. Interactive projects and real-world applications made learning engaging and practical.",
      rating: 5,
    },
  ];
  const courses = [
    {
      id: 1,
      title: "Complete AI & Machine Learning Bootcamp",
      instructor: "Dr. Sarah Chen",
      category: "ai-ml",
      level: "beginner",
      duration: "12 weeks",
      students: 15420,
      rating: 4.9,
      price: 149,
      image: "/api/placeholder/400/225",
      description:
        "Master AI and ML from scratch with hands-on projects using Python, TensorFlow, and real-world datasets.",
      skills: ["Python", "TensorFlow", "Neural Networks", "Deep Learning"],
      features: ["24/7 Support", "Certificate", "Lifetime Access", "Projects"],
    },
    {
      id: 2,
      title: "Advanced React Development Masterclass",
      instructor: "Alex Rodriguez",
      category: "web-dev",
      level: "intermediate",
      duration: "8 weeks",
      students: 8950,
      rating: 4.8,
      price: 99,
      image: "/api/placeholder/400/225",
      description:
        "Build modern web applications with React, Next.js, and TypeScript. Includes state management and testing.",
      skills: ["React", "Next.js", "TypeScript", "Redux"],
      features: ["Live Sessions", "Certificate", "Job Support", "Mentorship"],
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      instructor: "Maria Santos",
      category: "design",
      level: "beginner",
      duration: "6 weeks",
      students: 12300,
      rating: 4.7,
      price: 79,
      image: "/api/placeholder/400/225",
      description:
        "Learn design thinking, user research, wireframing, and prototyping using Figma and Adobe XD.",
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      features: [
        "Design Tools",
        "Portfolio Review",
        "Certificate",
        "Community",
      ],
    },
  ];
  const notify = () =>
    toast.success("🦄 Registration Successfull", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    

  const handleSignUp = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Sign up attempted with:", data);
    notify();
    setShowFormModal(false);
  };

  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      setShowFormModal(true);
    }, 5000);
  }, []);

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-8 ">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-learning"></div>
        </div>

        <div className="relative container mx-auto px-4  text-center text-white">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              <Zap className="w-4 h-4 mr-2" />
              AI-Enhanced Learning Platform
            </Badge>

            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Transform Your Career with
              <span className="block p-3 gradient-text bg-gradient-to-r from-primary/90 to-secondary bg-clip-text text-transparent">
                AI-Powered Learning
              </span>
            </h1>

            <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
              Join millions of learners worldwide and unlock your potential with
              personalized courses, expert mentorship, and cutting-edge AI
              technology that adapts to your unique learning style.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-9">
              <Link to="/get-started">
                <Button
                  size="lg"
                  className="btn-hero btn-interactive text-lg px-8 py-4 bg-[#f97b1b] hover:bg-white hover:text-[#f97b1b]  border-white border hover:scale-105 hover:-translate-y-1 "
                >
                  Start Learning Today
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="text-[#f97b1b]  border-white hover:bg-[#f97b1b] hover:text-white btn-interactive hover:scale-105 hover:-translate-y-1"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-500/80 ">
              <Target className="w-4 h-4 mr-2" />
              Why Choose AI Learn
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Revolutionizing Online Education
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-driven platform provides personalized learning experiences
              that adapt to your pace, style, and goals, ensuring maximum
              effectiveness and engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="interactive-card border-0 shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-learning flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Preview Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 bg-orange-500/80">
                <BookOpen className="w-4 h-4 mr-2" />
                Course Catalog
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Master In-Demand Skills with Expert-Led Courses
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Access our comprehensive library of courses designed by industry
                experts. From beginner-friendly introductions to advanced
                masterclasses, we have everything you need to advance your
                career.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span>10,000+ courses across 50+ categories</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span>Interactive projects and real-world applications</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span>Industry-recognized certificates upon completion</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span>Lifetime access to course materials</span>
                </div>
              </div>

              <Link to="/courses">
                <Button
                  size="lg"
                  className="btn-hero bg-gradient-learning  hover:scale-105 hover:-translate-y-1"
                >
                  Explore All Courses
                </Button>
              </Link>
            </div>

            <div className="relative">
              <img
                src={coursesImage}
                alt="Course interface preview"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-500/80">
              <Users className="w-4 h-4 mr-2" />
              Student Success Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Transforming Careers Worldwide
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from our successful graduates who have transformed their
              careers through our AI-powered learning platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="hover:scale-105 transition-all duration-300 hover:shadow-xl "
              >
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto px-4 py-5">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="group border-0 shadow-lg overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-[#fa862d]/40 to-[#fcbe53]/20 flex items-center justify-center">
                  <Play className="w-12 h-12 text-orange-500 group-hover:scale-110 transition-transform" />
                </div>
                <Badge className="absolute top-3 right-3 bg-white/90 text-foreground">
                  {course.level}
                </Badge>
              </div>

              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="text-xs bg-white/20 text-black hover:text-white border border-black">
                    {course.category}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>

                <CardTitle className="text-lg leading-tight group-hover:text-orange-500 transition-colors">
                  {course.title}
                </CardTitle>

                <CardDescription className="text-sm">
                  by {course.instructor}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {course.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {course.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{course.skills.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-2xl font-bold text-orange-500">
                    ${course.price}
                  </span>
                  <Button
                    size="sm"
                    className="btn-hero hover:scale-105 hover:-translate-y-1"
                  >
                    Enroll Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* AI Technology Showcase Section */}
      <section className="relative  sm:my-12 md:my-14">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={aiTechImage}
            alt="AI technology visualization"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        {/* Content (relative to section so it stays in flow) */}
        <div className="relative container mx-auto px-4 py-10 sm:py-16 md:py-20">
          {/* Heading */}
          <div className="text-center mb-10 sm:mb-14 md:mb-16">
            <Badge className="mb-4 bg-orange-400">
              <Brain className="w-4 h-4 mr-2" />
              Advanced AI Technology
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">
              Experience the Future of Learning
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Our cutting-edge AI technology creates personalized learning
              experiences that adapt in real-time to your progress, preferences,
              and goals.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 items-center">
            {/* Left Image with Play */}
            <div className="relative">
              <img
                src={virtualClassroomImage}
                alt="Virtual classroom technology"
                className="w-full h-56 sm:h-72 md:h-full object-cover rounded-lg"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-white/80 rounded-full p-4 sm:p-6 hover:scale-110 transition-all duration-200">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 ml-1" />
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-learning flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                    Smart Content Adaptation
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    AI analyzes your learning patterns and adjusts content
                    difficulty, pace, and style to optimize your understanding.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-learning flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                    Predictive Analytics
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Advanced algorithms predict knowledge gaps and recommend
                    targeted practice before you fall behind.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-learning flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                    Instant Feedback
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Get immediate, contextual feedback that helps you understand
                    mistakes and accelerate learning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement & Progress Section */}
      <section className="py-14 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 V bg-orange-500/80">
                <Award className="w-4 h-4 mr-2" />
                Track Your Success
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Visualize Your Learning Journey
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Stay motivated with comprehensive progress tracking, achievement
                badges, and detailed analytics that show your growth over time.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-white rounded-xl shadow-lg hover:scale-105 hover:translate-y-1 hover:shadow-xl transition-all duration-200">
                  <div className="text-3xl font-bold text-primary mb-2">
                    87%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Completion Rate
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-lg hover:scale-105 hover:translate-y-1 hover:shadow-xl transition-all duration-200">
                  <div className="text-3xl font-bold text-secondary mb-2">
                    24
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Certificates Earned
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-lg hover:scale-105 hover:translate-y-1 hover:shadow-xl transition-all duration-200">
                  <div className="text-3xl font-bold text-success mb-2">
                    156h
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Learning Time
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-lg hover:scale-105 hover:translate-y-1 hover:shadow-xl transition-all duration-200">
                  <div className="text-3xl font-bold text-warning mb-2">12</div>
                  <div className="text-sm text-muted-foreground">
                    Skills Mastered
                  </div>
                </div>
              </div>

              <Link to="/classes">
                <Button
                  size="lg"
                  className="btn-hero bg-gradient-learning hover:scale-105 hover:-translate-y-1 hover:shadow-xl "
                >
                  View Learning Dashboard
                </Button>
              </Link>
            </div>

            <div className="relative">
              <img
                src={achievementDashboardImage}
                alt="Learning achievement dashboard"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-8 -right-4 size-14 sm:size-16 md:size-20 lg:size-24 bg-gradient-learning rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                #1
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Community Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-500/80">
              <Globe className="w-4 h-4 mr-2" />
              Global Learning Network
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Connect with Learners Worldwide
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join a vibrant community of over 50,000 learners from 150+
              countries. Collaborate on projects, share knowledge, and build
              lasting professional relationships.
            </p>
          </div>

          <div className="relative mb-16">
            <img
              src={globalCommunityImage}
              alt="Global learning community network"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl flex items-end">
              <div className="p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  Study Groups & Forums
                </h3>
                <p className="text-white/90">
                  Join topic-specific study groups and engage in meaningful
                  discussions
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:scale-105 hover:translate-y-1 hover:shadow-xl transition-all duration-200 text-center">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-learning flex items-center justify-center">
                  <Users className="w-8 h-8  text-white" />
                </div>
                <CardTitle>Study Groups</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Join subject-specific study groups with peers who share your
                  learning goals and interests.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:scale-105 hover:translate-y-1 hover:shadow-xl transition-all duration-200 text-center">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-learning flex items-center justify-center">
                  <Globe className="w-8 h-8  text-white" />
                </div>
                <CardTitle>Global Mentorship</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Connect with mentors and mentees from around the world for
                  knowledge exchange and career guidance.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:scale-105 hover:translate-y-1 hover:shadow-xl transition-all duration-200 text-center">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-learning flex items-center justify-center">
                  <Award className="w-8 h-8  text-white" />
                </div>
                <CardTitle>Competitions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Participate in learning challenges and competitions to test
                  your skills and win prizes.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Video Learning Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-500/80">
              <Play className="w-4 h-4 mr-2" />
              Interactive Video Learning
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Learn Through Immersive Video Content
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience learning like never before with interactive videos,
              real-time quizzes, and hands-on coding exercises embedded directly
              in your lessons.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="video-container mb-8 relative">
              <img
                src={virtualClassroomImage}
                alt="Interactive video learning platform"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%]  translate-y-[-50%]">
                <div className="bg-white/90 p-7 hover:scale-110 transition-all   rounded-full">
                  <Play className="w-10 h-10 text-orange-500 ml-1" />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-learning flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Interactive Quizzes</h3>
                <p className="text-sm text-muted-foreground">
                  Test your knowledge with embedded quizzes throughout the video
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-learning flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Code Along</h3>
                <p className="text-sm text-muted-foreground">
                  Practice coding in real-time with integrated development
                  environments
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-learning flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Progress Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Track your progress through each video and module
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-learning text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join over 50,000 students who are already building their dream
            careers with AI-powered personalized learning.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-started">
              <Button
                size="lg"
                className="btn-hero btn-interactive text-lg px-8 py-4 bg-[#f97b1b] hover:bg-white hover:text-[#f97b1b]  border-white border hover:scale-105 hover:-translate-y-1 "
              >
                Start Free Trial
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-[#f97b1b]  border-white hover:bg-[#f97b1b] hover:text-white btn-interactive hover:scale-105 hover:-translate-y-1"
            >
              <Clock className="w-5 h-5 mr-2" />
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
      {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[calc(100%-3rem)] sm:w-1/2 lg:w-1/3 lg:h-[calc(100%-6.1rem)]   max-h-screen overflow-y-scroll [&::-webkit-scrollbar]:hidden relative">
            <button
              onClick={() => setShowFormModal(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-black"
            >
             <X />
            </button>
            <Registeration onSubmit={handleSignUp} />
          </div>
        </div>
      )}
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
        transition={Bounce}
      />
    </div>
  );
};

export default Home;
