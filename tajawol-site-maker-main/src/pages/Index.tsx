import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import TransportServices from "@/components/TransportServices";
import ServicesGrid from "@/components/ServicesGrid";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      
      {/* Call to Action Card Section */}
      <section className="bg-gradient-to-b from-background to-muted/20 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="p-8 md:p-10 shadow-lg bg-white">
            <div className="text-center space-y-6">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                نوفر لك خدمة توصيل سريعة وآمنة في جميع أنحاء بيوكرى، مع فريق محترف ومدرب لضمان
                <br />
                رضاك التام
              </p>
              <Button
                onClick={() => navigate('/order')}
                className="bg-red-600 hover:bg-red-700 text-white text-base md:text-lg font-bold px-8 py-6 rounded-full shadow-md transition-colors"
              >
                قدم طلبك مع أويد
              </Button>
            </div>
          </Card>
        </div>
      </section>
      
      <TransportServices />
      <ServicesGrid />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
