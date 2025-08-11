import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight,
  TrendingUp,
  BookOpen,
  Brain,
  Code,
  Palette,
  Database,
  Smartphone,
  Eye,
  MessageCircle,
  Share2
} from "lucide-react";

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Topics", icon: BookOpen },
    { id: "ai-ml", name: "AI & Machine Learning", icon: Brain },
    { id: "web-dev", name: "Web Development", icon: Code },
    { id: "design", name: "Design", icon: Palette },
    { id: "data-science", name: "Data Science", icon: Database },
    { id: "mobile", name: "Mobile Development", icon: Smartphone },
    { id: "career", name: "Career Tips", icon: TrendingUp }
  ];

  const featuredPost = {
    id: 1,
    title: "The Future of AI in Education: Transforming Learning Through Personalization",
    author: "Dr. Sarah Mitchell",
    authorRole: "AI Research Director",
    publishDate: "2024-01-10",
    readTime: "8 min read",
    category: "ai-ml",
    image: "/api/placeholder/800/400",
    excerpt: "Explore how artificial intelligence is revolutionizing education through personalized learning experiences, adaptive curricula, and intelligent tutoring systems that adapt to each student's unique learning style and pace.",
    views: 15420,
    comments: 89,
    tags: ["AI", "Education", "Personalization", "Future Tech"]
  };

  const blogPosts = [
    {
      id: 2,
      title: "10 Essential React Hooks Every Developer Should Master",
      author: "Alex Chen",
      authorRole: "Senior Full Stack Engineer",
      publishDate: "2024-01-08",
      readTime: "6 min read",
      category: "web-dev",
      image: "/api/placeholder/600/300",
      excerpt: "Deep dive into the most powerful React hooks that will transform your development workflow and make your components more efficient and maintainable.",
      views: 8950,
      comments: 45,
      tags: ["React", "JavaScript", "Frontend", "Hooks"]
    },
    {
      id: 3,
      title: "Building Scalable Design Systems: A Complete Guide",
      author: "Maria Rodriguez",
      authorRole: "UX Design Lead",
      publishDate: "2024-01-06",
      readTime: "12 min read",
      category: "design",
      image: "/api/placeholder/600/300",
      excerpt: "Learn how to create and maintain design systems that scale across teams and products, ensuring consistency and efficiency in your design workflow.",
      views: 6780,
      comments: 32,
      tags: ["Design Systems", "UX", "Figma", "Scalability"]
    },
    {
      id: 4,
      title: "Data Science Career Roadmap: From Beginner to Expert",
      author: "Prof. Michael Kim",
      authorRole: "Data Science Professor",
      publishDate: "2024-01-04",
      readTime: "10 min read",
      category: "data-science",
      image: "/api/placeholder/600/300",
      excerpt: "A comprehensive roadmap for aspiring data scientists, covering essential skills, tools, and career progression strategies in the rapidly evolving field.",
      views: 12340,
      comments: 78,
      tags: ["Data Science", "Career", "Python", "Statistics"]
    },
    {
      id: 5,
      title: "Mobile-First Development: Best Practices for 2024",
      author: "Jennifer Park",
      authorRole: "Mobile Development Lead",
      publishDate: "2024-01-02",
      readTime: "7 min read",
      category: "mobile",
      image: "/api/placeholder/600/300",
      excerpt: "Essential strategies for mobile-first development, including responsive design patterns, performance optimization, and user experience considerations.",
      views: 5670,
      comments: 23,
      tags: ["Mobile", "React Native", "Flutter", "UX"]
    },
    {
      id: 6,
      title: "Breaking Into Tech: A Non-Technical Background Success Story",
      author: "David Liu",
      authorRole: "DevOps Engineering Manager",
      publishDate: "2023-12-30",
      readTime: "9 min read",
      category: "career",
      image: "/api/placeholder/600/300",
      excerpt: "Inspiring story and practical advice for career changers looking to transition into tech from non-technical backgrounds.",
      views: 9450,
      comments: 67,
      tags: ["Career Change", "Tech Careers", "Success Story", "Tips"]
    },
    {
      id: 7,
      title: "Advanced Python Techniques for Data Analysis",
      author: "Dr. Sarah Mitchell",
      authorRole: "AI Research Director",
      publishDate: "2023-12-28",
      readTime: "11 min read",
      category: "data-science",
      image: "/api/placeholder/600/300",
      excerpt: "Unlock the power of advanced Python techniques for data analysis, including pandas optimization, memory management, and performance tuning.",
      views: 7890,
      comments: 41,
      tags: ["Python", "Data Analysis", "Pandas", "Performance"]
    },
    {
      id: 8,
      title: "The Art of Code Review: Building Better Teams",
      author: "Alex Chen",
      authorRole: "Senior Full Stack Engineer",
      publishDate: "2023-12-26",
      readTime: "8 min read",
      category: "web-dev",
      image: "/api/placeholder/600/300",
      excerpt: "Learn how to conduct effective code reviews that improve code quality, foster team collaboration, and accelerate professional development.",
      views: 6540,
      comments: 35,
      tags: ["Code Review", "Team Building", "Best Practices", "Development"]
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              <BookOpen className="w-4 h-4 mr-2" />
              Learning Blog
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Insights & Knowledge
              <span className="block text-yellow-400">From Industry Experts</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed">
              Stay ahead of the curve with cutting-edge insights, practical tutorials, 
              and career advice from leading professionals in tech and education.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-white/80">Articles Published</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-white/80">Expert Authors</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">100K+</div>
                <div className="text-white/80">Monthly Readers</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">Weekly</div>
                <div className="text-white/80">New Content</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <Card className="glass-card shadow-2xl max-w-6xl mx-auto overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <BookOpen className="w-24 h-24 text-primary/60" />
              </div>
              
              <CardContent className="p-8 flex flex-col justify-center">
                <Badge className="mb-4 bg-gradient-to-r from-primary to-secondary text-white w-fit">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Featured Article
                </Badge>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  {featuredPost.title}
                </h2>
                
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center space-x-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(featuredPost.publishDate)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredPost.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <Button size="lg" className="btn-hero">
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{featuredPost.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{featuredPost.comments}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Latest Articles</h2>
            
            {/* Search and Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search articles, authors, tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center space-x-2"
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </Button>
              ))}
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="interactive-card group border-0 shadow-lg overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {categories.find(c => c.id === post.category)?.name}
                      </Badge>
                      <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{post.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-3 h-3" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                    </div>
                    
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    
                    <CardDescription className="text-sm line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-sm text-muted-foreground">
                        {formatDate(post.publishDate)}
                      </span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="btn-hero">
                          Read More
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or explore different categories.
                </p>
              </div>
            )}

            {/* Load More */}
            {filteredPosts.length > 0 && (
              <div className="text-center mt-12">
                <Button size="lg" variant="outline">
                  Load More Articles
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto text-center border-0 shadow-2xl">
            <CardContent className="p-12">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Never Miss an Update
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and get the latest insights, tutorials, and career tips 
                delivered directly to your inbox every week.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-6">
                <Input 
                  placeholder="Enter your email address" 
                  className="flex-1"
                />
                <Button className="btn-hero">
                  Subscribe
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                Join 50,000+ professionals. Unsubscribe anytime.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Want to Contribute?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Share your expertise with our global community. We're always looking for 
            experienced professionals to contribute valuable insights and tutorials.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              <User className="w-5 h-5 mr-2" />
              Become an Author
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
              <MessageCircle className="w-5 h-5 mr-2" />
              Submit Article Idea
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;