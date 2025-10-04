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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Headphones,
  HelpCircle,
  Users,
  BookOpen,
  Building,
  Globe,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help from our support team",
      contact: "support@ailearn.com",
      responseTime: "< 24 hours",
      color: "from-blue-500 to-purple-500",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our team",
      contact: "+1 (555) 123-4567",
      responseTime: "Mon-Fri 9AM-6PM PST",
      color: "from-green-500 to-blue-500",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with us in real-time",
      contact: "Available on website",
      responseTime: "< 5 minutes",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Headphones,
      title: "Technical Support",
      description: "For technical issues and bugs",
      contact: "tech@ailearn.com",
      responseTime: "< 12 hours",
      color: "from-orange-500 to-red-500",
    },
  ];

  const officeLocations = [
    {
      city: "San Francisco",
      address: "123 Tech Street, Suite 400",
      zipCode: "San Francisco, CA 94105",
      phone: "+1 (555) 123-4567",
      email: "sf@ailearn.com",
      timezone: "PST",
    },
    {
      city: "New York",
      address: "456 Innovation Ave, Floor 12",
      zipCode: "New York, NY 10001",
      phone: "+1 (555) 987-6543",
      email: "ny@ailearn.com",
      timezone: "EST",
    },
    {
      city: "London",
      address: "789 Learning Lane, Office 8",
      zipCode: "London, UK EC1A 1BB",
      phone: "+44 20 1234 5678",
      email: "london@ailearn.com",
      timezone: "GMT",
    },
  ];

  const faqCategories = [
    {
      title: "Getting Started",
      icon: BookOpen,
      questions: [
        "How do I create an account?",
        "What courses are included in my subscription?",
        "How does the AI personalization work?",
        "Can I download course materials?",
      ],
    },
    {
      title: "Billing & Payments",
      icon: Building,
      questions: [
        "What payment methods do you accept?",
        "How do I cancel my subscription?",
        "Do you offer refunds?",
        "Can I get a discount for annual plans?",
      ],
    },
    {
      title: "Technical Support",
      icon: HelpCircle,
      questions: [
        "Why can't I access my courses?",
        "How do I reset my password?",
        "The video won't play, what should I do?",
        "How do I update my profile information?",
      ],
    },
    {
      title: "Mentorship",
      icon: Users,
      questions: [
        "How do I find the right mentor?",
        "What's included in a mentorship session?",
        "Can I change mentors if needed?",
        "How do I schedule mentorship sessions?",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-8 bg-gradient-learning text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Us
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              We're Here to
              <span className="block gradient-text bg-gradient-to-r from-primary/90 to-secondary bg-clip-text text-transparent p-3">
                Help You Succeed
              </span>
            </h1>

            <p className="text-lg md:text-xl mb-4 opacity-90 leading-relaxed">
              Have questions about our courses, need technical support, or want
              to discuss partnership opportunities? Our team is ready to assist
              you.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-white/80">Support Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">&lt; 1hr</div>
                <div className="text-white/80">Response Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-white/80">Support Agents</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">99%</div>
                <div className="text-white/80">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className="hover:scale-105 transition-all duration-300 hover:shadow-xl text-center border-0 shadow-lg"
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${method.color} flex items-center justify-center mx-auto mb-4`}
                  >
                    <method.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="font-medium text-primary">
                      {method.contact}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {method.responseTime}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Fill out the form below and we'll get back to you as soon as
                possible. For urgent matters, please use our live chat or phone
                support.
              </p>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <Input
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <Input
                        placeholder="What is this regarding?"
                        value={formData.subject}
                        onChange={(e) =>
                          handleInputChange("subject", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          handleInputChange("category", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="technical">
                            Technical Support
                          </SelectItem>
                          <SelectItem value="billing">
                            Billing & Payments
                          </SelectItem>
                          <SelectItem value="courses">
                            Course Information
                          </SelectItem>
                          <SelectItem value="mentorship">
                            Mentorship Program
                          </SelectItem>
                          <SelectItem value="partnership">
                            Partnership
                          </SelectItem>
                          <SelectItem value="media">Media & Press</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message</label>
                      <Textarea
                        placeholder="Please describe your inquiry in detail..."
                        rows={6}
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full btn-hero">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Office Locations */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Global Offices</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Visit us at one of our offices worldwide or connect with our
                local teams for region-specific support and partnerships.
              </p>

              <div className="space-y-6">
                {officeLocations.map((office, index) => (
                  <Card key={index} className="border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{office.city}</CardTitle>
                        <Badge variant="outline">{office.timezone}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-orange-400 mt-0.5" />
                        <div>
                          <div className="font-medium">{office.address}</div>
                          <div className="text-sm text-muted-foreground">
                            {office.zipCode}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-orange-400" />
                        <span>{office.phone}</span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-orange-400" />
                        <span>{office.email}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Business Hours */}
              <Card className="border-0 shadow-lg mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Business Hours</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-3">
                    * Times shown are local to each office
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find quick answers to common questions. Can't find what you're
              looking for? Don't hesitate to reach out to our support team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {faqCategories.map((category, index) => (
              <Card
                key={index}
                className="hover:scale-105 transition-all duration-300 hover:shadow-xl border-0 shadow-lg"
              >
                <CardHeader className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-learning flex items-center justify-center mx-auto mb-4">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.questions.map((question, qIndex) => (
                      <div
                        key={qIndex}
                        className="text-sm text-muted-foreground hover:text-green-600 cursor-pointer transition-colors"
                      >
                        • {question}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    View All FAQs
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="px-3">

      <div className="text-4xl md:text-6xl">
        <h1>You can visit.</h1>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2770.3764460240086!2d75.72937887424919!3d26.905346676651508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db3fe5bb55f51%3A0x28ef04348dea4ee9!2sSudo%20Techlabs!5e1!3m2!1sen!2sin!4v1755588113034!5m2!1sen!2sin"
        // width="600"
        // height="300"
        loading="lazy"
        className="h-[200px] w-[300px] sm:h-[250px] sm:w-[500px] md:h-[300px] md:w-[600px]"
      ></iframe>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-learning text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Our support team is standing by to help you succeed. Whether you
              need technical assistance, have billing questions, or want to
              learn more about our programs, we're here for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-[#f97b1b] hover:bg-white hover:text-[#f97b1b]  border-white border hover:scale-105 hover:-translate-y-1"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Live Chat
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-[#f97b1b] bg-white border-white hover:bg-[#f97b1b] hover:text-white hover:scale-105 hover:-translate-y-1"
              >
                <Globe className="w-5 h-5 mr-2" />
                Visit Help Center
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
