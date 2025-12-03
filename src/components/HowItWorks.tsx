import { Package, FileText, MapPin, MouseIcon, MousePointerClickIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "@/lib/goToTitle";
import dilerImage from "@/assets/diler man.png";


const steps = [
  {
    icon: MousePointerClickIcon,
    title: "اختر ما تريد :",
    description: "طعام، مشتريات، أو أي شيء، تحتاجه أي شيء"
  },
  {
    icon: FileText,
    title: "املأ النموذج :",
    description: "ضع اسمك، رقم الهاتف، وعنوان تفاصيل الطلب وعنوان التسليم"
  },
  {
    icon: MapPin,
    title: "استلم طلبك",
    description: "خلال أقل من 30 دقيقة، نوصل كل شيء إلى بابك"
  }
];

const HowItWorks = () => {
  const navigate = useNavigate();
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-b from-background via-background to-primary/5" id="how-it-works">
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
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary font-semibold mb-2 md:mb-4 text-base md:text-lg uppercase tracking-wide animate-slide-in-left">كيف تعمل</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 animate-scale-up" style={{ animationDelay: '0.2s' }}>
            كيف تعمل خدمة أويد
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
            ثلاث خطوات بسيطة للحصول على ما تريد في أسرع وقت
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={index}
                className="relative group animate-scale-up"
                style={{ animationDelay: `${0.2 + index * 0.2}s` }}
              >
                {/* Card background with gradient */}
                <div className="bg-primary hover:bg-primary/90 text-white border-2 border-primary hover:shadow-lg rounded-xl p-6 md:p-8 flex flex-col items-center justify-start aspect-square transition-all duration-300 hover:-translate-y-1.5 cursor-pointer animate-bounce-in shadow-md h-full" style={{ animationDelay: '0.3s' }}>
                  {/* Step number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
                    {index + 1}
                  </div>

                  {/* Icon circle */}
                  <div className="flex items-center justify-center w-24 h-24 bg-white rounded-full border-3 border-gray-900 mb-6 shadow-md group-hover:scale-110 transition-transform duration-300 mt-4">
                    <IconComponent className="h-12 w-12 text-[#F1594B]" strokeWidth={1.5} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex flex-col items-center text-center">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-white leading-tight">{step.title}</h3>
                    <p className="text-sm md:text-base text-white/90 leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#F1594B] to-transparent"></div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="text-center mb-16 md:mb-20">
          <Button 
            size="lg"
            className="rounded-full bg-primary text-white hover:bg-primary/90 px-8 md:px-12 py-3 md:py-6 text-base md:text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            onClick={() => {
              navigate('/order');
              setTimeout(scrollToTop, 100);
            }}
          >
            ماذا تريد أن نوصل لك اليوم
          </Button>
        </div>
        
        {/* Why Choose Us Section */}
          <div className="mt-16 md:mt-20 lg:mt-24 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">
              {/* Image on the left */}
              <div className="w-full md:w-1/2 h-[400px]">
                <img 
                  src={dilerImage} 
                  alt="ساعي توصيل" 
                  className="w-full h-full max-w-md mx-auto rounded-2xl object-cover"
                />
              </div>
              
              {/* Content on the right */}
              <div className="w-full md:w-1/2 text-right">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                  لماذا تختار أويد؟
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  في أويد، نؤمن أن راحتك أولويتنا.
                  <br />
                  نوفّر لك خدمة توصيل سريعة، موثوقة، وبأسعار تنافسية داخل بيوكرى — أينما كنت، نصل إليك في الوقت المناسب وبابتسامة
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#F1594B] p-2 rounded-full mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-bold mb-1">توصيل سريع:</h4>
                      <p className="text-gray-700">استلم طلبك في أقل من 30 دقيقة، أينما كنت في بيوكرى.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-[#F1594B] p-2 rounded-full mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-bold mb-1">أسعار تنافسية وواضحة:</h4>
                      <p className="text-gray-700">لا رسوم خفية، فقط قيمة حقيقية مقابل سرعة وراحة.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-[#F1594B] p-2 rounded-full mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-bold mb-1">فريق محترف لخدمتك:</h4>
                      <p className="text-gray-700">طاقم عمل مدرّب بعناية لتوصيل طلباتك بدقة وأمان.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-[#F1594B] p-2 rounded-full mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-bold mb-1">تتبع مباشر وسهل:</h4>
                      <p className="text-gray-700">اعرف مكان طلبك لحظة بلحظة حتى يصل إلى بابك.</p>
                    </div>
                  </div>
                </div>                <Button 
                  size="lg"
                  className="mt-8 bg-[#F1594B] hover:bg-[#F57B6B] text-white rounded-lg px-8 py-6 text-lg font-semibold"
                >
                  أطلب ما تحتاجه الأن
                </Button>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
};

export default HowItWorks;
