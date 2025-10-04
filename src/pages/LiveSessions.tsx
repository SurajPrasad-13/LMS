import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Video,
  Calendar,
  Clock,
  Users,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Monitor,
  MessageSquare,
  Hand,
  Settings,
  Search,
  Filter,
  Play,
  Square,
  Volume2,
  VolumeX,
  MoreVertical,
  Bell,
  Star,
  Download,
  ExternalLink,
  Link,
  Phone,
  Cast,
  VideoOff,
  PhoneOff,
  Pencil,
  Trash,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { IoMdAdd } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";
import { useAuth } from "@/Context/AuthContext"; // Import useAuth

export default function LiveSessions() {
  // const [searchTerm, setSearchTerm] = useState("");
  // const [selectedFilter, setSelectedFilter] = useState("all");
  const [upcomingSessions, setupcomingSessions] = useState<any[]>([]);
  const { user } = useAuth(); // Get user from AuthContext
  // console.log(user)

  // Get Session Data
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
      let result = await response.json();
      const processedSessions = result.map((session) => {
        let topics = [];
        if (typeof session.topics === "string") {
          topics = session.topics
            .replace(/[\[\]'\"]+/g, "")
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t);
        } else if (Array.isArray(session.topics)) {
          topics = session.topics;
        }
        return { ...session, topics: topics };
      });
      setupcomingSessions(processedSessions);
      console.log(processedSessions);
    } catch (error) {
      console.error("Failed to fetch session data:", error);
    }
  };
  useEffect(() => {
    sessionApiData();
  }, []);

  // Add Session Data
  const navigate = useNavigate();
  const addSession = () => {
    navigate("sessionForm");
  };

  // Delete Session Data
  const deleteSession = async (id) => {
    console.log(
      `${import.meta.env.VITE_API_BACKEND_URL}/api/sessions/sessions/${id}`
    );
    try {
      let response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/sessions/sessions/${id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch session with id : ${id} , ${response.status}`
        );
      }
      toast.success("Session deleted Successfully");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(`Session with id ${id} deleted successfully!`);
      // get data after delete a session
      sessionApiData();
    } catch (error) {
      console.error("Failed to delete Session: ", error);
    }
  };

  // Update Session Data

  const updateSession = (id) => {
    navigate(`editSessionForm/${id}`);
  };

  // const upcomingSessions = [
  //   {
  //     "title": "",✔️
  //     "instructor": "",✔️
  //     "instructor_avatar": "",✔️
  //     "duration": "",✔️
  //     "participants": null,✔️
  //     "max_participants": null,✔️
  //     "status": "",✔️
  //     "course_title": "",✔️
  //     "topics": null,✔️
  //     "is_recorded": false,✔️
  //     "has_handouts": false,✔️
  //     "difficulty": "",✔️
  //     "description": "",✔️
  //     "start_time": null,✔️
  //     "end_time": null,✔️
  //     "meeting_list": null,✔️
  //     "ratings": null,
  //     "content": "",
  //     "recording_url": "",
  //     "is_live": false,
  //     "slug": "",
  //     "meeting": null
  // }
  // {
  //   id: 1,
  //   title: "Advanced React Patterns & Performance",✔️
  //   instructor: "Dr. Sarah Chen",✔️
  //   start_time: "Today, 2:00 PM",✔️
  //   end_time: "3:30 PM",✔️
  //   participants: 24,✔️
  //   status: "starting-soon",✔️
  //   description:✔️
  //     "Deep dive into advanced React patterns including render props, higher-order components, and performance optimization techniques used in production applications.",
  //   course_title: "Advanced React Development",✔️
  //   instructor_avatar: "SC",✔️
  //   duration: "1h 30m",✔️
  //   max_participants: 30,✔️
  //   topics: ["Render Props", "HOCs", "Performance", "Memoization"],✔️
  //   is_recorded: true,✔️
  //   has_handouts: true,✔️
  //   difficulty: "Advanced",✔️
  //   meeting_list: {
  //     zoom: "https://zoom.us/j/123456789",
  //     meet: "https://meet.google.com/abc-defg-hij",
  //     teams: "https://teams.microsoft.com/l/meetup-join/abc123",
  //   },
  // },
  // {
  //   id: 2,
  //   title: "Machine Learning Ethics & Bias",
  //   instructor: "Prof. Michael Torres",
  //   instructorAvatar: "MT",
  //   startTime: "Tomorrow, 10:00 AM",
  //   endTime: "11:30 AM",
  //   duration: "1h 30m",
  //   participants: 18,
  //   maxParticipants: 25,
  //   status: "scheduled",
  //   description:
  //     "Critical discussion on ethical considerations in machine learning, identifying and mitigating bias in AI systems, and responsible AI development practices.",
  //   courseTitle: "Machine Learning Fundamentals",
  //   topics: ["Ethics", "Bias Detection", "Responsible AI", "Fairness"],
  //   isRecorded: true,
  //   hasHandouts: true,
  //   difficulty: "Intermediate",
  //   meetingLinks: {
  //     zoom: "https://zoom.us/j/987654321",
  //     meet: "https://meet.google.com/xyz-uvwx-rst",
  //     teams: "https://teams.microsoft.com/l/meetup-join/xyz789",
  //   },
  // },
  // {
  //   id: 3,
  //   title: "Live Coding: Building RESTful APIs",
  //   instructor: "Alex Kim",
  //   instructorAvatar: "AK",
  //   startTime: "Friday, 3:00 PM",
  //   endTime: "5:00 PM",
  //   duration: "2h 0m",
  //   participants: 31,
  //   maxParticipants: 35,
  //   status: "scheduled",
  //   description:
  //     "Hands-on coding session where we'll build a complete RESTful API from scratch using Node.js and Express, covering authentication, validation, and database integration.",
  //   courseTitle: "Full-Stack JavaScript",
  //   topics: ["Node.js", "Express", "REST API", "Authentication"],
  //   isRecorded: true,
  //   hasHandouts: false,
  //   difficulty: "Intermediate",
  //   meetingLinks: {
  //     zoom: "https://zoom.us/j/456789123",
  //     meet: "https://meet.google.com/def-ghij-klm",
  //     teams: "https://teams.microsoft.com/l/meetup-join/def456",
  //   },
  // },
  // ];

  // const liveSessions = [
  //   {
  //     id: 4,
  //     title: "UI/UX Design Workshop",
  //     instructor: "Emma Rodriguez",
  //     instructor_avatar: "ER",
  //     startTime: "Now",
  //     duration: "45m remaining",
  //     participants: 42,
  //     maxParticipants: 50,
  //     status: "live",
  //     description:
  //       "Interactive workshop on modern UI/UX design principles with real-time feedback and collaborative design exercises.",
  //     courseTitle: "UI/UX Design Principles",
  //     isRecorded: true,
  //     meeting_list: {
  //       zoom: "https://zoom.us/j/555666777",
  //       meet: "https://meet.google.com/live-session-now",
  //       teams: "https://teams.microsoft.com/l/meetup-join/live123",
  //     },
  //   },
  // ];
  const liveSessions = upcomingSessions.filter(
    (session) => session.status == "live"
  );
  console.log(liveSessions);

  // const recentRecordings = [
  //   {
  //     id: 5,
  //     title: "Introduction to Cloud Architecture",
  //     instructor: "James Patterson",
  //     recordedDate: "Yesterday",
  //     duration: "1h 45m",
  //     views: 156,
  //     rating: 4.8,
  //     courseTitle: "Cloud Architecture with AWS",
  //   },
  //   {
  //     id: 6,
  //     title: "Data Science Project Walkthrough",
  //     instructor: "Dr. Lisa Wang",
  //     recordedDate: "3 days ago",
  //     duration: "2h 15m",
  //     views: 203,
  //     rating: 4.9,
  //     courseTitle: "Data Science with Python",
  //   },
  // ];

  const recentRecordings = upcomingSessions.filter(
    (session) => session.status == "recorded"
  );
  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-500 text-white";
      case "starting-soon":
        return "bg-accent hover:bg-white text-accent-foreground";
      case "scheduled":
        return "bg-orange-400 text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "live":
        return "LIVE NOW";
      case "starting-soon":
        return "Starting Soon";
      case "scheduled":
        return "Scheduled";
      default:
        return status;
    }
  };
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [currentinstructor, setcurrentinstructor] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);

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
      // weekday: "short",
      month: "short",
      day: "numeric",
    });
  };
  const getAvatar = (data) => {
    if (!data) return ""; // agar value nahi hai to empty string

    const words = data.split(" "); // words me tod do
    const lastTwo = words.slice(-2); // last 2 words
    const firstChars = lastTwo[0][0] + lastTwo[1][0]; // first chars combine karo
    return firstChars.toUpperCase(); // agar uppercase me chahiye
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const filteredSessions = upcomingSessions.filter((session) => {
    const matchesSearch =
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || session.status === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
                  <AvatarImage
                    src="/placeholder.svg"
                    className="h-32 rounded-full"
                  />
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
                    <AvatarImage
                      src="/placeholder.svg"
                      alt="Dr. Smith"
                      className="h-16 rounded-full"
                    />
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
                <h1 className="text-4xl font-bold">Live Sessions</h1>
                <p className="text-muted-foreground text-lg">
                  Join interactive learning sessions with expert instructors
                </p>
              </div>
              {user && user.role === "Admin" && (
                <div className=" flex flex-col md:flex-row  md:items-center justify-center gap-2">
                  <Button
                    className="bg-gradient-learning text-sm md:text-[16px]"
                    onClick={addSession}
                  >
                    <IoMdAdd />
                    Add a Session
                  </Button>
                </div>
              )}
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="searchTerm"
                  placeholder="Search sessions, instructors..."
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
          </div>

          {/* Live Now Section */}
          {liveSessions.length > 0 && (
            <div className="space-y-4 w-full max-w-7xl mx-auto px-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <h2 className="text-2xl font-bold">Live Now</h2>
              </div>

              {/* Cards Grid */}
              <div className="space-y-6">
                {liveSessions.map((session) => (
                  <Card
                    key={session.id}
                    className="glass-card p-4 sm:p-5 md:p-6 border-red-500/20 hover-lift w-full"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                      <div className="flex items-center flex-wrap gap-3">
                        <Badge
                          className={`${getStatusColor(
                            session.status
                          )} animate-pulse`}
                        >
                          <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                          {getStatusText(session.status)}
                        </Badge>
                        <Badge variant="outline">{session.course_title}</Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Left (Details) */}
                      <div className="lg:col-span-2 space-y-4">
                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold mb-2">
                            {session.title}
                          </h3>
                          <p className="text-muted-foreground text-sm sm:text-base">
                            {session.description}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-learning rounded-full flex items-center justify-center text-white text-xs font-medium">
                              {getAvatar(session.instructor)}
                            </div>
                            <span>{session.instructor}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{session.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>
                              {session.participants}/{session.maxParticipants}{" "}
                              participants
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right (Controls + Join) */}
                      <div className="space-y-4">
                        {/* Session Controls */}
                        <div className="glass-card shadow-xl p-4 space-y-3">
                          <h4 className="font-medium text-sm sm:text-base">
                            Session Controls
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            <Button size="sm" variant="outline">
                              <Mic className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Camera className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Monitor className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Meeting Links */}
                        <div className="glass-card shadow-xl p-4 space-y-3">
                          <h4 className="font-medium text-sm sm:text-base">
                            Join via Platform
                          </h4>
                          <div className="space-y-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full justify-start"
                              onClick={() =>
                                window.open(session.meeting_list.zoom, "_blank")
                              }
                            >
                              <Video className="w-4 h-4 mr-2" />
                              Zoom
                              <ExternalLink className="w-3 h-3 ml-auto" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full justify-start"
                              onClick={() =>
                                window.open(session.meeting_list.meet, "_blank")
                              }
                            >
                              <Cast className="w-4 h-4 mr-2" />
                              Google Meet
                              <ExternalLink className="w-3 h-3 ml-auto" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full justify-start"
                              onClick={() =>
                                window.open(
                                  session.meeting_list.teams,
                                  "_blank"
                                )
                              }
                            >
                              <Phone className="w-4 h-4 mr-2" />
                              Teams
                              <ExternalLink className="w-3 h-3 ml-auto" />
                            </Button>
                          </div>
                        </div>

                        {/* Join Session Button */}
                        <Button
                          // onClick={() => startCall(session.instructor)}
                          onClick={() =>
                            window.open(session.recording_url, "_blank")
                          }
                          className="w-full bg-red-500 hover:bg-red-600 animate-pulse duration-1500 "
                        >
                          <Video className="w-4 h-4 mr-2" />
                          Join Live Session
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Sessions */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Upcoming Sessions</h2>

            <div className="grid gap-6 sm:grid-cols-1">
              {filteredSessions
                .filter(
                  (session) => session.status == "scheduled" || "starting-soon"
                )
                .map((session) => (
                  <Card
                    key={session.id}
                    className="glass-card shadow-md p-4 sm:p-5 md:p-6 hover-lift"
                  >
                    {/* Header: Badges and Buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2 ">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={getStatusColor(session.status)}>
                          {getStatusText(session.status)}
                        </Badge>
                        <Badge variant="outline">{session.course_title}</Badge>
                        <Badge variant="secondary">{session.difficulty}</Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {session.is_recorded && (
                          <Badge variant="outline" className="text-xs">
                            <Video className="w-3 h-3 mr-1" />
                            Recorded
                          </Badge>
                        )}
                        {session.has_handouts && (
                          <Badge variant="outline" className="text-xs">
                            <Download className="w-3 h-3 mr-1" />
                            Handouts
                          </Badge>
                        )}
                        <Button variant="outline" className=" h-8 px-2 ">
                          <Bell className="w-4 h-4" />
                        </Button>
                        {user && user.role === "Admin" && (
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              onClick={() => {
                                updateSession(session.id);
                              }}
                              // size="sm"
                              className="bg-blue-200 hover:bg-blue-500 h-8 px-2 "
                              title="Edit Session"
                            >
                              <Pencil />
                            </Button>
                            <Button
                              onClick={() => {
                                deleteSession(session.id);
                              }}
                              size="sm"
                              className="bg-red-200 hover:bg-red-500  h-8 px-2  "
                              title="Delete Session"
                            >
                              <Trash />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {/* Left Content */}
                      <div className="md:col-span-3 space-y-4">
                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold mb-2">
                            {session.title}
                          </h3>
                          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                            {session.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {session.topics.map((topic, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {topic}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-learning rounded-full flex items-center justify-center text-white text-xs font-medium">
                              {getAvatar(session.instructor)}
                            </div>
                            <span>{session.instructor}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {formatApiDate(session.start_time)},{" "}
                              {formatUTCTo12HourTime(session.start_time)} -{" "}
                              {formatUTCTo12HourTime(session.end_time)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{session.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>
                              {session.participants}/{session.max_participants}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Controls */}
                      <div className="space-y-3">
                        {/* Participants */}
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">
                            Participants
                          </p>
                          <div className="progress-bar mt-1 bg-muted rounded-full h-2 w-full overflow-hidden">
                            <div
                              className="progress-fill bg-primary h-2"
                              style={{
                                width: `${
                                  (session.participants /
                                    session.max_participants) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {session.max_participants - session.participants}{" "}
                            spots left
                          </p>
                        </div>

                        {/* Quick Join if session starting soon */}
                        {session.status === "starting-soon" && (
                          <div className="shadow-xl rounded-xl  p-3 space-y-2">
                            <p className="text-xs font-medium">Quick Join</p>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1"
                                onClick={() =>
                                  window.open(
                                    session.meeting_list.zoom,
                                    "_blank"
                                  )
                                }
                              >
                                <Video className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1"
                                onClick={() =>
                                  window.open(
                                    session.meeting_list.meet,
                                    "_blank"
                                  )
                                }
                              >
                                <Cast className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1"
                                onClick={() =>
                                  window.open(
                                    session.meeting_list.teams,
                                    "_blank"
                                  )
                                }
                              >
                                <Phone className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Join/Add to Calendar */}
                        <Button
                          className="w-full"
                          variant={
                            session.status === "starting-soon"
                              ? "default"
                              : "outline"
                          }
                        >
                          {session.status === "starting-soon" ? (
                            <div
                              onClick={() => startCall(session.instructor)}
                              className="flex items-center"
                            >
                              <Video className="w-4 h-4 mr-2" />
                              Join Session
                            </div>
                          ) : (
                            <>
                              <Calendar className="w-4 h-4 mr-2" />
                              Add to Calendar
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>

          {/* Recent Recordings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recent Recordings</h2>
              <Button variant="outline">View All Recordings</Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {recentRecordings.map((recording) => (
                <Card key={recording.id} className="glass-card p-6 hover-lift">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <Badge variant="outline">{recording.course_title}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-300" />
                        <span className="text-sm font-medium">
                          {recording.rating}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {recording.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>by {recording.instructor}</span>
                        <span>{recording.recordedDate}</span>
                        <span>{recording.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{recording.views} views</span>
                      </div>
                      <Button
                        // onClick={() => startCall(recording.course_title)}
                        onClick={() =>
                          window.open(recording.recording_url, "_blank")
                        }
                        className="p-2 gap-0 sm:gap-2 sm:px-4"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Watch Recording
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
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
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </>
  );
}
