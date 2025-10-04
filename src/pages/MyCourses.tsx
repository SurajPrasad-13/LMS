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
  X,
  Pencil,
  Trash,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext"; // Import useAuth
import { IoMdAdd } from "react-icons/io";
import { Slide, toast, ToastContainer } from "react-toastify";

export default function MyCourses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { user } = useAuth(); // Get user from AuthContext
  const [courses, setCourses] = useState<any[]>([]);
  const [avgLearnTime, setAvgLearnTime] = useState<{
    average_learning_time: string;
  }>({
    average_learning_time: "2h 0m", // default value
  });
  const [totalLearnTime, setTotalLearnTime] = useState<{
    total_meeting_time: string;
  }>({
    total_meeting_time: "0h 0m", // default value
  });

  // Get Courses Data
  const coursesApiData = async () => {
    try {
      let response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/courses/courses/`,
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
        console.error(`Failed to fetch courses: ${result}`);
        setCourses([]);
      } else {
        setCourses(Array.isArray(result) ? result : []);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    }
  };

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

  const categories = [
    { id: "all", name: "All Courses", count: courses.length },
    {
      id: "in progress",
      name: "In Progress",
      count: courses.filter((course) => course.status == "in progress").length,
    },
    {
      id: "completed",
      name: "Completed",
      count: courses.filter((course) => course.status == "completed").length,
    },
    {
      id: "wishlist",
      name: "Wishlist",
      count: courses.filter((course) => course.status == "wishlist").length,
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
  // console.log(filteredCourses);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4  text-success" />;
      case "in progress":
        return <Play className="size-5 text-orange-400" />;
      default:
        return <BookOpen className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "in progress":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground hover:text-white";
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

  const navigate = useNavigate();
  const addCourse = () => {
    navigate("courseForm");
  };

  // Delete Course
  const deleteCourse = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/courses/courses/${id}/`,
        {
          method: "DELETE", // DELETE request
          headers: {
          Authorization: `Bearer ${user?.access}`, // 🔑 attach access
        },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete, Status: ${response.status}`);
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`Course with id ${id} deleted successfully!`);
      // get data from api after delete a course
      coursesApiData();
      toast.success("Course Deleted Successfully");
    } catch (error) {
      console.error("Error while deleting data:", error);
    }
  };

  // Edit Course
  const editCourse = (id) => {
    navigate("editCourseForm/" + id);
  };

  function formatToDate(isoString: string): string {
    if (!isoString) return "";
    const date = new Date(isoString);
    // ✅ Extract YYYY-MM-DD
    return date.toISOString().split("T")[0];
  }
  //Add Assignment
  const addAssignment = (courseId, coursetitle) => {
    navigate("assignmentsForm", { state: { courseId, coursetitle } });
  };
  useEffect(() => {
    coursesApiData();
    avgLearnTimeApiData();
    ttlLearnTimeApiData();
  }, []);

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
                <h1 className="text-2xl md:text-4xl font-bold">My Courses</h1>
                <p className="text-muted-foreground md:text-lg">
                  Track your learning progress and discover new skills
                </p>
              </div>
              <div className=" flex flex-col md:flex-row  md:items-center justify-center gap-2">
                {user && user.role === "Admin" && (
                  <Button
                    className="bg-gradient-learning text-sm md:text-[16px]"
                    onClick={addCourse}
                  >
                    <IoMdAdd />
                    Add a course
                  </Button>
                )}
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                id="search"
                  placeholder="Search courses, instructors..."
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
                    selectedCategory === category.id
                      ? "bg-orange-400 text-[12px] sm:text-[16px] h-8 sm:h-10"
                      : "h-8 sm:h-10 text-[12px] sm:text-[16px]"
                  }
                >
                  {category.name}
                  <Badge variant="outline" className=" bg-white">
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
                <div className="w-12 h-12 bg-orange-200/40 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {/* {categories.map((courses)=>(
                      courses.filter((course) => course.name == "In Progress").length
                    ))} */}
                    {
                      courses.filter((course) => course.status == "in progress")
                        .length
                    }
                  </p>
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
                  <p className="text-2xl font-bold">
                    {
                      courses.filter((course) => course.status == "completed")
                        .length
                    }
                  </p>
                  <p className="text-muted-foreground">Courses Completed</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  {
                    courses.filter((course) => course.status == "completed")
                      .length
                  }{" "}
                  certificates earned
                </p>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {totalLearnTime.total_meeting_time}{" "}
                  </p>
                  <p className="text-muted-foreground">Hours Learned</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  {avgLearnTime.average_learning_time} hours this week
                </p>
              </div>
            </Card>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="glass-card p-4 hover-lift">
                <div className="space-y-4 ">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(course.status)}
                        <Badge className={getStatusColor(course.status)}>
                          {course.status === "in progress"
                            ? "In Progress"
                            : course.status === "completed"
                            ? "Completed"
                            : "Wishlist"}
                        </Badge>
                        {course.ai_assisted && (
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

                  <div className="flex items-center justify-between">
                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(course?.skills) &&
                        course.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                    </div>
                    {user && user.role === "Admin" && (
                      <div className="flex items-center justify-end gap-4">
                        <Button
                          onClick={() => {
                            editCourse(course.id);
                          }}
                          className="bg-blue-200 hover:bg-blue-500 px-2 h-8"
                          title="Edit Course"
                        >
                          <Pencil />
                        </Button>
                        <Button
                          onClick={() => {
                            deleteCourse(course.id);
                          }}
                          className="bg-red-200 hover:bg-red-500 px-2 h-8"
                          title="Delete Course"
                        >
                          <Trash />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Progress */}
                  {course.status === "in progress" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>
                          Progress: {course.completed_lesson}/
                          {course.total_lessons} lessons
                        </span>
                        <span className="font-semibold">
                          {course.completed_lesson == 0
                            ? 0
                            : String(
                                (course.completed_lesson /
                                  course.total_lessons) *
                                  100
                              ).slice(0, 4)}{" "}
                          %
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: ` ${
                              course.total_lessons == 0
                                ? 0
                                : (course.completed_lesson /
                                    course.total_lessons) *
                                  100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Next: {course.next_lesson}
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
                            Completed on {formatToDate(course.completedDate)}
                          </span>
                        </div>
                        {course.certificate_status && (
                          <Badge className="bg-accent hover:bg-white text-accent-foreground">
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
                        <span>{course.duration_minutes} weeks</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students} students</span>
                      </div>
                      <Badge variant="outline">{course.level}</Badge>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex  gap-2 md:gap-4 pt-2">
                    {course.status === "in-progress" ? (
                      <div className="flex items-center justify-center gap-4 flex-wrap">
                        {user && user.role !== "Admin" && (
                          <Button
                            onClick={() => startCall(course.instructor)}
                            className=""
                          >
                            <Play className="w-4 h-4" />
                            Continue Learning
                          </Button>
                        )}
                        {user && user.role === "Admin" && (
                          <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <Button
                              onClick={() => {
                                addAssignment(course.id, course.title);
                              }}
                            >
                              <Plus /> Add Assignment
                            </Button>
                            <Button
                              onClick={() => {
                                addAssignment(course.id, course.title);
                              }}
                            >
                              <Plus /> Add Session
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : course.status === "completed" ? (
                      <Button variant="outline" className="">
                        <BookOpen className="w-4 h-4 " />
                        Review Course
                      </Button>
                    ) : (
                      <div className="flex items-center justify-center gap-2 flex-wrap w-full">
                        {user && user.role !== "Admin" && (
                          <Button
                            onClick={() => startCall(course.instructor)}
                            className="flex-1 "
                          >
                            <BookOpen className="w-4 h-4 " />
                            Start Course
                          </Button>
                        )}
                        {user && user.role === "Admin" && (
                          <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <Button
                              className=""
                              onClick={() => {
                                addAssignment(course.id, course.title);
                              }}
                            >
                              <Plus /> Add Assignment
                            </Button>
                            <Button
                              onClick={() => {
                                addAssignment(course.id, course.title);
                              }}
                            >
                              <Plus /> Add Session
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    <Button variant="outline">
                      <Calendar className="w-4 h-4" />
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
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
