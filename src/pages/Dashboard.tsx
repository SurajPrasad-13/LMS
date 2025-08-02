import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  MessageSquare,
  Mic,
  MicOff,
  PhoneOff,
  Video,
  VideoOff,
} from "lucide-react";
import {
  BookOpen,
  Clock,
  Target,
  TrendingUp,
  Play,
  Calendar,
  Users,
  Award,
  Brain,
  ChevronRight,
  Bell,
  Search,
  Filter,
  MoreVertical,
  Star,
  Zap,
  Trophy,
  Settings,
  Calculator,
  FileText,
  Download,
  Share2,
} from "lucide-react";
import heroImage from "@/assets/lms-hero.jpg";
import { useState } from "react";

export default function Dashboard() {
  const recentCourses = [
    {
      id: 1,
      title: "Advanced React Development",
      progress: 75,
      nextLesson: "React Hooks Patterns",
      time: "2h 30m",
      category: "Development",
      difficulty: "Advanced",
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      progress: 45,
      nextLesson: "Neural Networks",
      time: "1h 45m",
      category: "AI/ML",
      difficulty: "Intermediate",
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      progress: 90,
      nextLesson: "Design Systems",
      time: "45m",
      category: "Design",
      difficulty: "Beginner",
    },
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: "JavaScript Advanced Concepts",
      instructor: "Dr. Sarah Chen",
      time: "Today, 2:00 PM",
      participants: 24,
      rating: 4.9,
    },
    {
      id: 2,
      title: "AI Ethics Discussion",
      instructor: "Prof. Michael Torres",
      time: "Tomorrow, 10:00 AM",
      participants: 18,
      rating: 4.8,
    },
  ];

  const achievements = [
    {
      id: 1,
      title: "Fast Learner",
      description: "Completed 5 courses this month",
      icon: "🚀",
      points: 150,
      date: "2 days ago",
    },
    {
      id: 2,
      title: "Quiz Master",
      description: "100% score on 10 quizzes",
      icon: "🎯",
      points: 200,
      date: "1 week ago",
    },
    {
      id: 3,
      title: "Discussion Leader",
      description: "Most helpful in forums",
      icon: "💬",
      points: 100,
      date: "3 days ago",
    },
  ];

  const notifications = [
    {
      id: 1,
      type: "assignment",
      message: "New assignment posted in React Development",
      time: "5 min ago",
    },
    {
      id: 2,
      type: "achievement",
      message: "You earned the 'Fast Learner' badge",
      time: "2 hours ago",
    },
    {
      id: 3,
      type: "session",
      message: "Live session starts in 30 minutes",
      time: "30 min",
    },
  ];

  const weeklyGoals = [
    { task: "Complete 3 lessons", progress: 66, completed: 2, total: 3 },
    { task: "Attend 2 live sessions", progress: 100, completed: 2, total: 2 },
    { task: "Submit assignments", progress: 50, completed: 1, total: 2 },
  ];
  

  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [currentinstructor, setcurrentinstructor] = useState('')

  const startCall = (instructorName) => {
    setIsInCall(true);
    setcurrentinstructor(instructorName);
  };

  const endCall = () => {
    setIsInCall(false);
    setcurrentinstructor(null);
    setIsMuted(false);
    setIsVideoOn(true);
  };
  return (
    <>
      {isInCall ? (
        <div className="h-[89vh] bg-black flex flex-col">
          {/* Video Call Interface */}
          <div className="flex-1 relative">
            {/* Main video area */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
              <div className="text-center text-white">
                <Avatar className="h-32 w-32 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg"  />
                  <AvatarFallback className="text-4xl">
                    Surajslkf; asldkfj laskdf alksdjf alksdjjf laksdf Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore error ut doloribus? Tempora adipisci repellat ad officia nobis voluptatum. Voluptate!
                  </AvatarFallback>
                </Avatar>
                {/* <h2 className="text-2xl font-semibold">{currentPatient}</h2> */}
                <p className="text-gray-300">Connected • 05:23</p>
              </div>
            </div>

            {/* Self video (picture-in-picture) */}
            <div className="absolute top-4 right-4 w-48 h-32 bg-gray-800 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <Avatar className="h-16 w-16 mx-auto mb-2">
                    <AvatarImage src="/placeholder.svg" alt="Dr. Smith" />
                    <AvatarFallback>DS</AvatarFallback>
                  </Avatar>
                  <p className="text-sm">{currentinstructor}</p>
                </div>
              </div>
            </div>

            {/* Call controls */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-4 bg-black/50 backdrop-blur-sm rounded-full p-4">
                <Button
                  variant={isMuted ? "destructive" : "secondary"}
                  size="lg"
                  className="rounded-full h-12 w-12"
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
                  size="lg"
                  className="rounded-full h-12 w-12"
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
                  size="lg"
                  className="rounded-full h-12 w-12"
                  onClick={endCall}
                >
                  <PhoneOff className="h-6 w-6" />
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  className="rounded-full h-12 w-12"
                >
                  <MessageSquare className="h-6 w-6" />
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  className="rounded-full h-12 w-12"
                >
                  <Settings className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8 px-2 animate-fade-in">
          {/* Hero Section with Quick Actions */}
          <div className=" mx-auto relative overflow-hidden rounded-3xl bg-gradient-learning p-8 md:p-12 shadow-2xl">
            <div className="absolute inset-0 opacity-15">
              <img
                src={heroImage}
                alt="Learning Dashboard"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl md:text-6xl font-bold text-white animate-slide-in-right">
                        Welcome back, Alex!
                      </h1>
                      <div className="flex items-center gap-2 mt-2">
                        <Zap className="w-5 h-5 text-yellow-300" />
                        <span className="text-white/90 font-medium">
                          Learning Streak: 12 days
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xl text-white/90 leading-relaxed">
                    You're making excellent progress! Complete 2 more lessons to
                    reach your weekly goal.
                  </p>

                  {/* Quick Action Buttons */}
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white text-primary hover:bg-white/10 backdrop-blur-sm hover-lift transition-all duration-200"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Continue Learning
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white text-primary hover:bg-white/10 backdrop-blur-sm hover-lift transition-all duration-200"
                    >
                      <Brain className="w-5 h-5 mr-2" />
                      Ask AI Tutor
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white text-primary hover:bg-white/10 backdrop-blur-sm hover-lift transition-all duration-200"
                    >
                      <Bell className="w-5 h-5 mr-2" />
                      Notifications ({notifications.length})
                    </Button>
                  </div>
                </div>

                <div className="hidden md:block space-y-4">
                  {/* Weekly Goals Card */}
                  <div className="glass-card p-6 space-y-4 backdrop-blur-xl bg-white/10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">
                        Weekly Goals
                      </h3>
                      <Badge className="bg-white/20 text-white border-white/30">
                        3 of 3
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      {weeklyGoals.map((goal, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-white/90 text-sm">
                              {goal.task}
                            </span>
                            <span className="text-white/70 text-xs">
                              {goal.completed}/{goal.total}
                            </span>
                          </div>
                          <Progress
                            value={goal.progress}
                            className="h-2 bg-white/20"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Access Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="ghost"
                      className="h-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm flex-col gap-2 text-white border border-white/20"
                    >
                      <Search className="w-5 h-5" />
                      <span className="text-xs">Search</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm flex-col gap-2 text-white border border-white/20"
                    >
                      <Filter className="w-5 h-5" />
                      <span className="text-xs">Filter</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-card p-6 hover-lift">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-muted-foreground">Courses Enrolled</p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 hover-lift">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">45h</p>
                  <p className="text-muted-foreground">Learning Time</p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 hover-lift">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">28</p>
                  <p className="text-muted-foreground">Achievements</p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 hover-lift">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">94%</p>
                  <p className="text-muted-foreground">Average Score</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Continue Learning */}
            <div className="lg:col-span-2 space-y-6   ">
              <div className="flex items-center justify-between w-80 sm:w-[640px] md:w-[760px] lg:w-auto mx-auto">
                <h2 className="text-2xl font-bold">Continue Learning</h2>
                <Button variant="ghost">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="space-y-4">
                {recentCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="glass-card w-76 sm:w-[640px] md:w-[760px] lg:w-auto mx-auto  p-4 hover-lift group relative overflow-hidden"
                  >
                    {/* <div className="absolute top-4 right-4">
                  <Button size="sm" variant="ghost">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div> */}

                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {course.category}
                          </Badge>
                          <Badge
                            variant={
                              course.difficulty === "Advanced"
                                ? "destructive"
                                : course.difficulty === "Intermediate"
                                ? "default"
                                : "outline"
                            }
                            className="text-xs"
                          >
                            {course.difficulty}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                      </div>
                      <Badge variant="outline" className="bg-primary/10">
                        {course.progress}% Complete
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <Progress
                        value={course.progress}
                        className="h-3 bg-muted"
                      />

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="font-medium text-sm">
                            Next: {course.nextLesson}
                          </p>
                          <div className="flex items-center justify-start md:gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {course.time} remaining
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-current text-yellow-500" />
                              4.8
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-col sm:flex-row">
                          <Button className="px-3 gap-1" variant="outline">
                            <Target className="w-4 h-4 mr-1" />
                            Goals
                          </Button>
                          <Button onClick={()=>startCall(course.title)} className="px-2 gap-1">
                            <Play className="w-4 h-4 mr-1" />
                            Continue
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Upcoming Live Sessions */}
              <div className="  w-full -ml-2">
                <div className="flex items-center justify-between mx-auto  my-5 w-78 sm:w-[640px] md:w-[760px] lg:w-auto">
                  <h2 className=" texl-lg sm:text-xl md:text-2xl font-bold">
                    Upcoming Live Sessions
                  </h2>
                  <Button variant="ghost" size="sm">
                    View Calendar <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <div className="space-y-6 ">
                  {upcomingSessions.map((session) => (
                    <Card
                      key={session.id}
                      className="glass-card p-2 mx-auto  hover-lift group border-x-4 border-x-primary w-auto sm:w-[640px] md:w-[760px] lg:w-auto"
                    >
                      <div className="flex flex-col sm:flex-row items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className=" size-10 sm:size-10 md:size-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                            <Users className=" size-4 md:size-6 text-primary" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                              {session.title}
                            </h3>

                            <p className="text-sm text-muted-foreground">
                              with {session.instructor}
                            </p>

                            <div className="flex items-center space-x-2 sm:space-x-4 text-xs">
                              <span className="flex items-center gap-1 font-medium">
                                <Calendar className="w-3 h-3" />
                                {session.time}
                              </span>
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <Users className="w-3 h-3" />
                                {session.participants} participants
                              </span>
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <Star className="w-3 h-3 fill-current text-yellow-500" />
                                {session.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-center sm:flex-col gap-2 my-4">
                          <Badge
                            variant="outline"
                            className="bg-success/10 text-success border-success/20"
                          >
                            Live Soon
                          </Badge>
                          <Button onClick={()=> startCall(session.instructor)}>
                            <Calendar className="w-4 h-4 mr-2" />
                            Join Session
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* AI Tutor Quick Access */}
              <Card className="glass-card p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-learning rounded-2xl flex items-center justify-center mx-auto">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      AI Tutor Available
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Get instant help with any concept
                    </p>
                  </div>
                  <Button className="w-full">Start Conversation</Button>
                </div>
              </Card>

              {/* Recent Achievements */}
              <Card className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Recent Achievements</h3>
                  <Button variant="ghost" size="sm">
                    <Award className="w-4 h-4 mr-1" />
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="group flex items-center space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                        <span className="text-lg">{achievement.icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm group-hover:text-primary transition-colors">
                            {achievement.title}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            +{achievement.points}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {achievement.description}
                        </p>
                        <p className="text-xs text-muted-foreground/70 mt-1">
                          {achievement.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Live Notifications */}
              <Card className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Live Updates</h3>
                  <Badge variant="outline" className="bg-primary/10">
                    {notifications.length}
                  </Badge>
                </div>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === "assignment"
                            ? "bg-primary"
                            : notification.type === "achievement"
                            ? "bg-success"
                            : "bg-accent"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Stats */}
              <Card className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4">This Week</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Study Time</span>
                    <span className="font-semibold">12h 30m</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Lessons Completed</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Quiz Average</span>
                    <span className="font-semibold">91%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Streak</span>
                    <span className="font-semibold">5 days 🔥</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Extended Content - Study Plan & Progress Tracking */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Personalized Study Plan */}
            <Card className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">My Study Plan</h2>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Customize
                </Button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    day: "Monday",
                    subject: "React Advanced Patterns",
                    duration: "2h",
                    status: "completed",
                    progress: 100,
                  },
                  {
                    day: "Tuesday",
                    subject: "Machine Learning Math",
                    duration: "1.5h",
                    status: "completed",
                    progress: 100,
                  },
                  {
                    day: "Wednesday",
                    subject: "UI/UX Research Methods",
                    duration: "1h",
                    status: "in-progress",
                    progress: 60,
                  },
                  {
                    day: "Thursday",
                    subject: "Database Optimization",
                    duration: "2h",
                    status: "pending",
                    progress: 0,
                  },
                  {
                    day: "Friday",
                    subject: "Python Data Structures",
                    duration: "1.5h",
                    status: "pending",
                    progress: 0,
                  },
                  {
                    day: "Saturday",
                    subject: "Project Work",
                    duration: "3h",
                    status: "pending",
                    progress: 0,
                  },
                  {
                    day: "Sunday",
                    subject: "Review & Practice",
                    duration: "2h",
                    status: "pending",
                    progress: 0,
                  },
                ].map((plan, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          plan.status === "completed"
                            ? "bg-success"
                            : plan.status === "in-progress"
                            ? "bg-accent"
                            : "bg-muted-foreground/30"
                        }`}
                      ></div>
                      <div>
                        <p className="font-medium">{plan.day}</p>
                        <p className="text-sm text-muted-foreground">
                          {plan.subject}
                        </p>
                      </div>
                    </div>
                    <div className="text-right space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {plan.duration}
                      </Badge>
                      <Badge
                        variant={
                          plan.status === "completed"
                            ? "default"
                            : plan.status === "in-progress"
                            ? "secondary"
                            : "outline"
                        }
                        className="text-xs"
                      >
                        {plan.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Learning Analytics */}
            <Card className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Learning Analytics</h2>
                <Button variant="outline" size="sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Report
                </Button>
              </div>

              <div className="space-y-6">
                {/* Performance Chart */}
                <div>
                  <h3 className="font-semibold mb-3">Weekly Performance</h3>
                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                      (day) => (
                        <div
                          key={day}
                          className="text-xs text-center text-muted-foreground"
                        >
                          {day}
                        </div>
                      )
                    )}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {[90, 85, 95, 78, 92, 88, 96].map((score, index) => (
                      <div
                        key={index}
                        className="h-16 bg-muted/30 rounded flex items-end justify-center"
                      >
                        <div
                          className="bg-primary rounded-t w-full transition-all duration-300 hover:bg-primary/80"
                          style={{ height: `${score}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subject Breakdown */}
                <div>
                  <h3 className="font-semibold mb-3">Subject Performance</h3>
                  <div className="space-y-3">
                    {[
                      { subject: "Programming", score: 94, trend: "up" },
                      { subject: "Mathematics", score: 87, trend: "up" },
                      { subject: "Design", score: 91, trend: "stable" },
                      { subject: "AI/ML", score: 82, trend: "down" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-medium">
                          {item.subject}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {item.score}%
                          </span>
                          <TrendingUp
                            className={`w-3 h-3 ${
                              item.trend === "up"
                                ? "text-success"
                                : item.trend === "down"
                                ? "text-destructive rotate-180"
                                : "text-muted-foreground"
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Study Resources & Tools */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Access Tools */}
            <Card className="glass-card p-6">
              <h2 className="text-xl font-bold mb-4">Study Tools</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Brain, label: "AI Flashcards", color: "bg-primary" },
                  {
                    icon: Calculator,
                    label: "Calculator",
                    color: "bg-red-500",
                  },
                  { icon: BookOpen, label: "Notes", color: "bg-secondary" },
                  { icon: Target, label: "Goals", color: "bg-success" },
                ].map((tool, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-20 flex-col gap-2 hover:scale-105 transition-transform"
                  >
                    <div
                      className={`w-8 h-8 ${tool.color} rounded-lg flex items-center justify-center`}
                    >
                      <tool.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs">{tool.label}</span>
                  </Button>
                ))}
              </div>
            </Card>

            {/* Recent Downloads */}
            <Card className="glass-card p-6">
              <h2 className="text-xl font-bold mb-4">Recent Downloads</h2>
              <div className="space-y-3">
                {[
                  {
                    name: "React Patterns Cheatsheet.pdf",
                    size: "2.4 MB",
                    date: "Today",
                  },
                  {
                    name: "ML Algorithms Summary.docx",
                    size: "1.8 MB",
                    date: "Yesterday",
                  },
                  {
                    name: "Design System Guide.figma",
                    size: "5.2 MB",
                    date: "2 days ago",
                  },
                ].map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {file.size} • {file.date}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="glass-card p-6">
              <h2 className="text-xl font-bold mb-4">Upcoming Deadlines</h2>
              <div className="space-y-3">
                {[
                  {
                    task: "React Project Submission",
                    due: "2 days",
                    priority: "high",
                  },
                  { task: "ML Assignment", due: "5 days", priority: "medium" },
                  {
                    task: "Design Portfolio Review",
                    due: "1 week",
                    priority: "low",
                  },
                ].map((deadline, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-sm">{deadline.task}</p>
                      <p className="text-xs text-muted-foreground">
                        Due in {deadline.due}
                      </p>
                    </div>
                    <Badge
                      variant={
                        deadline.priority === "high"
                          ? "destructive"
                          : deadline.priority === "medium"
                          ? "default"
                          : "secondary"
                      }
                      className="text-xs"
                    >
                      {deadline.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Community & Social Learning */}
          <Card className="glass-card p-8">
            <div className="text-center space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  Join the Learning Community
                </h2>
                <p className="text-muted-foreground">
                  Connect with fellow learners, share knowledge, and grow
                  together
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold">Study Groups</h3>
                  <p className="text-sm text-muted-foreground">
                    Join study groups for collaborative learning
                  </p>
                  <Button variant="outline" size="sm">
                    Join Groups
                  </Button>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                    <Share2 className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <h3 className="font-semibold">Share Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    Share your achievements and inspire others
                  </p>
                  <Button variant="outline" size="sm">
                    Share Now
                  </Button>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                    <Trophy className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="font-semibold">Competitions</h3>
                  <p className="text-sm text-muted-foreground">
                    Participate in learning challenges
                  </p>
                  <Button variant="outline" size="sm">
                    View Challenges
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
