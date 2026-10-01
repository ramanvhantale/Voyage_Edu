import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Users, MapPin, Award, ExternalLink, Search, Filter, Loader2 } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { fetchInstitutionsWithMetadata, deduplicateInstitutions, InstitutionMetadata } from "@/services/institutionMetadataService";

const Institutions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterState, setFilterState] = useState("all");
  const [institutions, setInstitutions] = useState<InstitutionMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch institutions on component mount
  useEffect(() => {
    const loadInstitutions = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchInstitutionsWithMetadata();
        // Deduplicate to avoid redundant data
        const uniqueInstitutions = deduplicateInstitutions(data);
        setInstitutions(uniqueInstitutions);
      } catch (err) {
        console.error('Error loading institutions:', err);
        setError(err instanceof Error ? err.message : 'Failed to load institutions');
      } finally {
        setLoading(false);
      }
    };

    loadInstitutions();
  }, []);

  const filteredInstitutions = useMemo(() => {
    return institutions.filter((institution) => {
      const matchesSearch = 
        institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institution.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institution.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (institution.description && institution.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = filterType === "all" || (institution.type && institution.type.toLowerCase().includes(filterType.toLowerCase()));
      const matchesState = filterState === "all" || institution.state === filterState;
      
      return matchesSearch && matchesType && matchesState;
    });
  }, [searchTerm, filterType, filterState, institutions]);

  const institutionTypes = useMemo(() => {
    const types = institutions
      .map(inst => inst.type || inst.location_type || 'Educational Institution')
      .filter((type): type is string => !!type);
    return [...new Set(types)];
  }, [institutions]);

  const states = useMemo(() => {
    return [...new Set(institutions.map(inst => inst.state).filter(Boolean))];
  }, [institutions]);

  // Format website URL helper
  const formatWebsiteUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="py-16 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Educational Institutions
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore India's premier educational institutions. From IITs to universities, discover the best places for higher education across the country.
              </p>
            </div>

            {/* Search and Filter Section */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search institutions, cities, or specializations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-primary/20 focus:border-primary/40 bg-background/50"
                    />
                  </div>
                  
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="border-primary/20 focus:border-primary/40 bg-background/50">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Institution Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {institutionTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={filterState} onValueChange={setFilterState}>
                    <SelectTrigger className="border-primary/20 focus:border-primary/40 bg-background/50">
                      <MapPin className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All States</SelectItem>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="mt-4 text-sm text-muted-foreground text-center">
                  {filteredInstitutions.length} institution{filteredInstitutions.length !== 1 ? 's' : ''} found
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Institutions Grid */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">Loading institutions...</p>
                  <p className="text-sm text-muted-foreground mt-2">Fetching data from websites and database</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <p className="text-destructive mb-4">{error}</p>
                  <Button onClick={() => window.location.reload()}>Retry</Button>
                </div>
              </div>
            ) : filteredInstitutions.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">No institutions found matching your criteria.</p>
                  <Button variant="outline" onClick={() => { setSearchTerm(''); setFilterType('all'); setFilterState('all'); }}>
                    Clear Filters
                  </Button>
                </div>
              </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredInstitutions.map((institution) => (
                  <Card key={institution._id} className="group hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/30">
                    {institution.image && (
                      <div className="w-full h-48 overflow-hidden rounded-t-lg">
                        <img 
                          src={institution.image} 
                          alt={institution.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20">
                          {institution.type || institution.location_type || 'Educational Institution'}
                      </Badge>
                        {institution.year_of_establishment && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Award className="w-3 h-3" />
                            <span>{institution.year_of_establishment}</span>
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                      {institution.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                        {institution.city && institution.state 
                          ? `${institution.city}, ${institution.state}`
                          : institution.address || institution.state || 'Location not specified'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                      {institution.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {institution.description}
                    </p>
                      )}
                      
                      {institution.aishe_code && (
                    <div className="mb-4">
                          <Badge variant="outline" className="text-xs">
                            AISHE: {institution.aishe_code}
                          </Badge>
                        </div>
                      )}

                      {institution.website ? (
                        <Button 
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          onClick={() => window.open(formatWebsiteUrl(institution.website), '_blank', 'noopener,noreferrer')}
                        >
                      <ExternalLink className="w-4 h-4 mr-2" />
                          Visit Website
                        </Button>
                      ) : (
                        <Button 
                          className="w-full" 
                          variant="outline"
                          disabled
                        >
                          Website not available
                    </Button>
                      )}
                  </CardContent>
                </Card>
              ))}
            </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Can't Find Your Institution?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're constantly expanding our database. If you know of an institution that should be featured, let us know!
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent-light text-accent-foreground">
              Suggest an Institution
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Institutions;