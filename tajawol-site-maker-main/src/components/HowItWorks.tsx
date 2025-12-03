import { ShoppingCart, PackageCheck, Truck } from "lucide-react";

const steps = [
  {
    icon: ShoppingCart,
    title: "1. اطلب الخدمة",
    description: "ابدأ بطلب التوصيل أو تحديد نوع البضاعة التي ترغب في إرسالها عبر منصة أويد بكل سهولة. أدخل تفاصيل المرسل والمستلم وموقع الالتقاط والتسليم، وسيتكفل فريقنا بالباقي."
  },
  {
    icon: PackageCheck,
    title: "2.  التوصيل السريع والآمن",
    description: "نقوم بتوصيل الطلب إلى وجهته بسرعة وأمان داخل مختلف أحياء بيوكرى، من خلال شبكة سائقينا المحليين الموثوقين لضمان تجربة توصيل مريحة وسريعة."
  },
  {
    icon: Truck,
    title: "3.   استلام الطلب",
    description: "يصل مندوب أويد إلى موقعك في الوقت المحدد لاستلام الطلب من أقرب نقطة، مع التأكد من سلامة المنتج والتعامل باحترافية عالية"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-6 sm:py-8 md:py-12 lg:py-16 px-3 sm:px-4 bg-background" id="how-it-works">
      <div className="container mx-auto">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <p className="text-primary font-medium mb-1.5 sm:mb-2 md:mb-3 text-sm md:text-base">كيف تعمل</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight px-4">
            كيف تعمل خدمة التوصيل في بيوكرى مع أويد
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={index}
                className="bg-card rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-primary/10 rounded-full mb-3 sm:mb-4 md:mb-5">
                  <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-gray-800">{step.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed text-right">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
