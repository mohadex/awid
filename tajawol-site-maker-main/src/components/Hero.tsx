import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import { ReactTyped } from 'react-typed';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative h-[380px] md:h-[350px] lg:h-[400px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-secondary/95"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-3 sm:px-4 py-5 md:py-8 w-full">
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 md:mb-6 leading-tight">
          نجعل التنقل في بيوكرى
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-6 md:mb-8 leading-tight">
          <span className="text-primary">أسهل من أي وقت مضى</span>
        </h2>
        <div className="text-sm sm:text-base md:text-lg mb-5 sm:mb-8 md:mb-10 opacity-90 mx-auto max-w-xs sm:max-w-sm md:max-w-md h-[24px] sm:h-[28px] md:h-[32px] flex items-center justify-center">
          <ReactTyped
            strings={['نوفر لك خدمة توصيل سريعة وآمنة في جميع أنحاء بيوكرى']}
            typeSpeed={70}
            backSpeed={50}
            backDelay={3000}
            loop
            cursorChar="_"
          />
        </div>
        
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 justify-center items-stretch px-4 sm:px-0 sm:items-center max-w-xs sm:max-w-md mx-auto">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 h-10 sm:h-11 md:h-12 px-4 sm:px-6 md:px-8 shrink-0 w-full sm:w-auto text-sm md:text-base font-semibold"
            onClick={() => navigate('/order')}
          >
            قدم طلبك مع أويد
          </Button>
          <Button 
            variant="outline"
            size="lg" 
            className="bg-white text-foreground hover:bg-gray-100 h-10 sm:h-11 md:h-12 px-4 sm:px-6 md:px-8 shrink-0 w-full sm:w-auto text-sm md:text-base font-semibold"
            onClick={() => navigate('/transport')}
          >
            اطلب وسيلة نقل
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
