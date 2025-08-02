import { useState } from "react";
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
} from "lucide-react";

export default function LiveSessions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const upcomingSessions = [
    {
      id: 1,
      title: "Advanced React Patterns & Performance",
      instructor: "Dr. Sarah Chen",
      instructorAvatar: "SC",
      startTime: "Today, 2:00 PM",
      endTime: "3:30 PM",
      duration: "1h 30m",
      participants: 24,
      maxParticipants: 30,
      status: "starting-soon",
      description:
        "Deep dive into advanced React patterns including render props, higher-order components, and performance optimization techniques used in production applications.",
      courseTitle: "Advanced React Development",
      topics: ["Render Props", "HOCs", "Performance", "Memoization"],
      isRecorded: true,
      hasHandouts: true,
      difficulty: "Advanced",
      meetingLinks: {
        zoom: "https://zoom.us/j/123456789",
        meet: "https://meet.google.com/abc-defg-hij",
        teams: "https://teams.microsoft.com/l/meetup-join/abc123",
      },
    },
    {
      id: 2,
      title: "Machine Learning Ethics & Bias",
      instructor: "Prof. Michael Torres",
      instructorAvatar: "MT",
      startTime: "Tomorrow, 10:00 AM",
      endTime: "11:30 AM",
      duration: "1h 30m",
      participants: 18,
      maxParticipants: 25,
      status: "scheduled",
      description:
        "Critical discussion on ethical considerations in machine learning, identifying and mitigating bias in AI systems, and responsible AI development practices.",
      courseTitle: "Machine Learning Fundamentals",
      topics: ["Ethics", "Bias Detection", "Responsible AI", "Fairness"],
      isRecorded: true,
      hasHandouts: true,
      difficulty: "Intermediate",
      meetingLinks: {
        zoom: "https://zoom.us/j/987654321",
        meet: "https://meet.google.com/xyz-uvwx-rst",
        teams: "https://teams.microsoft.com/l/meetup-join/xyz789",
      },
    },
    {
      id: 3,
      title: "Live Coding: Building RESTful APIs",
      instructor: "Alex Kim",
      instructorAvatar: "AK",
      startTime: "Friday, 3:00 PM",
      endTime: "5:00 PM",
      duration: "2h 0m",
      participants: 31,
      maxParticipants: 35,
      status: "scheduled",
      description:
        "Hands-on coding session where we'll build a complete RESTful API from scratch using Node.js and Express, covering authentication, validation, and database integration.",
      courseTitle: "Full-Stack JavaScript",
      topics: ["Node.js", "Express", "REST API", "Authentication"],
      isRecorded: true,
      hasHandouts: false,
      difficulty: "Intermediate",
      meetingLinks: {
        zoom: "https://zoom.us/j/456789123",
        meet: "https://meet.google.com/def-ghij-klm",
        teams: "https://teams.microsoft.com/l/meetup-join/def456",
      },
    },
  ];

  const liveSessions = [
    {
      id: 4,
      title: "UI/UX Design Workshop",
      instructor: "Emma Rodriguez",
      instructorAvatar: "ER",
      startTime: "Now",
      duration: "45m remaining",
      participants: 42,
      maxParticipants: 50,
      status: "live",
      description:
        "Interactive workshop on modern UI/UX design principles with real-time feedback and collaborative design exercises.",
      courseTitle: "UI/UX Design Principles",
      isRecorded: true,
      meetingLinks: {
        zoom: "https://zoom.us/j/555666777",
        meet: "https://meet.google.com/live-session-now",
        teams: "https://teams.microsoft.com/l/meetup-join/live123",
      },
    },
  ];

  const recentRecordings = [
    {
      id: 5,
      title: "Introduction to Cloud Architecture",
      instructor: "James Patterson",
      recordedDate: "Yesterday",
      duration: "1h 45m",
      views: 156,
      rating: 4.8,
      courseTitle: "Cloud Architecture with AWS",
    },
    {
      id: 6,
      title: "Data Science Project Walkthrough",
      instructor: "Dr. Lisa Wang",
      recordedDate: "3 days ago",
      duration: "2h 15m",
      views: 203,
      rating: 4.9,
      courseTitle: "Data Science with Python",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-500 text-white";
      case "starting-soon":
        return "bg-accent text-accent-foreground";
      case "scheduled":
        return "bg-primary text-primary-foreground";
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

  return (
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
          <Button className="bg-gradient-learning">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Session
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search sessions, instructors, or topics..."
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
                    <Badge variant="outline">{session.courseTitle}</Badge>
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
                          {session.instructorAvatar}
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
                    <div className="glass-card p-4 space-y-3">
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
                    <div className="glass-card p-4 space-y-3">
                      <h4 className="font-medium text-sm sm:text-base">
                        Join via Platform
                      </h4>
                      <div className="space-y-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() =>
                            window.open(session.meetingLinks.zoom, "_blank")
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
                            window.open(session.meetingLinks.meet, "_blank")
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
                            window.open(session.meetingLinks.teams, "_blank")
                          }
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Teams
                          <ExternalLink className="w-3 h-3 ml-auto" />
                        </Button>
                      </div>
                    </div>

                    {/* Join Session Button */}
                    <Button className="w-full bg-red-500 hover:bg-red-600">
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
    {upcomingSessions.map((session) => (
      <Card key={session.id} className="glass-card p-4 sm:p-5 md:p-6 hover-lift">
        {/* Header: Badges and Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={getStatusColor(session.status)}>
              {getStatusText(session.status)}
            </Badge>
            <Badge variant="outline">{session.courseTitle}</Badge>
            <Badge variant="secondary">{session.difficulty}</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {session.isRecorded && (
              <Badge variant="outline" className="text-xs">
                <Video className="w-3 h-3 mr-1" />
                Recorded
              </Badge>
            )}
            {session.hasHandouts && (
              <Badge variant="outline" className="text-xs">
                <Download className="w-3 h-3 mr-1" />
                Handouts
              </Badge>
            )}
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
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
                <Badge key={index} variant="secondary" className="text-xs">
                  {topic}
                </Badge>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-learning rounded-full flex items-center justify-center text-white text-xs font-medium">
                  {session.instructorAvatar}
                </div>
                <span>{session.instructor}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {session.startTime} - {session.endTime}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{session.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>
                  {session.participants}/{session.maxParticipants}
                </span>
              </div>
            </div>
          </div>

          {/* Right Controls */}
          <div className="space-y-3">
            {/* Participants */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Participants</p>
              <div className="progress-bar mt-1 bg-muted rounded-full h-2 w-full overflow-hidden">
                <div
                  className="progress-fill bg-primary h-2"
                  style={{
                    width: `${
                      (session.participants / session.maxParticipants) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {session.maxParticipants - session.participants} spots left
              </p>
            </div>

            {/* Quick Join if session starting soon */}
            {session.status === "starting-soon" && (
              <div className="glass-card p-3 space-y-2">
                <p className="text-xs font-medium">Quick Join</p>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() =>
                      window.open(session.meetingLinks.zoom, "_blank")
                    }
                  >
                    <Video className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() =>
                      window.open(session.meetingLinks.meet, "_blank")
                    }
                  >
                    <Cast className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() =>
                      window.open(session.meetingLinks.teams, "_blank")
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
                session.status === "starting-soon" ? "default" : "outline"
              }
            >
              {session.status === "starting-soon" ? (
                <>
                  <Video className="w-4 h-4 mr-2" />
                  Join Session
                </>
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


      {/* Session Recordings */}
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
                  <Badge variant="outline">{recording.courseTitle}</Badge>
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
                  <Button className="p-2 gap-0 sm:gap-2 sm:px-4">
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
  );
}
