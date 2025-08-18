import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  Video,
  BookOpen,
  FileText,
  Users,
  MapPin,
  Bell,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  CalendarDays,
  Timer,
  Target,
  Repeat,
  AlertCircle,
} from "lucide-react";

export default function Schedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("week");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const events = [
    {
      id: 1,
      title: "Advanced React Patterns",
      type: "live-session",
      course: "Advanced React Development",
      instructor: "Dr. Sarah Chen",
      startTime: "2024-02-15T14:00:00",
      endTime: "2024-02-15T15:30:00",
      location: "Virtual Room A",
      participants: 24,
      color: "bg-blue-500",
      status: "confirmed",
      description:
        "Deep dive into advanced React patterns including render props and HOCs",
      reminder: "15 minutes before",
    },
    {
      id: 2,
      title: "ML Assignment Due",
      type: "assignment",
      course: "Machine Learning Fundamentals",
      instructor: "Prof. Michael Torres",
      startTime: "2024-02-15T23:59:00",
      endTime: "2024-02-15T23:59:00",
      location: "Online Submission",
      color: "bg-red-500",
      status: "pending",
      description: "Neural network implementation project submission deadline",
      reminder: "1 day before",
    },
    {
      id: 3,
      title: "UI/UX Design Workshop",
      type: "workshop",
      course: "UI/UX Design Principles",
      instructor: "Emma Rodriguez",
      startTime: "2024-02-16T10:00:00",
      endTime: "2024-02-16T12:00:00",
      location: "Design Lab",
      participants: 18,
      color: "bg-purple-500",
      status: "confirmed",
      description:
        "Hands-on workshop on modern design principles and prototyping",
      reminder: "30 minutes before",
    },
    {
      id: 4,
      title: "Study Group - JavaScript",
      type: "study-group",
      course: "Full-Stack JavaScript",
      instructor: "Student Led",
      startTime: "2024-02-16T16:00:00",
      endTime: "2024-02-16T18:00:00",
      location: "Library Room 203",
      participants: 8,
      color: "bg-green-500",
      status: "confirmed",
      description: "Collaborative study session for upcoming JavaScript exam",
      reminder: "10 minutes before",
    },
    {
      id: 5,
      title: "Data Science Project Review",
      type: "meeting",
      course: "Data Science with Python",
      instructor: "Dr. Lisa Wang",
      startTime: "2024-02-17T13:00:00",
      endTime: "2024-02-17T14:00:00",
      location: "Office Hours",
      color: "bg-yellow-500",
      status: "confirmed",
      description: "One-on-one project review and feedback session",
      reminder: "5 minutes before",
    },
    {
      id: 6,
      title: "Cloud Architecture Exam",
      type: "exam",
      course: "Cloud Architecture with AWS",
      instructor: "James Patterson",
      startTime: "2024-02-18T09:00:00",
      endTime: "2024-02-18T11:00:00",
      location: "Testing Center",
      color: "bg-orange-500",
      status: "confirmed",
      description: "Final exam covering AWS services and architecture patterns",
      reminder: "2 hours before",
    },
  ];

  const categories = [
    { id: "all", name: "All Events", count: events.length },
    {
      id: "live-session",
      name: "Live Sessions",
      count: events.filter((e) => e.type === "live-session").length,
    },
    {
      id: "assignment",
      name: "Assignments",
      count: events.filter((e) => e.type === "assignment").length,
    },
    {
      id: "exam",
      name: "Exams",
      count: events.filter((e) => e.type === "exam").length,
    },
    {
      id: "workshop",
      name: "Workshops",
      count: events.filter((e) => e.type === "workshop").length,
    },
    {
      id: "study-group",
      name: "Study Groups",
      count: events.filter((e) => e.type === "study-group").length,
    },
  ];

  const upcomingEvents = events
    .filter((event) => new Date(event.startTime) >= new Date())
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    )
    .slice(0, 5);

  const todayEvents = events.filter((event) => {
    const eventDate = new Date(event.startTime);
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
  });

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "live-session":
        return <Video className="w-4 h-4" />;
      case "assignment":
        return <FileText className="w-4 h-4" />;
      case "exam":
        return <Target className="w-4 h-4" />;
      case "workshop":
        return <Users className="w-4 h-4" />;
      case "study-group":
        return <BookOpen className="w-4 h-4" />;
      case "meeting":
        return <Users className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "live-session":
        return "bg-blue-500 text-white";
      case "assignment":
        return "bg-red-500 text-white";
      case "exam":
        return "bg-orange-500 text-white";
      case "workshop":
        return "bg-purple-500 text-white";
      case "study-group":
        return "bg-green-500 text-white";
      case "meeting":
        return "bg-yellow-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.startTime);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || event.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">Schedule</h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              Manage your learning schedule and never miss important deadlines
            </p>
          </div>
          <Button className="bg-gradient-learning w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
            <div className="flex items-center bg-muted rounded-lg p-1">
              {["month", "week", "day"].map((viewType) => (
                <Button
                  key={viewType}
                  variant={view === viewType ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView(viewType as any)}
                  className="capitalize mx-1"
                >
                  {viewType}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="font-medium min-w-[120px] text-center">
                {currentDate.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <Button variant="outline" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? "bg-orange-400" : ""}
            >
              {category.name}
              <Badge variant="outline" className="ml-2 bg-white ">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar/Schedule View */}
        <div className="lg:col-span-3 space-y-4 sm:space-y-6">
          {view === "month" && (
            <Card className="glass-card p-4 sm:p-6">
              <div className="grid grid-cols-7 gap-2 sm:gap-4 mb-4 text-xs sm:text-sm">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center font-medium text-muted-foreground py-2"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>

              <div className="grid grid-cols-7 gap-2 sm:gap-3">
                {getDaysInMonth(currentDate).map((day, index) => (
                  <div
                    key={index}
                    className={`min-h-[100px] sm:min-h-[120px] p-2 border border-border/30 rounded-lg ${
                      day ? "hover:bg-muted/50 cursor-pointer" : ""
                    }`}
                  >
                    {day && (
                      <>
                        <div className="font-medium mb-2 text-sm">
                          {day.getDate()}
                        </div>
                        <div className="space-y-1">
                          {getEventsForDate(day)
                            .slice(0, 3)
                            .map((event) => (
                              <div
                                key={event.id}
                                className={`text-xs p-1 rounded text-white truncate ${event.color}`}
                              >
                                {event.title}
                              </div>
                            ))}
                          {getEventsForDate(day).length > 3 && (
                            <div className="text-xs text-muted-foreground">
                              +{getEventsForDate(day).length - 3} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {view === "week" && (
            <Card className="glass-card  p-4 sm:p-6">
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all  hover:-translate-y-2"
                  >
                    <div className="flex-shrink-0">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${event.color}`}
                      >
                        {getEventTypeIcon(event.type)}
                      </div>
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <h3 className="font-semibold">{event.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge className={getEventTypeColor(event.type)}>
                            {event.type.replace("-", " ")}
                          </Badge>
                          {event.status === "pending" && (
                            <AlertCircle className="w-4 h-4 text-warning" />
                          )}
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm">
                        {event.description}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="w-4 h-4" />
                          <span>{formatDate(event.startTime)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            {formatTime(event.startTime)} -{" "}
                            {formatTime(event.endTime)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        {event.participants && (
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{event.participants} participants</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-3">
                        <Badge variant="outline">{event.course}</Badge>
                        <div className="flex  gap-1 ">
                          <Button className="text-sm" variant="outline" size="sm">
                            <Bell className="w-3 h-3 text-sm mr-1" />
                            {event.reminder}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreVertical className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {view === "day" && (
            <Card className="glass-card p-4 sm:p-6">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h2 className="text-xl font-semibold">
                    {currentDate.toLocaleDateString([], {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </h2>
                  <Badge variant="outline">
                    {todayEvents.length} events today
                  </Badge>
                </div>

                <div className="space-y-4">
                  {todayEvents.length > 0 ? (
                    todayEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/30 rounded-lg"
                      >
                        <div className="flex flex-col items-center">
                          <div className="text-sm font-medium">
                            {formatTime(event.startTime)}
                          </div>
                          <div className="w-px bg-border h-8 mt-2"></div>
                        </div>

                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center ${event.color}`}
                            >
                              {getEventTypeIcon(event.type)}
                            </div>
                            <h3 className="font-semibold">{event.title}</h3>
                            <Badge className={getEventTypeColor(event.type)}>
                              {event.type.replace("-", " ")}
                            </Badge>
                          </div>

                          <p className="text-muted-foreground text-sm mb-2">
                            {event.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span>📍 {event.location}</span>
                            <span>👨‍🏫 {event.instructor}</span>
                            {event.participants && (
                              <span>👥 {event.participants} participants</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        No events scheduled
                      </h3>
                      <p className="text-muted-foreground">
                        Enjoy your free day!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Today's Summary */}
          <Card className="glass-card p-4 sm:p-6">
            <h3 className="font-semibold mb-4">Today's Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Events</span>
                <Badge variant="outline" className="bg-orange-400 text-white" >{todayEvents.length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Live Sessions</span>
                <Badge variant="outline" className="hover:bg-orange-400 hover:text-white">
                  {todayEvents.filter((e) => e.type === "live-session").length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Assignments Due</span>
                <Badge variant="outline" className="hover:bg-orange-400 hover:text-white">
                  {todayEvents.filter((e) => e.type === "assignment").length}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card className="glass-card p-4 sm:p-6">
            <h3 className="font-semibold mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${event.color}`}
                  >
                    {getEventTypeIcon(event.type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(event.startTime)} at{" "}
                      {formatTime(event.startTime)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="glass-card p-4 sm:p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Schedule Study Session
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="w-4 h-4 mr-2" />
                Set Reminder
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Repeat className="w-4 h-4 mr-2" />
                Create Recurring Event
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Timer className="w-4 h-4 mr-2" />
                Time Blocking
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
