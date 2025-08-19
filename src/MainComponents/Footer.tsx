import { Link } from "react-router-dom";
import {
  Brain,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "../assets/Logo1.png";
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#fa9537] to-[#fcbe53] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className=" rounded-lg bg-white/50">
                {/* <Brain className="w-6 h-6 text-white" /> */}
                <img src={logo} alt="" className="size-12 contrast-80 " />
              </div>
              <span className="text-xl font-bold">AI Learn</span>
            </Link>
            <p className="text-white/80 leading-relaxed">
              Empowering learners worldwide with AI-enhanced education. Join
              millions of students transforming their careers through
              personalized learning experiences.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/70"
              >
                <a href="https://www.facebook.com/people/Sudo-Techlabs/61574788298611/" target="_blank">
                  <Facebook className="w-5 h-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/70"
              >
                <a href="https://x.com/TechlabsSu58347 " target="_blank">
                  <Twitter className="w-5 h-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/70"
              >
                <a href="https://www.linkedin.com/company/sudotechlabs/?originalSubdomain=in" target="_blank">
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/70"
              >
                <a href="https://www.instagram.com/techlabssudo/" target="_blank">
                <Instagram className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link
                to="/about"
                className="block text-white/80 hover:text-white transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/courses"
                className="block text-white/80 hover:text-white transition-colors"
              >
                Courses
              </Link>
              <Link
                to="/mentors"
                className="block text-white/80 hover:text-white transition-colors"
              >
                Mentors
              </Link>
              <Link
                to="/blogs"
                className="block text-white/80 hover:text-white transition-colors"
              >
                Blogs
              </Link>
              <Link
                to="/contact"
                className="block text-white/80 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Learning Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <div className="space-y-2">
              <div className="text-white/80 hover:text-white transition-colors">
                AI & Machine Learning
              </div>
              <div className="text-white/80 hover:text-white transition-colors">
                Web Development
              </div>
              <div className="text-white/80 hover:text-white transition-colors">
                Data Science
              </div>
              <div className="text-white/80 hover:text-white transition-colors">
                Digital Marketing
              </div>
              <div className="text-white/80 hover:text-white transition-colors">
                Business Skills
              </div>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Connected</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-white/80">
                <Mail className="w-4 h-4" />
                <span>hello@ailearn.com</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-white/80">
                Subscribe to our newsletter
              </p>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Your email"
                  className="bg-white/20 hover:bg-white/30 text-black border-white/30 placeholder:text-white/60"
                />
                <Button variant="secondary" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/80 text-sm">
            © 2024 AI Learn. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-white/80 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
