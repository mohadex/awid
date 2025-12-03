import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import taxiIllustration from "@/assets/Taxi illustration.png";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import WhyWeCreatedThis from "./WhyWeCreatedThis";

const services = [
  "تاكسي صغير",
  "تاكسي كبير",
  "تريبورتور",
  "هوندا",
  "كاميو",
  "ميني بيس",
  "بيكوب"
];

const TransportServices = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-background via-background to-primary/5 relative overflow-hidden">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @keyframes drive {
          0% {
            transform: translateX(-20px) translateY(0px) rotateZ(-2deg);
          }
          25% {
            transform: translateX(10px) translateY(-15px) rotateZ(1deg);
          }
          50% {
            transform: translateX(30px) translateY(-8px) rotateZ(0deg);
          }
          75% {
            transform: translateX(5px) translateY(-12px) rotateZ(-1deg);
          }
          100% {
            transform: translateX(-20px) translateY(0px) rotateZ(-2deg);
          }
        }
        .animate-float {
          animation: drive 4s ease-in-out infinite;
        }
        @keyframes bounceIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-bounce-in {
          animation: bounceIn 0.5s ease-out forwards;
        }
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
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
      
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
          <div className="inline-block mb-4">
            <span className="block h-1 w-20 bg-gradient-to-r from-primary to-[#d94a3a] mx-auto rounded-full"></span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 mb-6">
            أفضل خدمات النقل مع Awid
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed mt-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            انسَ عناء البحث عن وسائل النقل أو أرقامهم .. اختر أفضل وسيلة في دقائق فقط.
          </p>
        </div>
        
        {/* Taxi Illustration Section */}
        <div className="relative mb-8 md:mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          </div>
          <div className="relative flex justify-center">
            <img 
              src={taxiIllustration}
              alt="Taxi illustration" 
              className="w-full md:w-4/5 lg:w-3/4 max-w-3xl mx-auto object-contain animate-float drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Services Cards Section */}
        <div className="relative mb-8 md:mb-12">
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-primary p-3 rounded-full shadow-lg border-2 border-primary/20 transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none hidden md:flex items-center justify-center"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div 
            ref={scrollContainerRef}
            className="w-full overflow-x-auto pb-6 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-4 md:gap-6 px-4 md:px-16 w-max mx-auto">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 bg-gradient-to-br from-primary via-primary to-[#d94a3a] border-2 border-primary/50 hover:border-white shadow-xl hover:shadow-2xl rounded-2xl p-5 md:p-6 flex flex-col items-center justify-center w-36 h-36 md:w-44 md:h-44 transition-all duration-300 hover:-translate-y-2 hover:scale-105 cursor-pointer group relative overflow-hidden animate-bounce-in"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  {/* Decorative gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Decorative pattern */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-tr-full"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <p className="text-white text-center font-bold text-base md:text-lg leading-tight drop-shadow-lg">
                      {service}
                    </p>
                    <div className="mt-3 w-12 h-0.5 bg-white/30 mx-auto rounded-full group-hover:bg-white/60 transition-colors"></div>
                  </div>
                  
                  {/* Corner decoration */}
                  <div className="absolute top-2 right-2 w-3 h-3 bg-white/20 rounded-full"></div>
                  <div className="absolute bottom-2 left-2 w-3 h-3 bg-white/20 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-primary p-3 rounded-full shadow-lg border-2 border-primary/20 transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none hidden md:flex items-center justify-center"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex justify-center gap-2 mb-8 md:hidden">
          {services.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-primary/30"
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center px-4 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <button
            onClick={() => navigate("/transport")}
            className="group bg-gradient-to-r from-primary to-[#d94a3a] hover:from-[#d94a3a] hover:to-primary text-white font-bold py-4 md:py-5 px-10 md:px-14 rounded-xl text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1 relative overflow-hidden"
          >
            <span className="relative z-10 block">اطلب وسيلة النقل</span>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div>
          </button>
        </div>
        
        {/* Why We Created This Section */}
        <div className="mt-16 md:mt-24">
          <WhyWeCreatedThis />
        </div>
      </div>
    </section>
  );
};

{/* Best Restaurants Section */}
const BestRestaurants = () => {
  const restaurants = [
    { name: "المطبخ التقليدي", rating: 4.8, orders: 2500 },
    { name: "ساحة الطعام", rating: 4.7, orders: 2300 },
    { name: "مطعم الذوق الراقي", rating: 4.9, orders: 2800 },
    { name: "الشاورما الأصلية", rating: 4.6, orders: 2100 },
    { name: "البيتزا الإيطالية", rating: 4.8, orders: 2600 },
    { name: "المشاوي الشهية", rating: 4.7, orders: 2400 }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto max-w-6xl">
        <style>{`
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes scaleUp {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-slide-in-left {
            animation: slideInLeft 0.7s ease-out forwards;
          }
          .animate-slide-in-right {
            animation: slideInRight 0.7s ease-out forwards;
          }
          .animate-scale-up {
            animation: scaleUp 0.6s ease-out forwards;
          }
        `}</style>

        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary font-semibold mb-2 md:mb-4 text-base md:text-lg uppercase tracking-wide animate-slide-in-left">أفضل المطاعم</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 animate-scale-up" style={{ animationDelay: '0.2s' }}>
            أفضل المطاعم في بيوكرى مع Awid
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
            اكتشف أشهى المطاعم والمقاهي المختارة بعناية لتستمتع بألذ الوجبات
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {restaurants.map((restaurant, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden animate-scale-up border-2 border-gray-100"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="h-40 bg-gradient-to-br from-[#EB5C4B] to-[#F1594B] relative overflow-hidden group">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-4xl">🍽️</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{restaurant.name}</h3>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="font-bold text-gray-900">{restaurant.rating}</span>
                    <span className="text-gray-500 text-sm">({restaurant.orders} طلب)</span>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-[#EB5C4B] to-[#F1594B] text-white font-bold py-2 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                  اطلب الآن
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 md:mt-16">
          <button className="bg-[#EB5C4B] hover:bg-[#d94a3a] text-white font-bold py-3 px-8 md:px-12 rounded-full text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            استكشف جميع المطاعم
          </button>
        </div>
      </div>
    </section>
  );
};

export { BestRestaurants };
export default TransportServices;