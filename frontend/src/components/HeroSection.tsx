import { Search, MapPin, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import heroImage from "@/assets/hero-education.jpg";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Students studying in university campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-85" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Discover India's
            <span className="block text-accent"> Educational Future</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore thousands of educational institutions across India. Find your perfect college with detailed profiles, 360° views, and comprehensive information.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-12 max-w-2xl mx-auto">
            <div className="relative glass-effect rounded-full p-2">
              <div className="flex items-center">
                <Input
                  type="text"
                  placeholder="Search colleges, universities, or courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border-0 bg-transparent text-lg py-6 px-6 focus:ring-0 placeholder:text-white/60 text-white"
                />
                <Button 
                  type="submit" 
                  size="lg"
                  className="bg-accent hover:bg-accent-light text-accent-foreground rounded-full px-8 py-6 ml-2 search-glow"
                >
                  <Search className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </form>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-md px-8 py-6 text-lg rounded-full"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Explore Map
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-transparent hover:bg-white/10 text-white border-white/50 hover:border-white px-8 py-6 text-lg rounded-full"
            >
              Browse Institutions
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50,000+</div>
              <div className="text-white/80 text-lg">Educational Institutions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">28</div>
              <div className="text-white/80 text-lg">States & Union Territories</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-32 left-10 animate-float">
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
          <Award className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <div className="absolute bottom-32 right-16 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center backdrop-blur-md">
          <Users className="w-10 h-10 text-white" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;