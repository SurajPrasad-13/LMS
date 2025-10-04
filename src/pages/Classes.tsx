import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  Users,
  Video,
  MapPin,
  Search,
  BookOpen,
  Laptop,
  UserCheck,
  Star,
  Play,
  MessageCircle,
  Globe,
} from "lucide-react";

const Classes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("all");

  const liveClasses = [
    {
      id: 1,
      title: "AI Fundamentals Workshop",
      instructor: "Dr. Sarah Mitchell",
      date: "2024-01-15",
      time: "2:00 PM EST",
      duration: "2 hours",
      format: "live",
      students: 45,
      maxStudents: 50,
      price: 79,
      rating: 4.9,
      description:
        "Interactive workshop covering AI basics, machine learning concepts, and practical applications in business.",
      topics: [
        "AI Basics",
        "ML Algorithms",
        "Business Applications",
        "Hands-on Practice",
      ],
      level: "Beginner",
      language: "English",
    },
    {
      id: 2,
      title: "Advanced React Patterns",
      instructor: "Alex Chen",
      date: "2024-01-16",
      time: "7:00 PM EST",
      duration: "3 hours",
      format: "live",
      students: 38,
      maxStudents: 40,
      price: 129,
      rating: 4.8,
      description:
        "Deep dive into advanced React patterns, performance optimization, and modern development practices.",
      topics: [
        "Hooks Patterns",
        "Performance",
        "State Management",
        "Best Practices",
      ],
      level: "Advanced",
      language: "English",
    },
    {
      id: 3,
      title: "Data Visualization Masterclass",
      instructor: "Maria Santos",
      date: "2024-01-17",
      time: "12:00 PM EST",
      duration: "2.5 hours",
      format: "live",
      students: 29,
      maxStudents: 35,
      price: 99,
      rating: 4.7,
      description:
        "Learn to create compelling data visualizations using Python, Tableau, and modern charting libraries.",
      topics: ["Python Viz", "Tableau", "D3.js", "Dashboard Design"],
      level: "Intermediate",
      language: "English",
    },
  ];

  const onDemandClasses = [
    {
      id: 4,
      title: "Complete Python Bootcamp",
      instructor: "Prof. Michael Kim",
      duration: "Self-paced",
      totalHours: "40 hours",
      format: "on-demand",
      students: 15420,
      price: 149,
      rating: 4.9,
      description:
        "Comprehensive Python course from basics to advanced topics with 100+ coding exercises and projects.",
      topics: ["Python Basics", "OOP", "Web Development", "Data Science"],
      level: "All Levels",
      language: "English",
      completion: "Certificate Included",
    },
    {
      id: 5,
      title: "Digital Marketing Strategy",
      instructor: "Jennifer Lee",
      duration: "Self-paced",
      totalHours: "25 hours",
      format: "on-demand",
      students: 8950,
      price: 99,
      rating: 4.6,
      description:
        "Master digital marketing including SEO, social media, content marketing, and analytics.",
      topics: ["SEO", "Social Media", "Analytics", "Content Strategy"],
      level: "Beginner",
      language: "English",
      completion: "Project Portfolio",
    },
    {
      id: 6,
      title: "UX Research Methods",
      instructor: "David Park",
      duration: "Self-paced",
      totalHours: "30 hours",
      format: "on-demand",
      students: 6780,
      price: 119,
      rating: 4.8,
      description:
        "Learn user research methodologies, usability testing, and data-driven design decisions.",
      topics: [
        "User Research",
        "Usability Testing",
        "Analytics",
        "Design Systems",
      ],
      level: "Intermediate",
      language: "English",
      completion: "Research Portfolio",
    },
  ];

  const upcomingEvents = [
    {
      title: "AI in Healthcare Summit",
      date: "2024-01-20",
      time: "10:00 AM EST",
      type: "Conference",
      speakers: ["Dr. Emily Watson", "Prof. James Liu", "Sarah Kim"],
      price: "Free",
      attendees: 500,
    },
    {
      title: "Web3 Developer Meetup",
      date: "2024-01-22",
      time: "6:00 PM EST",
      type: "Networking",
      speakers: ["Alex Rodriguez", "Maria Chen"],
      price: "Free",
      attendees: 150,
    },
    {
      title: "Data Science Career Fair",
      date: "2024-01-25",
      time: "2:00 PM EST",
      type: "Career Event",
      speakers: ["Multiple Industry Leaders"],
      price: "Free",
      attendees: 300,
    },
  ];

  const allClasses = [...liveClasses, ...onDemandClasses];

  const filteredClasses = allClasses.filter((classItem) => {
    const matchesSearch =
      classItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFormat =
      selectedFormat === "all" || classItem.format === selectedFormat;

    return matchesSearch && matchesFormat;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-8  bg-gradient-learning text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              <Video className="w-4 h-4 mr-2" />
              Live & Interactive Classes
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Learn with Live
              <span className="block gradient-text bg-gradient-to-r from-primary/90 to-secondary bg-clip-text text-transparent">
                Interactive Classes
              </span>
            </h1>

            <p className="text-lg md:text-xl mb-4 opacity-90 leading-relaxed">
              Join expert-led live sessions, participate in real-time
              discussions, and accelerate your learning with interactive
              workshops and masterclasses.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-white/80">Live Sessions Monthly</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-white/80">Expert Instructors</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">10K+</div>
                <div className="text-white/80">Active Participants</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-white/80">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="live" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="live" className="flex items-center space-x-2">
                <Video className="w-4 h-4" />
                <span>Live Classes</span>
              </TabsTrigger>
              <TabsTrigger
                value="on-demand"
                className="flex items-center space-x-2"
              >
                <Laptop className="w-4 h-4" />
                <span>On-Demand</span>
              </TabsTrigger>
              <TabsTrigger
                value="events"
                className="flex items-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Events</span>
              </TabsTrigger>
            </TabsList>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mt-8 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search classes, instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Formats</SelectItem>
                  <SelectItem value="live">Live Classes</SelectItem>
                  <SelectItem value="on-demand">On-Demand</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent value="live" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  Upcoming Live Classes
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Join our expert instructors for interactive live sessions. Ask
                  questions, participate in discussions, and learn alongside
                  peers from around the world.
                </p>
              </div>

              {/* Live class Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {liveClasses.map((classItem) => (
                  <Card
                    key={classItem.id}
                    className="interactive-card border-0 shadow-lg"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-red-100 text-red-700 animate-pulse hover:text-white">
                          <Video className="w-3 h-3 mr-1" />
                          LIVE
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {classItem.rating}
                          </span>
                        </div>
                      </div>

                      <CardTitle className="text-lg leading-tight">
                        {classItem.title}
                      </CardTitle>

                      <CardDescription>
                        by {classItem.instructor}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {classItem.description}
                      </p>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-orange-400" />
                          <span>
                            {new Date(classItem.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-orange-400" />
                          <span>
                            {classItem.time} ({classItem.duration})
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-orange-400" />
                          <span>
                            {classItem.students}/{classItem.maxStudents}{" "}
                            students
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {classItem.topics.slice(0, 3).map((topic, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>

                      <div
                        className={`flex items-center justify-between pt-4 border-t`}
                      >
                        <span className="text-2xl font-bold text-orange-400">
                          ${classItem.price}
                        </span>
                        <Button size="sm" className="btn-hero">
                          Reserve Seat
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="on-demand" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Self-Paced Learning</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Learn at your own pace with our comprehensive on-demand
                  courses. Access materials anytime, anywhere, and progress
                  through content as your schedule allows.
                </p>
              </div>

              {/* On Demand Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {onDemandClasses.map((classItem) => (
                  <Card
                    key={classItem.id}
                    className="interactive-card border-0 shadow-lg"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          // variant="secondary"
                          className="bg-blue-100 text-blue-700 hover:text-white"
                        >
                          <Laptop className="w-3 h-3 mr-1" />
                          ON-DEMAND
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {classItem.rating}
                          </span>
                        </div>
                      </div>

                      <CardTitle className="text-lg leading-tight">
                        {classItem.title}
                      </CardTitle>

                      <CardDescription>
                        by {classItem.instructor}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {classItem.description}
                      </p>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-orange-400" />
                          <span>{classItem.totalHours} content</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-orange-400" />
                          <span>
                            {classItem.students.toLocaleString()} enrolled
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <UserCheck className="w-4 h-4 text-orange-400" />
                          <span>{classItem.completion}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {classItem.topics.slice(0, 3).map((topic, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <span className="text-2xl font-bold text-primary">
                          ${classItem.price}
                        </span>
                        <Button size="sm" className="btn-hero">
                          Start Learning
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Join our community events, conferences, and networking
                  sessions. Connect with industry experts and fellow learners
                  from around the globe.
                </p>
              </div>

              {/* Free Events cards */}
              <div className="space-y-6">
                {upcomingEvents.map((event, index) => (
                  <Card
                    key={index}
                    className="interactive-card border-0 shadow-lg"
                  >
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-4 gap-6 items-center">
                        <div className="md:col-span-2">
                          <div className="flex items-center space-x-2 mb-3">
                            <Badge variant="outline">{event.type}</Badge>
                            {event.price === "Free" && (
                              <Badge className="bg-green-100 text-green-700 hover:text-white">
                                FREE
                              </Badge>
                            )}
                          </div>

                          <h3 className="text-xl font-bold mb-2">
                            {event.title}
                          </h3>

                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {new Date(event.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{event.attendees} attendees</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Featured Speakers:
                          </p>
                          <div className="space-y-1">
                            {event.speakers.map((speaker, speakerIndex) => (
                              <div
                                key={speakerIndex}
                                className="text-sm font-medium"
                              >
                                {speaker}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="text-right flex items-center justify-between sm:block ">
                          <div className="text-2xl font-bold text-green-600 mb-3">
                            {event.price}
                          </div>
                          <Button className="btn-hero">Register Now</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Why Choose Our Classes?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the most engaging and effective way to learn with our
              interactive class formats and cutting-edge learning technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-learning flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Interactive Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Real-time Q&A, polls, and discussions make learning engaging
                  and collaborative.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-learning flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Global Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Connect with learners worldwide and build your professional
                  network.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-learning flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Recorded Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Access recordings anytime to review concepts and catch up on
                  missed sessions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-learning flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Expert Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Get direct access to industry experts and personalized
                  feedback on your progress.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-learning text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Join Our Next Class?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Don't miss out on our upcoming live sessions. Reserve your spot
            today and start learning with expert instructors and fellow
            students.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-4 bg-[#f97b1b] hover:bg-white hover:text-[#f97b1b]  border-white border hover:scale-105 hover:-translate-y-1"
            >
              <Calendar className="w-5 h-5 mr-2 " />
              View Schedule
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-[#f97b1b]  border-white hover:bg-[#f97b1b] hover:text-white hover:scale-105 hover:-translate-y-1"
            >
              <Video className="w-5 h-5 mr-2" />
              Book Free Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Classes;
