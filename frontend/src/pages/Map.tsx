import Navbar from "@/components/Navbar";
import LeafletMap from "@/components/LeafletMap";
import Footer from "@/components/Footer";

const Map = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="py-16 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Educational Institutions Map
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover top educational institutions across India with our interactive map. Click on markers to explore detailed information about universities, colleges, and schools.
              </p>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 pb-16">
          <LeafletMap 
            height="600px" 
            showAll={true} 
            enableClustering={true}
            disableScrollZoom={false}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Map;