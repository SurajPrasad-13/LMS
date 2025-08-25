import { useState } from "react";
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
  Trash2,
  Eye,
  Send,
  Paperclip,
  BarChart3,
} from "lucide-react";

export default function Assignments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [aiHelp, setAiHelp] = useState("");

  const assignments = [
    {
      id: 1,
      title: "React Component Architecture Analysis",
      course: "Advanced React Development",
      instructor: "Dr. Sarah Chen",
      dueDate: "2024-02-15",
      submittedDate: null,
      status: "pending",
      priority: "high",
      points: 100,
      earnedPoints: null,
      type: "analysis",
      description:
        "Analyze and refactor a complex React component hierarchy, implementing best practices for component composition, state management, and performance optimization.",
      requirements: [
        "Identify component responsibilities and boundaries",
        "Implement proper props interface design",
        "Optimize render performance using memoization",
        "Write comprehensive unit tests",
        "Document architectural decisions",
      ],
      timeEstimate: "8-12 hours",
      attachments: ["component-starter.zip", "requirements.pdf"],
      aiHints: [
        "Consider using React.memo for expensive components",
        "Look for opportunities to lift state up",
        "Use custom hooks to separate logic from presentation",
      ],
      feedback: null,
      submissionFormat: "GitHub repository link + reflection document",
    },
    {
      id: 2,
      title: "Machine Learning Model Implementation",
      course: "Machine Learning Fundamentals",
      instructor: "Prof. Michael Torres",
      dueDate: "2024-02-20",
      submittedDate: "2024-02-18",
      status: "submitted",
      priority: "medium",
      points: 150,
      earnedPoints: null,
      type: "implementation",
      description:
        "Implement and train a neural network model for image classification using TensorFlow, including data preprocessing, model architecture design, and performance evaluation.",
      requirements: [
        "Build CNN architecture from scratch",
        "Implement data augmentation pipeline",
        "Achieve minimum 85% accuracy on test set",
        "Create visualization of training metrics",
        "Compare with baseline models",
      ],
      timeEstimate: "15-20 hours",
      attachments: [
        "dataset.zip",
        "baseline_model.py",
        "evaluation_rubric.pdf",
      ],
      aiHints: [
        "Start with a simple architecture and gradually add complexity",
        "Use transfer learning for better initial weights",
        "Monitor overfitting with validation curves",
      ],
      feedback: "Under review - initial submission looks promising!",
      submissionFormat: "Jupyter notebook + trained model files",
    },
    {
      id: 3,
      title: "User Experience Research Report",
      course: "UI/UX Design Principles",
      instructor: "Emma Rodriguez",
      dueDate: "2024-02-10",
      submittedDate: "2024-02-09",
      status: "graded",
      priority: "low",
      points: 75,
      earnedPoints: 68,
      type: "research",
      description:
        "Conduct comprehensive user research for a mobile app redesign, including user interviews, usability testing, and data-driven design recommendations.",
      requirements: [
        "Interview at least 5 target users",
        "Conduct usability testing sessions",
        "Create user personas and journey maps",
        "Provide design recommendations with rationale",
        "Present findings in professional format",
      ],
      timeEstimate: "12-15 hours",
      attachments: ["interview_template.docx", "usability_checklist.pdf"],
      aiHints: [
        "Use empathy mapping to understand user emotions",
        "Look for patterns across different user segments",
        "Quantify usability issues with severity ratings",
      ],
      feedback:
        "Excellent research methodology! The user personas are well-developed. Consider adding more quantitative metrics to support your qualitative findings.",
      submissionFormat: "Research report + presentation slides",
    },
    {
      id: 4,
      title: "Cloud Infrastructure Design",
      course: "Cloud Architecture with AWS",
      instructor: "James Patterson",
      dueDate: "2024-01-28",
      submittedDate: "2024-01-30",
      status: "late",
      priority: "high",
      points: 120,
      earnedPoints: 95,
      type: "design",
      description:
        "Design a scalable cloud architecture for a high-traffic e-commerce application, including load balancing, auto-scaling, database design, and disaster recovery.",
      requirements: [
        "Design multi-tier architecture diagram",
        "Calculate cost estimates for different load scenarios",
        "Implement basic infrastructure using Terraform",
        "Document security considerations",
        "Plan disaster recovery strategy",
      ],
      timeEstimate: "10-14 hours",
      attachments: [
        "architecture_template.drawio",
        "aws_pricing_calculator.xlsx",
      ],
      aiHints: [
        "Consider using CDN for static content delivery",
        "Implement database read replicas for better performance",
        "Use containerization for better scalability",
      ],
      feedback:
        "Good architectural thinking, but submission was 2 days late. The security considerations section needs more detail about encryption at rest and in transit.",
      submissionFormat: "Architecture diagram + Terraform code + documentation",
    },
    {
      id: 5,
      title: "Data Visualization Dashboard",
      course: "Data Science with Python",
      instructor: "Dr. Lisa Wang",
      dueDate: "2024-02-25",
      submittedDate: null,
      status: "upcoming",
      priority: "medium",
      points: 100,
      earnedPoints: null,
      type: "project",
      description:
        "Create an interactive dashboard for analyzing e-commerce sales data using Python, Pandas, and Plotly. The dashboard should provide insights for business decision-making.",
      requirements: [
        "Clean and preprocess the provided dataset",
        "Create at least 5 different visualization types",
        "Implement interactive filtering and drill-down capabilities",
        "Include statistical analysis and trend identification",
        "Deploy dashboard using Streamlit or Dash",
      ],
      timeEstimate: "12-16 hours",
      attachments: ["sales_data.csv", "dashboard_examples.pdf"],
      aiHints: [
        "Start with exploratory data analysis to understand patterns",
        "Use color and layout strategically for better UX",
        "Consider adding predictive analytics features",
      ],
      feedback: null,
      submissionFormat: "Deployed dashboard + source code + analysis report",
    },
  ];

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" || assignment.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

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
          <Button className=" text-[12px] md:text-[16px] bg-gradient-learning p-2 -gap-2">
            <Plus className="w-4 h-4 mr-2" />
            Create Assignment
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
            id="searchTerm"
              placeholder="Search assignments, courses, or instructors..."
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
        <Card className="glass-card p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-200/50 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-muted-foreground">Pending</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">2</p>
              <p className="text-muted-foreground">Submitted</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">1</p>
              <p className="text-muted-foreground">Graded</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold">91%</p>
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
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                {/* Left Header */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={getStatusColor(assignment.status)}>
                      {getStatusIcon(assignment.status)}
                      <span className="ml-1 capitalize">
                        {assignment.status}
                      </span>
                    </Badge>
                    <Badge variant="outline">{assignment.course}</Badge>
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
                      {assignment.earnedPoints
                        ? `${assignment.earnedPoints}/`
                        : ""}
                      {assignment.points}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Due Date</p>
                    <p className="font-semibold">{assignment.dueDate}</p>
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
                  {assignment.requirements.map((req, index) => (
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="font-medium">Time Estimate</p>
                  <p className="text-muted-foreground">
                    {assignment.timeEstimate}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Submission Format</p>
                  <p className="text-muted-foreground">
                    {assignment.submissionFormat}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Type</p>
                  <Badge variant="outline" className="capitalize">
                    {assignment.type}
                  </Badge>
                </div>
              </div>

              {/* Attachments */}
              {assignment.attachments.length > 0 && (
                <div className="space-y-2">
                  <p className="font-medium">Attachments:</p>
                  <div className="flex flex-wrap gap-2">
                    {assignment.attachments.map((attachment, index) => (
                      <Button key={index} variant="outline" size="sm">
                        <Download className="w-3 h-3 mr-1" />
                        {attachment}
                      </Button>
                    ))}
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
                  {assignment.aiHints.map((hint, index) => (
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
    </div>
  );
}
