import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "@/lib/goToTitle";
import heroBg from "@/assets/heromag.png";
import { ReactTyped } from 'react-typed';
import { useState, useEffect } from 'react';

const Hero = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleNavigation = (path: string) => {
    navigate(path);
    setTimeout(scrollToTop, 100); // Delay slightly to ensure navigation completes
  };

  return (
    <section className="relative h-[300px] md:h-[350px] lg:h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/10 to-background">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in-down {
          animation: slideInDown 0.8s ease-out forwards;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(235, 92, 75, 0.3); }
          50% { box-shadow: 0 0 40px rgba(235, 92, 75, 0.6); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
      <img 
        src={heroBg} 
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="relative z-10 text-center text-white px-4 sm:px-6 md:px-8 py-6 md:py-8 w-full max-w-4xl mx-auto">
        <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg animate-slide-in-down" style={{ animationDelay: '0s' }}>
            لم تعد بحاجة للخروج من البيت
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight animate-slide-in-down" style={{ animationDelay: '0.2s' }}>
            <span className="text-yellow-300 drop-shadow-lg"> نحن هنا لنوصل لك كل ما ترغب به </span>
          </h2>
        </div>

        <div className="text-base sm:text-lg md:text-xl mb-8 md:mb-12 opacity-95 mx-auto max-w-md sm:max-w-lg h-8 sm:h-10 md:h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg animate-pulse-glow animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <ReactTyped
            strings={['نوصّل لك كل ما تريد، أينما كنت ']}
            typeSpeed={70}
            backSpeed={50}
            backDelay={3000}
            loop
            cursorChar="|"
          />
        </div>
        
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center items-stretch px-4 sm:px-0 sm:items-center max-w-sm sm:max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 rounded-full border-2 border-white px-8 py-3 md:py-6 shrink-0 w-full sm:w-auto text-sm md:text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            onClick={() => handleNavigation('/order')}
          >
            ماذا تريد أن نوصّل لك
          </Button>

          <Button
            size="lg"
            className="bg-primary/90 hover:bg-primary text-white rounded-full border-2 border-yellow-300 px-8 py-3 md:py-6 shrink-0 w-full sm:w-auto text-sm md:text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            onClick={() => handleNavigation('/transport')}
          >
            اطلب وسيلة النقل
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
