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
import {
  Search,
  Filter,
  BookOpen,
  Clock,
  Users,
  Star,
  Award,
  Play,
  ChevronRight,
  Brain,
  Code,
  Palette,
  TrendingUp,
  Database,
  Smartphone,
} from "lucide-react";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const categories = [
    { id: "all", name: "All Categories", icon: BookOpen },
    { id: "ai-ml", name: "AI & Machine Learning", icon: Brain },
    { id: "web-dev", name: "Web Development", icon: Code },
    { id: "design", name: "Design", icon: Palette },
    { id: "business", name: "Business", icon: TrendingUp },
    { id: "data", name: "Data Science", icon: Database },
    { id: "mobile", name: "Mobile Development", icon: Smartphone },
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
    {
      id: 4,
      title: "Data Science with Python & R",
      instructor: "Prof. Michael Kim",
      category: "data",
      level: "intermediate",
      duration: "10 weeks",
      students: 9870,
      rating: 4.8,
      price: 129,
      image: "/api/placeholder/400/225",
      description:
        "Comprehensive data science program covering statistics, visualization, and machine learning algorithms.",
      skills: ["Python", "R", "Statistics", "Visualization"],
      features: [
        "Real Projects",
        "Certificate",
        "Career Guidance",
        "Tools Access",
      ],
    },
    {
      id: 5,
      title: "Digital Marketing Strategy",
      instructor: "Jennifer Lee",
      category: "business",
      level: "beginner",
      duration: "4 weeks",
      students: 6540,
      rating: 4.6,
      price: 69,
      image: "/api/placeholder/400/225",
      description:
        "Master digital marketing including SEO, social media, content marketing, and analytics.",
      skills: ["SEO", "Social Media", "Analytics", "Content Marketing"],
      features: ["Case Studies", "Certificate", "Templates", "Live Q&A"],
    },
    {
      id: 6,
      title: "iOS Development with Swift",
      instructor: "David Park",
      category: "mobile",
      level: "intermediate",
      duration: "9 weeks",
      students: 5420,
      rating: 4.9,
      price: 119,
      image: "/api/placeholder/400/225",
      description:
        "Build professional iOS apps using Swift and SwiftUI. From basics to App Store deployment.",
      skills: ["Swift", "SwiftUI", "Xcode", "App Store"],
      features: [
        "App Development",
        "Certificate",
        "Deployment Guide",
        "Review",
      ],
    },
  ];

  const featuredCourse = {
    title: "AI-Powered Full Stack Development",
    instructor: "Expert Team",
    duration: "16 weeks",
    students: 25000,
    rating: 4.9,
    originalPrice: 299,
    salePrice: 199,
    description:
      "The most comprehensive course combining AI, web development, and cloud technologies. Build 12 real-world projects.",
    highlights: [
      "AI Integration in Web Apps",
      "Cloud Deployment (AWS/Azure)",
      "12 Portfolio Projects",
      "1-on-1 Mentorship",
      "Job Placement Support",
      "Lifetime Updates",
    ],
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "all" || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-8 bg-gradient-learning text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              <BookOpen className="w-4 h-4 mr-2" />
              Course Catalog
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Master New Skills with
              <span className="block gradient-text bg-gradient-to-r from-primary/90 to-secondary bg-clip-text text-transparent">Expert-Led Courses</span>
            </h1>

            <p className="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed">
              Join thousands of students learning in-demand skills with our
              AI-personalized curriculum and industry expert instructors.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">10,000+</div>
                <div className="text-white/80">Course Hours</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">1,000+</div>
                <div className="text-white/80">Expert Instructors</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-white/80">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-white/80">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Course */}
      <section className="py-16 -mt-8 relative z-10 ">
        <div className="container mx-auto px-4 ">
          <Card className="glass-card shadow-xl hover:shadow-2xl hover:-translate-y-1 duration-200 max-w-6xl mx-auto border-t-gray-100 ">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge className="mb-4 bg-gradient-learning text-white">
                    <Award className="w-4 h-4 mr-2" />
                    Featured Course
                  </Badge>

                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {featuredCourse.title}
                  </h2>

                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {featuredCourse.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{featuredCourse.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span>
                        {featuredCourse.students.toLocaleString()} students
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{featuredCourse.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-6">
                    <span className="text-3xl font-bold text-orange-400">
                      ${featuredCourse.salePrice}
                    </span>
                    <span className="text-xl text-muted-foreground line-through">
                      ${featuredCourse.originalPrice}
                    </span>
                    <Badge variant="destructive">33% OFF</Badge>
                  </div>

                  <Button
                    size="lg"
                    className="mr-4 border bg-[#f97b1b] hover:text-white hover:scale-105 hover:-translate-y-1"
                  >
                    Enroll Now
                  </Button>
                  <Button size="lg" variant="outline" className="hover:scale-105 hover:-translate-y-1">
                    <Play className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4">
                    What You'll Learn:
                  </h3>
                  <div className="space-y-3">
                    {featuredCourse.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-3 hover:translate-x-2 duration-200">
                        <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
                          <ChevronRight className="w-4 h-4 text-white" />
                        </div>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Explore All Courses</h2>

            {/* Search and Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search courses, instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center space-x-2"
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </Button>
              ))}
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
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
                        {categories.find((c) => c.id === course.category)?.name}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {course.rating}
                        </span>
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
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
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
                      <Button size="sm" className="btn-hero hover:scale-105 hover:-translate-y-1">
                        Enroll Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or explore different
                  categories.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-learning text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Our AI-powered learning paths can create a custom curriculum just
            for you. Tell us your goals and we'll design the perfect learning
            journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4 bg-[#f97b1b] hover:bg-white hover:text-[#f97b1b]  border-white border hover:scale-105 hover:-translate-y-1">
              <Brain className="w-5 h-5 mr-2 " />
              Create Custom Path
            </Button>
            <Button
              size="lg"
              className="text-[#f97b1b] bg-white border-white hover:bg-[#f97b1b] hover:text-white hover:scale-105 hover:-translate-y-1"
            >
              <Filter className="w-5 h-5 mr-2" />
              Request Course
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
