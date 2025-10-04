import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
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
  MessageSquare,
  Mic,
  MicOff,
  PhoneOff,
  Video,
  VideoOff,
} from "lucide-react";
import heroImage from "@/assets/lms-hero.jpg";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Notification from "@/components/ui/Notification";
import { useAuth } from "../Context/AuthContext";

const weeklyGoals = [
  { task: "Complete 3 lessons", progress: 66, completed: 2, total: 3 },
  { task: "Attend 2 live sessions", progress: 100, completed: 2, total: 2 },
  { task: "Submit assignments", progress: 50, completed: 1, total: 2 },
];

export default function Dashboard() {
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [currentinstructor, setcurrentinstructor] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(65);

  const { user } = useAuth();
  // console.log("user Data: ", user);
  const {
    data: notifications = [], // rename + default value
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:8000/api/lms/notifications/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.access}`, // 🔑 attach token
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  // console.log("Notifications: ", notifications);

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

  const formatApiTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  function formatUTCTo12HourTime(isoString) {
    const date = new Date(isoString);

    let hours = date.getUTCHours(); // UTC hours
    let minutes = date.getUTCMinutes(); // UTC minutes

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // 0 ko 12 me convert
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  const formatApiDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const navigate = useNavigate();

  const [recentCourses, setrecentCourses] = useState<any[]>([]);
  // Get Courses Data
  const coursesApiData = async () => {
    try {
      let response = await fetch("http://127.0.0.1:8000/api/courses/courses/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.access}`,
        },
      });
      const result = await response.json();
      if (!response.ok) {
        console.error(`Failed to fetch courses: ${result}`);
        setrecentCourses([]);
      } else {
        setrecentCourses(Array.isArray(result) ? result : []);
        console.log("courses result: ", result);
      }
    } catch (error) {
      console.error("Error fetching recent courses:", error);
      setrecentCourses([]);
    }
  };

  const [upcomingSessions, setupcomingSessions] = useState<any[]>([]);

  const sessionApiData = async () => {
    try {
      let response = await fetch(
        "http://127.0.0.1:8000/api/sessions/sessions/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: user?.access ? `Bearer ${user?.access}` : "",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      let result = await response.json();
      console.log("Session Data", result);
      setupcomingSessions(result);
    } catch (error) {
      console.error("Failed to fetch session data:", error);
      // Optionally, notify the user or handle the error further
    }
  };

  const icons = {
    "Perfect Score": "🎯",
    "Knowledge Seeker": "📚",
    "Speed Demon": "💨",
    "Community Helper": "🤝",
    "AI Collaborator": "🤖",
    "Code Warrior": "⚔️",
    "Consistency Master": "🔥",
    "Night Owl": "🦉",
    "Quick Learner": "⚡",
    "First Steps": "🚀",
  };

  const [achievements, setachievements] = useState<any[]>([]);
  // get Achievements Data
  const achievementApiData = async () => {
    try {
      let response = await fetch(
        `${
          import.meta.env.VITE_API_BACKEND_URL
        }/api/achievements/achievements/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.access}`, // 🔑 attach token
          },
        }
      );
      const result = await response.json();
      if (!response.ok) {
        console.error(`Failed to fetch achievements: ${result}`);
        setachievements([]);
      } else {
        setachievements(result);
        // console.log(response);
      }
    } catch (err) {
      console.error("Error fetching achievements:", err);
      setachievements([]);
    }
  };

  const recentAchievements = achievements.filter((a) => a.is_unlocked);
  // Learning Streak ( GET )
  const [lrnStreak, setLrnStreak] = useState<any[]>([]);
  const learningStreak = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/courses/streak/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.access}`,
          },
        }
      );
      const result = await response.json();
      if (!response.ok) {
        console.error("Failed to Fetch Streak", result);
      }
      setLrnStreak(result);
      console.log("Learning streak", result);
    } catch (error) {
      console.error("Error in Fetching Streak", error);
    }
  };
  const [avgLearnTime, setAvgLearnTime] = useState<{
    average_learning_time: string;
  }>({
    average_learning_time: "2h 0m", // default value
  });

  const [totalLearnTime, setTotalLearnTime] = useState<{
    total_meeting_time: string;
  }>({ total_meeting_time: "0h 0m" });

  // Average Learning Time ( GET )
  const avgLearnTimeApiData = async () => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BACKEND_URL
        }/api/courses/average-learning-time/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.access}`,
          },
        }
      );
      const result = await res.json();
      if (!res.ok) {
        console.error("Failed to Fetch Average Learning Time", result);
      }
      setAvgLearnTime(result);
      console.log("Average Learing Hours", result);
    } catch (err) {
      console.error("Error in Average Learning time", err);
    }
  };

  // Total Learning Time ( GET )
  const ttlLearnTimeApiData = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/courses/total-hours/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.access}`,
          },
        }
      );
      const result = await res.json();
      if (!res.ok) {
        console.error("Failed to Fetch Total Learning Time", result);
      }
      setTotalLearnTime(result);
      console.log("Total Learing Hours", result);
    } catch (err) {
      console.error("Error in Total Learning time", err);
    }
  };

  // Assignment Avg Score ( GET )
  const [avgScore, setavgScore] = useState(String);
  const AssignmentAvgScore = async () => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BACKEND_URL
        }/api/assignments/average-score/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.access}`, // 🔑 attach token
          },
        }
      );

      const result = await res.json();
      if (!res.ok) {
        console.error("Failed to fetch assignment Avg score: ", result);
      }
      console.log(result);
      setavgScore(result);
    } catch (err) {
      console.error("Error in Assignment Avg Score: ", err);
    }
  };

  useEffect(() => {
    // refetch() // it is for notifications
    coursesApiData();
    sessionApiData();
    achievementApiData();
    learningStreak();
    avgLearnTimeApiData();
    ttlLearnTimeApiData();
    AssignmentAvgScore();
  }, []);

  return (
    <>
      {isInCall ? (
        <div className="h-[89vh] bg-black flex flex-col">
          {/* Video Call Interface */}
          <div className="flex-1 relative">
            {/* Main video area */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
              <div className="text-center text-white">
                <Avatar className=" size-24 md:size-32 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg" />
                </Avatar>
                {/* <h2 className="text-2xl font-semibold">{currentPatient}</h2> */}
                <p className="text-gray-300 font-bold text-xl">
                  Connected • {formatTime(secondsLeft)}
                </p>
                {secondsLeft == 0 && <p>This Session has ended</p>}
              </div>
            </div>

            {/* Self video (picture-in-picture) */}
            <div className="absolute top-4 right-4 md:w-48 md:h-35  bg-gray-800 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-900 flex items-center justify-center">
                <div className="text-white text-center p-1">
                  <Avatar className="md:size-16 mx-auto mb-2">
                    <AvatarImage src="/placeholder.svg" alt="Dr. Smith" />
                    <AvatarFallback>DS</AvatarFallback>
                  </Avatar>
                  <p className=" text-xs px-1 md:text-sm">
                    {currentinstructor}
                  </p>
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
        <div className="space-y-8 px-2 animate-fade-in">
          {/* Hero Section with Quick Actions */}
          <div className=" mx-auto relative overflow-hidden rounded-3xl bg-gradient-learning p-8 md:px-12 shadow-2xl">
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
                  <div className="flex items-center gap-4 sm:mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl md:text-6xl font-bold text-white animate-slide-in-right">
                        Welcome back, {user && user.username}
                      </h1>
                      <div className="flex items-center gap-2 mt-2">
                        <Zap className="w-5 h-5 text-yellow-300" />
                        <span className="text-white/90 font-medium">
                          Learning Streak: {lrnStreak.current_streak} days
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="sm:text-xl text-white/90 leading-relaxed">
                    You're making excellent progress! Complete 2 more lessons to
                    reach your weekly goal.
                  </p>

                  {/* Quick Action Buttons */}
                  <div className="flex flex-wrap gap-4 sm:pt-4">
                    <Button
                      onClick={() => {
                        navigate("my-courses");
                      }}
                      size="lg"
                      variant="outline"
                      className="bg-white text-primary hover:bg-white/10 backdrop-blur-sm hover-lift transition-all duration-200 px-4"
                    >
                      <Play className="w-5 h-5" />
                      Continue Learning
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white text-primary hover:bg-white/10 backdrop-blur-sm hover-lift transition-all duration-200 px-4"
                    >
                      <Brain className="w-5 h-5" />
                      Ask AI Tutor
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white text-primary hover:bg-white/10 backdrop-blur-sm hover-lift transition-all duration-200 px-4"
                    >
                      <Bell className="w-5 h-5" />
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
                            className="h-2 bg-white/40"
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
            <Card className="glass-card p-6 hover-lift shadow-md">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-200/50 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {" "}
                    {recentCourses && recentCourses.length}{" "}
                  </p>
                  <p className="text-muted-foreground">Courses Enrolled</p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 hover-lift shadow-md">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {totalLearnTime.total_meeting_time}{" "}
                  </p>
                  <p className="text-muted-foreground">Learning Time</p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 hover-lift shadow-md">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {" "}
                    {recentAchievements && recentAchievements.length}{" "}
                  </p>
                  <p className="text-muted-foreground">Achievements</p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 hover-lift shadow-md">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {" "}
                    {avgScore.average_score}{" "}
                  </p>
                  <p className="text-muted-foreground">Average Score</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Continue Learning */}
            <div className="lg:col-span-2 space-y-6   ">
              <div className="flex items-center justify-between w-[calc(100%-32px)] sm:w-[640px] md:w-[760px] lg:w-auto mx-auto">
                <h2 className="text-2xl font-bold">Continue Learning</h2>
                <Button variant="ghost">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="space-y-4 m-0">
                {recentCourses
                  .filter((course) => course.status == "in progress")
                  .map((course) => (
                    <Card
                      key={course.id}
                      className="glass-card w-[calc(100%-6px)] sm:w-[620px] md:w-[725px] lg:w-auto mx-auto  p-4 hover-lift group relative overflow-hidden shadow-md"
                    >
                      <div className="mb-4">
                        <div className="space-y-2 flex flex-wrap items-center justify-between mb-2 sm:mb-0">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {course.category}
                            </Badge>
                            <Badge
                              variant={
                                course.level === "Advanced"
                                  ? "destructive"
                                  : course.level === "Intermediate"
                                  ? "default"
                                  : "outline"
                              }
                              className="text-xs"
                            >
                              {course.level}
                            </Badge>
                          </div>
                          <Badge variant="outline" className="bg-primary/10">
                            {course.progress}% Complete
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                      </div>

                      <div className="space-y-4">
                        <Progress
                          value={course.progress}
                          className="h-3 bg-muted"
                        />

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="font-medium text-sm">
                              Next: {course.next_lesson}
                            </p>
                            <div className="flex items-center justify-start md:gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {100 - course.progress}% remaining
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
                            <Button className="px-2 gap-1">
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
              <div className=" ">
                <div className="flex items-center justify-between w-[calc(100%-32px)] sm:w-[640px] md:w-[760px] lg:w-auto mx-auto py-5">
                  <h2 className=" texl-lg sm:text-xl md:text-2xl font-bold">
                    Upcoming Live Sessions
                  </h2>
                  <Button variant="ghost" size="sm">
                    View Calendar <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <div className="space-y-6  w-auto p-0 ">
                  {upcomingSessions
                    .filter((sess) => sess.status == "live")
                    .map((session) => (
                      <Card
                        key={session.id}
                        className="glass-card p-2 mx-auto  hover-lift group border-x-4 border-x-orange-300 w-[calc(100%-12px)] sm:w-[640px] md:w-[740px] lg:w-auto shadow-md"
                      >
                        <div className="flex flex-col sm:flex-row items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className=" size-10 sm:size-10 md:size-14 bg-gradient- rounded-xl flex items-center justify-center">
                              <Users className=" size-4 md:size-6 text-orange-400" />
                            </div>
                            <div className="space-y-2">
                              <h3 className="font-semibold group-hover:text-orange-400 transition-colors">
                                {session.title}
                              </h3>

                              <p className="text-sm text-muted-foreground">
                                with {session.instructor}
                              </p>

                              <div className="flex items-center space-x-2 sm:space-x-4 text-xs">
                                <span className="flex items-center gap-1 font-medium">
                                  <Calendar className="w-3 h-3" />
                                  {formatApiDate(session.start_time)},{" "}
                                  {formatUTCTo12HourTime(session.start_time)}
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
                              {session.status}
                              {/* Live Soon */}
                            </Badge>
                            <Button
                              onClick={() =>
                                window.open(session.recording_url, "_blank")
                              }
                            >
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
            <div className="space-y-6 py-2   grid sm:grid-cols-2 lg:grid-cols-1 grid-cols-1 ">
              {/* AI Tutor Quick Access */}
              <Card className="glass-card p-6 w-[calc(100%-32px)] mx-auto shadow-md">
                <div className="text-center space-y-2">
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
                  <Button
                    className="w-full"
                    onClick={() => {
                      navigate("ai-tutor");
                    }}
                  >
                    Start Conversation
                  </Button>
                </div>
              </Card>

              {/* Recent Achievements */}
              <Card className="glass-card p-4 w-[calc(100%-32px)] shadow-md mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Recent Achievements</h3>
                  <Button variant="ghost" size="sm">
                    <Award className="w-4 h-4 mr-1" />
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {recentAchievements.slice(0, 3).map((achievement) => (
                    <div
                      key={achievement.id}
                      className="group flex items-center space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                        <span className="text-lg">
                          {achievement.is_unlocked
                            ? icons[achievement.title]
                            : ""}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm group-hover:text-orange-400 transition-colors">
                            {achievement.title}
                          </p>
                          <Badge
                            variant="outline"
                            className="text-xs group-hover:bg-orange-400 group-hover:text-white"
                          >
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

              <Card className="glass-card w-[calc(100%-32px)] shadow-md mx-auto">
                <Notification notifications={notifications} />
              </Card>

              {/* Quick Stats */}
              <Card className="glass-card p-6 w-[calc(100%-32px)] shadow-md mx-auto">
                <h3 className="text-lg font-semibold mb-4">This Week</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Study Time</span>
                    <span className="font-semibold">
                      {" "}
                      {avgLearnTime.average_learning_time}{" "}
                    </span>
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
                    <span className="font-semibold">
                      {lrnStreak.current_streak} days 🔥
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Extended Content - Study Plan & Progress Tracking */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Personalized Study Plan */}
            <Card className="glass-card p-6">
              <div className="flex items-center justify-between gap-4 mb-6">
                <h2 className="text-lg sm:text-2xl font-bold">My Study Plan</h2>
                {/* <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                  Customize
                </Button> */}
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
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all duration-800 hover:-translate-y-1"
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
                {/* <Button variant="outline" size="sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Report
                </Button> */}
              </div>

              <div className="space-y-6">
                {/* Performance Chart */}
                <div className="">
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
                        className="h-16 bg-muted/30 rounded flex items-end justify-center  hover:scale-y-1 "
                      >
                        <div
                          className="bg-orange-400 rounded-t w-full transition-all duration-300 hover:bg-orange-500"
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
                  {
                    icon: Brain,
                    label: "AI Flashcards",
                    color: "bg-orange-500",
                  },
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
                  <div className="w-16 h-16 bg-orange-200/50 rounded-full flex items-center justify-center mx-auto">
                    <Users className="w-8 h-8 text-orange-400" />
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
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto">
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
