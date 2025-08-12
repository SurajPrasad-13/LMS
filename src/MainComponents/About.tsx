import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Users,
  Award,
  TrendingUp,
  Heart,
  Globe,
  Brain,
  Lightbulb,
  Shield,
  Rocket,
} from "lucide-react";
import aboutImage from "@/assets/about-office.jpg";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description:
        "Democratizing quality education through AI-powered personalized learning experiences.",
    },
    {
      icon: Brain,
      title: "Innovation First",
      description:
        "Leveraging cutting-edge AI technology to revolutionize how people learn and grow.",
    },
    {
      icon: Heart,
      title: "Student-Centric",
      description:
        "Every decision we make puts our learners' success and experience at the center.",
    },
    {
      icon: Globe,
      title: "Global Impact",
      description:
        "Building a worldwide community of learners breaking barriers and achieving dreams.",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "Founded",
      description:
        "AI Learn was founded with a vision to make quality education accessible worldwide.",
    },
    {
      year: "2021",
      title: "AI Integration",
      description:
        "Launched our proprietary AI-powered personalized learning algorithm.",
    },
    {
      year: "2022",
      title: "10K Students",
      description:
        "Reached our first 10,000 active students across 50+ countries.",
    },
    {
      year: "2023",
      title: "Industry Recognition",
      description:
        "Won 'Best EdTech Innovation' award and partnered with Fortune 500 companies.",
    },
    {
      year: "2024",
      title: "50K+ Community",
      description:
        "Expanded to 50,000+ students with 1000+ expert instructors globally.",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Mitchell",
      role: "CEO & Co-founder",
      bio: "Former Harvard professor with 15+ years in educational technology and AI research.",
      expertise: "AI in Education, Learning Science",
    },
    {
      name: "Alex Chen",
      role: "CTO & Co-founder",
      bio: "Ex-Google engineer specializing in machine learning and scalable educational platforms.",
      expertise: "Machine Learning, Platform Architecture",
    },
    {
      name: "Maria Rodriguez",
      role: "Chief Learning Officer",
      bio: "Educational psychologist with expertise in curriculum design and student engagement.",
      expertise: "Curriculum Design, Learning Psychology",
    },
    {
      name: "David Park",
      role: "Head of AI Research",
      bio: "PhD in Computer Science, leading our research in adaptive learning algorithms.",
      expertise: "Adaptive Learning, AI Research",
    },
  ];

  const achievements = [
    {
      icon: Users,
      number: "50,000+",
      label: "Students Worldwide",
      description: "Active learners from 150+ countries",
    },
    {
      icon: Award,
      number: "95%",
      label: "Course Completion",
      description: "Industry-leading completion rates",
    },
    {
      icon: TrendingUp,
      number: "87%",
      label: "Career Advancement",
      description: "Students report career growth",
    },
    {
      icon: Globe,
      number: "150+",
      label: "Countries Served",
      description: "Global reach and impact",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-learning text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              <Lightbulb className="w-4 h-4 mr-2" />
              About AI Learn
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Transforming Education Through
              <span className="block p-3 gradient-text bg-gradient-to-r from-primary/90 to-secondary bg-clip-text text-transparent">
                Artificial Intelligence
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              We're on a mission to democratize quality education by making
              personalized, AI-powered learning accessible to everyone,
              everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4">
                <Rocket className="w-4 h-4 mr-2" />
                Our Story
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Building the Future of Learning
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  AI Learn was born from a simple yet powerful belief: everyone
                  deserves access to world-class education, regardless of their
                  background, location, or circumstances. Our founders, Dr.
                  Sarah Mitchell and Alex Chen, combined their expertise in
                  education and technology to create a platform that adapts to
                  each learner's unique needs.
                </p>
                <p>
                  What started as a small team of passionate educators and
                  engineers has grown into a global movement. We've helped over
                  50,000 students across 150+ countries achieve their learning
                  goals and transform their careers through our AI-powered
                  platform.
                </p>
                <p>
                  Today, we continue to push the boundaries of what's possible
                  in education, constantly innovating to provide more
                  personalized, engaging, and effective learning experiences for
                  our global community.
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src={aboutImage}
                alt="AI Learn team collaboration"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">
              <Heart className="w-4 h-4 mr-2" />
              Our Values
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our core values guide every decision we make and every feature we
              build, ensuring we stay true to our mission of transforming
              education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="hover:scale-105 transition-all duration-300 hover:shadow-xl text-center border-0 shadow-lg"
              >
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-learning flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">
              <TrendingUp className="w-4 h-4 mr-2" />
              Our Journey
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Milestones & Achievements
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From a small startup to a global education platform, here's how
              we've grown and evolved to serve our learning community better.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-learning flex items-center justify-center text-white font-bold text-lg">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-2xl font-bold mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">
              <Users className="w-4 h-4 mr-2" />
              Leadership Team
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet the Visionaries
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our diverse leadership team combines decades of experience in
              education, technology, and AI to drive innovation in learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="hover:scale-105 transition-all duration-300 hover:shadow-xl border-0 shadow-lg"
              >
                <CardHeader className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-learning mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-orange-400 font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="text-xs text-orange-400 font-medium">
                    {member.expertise}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">
              <Award className="w-4 h-4 mr-2" />
              Impact & Results
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Measuring Our Success
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Numbers that reflect our commitment to delivering exceptional
              learning experiences and creating meaningful impact in our
              students' lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="hover:scale-105 transition-all duration-300 hover:shadow-xl text-center border-0 shadow-lg"
              >
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-learning flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-4xl font-bold text-orange-400 mb-2">
                    {achievement.number}
                  </CardTitle>
                  <CardDescription className="text-lg font-semibold text-foreground">
                    {achievement.label}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-learning text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Be part of the education revolution. Whether you're a learner
              looking to advance your career or an expert wanting to share your
              knowledge, there's a place for you in our community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4 bg-[#f97b1b] hover:bg-white hover:text-[#f97b1b]  border-white border hover:scale-105 hover:-translate-y-1"
              >
                <Shield className="w-5 h-5 mr-2 " />
                Start Learning
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-[#f97b1b]  border-white hover:bg-[#f97b1b] hover:text-white hover:scale-105 hover:-translate-y-1"
              >
                <Users className="w-5 h-5 mr-2" />
                Become an Instructor
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
