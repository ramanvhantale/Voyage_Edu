import { MapPin, Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-3xl font-bold mb-4">
              Voyage<span className="text-accent">Edu</span>
            </div>
            <p className="text-background/80 mb-6 leading-relaxed">
              Your comprehensive guide to educational institutions across India. Discover, explore, and make informed decisions about your educational journey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-background/80 hover:text-accent transition-colors">Home</a></li>
              <li><a href="#" className="text-background/80 hover:text-accent transition-colors">Interactive Map</a></li>
              <li><a href="#" className="text-background/80 hover:text-accent transition-colors">All Institutions</a></li>
              <li><a href="#" className="text-background/80 hover:text-accent transition-colors">Rankings</a></li>
              <li><a href="#" className="text-background/80 hover:text-accent transition-colors">Community</a></li>
              <li><a href="#" className="text-background/80 hover:text-accent transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Categories</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-background/80 hover:text-accent transition-colors">Engineering Colleges</a></li>
              <li><a href="#" className="text-background/80 hover:text-accent transition-colors">Medical Colleges</a></li>
              <li><a href="#" className="text-background/80 hover:text-accent transition-colors">Universities</a></li>
              <li><a href="#" className="text-background/80 hover:text-accent transition-colors">Business Schools</a></li>
              <li><a href="#" className="text-background/80 hover:text-accent transition-colors">Arts & Science</a></li>
              <li><a href="#" className="text-background/80 hover:text-accent transition-colors">Technical Institutes</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <span className="text-background/80">
                  VISHWAKARMA INSTITUTE OF TECHNOLOGY VIT<br />
                  Upper Indira Nagar, Bibwewadi<br />
                  Pune, Maharashtra 411037
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-background/80">+91 11 1234 5678</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-background/80">contact@voyageedu.edu.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-background/60 text-sm mb-4 md:mb-0">
            © 2024 VoyageEdu. All rights reserved. | Privacy Policy | Terms of Service
          </p>
          <p className="text-background/60 text-sm">
            Made with ❤️ for Indian Education
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;