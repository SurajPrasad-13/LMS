import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Brain,
  Send,
  Paperclip,
  Mic,
  MicOff,
  Image,
  Code,
  FileText,
  Lightbulb,
  BookOpen,
  Calculator,
  Zap,
  Star,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Download,
  Share2,
  Settings,
  ChevronDown,
  MoreVertical,
  Sparkles,
  Target,
  TrendingUp
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  type?: "text" | "code" | "image" | "file";
  metadata?: {
    language?: string;
    subject?: string;
    difficulty?: string;
    helpful?: boolean;
  };
}

export default function AITutor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI Learning Assistant. I'm here to help you understand concepts, solve problems, and enhance your learning experience. What would you like to explore today?",
      sender: "ai",
      timestamp: new Date(),
      type: "text"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("general");
  const [difficulty, setDifficulty] = useState("intermediate");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const subjects = [
    { id: "general", name: "General", icon: "🎓" },
    { id: "programming", name: "Programming", icon: "💻" },
    { id: "mathematics", name: "Mathematics", icon: "📊" },
    { id: "science", name: "Science", icon: "🔬" },
    { id: "design", name: "Design", icon: "🎨" },
    { id: "business", name: "Business", icon: "📈" },
  ];

  const quickActions = [
    { id: "explain", text: "Explain this concept", icon: Lightbulb },
    { id: "example", text: "Give me an example", icon: Target },
    { id: "practice", text: "Create practice problems", icon: BookOpen },
    { id: "summarize", text: "Summarize my notes", icon: FileText },
    { id: "code-review", text: "Review my code", icon: Code },
    { id: "quiz", text: "Quiz me on this topic", icon: Brain },
  ];

  const recentTopics = [
    { id: 1, title: "React Hooks Patterns", subject: "Programming", timestamp: "2 hours ago" },
    { id: 2, title: "Machine Learning Basics", subject: "AI/ML", timestamp: "1 day ago" },
    { id: 3, title: "Design System Principles", subject: "Design", timestamp: "2 days ago" },
    { id: 4, title: "Database Normalization", subject: "Programming", timestamp: "3 days ago" },
  ];

  const stats = {
    questionsAsked: 156,
    topicsExplored: 42,
    averageRating: 4.8,
    timesSaved: 28
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
      type: "text"
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputMessage),
        sender: "ai",
        timestamp: new Date(),
        type: "text",
        metadata: {
          subject: selectedSubject,
          difficulty: difficulty
        }
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInputMessage("");
  };

  const getAIResponse = (userInput: string): string => {
    // Simulate intelligent responses based on input
    if (userInput.toLowerCase().includes("react")) {
      return "Great question about React! React is a JavaScript library for building user interfaces. Here are the key concepts:\n\n1. **Components**: Reusable pieces of UI\n2. **JSX**: JavaScript syntax extension\n3. **Props**: Data passed to components\n4. **State**: Component's internal data\n5. **Hooks**: Functions that let you use state and lifecycle features\n\nWould you like me to explain any of these concepts in more detail?";
    } else if (userInput.toLowerCase().includes("machine learning")) {
      return "Machine Learning is a subset of AI that enables computers to learn and improve from experience without being explicitly programmed. Here's a beginner-friendly breakdown:\n\n**Types of ML:**\n- **Supervised Learning**: Learning with labeled examples\n- **Unsupervised Learning**: Finding patterns in unlabeled data\n- **Reinforcement Learning**: Learning through trial and error\n\n**Common Applications:**\n- Image recognition\n- Natural language processing\n- Recommendation systems\n- Predictive analytics\n\nWhat specific aspect would you like to explore further?";
    } else {
      return "I understand you're asking about this topic. Let me break it down for you step by step:\n\n1. First, let's establish the fundamental concepts\n2. Then we'll look at practical applications\n3. Finally, I'll provide some hands-on examples\n\nThis approach will help you build a solid understanding. Would you like me to elaborate on any particular aspect?";
    }
  };

  const handleQuickAction = (action: string) => {
    const actionTexts = {
      explain: "Can you explain this concept in simple terms?",
      example: "Can you give me a practical example?",
      practice: "Can you create some practice problems for me?",
      summarize: "Can you summarize the key points?",
      "code-review": "Can you review this code and suggest improvements?",
      quiz: "Can you quiz me on this topic?"
    };
    
    setInputMessage(actionTexts[action as keyof typeof actionTexts] || "");
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    // Voice recording logic would go here
  };

  const handleFeedback = (messageId: string, helpful: boolean) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, metadata: { ...msg.metadata, helpful } }
        : msg
    ));
  };

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <div className="w-full md:w-80 space-y-6 flex-shrink-0">
        {/* AI Stats */}
        <Card className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-learning rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">AI Tutor</h3>
              <p className="text-sm text-muted-foreground">Your Learning Assistant</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-lg font-bold">{stats.questionsAsked}</p>
              <p className="text-xs text-muted-foreground">Questions</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-lg font-bold">{stats.topicsExplored}</p>
              <p className="text-xs text-muted-foreground">Topics</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 " />
                <p className="text-lg font-bold">{stats.averageRating}</p>
              </div>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-lg font-bold">{stats.timesSaved}</p>
              <p className="text-xs text-muted-foreground">Hours Saved</p>
            </div>
          </div>
        </Card>

        {/* Subject Selection */}
        <Card className="glass-card p-6">
          <h3 className="font-semibold mb-4">Learning Context</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Subject</label>
              <div className="grid grid-cols-2 gap-2">
                {subjects.map((subject) => (
                  <Button
                    key={subject.id}
                    variant={selectedSubject === subject.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSubject(subject.id)}
                    className="justify-start"
                  >
                    <span className="mr-2">{subject.icon}</span>
                    <span className="text-xs">{subject.name}</span>
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Difficulty Level</label>
              <div className="grid grid-cols-3 gap-1">
                {["beginner", "intermediate", "advanced"].map((level) => (
                  <Button
                    key={level}
                    variant={difficulty === level ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDifficulty(level)}
                    className="text-xs capitalize"
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="glass-card p-6">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action.id)}
                className="w-full justify-start"
              >
                <action.icon className="w-4 h-4 mr-2" />
                {action.text}
              </Button>
            ))}
          </div>
        </Card>

        {/* Import Other Tutors */}
        <Card className="glass-card p-6">
          <h3 className="font-semibold mb-4">Other Tutors</h3>
          <div className="space-y-4">
            <div className="text-center p-4 border-2 border-dashed border-muted-foreground/30 rounded-lg">
              <div className="w-12 h-12 bg-orange-200/50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Brain className="w-6 h-6 text-orange-400" />
              </div>
              <p className="text-sm font-medium mb-2">Import Custom Tutor</p>
              <p className="text-xs text-muted-foreground mb-3">Connect with specialized AI tutors or human mentors</p>
              <Button size="sm" className="w-full">
                <Zap className="w-4 h-4 mr-2" />
                Import Tutor
              </Button>
            </div>

            <div className="space-y-2">
              {[
                { name: "Math Specialist", type: "AI", specialty: "Calculus & Algebra", rating: 4.9, users: "2.3k" },
                { name: "Code Mentor", type: "Human", specialty: "Full-Stack Dev", rating: 4.8, users: "856" },
                { name: "Design Expert", type: "AI", specialty: "UI/UX Design", rating: 4.7, users: "1.4k" },
              ].map((tutor, index) => (
                <div key={index} className="p-3 bg-muted/20 rounded-lg border hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        tutor.type === 'AI' ? 'bg-orange-200/50' : 'bg-accent/20'
                      }`}>
                        {tutor.type === 'AI' ? 
                          <Brain className="w-4 h-4 text-orange-400" /> : 
                          <span className="text-xs font-bold text-accent-foreground">H</span>
                        }
                      </div>
                      <div>
                        <p className="font-medium text-xs">{tutor.name}</p>
                        <p className="text-xs text-muted-foreground">{tutor.specialty}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-3 h-3 fill-current text-yellow-500" />
                        <span className="text-xs">{tutor.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{tutor.users} users</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-2 text-xs">
                    Connect
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Recent Topics */}
        <Card className="glass-card p-6">
          <h3 className="font-semibold mb-4">Recent Topics</h3>
          <div className="space-y-3">
            {recentTopics.map((topic) => (
              <div key={topic.id} className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <p className="font-medium text-sm">{topic.title}</p>
                <div className="flex items-center justify-between mt-1">
                  <Badge  className="text-xs bg-white text-black hover:text-white ">{topic.subject}</Badge>
                  <span className="text-xs text-muted-foreground">{topic.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col">
        <Card className="glass-card flex-1 flex flex-col">
          {/* Chat Header */}
                <div className="p-4 border-b border-border/50 flex items-center justify-between flex-wrap gap-2">

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-learning rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="font-semibold">AI Learning Assistant</h2>
                <p className="text-sm text-muted-foreground">Always ready to help you learn</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "ai" && (
                  <div className="w-8 h-8 bg-gradient-learning rounded-full flex items-center justify-center flex-shrink-0">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div className={`max-w-[80%] ${message.sender === "user" ? "order-2" : ""}`}>
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-muted"
                    }`}
                  >
                    <div className="prose prose-sm max-w-none">
                      {message.content.split('\n').map((line, index) => (
                        <p key={index} className={message.sender === "user" ? "text-primary-foreground" : "text-foreground"}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {message.sender === "ai" && (
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFeedback(message.id, true)}
                          className={`p-1 h-6 ${message.metadata?.helpful === true ? "text-success" : ""}`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFeedback(message.id, false)}
                          className={`p-1 h-6 ${message.metadata?.helpful === false ? "text-destructive" : ""}`}
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1 h-6">
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {message.sender === "user" && (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 order-3">
                    <span className="text-primary-foreground text-sm font-medium">U</span>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          {/* <div className="p-4 border-t border-border/50">
            <div className="flex gap-3">
              <div className="flex-1 space-y-3">
                <Textarea
                  placeholder="Ask me anything about your studies..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="min-h-[60px] resize-none"
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Image className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Code className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={isRecording ? "destructive" : "outline"}
                      size="sm"
                      onClick={handleVoiceToggle}
                    >
                      {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                  </div>
                  
                  <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                    <Send className="w-4 h-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div> */}

          <div className="p-4 border-t border-border/50">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 space-y-3">
            <Textarea
            id="inputMessage"
              placeholder="Ask me anything about your studies..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="min-h-[60px] resize-none"
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Image className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Code className="w-4 h-4" />
                </Button>
                <Button
                  variant={isRecording ? "destructive" : "outline"}
                  size="sm"
                  onClick={handleVoiceToggle}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
              </div>

              <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>

        </Card>
      </div>
    </div>
  );
}