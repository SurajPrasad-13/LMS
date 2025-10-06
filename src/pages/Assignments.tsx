import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Upload,
  Download,
  MessageSquare,
  Brain,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Send,
  Paperclip,
  BarChart3,
  Pencil,
  Trash,
  Trash2,
  Star,
  Users,
  Play,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";
import { useAuth } from "@/Context/AuthContext"; // Import useAuth

export default function Assignments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [aiHelp, setAiHelp] = useState("");

  const [assignments, setassignments] = useState<any[]>([]);
  const [subAssignment, setSubAssignment] = useState<any[]>([]);

  const { user } = useAuth();
  const navigate = useNavigate();
  // Get Assignment
  const assignmentApiData = async () => {
    try {
      let response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/assignments/assignments/`,
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
        console.error(`Failed to fetch Assignment: ${result}`);
        setassignments([]);
      } else {
        setassignments(Array.isArray(result) ? result : []);
      }
    } catch (err) {
      console.error("Error fetching Assignments: ", err);
      setassignments([]);
    }
  };

  // update Assignment
  const editAssignment = (id) => {
    navigate("editAssignment/" + id);
  };

  // Delete Assignment
  const deleteAssignment = async (id) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BACKEND_URL
        }/api/assignments/assignments/${id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.access}`
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to delete, Status: ${response.status}`);
      }
      toast.success("Assignment Deleted", {
        hideProgressBar: true,
        icon: <Trash2 className="text-2xl text-red-500 " />,
        className: "text-red-500", // your custom icon here
      });
      console.log(`Assignment with id ${id} deleted successfully!`);
      assignmentApiData();
    } catch (error) {
      console.error("Error while deleting data:", error);
    }
  };

  // Submit Assignment
  const submitAssignment = async () => {
    let response = await fetch(
      `${import.meta.env.VITE_API_BACKEND_URL}/api/assignments/submissions/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.access}`, // 🔑 attach token
        },
      }
    );
    const result = await response.json();
    console.log("Submitted Assignments", result);
    setSubAssignment(result);
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
    submitAssignment();
    assignmentApiData();
    AssignmentAvgScore();
  }, []);

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.status.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" || assignment.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });
  // console.log(filteredAssignments);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "graded":
        return "bg-success text-success-foreground";
      case "submitted":
        return "bg-primary text-primary-foreground";
      case "pending":
        return "bg-warning text-warning-foreground";
      case "late":
        return "bg-destructive text-destructive-foreground";
      case "upcoming":
        return "bg-muted text-muted-foreground hover:text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "graded":
        return <CheckCircle className="w-4 h-4" />;
      case "submitted":
        return <Clock className="w-4 h-4" />;
      case "pending":
        return <AlertTriangle className="w-4 h-4" />;
      case "late":
        return <XCircle className="w-4 h-4" />;
      case "upcoming":
        return <Calendar className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-500";
    }
  };

  const filters = [
    { id: "all", name: "All Assignments", count: assignments.length },
    {
      id: "pending",
      name: "Pending",
      count: assignments.filter((a) => a.status === "pending").length,
    },
    {
      id: "submitted",
      name: "Submitted",
      count: assignments.filter((a) => a.status === "submitted").length,
    },
    {
      id: "graded",
      name: "Graded",
      count: assignments.filter((a) => a.status === "graded").length,
    },
    {
      id: "upcoming",
      name: "Upcoming",
      count: assignments.filter((a) => a.status === "upcoming").length,
    },
    {
      id: "late",
      name: "Late",
      count: assignments.filter((a) => a.status === "late").length,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className=" text-lg sm:text-3xl md:text-4xl font-bold">
              Assignments
            </h1>
            <p className="text-muted-foreground text-sm md:text-lg">
              Track your assignments and get AI-powered assistance
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              id="searchTerm"
              placeholder="Search assignments title, status..."
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

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              onClick={() => setSelectedFilter(filter.id)}
              className={selectedFilter === filter.id ? "bg-orange-400" : ""}
            >
              {filter.name}
              <Badge variant="outline" className="ml-2 bg-white ">
                {filter.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 border  hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-200/50 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{filters[1].count}</p>
              <p className="text-muted-foreground">Pending</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border  hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              {/* <p className="text-2xl font-bold">{subAssignment.length}</p> */}
              <p className="text-2xl font-bold">{assignments.filter((assignment)=> assignment.status == 'submitted').length}</p>
              <p className="text-muted-foreground">Submitted</p>
            </div>
          </div>
        </Card>

        <Card className=" p-6 border  hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{filters[3].count} </p>
              <p className="text-muted-foreground">Graded</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border  hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold">{avgScore.average_score} </p>
              <p className="text-muted-foreground">Avg Score</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Assignments List */}
      <div className="space-y-6">
        {filteredAssignments.map((assignment) => (
          <Card
            key={assignment.id}
            className={`glass-card p-4 sm:p-5 md:p-6 hover-lift border-l-4 ${getPriorityColor(
              assignment.priority
            )}`}
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 ">
                {/* Left Header */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={getStatusColor(assignment.status)}>
                      {getStatusIcon(assignment.status)}
                      <span className="ml-1 capitalize">
                        {assignment.status}
                      </span>
                    </Badge>
                    {/* <Badge variant="outline">{assignment.course}</Badge> */}
                    <Badge variant="secondary" className="text-xs">
                      {assignment.priority} priority
                    </Badge>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold">
                    {assignment.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    by {assignment.instructor}
                  </p>
                </div>

                {/* Points and Due Date */}
                <div className="flex gap-6 sm:text-right text-sm justify-between sm:justify-end">
                  <div>
                    <p className="text-muted-foreground">Points</p>
                    <p className="font-semibold">
                      {assignment.earned_points
                        ? `${assignment.earned_points}/`
                        : ""}
                      {assignment.points}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Due Date</p>
                    <p className="font-semibold">
                      {assignment.due_date.slice(0, 10)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {assignment.description}
              </p>

              {/* Requirements */}
              <div className="space-y-2">
                <h4 className="font-medium">Requirements:</h4>
                <ul className="space-y-1">
                  {(assignment.requirements || []).map((req, index) => (
                    <li
                      key={index}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Assignment Details */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="font-medium">Time Estimate</p>
                  <p className="text-muted-foreground">
                    {assignment.time_estimate}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Submission Format</p>
                  <p className="text-muted-foreground">
                    {assignment.submission_format}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Type</p>
                  <Badge variant="outline" className="capitalize">
                    {assignment.type}
                  </Badge>
                </div>
                {user && user.role === "Admin" && (
                  <div className="flex items-start justify-end gap-4 ">
                    <Button
                      onClick={() => {
                        editAssignment(assignment.id);
                      }}
                      className="bg-blue-200 hover:bg-blue-500 px-2 h-8"
                      title="Edit Course"
                    >
                      <Pencil />
                    </Button>
                    <Button
                      onClick={() => {
                        deleteAssignment(assignment.id);
                      }}
                      className="bg-red-200 hover:bg-red-500 px-2 h-8"
                      title="Delete Course"
                    >
                      <Trash />
                    </Button>
                  </div>
                )}
              </div>

              {/* Attachments */}
              {assignment.attachment && assignment.attachment.length > 0 && (
                <div className="space-y-2">
                  <p className="font-medium">Attachments:</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-3 h-3 mr-1" />
                      {assignment.attachment}
                    </Button>
                  </div>
                </div>
              )}

              {/* AI Hints */}
              <div className="glass-card p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-orange-400" />
                  <span className="font-medium">AI Study Hints</span>
                </div>
                <ul className="space-y-1">
                  {(assignment.ai_hints || []).map((hint, index) => (
                    <li
                      key={index}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                      {hint}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feedback */}
              {assignment.feedback && (
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4" />
                    <span className="font-medium">Instructor Feedback</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {assignment.feedback}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-2">
                {assignment.status === "pending" ||
                assignment.status === "upcoming" ? (
                  <>
                    <Button>
                      <Edit className="w-4 h-4 mr-2" />
                      Work on Assignment
                    </Button>
                    <Button variant="outline">
                      <Brain className="w-4 h-4 mr-2" />
                      Get AI Help
                    </Button>
                  </>
                ) : assignment.status === "submitted" ? (
                  <>
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View Submission
                    </Button>
                    <Button variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Submission
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View Feedback
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download Grade Report
                    </Button>
                  </>
                )}
                <Button variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Ask Question
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* AI Assistant Panel */}
      <Card className="glass-card p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-learning rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">AI Assignment Assistant</h3>
              <p className="text-muted-foreground">
                Get personalized help with your assignments
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Textarea
              placeholder="Ask me anything about your assignments - I can help with understanding requirements, planning approaches, or reviewing your work..."
              value={aiHelp}
              onChange={(e) => setAiHelp(e.target.value)}
              className="min-h-[120px]"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
              <Button>
                <Send className="w-4 h-4 mr-2" />
                Ask AI Assistant
              </Button>
            </div>
          </div>
        </div>
      </Card>
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
    </div>
  );
}
