import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Star, 
  MapPin, 
  Calendar, 
  MessageCircle, 
  Users, 
  Award,
  Clock,
  Video,
  CheckCircle,
  Briefcase,
  GraduationCap
} from "lucide-react";
import mentorsImage from "@/assets/mentors-team.jpg";

const Mentors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("all");

  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Mitchell",
      title: "AI Research Director",
      company: "TechCorp AI",
      expertise: ["AI/ML", "Deep Learning", "Computer Vision"],
      experience: "15+ years",
      location: "San Francisco, CA",
      rating: 4.9,
      reviews: 127,
      students: 2340,
      sessions: 890,
      languages: ["English", "Spanish"],
      education: "PhD Computer Science - Stanford",
      hourlyRate: 150,
      responseTime: "< 2 hours",
      description: "Leading AI researcher with 15+ years experience in machine learning and computer vision. Published 50+ papers and holds 12 patents.",
      specialties: ["Machine Learning Architecture", "Computer Vision Systems", "AI Strategy", "Research Methodology"],
      achievements: ["Google Scholar H-index: 45", "IEEE Fellow", "Best Paper Award 2023"],
      availability: "Weekdays 9AM-6PM PST"
    },
    {
      id: 2,
      name: "Alex Chen",
      title: "Senior Full Stack Engineer",
      company: "Meta",
      expertise: ["Web Development", "React", "Node.js"],
      experience: "10+ years",
      location: "Seattle, WA",
      rating: 4.8,
      reviews: 203,
      students: 1890,
      sessions: 1205,
      languages: ["English", "Mandarin"],
      education: "MS Computer Science - MIT",
      hourlyRate: 120,
      responseTime: "< 1 hour",
      description: "Senior engineer at Meta with expertise in building scalable web applications. Passionate about mentoring the next generation of developers.",
      specialties: ["React Ecosystem", "Node.js Backend", "System Design", "Code Architecture"],
      achievements: ["Tech Lead at 3 startups", "Open Source Contributor", "500K+ npm downloads"],
      availability: "Evenings 6PM-10PM PST"
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      title: "UX Design Lead",
      company: "Apple",
      expertise: ["UX/UI Design", "Design Systems", "User Research"],
      experience: "12+ years",
      location: "Cupertino, CA",
      rating: 4.9,
      reviews: 156,
      students: 1560,
      sessions: 678,
      languages: ["English", "Spanish", "Portuguese"],
      education: "MFA Design - Art Center",
      hourlyRate: 140,
      responseTime: "< 3 hours",
      description: "Design leader at Apple with 12+ years creating intuitive user experiences. Expert in design systems and user-centered design.",
      specialties: ["Design Systems", "User Research", "Prototyping", "Design Leadership"],
      achievements: ["Lead designer on iOS features", "Design Award Winner", "Speaker at 20+ conferences"],
      availability: "Flexible schedule"
    },
    {
      id: 4,
      name: "Prof. Michael Kim",
      title: "Data Science Professor",
      company: "Stanford University",
      expertise: ["Data Science", "Statistics", "Python"],
      experience: "20+ years",
      location: "Palo Alto, CA",
      rating: 4.7,
      reviews: 89,
      students: 3450,
      sessions: 445,
      languages: ["English", "Korean"],
      education: "PhD Statistics - Harvard",
      hourlyRate: 180,
      responseTime: "< 4 hours",
      description: "Professor of Statistics at Stanford with 20+ years in data science education. Author of 3 bestselling data science books.",
      specialties: ["Statistical Modeling", "Machine Learning", "Research Methods", "Academic Writing"],
      achievements: ["Author of 3 bestsellers", "100+ published papers", "Teaching Excellence Award"],
      availability: "Weekends preferred"
    },
    {
      id: 5,
      name: "Jennifer Park",
      title: "Product Marketing Director",
      company: "Salesforce",
      expertise: ["Digital Marketing", "Growth", "Analytics"],
      experience: "8+ years",
      location: "San Francisco, CA",
      rating: 4.8,
      reviews: 174,
      students: 980,
      sessions: 623,
      languages: ["English"],
      education: "MBA - Wharton",
      hourlyRate: 110,
      responseTime: "< 2 hours",
      description: "Marketing director with proven track record of scaling SaaS products from startup to IPO. Expert in growth marketing and analytics.",
      specialties: ["Growth Marketing", "Product Analytics", "Go-to-Market", "Team Leadership"],
      achievements: ["Led 300% growth at 2 startups", "Marketing Week Award", "Top 40 under 40"],
      availability: "Weekdays 10AM-4PM PST"
    },
    {
      id: 6,
      name: "David Liu",
      title: "DevOps Engineering Manager",
      company: "Netflix",
      expertise: ["DevOps", "Cloud", "Kubernetes"],
      experience: "14+ years",
      location: "Los Gatos, CA",
      rating: 4.9,
      reviews: 92,
      students: 1234,
      sessions: 567,
      languages: ["English", "Mandarin"],
      education: "BS Computer Engineering - UC Berkeley",
      hourlyRate: 135,
      responseTime: "< 1 hour",
      description: "DevOps expert managing infrastructure for Netflix's global streaming platform. Specialist in cloud architecture and automation.",
      specialties: ["Kubernetes", "AWS/GCP", "CI/CD", "Infrastructure as Code"],
      achievements: ["Scaled Netflix to 200M users", "Kubernetes contributor", "DockerCon speaker"],
      availability: "Evenings and weekends"
    }
  ];

  const expertiseAreas = [
    "All Areas",
    "AI/ML",
    "Web Development", 
    "UX/UI Design",
    "Data Science",
    "Digital Marketing",
    "DevOps",
    "Mobile Development",
    "Blockchain"
  ];

  const experienceLevels = [
    "All Experience",
    "5-10 years",
    "10-15 years", 
    "15+ years"
  ];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesExpertise = selectedExpertise === "all" || 
                            mentor.expertise.some(skill => skill.toLowerCase().includes(selectedExpertise.toLowerCase().replace("all areas", "")));
    
    const matchesExperience = selectedExperience === "all" || 
                             mentor.experience.includes(selectedExperience.split("-")[0]) ||
                             (selectedExperience === "15+ years" && mentor.experience.includes("15+"));
    
    return matchesSearch && matchesExpertise && matchesExperience;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              <Users className="w-4 h-4 mr-2" />
              Expert Mentorship
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Learn from Industry
              <span className="block text-yellow-400">Leading Experts</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed">
              Get personalized guidance from top professionals at Google, Apple, Netflix, and more. 
              Accelerate your career with 1-on-1 mentorship tailored to your goals.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">1000+</div>
                <div className="text-white/80">Expert Mentors</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">50K+</div>
                <div className="text-white/80">Sessions Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">4.8★</div>
                <div className="text-white/80">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-white/80">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentor Spotlight */}
      <section className="py-16 -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <Card className="glass-card shadow-2xl max-w-6xl mx-auto">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge className="mb-4 bg-gradient-to-r from-primary to-secondary text-white">
                    <Award className="w-4 h-4 mr-2" />
                    Featured Mentor
                  </Badge>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Get Matched with Your Perfect Mentor
                  </h2>
                  
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    Our AI-powered matching system connects you with mentors who align with your 
                    career goals, learning style, and industry interests for maximum impact.
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span>Personalized mentor matching</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span>Flexible scheduling options</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span>Industry-specific expertise</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span>Progress tracking and goals</span>
                    </div>
                  </div>

                  <Button size="lg" className="btn-hero mr-4">
                    Find Your Mentor
                  </Button>
                  <Button size="lg" variant="outline">
                    <Video className="w-4 h-4 mr-2" />
                    Free Consultation
                  </Button>
                </div>

                <div className="relative">
                  <img 
                    src={mentorsImage} 
                    alt="Professional mentors and experts" 
                    className="w-full rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Browse Our Expert Mentors</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search mentors, skills, companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedExpertise} onValueChange={setSelectedExpertise}>
                <SelectTrigger>
                  <SelectValue placeholder="Expertise Area" />
                </SelectTrigger>
                <SelectContent>
                  {expertiseAreas.map((area, index) => (
                    <SelectItem key={index} value={area.toLowerCase().replace(" ", "-")}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                <SelectTrigger>
                  <SelectValue placeholder="Experience Level" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((level, index) => (
                    <SelectItem key={index} value={level.toLowerCase().replace(" ", "-")}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Mentors Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredMentors.map((mentor) => (
                <Card key={mentor.id} className="interactive-card border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-xl font-bold">
                          {mentor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{mentor.name}</CardTitle>
                          <CardDescription className="text-primary font-medium">
                            {mentor.title}
                          </CardDescription>
                          <div className="text-sm text-muted-foreground">
                            {mentor.company}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{mentor.rating}</span>
                          <span className="text-sm text-muted-foreground">({mentor.reviews})</span>
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          ${mentor.hourlyRate}/hr
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {mentor.description}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {mentor.expertise.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Briefcase className="w-4 h-4 text-muted-foreground" />
                          <span>{mentor.experience}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{mentor.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="w-4 h-4 text-muted-foreground" />
                          <span>{mentor.education}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{mentor.students} students</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MessageCircle className="w-4 h-4 text-muted-foreground" />
                          <span>{mentor.sessions} sessions</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{mentor.responseTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Specialties:</h4>
                      <div className="flex flex-wrap gap-1">
                        {mentor.specialties.slice(0, 3).map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                        {mentor.specialties.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{mentor.specialties.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-3 pt-2">
                      <Button size="sm" className="flex-1 btn-hero">
                        Book Session
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredMentors.length === 0 && (
              <div className="text-center py-16">
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No mentors found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or browse all mentors.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">How Mentorship Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our streamlined process makes it easy to connect with the right mentor 
              and start accelerating your career growth immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  1
                </div>
                <CardTitle>Find Your Match</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Browse our expert mentors or let our AI matching system recommend 
                  the perfect mentors based on your goals and interests.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  2
                </div>
                <CardTitle>Schedule & Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Book sessions that fit your schedule. Connect via video call, 
                  phone, or messaging based on your preference and needs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  3
                </div>
                <CardTitle>Achieve Your Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Work with your mentor to create a personalized roadmap, track progress, 
                  and achieve your career objectives faster than ever.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Find Your Mentor?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of professionals who have accelerated their careers 
            through expert mentorship. Your success story starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              <Users className="w-5 h-5 mr-2" />
              Get Matched Now
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
              <Calendar className="w-5 h-5 mr-2" />
              Free Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mentors;