import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Clock,
  Users,
  Star,
  Play,
  BookOpen,
  Award,
  TrendingUp,
  Calendar,
  CheckCircle,
  CircleX,
  Settings,
  MessageSquare,
  PhoneOff,
  VideoOff,
  Video,
  Mic,
  MicOff,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function MyCourses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Courses", count: 24 },
    { id: "in-progress", name: "In Progress", count: 3 },
    { id: "completed", name: "Completed", count: 8 },
    { id: "wishlist", name: "Wishlist", count: 13 },
  ];

  const courses = [
    {
      id: 1,
      title: "Advanced React Development",
      instructor: "Dr. Sarah Chen",
      category: "Frontend Development",
      level: "Advanced",
      duration: "12 weeks",
      students: 1247,
      rating: 4.8,
      progress: 75,
      status: "in-progress",
      price: "Free",
      description:
        "Master advanced React concepts including hooks, context, performance optimization, and modern patterns used in production applications.",
      skills: ["React Hooks", "Performance", "Testing", "State Management"],
      nextLesson: "Custom Hooks Patterns",
      completedLessons: 28,
      totalLessons: 35,
      certificate: true,
      aiAssisted: true,
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      instructor: "Prof. Michael Torres",
      category: "Artificial Intelligence",
      level: "Intermediate",
      duration: "16 weeks",
      students: 892,
      rating: 4.9,
      progress: 45,
      status: "in-progress",
      price: "$99",
      description:
        "Comprehensive introduction to machine learning algorithms, from linear regression to neural networks, with hands-on Python projects.",
      skills: ["Python", "TensorFlow", "Data Analysis", "Neural Networks"],
      nextLesson: "Deep Learning Basics",
      completedLessons: 18,
      totalLessons: 40,
      certificate: true,
      aiAssisted: true,
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      instructor: "Emma Rodriguez",
      category: "Design",
      level: "Beginner",
      duration: "8 weeks",
      students: 2156,
      rating: 4.7,
      progress: 90,
      status: "in-progress",
      price: "$79",
      description:
        "Learn fundamental design principles, user research methods, and create beautiful, functional user interfaces that users love.",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      nextLesson: "Advanced Prototyping",
      completedLessons: 27,
      totalLessons: 30,
      certificate: true,
      aiAssisted: true,
    },
    {
      id: 4,
      title: "Full-Stack JavaScript",
      instructor: "Alex Kim",
      category: "Web Development",
      level: "Intermediate",
      duration: "20 weeks",
      students: 1543,
      rating: 4.6,
      progress: 0,
      status: "wishlist",
      price: "$149",
      description:
        "Complete full-stack development course covering Node.js, Express, MongoDB, React, and deployment strategies for modern web applications.",
      skills: ["Node.js", "Express", "MongoDB", "React", "Deployment"],
      nextLesson: "Node.js Fundamentals",
      completedLessons: 0,
      totalLessons: 60,
      certificate: true,
      aiAssisted: true,
    },
    {
      id: 5,
      title: "Data Science with Python",
      instructor: "Dr. Lisa Wang",
      category: "Data Science",
      level: "Advanced",
      duration: "14 weeks",
      students: 756,
      rating: 4.9,
      progress: 100,
      status: "completed",
      price: "$129",
      description:
        "Master data science concepts with Python, including pandas, numpy, matplotlib, and advanced statistical analysis techniques.",
      skills: ["Python", "Pandas", "Statistics", "Visualization"],
      nextLesson: "Course Completed",
      completedLessons: 42,
      totalLessons: 42,
      certificate: true,
      aiAssisted: true,
      completedDate: "2024-01-15",
    },
    {
      id: 6,
      title: "Cloud Architecture with AWS",
      instructor: "James Patterson",
      category: "Cloud Computing",
      level: "Advanced",
      duration: "12 weeks",
      students: 634,
      rating: 4.8,
      progress: 100,
      status: "completed",
      price: "$179",
      description:
        "Design and implement scalable cloud solutions using AWS services including EC2, S3, Lambda, and advanced architectural patterns.",
      skills: ["AWS", "Cloud Architecture", "DevOps", "Scalability"],
      nextLesson: "Course Completed",
      completedLessons: 36,
      totalLessons: 36,
      certificate: true,
      aiAssisted: true,
      completedDate: "2023-12-20",
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || course.status === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "in-progress":
        return <Play className="w-4 h-4 text-primary" />;
      default:
        return <BookOpen className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "in-progress":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const [isInCall, setIsInCall] = useState(false);
   const [isMuted, setIsMuted] = useState(false);
   const [isVideoOn, setIsVideoOn] = useState(true);
   const [currentinstructor, setcurrentinstructor] = useState("");
   const [secondsLeft, setSecondsLeft] = useState(65);
 
   const startCall = (instructorName) => {
     setIsInCall(true);
     setcurrentinstructor(instructorName);
     setSecondsLeft(15);
   };
 
   const endCall = () => {
     setIsInCall(false);
     setcurrentinstructor(null);
     setIsMuted(false);
     setIsVideoOn(true);
   };
   useEffect(() => {
   if (!isInCall) return;
 
   const interval = setInterval(() => {
     setSecondsLeft((prev) => {
       if (prev === 0) {
         clearInterval(interval);
         setTimeout(() => {
           endCall();
         }, 2000);
         return 0;
       }
       return prev - 1;
     });
   }, 1000);
 
   return () => clearInterval(interval);
 }, [isInCall]);
 
 
 
   // Format seconds into MM:SS
   const formatTime = (totalSeconds) => {
     const minutes = Math.floor(totalSeconds / 60);
     const seconds = totalSeconds % 60;
 
     return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
       2,
       "0"
     )}`;
   };

  return (
    <>
      {isInCall ? (
        <div className="h-[89vh] bg-black flex flex-col">
          {/* Video Call Interface */}
          <div className="flex-1 relative">
            {/* Main video area */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
              <div className="text-center flex flex-col items-center justify-center gap-2 text-white">
                <Avatar className="">
                  <AvatarImage src="/placeholder.svg" className="h-32 rounded-full" />
                </Avatar>
                <p className="text-gray-300 font-bold text-xl">
                  Connected • {formatTime(secondsLeft)}
                </p>
                {secondsLeft == 0 && <p>This Session has ended</p>}
              </div>
            </div>

            {/* Self video (picture-in-picture) */}
           <div className="absolute top-4 right-4 w-48 h-32 bg-gray-800 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <div className="text-white flex items-center justify-center flex-col gap-2">
                  <Avatar className="">
                    <AvatarImage src="/placeholder.svg" alt="Dr. Smith" className="h-16 rounded-full" />
                  </Avatar>
                  <p className="text-sm">{currentinstructor}</p>
                </div>
              </div>
            </div>

            {/* Call controls */}
           <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-4 bg-black/50 backdrop-blur-sm rounded-full p-1 md:p-4">
                <Button
                  variant={isMuted ? "destructive" : "secondary"}
                  size="sm"
                  className="rounded-full md:size-12"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? (
                    <MicOff className="h-6 w-6" />
                  ) : (
                    <Mic className="h-6 w-6" />
                  )}
                </Button>

                <Button
                  variant={isVideoOn ? "secondary" : "destructive"}
                  size="sm"
                  className="rounded-full md:size-12"
                  onClick={() => setIsVideoOn(!isVideoOn)}
                >
                  {isVideoOn ? (
                    <Video className="h-6 w-6" />
                  ) : (
                    <VideoOff className="h-6 w-6" />
                  )}
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  className="rounded-full md:size-12"
                  onClick={endCall}
                >
                  <PhoneOff className="h-6 w-6" />
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  className="rounded-full md:size-12"
                >
                  <MessageSquare className="h-6 w-6" />
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  className="rounded-full md:size-12"
                >
                  <Settings className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold">My Courses</h1>
                <p className="text-muted-foreground text-lg">
                  Track your learning progress and discover new skills
                </p>
              </div>
              <Button className="bg-gradient-learning">
                <BookOpen className="w-4 h-4 mr-2" />
                Browse All Courses
              </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search courses, instructors, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category.id)}
                  className={
                    selectedCategory === category.id ? "bg-primary" : ""
                  }
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-muted-foreground">Courses in Progress</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "70%" }}></div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Average progress: 70%
                </p>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-muted-foreground">Courses Completed</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  8 certificates earned
                </p>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-muted-foreground">Hours Learned</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  12 hours this week
                </p>
              </div>
            </Card>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="glass-card p-4 hover-lift">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(course.status)}
                        <Badge className={getStatusColor(course.status)}>
                          {course.status === "in-progress"
                            ? "In Progress"
                            : course.status === "completed"
                            ? "Completed"
                            : "Wishlist"}
                        </Badge>
                        {course.aiAssisted && (
                          <Badge
                            variant="outline"
                            className="bg-gradient-learning text-white border-0"
                          >
                            AI Assisted
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold leading-tight">
                        {course.title}
                      </h3>
                      <p className="text-muted-foreground">
                        by {course.instructor}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">{course.price}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 fill-yellow-300 text-yellow-200" />
                        <span className="text-sm  font-medium">
                          {course.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {course.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {course.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Progress */}
                  {course.status === "in-progress" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>
                          Progress: {course.completedLessons}/
                          {course.totalLessons} lessons
                        </span>
                        <span className="font-semibold">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Next: {course.nextLesson}
                      </p>
                    </div>
                  )}

                  {/* Completed Info */}
                  {course.status === "completed" && (
                    <div className="bg-success/10 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span className="text-sm font-medium">
                            Completed on {course.completedDate}
                          </span>
                        </div>
                        {course.certificate && (
                          <Badge className="bg-accent text-accent-foreground">
                            Certificate Earned
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Course Info */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students.toLocaleString()} students</span>
                      </div>
                      <Badge variant="outline">{course.level}</Badge>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1 pt-2">
                    {course.status === "in-progress" ? (
                      <Button onClick={()=>startCall(course.instructor)} className="">
                        <Play className="w-4 h-4" />
                        Continue Learning
                      </Button>
                    ) : course.status === "completed" ? (
                      <Button variant="outline" className="">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Review Course
                      </Button>
                    ) : (
                      <Button onClick={()=>startCall(course.instructor)} className="flex-1">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Start Course
                      </Button>
                    )}

                    <Button variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <CircleX className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
